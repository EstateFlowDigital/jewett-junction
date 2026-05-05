import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { sendNotification } from '../../lib/notify';

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

function getApiToken(locals: any): string {
  const runtime = locals?.runtime;
  return runtime?.env?.WEBFLOW_API_TOKEN || import.meta.env.WEBFLOW_API_TOKEN;
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

  const apiToken = getApiToken(locals);
  const collectionId = COLLECTIONS.submittedIdeas;
  if (!apiToken || !collectionId) {
    return new Response(JSON.stringify({ error: 'Server not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  const baseSlug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
  const fieldData: Record<string, any> = {
    name: `Safety Incident: ${data.title}`.slice(0, 256),
    slug: `safety-${baseSlug}-${Date.now().toString(36)}`,
    category: 'Safety',
    description: [
      `Incident Type: ${data.incidentType}`,
      data.severity ? `Severity: ${data.severity}` : '',
      data.jobSite ? `Job Site: ${data.jobSite}` : '',
      data.occurredAt ? `Occurred At: ${data.occurredAt}` : '',
      data.phone ? `Phone: ${data.phone}` : '',
      '',
      data.description,
      data.immediateActions ? `\nImmediate Actions Taken:\n${data.immediateActions}` : '',
    ].filter(Boolean).join('\n'),
    'submitted-by': data.name,
    email: data.email,
    status: 'New',
    priority: data.severity === 'Critical' || data.severity === 'High' ? 'High' : 'Medium',
    votes: 0,
  };
  if (data.department) fieldData.department = data.department;

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
