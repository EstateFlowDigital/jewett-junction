import type { APIRoute } from 'astro';

export const prerender = false;

// Debug endpoint to diagnose admin API issues
// Tests: admin token verification, environment variables, and API connectivity

const BASE_URL = 'https://api.webflow.com/v2';

// Verify admin token (same logic as other admin endpoints)
function verifyToken(token: string | null): { valid: boolean; reason?: string; details?: any } {
  if (!token) {
    return { valid: false, reason: 'No token provided' };
  }

  if (!token.startsWith('admin_')) {
    return { valid: false, reason: 'Token does not start with admin_', details: { prefix: token.substring(0, 10) } };
  }

  const parts = token.split('_');
  if (parts.length !== 3) {
    return { valid: false, reason: `Token has ${parts.length} parts, expected 3` };
  }

  const timestamp = parseInt(parts[2], 36);
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  const age = now - timestamp;

  if (age > maxAge) {
    return {
      valid: false,
      reason: 'Token expired',
      details: {
        tokenTimestamp: new Date(timestamp).toISOString(),
        currentTime: new Date(now).toISOString(),
        ageMs: age,
        maxAgeMs: maxAge,
        expiredBy: `${Math.round((age - maxAge) / 1000 / 60)} minutes`
      }
    };
  }

  return {
    valid: true,
    details: {
      tokenTimestamp: new Date(timestamp).toISOString(),
      currentTime: new Date(now).toISOString(),
      ageMs: age,
      expiresIn: `${Math.round((maxAge - age) / 1000 / 60)} minutes`
    }
  };
}

// Get env vars from runtime context
function getEnvVar(locals: any, key: string): string {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.[key] || (import.meta.env as any)[key];
}

export const GET: APIRoute = async ({ request, locals }) => {
  const results: any = {
    timestamp: new Date().toISOString(),
    endpoint: '/api/debug-admin',
  };

  // 1. Check Authorization header
  const authHeader = request.headers.get('Authorization');
  results.authHeader = {
    present: !!authHeader,
    format: authHeader ? (authHeader.startsWith('Bearer ') ? 'Bearer token' : 'Other format') : 'missing',
  };

  // 2. Extract and verify token
  const token = authHeader?.replace('Bearer ', '') || null;
  results.tokenVerification = verifyToken(token);

  // 3. Check environment variables
  const runtime = (locals as any)?.runtime;
  const apiToken = getEnvVar(locals, 'WEBFLOW_API_TOKEN');
  const siteId = getEnvVar(locals, 'WEBFLOW_SITE_ID');

  results.environment = {
    runtimeExists: !!runtime,
    runtimeEnvExists: !!runtime?.env,
    availableKeys: runtime?.env ? Object.keys(runtime.env) : [],
    webflowApiToken: {
      present: !!apiToken,
      length: apiToken?.length || 0,
    },
    webflowSiteId: {
      present: !!siteId,
      value: siteId || 'NOT SET',
    },
  };

  // 4. If admin token is valid, test Webflow API
  if (results.tokenVerification.valid && apiToken && siteId) {
    try {
      // Test site info endpoint
      const siteResponse = await fetch(`${BASE_URL}/sites/${siteId}`, {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'accept': 'application/json'
        }
      });

      results.webflowApiTest = {
        endpoint: `/sites/${siteId}`,
        status: siteResponse.status,
        ok: siteResponse.ok,
      };

      if (siteResponse.ok) {
        const siteData = await siteResponse.json();
        results.webflowApiTest.siteName = siteData.displayName;
      } else {
        results.webflowApiTest.error = await siteResponse.text();
      }
    } catch (err: any) {
      results.webflowApiTest = {
        error: err.message,
      };
    }
  } else {
    results.webflowApiTest = {
      skipped: true,
      reason: !results.tokenVerification.valid
        ? 'Admin token not valid'
        : !apiToken
          ? 'WEBFLOW_API_TOKEN not set'
          : 'WEBFLOW_SITE_ID not set',
    };
  }

  // 5. Check all request headers (for debugging CORS/proxy issues)
  results.requestHeaders = Object.fromEntries(request.headers.entries());

  return new Response(JSON.stringify(results, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    }
  });
};
