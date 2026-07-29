import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { getWebflowApiToken } from '../../lib/admin-auth';
import { sendNotification } from '../../lib/notify';
import { mapSubmissionToFieldData } from '../../lib/form-submission-mapper';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

interface OpsSignageRequest {
  requesterName: string;
  projectSite: string;
  description: string;
  neededByDate: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  let data: OpsSignageRequest;
  try { data = await request.json(); }
  catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } }); }

  if (!data.requesterName || !data.projectSite || !data.description || !data.neededByDate) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // Length caps on free-text fields — consistent with signage-request.ts / it-ticket.ts
  const caps: Array<[keyof OpsSignageRequest, number]> = [
    ['requesterName', 160],
    ['projectSite', 200],
    ['description', 5000],
    ['neededByDate', 40],
  ];
  for (const [key, max] of caps) {
    const value = data[key];
    if (typeof value === 'string' && value.length > max) {
      return new Response(JSON.stringify({ error: `${key} too long (max ${max} characters)` }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
  }

  const apiToken = getWebflowApiToken(locals);
  const collectionId = COLLECTIONS.formSubmissions;
  if (!apiToken || !collectionId) {
    return new Response(JSON.stringify({ error: 'Server not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  // Mirror operations signage requests into Form Submissions for unified intake triage.
  const submissionId = `ops-signage-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const fieldData = mapSubmissionToFieldData({
    id: submissionId,
    formId: 'ops-signage-request',
    displayName: 'Operations Signage Request',
    formResponse: {
      'Project / Jobsite': data.projectSite,
      'Description': data.description,
      'Needed By': data.neededByDate,
      'Submitted By': data.requesterName,
    },
    dateSubmitted: new Date().toISOString(),
    publishedPath: '/safety/signage-request',
  });

  try {
    // Create as draft — signage requests are internal records, not public pages.
    const res = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json', 'accept': 'application/json' },
      body: JSON.stringify({ isArchived: false, isDraft: true, fieldData }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('ops-signage-request: Webflow create failed', res.status, err.substring(0, 300));
      return new Response(JSON.stringify({ error: 'Unable to record request' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }
    const created = await res.json();

    await sendNotification(locals, {
      inbox: 'signage',
      subject: `[Ops Signage] ${data.projectSite}`,
      fields: [
        { label: 'Submitted By', value: data.requesterName },
        { label: 'Project / Jobsite', value: data.projectSite },
        { label: 'Description', value: data.description },
        { label: 'Needed By', value: data.neededByDate },
      ],
    });

    return new Response(JSON.stringify({ success: true, id: created.id }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    console.error('ops-signage-request: exception', e?.message);
    return new Response(JSON.stringify({ error: 'Unable to record request' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
};

// CORS preflight is handled by middleware
export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204 });
};
