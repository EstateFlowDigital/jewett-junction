import type { APIRoute } from 'astro';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
};

// Helper to add CORS headers to any response
function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

// Get env vars from runtime context (Cloudflare) or fallback to import.meta.env (local dev)
function getEnvVar(locals: any, key: string): string {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.[key] || (import.meta.env as any)[key];
}

// Verify admin token
function verifyToken(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token || !token.startsWith('admin_')) {
    return false;
  }

  const parts = token.split('_');
  if (parts.length !== 3) return false;

  const timestamp = parseInt(parts[2], 36);
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  return now - timestamp <= maxAge;
}

// OPTIONS - Handle CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
};

// ALL - Fallback handler for any method
export const ALL: APIRoute = async ({ request }) => {
  // Handle OPTIONS for CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // For any other unexpected method
  return withCors(new Response(JSON.stringify({
    error: `Method ${request.method} not allowed`,
    allowedMethods: ['POST', 'OPTIONS']
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  }));
};

// POST - Upload asset to Webflow
export const POST: APIRoute = async ({ request, locals }) => {
  console.log('=== UPLOAD REQUEST RECEIVED ===');
  console.log('Request method:', request.method);
  console.log('Request URL:', request.url);
  console.log('Request headers:', Object.fromEntries(request.headers.entries()));

  // Check authorization
  const authHeader = request.headers.get('Authorization');
  console.log('Auth header present:', !!authHeader);
  console.log('Auth header prefix:', authHeader?.substring(0, 20));

  if (!verifyToken(request)) {
    console.log('UPLOAD ERROR: Token verification failed');
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
  console.log('Token verified successfully');

  const runtime = (locals as any)?.runtime;
  console.log('Runtime exists:', !!runtime);
  console.log('Runtime env exists:', !!runtime?.env);
  console.log('Runtime env keys:', runtime?.env ? Object.keys(runtime.env) : []);

  const apiToken = getEnvVar(locals, 'WEBFLOW_API_TOKEN');
  const siteId = getEnvVar(locals, 'WEBFLOW_SITE_ID');

  console.log('WEBFLOW_API_TOKEN present:', !!apiToken);
  console.log('WEBFLOW_API_TOKEN length:', apiToken?.length || 0);
  console.log('WEBFLOW_SITE_ID:', siteId || 'NOT SET');

  if (!siteId || !apiToken) {
    console.log('UPLOAD ERROR: Missing credentials');
    return withCors(new Response(JSON.stringify({
      error: 'API credentials not configured',
      details: {
        siteIdPresent: !!siteId,
        apiTokenPresent: !!apiToken,
        runtimeExists: !!runtime,
        runtimeEnvKeys: runtime?.env ? Object.keys(runtime.env) : [],
        hint: 'For local dev, create a .dev.vars file with WEBFLOW_API_TOKEN. For production, set it in Webflow Cloud environment settings.'
      }
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  try {
    // Parse JSON body with base64 file data
    console.log('Parsing JSON body...');
    const body = await request.json();
    const { fileName, fileType, fileSize, fileData } = body;

    console.log('File name:', fileName || 'NOT PROVIDED');
    console.log('File type:', fileType || 'NOT PROVIDED');
    console.log('File size:', fileSize || 'NOT PROVIDED', 'bytes');
    console.log('File data length:', fileData?.length || 0, 'chars');

    if (!fileData || !fileName) {
      console.log('UPLOAD ERROR: Missing file data or name');
      return withCors(new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(fileType)) {
      console.log('UPLOAD ERROR: Invalid file type:', fileType);
      return withCors(new Response(JSON.stringify({
        error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Validate file size (max 3MB for images)
    // Note: Base64 encoding adds ~33% overhead, so 3MB file becomes ~4MB in request
    const maxSize = 3 * 1024 * 1024; // 3MB
    if (fileSize > maxSize) {
      console.log('UPLOAD ERROR: File too large:', fileSize);
      return withCors(new Response(JSON.stringify({
        error: 'File too large. Maximum size is 3MB'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Convert base64 to binary
    console.log('Decoding base64 data...');
    const binaryString = atob(fileData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const fileBuffer = bytes.buffer;
    console.log('Decoded buffer size:', fileBuffer.byteLength, 'bytes');

    // Generate unique filename
    const timestamp = Date.now();
    const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${timestamp}-${safeName}`;
    console.log('Generated filename:', uniqueFileName);

    // Generate file hash from buffer
    console.log('Generating file hash...');
    const fileHash = await generateFileHashFromBuffer(fileBuffer);
    console.log('File hash:', fileHash.substring(0, 16) + '...');

    // Step 1: Request upload URL from Webflow
    console.log('Step 1: Requesting upload URL from Webflow...');
    console.log('Webflow API endpoint:', `${BASE_URL}/sites/${siteId}/assets`);

    // Note: We don't use parentFolder as Webflow expects a valid folder ObjectId
    // Assets will be uploaded to the site root
    const uploadRequestBody = {
      fileName: uniqueFileName,
      fileHash: fileHash
    };
    console.log('Request body:', JSON.stringify(uploadRequestBody));

    const uploadRequestResponse = await fetch(`${BASE_URL}/sites/${siteId}/assets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(uploadRequestBody)
    });

    console.log('Webflow response status:', uploadRequestResponse.status);
    console.log('Webflow response headers:', Object.fromEntries(uploadRequestResponse.headers.entries()));

    if (!uploadRequestResponse.ok) {
      const errorText = await uploadRequestResponse.text();
      console.log('Webflow error response:', errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { rawResponse: errorText };
      }
      console.error('UPLOAD ERROR: Webflow rejected upload request:', errorData);
      throw new Error(errorData.message || errorData.error || `Failed to get upload URL: ${uploadRequestResponse.status}`);
    }

    const uploadData = await uploadRequestResponse.json();
    console.log('Webflow upload response:', JSON.stringify(uploadData, null, 2));

    // Check if asset already exists (Webflow returns existing URL if hash matches)
    if (uploadData.url && !uploadData.uploadUrl) {
      console.log('Asset already exists, returning cached URL:', uploadData.url);
      return withCors(new Response(JSON.stringify({
        success: true,
        url: uploadData.url,
        id: uploadData.id,
        fileName: uploadData.displayName || uniqueFileName,
        cached: true
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Step 2: Upload file to the provided S3 URL
    if (uploadData.uploadUrl) {
      console.log('Step 2: Uploading file to S3...');
      console.log('S3 upload URL:', uploadData.uploadUrl.substring(0, 100) + '...');
      console.log('File buffer size:', fileBuffer.byteLength, 'bytes');

      const uploadResponse = await fetch(uploadData.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': fileType,
          'Content-Length': fileSize.toString()
        },
        body: fileBuffer
      });

      console.log('S3 upload response status:', uploadResponse.status);

      if (!uploadResponse.ok) {
        const s3ErrorText = await uploadResponse.text();
        console.error('UPLOAD ERROR: S3 upload failed');
        console.error('S3 status:', uploadResponse.status);
        console.error('S3 response:', s3ErrorText.substring(0, 500));
        throw new Error(`Failed to upload file to storage: ${uploadResponse.status}`);
      }

      const finalUrl = uploadData.url || uploadData.hostedUrl;
      console.log('=== UPLOAD SUCCESS ===');
      console.log('Final URL:', finalUrl);

      // Return the final CDN URL
      return withCors(new Response(JSON.stringify({
        success: true,
        url: finalUrl,
        id: uploadData.id,
        fileName: uploadData.displayName || uniqueFileName
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    console.error('UPLOAD ERROR: No uploadUrl in Webflow response');
    throw new Error('No upload URL received from Webflow');

  } catch (error: any) {
    console.error('=== UPLOAD EXCEPTION ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return withCors(new Response(JSON.stringify({
      error: error.message,
      type: error.constructor.name
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};

// Generate a simple hash from ArrayBuffer (for Webflow deduplication)
async function generateFileHashFromBuffer(buffer: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
