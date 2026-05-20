import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../../lib/webflow-cms';
import { getWebflowApiToken } from '../../../lib/admin-auth';
import { mapSubmissionToFieldData, mapWebhookPayload, submissionSlug } from '../../../lib/form-submission-mapper';
import { sendNotification, type InboxKey } from '../../../lib/notify';

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

// Pick the right notification inbox from the submitted form's display name.
// Falls back to 'ideas' (general inbox) for anything we don't recognize.
function inboxForForm(formName: string | undefined): InboxKey {
  const n = (formName || '').toLowerCase();
  if (/safety|incident|injury|hazard/.test(n)) return 'safety';
  if (/it\b|helpdesk|tech|software/.test(n)) return 'it';
  if (/hr\b|human\s*resources|benefits|payroll/.test(n)) return 'hr';
  if (/signage|sign\b|marketing/.test(n)) return 'signage';
  return 'ideas';
}

export const POST: APIRoute = async ({ request, url, locals }) => {
  // Shared-secret auth. Prefer the X-Webflow-Secret header (doesn't appear in
  // browser/CDN/proxy logs), but fall back to the ?secret= query param for
  // older Webflow webhook configurations that can only use URL params.
  const providedSecret =
    request.headers.get('x-webflow-secret') ||
    request.headers.get('x-webhook-secret') ||
    url.searchParams.get('secret');
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

  // Mirror incoming form submissions as drafts — these are internal records for
  // the intranet Form Submissions page, not public CMS pages. Admin list shows drafts.
  const res = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({ isArchived: false, isDraft: true, fieldData }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error('webhook form-submission: Webflow create failed', res.status, err.substring(0, 500));
    return new Response(JSON.stringify({ error: 'Unable to record submission' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
  const created = await res.json();

  // Email-notify the right inbox. Best-effort — failures are logged inside
  // sendNotification but never fail the webhook (the CMS write is the source
  // of truth; the email is a convenience for the team).
  try {
    const inbox = inboxForForm(fieldData['form-name']);
    const summaryFields = [
      { label: 'Form', value: fieldData['form-name'] },
      { label: 'Submitted', value: fieldData['submitted-at'] },
      { label: 'Name', value: fieldData['submitter-name'] },
      { label: 'Email', value: fieldData['submitter-email'] },
      { label: 'Phone', value: fieldData['submitter-phone'] },
      { label: 'Page', value: fieldData['published-path'] },
    ];
    await sendNotification(locals, {
      inbox,
      subject: `[Jewett Junction] ${fieldData['form-name'] || 'New form submission'}${fieldData['submitter-name'] ? ` from ${fieldData['submitter-name']}` : ''}`,
      fields: summaryFields,
      replyTo: fieldData['submitter-email'] || undefined,
    });
  } catch (err: any) {
    console.error('webhook form-submission: notify exception', err?.message);
  }

  return new Response(JSON.stringify({ success: true, id: created.id }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
