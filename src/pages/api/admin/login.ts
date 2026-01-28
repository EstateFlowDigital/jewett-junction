import type { APIRoute, APIContext } from 'astro';

// Ensure this route is server-rendered
export const prerender = false;

// Helper to add CORS headers to any response
function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

// Simple token generation - in production, use a proper JWT library
function generateToken(password: string): string {
  const timestamp = Date.now();
  const data = `${password}-${timestamp}`;
  // Simple hash for demo - in production use crypto
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `admin_${Math.abs(hash).toString(36)}_${timestamp.toString(36)}`;
}

// Verify token helper
function verifyToken(token: string | null): { valid: boolean; reason?: string } {
  if (!token || !token.startsWith('admin_')) {
    return { valid: false };
  }

  const parts = token.split('_');
  if (parts.length !== 3) {
    return { valid: false };
  }

  const timestamp = parseInt(parts[2], 36);
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  if (now - timestamp > maxAge) {
    return { valid: false, reason: 'Token expired' };
  }

  return { valid: true };
}

// Handle CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
    }
  });
};

// Handle token verification GET request
export const GET: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '') || null;
  const result = verifyToken(token);

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

    // Access env vars from Cloudflare runtime context, fallback to import.meta.env for local dev
    const runtime = (locals as any)?.runtime;
    const adminPassword = runtime?.env?.ADMIN_PASSWORD || import.meta.env.ADMIN_PASSWORD;

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

    const token = generateToken(password);

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
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
      }
    });
  }

  if (method === 'GET') {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '') || null;
    const result = verifyToken(token);

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
