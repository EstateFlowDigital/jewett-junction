import { readFile, readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_ID = '67a464bc7184fcb8aacb0e8d';
const API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const BASE_URL = 'https://api.webflow.com/v2';
const ROOT = join(__dirname, '..', 'Website-Upload-Final');
const MANIFEST_PATH = join(__dirname, 'upload-manifest.json');

if (!API_TOKEN) {
  console.error('WEBFLOW_API_TOKEN not set');
  process.exit(1);
}

const CONTENT_TYPES = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

async function uploadOne(folder, fileName) {
  const filePath = join(ROOT, folder, fileName);
  const buf = await readFile(filePath);
  const fileHash = createHash('sha256').update(buf).digest('hex');
  const timestamp = Date.now();
  const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const uniqueName = `${timestamp}-${safeName}`;

  // Request upload URL
  const initRes = await fetch(`${BASE_URL}/sites/${SITE_ID}/assets`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ fileName: uniqueName, fileHash }),
  });
  if (!initRes.ok) {
    throw new Error(`init ${initRes.status}: ${await initRes.text()}`);
  }
  const initData = await initRes.json();

  // Cached (hash already exists)
  if (initData.url && !initData.uploadUrl) {
    return { id: initData.id, url: initData.url, cached: true };
  }

  // Multipart POST to S3
  const ext = extname(fileName).toLowerCase();
  const fileType = CONTENT_TYPES[ext] || 'application/octet-stream';
  const boundary = '----WebflowUploadBoundary' + timestamp + Math.random().toString(36).slice(2);

  let preamble = '';
  for (const [k, v] of Object.entries(initData.uploadDetails)) {
    preamble += `--${boundary}\r\nContent-Disposition: form-data; name="${k}"\r\n\r\n${v}\r\n`;
  }
  preamble += `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${uniqueName}"\r\nContent-Type: ${fileType}\r\n\r\n`;
  const epilogue = `\r\n--${boundary}--\r\n`;

  const preambleBuf = Buffer.from(preamble, 'utf8');
  const epilogueBuf = Buffer.from(epilogue, 'utf8');
  const body = Buffer.concat([preambleBuf, buf, epilogueBuf]);

  const s3Res = await fetch(initData.uploadUrl, {
    method: 'POST',
    headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
    body,
  });
  if (!s3Res.ok) {
    const t = await s3Res.text();
    throw new Error(`s3 ${s3Res.status}: ${t.slice(0, 200)}`);
  }
  return { id: initData.id, url: initData.url || initData.hostedUrl };
}

async function uploadFolder(folder, existing) {
  const files = (await readdir(join(ROOT, folder))).filter(f => !f.startsWith('.')).sort();
  const done = new Map((existing || []).map(e => [e.fileName, e]));
  const out = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    if (done.has(f)) {
      out.push(done.get(f));
      continue;
    }
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const r = await uploadOne(folder, f);
        out.push({ fileName: f, id: r.id, url: r.url, cached: !!r.cached });
        console.log(`  [${folder}] ${i + 1}/${files.length} ${f} → ${r.id}${r.cached ? ' (cached)' : ''}`);
        break;
      } catch (e) {
        console.log(`  [${folder}] ${f} attempt ${attempt} failed: ${e.message}`);
        if (attempt === 3) throw e;
        await new Promise(r => setTimeout(r, 1000 * attempt));
      }
    }
  }
  return out;
}

async function main() {
  const folders = (await readdir(ROOT, { withFileTypes: true }))
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();

  let manifest = {};
  if (existsSync(MANIFEST_PATH)) {
    manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
    console.log(`Resuming from manifest with ${Object.keys(manifest).length} folders already recorded`);
  }

  for (const folder of folders) {
    console.log(`\n=== ${folder} ===`);
    const results = await uploadFolder(folder, manifest[folder]);
    manifest[folder] = results;
    await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  }
  console.log(`\nDone. Manifest saved to ${MANIFEST_PATH}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
