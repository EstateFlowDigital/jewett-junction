import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { getWebflowApiToken } from '../../lib/admin-auth';
import { sendNotification } from '../../lib/notify';
import { mapSubmissionToFieldData } from '../../lib/form-submission-mapper';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

interface ITTicket {
  name: string;          // submitter name
  email: string;
  department?: string;
  category: string;      // Hardware / Software / Access / Network / Other
  urgency?: string;      // Low / Normal / High / Urgent
  device?: string;
  title: string;         // short description
  description: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  let data: ITTicket;
  try { data = await request.json(); }
  catch { return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } }); }

  if (!data.name || !data.email || !data.title || !data.description) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (data.title.length > 200 || data.description.length > 10000) {
    return new Response(JSON.stringify({ error: 'Field too long' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const apiToken = getWebflowApiToken(locals);
  const collectionId = COLLECTIONS.formSubmissions;
  if (!apiToken || !collectionId) {
    return new Response(JSON.stringify({ error: 'Server not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  // Mirror IT tickets into the Form Submissions collection so they triage
  // alongside other inbound messages, with Form Name = "IT Ticket".
  const submissionId = `it-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const fieldData = mapSubmissionToFieldData({
    id: submissionId,
    formId: 'it-ticket',
    displayName: 'IT Ticket',
    formResponse: {
      'Title': data.title,
      'Description': data.description,
      'Type': data.category || 'Other',
      'Urgency': data.urgency || '',
      'Device': data.device || '',
      'Department': data.department || '',
      'Submitted By': data.name,
      'Email': data.email,
    },
    dateSubmitted: new Date().toISOString(),
    publishedPath: '/it-helpdesk',
  });

  try {
    const res = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json', 'accept': 'application/json' },
      body: JSON.stringify({ isArchived: false, isDraft: true, fieldData }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('it-ticket: Webflow create failed', res.status, err.substring(0, 300));
      return new Response(JSON.stringify({ error: 'Unable to record ticket' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }
    const created = await res.json();

    await sendNotification(locals, {
      inbox: 'it',
      subject: `[IT Ticket${data.urgency === 'Urgent' ? ' — URGENT' : ''}] ${data.title}`,
      replyTo: data.email,
      fields: [
        { label: 'Submitter', value: data.name },
        { label: 'Email', value: data.email },
        { label: 'Department', value: data.department },
        { label: 'Type', value: data.category },
        { label: 'Urgency', value: data.urgency },
        { label: 'Device', value: data.device },
        { label: 'Description', value: data.description },
      ],
    });

    return new Response(JSON.stringify({ success: true, id: created.id }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    console.error('it-ticket: exception', e?.message);
    return new Response(JSON.stringify({ error: 'Unable to record ticket' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
};
