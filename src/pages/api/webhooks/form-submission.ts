import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../../lib/webflow-cms';
import { getWebflowApiToken } from '../../../lib/admin-auth';
import { mapSubmissionToFieldData, mapWebhookPayload, submissionSlug } from '../../../lib/form-submission-mapper';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

function getWebhookSecret(locals: any): string | undefined {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.WEBFLOW_WEBHOOK_SECRET || (import.meta.env as any).WEBFLOW_WEBHOOK_SECRET;
}

async function findExistingByDedupSlug(collectionId: string, apiToken: string, submissionId: string): Promise<string | null> {
  const slug = submissionSlug(submissionId);
  const res = await fetch(
    `${BASE_URL}/collections/${collectionId}/items?${new URLSearchParams({ slug })}`,
    { headers: { Authorization: `Bearer ${apiToken}`, accept: 'application/json' } },
  );
  if (!res.ok) return null;
  const data = await res.json();
  const match = (data.items || []).find((i: any) => i?.fieldData?.slug === slug);
  return match?.id || null;
}

export const POST: APIRoute = async ({ request, url, locals }) => {
  // Simple shared-secret auth via query param. Webflow webhooks don't sign
  // requests in a v2-universal way, so we gate on a per-site secret instead.
  const providedSecret = url.searchParams.get('secret');
  const expectedSecret = getWebhookSecret(locals);
  if (!expectedSecret || providedSecret !== expectedSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const submission = mapWebhookPayload(body);
  if (!submission) {
    return new Response(JSON.stringify({ error: 'Missing submission payload' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const apiToken = getWebflowApiToken(locals);
  const collectionId = COLLECTIONS.formSubmissions;
  if (!apiToken || !collectionId) {
    console.error('webhook form-submission: missing api token or collection id');
    return new Response(JSON.stringify({ error: 'Server not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  // Idempotency: if we've already mirrored this submission, noop.
  const existingId = await findExistingByDedupSlug(collectionId, apiToken, submission.id);
  if (existingId) {
    return new Response(JSON.stringify({ success: true, deduped: true, id: existingId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const fieldData = mapSubmissionToFieldData(submission);

  const res = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({ isArchived: false, isDraft: false, fieldData }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error('webhook form-submission: Webflow create failed', res.status, err.substring(0, 500));
    return new Response(JSON.stringify({ error: 'Unable to record submission' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
  const created = await res.json();
  return new Response(JSON.stringify({ success: true, id: created.id }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
