import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../../lib/webflow-cms';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// Valid Webflow field slugs for each collection
// Only these fields will be sent to Webflow API
// Based on actual Webflow collection schemas
const VALID_FIELDS: Record<string, string[]> = {
  announcements: ['name', 'slug', 'content', 'priority', 'published-date', 'author', 'is-pinned'],
  events: ['name', 'slug', 'description', 'event-date', 'end-date', 'location', 'category', 'registration-link'],
  employees: ['name', 'slug', 'role', 'department', 'email', 'phone', 'photo', 'bio', 'start-date', 'is-featured'],
  jobPostings: ['name', 'slug', 'department', 'location', 'description', 'requirements', 'referral-bonus', 'apply-link', 'job-is-active'],
  cultureStories: ['name', 'slug', 'excerpt', 'content', 'image', 'author', 'published-date', 'category'],
  resources: ['name', 'slug', 'description', 'category', 'file', 'external-link', 'icon'],
};

// Filter fields to only include valid ones for the collection
function filterValidFields(collection: string, fields: Record<string, any>): Record<string, any> {
  const validFieldKeys = VALID_FIELDS[collection];

  // If we don't have a schema for this collection, pass through all non-empty fields
  if (!validFieldKeys) {
    return Object.fromEntries(
      Object.entries(fields).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    );
  }

  // Filter to only valid fields with non-empty values
  return Object.fromEntries(
    Object.entries(fields).filter(([key, value]) => {
      const isValidField = validFieldKeys.includes(key);
      const hasValue = value !== undefined && value !== null && value !== '';
      if (!isValidField && hasValue) {
        console.log(`Filtering out field '${key}' - not in Webflow schema for ${collection}`);
      }
      return isValidField && hasValue;
    })
  );
}

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

// ALL - Fallback handler for any method
export const ALL: APIRoute = async ({ request }) => {
  // Handle OPTIONS for CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // For any unexpected method
  return withCors(new Response(JSON.stringify({
    error: `Method ${request.method} not allowed`,
    allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  }));
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
  console.log('=== POST ITEM REQUEST ===');

  if (!verifyToken(request)) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getApiToken(locals);

  try {
    const { collection, fields, isLive = false } = await request.json();

    console.log('POST: Collection:', collection);
    console.log('POST: Original fields keys:', Object.keys(fields || {}));

    if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
      return withCors(new Response(JSON.stringify({ error: 'Invalid collection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Filter to only valid Webflow fields for this collection
    const filteredFields = filterValidFields(collection, fields || {});
    console.log('POST: Filtered fields keys:', Object.keys(filteredFields));

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
        fieldData: filteredFields
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
  console.log('=== PATCH ITEM REQUEST ===');

  if (!verifyToken(request)) {
    console.log('PATCH: Unauthorized');
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getApiToken(locals);
  console.log('PATCH: API token present:', !!apiToken);

  try {
    const body = await request.json();
    const { collection, itemId, fields, isLive = false } = body;

    console.log('PATCH: Collection:', collection);
    console.log('PATCH: Item ID:', itemId);
    console.log('PATCH: isLive:', isLive);
    console.log('PATCH: Original fields keys:', Object.keys(fields || {}));

    if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
      console.log('PATCH: Invalid collection - not found in COLLECTIONS');
      return withCors(new Response(JSON.stringify({ error: 'Invalid collection', collection }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    if (!itemId) {
      console.log('PATCH: Missing item ID');
      return withCors(new Response(JSON.stringify({ error: 'Item ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Filter to only valid Webflow fields for this collection
    const filteredFields = filterValidFields(collection, fields || {});
    console.log('PATCH: Filtered fields keys:', Object.keys(filteredFields));

    if (Object.keys(filteredFields).length === 0) {
      console.log('PATCH: No valid fields to update');
      return withCors(new Response(JSON.stringify({ error: 'No valid fields to update' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];
    console.log('PATCH: Collection ID:', collectionId);

    const url = `${BASE_URL}/collections/${collectionId}/items/${itemId}${isLive ? '?live=true' : ''}`;
    console.log('PATCH: Webflow URL:', url);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        fieldData: filteredFields
      })
    });

    console.log('PATCH: Webflow response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PATCH: Webflow error response:', errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { rawResponse: errorText };
      }
      return withCors(new Response(JSON.stringify({
        error: errorData.message || `Webflow API error: ${response.status}`,
        webflowError: errorData,
        status: response.status
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    const data = await response.json();
    console.log('PATCH: Success!');
    return withCors(new Response(JSON.stringify({ success: true, item: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error: any) {
    console.error('PATCH: Exception:', error.message);
    console.error('PATCH: Stack:', error.stack);
    return withCors(new Response(JSON.stringify({ error: error.message, type: error.constructor.name }), {
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
