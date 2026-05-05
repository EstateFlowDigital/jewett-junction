import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { sendNotification } from '../../lib/notify';

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

function getApiToken(locals: any): string {
  const runtime = locals?.runtime;
  return runtime?.env?.WEBFLOW_API_TOKEN || import.meta.env.WEBFLOW_API_TOKEN;
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

  const apiToken = getApiToken(locals);
  const collectionId = COLLECTIONS.submittedIdeas;
  if (!apiToken || !collectionId) {
    return new Response(JSON.stringify({ error: 'Server not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  const baseSlug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
  const fieldData: Record<string, any> = {
    name: `IT Ticket: ${data.title}`.slice(0, 256),
    slug: `it-${baseSlug}-${Date.now().toString(36)}`,
    category: 'Technology',
    description: [
      `Type: ${data.category || 'Other'}`,
      data.device ? `Device: ${data.device}` : '',
      data.urgency ? `Urgency: ${data.urgency}` : '',
      '',
      data.description,
    ].filter(Boolean).join('\n'),
    'submitted-by': data.name,
    email: data.email,
    status: 'New',
    priority: data.urgency === 'Urgent' || data.urgency === 'High' ? 'High' : 'Medium',
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
