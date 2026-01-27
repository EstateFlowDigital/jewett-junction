import type { APIRoute } from 'astro';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

// POST - Upload asset to Webflow
export const POST: APIRoute = async ({ request, locals }) => {
  if (!verifyToken(request)) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getEnvVar(locals, 'WEBFLOW_API_TOKEN');
  const siteId = getEnvVar(locals, 'WEBFLOW_SITE_ID');

  if (!siteId || !apiToken) {
    const runtime = (locals as any)?.runtime;
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
    // Get the form data with file
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'admin-uploads';

    if (!file) {
      return withCors(new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return withCors(new Response(JSON.stringify({
        error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Validate file size (max 4MB for images)
    const maxSize = 4 * 1024 * 1024; // 4MB
    if (file.size > maxSize) {
      return withCors(new Response(JSON.stringify({
        error: 'File too large. Maximum size is 4MB'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Generate unique filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}-${safeName}`;

    // Step 1: Request upload URL from Webflow
    const uploadRequestResponse = await fetch(`${BASE_URL}/sites/${siteId}/assets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        fileName: fileName,
        fileHash: await generateFileHash(file),
        parentFolder: folder
      })
    });

    if (!uploadRequestResponse.ok) {
      const errorData = await uploadRequestResponse.json();
      console.error('Webflow upload request error:', errorData);
      throw new Error(errorData.message || `Failed to get upload URL: ${uploadRequestResponse.status}`);
    }

    const uploadData = await uploadRequestResponse.json();

    // Check if asset already exists (Webflow returns existing URL if hash matches)
    if (uploadData.url) {
      return withCors(new Response(JSON.stringify({
        success: true,
        url: uploadData.url,
        id: uploadData.id,
        fileName: uploadData.displayName || fileName
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Step 2: Upload file to the provided S3 URL
    if (uploadData.uploadUrl) {
      const fileBuffer = await file.arrayBuffer();

      const uploadResponse = await fetch(uploadData.uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'Content-Length': file.size.toString()
        },
        body: fileBuffer
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload file to storage: ${uploadResponse.status}`);
      }

      // Return the final CDN URL
      return withCors(new Response(JSON.stringify({
        success: true,
        url: uploadData.url || uploadData.hostedUrl,
        id: uploadData.id,
        fileName: uploadData.displayName || fileName
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    throw new Error('No upload URL received from Webflow');

  } catch (error: any) {
    console.error('Error uploading asset:', error);
    return withCors(new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};

// Generate a simple hash for the file (for Webflow deduplication)
async function generateFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
