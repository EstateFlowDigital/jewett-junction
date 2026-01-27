import type { APIRoute } from 'astro';

export const prerender = false;

// Debug endpoint to check environment variable availability
// IMPORTANT: Remove this file in production after debugging!

export const GET: APIRoute = async ({ locals }) => {
  const runtime = (locals as any)?.runtime;

  const debug = {
    timestamp: new Date().toISOString(),
    runtimeExists: !!runtime,
    runtimeEnvExists: !!runtime?.env,
    availableEnvKeys: runtime?.env ? Object.keys(runtime.env) : [],
    webflowSiteIdPresent: !!runtime?.env?.WEBFLOW_SITE_ID,
    webflowApiTokenPresent: !!runtime?.env?.WEBFLOW_API_TOKEN,
    adminPasswordPresent: !!runtime?.env?.ADMIN_PASSWORD,
    // Check import.meta.env fallback
    importMetaEnvKeys: Object.keys(import.meta.env).filter(k => !k.startsWith('VITE_')),
  };

  return new Response(JSON.stringify(debug, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
};
