import type { APIRoute } from 'astro';
import { initCMS, getAnnouncements, getEvents, getEmployees, getResources, getJobPostings, getCultureStories, stripHtml } from '../../lib/webflow-cms';
import { baseUrl } from '../../lib/base-url';

interface SearchResult {
  id: string;
  type: 'announcement' | 'event' | 'employee' | 'resource' | 'job' | 'culture';
  title: string;
  description: string;
  url: string;
  meta?: string;
}

export const GET: APIRoute = async ({ request, locals }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q')?.toLowerCase().trim();

  if (!query || query.length < 2) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Search query must be at least 2 characters'
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  if (query.length > 200) {
    return new Response(
      JSON.stringify({ success: false, error: 'Search query too long' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Initialize CMS with Cloudflare runtime context
    initCMS(locals);

    // Fetch from all collections in parallel. No limit so the auto-paginating
    // getCollection returns every item — otherwise items at position 51+ in any
    // collection would be invisible to search.
    const [announcements, events, employees, resources, jobs, culture] = await Promise.all([
      getAnnouncements().catch((err) => { console.error('Search: announcements fetch failed:', err.message); return { items: [] }; }),
      getEvents().catch((err) => { console.error('Search: events fetch failed:', err.message); return { items: [] }; }),
      getEmployees().catch((err) => { console.error('Search: employees fetch failed:', err.message); return { items: [] }; }),
      getResources().catch((err) => { console.error('Search: resources fetch failed:', err.message); return { items: [] }; }),
      getJobPostings().catch((err) => { console.error('Search: job postings fetch failed:', err.message); return { items: [] }; }),
      getCultureStories().catch((err) => { console.error('Search: culture stories fetch failed:', err.message); return { items: [] }; }),
    ]);

    const results: SearchResult[] = [];

    // Search announcements
    announcements.items?.forEach((item: any) => {
      const name = item.name?.toLowerCase() || '';
      const content = stripHtml(item.content)?.toLowerCase() || '';
      if (name.includes(query) || content.includes(query)) {
        results.push({
          id: item.id,
          type: 'announcement',
          title: item.name,
          description: stripHtml(item.content)?.substring(0, 150) || '',
          url: `${baseUrl}/announcements/${item.slug}`,
          meta: item.priority === 'high' ? 'High Priority' : undefined
        });
      }
    });

    // Search events
    events.items?.forEach((item: any) => {
      const name = item.name?.toLowerCase() || '';
      const description = stripHtml(item.description)?.toLowerCase() || '';
      const location = item.location?.toLowerCase() || '';
      if (name.includes(query) || description.includes(query) || location.includes(query)) {
        results.push({
          id: item.id,
          type: 'event',
          title: item.name,
          description: stripHtml(item.description)?.substring(0, 150) || '',
          url: `${baseUrl}/events/${item.slug}`,
          meta: item['event-date'] ? new Date(item['event-date']).toLocaleDateString() : undefined
        });
      }
    });

    // Search employees
    employees.items?.forEach((item: any) => {
      const name = item.name?.toLowerCase() || '';
      const role = item.role?.toLowerCase() || '';
      const department = item.department?.toLowerCase() || '';
      if (name.includes(query) || role.includes(query) || department.includes(query)) {
        results.push({
          id: item.id,
          type: 'employee',
          title: item.name,
          description: item.role || '',
          url: `${baseUrl}/directory/${item.slug}`,
          meta: item.department
        });
      }
    });

    // Search resources
    resources.items?.forEach((item: any) => {
      const name = item.name?.toLowerCase() || '';
      const description = stripHtml(item.description)?.toLowerCase() || '';
      const category = item.category?.toLowerCase() || '';
      if (name.includes(query) || description.includes(query) || category.includes(query)) {
        results.push({
          id: item.id,
          type: 'resource',
          title: item.name,
          description: stripHtml(item.description)?.substring(0, 150) || '',
          url: `${baseUrl}/resources/${item.slug}`,
          meta: item.category
        });
      }
    });

    // Search jobs
    jobs.items?.forEach((item: any) => {
      const name = item.name?.toLowerCase() || '';
      const description = stripHtml(item.description)?.toLowerCase() || '';
      const department = item.department?.toLowerCase() || '';
      const location = item.location?.toLowerCase() || '';
      if (name.includes(query) || description.includes(query) || department.includes(query) || location.includes(query)) {
        results.push({
          id: item.id,
          type: 'job',
          title: item.name,
          description: stripHtml(item.description)?.substring(0, 150) || '',
          url: `${baseUrl}/dashboard#open-positions`,
          meta: item.location
        });
      }
    });

    // Search culture stories
    culture.items?.forEach((item: any) => {
      const name = item.name?.toLowerCase() || '';
      const content = stripHtml(item.content)?.toLowerCase() || '';
      const excerpt = item.excerpt?.toLowerCase() || '';
      if (name.includes(query) || content.includes(query) || excerpt.includes(query)) {
        results.push({
          id: item.id,
          type: 'culture',
          title: item.name,
          description: item.excerpt || stripHtml(item.content)?.substring(0, 150) || '',
          url: `${baseUrl}/culture/${item.slug}`,
          meta: item.category
        });
      }
    });

    // Sort results by relevance (title match first)
    results.sort((a, b) => {
      const aInTitle = a.title.toLowerCase().includes(query) ? 0 : 1;
      const bInTitle = b.title.toLowerCase().includes(query) ? 0 : 1;
      return aInTitle - bInTitle;
    });

    return new Response(
      JSON.stringify({
        success: true,
        query,
        count: results.length,
        results: results.slice(0, 20) // Limit to 20 results
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Search error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Search failed. Please try again.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
