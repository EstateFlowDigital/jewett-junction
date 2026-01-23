import type { APIRoute } from 'astro';
import { getAnnouncements, getEvents, getJobPostings, getEmployees, getCultureStories } from '../../lib/webflow-cms';

export const GET: APIRoute = async () => {
  const hasToken = !!import.meta.env.WEBFLOW_API_TOKEN;
  const tokenPreview = import.meta.env.WEBFLOW_API_TOKEN
    ? `${import.meta.env.WEBFLOW_API_TOKEN.substring(0, 8)}...`
    : 'NOT SET';

  let results: Record<string, any> = {
    hasToken,
    tokenPreview,
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
