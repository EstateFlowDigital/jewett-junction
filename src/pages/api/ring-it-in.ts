import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { getWebflowApiToken } from '../../lib/admin-auth';
import { sendNotification } from '../../lib/notify';
import { mapSubmissionToFieldData } from '../../lib/form-submission-mapper';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

interface RingItInSubmission {
  submitterName: string;
  contractWin: string;
  shoutout: string;
  details?: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  let data: RingItInSubmission;
  try {
    data = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const requiredFields = ['submitterName', 'contractWin', 'shoutout'];
    const missingFields = requiredFields.filter(
      (field) => !String(data[field as keyof RingItInSubmission] || '').trim()
    );

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: `Missing required fields: ${missingFields.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Length caps on free-text fields — consistent with mission-nomination.ts.
    const caps: Array<[keyof RingItInSubmission, number]> = [
      ['submitterName', 160],
      ['contractWin', 500],
      ['shoutout', 500],
      ['details', 5000],
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

    // Mirror shoutouts into Form Submissions for unified intake triage.
    const collectionId = COLLECTIONS.formSubmissions;
    if (!collectionId) {
      console.error('formSubmissions collection ID not found');
      return new Response(
        JSON.stringify({ success: false, error: 'Collection not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const submissionId = `ringitin-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const fieldData = mapSubmissionToFieldData({
      id: submissionId,
      formId: 'ring-it-in',
      displayName: 'Ring It In — Contract Win',
      formResponse: {
        'Contract Win': data.contractWin,
        'Shoutout': data.shoutout,
        // Keyed "Submitted By" so the mapper's name matchers pick it up and the
        // admin triage list shows a person instead of a blank column.
        'Submitted By': data.submitterName,
        ...(data.details?.trim() ? { 'Additional Details': data.details } : {}),
      },
      dateSubmitted: new Date().toISOString(),
      publishedPath: '/ring-it-in',
    });

    // Create as draft — shoutouts are internal records, not public pages.
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
      console.error('Webflow API error creating Ring It In shoutout:', errorText.substring(0, 300));
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to submit shoutout. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();

    await sendNotification(locals, {
      inbox: 'ringItIn',
      subject: `[Ring It In] ${data.contractWin}`,
      fields: [
        { label: 'Contract Win', value: data.contractWin },
        { label: 'Shoutout', value: data.shoutout },
        { label: 'Submitted By', value: data.submitterName },
        { label: 'Additional Details', value: data.details },
      ],
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Shoutout submitted successfully',
        id: result.id,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error processing Ring It In shoutout:', error?.message);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to process shoutout. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// CORS preflight is handled by middleware
export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204 });
};
