import type { APIRoute } from 'astro';

export const prerender = false;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Simple test endpoint to verify API is working
export const GET: APIRoute = async ({ request, locals }) => {
  const runtime = (locals as any)?.runtime;
  const authHeader = request.headers.get('Authorization');

  return new Response(JSON.stringify({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '2026-01-28-v2',
    runtimeExists: !!runtime,
    envKeysAvailable: runtime?.env ? Object.keys(runtime.env) : [],
    authHeaderPresent: !!authHeader,
    authHeaderPrefix: authHeader ? authHeader.substring(0, 20) + '...' : null,
    requestUrl: request.url,
    requestMethod: request.method
  }, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
};

export const ALL: APIRoute = async ({ request }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  return new Response(JSON.stringify({
    status: 'ok',
    method: request.method,
    message: 'Test endpoint received request'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
};
