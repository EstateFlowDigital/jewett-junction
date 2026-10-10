// Halloween candy jar guess (Hailley, October 2026). The page, the Culture
// box that links to it and the API all read these, so they agree on when
// guessing is open and on what counts as the same person.
//
// No imports and type-only TypeScript, so candy-jar.test.mjs can load this
// file directly under Node's type stripping.

// Eastern time. Opens the morning of Saturday Oct 24; the last guess counts up
// to midnight at the end of Oct 31.
export const CANDY_JAR_OPENS = '2026-10-24T00:00:00-04:00';
export const CANDY_JAR_CLOSES = '2026-11-01T00:00:00-04:00';
export const CANDY_JAR_PATH = '/jewett-junction/culture/candy-jar';

export type CandyJarStatus = 'upcoming' | 'open' | 'closed';

export function candyJarStatus(now: Date = new Date()): CandyJarStatus {
  const t = now.getTime();
  if (t < Date.parse(CANDY_JAR_OPENS)) return 'upcoming';
  if (t >= Date.parse(CANDY_JAR_CLOSES)) return 'closed';
  return 'open';
}

// Trimmed, single-spaced name, or null when it's too short or too long to be one.
export function cleanName(raw: unknown): string | null {
  const name = String(raw ?? '').replace(/\s+/g, ' ').trim();
  return name.length >= 2 && name.length <= 80 ? name : null;
}

// Whole number of candies, commas allowed ("1,250"), up to 9,999,999.
export function parseGuess(raw: unknown): number | null {
  const s = String(raw ?? '').replace(/,/g, '').trim();
  return /^\d{1,7}$/.test(s) ? Number(s) : null;
}

// One guess per person: the CMS slug is built from the name, so "Jane O'Neil"
// and " jane  o'neil " land on the same record and a second guess replaces the
// first.
export function guessSlug(name: string): string | null {
  const key = name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return key ? `candy-jar-${key}`.slice(0, 100) : null;
}
