/**
 * Calendar Utility Functions
 * Generate calendar links and .ics files for events
 */

export interface CalendarEvent {
  name: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
}

/**
 * Company timezone — all event wall times are Eastern.
 */
export const COMPANY_TZ = 'America/New_York';

/**
 * Convert a UTC ISO string to a `YYYY-MM-DDTHH:mm` string representing
 * Eastern wall time (for datetime-local inputs).
 */
export function isoToEasternInput(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (isNaN(date.getTime())) return '';
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: COMPANY_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find(p => p.type === type)?.value || '';
  let hour = get('hour');
  if (hour === '24') hour = '00';
  return `${get('year')}-${get('month')}-${get('day')}T${hour}:${get('minute')}`;
}

/**
 * Get the offset (ms) of a timezone relative to UTC at a given instant.
 */
function getTimeZoneOffsetMs(date: Date, timeZone: string): number {
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  return tzDate.getTime() - utcDate.getTime();
}

/**
 * Interpret a `YYYY-MM-DDTHH:mm` string as Eastern wall time and return
 * the equivalent UTC ISO string.
 */
export function easternInputToISO(input: string): string {
  if (!input) return '';
  const match = input.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) return '';
  const [, y, m, d, hh, mm] = match.map(Number);
  // Start with the wall time interpreted as UTC, then correct by the zone offset.
  let guess = new Date(Date.UTC(y, m - 1, d, hh, mm));
  if (isNaN(guess.getTime())) return '';
  let offset = getTimeZoneOffsetMs(guess, COMPANY_TZ);
  guess = new Date(guess.getTime() - offset);
  // Recompute once at the corrected instant (handles DST boundaries).
  offset = getTimeZoneOffsetMs(guess, COMPANY_TZ);
  guess = new Date(Date.UTC(y, m - 1, d, hh, mm) - offset);
  return guess.toISOString();
}

/**
 * Format date to Google Calendar format (YYYYMMDDTHHmmssZ)
 */
function formatDateForGoogle(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Format date to ICS format in UTC (YYYYMMDDTHHmmssZ)
 */
function formatDateForICS(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Escape special characters for ICS files
 */
function escapeICS(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Strip HTML tags from text
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Generate Google Calendar URL
 */
export function getGoogleCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams();
  params.set('action', 'TEMPLATE');
  params.set('text', event.name);

  const startDate = formatDateForGoogle(event.startDate);
  const endDate = event.endDate
    ? formatDateForGoogle(event.endDate)
    : formatDateForGoogle(new Date(event.startDate.getTime() + 60 * 60 * 1000)); // Default 1 hour

  params.set('dates', `${startDate}/${endDate}`);

  if (event.description) {
    params.set('details', stripHtml(event.description));
  }

  if (event.location) {
    params.set('location', event.location);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate Outlook Web Calendar URL
 */
export function getOutlookCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams();
  params.set('path', '/calendar/action/compose');
  params.set('rru', 'addevent');
  params.set('subject', event.name);
  params.set('startdt', event.startDate.toISOString());

  if (event.endDate) {
    params.set('enddt', event.endDate.toISOString());
  } else {
    params.set('enddt', new Date(event.startDate.getTime() + 60 * 60 * 1000).toISOString());
  }

  if (event.description) {
    params.set('body', stripHtml(event.description));
  }

  if (event.location) {
    params.set('location', event.location);
  }

  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Generate Yahoo Calendar URL
 */
export function getYahooCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams();
  params.set('v', '60');
  params.set('title', event.name);

  // Yahoo uses a different date format: YYYYMMDD or YYYYMMDDTHHmmss
  const startDate = formatDateForGoogle(event.startDate).replace('Z', '');
  const endDate = event.endDate
    ? formatDateForGoogle(event.endDate).replace('Z', '')
    : formatDateForGoogle(new Date(event.startDate.getTime() + 60 * 60 * 1000)).replace('Z', '');

  params.set('st', startDate);
  params.set('et', endDate);

  if (event.description) {
    params.set('desc', stripHtml(event.description));
  }

  if (event.location) {
    params.set('in_loc', event.location);
  }

  return `https://calendar.yahoo.com/?${params.toString()}`;
}

/**
 * Generate .ics file content for download
 */
export function generateICSContent(event: CalendarEvent): string {
  const startDate = formatDateForICS(event.startDate);
  const endDate = event.endDate
    ? formatDateForICS(event.endDate)
    : formatDateForICS(new Date(event.startDate.getTime() + 60 * 60 * 1000));

  const uid = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@jewettjunction.com`;
  const now = formatDateForICS(new Date());

  let ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Jewett Junction//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${escapeICS(event.name)}`,
  ];

  if (event.description) {
    ics.push(`DESCRIPTION:${escapeICS(stripHtml(event.description))}`);
  }

  if (event.location) {
    ics.push(`LOCATION:${escapeICS(event.location)}`);
  }

  ics.push('END:VEVENT', 'END:VCALENDAR');

  return ics.join('\r\n');
}

/**
 * Download .ics file
 */
export function downloadICSFile(event: CalendarEvent): void {
  const content = generateICSContent(event);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Open calendar link in new window
 */
export function openCalendarLink(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}
