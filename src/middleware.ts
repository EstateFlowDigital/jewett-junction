import { defineMiddleware } from 'astro:middleware';

// Build CORS headers based on request origin
function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigins = import.meta.env.ALLOWED_ORIGINS
    ? import.meta.env.ALLOWED_ORIGINS.split(',').map((o: string) => o.trim())
    : [];

  // Allow same-origin requests and any configured origins
  const requestUrl = new URL(request.url);
  const sameOrigin = origin === requestUrl.origin;
  const isAllowed = sameOrigin || allowedOrigins.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : requestUrl.origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
    'Access-Control-Max-Age': '86400',
  };
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const { request } = context;

  // Handle CORS preflight for API routes
  if (pathname.startsWith('/api/') || pathname.startsWith('/jewett-junction/api/')) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request)
      });
    }
  }

  // Handle root path - rewrite to /dashboard internally
  if (pathname === '/jewett-junction' || pathname === '/jewett-junction/') {
    return context.rewrite('/dashboard');
  }

  const response = await next();

  // Add CORS headers to API responses
  if (pathname.startsWith('/api/') || pathname.startsWith('/jewett-junction/api/')) {
    const corsHeaders = getCorsHeaders(request);
    const newHeaders = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      newHeaders.set(key, value);
    });
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }

  return response;
});
