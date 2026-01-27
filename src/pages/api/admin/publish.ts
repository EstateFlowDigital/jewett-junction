import type { APIRoute } from 'astro';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

// Get env vars from runtime context (Cloudflare) or fallback to import.meta.env (local dev)
function getEnvVar(locals: any, key: string): string {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.[key] || (import.meta.env as any)[key];
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

// POST - Publish site
export const POST: APIRoute = async ({ request, locals }) => {
  console.log('=== PUBLISH REQUEST ===');

  // Debug: Log what's available in locals
  const runtime = (locals as any)?.runtime;
  console.log('Publish: runtime exists =', !!runtime);
  console.log('Publish: runtime.env exists =', !!runtime?.env);
  if (runtime?.env) {
    console.log('Publish: Available env keys =', Object.keys(runtime.env));
  }

  if (!verifyToken(request)) {
    console.log('Publish: Unauthorized - invalid token');
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getEnvVar(locals, 'WEBFLOW_API_TOKEN');
  const siteId = getEnvVar(locals, 'WEBFLOW_SITE_ID');

  console.log('Publish: siteId =', siteId ? 'present' : 'MISSING');
  console.log('Publish: apiToken =', apiToken ? `present (length: ${apiToken.length})` : 'MISSING');

  if (!siteId) {
    return withCors(new Response(JSON.stringify({ error: 'Site ID not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  try {
    console.log(`Publish: Calling Webflow API for site ${siteId}...`);
    // Publish the site
    const response = await fetch(`${BASE_URL}/sites/${siteId}/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        publishToWebflowSubdomain: true
      })
    });

    console.log('Publish: Webflow response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Publish: Webflow error:', errorData);

      // Provide clearer error messages for common issues
      if (response.status === 403) {
        throw new Error('Permission denied. Please ensure your Webflow API token has "Site Publish" permissions. You may need to regenerate your token in Webflow and update it in Cloudflare.');
      } else if (response.status === 401) {
        throw new Error('Invalid API token. Please update WEBFLOW_API_TOKEN in your Cloudflare environment settings.');
      } else {
        throw new Error(errorData.message || `Webflow API error: ${response.status}`);
      }
    }

    const data = await response.json();
    console.log('Publish: Success!', data);
    return withCors(new Response(JSON.stringify({
      success: true,
      message: 'Site published successfully',
      ...data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error: any) {
    console.error('Error publishing site:', error);
    return withCors(new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};

// GET - Check publish status / site info
export const GET: APIRoute = async ({ request, locals }) => {
  if (!verifyToken(request)) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getEnvVar(locals, 'WEBFLOW_API_TOKEN');
  const siteId = getEnvVar(locals, 'WEBFLOW_SITE_ID');

  try {
    const response = await fetch(`${BASE_URL}/sites/${siteId}`, {
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
    console.error('Error getting site info:', error);
    return withCors(new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};
