import { defineMiddleware } from 'astro:middleware';
import { parseAllowlist, isAllowedIp } from './lib/ip-allowlist';

const GATED_PREFIXES = [
  '/jewett-junction',
  '/admin',
  // Pages added after this gate was written (Round 2, Aug 2026) — the mount
  // path is stripped at the edge, so every page needs its post-mount prefix
  // listed here or it ships unlocked when ALLOWED_IPS is set.
  '/dashboard',
  '/living-the-mission',
  '/builtwell',
  '/sales-lead',
  '/announcements',
  '/culture',
  '/directory',
  '/events',
  '/help',
  '/hr',
  '/it-helpdesk',
  '/marketing',
  '/notifications',
  '/resources',
  '/ring-it-in',
  '/safety',
  '/safety-incident',
  '/submit-idea',
  '/api/admin',
  '/jewett-junction/api/admin',
  // Gate the public read endpoint too — only intranet users (IP-allowed) should
  // be able to enumerate CMS content from outside the rendered pages. We still
  // strip PII fields in the endpoint itself as defense in depth.
  '/api/cms',
  '/jewett-junction/api/cms',
];

// The whole /api surface is gated EXCEPT these — the Webflow form-submission
// webhook arrives from Webflow's servers, which will never be on Jewett's
// allowlist, and it authenticates itself with a signature instead.
const OPEN_API_PREFIXES = ['/api/webhooks', '/jewett-junction/api/webhooks'];

function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigins = import.meta.env.ALLOWED_ORIGINS
    ? import.meta.env.ALLOWED_ORIGINS.split(',').map((o: string) => o.trim())
    : [];
  const requestUrl = new URL(request.url);
  const sameOrigin = origin === requestUrl.origin;
  const isAllowed = sameOrigin || allowedOrigins.includes(origin);
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : requestUrl.origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
    'Access-Control-Max-Age': '86400',
  };
}

function isGatedPath(pathname: string): boolean {
  // Dashboard moved to the mount root, so the bare path needs explicit gating —
  // it doesn't match any of the GATED_PREFIXES via startsWith without matching
  // every other path too.
  if (pathname === '/') return true;
  if (OPEN_API_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'))) return false;
  // Deny-by-default for the API: form endpoints write to the CMS and send
  // email, so an unlisted new endpoint should be born gated, not discovered
  // open later. Pages stay prefix-listed because /access-denied and /404 must
  // remain reachable.
  if (pathname.startsWith('/api/') || pathname.startsWith('/jewett-junction/api/')) return true;
  return GATED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

function getClientIp(request: Request): string | null {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    null
  );
}

function getAllowedIpsEnv(locals: any): string | undefined {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.ALLOWED_IPS || import.meta.env.ALLOWED_IPS;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const { request } = context;

  if (pathname.startsWith('/api/') || pathname.startsWith('/jewett-junction/api/')) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: getCorsHeaders(request) });
    }
  }

  if (isGatedPath(pathname)) {
    const rawAllowlist = getAllowedIpsEnv(context.locals);
    const allowlist = parseAllowlist(rawAllowlist);
    if (allowlist.length > 0) {
      const ip = getClientIp(request);
      if (!isAllowedIp(ip, allowlist)) {
        if (pathname.includes('/api/')) {
          return new Response(JSON.stringify({ error: 'Access denied' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        return context.rewrite('/access-denied');
      }
    }
  }

  // No /jewett-junction rewrite here. In production Webflow Cloud strips the
  // mount path at the edge so the worker only ever sees post-mount paths
  // (/, /hr, /safety, …); a worker-side rewrite of /jewett-junction would
  // either be dead code OR risk a redirect loop with the edge layer. In local
  // dev the dashboard lives at /, so just visit http://localhost:4321/.

  const response = await next();

  if (pathname.startsWith('/api/') || pathname.startsWith('/jewett-junction/api/')) {
    const corsHeaders = getCorsHeaders(request);
    const newHeaders = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => newHeaders.set(key, value));
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
});
