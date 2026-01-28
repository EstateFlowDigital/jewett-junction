import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../../lib/webflow-cms';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
};

// Helper to add CORS headers to any response
function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

// Get API token from runtime context (Cloudflare) or fallback to import.meta.env (local dev)
function getApiToken(locals: any): string {
  const runtime = locals?.runtime;
  return runtime?.env?.WEBFLOW_API_TOKEN || import.meta.env.WEBFLOW_API_TOKEN;
}

// Verify admin token
function verifyToken(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token || !token.startsWith('admin_')) {
    return false;
  }

  const parts = token.split('_');
  if (parts.length !== 3) return false;

  const timestamp = parseInt(parts[2], 36);
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  return now - timestamp <= maxAge;
}

// OPTIONS - Handle CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
};

// GET - List items from a collection
export const GET: APIRoute = async ({ request, url, locals }) => {
  if (!verifyToken(request)) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const collection = url.searchParams.get('collection');
  if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
    return withCors(new Response(JSON.stringify({ error: 'Invalid collection' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];
  const apiToken = getApiToken(locals);

  try {
    const response = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Webflow API error: ${response.status}`);
    }

    const data = await response.json();
    return withCors(new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error: any) {
    console.error('Error fetching items:', error);
    return withCors(new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};

// POST - Create new item
export const POST: APIRoute = async ({ request, locals }) => {
  if (!verifyToken(request)) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getApiToken(locals);

  try {
    const { collection, fields, isLive = false } = await request.json();

    if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
      return withCors(new Response(JSON.stringify({ error: 'Invalid collection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];

    // Create item in Webflow
    const response = await fetch(`${BASE_URL}/collections/${collectionId}/items${isLive ? '?live=true' : ''}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        fieldData: fields
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Webflow API error: ${response.status}`);
    }

    const data = await response.json();
    return withCors(new Response(JSON.stringify({ success: true, item: data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error: any) {
    console.error('Error creating item:', error);
    return withCors(new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};

// PATCH - Update item
export const PATCH: APIRoute = async ({ request, locals }) => {
  if (!verifyToken(request)) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getApiToken(locals);

  try {
    const { collection, itemId, fields, isLive = false } = await request.json();

    if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
      return withCors(new Response(JSON.stringify({ error: 'Invalid collection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    if (!itemId) {
      return withCors(new Response(JSON.stringify({ error: 'Item ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];

    const response = await fetch(`${BASE_URL}/collections/${collectionId}/items/${itemId}${isLive ? '?live=true' : ''}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        fieldData: fields
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Webflow API error: ${response.status}`);
    }

    const data = await response.json();
    return withCors(new Response(JSON.stringify({ success: true, item: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error: any) {
    console.error('Error updating item:', error);
    return withCors(new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};

// DELETE - Delete item
export const DELETE: APIRoute = async ({ request, locals }) => {
  if (!verifyToken(request)) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getApiToken(locals);

  try {
    const { collection, itemId } = await request.json();

    if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
      return withCors(new Response(JSON.stringify({ error: 'Invalid collection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    if (!itemId) {
      return withCors(new Response(JSON.stringify({ error: 'Item ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];

    const response = await fetch(`${BASE_URL}/collections/${collectionId}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok && response.status !== 204) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Webflow API error: ${response.status}`);
    }

    return withCors(new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error: any) {
    console.error('Error deleting item:', error);
    return withCors(new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};
