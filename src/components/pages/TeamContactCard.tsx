import * as React from 'react';
import { Mail, Phone, Users, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Employee {
  id: string;
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  /** Canonical department field — Webflow Option, 8 fixed values */
  dept?: string;
  /** Legacy alias kept for items not yet re-saved on the new schema */
  department?: string;
  photo?: { url?: string };
  'is-featured'?: boolean;
  'leadership-team'?: boolean;
  'page-contact-for'?: string;
  /** When set, the contact card shows this portal link in place of the email
   *  row — used for outsourced vendor contacts (e.g. managed IT). */
  'support-portal-url'?: string;
  /** Optional instruction shown above the portal link. */
  'support-portal-message'?: string;
}

interface TeamContactCardProps {
  /** Department slug or display name to match (case-insensitive substring match). */
  department: string;
  /**
   * Page tag this card represents (e.g., "HR", "Safety", "IT", "Marketing").
   * An employee whose `page-contact-for` field includes this tag is picked
   * as the primary contact, overriding any department match.
   * Defaults to `department` when not set.
   */
  pageKey?: string;
  /** Headline shown on the card, e.g. "HR Team" / "IT Team". */
  title: string;
  /** Fallback team email if no employee record matches. */
  fallbackEmail: string;
  /** Theme — only `dark` is styled differently right now. */
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  /** Tailwind color name (purple/green/blue/rose) for the avatar accent. */
  accent?: string;
}

const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase() || '··';

export function TeamContactCard({
  department,
  pageKey,
  title,
  fallbackEmail,
  theme = 'modern',
  accent = 'purple',
}: TeamContactCardProps) {
  const isDark = theme === 'dark';
  const [contact, setContact] = React.useState<Employee | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const tag = (pageKey || department).toLowerCase();

  React.useEffect(() => {
    fetch('/jewett-junction/api/cms/employees?limit=200')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data: { items?: Employee[] }) => {
        const items = data.items || [];

        // 1. Explicit page-contact tag wins. Parse comma-separated, case-insensitive.
        const taggedLead = items.find((e) => {
          const tags = (e['page-contact-for'] || '')
            .split(',')
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean);
          return tags.includes(tag);
        });
        if (taggedLead) {
          setContact(taggedLead);
          return;
        }

        // 2. Fall back to substring match on any department-ish field.
        const needle = department.toLowerCase();
        const inDept = items.filter((e) => {
          const dept = (e.dept || e.department || '').toLowerCase();
          return dept.includes(needle);
        });
        const lead =
          inDept.find((e) => e['leadership-team']) ||
          inDept.find((e) => e['is-featured']) ||
          inDept[0] ||
          null;
        setContact(lead);
      })
      .catch(() => setContact(null))
      .finally(() => setIsLoading(false));
  }, [department, tag]);

  // Email-fallback logic:
  // - If we matched an employee record (contact != null), respect what's on
  //   that record. If they have no email saved, show NOTHING (don't fall
  //   back to the team alias — the admin deliberately left it blank).
  // - Only fall back to the team alias when no employee record matched at all.
  const email = contact ? (contact.email?.trim() || '') : (fallbackEmail || '');
  const hasEmail = email.length > 0;
  const portalUrl = contact?.['support-portal-url']?.trim() || '';
  const portalMessage = contact?.['support-portal-message']?.trim() || 'For support, please log in to the portal:';
  const hasPortal = portalUrl.length > 0;
  const accentBg = isDark ? `bg-${accent}-900/40` : `bg-${accent}-100`;
  const accentText = `text-${accent}-600`;
  const directoryHref = `/jewett-junction/directory?department=${encodeURIComponent(department)}`;

  return (
    <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
      <CardHeader>
        <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center mb-4 animate-pulse">
            <div className={`w-16 h-16 rounded-full mx-auto mb-3 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
            <div className={`h-4 w-32 mx-auto rounded mb-1 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
            <div className={`h-3 w-24 mx-auto rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          </div>
        ) : (
          <div className="text-center mb-4">
            {contact?.photo?.url ? (
              <img
                src={contact.photo.url}
                alt={contact.name || title}
                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                loading="lazy"
              />
            ) : (
              <div className={`w-16 h-16 ${accentBg} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                <span className={`text-2xl font-bold ${accentText}`}>{initials(contact?.name)}</span>
              </div>
            )}
            <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>
              {contact?.name || title}
            </h3>
            {contact?.role && (
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{contact.role}</p>
            )}
          </div>
        )}
        <div className="space-y-3">
          {hasPortal ? (
            // Portal link replaces the email row when the contact employee has
            // a `portal-url` set (e.g. an outsourced IT vendor like SymQuest).
            <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-muted/50'}`}>
              <p className={`text-xs leading-snug mb-2 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                {portalMessage}
              </p>
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-medium break-all underline-offset-2 hover:underline ${isDark ? `text-${accent}-300 hover:text-${accent}-200` : `text-${accent}-600 hover:text-${accent}-700`}`}
                aria-label="Open support portal in a new tab"
              >
                <ExternalLink className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{portalUrl.replace(/^https?:\/\//, '')}</span>
              </a>
            </div>
          ) : hasEmail ? (
            <a
              href={`mailto:${email}`}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-muted/50 hover:bg-muted'
              }`}
            >
              <Mail className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`} />
              <span className={`text-sm truncate ${isDark ? 'text-slate-300' : ''}`}>{email}</span>
            </a>
          ) : null}
          {contact?.phone && (
            <a
              href={`tel:${contact.phone}`}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-muted/50 hover:bg-muted'
              }`}
            >
              <Phone className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`} />
              <span className={`text-sm ${isDark ? 'text-slate-300' : ''}`}>{contact.phone}</span>
            </a>
          )}
          <a
            href={directoryHref}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-muted/50 hover:bg-muted'
            }`}
          >
            <Users className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`} />
            <span className={`text-sm ${isDark ? 'text-slate-300' : ''}`}>View {title} Directory</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
