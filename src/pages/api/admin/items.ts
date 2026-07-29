import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../../lib/webflow-cms';
import { verifyAdminRequest, getWebflowApiToken } from '../../../lib/admin-auth';
import { getValidSlugs } from './schema';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// Valid Webflow field slugs for each collection.
// Only these fields are sent to Webflow API; unknown fields are dropped.
// Keep in sync with field lists in src/components/admin/collections.ts.
const VALID_FIELDS: Record<string, string[]> = {
  announcements: [
    'name', 'slug', 'content', 'image', 'blog-body-image', 'author', 'news-category', 'priority-level',
    'expiration-date', 'cta-text', 'cta-link', 'is-pinned', 'published-date'
  ],
  events: [
    'name', 'slug', 'event-date', 'end-date', 'banner-image', 'location',
    'virtual-meeting-link', 'event-category', 'description', 'max-capacity', 'registration-link',
    'mandatory-attendance', 'virtual-event'
  ],
  jobPostings: [
    'name', 'slug', 'job-department', 'location', 'employment-type', 'experience-level',
    'salary-min', 'salary-max', 'description', 'requirements', 'benefits',
    'referral-bonus', 'apply-link', 'urgency', 'job-is-active', 'is-remote', 'featured'
  ],
  cultureStories: [
    'name', 'slug', 'story-type', 'featured-image', 'video-url', 'content', 'excerpt',
    'person-name', 'person-role', 'person-tenure', 'quote', 'author',
    'featured', 'published-date', 'category', 'image'
  ],
  employees: [
    'name', 'slug', 'photo', 'role', 'dept', 'office-location', 'email',
    'phone', 'extension', 'linkedin-url', 'support-portal-url', 'support-portal-message',
    'start-date', 'bio', 'skills',
    'certifications', 'is-featured', 'leadership-team', 'page-contact-for',
  ],
  resources: [
    'name', 'slug', 'thumbnail', 'resource-category', 'description', 'file-type',
    'external-link', 'file-size', 'last-updated', 'version', 'audience',
    'is-required', 'is-new', 'file', 'icon'
  ],
  hrContent: [
    'name', 'slug', 'content-type', 'icon', 'icon-color', 'description', 'full-content',
    'document-link', 'effective-date', 'applies-to', 'priority-order',
    'featured', 'is-active'
  ],
  safetyContent: [
    'name', 'slug', 'content-type', 'icon-color', 'image', 'severity', 'description',
    'full-content', 'document-link', 'video-link', 'expiration-date',
    'required-for', 'priority-order', 'featured', 'is-active'
  ],
  itKnowledgeBase: [
    'name', 'slug', 'article-type', 'icon', 'icon-color', 'summary', 'full-content',
    'video-tutorial', 'download-link', 'platform', 'difficulty', 'views',
    'helpful-votes', 'featured', 'is-active'
  ],
  marketingAssets: [
    'name', 'slug', 'asset-type', 'thumbnail', 'preview-image', 'description',
    'download-link', 'file-format', 'file-size', 'usage-guidelines', 'tags',
    'version', 'featured', 'is-active'
  ],
  submittedIdeas: [
    'name', 'slug', 'category', 'description', 'submitted-by', 'email',
    'department', 'status', 'priority', 'admin-notes', 'votes', 'featured'
  ],
  blogPosts: [
    'name', 'slug', 'date', 'main-image', 'main-image-alt-text', 'blog-body-image',
    'blog-body-image-alt', 'blog-page-heading-h1', 'blog-page-short-description',
    'blog-card-title-h2', 'blog-card-title-h3', 'blog-card-short-description',
    'blog-long-description', 'seo-title-tag', 'seo-meta-description',
    'cdn-image-visibility', 'cdn-image-url', 'additional-content-visibility',
    'video-visibility', 'video', 'min-image-height', 'object-position-2',
    'gallery-image-1-visibility', 'gallery-image-1', 'gallery-image-1-alt-text',
    'gallery-image-2-visibility', 'gallery-image-2', 'gallery-image-2-alt-text',
    'blog-related-to-industry', 'blog-category', 'airtable-id'
  ],
  blogCategories: [
    'name', 'slug', 'main-image', 'main-image-alt-text', 'category-name-eyebrow-text',
    'category-page-heading-h1', 'category-card-title-h2', 'category-card-short-description',
    'category-long-description', 'seo-title-tag', 'seo-meta-description',
    'airtable-id'
  ],
  faqs: [
    'name', 'slug', 'main-image', 'main-image-alt-text', 'faqs-card-title-h1',
    'faqs-card-title-h2', 'faqs-card-title-h3', 'faq-short-answer', 'faq-long-answer',
    'faq-category', 'seo-title-tag', 'seo-meta-description',
    'faq-related-to-service', 'faq-related-to-service-area'
  ],
  services: [
    'name', 'slug', 'main-image', 'main-image-alt-text', 'icon-svg-path-1',
    'is-reversed', 'service-page-heading-h1', 'service-page-short-description',
    'service-card-title-h2', 'service-card-title-h3', 'service-card-short-description',
    'service-long-description', 'seo-title-tag-2', 'seo-meta-description-2',
    'sort-order', 'line-visibility'
  ],
  industries: [
    'name', 'slug', 'main-image', 'main-image-alt-text', 'is-reversed',
    'industries-page-heading-h1', 'industries-page-short-description',
    'industries-card-title-h2', 'industries-card-title-h3', 'industries-card-short-description',
    'industries-long-description', 'seo-title-tag-2', 'seo-meta-description-2',
    'svg-icon-path-1', 'industry-button'
  ],
  serviceAreas: [
    'name', 'slug', 'main-image', 'main-image-alt-text', 'is-reversed',
    'service-area-page-heading-h1', 'service-area-page-short-description',
    'service-area-card-title-h2', 'service-area-card-title-h3',
    'service-area-card-short-description', 'service-area-long-description',
    'seo-title-tag-2', 'seo-meta-description-2'
  ],
  teamMembers: [
    'name', 'slug', 'main-image', 'main-image-alt-text',
    'team-members-page-heading-h1', 'team-members-page-short-description',
    'team-members-card-title-h2', 'team-members-card-title-h3',
    'team-members-card-short-description', 'team-members-long-description',
    'seo-title-tag', 'seo-meta-description', 'title',
    'linkedin-url', 'sort-order'
  ],
  ourWork: [
    'name', 'slug', 'main-image', 'main-image-alt-text',
    'our-work-page-heading-h1', 'our-work-page-short-description',
    'our-work-card-title-h2', 'our-work-card-title-h3',
    'our-work-card-short-description', 'our-work-long-description',
    'seo-title-tag', 'seo-meta-description', 'intro-section-heading-h2',
    'architect-designer', 'location', 'featured-project', 'video-url',
    'gallery', 'gallery-2', 'industries', 'related-service-area',
    'old-page-url', 'state-2', 'sort-order'
  ],
  imageGalleries: [
    'name', 'slug', 'main-image-file', 'main-image-alt-text'
  ],
  banner: [
    'name', 'slug', 'message', 'display-order', 'icon-color', 'expiration-date', 'is-active',
  ],
  jobApplications: [
    'name', 'slug', 'first-name', 'last-name', 'email', 'phone', 'position',
    'experience', 'referral-source', 'cover-letter', 'resume-file-name',
    'is-veteran', 'status', 'admin-notes', 'submitted-at',
  ],
  formSubmissions: [
    'name', 'slug', 'form-name', 'webflow-form-id', 'submission-id',
    'submitted-at', 'submitter-name', 'submitter-email', 'submitter-phone',
    'published-path', 'full-response', 'admin-notes', 'status',
  ],
  settings: [
    'name', 'slug',
    'eap-phone', 'eap-portal-url', 'poison-control-phone',
    'it-phone', 'it-email', 'it-hours-weekday', 'it-hours-saturday', 'it-emergency-hours',
    'hr-email', 'careers-email', 'marketing-email', 'safety-email',
    'default-referral-bonus',
    'hr-portal-adp', 'hr-portal-bcbs', 'hr-portal-fidelity',
    'safety-days-without-incident', 'safety-company-record-days',
    'safety-training-compliance', 'safety-active-sites',
    'culture-volunteer-hours', 'culture-donations',
    'signage-review-days', 'signage-production-days', 'signage-delivery-days',
    'safety-award-headline', 'safety-award-winner-name', 'safety-award-winner-title',
    'safety-award-photo', 'safety-award-message',
    'it-system-status-message', 'it-system-status-level',
    'social-facebook-url', 'social-instagram-url',
    'social-linkedin-url', 'social-youtube-url', 'marketing-apparel-store-url',
    'brand-heading-font', 'brand-body-font',
    'brand-color-1-name', 'brand-color-1-hex',
    'brand-color-2-name', 'brand-color-2-hex',
    'brand-color-3-name', 'brand-color-3-hex',
  ],
  pageCopy: [
    'name', 'slug',
    'hero-headline', 'hero-subtitle',
    'section-headline', 'section-body',
    'application-description',
    'subsection-1-headline', 'subsection-1-description',
    'subsection-2-headline', 'subsection-2-description',
    'content-block-1-title', 'content-block-1-body',
    'content-block-2-title', 'content-block-2-body',
    'content-block-3-title', 'content-block-3-body',
    'content-block-4-title', 'content-block-4-body',
    'footer-note',
  ],
  benefitLinks: [
    'name', 'slug', 'url', 'description', 'icon-name', 'sort-order', 'is-active',
  ],
  coreValues: [
    'name', 'slug', 'tagline', 'description', 'icon-name', 'color', 'sort-order', 'link-url',
  ],
  employeeBenefits: [
    'name', 'slug', 'description', 'icon-name', 'sort-order', 'is-active',
  ],
  companyAwards: [
    'name', 'slug', 'year', 'sort-order', 'is-active',
  ],
  intranetSections: [
    'name', 'slug', 'destination-url', 'description', 'icon-svg-path',
    'gradient', 'accent-color', 'sort-order', 'is-active',
  ],
  quickActions: [
    'name', 'slug', 'page-slug', 'title', 'subtitle', 'description', 'button-label',
    'destination-url', 'icon-name', 'accent-color', 'sort-order', 'is-active',
  ],
  uiStrings: [
    'name', 'slug', 'value',
  ],
};

