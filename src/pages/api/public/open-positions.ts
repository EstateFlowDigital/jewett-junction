import type { APIRoute } from 'astro';
import { CAREERS_FORM_ID, extractOpenPositions } from '../../../lib/open-positions';

export const prerender = false;

// Open job titles for the public Careers page, read from the HubSpot Careers
// form (see lib/open-positions.ts). Public on purpose: visitors' browsers call it
// from jewettconstruction.com/careers, so middleware.ts lists /api/public in
// OPEN_API_PREFIXES. It returns job titles only; HUBSPOT_TOKEN (a HubSpot
// private app with just the `forms` scope) never leaves the server.
//
// Cached here and in the browser for CACHE_SECONDS each, so a role HR opens or
// closes in HubSpot shows up within about ten minutes.

const CACHE_SECONDS = 300;
let cached: { positions: string[]; at: number } | null = null;

export const GET: APIRoute = async ({ locals }) => {
  if (cached && Date.now() - cached.at < CACHE_SECONDS * 1000) {
    return json({ positions: cached.positions });
  }

  const token = (locals as any)?.runtime?.env?.HUBSPOT_TOKEN || (import.meta.env as any).HUBSPOT_TOKEN;
  if (!token) {
    console.error('open-positions: HUBSPOT_TOKEN is not set');
    return json({ error: 'Not configured' }, 503);
  }

  try {
    const res = await fetch(`https://api.hubapi.com/marketing/v3/forms/${CAREERS_FORM_ID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`HubSpot responded ${res.status}`);
    const positions = extractOpenPositions(await res.json());
    if (!positions) throw new Error('the position field is missing from the Careers form');
    cached = { positions, at: Date.now() };
    return json({ positions });
  } catch (err) {
    console.error('open-positions:', (err as Error).message);
    // A stale list beats an empty Careers section while HubSpot is down.
    if (cached) return json({ positions: cached.positions });
    return json({ error: 'Unavailable' }, 502);
  }
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': status === 200 ? `public, max-age=${CACHE_SECONDS}` : 'no-store',
    },
  });
}
