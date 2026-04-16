import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

interface SignageRequest {
  requesterName: string;
  department: string;
  signageType: string;
  projectName: string;
  neededByDate: string;
  deliveryAddress: string;
  quantity: number;
  specialInstructions?: string;
}

function getApiToken(locals: any): string {
  const runtime = locals?.runtime;
  return runtime?.env?.WEBFLOW_API_TOKEN || import.meta.env.WEBFLOW_API_TOKEN;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data: SignageRequest = await request.json();

    // Validate required fields
    const requiredFields = ['requesterName', 'department', 'signageType', 'projectName', 'neededByDate', 'deliveryAddress', 'quantity'];
    const missingFields = requiredFields.filter(field => !data[field as keyof SignageRequest]);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ success: false, error: `Missing required fields: ${missingFields.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (typeof data.quantity !== 'number' || data.quantity < 1) {
      return new Response(
        JSON.stringify({ success: false, error: 'Quantity must be a positive number' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiToken = getApiToken(locals);
    if (!apiToken) {
      console.error('WEBFLOW_API_TOKEN not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Store signage requests in submittedIdeas collection with clear categorization
    const collectionId = COLLECTIONS.submittedIdeas;
    if (!collectionId) {
      console.error('submittedIdeas collection ID not found');
      return new Response(
        JSON.stringify({ success: false, error: 'Collection not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const title = `Signage Request: ${data.signageType} - ${data.projectName}`;

    // Format details into the description field
    const description = [
      `Signage Type: ${data.signageType}`,
      `Project: ${data.projectName}`,
      `Quantity: ${data.quantity}`,
      `Needed By: ${data.neededByDate}`,
      `Delivery Address: ${data.deliveryAddress}`,
      data.specialInstructions ? `\nSpecial Instructions:\n${data.specialInstructions}` : '',
    ].filter(Boolean).join('\n');

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 100);

    const fieldData: Record<string, any> = {
      name: title,
      slug,
      category: 'Other',
      description,
      'submitted-by': data.requesterName,
      department: data.department,
      status: 'New',
      priority: 'Medium',
      votes: 0,
    };

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
      console.error('Webflow API error creating signage request:', errorText);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to submit request. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Signage request submitted successfully',
        requestId: result.id,
        estimatedResponse: '2-3 business days',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error processing signage request:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to process request. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// CORS preflight is handled by middleware
export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204 });
};
