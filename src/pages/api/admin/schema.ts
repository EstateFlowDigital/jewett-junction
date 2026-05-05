import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../../lib/webflow-cms';
import { verifyAdminRequest, getWebflowApiToken } from '../../../lib/admin-auth';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// Returns the live Webflow schema for the requested collection, plus a few
// derived helpers the admin client uses to drive its UI:
//   - fieldOptions: { slug -> string[] of option NAMES } so dropdown <select>s
//     can render directly from Webflow instead of a hardcoded array.
//   - validSlugs: list of every editable Webflow field slug — used as the
//     server-side allowlist when filtering writes.
//   - fieldTypes: { slug -> Webflow Type } so the client can auto-render
//     fields it has no hardcoded config for.
//
// Cached for 60 seconds in-process so a worker doesn't hammer the schema
// endpoint when many admins load lists in parallel.
type SchemaCacheEntry = { fetchedAt: number; payload: any };
const SCHEMA_CACHE = new Map<string, SchemaCacheEntry>();
const SCHEMA_CACHE_TTL_MS = 60_000;

async function fetchSchema(collectionId: string, apiToken: string) {
  const cached = SCHEMA_CACHE.get(collectionId);
  if (cached && Date.now() - cached.fetchedAt < SCHEMA_CACHE_TTL_MS) {
    return cached.payload;
  }

  const res = await fetch(`${BASE_URL}/collections/${collectionId}`, {
    headers: { Authorization: `Bearer ${apiToken}`, accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Webflow schema ${res.status}`);
  }
  const data = await res.json();
  const fields: any[] = data.fields || [];

  const fieldOptions: Record<string, string[]> = {};
  const fieldTypes: Record<string, string> = {};
  const fieldDisplayNames: Record<string, string> = {};
  const validSlugs: string[] = [];

  for (const f of fields) {
    if (!f.slug) continue;
    validSlugs.push(f.slug);
    fieldTypes[f.slug] = f.type;
    fieldDisplayNames[f.slug] = f.displayName || f.slug;
    if (f.type === 'Option' && f.validations?.options) {
      fieldOptions[f.slug] = f.validations.options.map((o: any) => o.name).filter(Boolean);
    }
  }

  const payload = {
    collectionId,
    fields,
    fieldOptions,
    fieldTypes,
    fieldDisplayNames,
    validSlugs,
  };
  SCHEMA_CACHE.set(collectionId, { fetchedAt: Date.now(), payload });
  return payload;
}

// Exported helper that other admin endpoints (items.ts) can use to gate
// writes against the live schema instead of a hardcoded VALID_FIELDS map.
export async function getValidSlugs(collectionId: string, apiToken: string): Promise<string[] | null> {
  try {
    const schema = await fetchSchema(collectionId, apiToken);
    return schema.validSlugs;
  } catch {
    return null;
  }
}

export const GET: APIRoute = async ({ request, url, locals }) => {
  if (!(await verifyAdminRequest(request, locals))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401, headers: { 'Content-Type': 'application/json' },
    });
  }

  const collection = url.searchParams.get('collection');
  if (!collection || !(COLLECTIONS as Record<string, string>)[collection]) {
    return new Response(JSON.stringify({ error: 'Invalid collection' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiToken = getWebflowApiToken(locals);
  const collectionId = (COLLECTIONS as Record<string, string>)[collection];
  if (!apiToken || !collectionId) {
    return new Response(JSON.stringify({ error: 'Server not configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const schema = await fetchSchema(collectionId, apiToken);
    return new Response(JSON.stringify(schema), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Schema fetch failed' }), {
      status: 502, headers: { 'Content-Type': 'application/json' },
    });
  }
};
