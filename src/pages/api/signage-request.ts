import type { APIRoute } from 'astro';

interface SignageRequest {
  requesterName: string;
  department: string;
  signageType: string;
  projectName: string;
  neededByDate: string;
  deliveryAddress: string;
  quantity: number;
  specialInstructions?: string;
  submittedAt: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: SignageRequest = await request.json();

    // Validate required fields
    const requiredFields = ['requesterName', 'department', 'signageType', 'projectName', 'neededByDate', 'deliveryAddress', 'quantity'];
    const missingFields = requiredFields.filter(field => !data[field as keyof SignageRequest]);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate quantity is a positive number
    if (typeof data.quantity !== 'number' || data.quantity < 1) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Quantity must be a positive number'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate date format
    const neededDate = new Date(data.neededByDate);
    if (isNaN(neededDate.getTime())) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid date format for neededByDate'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate a request ID
    const requestId = `SIGN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Log the request (in production, this would save to a database or send to an email service)
    console.log('Signage Request Received:', {
      requestId,
      ...data,
      receivedAt: new Date().toISOString()
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Signage request submitted successfully',
        requestId,
        estimatedResponse: '2-3 business days'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error processing signage request:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process request. Please try again.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// Handle OPTIONS for CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
