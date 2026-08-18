/**
 * Single source of truth for the intranet's main navigation.
 *
 * Shared by the desktop rail (SideNav.astro) and the mobile drawer
 * (MobileNav.astro) so the two can't drift — they previously carried separate
 * copies of the same list and had already diverged ("HR" vs "HR / Payroll").
 *
 * Icons are inline SVG path data rather than a component library: the nav
 * server-renders on every page, so pulling in an icon runtime would cost more
 * than it saves.
 */

export interface NavItem {
  /** Matches the Intranet Sections CMS slug, which supplies the label. */
  slug: string;
  href: string;
  /** Used when the CMS has no matching section, or the fetch fails. */
  fallback: string;
  /** Only the idea submission is accented; everything else uses the base blue. */
  accent?: 'amber';
}

export const NAV_PATHS: Record<string, string> = {
  dashboard:
    'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  safety:
    'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  hr: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  'it-helpdesk':
    'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  marketing:
    'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
  events: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  culture:
    'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  directory:
    'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  resources:
    'M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z',
  'submit-idea':
    'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  notifications:
    'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  help: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
};

export const NAV_PRIMARY: NavItem[] = [
  { slug: 'dashboard', href: '/jewett-junction/dashboard', fallback: 'Home' },
  { slug: 'safety', href: '/jewett-junction/safety', fallback: 'Safety' },
  { slug: 'hr', href: '/jewett-junction/hr', fallback: 'HR' },
  { slug: 'it-helpdesk', href: '/jewett-junction/it-helpdesk', fallback: 'IT Helpdesk' },
  { slug: 'marketing', href: '/jewett-junction/marketing', fallback: 'Marketing' },
  { slug: 'events', href: '/jewett-junction/events', fallback: 'Events' },
  { slug: 'culture', href: '/jewett-junction/culture', fallback: 'Culture' },
  { slug: 'directory', href: '/jewett-junction/directory', fallback: 'Directory' },
  { slug: 'resources', href: '/jewett-junction/resources', fallback: 'Resources' },
];

export const NAV_IDEA: NavItem = {
  slug: 'submit-idea',
  href: '/jewett-junction/submit-idea',
  fallback: 'Submit Idea',
  accent: 'amber',
};

export const NAV_UTILITY: NavItem[] = [
  { slug: 'notifications', href: '/jewett-junction/notifications', fallback: 'Notifications' },
  { slug: 'help', href: '/jewett-junction/help', fallback: 'Help' },
];

/** The Jewett horizontal mark — PNG, the only copy with a transparent background. */
export const NAV_LOGO_URL =
  'https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/69f8f8155aebffd506c331d7_1777924117776-JCC-Horizontal-Small.png';
