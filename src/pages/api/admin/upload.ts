import type { APIRoute } from 'astro';
import { verifyAdminRequest, getWebflowApiToken, getWebflowSiteId } from '../../../lib/admin-auth';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// CORS is handled by middleware — this is a passthrough for compatibility
function withCors(response: Response): Response {
  return response;
}

// CORS preflight is handled by middleware
export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204 });
};

// ALL - Fallback handler for any method
export const ALL: APIRoute = async ({ request }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
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
  if (!(await verifyAdminRequest(request, locals))) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getWebflowApiToken(locals);
  const siteId = getWebflowSiteId(locals);

  if (!siteId || !apiToken) {
    return withCors(new Response(JSON.stringify({
      error: 'API credentials not configured',
      hint: 'For local dev set WEBFLOW_API_TOKEN in .dev.vars; for production set it in Webflow Cloud env.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  try {
    const body = await request.json();
    const { fileName, fileType, fileSize, fileData } = body;

    if (!fileData || !fileName) {
      return withCors(new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'application/pdf',
    ];
    if (!allowedTypes.includes(fileType)) {
      return withCors(new Response(JSON.stringify({
        error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG, PDF'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Validate file size — type-aware limits
    // Note: Base64 encoding adds ~33% overhead; Webflow Cloud has request body size limits
    const imageMax = 750 * 1024;        // 750 KB
    const pdfMax = 5 * 1024 * 1024;     // 5 MB
    const maxSize = fileType === 'application/pdf' ? pdfMax : imageMax;
    if (fileSize > maxSize) {
      const kb = Math.round(maxSize / 1024);
      return withCors(new Response(JSON.stringify({
        error: `File too large. Maximum size is ${kb} KB for ${fileType === 'application/pdf' ? 'PDFs' : 'images'}.`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Convert base64 to binary
    const binaryString = atob(fileData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const fileBuffer = bytes.buffer;

    // Generate unique filename
    const timestamp = Date.now();
    const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${timestamp}-${safeName}`;

    // Generate file hash from buffer
    const fileHash = await generateFileHashFromBuffer(fileBuffer);

    // Step 1: Request upload URL from Webflow

    // Note: We don't use parentFolder as Webflow expects a valid folder ObjectId
    // Assets will be uploaded to the site root
    const uploadRequestBody = {
      fileName: uniqueFileName,
      fileHash: fileHash
    };

    const uploadRequestResponse = await fetch(`${BASE_URL}/sites/${siteId}/assets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(uploadRequestBody)
    });


    if (!uploadRequestResponse.ok) {
      const errorText = await uploadRequestResponse.text();
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

    // Check if asset already exists (Webflow returns existing URL if hash matches)
    if (uploadData.url && !uploadData.uploadUrl) {
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
      if (uploadData.uploadDetails) {
      }

      let uploadResponse: Response;

      // Check if Webflow provided uploadDetails (for S3 POST with presigned policy)
      if (uploadData.uploadDetails) {
        // Use multipart form upload with the provided form fields

        // Build form data manually since FormData isn't available in all runtimes
        const boundary = '----WebflowUploadBoundary' + Date.now();
        let formBody = '';

        // Add all uploadDetails fields first
        for (const [key, value] of Object.entries(uploadData.uploadDetails)) {
          formBody += `--${boundary}\r\n`;
          formBody += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
          formBody += `${value}\r\n`;
        }

        // Add the file last (this is required by S3)
        formBody += `--${boundary}\r\n`;
        formBody += `Content-Disposition: form-data; name="file"; filename="${uniqueFileName}"\r\n`;
        formBody += `Content-Type: ${fileType}\r\n\r\n`;

        // Convert form preamble to bytes
        const encoder = new TextEncoder();
        const preamble = encoder.encode(formBody);
        const epilogue = encoder.encode(`\r\n--${boundary}--\r\n`);

        // Combine preamble + file data + epilogue
        const combinedBody = new Uint8Array(preamble.length + fileBuffer.byteLength + epilogue.length);
        combinedBody.set(preamble, 0);
        combinedBody.set(new Uint8Array(fileBuffer), preamble.length);
        combinedBody.set(epilogue, preamble.length + fileBuffer.byteLength);

        uploadResponse = await fetch(uploadData.uploadUrl, {
          method: 'POST',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`
          },
          body: combinedBody
        });
      } else {
        // Fallback to simple PUT (for direct S3 presigned PUT URLs)
        uploadResponse = await fetch(uploadData.uploadUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': fileType
          },
          body: fileBuffer
        });
      }


      if (!uploadResponse.ok) {
        const s3ErrorText = await uploadResponse.text();
        console.error('UPLOAD ERROR: S3 upload failed');
        console.error('S3 status:', uploadResponse.status);
        console.error('S3 response:', s3ErrorText.substring(0, 500));
        throw new Error(`Failed to upload file to storage: ${uploadResponse.status}`);
      }

      const finalUrl = uploadData.url || uploadData.hostedUrl;

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
