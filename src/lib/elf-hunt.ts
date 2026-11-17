// "Where's the Elf?" holiday hide and seek (Hailley, Nov 17 2026). The page,
// the Culture box that links to it and the API all read these, so they agree
// on when the hunt is open and which week a photo belongs to.
//
// No imports and type-only TypeScript, so elf-hunt.test.mjs can load this file
// directly under Node's type stripping.

// Hailley's dates: the elf hides from Monday November 30 through Wednesday
// December 23. The whole run is Eastern Standard Time (UTC-5), so the offsets
// below and the week maths don't need daylight saving handling.
export const ELF_HUNT_OPENS = '2026-11-30T00:00:00-05:00';
export const ELF_HUNT_CLOSES = '2026-12-24T00:00:00-05:00';
export const ELF_HUNT_PATH = '/jewett-junction/culture/elf-hunt';

const EASTERN_OFFSET_MS = 5 * 60 * 60 * 1000;

export type ElfHuntStatus = 'upcoming' | 'open' | 'closed';

export function elfHuntStatus(now: Date = new Date()): ElfHuntStatus {
  const t = now.getTime();
  if (t < Date.parse(ELF_HUNT_OPENS)) return 'upcoming';
  if (t >= Date.parse(ELF_HUNT_CLOSES)) return 'closed';
  return 'open';
}

// Submissions reset every Monday when the elf moves, so each photo is filed
// under the Monday (Eastern) that starts its week, e.g. "Nov 30" or "Dec 7".
export function elfWeekStart(now: Date = new Date()): Date {
  const eastern = new Date(now.getTime() - EASTERN_OFFSET_MS);
  const daysSinceMonday = (eastern.getUTCDay() + 6) % 7;
  return new Date(
    Date.UTC(eastern.getUTCFullYear(), eastern.getUTCMonth(), eastern.getUTCDate() - daysSinceMonday),
  );
}

export function elfWeekLabel(now: Date = new Date()): string {
  return elfWeekStart(now).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

// The submitter's name, trimmed and single-spaced, or null when it's empty,
// has no letters or runs past 80 characters.
export function cleanName(raw: unknown): string | null {
  const name = String(raw ?? '').replace(/\s+/g, ' ').trim();
  return name.length <= 80 && /\p{L}/u.test(name) ? name : null;
}

// Photos go through /api/upload-photo, which stores them in the site's Webflow
// asset library. Only accept links that point there.
export function isUploadedPhotoUrl(raw: unknown): boolean {
  const url = String(raw ?? '');
  return url.length <= 2000 && /^https:\/\/cdn\.prod\.website-files\.com\/[^\s"'<>]+$/.test(url);
}

// Eastern time with seconds, for deciding who found the elf first.
export function easternTimestamp(now: Date = new Date()): string {
  return now.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });
}
