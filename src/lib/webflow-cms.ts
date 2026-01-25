/**
 * Webflow CMS Integration
 *
 * This module provides functions to fetch content from Webflow CMS collections.
 * The client can edit these items directly in Webflow's visual editor.
 */

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

// Get Site ID - checks runtime first, then import.meta.env, then default
function getSiteId(): string {
  return runtimeSiteId || import.meta.env.WEBFLOW_SITE_ID || '67a464bc7184fcb8aacb0e8d';
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

/**
 * Fetch items from a Webflow CMS collection
 */
export async function getCollection<T = Record<string, unknown>>(
  collectionId: string,
  options: { limit?: number; offset?: number } = {}
): Promise<{ items: (T & { id: string })[]; total: number }> {
  const apiToken = getApiToken();
  if (!apiToken) {
    console.warn('WEBFLOW_API_TOKEN not set. Using mock data.');
    return { items: [], total: 0 };
  }

  const params = new URLSearchParams();
  if (options.limit) params.set('limit', options.limit.toString());
  if (options.offset) params.set('offset', options.offset.toString());

  const response = await fetch(
    `https://api.webflow.com/v2/collections/${collectionId}/items?${params}`,
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

  const data: WebflowCollectionResponse = await response.json();

  return {
    items: data.items
      .filter(item => !item.isArchived && !item.isDraft)
      .map(item => ({
        id: item.id,
        ...item.fieldData,
      })) as (T & { id: string })[],
    total: data.pagination.total,
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

export interface Employee {
  name: string;
  slug: string;
  role: string;
  department: string;
  email?: string;
  phone?: string;
  photo?: { url: string; alt?: string };
  bio?: string;
  'start-date'?: string;
  'is-featured'?: boolean;
}

export interface Announcement {
  name: string;
  slug: string;
  content: string;
  priority: 'high' | 'normal' | 'low';
  'published-date': string;
  author?: string;
  'is-pinned'?: boolean;
}

export interface Event {
  name: string;
  slug: string;
  description?: string;
  'event-date': string;
  'end-date'?: string;
  location?: string;
  category?: string; // Reference field returns ID, handle in component
  'registration-link'?: string;
}

export interface JobPosting {
  name: string;
  slug: string;
  department: string;
  location: string;
  description: string;
  requirements?: string;
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
  author?: string;
  'published-date': string;
  category?: string; // Reference field returns ID, handle in component
}

export interface Resource {
  name: string;
  slug: string;
  description?: string;
  category: string;
  file?: { url: string };
  'external-link'?: string;
  icon?: string;
}

// ============================================
// Collection ID mapping (update after creating in Webflow)
// ============================================

export const COLLECTIONS = {
  // Existing collections (update IDs after syncing)
  employees: '69738d872d19741af9e461a1',
  announcements: '69738dd73f2d71626fcc6b0a',
  events: '69738e25a192594f2ba185f3',
  jobPostings: '69738e490bd2a14f9c7f1885',
  cultureStories: '69738e5ef6e68b6b209e404c',
  resources: '69738e7aaef2bb2746f8d943',
  // New collections (add IDs after syncing via admin panel)
  hrContent: '', // HR policies, benefits, forms
  safetyContent: '', // Safety protocols, training, alerts
  itKnowledgeBase: '', // IT help articles and guides
  marketingAssets: '', // Brand assets and templates
  submittedIdeas: '', // Employee suggestions
} as const;

// ============================================
// Helper functions for specific collections
// ============================================

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
  content?: string;
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
  'submitter-email'?: string;
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

export async function getMarketingAssets(options?: { limit?: number; type?: string; featured?: boolean }) {
  if (!COLLECTIONS.marketingAssets) return { items: [], total: 0 };
  const result = await getCollection<MarketingAsset>(COLLECTIONS.marketingAssets, options);
  let items = result.items.filter(item => item['is-active'] !== false);

  if (options?.type) {
    items = items.filter(item => item['asset-type'] === options.type);
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
