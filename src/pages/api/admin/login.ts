import type { APIRoute } from 'astro';

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

export const POST: APIRoute = async ({ request }) => {
  try {
    const { password } = await request.json();
    const adminPassword = import.meta.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return new Response(
        JSON.stringify({ error: 'Admin password not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: 'Invalid password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = generateToken(password);

    return new Response(
      JSON.stringify({
        success: true,
        token,
        expiresIn: 24 * 60 * 60 * 1000 // 24 hours
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Verify token endpoint
export const GET: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token || !token.startsWith('admin_')) {
    return new Response(
      JSON.stringify({ valid: false }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Extract timestamp from token and check if expired (24 hours)
  const parts = token.split('_');
  if (parts.length !== 3) {
    return new Response(
      JSON.stringify({ valid: false }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const timestamp = parseInt(parts[2], 36);
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  if (now - timestamp > maxAge) {
    return new Response(
      JSON.stringify({ valid: false, reason: 'Token expired' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ valid: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
