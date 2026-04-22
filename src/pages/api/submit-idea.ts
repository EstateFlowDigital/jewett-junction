import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';

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
    const fieldData: Record<string, any> = {
      name: data.title,
      slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
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

    // Create item in Webflow CMS
    const response = await fetch(`${BASE_URL}/collections/${collectionId}/items?live=true`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ fieldData }),
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
