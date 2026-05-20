/**
 * Webflow CMS Integration
 *
 * This module provides functions to fetch content from Webflow CMS collections.
 * The client can edit these items directly in Webflow's visual editor.
 */

/**
 * Decode HTML entities in a string
 * Webflow sometimes returns HTML-encoded content (e.g., &lt;p&gt; instead of <p>)
 */
export function decodeHtmlEntities(html: string | undefined): string {
  if (!html) return '';

  // Common HTML entities
  const entities: Record<string, string> = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&#x2F;': '/',
    '&#x27;': "'",
    '&#x60;': '`',
  };

  let decoded = html;

  // Replace named entities
  for (const [entity, char] of Object.entries(entities)) {
    decoded = decoded.split(entity).join(char);
  }

  // Replace numeric entities (&#123; or &#x7B;)
  decoded = decoded.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));

  return decoded;
}

/**
 * Strip HTML tags from content (for previews)
 */
export function stripHtml(html: string | undefined): string {
  if (!html) return '';
  // First decode entities, then strip tags
  const decoded = decodeHtmlEntities(html);
  return decoded.replace(/<[^>]*>/g, '').trim();
}

// Runtime credentials (set via initCMS for Cloudflare Workers)
let runtimeApiToken: string | undefined;
let runtimeSiteId: string | undefined;

/**
 * Initialize CMS with runtime credentials from Cloudflare Workers
 * Call this from Astro pages before fetching CMS data:
 * ---
 * import { initCMS } from '../lib/webflow-cms';
 * initCMS(Astro.locals);
 * ---
 */
export function initCMS(locals: any): void {
  const runtime = locals?.runtime;
  if (runtime?.env) {
    runtimeApiToken = runtime.env.WEBFLOW_API_TOKEN;
    runtimeSiteId = runtime.env.WEBFLOW_SITE_ID;
  }
}

// Get API token - checks runtime first, then import.meta.env
function getApiToken(): string | undefined {
  return runtimeApiToken || import.meta.env.WEBFLOW_API_TOKEN;
}

// Get Site ID - checks runtime first, then import.meta.env
function getSiteId(): string {
  const siteId = runtimeSiteId || import.meta.env.WEBFLOW_SITE_ID;
  if (!siteId) {
    throw new Error('WEBFLOW_SITE_ID environment variable is not configured');
  }
  return siteId;
}

interface WebflowItem {
  id: string;
  cmsLocaleId: string | null;
  lastPublished: string | null;
  lastUpdated: string;
  createdOn: string;
  isArchived: boolean;
  isDraft: boolean;
  fieldData: Record<string, unknown>;
}

