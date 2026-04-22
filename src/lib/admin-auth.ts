// Shared admin authentication helpers. All admin API routes should verify
// the HMAC signature on the bearer token — not just format/timestamp —
// otherwise tokens are trivially forgeable.

const TOKEN_PREFIX = 'admin_';
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

function getAdminPassword(locals: any): string | undefined {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.ADMIN_PASSWORD || (import.meta.env as any).ADMIN_PASSWORD;
}

export function getWebflowApiToken(locals: any): string | undefined {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.WEBFLOW_API_TOKEN || (import.meta.env as any).WEBFLOW_API_TOKEN;
}

export function getWebflowSiteId(locals: any): string | undefined {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.WEBFLOW_SITE_ID || (import.meta.env as any).WEBFLOW_SITE_ID;
}

function base64UrlToBytes(input: string): Uint8Array {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
}

async function verifyHmac(payload: string, sig: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );
  try {
    const sigBytes = base64UrlToBytes(sig);
    return await crypto.subtle.verify('HMAC', key, sigBytes.buffer as ArrayBuffer, encoder.encode(payload));
  } catch {
    return false;
  }
}

/**
 * Full bearer-token verification for admin API routes.
 * Checks format, age, AND the HMAC signature keyed by ADMIN_PASSWORD.
 * Returns true only if everything is valid.
 */
export async function verifyAdminRequest(request: Request, locals: any): Promise<boolean> {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token || !token.startsWith(TOKEN_PREFIX)) return false;

  const parts = token.slice(TOKEN_PREFIX.length).split('.');
  if (parts.length !== 3) return false;

  const [nonce, timestampStr, sig] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;
  if (Date.now() - timestamp > MAX_AGE_MS) return false;

  const secret = getAdminPassword(locals);
  if (!secret) return false;

  return await verifyHmac(`${nonce}.${timestampStr}`, sig, secret);
}
