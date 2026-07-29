import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { getWebflowApiToken } from '../../lib/admin-auth';
import { sendNotification } from '../../lib/notify';
import { mapSubmissionToFieldData } from '../../lib/form-submission-mapper';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

interface JobSitePhotoSubmission {
  submitterName: string;
  jobSite: string;
  description: string;
  photoUrl: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  let data: JobSitePhotoSubmission;
  try { data = await request.json(); }
  catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } }); }

  if (!data.submitterName || !data.jobSite || !data.description || !data.photoUrl) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // Length caps on free-text fields — consistent with it-ticket.ts / signage-request.ts
  const caps: Array<[keyof JobSitePhotoSubmission, number]> = [
    ['submitterName', 160],
    ['jobSite', 200],
    ['description', 5000],
    ['photoUrl', 2000],
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

  // Mirror photo submissions into Form Submissions for unified intake triage.
  // The photo lives as a CDN URL in the response body — the uploader has
  // already pushed the asset into the Webflow asset library.
  const submissionId = `jobsite-photo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const fieldData = mapSubmissionToFieldData({
    id: submissionId,
    formId: 'jobsite-photo',
    displayName: 'Job Site Photo Submission',
    formResponse: {
      'Job Site': data.jobSite,
      'Description': data.description,
      'Photo': data.photoUrl,
      'Submitted By': data.submitterName,
    },
    dateSubmitted: new Date().toISOString(),
    publishedPath: '/marketing/submit-photo',
  });

  try {
    // Create as draft — photo submissions are internal records, not public pages.
    const res = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json', 'accept': 'application/json' },
      body: JSON.stringify({ isArchived: false, isDraft: true, fieldData }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('jobsite-photo: Webflow create failed', res.status, err.substring(0, 300));
      return new Response(JSON.stringify({ error: 'Unable to record submission' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }
    const created = await res.json();

    await sendNotification(locals, {
      inbox: 'marketing',
      subject: `[Job Site Photo] ${data.jobSite}`,
      fields: [
        { label: 'Submitted By', value: data.submitterName },
        { label: 'Job Site', value: data.jobSite },
        { label: 'Description', value: data.description },
        { label: 'Photo', value: data.photoUrl },
      ],
    });

    return new Response(JSON.stringify({ success: true, id: created.id }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    console.error('jobsite-photo: exception', e?.message);
    return new Response(JSON.stringify({ error: 'Unable to record submission' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
};

// CORS preflight is handled by middleware
export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204 });
};
