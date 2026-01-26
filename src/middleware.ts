import { defineMiddleware } from 'astro:middleware';

// CORS headers for API routes
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const { request } = context;

  // Handle CORS preflight for API routes
  if (pathname.startsWith('/api/') || pathname.startsWith('/jewett-junction/api/')) {
    // Handle OPTIONS preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
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