// Filter fields to only include valid ones for the collection.
// Source of truth = the live Webflow schema. When the schema fetch succeeds,
// we ONLY send fields that exist on the CMS — sending an unknown field makes
// Webflow reject the whole PATCH with a validation error, so dropping
// out-of-schema fields silently is the only way the rest of the save can land.
// VALID_FIELDS is the fallback used only when the schema fetch fails.
async function filterValidFields(
  collection: string,
  fields: Record<string, any>,
  apiToken: string,
): Promise<Record<string, any>> {
  const collectionId = (COLLECTIONS as Record<string, string>)[collection];
  let liveSlugs: string[] | null = null;
  if (collectionId && apiToken) {
    liveSlugs = await getValidSlugs(collectionId, apiToken);
  }

  const hardcoded = VALID_FIELDS[collection];
  // Prefer live schema when available; otherwise fall back to hardcoded list.
  const allowed = liveSlugs && liveSlugs.length > 0
    ? new Set<string>(liveSlugs)
    : new Set<string>(hardcoded || []);

  // Developer hint: hardcoded entries we've added but the CMS schema doesn't
  // know about yet. Logged once per save so we notice when our code is ahead
  // of Webflow Designer.
  if (liveSlugs && hardcoded) {
    const missing = hardcoded.filter((s) => !allowed.has(s));
    if (missing.length > 0) {
      console.warn(`[items] collection "${collection}" — fields in code but not in Webflow schema:`, missing);
    }
  }

  if (allowed.size === 0) {
    return Object.fromEntries(
      Object.entries(fields).filter(([_, value]) => value !== undefined && value !== null && value !== ''),
    );
  }

  return Object.fromEntries(
    Object.entries(fields).filter(([key, value]) => {
      const hasValue = value !== undefined && value !== null && value !== '';
      return allowed.has(key) && hasValue;
    }),
  );
}

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

  // For any unexpected method
  return withCors(new Response(JSON.stringify({
    error: `Method ${request.method} not allowed`,
    allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
  }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  }));
};

