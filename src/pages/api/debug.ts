import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request, url }) => {
  const debugInfo = {
    fullUrl: request.url,
    pathname: url.pathname,
    search: url.search,
    host: url.host,
    origin: url.origin,
    headers: Object.fromEntries(request.headers.entries()),
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(debugInfo, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
