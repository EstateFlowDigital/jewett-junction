import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../../lib/webflow-cms';

const API_TOKEN = import.meta.env.WEBFLOW_API_TOKEN;
const BASE_URL = 'https://api.webflow.com/v2';

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

// GET - List items from a collection
export const GET: APIRoute = async ({ request, url }) => {
  if (!verifyToken(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const collection = url.searchParams.get('collection');
  if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
    return new Response(JSON.stringify({ error: 'Invalid collection' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];

  try {
    const response = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Webflow API error: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error fetching items:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST - Create new item
export const POST: APIRoute = async ({ request }) => {
  if (!verifyToken(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { collection, fields, isLive = false } = await request.json();

    if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
      return new Response(JSON.stringify({ error: 'Invalid collection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];

    // Create item in Webflow
    const response = await fetch(`${BASE_URL}/collections/${collectionId}/items${isLive ? '?live=true' : ''}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
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
    return new Response(JSON.stringify({ success: true, item: data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error creating item:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// PATCH - Update item
export const PATCH: APIRoute = async ({ request }) => {
  if (!verifyToken(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { collection, itemId, fields, isLive = false } = await request.json();

    if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
      return new Response(JSON.stringify({ error: 'Invalid collection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!itemId) {
      return new Response(JSON.stringify({ error: 'Item ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];

    const response = await fetch(`${BASE_URL}/collections/${collectionId}/items/${itemId}${isLive ? '?live=true' : ''}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
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
    return new Response(JSON.stringify({ success: true, item: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error updating item:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE - Delete item
export const DELETE: APIRoute = async ({ request }) => {
  if (!verifyToken(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { collection, itemId } = await request.json();

    if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
      return new Response(JSON.stringify({ error: 'Invalid collection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!itemId) {
      return new Response(JSON.stringify({ error: 'Item ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];

    const response = await fetch(`${BASE_URL}/collections/${collectionId}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok && response.status !== 204) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Webflow API error: ${response.status}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error deleting item:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