// GET - List items from a collection
export const GET: APIRoute = async ({ request, url, locals }) => {
  if (!(await verifyAdminRequest(request, locals))) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const collection = url.searchParams.get('collection');
  if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
    return withCors(new Response(JSON.stringify({ error: 'Invalid collection' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];
  const apiToken = getWebflowApiToken(locals);

  try {
    // Fetch the collection schema once so we can translate Option-typed field
    // values (which Webflow returns as 32-char hex IDs) back into human-readable
    // names. Without this, the admin select widget can't match the saved value
    // to its <option>s and the dropdown looks blank.
    const schemaRes = await fetch(`${BASE_URL}/collections/${collectionId}`, {
      headers: { 'Authorization': `Bearer ${apiToken}`, 'accept': 'application/json' }
    });
    const schema = schemaRes.ok ? await schemaRes.json() : { fields: [] };
    const optionMaps = new Map<string, Map<string, string>>();
    for (const f of (schema.fields || [])) {
      if (f.type === 'Option' && f.validations?.options) {
        const m = new Map<string, string>();
        for (const o of f.validations.options) m.set(o.id, o.name);
        optionMaps.set(f.slug, m);
      }
    }
    const resolveOptions = (fieldData: Record<string, any>) => {
      const out = { ...fieldData };
      for (const [slug, idToName] of optionMaps) {
        const v = out[slug];
        if (typeof v === 'string' && idToName.has(v)) out[slug] = idToName.get(v);
      }
      return out;
    };

    // Webflow's list endpoint caps at 100 items/page — paginate to fetch them all
    // so collections that exceed 100 (e.g. Blog Posts) don't silently truncate in the admin.
    const PAGE_SIZE = 100;
    const HARD_CAP = 2000; // safety: stop after 20 pages to avoid runaway loops
    const allItems: any[] = [];
    let offset = 0;
    let total = 0;

    while (offset < HARD_CAP) {
      const url = `${BASE_URL}/collections/${collectionId}/items?limit=${PAGE_SIZE}&offset=${offset}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Webflow API error: ${response.status}`);
      }

      const page = await response.json();
      const pageItems = Array.isArray(page.items) ? page.items : [];
      for (const item of pageItems) {
        if (item && item.fieldData) item.fieldData = resolveOptions(item.fieldData);
      }
      allItems.push(...pageItems);
      total = page.pagination?.total ?? allItems.length;

      if (pageItems.length < PAGE_SIZE || allItems.length >= total) break;
      offset += PAGE_SIZE;
    }

    return withCors(new Response(JSON.stringify({ items: allItems, pagination: { total } }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error: any) {
    console.error('Error fetching items:', error);
    return withCors(new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};

// POST - Create new item
export const POST: APIRoute = async ({ request, locals }) => {

  if (!(await verifyAdminRequest(request, locals))) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getWebflowApiToken(locals);

  try {
    const { collection, fields, isLive = false } = await request.json();


    if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
      return withCors(new Response(JSON.stringify({ error: 'Invalid collection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Filter to only valid Webflow fields for this collection
    const filteredFields = await filterValidFields(collection, fields || {}, apiToken || '');

    const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];

    // Create item. isDraft false when publishing (required so Webflow will actually publish it),
    // true when user chose Save as Draft.
    const response = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        isArchived: false,
        isDraft: !isLive,
        fieldData: filteredFields
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('POST: Webflow error response:', errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { rawResponse: errorText };
      }
      const details = errorData.details || errorData.problems || errorData.err;
      const detailMsg = details ? ` Details: ${JSON.stringify(details)}` : '';
      return withCors(new Response(JSON.stringify({
        error: (errorData.message || `Webflow API error: ${response.status}`) + detailMsg,
        webflowError: errorData,
        status: response.status
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    const data = await response.json();

    // If requested live, publish the newly-created item
    if (isLive && data.id) {
      const publishRes = await fetch(`${BASE_URL}/collections/${collectionId}/items/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify({ itemIds: [data.id] })
      });
      if (!publishRes.ok) {
        const pubErr = await publishRes.text();
        console.error('POST: publish step failed:', pubErr);
        // Item was created successfully; surface publish failure as non-fatal warning
        return withCors(new Response(JSON.stringify({
          success: true,
          item: data,
          publishWarning: `Item saved but publish failed: ${pubErr.substring(0, 200)}`
        }), { status: 201, headers: { 'Content-Type': 'application/json' } }));
      }
    }

    return withCors(new Response(JSON.stringify({ success: true, item: data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error: any) {
    console.error('Error creating item:', error);
    return withCors(new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};

// PATCH - Update item
export const PATCH: APIRoute = async ({ request, locals }) => {

  if (!(await verifyAdminRequest(request, locals))) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getWebflowApiToken(locals);

  try {
    const body = await request.json();
    const { collection, itemId, fields, isLive = false } = body;


    if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
      return withCors(new Response(JSON.stringify({ error: 'Invalid collection', collection }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    if (!itemId) {
      return withCors(new Response(JSON.stringify({ error: 'Item ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Filter to only valid Webflow fields for this collection
    const filteredFields = await filterValidFields(collection, fields || {}, apiToken || '');

    if (Object.keys(filteredFields).length === 0) {
      return withCors(new Response(JSON.stringify({ error: 'No valid fields to update' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];

    // Update staged item (works regardless of site publish state)
    const url = `${BASE_URL}/collections/${collectionId}/items/${itemId}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        isArchived: false,
        isDraft: !isLive,
        fieldData: filteredFields
      })
    });


    if (!response.ok) {
      const errorText = await response.text();
      console.error('PATCH: Webflow error response:', errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { rawResponse: errorText };
      }
      return withCors(new Response(JSON.stringify({
        error: errorData.message || `Webflow API error: ${response.status}`,
        webflowError: errorData,
        status: response.status
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    const data = await response.json();

    // If requested live, publish the updated item
    if (isLive) {
      const publishRes = await fetch(`${BASE_URL}/collections/${collectionId}/items/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify({ itemIds: [itemId] })
      });
      if (!publishRes.ok) {
        const pubErr = await publishRes.text();
        console.error('PATCH: publish step failed:', pubErr);
        return withCors(new Response(JSON.stringify({
          success: true,
          item: data,
          publishWarning: `Item saved but publish failed: ${pubErr.substring(0, 200)}`
        }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
      }
    }

    return withCors(new Response(JSON.stringify({ success: true, item: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error: any) {
    console.error('PATCH: Exception:', error.message);
    console.error('PATCH: Stack:', error.stack);
    return withCors(new Response(JSON.stringify({ error: error.message, type: error.constructor.name }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};

// DELETE - Delete item
export const DELETE: APIRoute = async ({ request, locals }) => {
  if (!(await verifyAdminRequest(request, locals))) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getWebflowApiToken(locals);

  try {
    const { collection, itemId } = await request.json();

    if (!collection || !COLLECTIONS[collection as keyof typeof COLLECTIONS]) {
      return withCors(new Response(JSON.stringify({ error: 'Invalid collection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    if (!itemId) {
      return withCors(new Response(JSON.stringify({ error: 'Item ID required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    const collectionId = COLLECTIONS[collection as keyof typeof COLLECTIONS];

    const response = await fetch(`${BASE_URL}/collections/${collectionId}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok && response.status !== 204) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Webflow API error: ${response.status}`);
    }

    return withCors(new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error: any) {
    console.error('Error deleting item:', error);
    return withCors(new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};
