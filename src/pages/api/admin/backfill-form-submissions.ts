import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../../lib/webflow-cms';
import { verifyAdminRequest, getWebflowApiToken, getWebflowSiteId } from '../../../lib/admin-auth';
import { mapSubmissionToFieldData, submissionSlug } from '../../../lib/form-submission-mapper';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';
const PAGE_SIZE = 100;
const MAX_BATCHES = 50; // safety cap: 50 × 100 = 5000 submissions per run

async function collectExistingDedupSlugs(collectionId: string, apiToken: string): Promise<Set<string>> {
  const slugs = new Set<string>();
  let offset = 0;
  while (offset < 10000) {
    const res = await fetch(
      `${BASE_URL}/collections/${collectionId}/items?${new URLSearchParams({ limit: String(PAGE_SIZE), offset: String(offset) })}`,
      { headers: { Authorization: `Bearer ${apiToken}`, accept: 'application/json' } },
    );
    if (!res.ok) break;
    const data = await res.json();
    for (const item of data.items || []) {
      const s = item?.fieldData?.slug;
      if (typeof s === 'string' && s.startsWith('sub-')) slugs.add(s);
    }
    const total = data.pagination?.total ?? 0;
    offset += PAGE_SIZE;
    if (offset >= total) break;
  }
  return slugs;
}

export const POST: APIRoute = async ({ request, locals }) => {
  if (!(await verifyAdminRequest(request, locals))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const apiToken = getWebflowApiToken(locals);
  const siteId = getWebflowSiteId(locals);
  const collectionId = COLLECTIONS.formSubmissions;
  if (!apiToken || !siteId || !collectionId) {
    return new Response(JSON.stringify({ error: 'Server not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  // Build a dedup set of slugs already mirrored so repeat runs are idempotent.
  const existingSlugs = await collectExistingDedupSlugs(collectionId, apiToken);

  let offset = 0;
  let scanned = 0;
  let created = 0;
  let skipped = 0;
  const failures: Array<{ submissionId: string; error: string }> = [];

  for (let batch = 0; batch < MAX_BATCHES; batch++) {
    const res = await fetch(
      `${BASE_URL}/sites/${siteId}/form_submissions?${new URLSearchParams({ limit: String(PAGE_SIZE), offset: String(offset) })}`,
      { headers: { Authorization: `Bearer ${apiToken}`, 'accept-version': '2.0.0' } },
    );
    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: `Webflow fetch failed: ${res.status}`, details: err.substring(0, 300), created, skipped, failures }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const data = await res.json();
    const submissions: any[] = data.formSubmissions || [];
    if (submissions.length === 0) break;

    for (const s of submissions) {
      scanned++;
      if (!s?.id) continue;
      const slug = submissionSlug(s.id);
      if (existingSlugs.has(slug)) {
        skipped++;
        continue;
      }
      const fieldData = mapSubmissionToFieldData({
        id: s.id,
        formId: s.formId,
        displayName: s.displayName,
        formResponse: s.formResponse,
        dateSubmitted: s.dateSubmitted,
        publishedPath: s.publishedPath,
      });
      const createRes = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({ isArchived: false, isDraft: false, fieldData }),
      });
      if (!createRes.ok) {
        const errText = await createRes.text();
        failures.push({ submissionId: s.id, error: errText.substring(0, 200) });
        continue;
      }
      existingSlugs.add(slug);
      created++;
    }

    const total = data.pagination?.total ?? 0;
    offset += PAGE_SIZE;
    if (offset >= total) break;
  }

  return new Response(JSON.stringify({ scanned, created, skipped, failed: failures.length, failures }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
