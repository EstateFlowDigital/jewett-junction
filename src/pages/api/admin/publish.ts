import type { APIRoute } from 'astro';

const API_TOKEN = import.meta.env.WEBFLOW_API_TOKEN;
const SITE_ID = import.meta.env.WEBFLOW_SITE_ID;
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

// POST - Publish site
export const POST: APIRoute = async ({ request }) => {
  if (!verifyToken(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!SITE_ID) {
    return new Response(JSON.stringify({ error: 'Site ID not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Publish the site
    const response = await fetch(`${BASE_URL}/sites/${SITE_ID}/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        publishToWebflowSubdomain: true
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Webflow API error: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify({
      success: true,
      message: 'Site published successfully',
      ...data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error publishing site:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// GET - Check publish status / site info
export const GET: APIRoute = async ({ request }) => {
  if (!verifyToken(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch(`${BASE_URL}/sites/${SITE_ID}`, {
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
    console.error('Error getting site info:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
