import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../../lib/webflow-cms';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

function verifyToken(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  if (!token || !token.startsWith('admin_')) return false;
  const parts = token.slice('admin_'.length).split('.');
  if (parts.length !== 3) return false;
  const timestamp = parseInt(parts[1], 10);
  if (isNaN(timestamp)) return false;
  return Date.now() - timestamp <= 24 * 60 * 60 * 1000;
}

function getApiToken(locals: any): string {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.WEBFLOW_API_TOKEN || (import.meta.env as any).WEBFLOW_API_TOKEN;
}

export const POST: APIRoute = async ({ request, locals }) => {
  if (!verifyToken(request)) {
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

  const apiToken = getApiToken(locals);
  const results: Array<{ ok: boolean; row: number; error?: string; id?: string }> = [];

  for (let i = 0; i < rows.length; i++) {
    const fieldData = rows[i];
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
      }
    } catch (e: any) {
      results.push({ ok: false, row: i, error: e?.message || 'Unknown error' });
    }
  }

  const succeeded = results.filter((r) => r.ok).length;
  return new Response(JSON.stringify({ succeeded, failed: results.length - succeeded, results }), {
    status: 200, headers: { 'Content-Type': 'application/json' },
  });
};
