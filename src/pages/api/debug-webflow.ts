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
    tokenPrefix: apiToken ? apiToken.substring(0, 8) + '...' : 'none',
    siteId: siteId,
    runtimeExists: !!runtime,
    runtimeEnvExists: !!runtime?.env,
    availableEnvKeys: runtime?.env ? Object.keys(runtime.env) : [],
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
      results.siteLastPublished = siteData.lastPublished;
      results.siteCustomDomains = siteData.customDomains;
    }
  } catch (error: any) {
    results.siteInfoError = error.message;
  }

  // Test 2: Try to get token scopes
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
      results.tokenAuthorizedUser = userData.authorization?.authorizedTo;
    } else {
      results.tokenIntrospectError = await userResponse.json();
    }
  } catch (error: any) {
    results.tokenIntrospectError = error.message;
  }

  // Test 3: Test actual publish capability (dry-run style - just check endpoint access)
  try {
    // First, get site's domains info which is needed for publishing
    const domainsResponse = await fetch(`https://api.webflow.com/v2/sites/${siteId}/custom_domains`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json'
      }
    });

    results.domainsStatus = domainsResponse.status;

    if (domainsResponse.ok) {
      const domainsData = await domainsResponse.json();
      results.customDomains = domainsData.customDomains?.map((d: any) => d.url) || [];
    } else {
      results.domainsError = await domainsResponse.json();
    }
  } catch (error: any) {
    results.domainsError = error.message;
  }

  // Test 4: Check authorized apps
  try {
    const appsResponse = await fetch(`https://api.webflow.com/v2/sites/${siteId}/registered_scripts`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json'
      }
    });

    results.registeredScriptsStatus = appsResponse.status;
  } catch (error: any) {
    results.registeredScriptsError = error.message;
  }

  // Test 5: Actually test the publish endpoint
  try {
    const publishResponse = await fetch(`https://api.webflow.com/v2/sites/${siteId}/publish`, {
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

    results.publishStatus = publishResponse.status;

    if (!publishResponse.ok) {
      const errorText = await publishResponse.text();
      try {
        results.publishError = JSON.parse(errorText);
      } catch {
        results.publishErrorRaw = errorText;
      }
    } else {
      results.publishSuccess = true;
      results.publishResponse = await publishResponse.json();
    }
  } catch (error: any) {
    results.publishError = error.message;
  }

  return new Response(JSON.stringify(results, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
};
