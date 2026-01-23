/**
 * Webflow CMS Integration
 *
 * This module provides functions to fetch content from Webflow CMS collections.
 * The client can edit these items directly in Webflow's visual editor.
 */

const WEBFLOW_API_TOKEN = import.meta.env.WEBFLOW_API_TOKEN;
const SITE_ID = import.meta.env.WEBFLOW_SITE_ID || '67a464bc7184fcb8aacb0e8d';

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
  if (!WEBFLOW_API_TOKEN) {
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
        Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
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
  if (!WEBFLOW_API_TOKEN) {
    console.warn('WEBFLOW_API_TOKEN not set. Using mock data.');
    return null;
  }

  const response = await fetch(
    `https://api.webflow.com/v2/collections/${collectionId}/items/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
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
  if (!WEBFLOW_API_TOKEN) {
    console.warn('WEBFLOW_API_TOKEN not set.');
    return [];
  }

  const response = await fetch(
    `https://api.webflow.com/v2/sites/${SITE_ID}/collections`,
    {
      headers: {
        Authorization: `Bearer ${WEBFLOW_API_TOKEN}`,
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
  category: 'company' | 'training' | 'social' | 'safety';
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
  'is-active'?: boolean;
}

export interface CultureStory {
  name: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: { url: string; alt?: string };
  author?: string;
  'published-date': string;
  category: 'wellness' | 'community' | 'recognition' | 'milestone';
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
  employees: '69738d872d19741af9e461a1',
  announcements: '69738dd73f2d71626fcc6b0a',
  events: '69738e25a192594f2ba185f3',
  jobPostings: '69738e490bd2a14f9c7f1885',
  cultureStories: '69738e5ef6e68b6b209e404c',
  resources: '69738e7aaef2bb2746f8d943',
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
    items: result.items.filter(j => j['is-active'] !== false),
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
