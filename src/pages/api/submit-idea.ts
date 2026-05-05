import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { sendNotification } from '../../lib/notify';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

interface IdeaSubmission {
  name: string;
  email: string;
  department?: string;
  title: string;
  category: string;
  impact?: string;
  description: string;
  benefits?: string;
  resources?: string;
}

const categoryLabels: Record<string, string> = {
  process: 'Process Improvement',
  safety: 'Safety',
  cost: 'Cost Savings',
  culture: 'Culture',
  innovation: 'Technology',
  other: 'Other',
};

const impactLabels: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'High',
};

function getApiToken(locals: any): string {
  const runtime = locals?.runtime;
  return runtime?.env?.WEBFLOW_API_TOKEN || import.meta.env.WEBFLOW_API_TOKEN;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data: IdeaSubmission = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.title || !data.category || !data.description) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email shape
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(String(data.email).trim())) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Reasonable length caps to prevent abuse and avoid Webflow validation errors
    if (data.title.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Title too long (max 200 characters)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (data.name.length > 160) {
      return new Response(
        JSON.stringify({ error: 'Name too long' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (data.description.length > 10000 || (data.benefits && data.benefits.length > 5000) || (data.resources && data.resources.length > 5000)) {
      return new Response(
        JSON.stringify({ error: 'Free-text field too long' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiToken = getApiToken(locals);
    if (!apiToken) {
      console.error('WEBFLOW_API_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const collectionId = COLLECTIONS.submittedIdeas;
    if (!collectionId) {
      console.error('submittedIdeas collection ID not found');
      return new Response(
        JSON.stringify({ error: 'Collection not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build description with benefits and resources appended
    let fullDescription = data.description;
    if (data.benefits) {
      fullDescription += `\n\nExpected Benefits:\n${data.benefits}`;
    }
    if (data.resources) {
      fullDescription += `\n\nResources Needed:\n${data.resources}`;
    }

    // Map form data to Webflow CMS field slugs
    // Append a short random suffix to the slug so two submissions with the same title
    // don't collide (Webflow rejects duplicate slugs with a 409).
    const baseSlug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
    const uniqueSlug = `${baseSlug}-${Date.now().toString(36)}`;
    const fieldData: Record<string, any> = {
      name: data.title,
      slug: uniqueSlug,
      category: categoryLabels[data.category] || 'Other',
      description: fullDescription,
      'submitted-by': data.name,
      'email': data.email,
      status: 'New',
      priority: impactLabels[data.impact || 'medium'] || 'Medium',
      votes: 0,
    };

    if (data.department) {
      fieldData.department = data.department;
    }

    // Create as draft — submitted ideas are internal records, not public pages.
    // The admin UI shows drafts, so staff visibility is unaffected.
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
      console.error('Webflow API error creating idea:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to submit idea. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();

    await sendNotification(locals, {
      inbox: 'ideas',
      subject: `[Idea] ${data.title}`,
      replyTo: data.email,
      fields: [
        { label: 'Submitter', value: data.name },
        { label: 'Email', value: data.email },
        { label: 'Department', value: data.department },
        { label: 'Category', value: categoryLabels[data.category] || data.category },
        { label: 'Impact', value: impactLabels[data.impact || ''] || data.impact },
        { label: 'Description', value: data.description },
        { label: 'Expected Benefits', value: data.benefits },
        { label: 'Resources Needed', value: data.resources },
      ],
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Idea submitted successfully',
        id: result.id,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing idea submission:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// CORS preflight is handled by middleware
export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204 });
};
