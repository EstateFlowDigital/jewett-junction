import type { APIRoute } from 'astro';
import { verifyAdminRequest, getWebflowApiToken, getWebflowSiteId } from '../../../lib/admin-auth';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// CORS is handled by middleware — this is a passthrough for compatibility
function withCors(response: Response): Response {
  return response;
}

// CORS preflight is handled by middleware
export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204 });
};

// ALL - Fallback handler for any method
export const ALL: APIRoute = async ({ request, locals }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
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
  if (!(await verifyAdminRequest(request, locals))) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getWebflowApiToken(locals);
  const siteId = getWebflowSiteId(locals);

  if (!siteId) {
    return withCors(new Response(JSON.stringify({ error: 'Site ID not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  try {
    if (!apiToken) {
      return withCors(new Response(JSON.stringify({
        error: 'WEBFLOW_API_TOKEN not configured',
        hint: 'For local dev set it in .dev.vars; for production set it in Webflow Cloud env.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Fetch custom domain IDs to include in the publish request
    let customDomainIds: string[] = [];
    try {
      const domainsResponse = await fetch(`${BASE_URL}/sites/${siteId}/custom_domains`, {
        headers: { 'Authorization': `Bearer ${apiToken}`, 'accept': 'application/json' },
      });
      if (domainsResponse.ok) {
        const domainsData = await domainsResponse.json();
        customDomainIds = domainsData.customDomains?.map((d: any) => d.id) || [];
      }
    } catch {
      // Non-fatal — publish still works against the webflow.io subdomain
    }

    const publishBody: any = { publishToWebflowSubdomain: true };
    if (customDomainIds.length > 0) {
      publishBody.customDomains = customDomainIds;
    }

    const response = await fetch(`${BASE_URL}/sites/${siteId}/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(publishBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData: any;
      try { errorData = JSON.parse(errorText); } catch { errorData = { rawResponse: errorText }; }
      console.error('Publish: Webflow error:', errorData);
      return withCors(new Response(JSON.stringify({
        error: `Webflow API returned ${response.status}`,
        status: response.status,
        webflowError: errorData,
      }), {
        status: response.status === 401 || response.status === 403 ? response.status : 500,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    const data = await response.json();
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
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};

// GET - Check publish status / site info
export const GET: APIRoute = async ({ request, locals }) => {
  if (!(await verifyAdminRequest(request, locals))) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getWebflowApiToken(locals);
  const siteId = getWebflowSiteId(locals);

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
