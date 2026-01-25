import type { APIRoute } from 'astro';
import {
  getHRContent,
  getSafetyContent,
  getITKnowledgeBase,
  getMarketingAssets,
  getSubmittedIdeas,
  getAnnouncements,
  getEvents,
  getJobPostings,
  getCultureStories,
  getEmployees,
  getResources,
} from '../../../lib/webflow-cms';

// Public API for fetching CMS content (no auth required)
export const GET: APIRoute = async ({ params, url }) => {
  const collection = params.collection;
  const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!) : undefined;
  const type = url.searchParams.get('type') || undefined;
  const category = url.searchParams.get('category') || undefined;
  const featured = url.searchParams.get('featured') === 'true' || undefined;
  const status = url.searchParams.get('status') || undefined;

  try {
    let result: { items: any[]; total: number } = { items: [], total: 0 };

    switch (collection) {
      case 'hr':
      case 'hr-content':
        result = await getHRContent({ limit, type, featured });
        break;

      case 'safety':
      case 'safety-content':
        result = await getSafetyContent({ limit, type, featured });
        break;

      case 'it':
      case 'it-knowledge-base':
        result = await getITKnowledgeBase({ limit, type, featured });
        break;

      case 'marketing':
      case 'marketing-assets':
        result = await getMarketingAssets({ limit, type, featured });
        break;

      case 'ideas':
      case 'submitted-ideas':
        result = await getSubmittedIdeas({ limit, status, featured });
        break;

      case 'announcements':
        result = await getAnnouncements({ limit });
        break;

      case 'events':
        result = await getEvents({ limit, upcoming: true });
        break;

      case 'jobs':
      case 'job-postings':
        result = await getJobPostings({ limit });
        break;

      case 'culture':
      case 'culture-stories':
        result = await getCultureStories({ limit, category });
        break;

      case 'employees':
        result = await getEmployees({ limit, featured });
        break;

      case 'resources':
        result = await getResources({ limit, category });
        break;

      default:
        return new Response(JSON.stringify({ error: 'Unknown collection' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60' // Cache for 1 minute
      }
    });

  } catch (error: any) {
    console.error(`Error fetching ${collection}:`, error);
    return new Response(JSON.stringify({ error: error.message, items: [], total: 0 }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
