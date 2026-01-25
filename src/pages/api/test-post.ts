import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ method: 'GET', status: 'ok' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  let body = null;
  try {
    body = await request.json();
  } catch {
    body = 'Could not parse body';
  }

  return new Response(JSON.stringify({
    method: 'POST',
    status: 'ok',
    receivedBody: body,
    headers: Object.fromEntries(request.headers.entries())
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const ALL: APIRoute = async ({ request }) => {
  const method = request.method;

  if (method === 'GET') {
    return new Response(JSON.stringify({ method: 'GET', status: 'ok', handler: 'ALL' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (method === 'POST') {
    let body = null;
    try {
      body = await request.json();
    } catch {
      body = 'Could not parse body';
    }

    return new Response(JSON.stringify({
      method: 'POST',
      status: 'ok',
      handler: 'ALL',
      receivedBody: body
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({
    method: method,
    status: 'method not handled',
    handler: 'ALL'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
