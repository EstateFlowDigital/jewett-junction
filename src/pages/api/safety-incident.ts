import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { getWebflowApiToken } from '../../lib/admin-auth';
import { sendNotification } from '../../lib/notify';
import { mapSubmissionToFieldData } from '../../lib/form-submission-mapper';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

interface SafetyIncident {
  name: string;            // reporter name
  email: string;
  phone?: string;
  department?: string;
  incidentType: string;    // Near-miss / Injury / Property damage / Hazard / Other
  severity?: string;       // Low / Medium / High / Critical
  jobSite?: string;
  occurredAt?: string;     // ISO date string
  title: string;           // short summary
  description: string;
  immediateActions?: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  let data: SafetyIncident;
  try { data = await request.json(); }
  catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } }); }

  if (!data.name || !data.email || !data.title || !data.description || !data.incidentType) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (data.title.length > 200 || data.description.length > 10000 || (data.immediateActions && data.immediateActions.length > 5000)) {
    return new Response(JSON.stringify({ error: 'Field too long' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const apiToken = getWebflowApiToken(locals);
  const collectionId = COLLECTIONS.formSubmissions;
  if (!apiToken || !collectionId) {
    return new Response(JSON.stringify({ error: 'Server not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  // Mirror safety incidents into Form Submissions with Form Name = "Safety Incident".
  const submissionId = `safety-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const fieldData = mapSubmissionToFieldData({
    id: submissionId,
    formId: 'safety-incident',
    displayName: 'Safety Incident',
    formResponse: {
      'Title': data.title,
      'Incident Type': data.incidentType,
      'Severity': data.severity || '',
      'Job Site': data.jobSite || '',
      'Occurred At': data.occurredAt || '',
      'Description': data.description,
      'Immediate Actions Taken': data.immediateActions || '',
      'Department': data.department || '',
      'Reporter': data.name,
      'Email': data.email,
      'Phone': data.phone || '',
    },
    dateSubmitted: new Date().toISOString(),
    publishedPath: '/safety',
  });

  try {
    const res = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json', 'accept': 'application/json' },
      body: JSON.stringify({ isArchived: false, isDraft: true, fieldData }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('safety-incident: Webflow create failed', res.status, err.substring(0, 300));
      return new Response(JSON.stringify({ error: 'Unable to record incident' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }
    const created = await res.json();

    await sendNotification(locals, {
      inbox: 'safety',
      subject: `[Safety Incident${data.severity === 'Critical' ? ' — CRITICAL' : data.severity === 'High' ? ' — HIGH' : ''}] ${data.title}`,
      replyTo: data.email,
      fields: [
        { label: 'Reporter', value: data.name },
        { label: 'Email', value: data.email },
        { label: 'Phone', value: data.phone },
        { label: 'Department', value: data.department },
        { label: 'Incident Type', value: data.incidentType },
        { label: 'Severity', value: data.severity },
        { label: 'Job Site', value: data.jobSite },
        { label: 'Occurred At', value: data.occurredAt },
        { label: 'Description', value: data.description },
        { label: 'Immediate Actions Taken', value: data.immediateActions },
      ],
    });

    return new Response(JSON.stringify({ success: true, id: created.id }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    console.error('safety-incident: exception', e?.message);
    return new Response(JSON.stringify({ error: 'Unable to record incident' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
};
