import type { APIRoute } from 'astro';
import { initCMS, getAnnouncements, getEvents, getJobPostings, getEmployees, getCultureStories } from '../../lib/webflow-cms';

export const GET: APIRoute = async ({ locals }) => {
  // Initialize CMS with Cloudflare runtime context
  initCMS(locals);

  // Check for token in both runtime context and import.meta.env
  const runtime = (locals as any)?.runtime;
  const runtimeToken = runtime?.env?.WEBFLOW_API_TOKEN;
  const metaToken = import.meta.env.WEBFLOW_API_TOKEN;
  const token = runtimeToken || metaToken;

  const hasToken = !!token;
  const tokenPreview = token
    ? `${token.substring(0, 8)}...`
    : 'NOT SET';
  const tokenSource = runtimeToken ? 'runtime.env' : metaToken ? 'import.meta.env' : 'none';

  let results: Record<string, any> = {
    hasToken,
    tokenPreview,
    tokenSource,
    collections: {}
  };

  try {
    const [announcements, events, jobs, employees, culture] = await Promise.all([
      getAnnouncements({ limit: 2 }),
      getEvents({ limit: 2 }),
      getJobPostings({ limit: 2 }),
      getEmployees({ limit: 2 }),
      getCultureStories({ limit: 2 }),
    ]);

    results.collections = {
      announcements: { count: announcements.items.length, sample: announcements.items[0]?.name },
      events: { count: events.items.length, sample: events.items[0]?.name },
      jobs: { count: jobs.items.length, sample: jobs.items[0]?.name },
      employees: { count: employees.items.length, sample: employees.items[0]?.name },
      culture: { count: culture.items.length, sample: culture.items[0]?.name },
    };
  } catch (error: any) {
    results.error = error.message;
  }

  return new Response(JSON.stringify(results, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
};
