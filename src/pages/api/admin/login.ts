import type { APIRoute } from 'astro';

// CORS headers for all responses
const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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

// Handle login POST request
async function handlePost(request: Request, locals: any): Promise<Response> {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const { password } = body;

    if (!password) {
      return new Response(
        JSON.stringify({ error: 'Password is required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Access env vars from Cloudflare runtime context, fallback to import.meta.env for local dev
    const runtime = (locals as any)?.runtime;
    const adminPassword = runtime?.env?.ADMIN_PASSWORD || import.meta.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not found in environment variables');
      return new Response(
        JSON.stringify({
          error: 'Admin password not configured',
          hint: 'Set ADMIN_PASSWORD in Webflow Cloud environment variables'
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    if (password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: 'Invalid password' }),
        { status: 401, headers: corsHeaders }
      );
    }

    const token = generateToken(password);

    return new Response(
      JSON.stringify({
        success: true,
        token,
        expiresIn: 24 * 60 * 60 * 1000 // 24 hours
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error?.message || 'Unknown error'
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle token verification GET request
function handleGet(request: Request): Response {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '') || null;
  const result = verifyToken(token);

  if (!result.valid) {
    return new Response(
      JSON.stringify({ valid: false, reason: result.reason }),
      { status: 401, headers: corsHeaders }
    );
  }

  return new Response(
    JSON.stringify({ valid: true }),
    { status: 200, headers: corsHeaders }
  );
}

// Unified handler that works better with Cloudflare adapter
export const ALL: APIRoute = async ({ request, locals }) => {
  const method = request.method.toUpperCase();

  // Handle OPTIONS preflight
  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Handle POST (login)
  if (method === 'POST') {
    return handlePost(request, locals);
  }

  // Handle GET (verify token)
  if (method === 'GET') {
    return handleGet(request);
  }

  // Method not allowed
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: corsHeaders }
  );
};

// Also export individual methods for compatibility
export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204, headers: corsHeaders });
};

export const POST: APIRoute = async ({ request, locals }) => {
  return handlePost(request, locals);
};

export const GET: APIRoute = async ({ request }) => {
  return handleGet(request);
};
