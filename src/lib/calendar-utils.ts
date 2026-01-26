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
 * Format date to Google Calendar format (YYYYMMDDTHHmmssZ)
 */
function formatDateForGoogle(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Format date to ICS format (YYYYMMDDTHHmmss)
 */
function formatDateForICS(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
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
