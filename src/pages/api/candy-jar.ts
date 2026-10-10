import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { sendNotification } from '../../lib/notify';
import { candyJarStatus, cleanName, parseGuess, guessSlug } from '../../lib/candy-jar';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// Halloween candy jar guesses. Each one is a Form Submissions record (the
// admin already lists those) whose slug comes from the guesser's name, so a
// second guess from the same person updates their record instead of adding
// another. Every guess is emailed to the candyJar inbox (Hailley and Sarah).

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const POST: APIRoute = async ({ request, locals }) => {
  const status = candyJarStatus();
  if (status === 'upcoming') return json({ error: 'Guessing opens October 24.' }, 403);
  if (status === 'closed') return json({ error: 'Guessing is closed.' }, 403);

  let data: any;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  const name = cleanName(data?.name);
  if (!name) return json({ error: 'Please enter your first and last name.' }, 400);
  const guess = parseGuess(data?.guess);
  if (guess === null) return json({ error: 'Please enter your guess as a whole number.' }, 400);
  const slug = guessSlug(name);
  if (!slug) return json({ error: 'Please enter your first and last name.' }, 400);

  const apiToken = (locals as any)?.runtime?.env?.WEBFLOW_API_TOKEN || (import.meta.env as any).WEBFLOW_API_TOKEN;
  const collectionId = COLLECTIONS.formSubmissions;
  if (!apiToken || !collectionId) {
    console.error('candy-jar: WEBFLOW_API_TOKEN or the formSubmissions collection is not configured');
    return json({ error: 'Server configuration error' }, 500);
  }
  const headers = { Authorization: `Bearer ${apiToken}`, accept: 'application/json', 'content-type': 'application/json' };

  try {
    // Has this person guessed before?
    const lookup = await fetch(`${BASE_URL}/collections/${collectionId}/items?${new URLSearchParams({ slug })}`, { headers });
    const existing = lookup.ok
      ? ((await lookup.json()).items || []).find((i: any) => i?.fieldData?.slug === slug)
      : null;
    const previous = existing ? parseGuess(String(existing.fieldData?.['full-response'] || '').match(/Guess:\s*([\d,]+)/)?.[1]) : null;

    const fieldData = {
      name: `Candy Jar: ${name} guessed ${guess.toLocaleString('en-US')}`,
      slug,
      'form-name': 'Candy Jar Guess',
      'submitter-name': name,
      'submitted-at': new Date().toISOString(),
      'published-path': '/culture/candy-jar',
      'full-response': `<p>Guess: ${guess}</p>${previous !== null ? `<p>Previous guess: ${previous}</p>` : ''}<p>Name: ${escapeHtml(name)}</p>`,
      status: 'New',
    };

    // Drafts, like the other form records: internal, never published pages.
    const res = existing
      ? await fetch(`${BASE_URL}/collections/${collectionId}/items/${existing.id}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ isArchived: false, isDraft: true, fieldData }),
        })
      : await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ isArchived: false, isDraft: true, fieldData }),
        });
    if (!res.ok) {
      console.error('candy-jar: Webflow error saving guess:', await res.text());
      return json({ error: 'Something went wrong saving your guess. Please try again.' }, 500);
    }

    await sendNotification(locals, {
      inbox: 'candyJar',
      subject: `[Candy Jar] ${name}: ${guess.toLocaleString('en-US')}`,
      fields: [
        { label: 'Name', value: name },
        { label: 'Guess', value: guess.toLocaleString('en-US') },
        { label: 'Previous guess', value: previous !== null ? `${previous.toLocaleString('en-US')} (replaced by this one)` : undefined },
      ],
    });

    return json({ success: true, guess, updated: !!existing });
  } catch (error) {
    console.error('candy-jar: error saving guess:', error);
    return json({ error: 'Something went wrong saving your guess. Please try again.' }, 500);
  }
};
