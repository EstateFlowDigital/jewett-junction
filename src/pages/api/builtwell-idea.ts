import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { getWebflowApiToken } from '../../lib/admin-auth';
import { sendNotification } from '../../lib/notify';
import { mapSubmissionToFieldData } from '../../lib/form-submission-mapper';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

interface BuiltWellIdea {
  submitterName: string;
  idea: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  let data: BuiltWellIdea;
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
    const requiredFields = ['submitterName', 'idea'];
    const missingFields = requiredFields.filter(
      (field) => !String(data[field as keyof BuiltWellIdea] || '').trim()
    );

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: `Missing required fields: ${missingFields.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Length caps on free-text fields — consistent with signage-request.ts / it-ticket.ts
    const caps: Array<[keyof BuiltWellIdea, number]> = [
      ['submitterName', 160],
      ['idea', 5000],
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

    // Mirror BuiltWell ideas into Form Submissions for unified intake triage.
    const collectionId = COLLECTIONS.formSubmissions;
    if (!collectionId) {
      console.error('formSubmissions collection ID not found');
      return new Response(
        JSON.stringify({ success: false, error: 'Collection not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const submissionId = `builtwell-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const fieldData = mapSubmissionToFieldData({
      id: submissionId,
      formId: 'builtwell-idea',
      displayName: 'BuiltWell Idea',
      formResponse: {
        'Idea': data.idea,
        'Submitted By': data.submitterName,
      },
      dateSubmitted: new Date().toISOString(),
      publishedPath: '/builtwell',
    });

    // Create as draft — BuiltWell ideas are internal records, not public pages.
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
      console.error('Webflow API error creating BuiltWell idea:', errorText.substring(0, 300));
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to submit idea. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();

    await sendNotification(locals, {
      inbox: 'builtwell',
      subject: `[BuiltWell] Idea from ${data.submitterName}`,
      fields: [
        { label: 'Submitted By', value: data.submitterName },
        { label: 'Idea', value: data.idea },
      ],
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'BuiltWell idea submitted successfully',
        id: result.id,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error processing BuiltWell idea:', error?.message);
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
