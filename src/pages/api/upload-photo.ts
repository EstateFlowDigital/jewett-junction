import type { APIRoute } from 'astro';
import { getWebflowApiToken, getWebflowSiteId } from '../../lib/admin-auth';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// Public (intranet-gated by middleware IP allowlist) photo upload endpoint.
// Unlike /api/admin/upload this has no admin token gate — it backs the
// job site photo submission form, which any employee can use. Images only,
// 4 MB cap on the decoded bytes.
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB decoded

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// CORS preflight is handled by middleware
export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400);
    }

    const { fileName, fileType, fileData } = body || {};

    if (!fileData || typeof fileData !== 'string') {
      return json({ error: 'No file provided' }, 400);
    }
    if (!fileName || typeof fileName !== 'string') {
      return json({ error: 'File name is required' }, 400);
    }
    if (fileName.length > 255) {
      return json({ error: 'File name too long' }, 400);
    }
    if (typeof fileType !== 'string' || !ALLOWED_TYPES.includes(fileType)) {
      return json({ error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' }, 400);
    }

    // Base64 inflates the payload ~33% — reject obviously oversized payloads
    // before decoding, then validate the true decoded byte length.
    if (fileData.length > Math.ceil((MAX_BYTES * 4) / 3) + 1024) {
      return json({ error: 'File too large. Maximum size is 4 MB.' }, 400);
    }

    // Convert base64 to binary
    let binaryString: string;
    try {
      binaryString = atob(fileData);
    } catch {
      return json({ error: 'File data is not valid base64' }, 400);
    }

    if (binaryString.length > MAX_BYTES) {
      return json({ error: 'File too large. Maximum size is 4 MB.' }, 400);
    }
    if (binaryString.length === 0) {
      return json({ error: 'File is empty' }, 400);
    }

    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const fileBuffer = bytes.buffer;

    const apiToken = getWebflowApiToken(locals);
    const siteId = getWebflowSiteId(locals);
    if (!siteId || !apiToken) {
      console.error('upload-photo: Webflow credentials not configured');
      return json({ error: 'Server configuration error' }, 500);
    }

    // Generate unique, sanitized filename
    const timestamp = Date.now();
    const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_').slice(-100);
    const uniqueFileName = `${timestamp}-${safeName}`;

    const fileHash = await generateFileHashFromBuffer(fileBuffer);

    // Step 1: Reserve the asset with Webflow (returns an S3 upload target,
    // or an existing CDN URL when the hash already exists).
    const uploadRequestResponse = await fetch(`${BASE_URL}/sites/${siteId}/assets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ fileName: uniqueFileName, fileHash }),
    });

    if (!uploadRequestResponse.ok) {
      const errorText = await uploadRequestResponse.text();
      console.error('upload-photo: Webflow rejected upload request', uploadRequestResponse.status, errorText.substring(0, 300));
      throw new Error(`Failed to get upload URL: ${uploadRequestResponse.status}`);
    }

    const uploadData = await uploadRequestResponse.json();

    // Dedup short-circuit — Webflow returns the existing asset when the hash matches.
    if (uploadData.url && !uploadData.uploadUrl) {
      return json({ success: true, url: uploadData.url, id: uploadData.id }, 200);
    }

    if (!uploadData.uploadUrl) {
      console.error('upload-photo: no uploadUrl in Webflow response');
      throw new Error('No upload URL received from Webflow');
    }

    // Step 2: Push the bytes to the provided storage URL.
    let uploadResponse: Response;

    if (uploadData.uploadDetails) {
      // Hand-assemble the multipart body — FormData is unreliable on Workers.
      const boundary = '----WebflowUploadBoundary' + Date.now();
      let formBody = '';

      // The presigned policy fields must come before the file part.
      for (const [key, value] of Object.entries(uploadData.uploadDetails)) {
        formBody += `--${boundary}\r\n`;
        formBody += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
        formBody += `${value}\r\n`;
      }

      formBody += `--${boundary}\r\n`;
      formBody += `Content-Disposition: form-data; name="file"; filename="${uniqueFileName}"\r\n`;
      formBody += `Content-Type: ${fileType}\r\n\r\n`;

      const encoder = new TextEncoder();
      const preamble = encoder.encode(formBody);
      const epilogue = encoder.encode(`\r\n--${boundary}--\r\n`);

      const combinedBody = new Uint8Array(preamble.length + fileBuffer.byteLength + epilogue.length);
      combinedBody.set(preamble, 0);
      combinedBody.set(new Uint8Array(fileBuffer), preamble.length);
      combinedBody.set(epilogue, preamble.length + fileBuffer.byteLength);

      uploadResponse = await fetch(uploadData.uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
        body: combinedBody,
      });
    } else {
      // Fallback for direct presigned PUT URLs
      uploadResponse = await fetch(uploadData.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': fileType },
        body: fileBuffer,
      });
    }

    if (!uploadResponse.ok) {
      const s3ErrorText = await uploadResponse.text();
      console.error('upload-photo: storage upload failed', uploadResponse.status, s3ErrorText.substring(0, 300));
      throw new Error(`Failed to upload file to storage: ${uploadResponse.status}`);
    }

    const finalUrl = uploadData.url || uploadData.hostedUrl;

    return json({ success: true, url: finalUrl, id: uploadData.id }, 200);
  } catch (error: any) {
    console.error('upload-photo: exception', error?.message);
    return json({ error: 'Unable to upload photo. Please try again.' }, 500);
  }
};

// SHA-256 of the raw bytes — Webflow uses this for asset deduplication.
async function generateFileHashFromBuffer(buffer: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
