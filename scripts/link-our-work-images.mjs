import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const COLLECTION_ID = '67a464bc7184fcb8aacb0ef9';
const BASE_URL = 'https://api.webflow.com/v2';
const MANIFEST_PATH = join(__dirname, 'upload-manifest.json');

if (!API_TOKEN) {
  console.error('WEBFLOW_API_TOKEN not set');
  process.exit(1);
}

// folder name → Webflow CMS item id
const FOLDER_TO_ITEM = {
  'autosaver-montpelier':  '69e934e8174498ebbcd75f6b',
  'berlin-city-nissan':    '67b7bd7cea31714312dcc21b',
  'best-ford':             '69e934e8174498ebbcd75f63',
  'bmw-west-springfield':  '69e934e8174498ebbcd75f67',
  'faiths-toyota-ford':    '69e934e8174498ebbcd75f69',
  'gibbs-garage':          '69e934e8174498ebbcd75f65',
  'lexus-northborough':    '67b7bd806e15b707f3e8ccf5',
  'long-cadillac':         '69c1ab8f7a9bfe5f93302e5f',
  'patriot-acura':         '69e934e8174498ebbcd75f61',
  'team-nissan':           '69e976d6dbabd166ef6fbcbd',
  'white-river-toyota':    '69e976d6dbabd166ef6fbcc6',
};

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));

  const items = [];
  for (const [folder, itemId] of Object.entries(FOLDER_TO_ITEM)) {
    const uploads = manifest[folder];
    if (!uploads || uploads.length === 0) {
      console.warn(`No uploads for ${folder}, skipping`);
      continue;
    }
    const [main, ...rest] = uploads;
    const toObj = u => ({ fileId: u.id, url: u.url, alt: null });
    const gallery = rest.slice(0, 25).map(toObj);
    const gallery2 = rest.slice(25, 50).map(toObj);
    items.push({
      id: itemId,
      fieldData: {
        'main-image': toObj(main),
        gallery,
        'gallery-2': gallery2,
      },
    });
    console.log(`${folder}: main=${main.fileName} gallery=${gallery.length} gallery-2=${gallery2.length}`);
  }

  // Update items one at a time via per-item endpoint
  console.log(`\nUpdating ${items.length} items (sequential, per-item)...`);
  for (const item of items) {
    const res = await fetch(`${BASE_URL}/collections/${COLLECTION_ID}/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ fieldData: item.fieldData }),
    });
    if (!res.ok) throw new Error(`update ${item.id} ${res.status}: ${await res.text()}`);
    const data = await res.json();
    const g = data.fieldData?.gallery?.length ?? 0;
    const g2 = data.fieldData?.['gallery-2']?.length ?? 0;
    console.log(`  ${item.id} ← gallery=${g} gallery-2=${g2}`);
  }

  // Publish items
  const itemIds = items.map(i => i.id);
  console.log(`\nPublishing ${itemIds.length} items...`);
  const pubRes = await fetch(`${BASE_URL}/collections/${COLLECTION_ID}/items/publish`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ itemIds }),
  });
  if (!pubRes.ok) {
    throw new Error(`publish ${pubRes.status}: ${await pubRes.text()}`);
  }
  const pubData = await pubRes.json();
  console.log(`Published: ${pubData.publishedItemIds?.length || 0}`);
  if (pubData.errors?.length) {
    console.log('Publish errors:', pubData.errors);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
