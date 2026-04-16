import type { APIRoute, APIContext } from 'astro';

// Ensure this route is server-rendered
export const prerender = false;

// CORS is handled by middleware — this is a passthrough for compatibility
function withCors(response: Response): Response {
  return response;
}

// Generate a cryptographically secure token with HMAC signature
async function generateToken(secret: string): Promise<string> {
  const timestamp = Date.now();
  const nonce = crypto.randomUUID();
  const payload = `${nonce}.${timestamp}`;

  // Sign the payload with HMAC-SHA256 using the admin password as key
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const sig = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/[+/=]/g, (c) =>
    c === '+' ? '-' : c === '/' ? '_' : ''
  );

  return `admin_${payload}.${sig}`;
}

// Verify token — checks structure, expiry, and HMAC signature
async function verifyToken(token: string | null, secret?: string): Promise<{ valid: boolean; reason?: string }> {
  if (!token || !token.startsWith('admin_')) {
    return { valid: false };
  }

  const body = token.slice('admin_'.length);
  const parts = body.split('.');
  if (parts.length !== 3) {
    return { valid: false };
  }

  const [nonce, timestampStr, sig] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) {
    return { valid: false };
  }

  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  if (now - timestamp > maxAge) {
    return { valid: false, reason: 'Token expired' };
  }

  // If we have the secret, verify the HMAC signature
  if (secret) {
    const payload = `${nonce}.${timestampStr}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    // Decode the base64url signature
    const sigPadded = sig.replace(/-/g, '+').replace(/_/g, '/');
    const sigBytes = Uint8Array.from(atob(sigPadded), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(payload));
    if (!valid) {
      return { valid: false, reason: 'Invalid token' };
    }
  }

  return { valid: true };
}

// Handle CORS preflight
// CORS preflight is handled by middleware
export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204 });
};

// Helper to get admin password from env
function getAdminPassword(locals: any): string | undefined {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.ADMIN_PASSWORD || import.meta.env.ADMIN_PASSWORD;
}

// Handle token verification GET request
export const GET: APIRoute = async ({ request, locals }) => {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '') || null;
  const secret = getAdminPassword(locals);
  const result = await verifyToken(token, secret);

  if (!result.valid) {
    return withCors(new Response(
      JSON.stringify({ valid: false, reason: result.reason }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    ));
  }

  return withCors(new Response(
    JSON.stringify({ valid: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  ));
};

// Handle login POST request
async function handlePost(request: Request, locals: any): Promise<Response> {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return withCors(new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ));
    }

    const { password } = body;

    if (!password) {
      return withCors(new Response(
        JSON.stringify({ error: 'Password is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ));
    }

    const adminPassword = getAdminPassword(locals);

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not found in environment variables');
      return withCors(new Response(
        JSON.stringify({
          error: 'Admin password not configured',
          hint: 'Set ADMIN_PASSWORD in Webflow Cloud environment variables'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      ));
    }

    if (password !== adminPassword) {
      return withCors(new Response(
        JSON.stringify({ error: 'Invalid password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      ));
    }

    const token = await generateToken(adminPassword);

    return withCors(new Response(
      JSON.stringify({
        success: true,
        token,
        expiresIn: 24 * 60 * 60 * 1000 // 24 hours
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ));
  } catch (error: any) {
    console.error('Login error:', error);
    return withCors(new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error?.message || 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ));
  }
}

export const POST: APIRoute = async ({ request, locals }) => {
  return handlePost(request, locals);
};

// Fallback handler for all methods - needed for some Cloudflare deployments
export const ALL: APIRoute = async ({ request, locals }) => {
  const method = request.method.toUpperCase();

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  if (method === 'GET') {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '') || null;
    const secret = getAdminPassword(locals);
    const result = await verifyToken(token, secret);

    if (!result.valid) {
      return withCors(new Response(
        JSON.stringify({ valid: false, reason: result.reason }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      ));
    }

    return withCors(new Response(
      JSON.stringify({ valid: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ));
  }

  if (method === 'POST') {
    return handlePost(request, locals);
  }

  return withCors(new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  ));
};
