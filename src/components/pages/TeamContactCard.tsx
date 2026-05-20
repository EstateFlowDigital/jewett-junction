import * as React from 'react';
import { Mail, Phone, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Employee {
  id: string;
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  department?: string;
  'team-department'?: string;
  dept?: string;
  photo?: { url?: string };
  'is-featured'?: boolean;
  'leadership-team'?: boolean;
  'page-contact-for'?: string;
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
          const dept = (e.dept || e['team-department'] || e.department || '').toLowerCase();
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

  const email = contact?.email || fallbackEmail;
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
          <a
            href={`mailto:${email}`}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-muted/50 hover:bg-muted'
            }`}
          >
            <Mail className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`} />
            <span className={`text-sm truncate ${isDark ? 'text-slate-300' : ''}`}>{email}</span>
          </a>
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