interface WebflowCollectionResponse {
  items: WebflowItem[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

// When Webflow's placeholder Option fields couldn't be updated via API we created
// new Option fields with different slugs. Display code still references the old keys,
// so aliasCollectionItem mirrors the new-slug values back onto the old keys.
const COLLECTION_FIELD_ALIASES: Record<string, Record<string, string>> = {
  // Maps oldKey → newKey per collection. Populated lazily because COLLECTIONS is defined below.
};

// Webflow returns Option-typed fields as the option's id (a 32-char hex string),
// not the human-readable name. We cache each collection's schema and translate
// option ids back to names so display code sees "Operations" instead of
// "6b86e1a59533bb60654993fc6bbf1bec". This also makes the admin select widget
// match the dropdown options on edit (otherwise selected value is the raw id
// which doesn't match any <option>, so the dropdown appears blank).
type SchemaField = { slug: string; type: string; validations?: { options?: Array<{ id: string; name: string }> } };
const COLLECTION_SCHEMAS = new Map<string, SchemaField[]>();
const COLLECTION_OPTION_MAPS = new Map<string, Map<string, Map<string, string>>>();

async function getCollectionSchema(collectionId: string, apiToken: string): Promise<SchemaField[]> {
  const cached = COLLECTION_SCHEMAS.get(collectionId);
  if (cached) return cached;
  try {
    const res = await fetch(`https://api.webflow.com/v2/collections/${collectionId}`, {
      headers: { Authorization: `Bearer ${apiToken}`, accept: 'application/json' },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const fields: SchemaField[] = data.fields || [];
    COLLECTION_SCHEMAS.set(collectionId, fields);
    // Pre-build the option-id-to-name lookup once per collection
    const fieldOptionMap = new Map<string, Map<string, string>>();
    for (const field of fields) {
      if (field.type === 'Option' && field.validations?.options) {
        const map = new Map<string, string>();
        for (const opt of field.validations.options) map.set(opt.id, opt.name);
        fieldOptionMap.set(field.slug, map);
      }
    }
    COLLECTION_OPTION_MAPS.set(collectionId, fieldOptionMap);
    return fields;
  } catch {
    return [];
  }
}

function resolveOptionIds(collectionId: string, fieldData: Record<string, unknown>): Record<string, unknown> {
  const optionMaps = COLLECTION_OPTION_MAPS.get(collectionId);
  if (!optionMaps || optionMaps.size === 0) return fieldData;
  const out = { ...fieldData };
  for (const [slug, idToName] of optionMaps) {
    const value = out[slug];
    if (typeof value === 'string' && idToName.has(value)) {
      out[slug] = idToName.get(value);
    }
  }
  return out;
}

function applyFieldAliases(collectionId: string, fieldData: Record<string, unknown>): Record<string, unknown> {
  const resolved = resolveOptionIds(collectionId, fieldData);
  const aliases = COLLECTION_FIELD_ALIASES[collectionId];
  if (!aliases) return resolved;
  const out = { ...resolved };
  // Always prefer the new (canonical) key when it has a value — the new field is
  // the source of truth, the old key is preserved only as a display alias.
  // This also rescues records where the old field still holds an unresolved
  // option id from a placeholder Option field that resolveOptionIds couldn't map.
  for (const [oldKey, newKey] of Object.entries(aliases)) {
    if (out[newKey] !== undefined && out[newKey] !== null && out[newKey] !== '') {
      out[oldKey] = out[newKey];
    }
  }
  return out;
}

/**
 * Fetch items from a Webflow CMS collection.
 *
 * When no `limit` is provided, auto-paginates through Webflow's 100-item page cap
 * so callers like `getBySlug` helpers and listing pages see every item — not just
 * the first 100. When a `limit` is provided, honors it and makes a single request.
 */
export async function getCollection<T = Record<string, unknown>>(
  collectionId: string,
  options: { limit?: number; offset?: number; slug?: string } = {}
): Promise<{ items: (T & { id: string })[]; total: number }> {
  const apiToken = getApiToken();
  if (!apiToken) {
    console.warn('WEBFLOW_API_TOKEN not set. Using mock data.');
    return { items: [], total: 0 };
  }

  const WEBFLOW_MAX_PAGE = 100;
  const HARD_CAP = 2000;
  // Preload schema so applyFieldAliases can resolve option IDs to names.
  await getCollectionSchema(collectionId, apiToken);
  const mapItem = (item: WebflowItem) => ({
    id: item.id,
    ...applyFieldAliases(collectionId, item.fieldData),
  });

  async function fetchPage(limit: number, offset: number, slug?: string): Promise<WebflowCollectionResponse> {
    const params = new URLSearchParams();
    params.set('limit', limit.toString());
    if (offset) params.set('offset', offset.toString());
    if (slug) params.set('slug', slug);
    const response = await fetch(
      `https://api.webflow.com/v2/collections/${collectionId}/items?${params}`,
      { headers: { Authorization: `Bearer ${apiToken}`, 'accept-version': '2.0.0' } }
    );
    if (!response.ok) {
      throw new Error(`Webflow API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  // Slug lookup: ask Webflow to filter server-side instead of fetching every item
  if (options.slug) {
    const data = await fetchPage(options.limit ?? 1, options.offset ?? 0, options.slug);
    return {
      items: data.items
        .filter(item => !item.isArchived && !item.isDraft)
        .map(mapItem) as (T & { id: string })[],
      total: data.pagination.total,
    };
  }

  // Single-page path when caller passed an explicit limit
  if (options.limit) {
    const data = await fetchPage(options.limit, options.offset ?? 0);
    return {
      items: data.items
        .filter(item => !item.isArchived && !item.isDraft)
        .map(mapItem) as (T & { id: string })[],
      total: data.pagination.total,
    };
  }

  // Auto-paginate to fetch all items
  const allRaw: WebflowItem[] = [];
  let offset = options.offset ?? 0;
  let total = 0;
  while (allRaw.length < HARD_CAP) {
    const page = await fetchPage(WEBFLOW_MAX_PAGE, offset);
    allRaw.push(...page.items);
    total = page.pagination.total;
    if (page.items.length < WEBFLOW_MAX_PAGE || allRaw.length >= total) break;
    offset += WEBFLOW_MAX_PAGE;
  }

  return {
    items: allRaw
      .filter(item => !item.isArchived && !item.isDraft)
      .map(mapItem) as (T & { id: string })[],
    total,
  };
}

/**
 * Fetch a single item from a Webflow CMS collection
 */
export async function getCollectionItem<T = Record<string, unknown>>(
  collectionId: string,
  itemId: string
): Promise<T & { id: string } | null> {
  const apiToken = getApiToken();
  if (!apiToken) {
    console.warn('WEBFLOW_API_TOKEN not set. Using mock data.');
    return null;
  }

  const response = await fetch(
    `https://api.webflow.com/v2/collections/${collectionId}/items/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'accept-version': '2.0.0',
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Webflow API error: ${response.status} ${response.statusText}`);
  }

  const item: WebflowItem = await response.json();

  if (item.isArchived || item.isDraft) return null;

  return {
    id: item.id,
    ...item.fieldData,
  } as T & { id: string };
}

/**
 * Get all collections for the site
 */
export async function listCollections(): Promise<{ id: string; displayName: string; slug: string }[]> {
  const apiToken = getApiToken();
  if (!apiToken) {
    console.warn('WEBFLOW_API_TOKEN not set.');
    return [];
  }

  const response = await fetch(
    `https://api.webflow.com/v2/sites/${getSiteId()}/collections`,
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'accept-version': '2.0.0',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Webflow API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.collections;
}

// ============================================
// Type definitions for Jewett Junction CMS
// ============================================

// NOTE: Many of these interfaces declare both the legacy slug and the
// current Webflow slug because COLLECTION_FIELD_ALIASES mirrors the new
// slug values onto the old keys at fetch time. Either name is safe to
// read; saves should always go to the new slug (admin handles this).

export interface Employee {
  name: string;
  slug: string;
  role: string;
  /** Canonical department — Webflow 'dept' Option field, 8 values */
  dept?: string;
  /** Legacy alias, mirrored from `dept` at fetch time for items not yet re-saved */
  department?: string;
  email?: string;
  phone?: string;
  photo?: { url: string; alt?: string };
  bio?: string;
  'start-date'?: string;
  'is-featured'?: boolean;
  'leadership-team'?: boolean;
  'office-location'?: string;
  extension?: string;
  'linkedin-url'?: string;
  skills?: string;
  certifications?: string;
}

export interface Announcement {
  name: string;
  slug: string;
  content: string;
  /** legacy alias of `priority-level` (placeholder Option) */
  priority: 'high' | 'normal' | 'low';
  /** real Webflow slug; values: Normal | High | Urgent */
  'priority-level'?: 'Normal' | 'High' | 'Urgent';
  'published-date': string;
  author?: string;
  'is-pinned'?: boolean;
  'news-category'?: string;
  'expiration-date'?: string;
  'cta-text'?: string;
  'cta-link'?: string;
}

export interface Event {
  name: string;
  slug: string;
  description?: string;
  'event-date': string;
  'end-date'?: string;
  location?: string;
  /** legacy alias of `event-category` (placeholder Option) */
  category?: string;
  'event-category'?: string;
  'banner-image'?: { url: string };
  'virtual-meeting-link'?: string;
  'max-capacity'?: number;
  'mandatory-attendance'?: boolean;
  'virtual-event'?: boolean;
  'registration-link'?: string;
}

export interface JobPosting {
  name: string;
  slug: string;
  /** legacy alias of `job-department` (placeholder Option) */
  department: string;
  /** real Webflow slug, full options */
  'job-department'?: string;
  location: string;
  description: string;
  requirements?: string;
  benefits?: string;
  'salary-min'?: number;
  'salary-max'?: number;
  'employment-type'?: string;
  'experience-level'?: string;
  urgency?: string;
  'is-remote'?: boolean;
  featured?: boolean;
  'referral-bonus'?: number;
  'apply-link'?: string;
  'job-is-active'?: boolean;
}

export interface CultureStory {
  name: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: { url: string; alt?: string };
  'featured-image'?: { url: string; alt?: string };
  'video-url'?: string;
  'person-name'?: string;
  'person-role'?: string;
  'person-tenure'?: string;
  quote?: string;
  featured?: boolean;
  author?: string;
  'published-date': string;
  /** legacy placeholder; `story-type` is the real classifier */
  category?: string;
  /** legacy alias preserved for back-compat */
  type?: string;
  'story-type'?: string;
}

export interface Resource {
  name: string;
  slug: string;
  description?: string;
  /** legacy alias of `resource-category` (placeholder Option) */
  category: string;
  'resource-category'?: string;
  file?: { url: string };
  'external-link'?: string;
  icon?: string;
  thumbnail?: { url: string };
  'file-type'?: string;
  'file-size'?: string;
  'last-updated'?: string;
  version?: string;
  audience?: string;
  'is-required'?: boolean;
  'is-new'?: boolean;
}

// ============================================
// Collection ID mapping (update after creating in Webflow)
// ============================================

export const COLLECTIONS = {
  // Existing collections
  employees: '69738d872d19741af9e461a1',
  announcements: '69738dd73f2d71626fcc6b0a',
  events: '69738e25a192594f2ba185f3',
  jobPostings: '69738e490bd2a14f9c7f1885',
  cultureStories: '69738e5ef6e68b6b209e404c',
  resources: '69738e7aaef2bb2746f8d943',
  // New collections
  hrContent: '69766742886e7381c5ab86c1',
  safetyContent: '69766745cde507f64937f1fc',
  itKnowledgeBase: '697667485f0556597dac1ce1',
  marketingAssets: '6976674b9d1917dbf6e1fb4d',
  submittedIdeas: '6976674fd3adf8bb054da4ce',
  blogPosts: '67a464bc7184fcb8aacb0f3e',
  blogCategories: '67a464bc7184fcb8aacb0f1c',
  faqs: '67a464bc7184fcb8aacb0f60',
  services: '67a464bc7184fcb8aacb0eb6',
  industries: '67a464bc7184fcb8aacb0eb7',
  serviceAreas: '67a464bc7184fcb8aacb0eb8',
  teamMembers: '67a464bc7184fcb8aacb0ed6',
  ourWork: '67a464bc7184fcb8aacb0ef9',
  imageGalleries: '67a464bc7184fcb8aacb0f82',
  banner: '69e83787ba03eb7aaf73abf0',
  jobApplications: '69e92188c048862f1a049a8d',
  formSubmissions: '69e95d7506997240e17e09bd',
  settings: '69fcc0eda58c76d3e2a92ad3',
  pageCopy: '6a0d59046808b5093596722b',
  coreValues: '69fcc5395999a5288927fdea',
  employeeBenefits: '69fcc53b891ff14c73b15107',
  companyAwards: '69fcc53c891ff14c73b151de',
} as const;

// Webflow placeholder Option fields we couldn't update via API got replaced by
// new fields with distinct slugs. This map lets fetched items expose BOTH keys
// so downstream display code can keep reading the older human-friendly name.
Object.assign(COLLECTION_FIELD_ALIASES, {
  // `dept` is the canonical employee department field; alias mirrors to
  // legacy `department` key so display code that hasn't been migrated still reads it.
  // The retired `team-department` field is no longer mirrored or written to.
  [COLLECTIONS.employees]: { department: 'dept' },
  [COLLECTIONS.announcements]: { priority: 'priority-level', category: 'news-category' },
  [COLLECTIONS.events]: { category: 'event-category' },
  [COLLECTIONS.jobPostings]: { department: 'job-department' },
  [COLLECTIONS.resources]: { category: 'resource-category' },
  // HR/Safety/IT: Webflow uses `full-content`; old display code reads `content`
  [COLLECTIONS.hrContent]: { content: 'full-content' },
  [COLLECTIONS.safetyContent]: { content: 'full-content' },
  [COLLECTIONS.itKnowledgeBase]: { content: 'full-content', 'video-link': 'video-tutorial' },
  // Culture Stories: renamed slug + dashboard reads `category`
  [COLLECTIONS.cultureStories]: { type: 'story-type', category: 'story-type' },
  // Submitted Ideas: placeholder renamed
  [COLLECTIONS.submittedIdeas]: { 'submitter-email': 'email' },
});

// ============================================
// Helper functions for specific collections
// ============================================

/**
 * Page Copy — one record per page (slug = 'careers', 'hr', 'safety', etc.).
 * Lets the client rewrite hero/section copy from the admin without code edits.
 */
export interface PageCopy {
  id?: string;
  name?: string;
  slug?: string;
  'hero-headline'?: string;
  'hero-subtitle'?: string;
  'section-headline'?: string;
  'section-body'?: string;
  'application-description'?: string;
}

/**
 * Fetch the Page Copy record for a given page slug. Returns null when nothing
 * is set so callers can fall back to their hardcoded defaults.
 */
let _pageCopyCache: Map<string, { data: PageCopy | null; ts: number }> | null = null;
const PAGE_COPY_CACHE_MS = 60 * 1000;
export async function getPageCopy(pageSlug: string): Promise<PageCopy | null> {
  if (!COLLECTIONS.pageCopy) return null;
  if (!_pageCopyCache) _pageCopyCache = new Map();
  const cached = _pageCopyCache.get(pageSlug);
  const now = Date.now();
  if (cached && now - cached.ts < PAGE_COPY_CACHE_MS) return cached.data;
  try {
    const result = await getCollection<PageCopy>(COLLECTIONS.pageCopy, { slug: pageSlug });
    const data = result.items.find((p) => p.slug === pageSlug) || null;
    _pageCopyCache.set(pageSlug, { data, ts: now });
    return data;
  } catch {
    return null;
  }
}

export interface SiteSettings {
  name?: string;
  slug?: string;
  'eap-phone'?: string;
  'eap-portal-url'?: string;
  'poison-control-phone'?: string;
  'it-phone'?: string;
  'it-email'?: string;
  'it-hours-weekday'?: string;
  'it-hours-saturday'?: string;
  'it-emergency-hours'?: string;
  'hr-email'?: string;
  'careers-email'?: string;
  'marketing-email'?: string;
  'safety-email'?: string;
  'default-referral-bonus'?: number;
  'hr-portal-adp'?: string;
  'hr-portal-bcbs'?: string;
  'hr-portal-fidelity'?: string;
  'safety-days-without-incident'?: number;
  'safety-company-record-days'?: number;
  'safety-training-compliance'?: number;
  'safety-active-sites'?: number;
  'culture-volunteer-hours'?: string;
  'culture-donations'?: string;
  'signage-review-days'?: string;
  'signage-production-days'?: string;
  'signage-delivery-days'?: string;
  'it-system-status-message'?: string;
  'it-system-status-level'?: string;
  'social-facebook-url'?: string;
  'social-instagram-url'?: string;
  'social-linkedin-url'?: string;
  'social-youtube-url'?: string;
  'brand-heading-font'?: string;
  'brand-body-font'?: string;
  'brand-color-1-name'?: string;
  'brand-color-1-hex'?: string;
  'brand-color-2-name'?: string;
  'brand-color-2-hex'?: string;
  'brand-color-3-name'?: string;
  'brand-color-3-hex'?: string;
}

/**
 * Site-wide configuration singleton. Returns the first item from the
 * Site Settings collection, or {} if the collection is empty.
 * Memoised per request so repeat callers in the same SSR pass don't refetch.
 */
let _siteSettingsCache: { data: SiteSettings; ts: number } | null = null;
const SETTINGS_CACHE_MS = 60 * 1000; // 60s within a runtime
export async function getSiteSettings(): Promise<SiteSettings> {
  const now = Date.now();
  if (_siteSettingsCache && now - _siteSettingsCache.ts < SETTINGS_CACHE_MS) {
    return _siteSettingsCache.data;
  }
  if (!COLLECTIONS.settings) return {};
  try {
    const result = await getCollection<SiteSettings>(COLLECTIONS.settings, { limit: 1 });
    const data = result.items[0] || {};
    _siteSettingsCache = { data, ts: now };
    return data;
  } catch {
    return {};
  }
}

export interface CoreValue {
  id: string;
  name?: string;
  slug?: string;
  tagline?: string;
  description?: string;
  'icon-name'?: string;
  color?: string;
  'sort-order'?: number;
}

export async function getCoreValues(): Promise<{ items: CoreValue[]; total: number }> {
  if (!COLLECTIONS.coreValues) return { items: [], total: 0 };
  const result = await getCollection<CoreValue>(COLLECTIONS.coreValues, { limit: 50 });
  const sorted = [...result.items].sort(
    (a, b) => (a['sort-order'] ?? 999) - (b['sort-order'] ?? 999),
  );
  return { items: sorted, total: result.total };
}

export interface EmployeeBenefit {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  'icon-name'?: string;
  'sort-order'?: number;
  'is-active'?: boolean;
}

export async function getEmployeeBenefits(): Promise<{ items: EmployeeBenefit[]; total: number }> {
  if (!COLLECTIONS.employeeBenefits) return { items: [], total: 0 };
  const result = await getCollection<EmployeeBenefit>(COLLECTIONS.employeeBenefits, { limit: 50 });
  const filtered = result.items.filter((b) => b['is-active'] !== false);
  const sorted = [...filtered].sort(
    (a, b) => (a['sort-order'] ?? 999) - (b['sort-order'] ?? 999),
  );
  return { items: sorted, total: sorted.length };
}

export interface CompanyAward {
  id: string;
  name?: string;
  slug?: string;
  year?: string;
  'sort-order'?: number;
  'is-active'?: boolean;
}

export async function getCompanyAwards(): Promise<{ items: CompanyAward[]; total: number }> {
  if (!COLLECTIONS.companyAwards) return { items: [], total: 0 };
  const result = await getCollection<CompanyAward>(COLLECTIONS.companyAwards, { limit: 50 });
  const filtered = result.items.filter((a) => a['is-active'] !== false);
  const sorted = [...filtered].sort(
    (a, b) => (a['sort-order'] ?? 999) - (b['sort-order'] ?? 999),
  );
  return { items: sorted, total: sorted.length };
}

export async function getEmployees(options?: { limit?: number; featured?: boolean }) {
  if (!COLLECTIONS.employees) return { items: [], total: 0 };
  const result = await getCollection<Employee>(COLLECTIONS.employees, options);
  if (options?.featured) {
    return {
      ...result,
      items: result.items.filter(e => e['is-featured']),
    };
  }
  return result;
}

export async function getAnnouncements(options?: { limit?: number; pinned?: boolean }) {
  if (!COLLECTIONS.announcements) return { items: [], total: 0 };
  const result = await getCollection<Announcement>(COLLECTIONS.announcements, options);
  const sorted = result.items.sort((a, b) => {
    if (a['is-pinned'] && !b['is-pinned']) return -1;
    if (!a['is-pinned'] && b['is-pinned']) return 1;
    return new Date(b['published-date']).getTime() - new Date(a['published-date']).getTime();
  });
  return { ...result, items: sorted };
}

export async function getBannerMessages(options?: { limit?: number }) {
  if (!COLLECTIONS.banner) return { items: [], total: 0 };
  const now = new Date();
  const result = await getCollection<any>(COLLECTIONS.banner, options);
  const items = result.items
    .filter((m) => m['is-active'] !== false)
    .filter((m) => {
      if (!m['expiration-date']) return true;
      const exp = new Date(m['expiration-date']);
      return isNaN(exp.getTime()) || exp > now;
    })
    .sort((a, b) => (a['display-order'] ?? 999) - (b['display-order'] ?? 999));
  return { ...result, items };
}

export async function getEvents(options?: { limit?: number; upcoming?: boolean }) {
  if (!COLLECTIONS.events) return { items: [], total: 0 };
  const result = await getCollection<Event>(COLLECTIONS.events, options);
  if (options?.upcoming) {
    const now = new Date();
    return {
      ...result,
      items: result.items
        .filter(e => new Date(e['event-date']) >= now)
        .sort((a, b) => new Date(a['event-date']).getTime() - new Date(b['event-date']).getTime()),
    };
  }
  return result;
}

export async function getJobPostings(options?: { limit?: number }) {
  if (!COLLECTIONS.jobPostings) return { items: [], total: 0 };
  const result = await getCollection<JobPosting>(COLLECTIONS.jobPostings, options);
  return {
    ...result,
    // Note: Webflow uses 'job-is-active' field name
    items: result.items.filter(j => j['job-is-active'] !== false),
  };
}

export async function getCultureStories(options?: { limit?: number; category?: string }) {
  if (!COLLECTIONS.cultureStories) return { items: [], total: 0 };
  const result = await getCollection<CultureStory>(COLLECTIONS.cultureStories, options);
  const sorted = result.items.sort(
    (a, b) => new Date(b['published-date']).getTime() - new Date(a['published-date']).getTime()
  );
  if (options?.category) {
    return {
      ...result,
      items: sorted.filter(s => s.category === options.category),
    };
  }
  return { ...result, items: sorted };
}

export async function getResources(options?: { limit?: number; category?: string }) {
  if (!COLLECTIONS.resources) return { items: [], total: 0 };
  const result = await getCollection<Resource>(COLLECTIONS.resources, options);
  if (options?.category) {
    return {
      ...result,
      items: result.items.filter(r => r.category === options.category),
    };
  }
  return result;
}

// ============================================
// New collection types and helpers
// ============================================

export interface HRContent {
  name: string;
  slug: string;
  'content-type'?: string;
  icon?: { url: string };
  description?: string;
  'full-content'?: string;
  content?: string;
  'document-link'?: string;
  'effective-date'?: string;
  'applies-to'?: string;
  'priority-order'?: number;
  featured?: boolean;
  'is-active'?: boolean;
}

export interface SafetyContent {
  name: string;
  slug: string;
  'content-type'?: string;
  image?: { url: string };
  severity?: string;
  description?: string;
  'full-content'?: string;
  content?: string;
  'document-link'?: string;
  'video-link'?: string;
  'expiration-date'?: string;
  'required-for'?: string;
  'priority-order'?: number;
  featured?: boolean;
  'is-active'?: boolean;
}

export interface ITArticle {
  name: string;
  slug: string;
  'article-type'?: string;
  icon?: { url: string };
  summary?: string;
  'full-content'?: string;
  content?: string;
  'video-tutorial'?: string;
  'video-link'?: string;
  'download-link'?: string;
  platform?: string;
  difficulty?: string;
  views?: number;
  'helpful-votes'?: number;
  featured?: boolean;
  'is-active'?: boolean;
}

export interface MarketingAsset {
  name: string;
  slug: string;
  'asset-type'?: string;
  thumbnail?: { url: string };
  'preview-image'?: { url: string };
  description?: string;
  'download-link'?: string;
  'file-format'?: string;
  'file-size'?: string;
  'usage-guidelines'?: string;
  tags?: string;
  version?: string;
  featured?: boolean;
  'is-active'?: boolean;
}

export interface SubmittedIdea {
  name: string;
  slug: string;
  category?: string;
  description?: string;
  'submitted-by'?: string;
  email?: string;
  department?: string;
  status?: string;
  priority?: string;
  'admin-notes'?: string;
  votes?: number;
  featured?: boolean;
}

export async function getHRContent(options?: { limit?: number; type?: string; featured?: boolean }) {
  if (!COLLECTIONS.hrContent) return { items: [], total: 0 };
  const result = await getCollection<HRContent>(COLLECTIONS.hrContent, options);
  let items = result.items.filter(item => item['is-active'] !== false);

  // Sort by priority order
  items.sort((a, b) => (a['priority-order'] || 999) - (b['priority-order'] || 999));

  if (options?.type) {
    items = items.filter(item => item['content-type'] === options.type);
  }
  if (options?.featured) {
    items = items.filter(item => item.featured === true);
  }
  return { ...result, items };
}

export async function getSafetyContent(options?: { limit?: number; type?: string; featured?: boolean }) {
  if (!COLLECTIONS.safetyContent) return { items: [], total: 0 };
  const result = await getCollection<SafetyContent>(COLLECTIONS.safetyContent, options);
  let items = result.items.filter(item => item['is-active'] !== false);

  // Sort by priority order
  items.sort((a, b) => (a['priority-order'] || 999) - (b['priority-order'] || 999));

  if (options?.type) {
    items = items.filter(item => item['content-type'] === options.type);
  }
  if (options?.featured) {
    items = items.filter(item => item.featured === true);
  }
  return { ...result, items };
}

export async function getITKnowledgeBase(options?: { limit?: number; type?: string; featured?: boolean }) {
  if (!COLLECTIONS.itKnowledgeBase) return { items: [], total: 0 };
  const result = await getCollection<ITArticle>(COLLECTIONS.itKnowledgeBase, options);
  let items = result.items.filter(item => item['is-active'] !== false);

  if (options?.type) {
    items = items.filter(item => item['article-type'] === options.type);
  }
  if (options?.featured) {
    items = items.filter(item => item.featured === true);
  }
  return { ...result, items };
}

export async function getMarketingAssets(options?: { limit?: number; type?: string | string[]; featured?: boolean }) {
  if (!COLLECTIONS.marketingAssets) return { items: [], total: 0 };
  const result = await getCollection<MarketingAsset>(COLLECTIONS.marketingAssets, options);
  let items = result.items.filter(item => item['is-active'] !== false);

  if (options?.type) {
    const allowed = Array.isArray(options.type) ? options.type : [options.type];
    items = items.filter(item => allowed.includes(item['asset-type'] || ''));
  }
  if (options?.featured) {
    items = items.filter(item => item.featured === true);
  }
  return { ...result, items };
}

export async function getSubmittedIdeas(options?: { limit?: number; status?: string; featured?: boolean }) {
  if (!COLLECTIONS.submittedIdeas) return { items: [], total: 0 };
  const result = await getCollection<SubmittedIdea>(COLLECTIONS.submittedIdeas, options);
  let items = result.items;

  if (options?.status) {
    items = items.filter(item => item.status === options.status);
  }
  if (options?.featured) {
    items = items.filter(item => item.featured === true);
  }
  return { ...result, items };
}

// ============================================
// Get single items by slug
// ============================================

export async function getEventBySlug(slug: string): Promise<(Event & { id: string }) | null> {
  if (!COLLECTIONS.events) return null;
  const result = await getCollection<Event>(COLLECTIONS.events, { slug });
  return result.items.find(item => item.slug === slug) || null;
}

export async function getAnnouncementBySlug(slug: string): Promise<(Announcement & { id: string }) | null> {
  if (!COLLECTIONS.announcements) return null;
  const result = await getCollection<Announcement>(COLLECTIONS.announcements, { slug });
  return result.items.find(item => item.slug === slug) || null;
}

export async function getJobPostingBySlug(slug: string): Promise<(JobPosting & { id: string }) | null> {
  if (!COLLECTIONS.jobPostings) return null;
  const result = await getCollection<JobPosting>(COLLECTIONS.jobPostings, { slug });
  return result.items.find(item => item.slug === slug) || null;
}

export async function getEmployeeBySlug(slug: string): Promise<(Employee & { id: string }) | null> {
  if (!COLLECTIONS.employees) return null;
  const result = await getCollection<Employee>(COLLECTIONS.employees, { slug });
  return result.items.find(item => item.slug === slug) || null;
}

export async function getCultureStoryBySlug(slug: string): Promise<(CultureStory & { id: string }) | null> {
  if (!COLLECTIONS.cultureStories) return null;
  const result = await getCollection<CultureStory>(COLLECTIONS.cultureStories, { slug });
  return result.items.find(item => item.slug === slug) || null;
}

export async function getResourceBySlug(slug: string): Promise<(Resource & { id: string }) | null> {
  if (!COLLECTIONS.resources) return null;
  const result = await getCollection<Resource>(COLLECTIONS.resources, { slug });
  return result.items.find(item => item.slug === slug) || null;
}

export async function getHRContentBySlug(slug: string): Promise<(HRContent & { id: string }) | null> {
  if (!COLLECTIONS.hrContent) return null;
  const result = await getCollection<HRContent>(COLLECTIONS.hrContent, { slug });
  return result.items.find(item => item.slug === slug) || null;
}

export async function getSafetyContentBySlug(slug: string): Promise<(SafetyContent & { id: string }) | null> {
  if (!COLLECTIONS.safetyContent) return null;
  const result = await getCollection<SafetyContent>(COLLECTIONS.safetyContent, { slug });
  return result.items.find(item => item.slug === slug) || null;
}

export async function getITArticleBySlug(slug: string): Promise<(ITArticle & { id: string }) | null> {
  if (!COLLECTIONS.itKnowledgeBase) return null;
  const result = await getCollection<ITArticle>(COLLECTIONS.itKnowledgeBase, { slug });
  return result.items.find(item => item.slug === slug) || null;
}

export async function getMarketingAssetBySlug(slug: string): Promise<(MarketingAsset & { id: string }) | null> {
  if (!COLLECTIONS.marketingAssets) return null;
  const result = await getCollection<MarketingAsset>(COLLECTIONS.marketingAssets, { slug });
  return result.items.find(item => item.slug === slug) || null;
}

export async function getSubmittedIdeaBySlug(slug: string): Promise<(SubmittedIdea & { id: string }) | null> {
  if (!COLLECTIONS.submittedIdeas) return null;
  const result = await getCollection<SubmittedIdea>(COLLECTIONS.submittedIdeas, { slug });
  return result.items.find(item => item.slug === slug) || null;
}
