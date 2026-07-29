import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { getWebflowApiToken } from '../../lib/admin-auth';
import { sendNotification } from '../../lib/notify';
import { mapSubmissionToFieldData } from '../../lib/form-submission-mapper';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

interface SalesLead {
  submitterName: string;
  companyContact: string;
  reason: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  let data: SalesLead;
  try {
    data = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Validate required fields
    const requiredFields = ['submitterName', 'companyContact', 'reason'];
    const missingFields = requiredFields.filter(
      (field) => !String(data[field as keyof SalesLead] || '').trim()
    );

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: `Missing required fields: ${missingFields.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Length caps on free-text fields — consistent with signage-request.ts / it-ticket.ts
    const caps: Array<[keyof SalesLead, number]> = [
      ['submitterName', 160],
      ['companyContact', 200],
      ['reason', 5000],
    ];
    for (const [key, max] of caps) {
      const value = data[key];
      if (typeof value === 'string' && value.length > max) {
        return new Response(
          JSON.stringify({ success: false, error: `${key} too long (max ${max} characters)` }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const apiToken = getWebflowApiToken(locals);
    if (!apiToken) {
      console.error('WEBFLOW_API_TOKEN not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Mirror sales leads into Form Submissions for unified intake triage.
    const collectionId = COLLECTIONS.formSubmissions;
    if (!collectionId) {
      console.error('formSubmissions collection ID not found');
      return new Response(
        JSON.stringify({ success: false, error: 'Collection not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const submissionId = `lead-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const fieldData = mapSubmissionToFieldData({
      id: submissionId,
      formId: 'sales-lead',
      displayName: 'Internal Sales Lead',
      formResponse: {
        'Company / Contact': data.companyContact,
        'Reason for Submission': data.reason,
        'Submitted By': data.submitterName,
      },
      dateSubmitted: new Date().toISOString(),
      publishedPath: '/sales-lead',
    });

    // Create as draft — sales leads are internal records, not public pages.
    const response = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ isArchived: false, isDraft: true, fieldData }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webflow API error creating sales lead:', errorText.substring(0, 300));
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to submit lead. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();

    await sendNotification(locals, {
      inbox: 'salesLead',
      subject: `[Sales Lead] ${data.companyContact}`,
      fields: [
        { label: 'Company / Contact', value: data.companyContact },
        { label: 'Submitted By', value: data.submitterName },
        { label: 'Reason for Submission', value: data.reason },
      ],
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Sales lead submitted successfully',
        id: result.id,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error processing sales lead:', error?.message);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to process submission. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// CORS preflight is handled by middleware
export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204 });
};
