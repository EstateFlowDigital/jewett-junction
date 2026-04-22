import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../../lib/webflow-cms';
import { COLLECTIONS as COLLECTION_CONFIGS } from '../../../components/admin/collections';
import { verifyAdminRequest, getWebflowApiToken } from '../../../lib/admin-auth';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

function filterRowToValidFields(collection: string, row: Record<string, any>): Record<string, any> {
  const config = (COLLECTION_CONFIGS as any)[collection];
  if (!config) return row;
  const validKeys = new Set<string>(config.fields.map((f: any) => f.key));
  validKeys.add('slug');
  const filtered: Record<string, any> = {};
  for (const [k, v] of Object.entries(row)) {
    if (validKeys.has(k) && v !== '' && v !== null && v !== undefined) {
      filtered[k] = v;
    }
  }
  return filtered;
}

export const POST: APIRoute = async ({ request, locals }) => {
  if (!(await verifyAdminRequest(request, locals))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  const { collection, rows } = await request.json();
  const collectionId = (COLLECTIONS as Record<string, string>)[collection];
  if (!collectionId) {
    return new Response(JSON.stringify({ error: 'Invalid collection' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (!Array.isArray(rows) || rows.length === 0) {
    return new Response(JSON.stringify({ error: 'No rows provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (rows.length > 100) {
    return new Response(JSON.stringify({ error: 'Maximum 100 rows per import' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const apiToken = getWebflowApiToken(locals);
  const results: Array<{ ok: boolean; row: number; error?: string; id?: string }> = [];
  const createdIds: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const fieldData = filterRowToValidFields(collection, rows[i]);
    if (Object.keys(fieldData).length === 0) {
      results.push({ ok: false, row: i, error: 'No valid fields in row (check CSV headers match collection field slugs)' });
      continue;
    }
    try {
      const res = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ isArchived: false, isDraft: false, fieldData }),
      });
      if (!res.ok) {
        const err = await res.text();
        results.push({ ok: false, row: i, error: err.substring(0, 200) });
      } else {
        const data = await res.json();
        results.push({ ok: true, row: i, id: data.id });
        if (data.id) createdIds.push(data.id);
      }
    } catch (e: any) {
      results.push({ ok: false, row: i, error: e?.message || 'Unknown error' });
    }
  }

  // Batch-publish all successfully-created items
  let publishWarning: string | undefined;
  if (createdIds.length > 0) {
    try {
      const pubRes = await fetch(`${BASE_URL}/collections/${collectionId}/items/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ itemIds: createdIds }),
      });
      if (!pubRes.ok) {
        const err = await pubRes.text();
        publishWarning = `Items created but publish step failed: ${err.substring(0, 200)}`;
      }
    } catch (e: any) {
      publishWarning = `Items created but publish step threw: ${e?.message}`;
    }
  }

  const succeeded = results.filter((r) => r.ok).length;
  return new Response(JSON.stringify({
    succeeded,
    failed: results.length - succeeded,
    results,
    ...(publishWarning ? { publishWarning } : {}),
  }), {
    status: 200, headers: { 'Content-Type': 'application/json' },
  });
};
