import type { APIRoute } from 'astro';

export const prerender = false;

// Debug endpoint to test Webflow API connection
// IMPORTANT: Remove this file in production after debugging!

export const GET: APIRoute = async ({ locals }) => {
  const runtime = (locals as any)?.runtime;
  const apiToken = runtime?.env?.WEBFLOW_API_TOKEN || (import.meta.env as any).WEBFLOW_API_TOKEN;
  const siteId = runtime?.env?.WEBFLOW_SITE_ID || (import.meta.env as any).WEBFLOW_SITE_ID;

  const results: any = {
    timestamp: new Date().toISOString(),
    tokenPresent: !!apiToken,
    tokenLength: apiToken?.length || 0,
    tokenPrefix: apiToken?.substring(0, 8) + '...',
    siteId: siteId,
  };

  // Test 1: Get site info (requires sites:read)
  try {
    const siteResponse = await fetch(`https://api.webflow.com/v2/sites/${siteId}`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json'
      }
    });

    results.siteInfoStatus = siteResponse.status;
    results.siteInfoOk = siteResponse.ok;

    if (!siteResponse.ok) {
      results.siteInfoError = await siteResponse.json();
    } else {
      const siteData = await siteResponse.json();
      results.siteName = siteData.displayName;
      results.siteShortName = siteData.shortName;
    }
  } catch (error: any) {
    results.siteInfoError = error.message;
  }

  // Test 2: Try to get authorized user info
  try {
    const userResponse = await fetch('https://api.webflow.com/v2/token/introspect', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json'
      }
    });

    results.tokenIntrospectStatus = userResponse.status;

    if (userResponse.ok) {
      const userData = await userResponse.json();
      results.tokenScopes = userData.authorization?.scopes || 'unknown';
    } else {
      results.tokenIntrospectError = await userResponse.json();
    }
  } catch (error: any) {
    results.tokenIntrospectError = error.message;
  }

  return new Response(JSON.stringify(results, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
};
