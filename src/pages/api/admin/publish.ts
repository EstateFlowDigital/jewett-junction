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

// ALL - Fallback handler for any method
export const ALL: APIRoute = async ({ request, locals }) => {
  // Handle OPTIONS for CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // For POST, delegate to the POST handler (should be handled by POST export but just in case)
  if (request.method === 'POST') {
    // This shouldn't normally be reached, but provide a fallback
    return withCors(new Response(JSON.stringify({
      error: 'Request routed through ALL handler - check deployment',
      method: request.method
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  // For any other unexpected method
  return withCors(new Response(JSON.stringify({
    error: `Method ${request.method} not allowed`,
    allowedMethods: ['POST', 'GET', 'OPTIONS']
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  }));
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

    // First, check if API token is actually present
    if (!apiToken) {
      return withCors(new Response(JSON.stringify({
        error: 'WEBFLOW_API_TOKEN not configured',
        details: 'The API token is missing. For local dev, create a .dev.vars file. For production, set it in Webflow Cloud environment settings.',
        runtimeEnvKeys: runtime?.env ? Object.keys(runtime.env) : []
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Get custom domains to include in publish request
    let customDomainIds: string[] = [];
    try {
      const domainsResponse = await fetch(`${BASE_URL}/sites/${siteId}/custom_domains`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'accept': 'application/json'
        }
      });
      if (domainsResponse.ok) {
        const domainsData = await domainsResponse.json();
        customDomainIds = domainsData.customDomains?.map((d: any) => d.id) || [];
        console.log('Publish: Found custom domain IDs:', customDomainIds);
      } else {
        console.log('Publish: Could not fetch custom domains:', domainsResponse.status);
      }
    } catch (e) {
      console.log('Publish: Error fetching custom domains:', e);
    }

    // Build publish request body
    const publishBody: any = {
      publishToWebflowSubdomain: true
    };

    // Include custom domains if available
    if (customDomainIds.length > 0) {
      publishBody.customDomains = customDomainIds;
    }

    console.log('Publish: Request body:', JSON.stringify(publishBody));

    // Publish the site
    const response = await fetch(`${BASE_URL}/sites/${siteId}/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(publishBody)
    });

    console.log('Publish: Webflow response status:', response.status);

    // response.ok is true for 200-299, including 202 Accepted
    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { rawResponse: errorText };
      }
      console.error('Publish: Webflow error:', errorData);

      // Return detailed error for debugging
      return withCors(new Response(JSON.stringify({
        error: `Webflow API returned ${response.status}`,
        status: response.status,
        webflowError: errorData,
        tokenPresent: !!apiToken,
        tokenLength: apiToken?.length,
        siteId: siteId
      }), {
        status: response.status === 401 || response.status === 403 ? response.status : 500,
        headers: { 'Content-Type': 'application/json' }
      }));
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
    return withCors(new Response(JSON.stringify({
      error: error.message,
      stack: error.stack
    }), {
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
