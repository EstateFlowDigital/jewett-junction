import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { getWebflowApiToken } from '../../lib/admin-auth';
import { sendNotification } from '../../lib/notify';
import { mapSubmissionToFieldData } from '../../lib/form-submission-mapper';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

interface MarketingRequest {
  requesterName: string;
  projectSite: string;
  requestDescription: string;
  neededByDate: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  let data: MarketingRequest;
  try { data = await request.json(); }
  catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } }); }

  if (!data.requesterName || !data.projectSite || !data.requestDescription || !data.neededByDate) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // Length caps on free-text fields — consistent with it-ticket.ts / signage-request.ts
  const caps: Array<[keyof MarketingRequest, number]> = [
    ['requesterName', 160],
    ['projectSite', 200],
    ['requestDescription', 5000],
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

  // Mirror marketing requests into Form Submissions for unified intake triage.
  const submissionId = `marketing-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const fieldData = mapSubmissionToFieldData({
    id: submissionId,
    formId: 'marketing-request',
    displayName: 'General Marketing Request',
    formResponse: {
      'Jobsite / Project': data.projectSite,
      'Request Description': data.requestDescription,
      'Needed By': data.neededByDate,
      'Submitted By': data.requesterName,
    },
    dateSubmitted: new Date().toISOString(),
    publishedPath: '/marketing/request',
  });

  try {
    // Create as draft — marketing requests are internal records, not public pages.
    const res = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json', 'accept': 'application/json' },
      body: JSON.stringify({ isArchived: false, isDraft: true, fieldData }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('marketing-request: Webflow create failed', res.status, err.substring(0, 300));
      return new Response(JSON.stringify({ error: 'Unable to record request' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }
    const created = await res.json();

    await sendNotification(locals, {
      inbox: 'marketing',
      subject: `[Marketing Request] ${data.projectSite}`,
      fields: [
        { label: 'Submitted By', value: data.requesterName },
        { label: 'Jobsite / Project', value: data.projectSite },
        { label: 'Request Description', value: data.requestDescription },
        { label: 'Needed By', value: data.neededByDate },
      ],
    });

    return new Response(JSON.stringify({ success: true, id: created.id }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    console.error('marketing-request: exception', e?.message);
    return new Response(JSON.stringify({ error: 'Unable to record request' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
};

// CORS preflight is handled by middleware
export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204 });
};
