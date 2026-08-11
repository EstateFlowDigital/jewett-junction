import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Shield, AlertTriangle, Eye, BookOpen, FileText, Phone, Mail, Newspaper, ChevronRight, Download, Clock, HardHat, Flame, Zap, Users, Award } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TeamContactCard } from './TeamContactCard';
import { QuickActionCards, type QuickAction } from './QuickActionCards';

interface SafetyItem {
  id: string;
  name: string;
  slug?: string;
  'content-type'?: string;
  description?: string;
  'full-content'?: string;
  content?: string;
  'document-link'?: string;
  priority?: string;
  severity?: string;
  'effective-date'?: string;
  'expiration-date'?: string;
  'video-link'?: string;
  featured?: boolean;
  image?: { url: string };
}

const getContent = (item: { 'full-content'?: string; content?: string }) => item['full-content'] || item.content;

interface SafetySettings {
  'safety-email'?: string;
  'poison-control-phone'?: string;
  'safety-days-without-incident'?: number;
  'safety-company-record-days'?: number;
  'safety-training-compliance'?: number;
  'safety-active-sites'?: number;
  'safety-award-headline'?: string;
  'safety-award-winner-name'?: string;
  'safety-award-winner-title'?: string;
  'safety-award-photo'?: { url?: string };
  'safety-award-message'?: string;
}

interface SafetyPageCopy {
  'hero-headline'?: string;
  'hero-subtitle'?: string;
  /** Title for the Safety Alerts & Updates block. */
  'subsection-1-headline'?: string;
  'subsection-1-description'?: string;
  /** Title for the Required Safety Training block. */
  'subsection-2-headline'?: string;
  'subsection-2-description'?: string;
}

interface SafetyContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  initialItems?: SafetyItem[];
  settings?: SafetySettings;
  pageCopy?: SafetyPageCopy | null;
  /** Quick-action cards for this page, pre-filtered server-side from the
   *  Quick Actions CMS collection. */
  quickActions?: QuickAction[];
}

export function SafetyContent({ theme = 'modern', initialItems = [], settings = {}, pageCopy = null, quickActions = [] }: SafetyContentProps) {
  const isDark = theme === 'dark';
  const resourcesLink = `/jewett-junction/resources`;
  const safetyEmail = settings['safety-email'] || 'safety@jewettconstruction.com';
  const awardHeadline = settings['safety-award-headline'] || '';
  const awardName = settings['safety-award-winner-name'] || '';
  const awardTitle = settings['safety-award-winner-title'] || '';
  const awardPhoto = settings['safety-award-photo']?.url || '';
  const awardMessage = settings['safety-award-message'] || '';

  // CMS state - use initialItems if provided (server-side fetched)
  const [safetyItems, setSafetyItems] = React.useState<SafetyItem[]>(initialItems);
  const [isLoading, setIsLoading] = React.useState(initialItems.length === 0);

  // Only fetch client-side if no initial items provided
  React.useEffect(() => {
    if (initialItems.length > 0) return;

    async function fetchSafetyContent() {
      try {
        const response = await fetch('/jewett-junction/api/cms/safety?limit=20');
        if (!response.ok) throw new Error('Failed to load content');
        const data = await response.json();
        setSafetyItems(data.items || []);
      } catch (err: any) {
        console.error('Error fetching Safety content:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSafetyContent();
  }, [initialItems.length]);

  // Filter items by type - handle case where content-type is not set
  const alerts = safetyItems.filter(item => item['content-type'] === 'Alert');
  const protocols = safetyItems.filter(item => item['content-type'] === 'Protocol');
  const training = safetyItems.filter(item => item['content-type'] === 'Training');

  // Latest safety newsletter — match by content-type OR by 'newsletter' in the
  // item name so the client can use whatever convention they prefer. Returns
  // undefined when none exist, in which case the card is hidden.
  const latestNewsletter = (() => {
    const matches = safetyItems.filter((item: SafetyItem) => {
      const ct = (item['content-type'] || '').toLowerCase();
      const name = (item.name || '').toLowerCase();
      return ct === 'newsletter' || name.includes('newsletter');
    });
    if (matches.length === 0) return undefined;
    // Most recently effective/created — fall back to first match if no dates.
    return matches.slice().sort((a: any, b: any) => {
      const da = new Date(a['effective-date'] || a['last-updated'] || 0).getTime();
      const db = new Date(b['effective-date'] || b['last-updated'] || 0).getTime();
      return db - da;
    })[0];
  })();
  // Severity is the real Webflow field; old `priority` kept as fallback for legacy items.
  const isUrgent = (item: SafetyItem) =>
    item.severity === 'Critical' || item.severity === 'Emergency' || item.priority === 'Urgent';
  const urgentAlerts = alerts.filter(isUrgent);
  const regularAlerts = alerts.filter((item) => !isUrgent(item));

  // If no items have content-type set, treat all items as protocols/general safety content
  const hasContentTypes = alerts.length > 0 || protocols.length > 0 || training.length > 0;
  const displayItems = hasContentTypes ? [] : safetyItems; // Items without content-type categorization

  // Helper to strip HTML
  const stripHtml = (html?: string) => html?.replace(/<[^>]*>/g, '').trim() || '';

  // Helper to safely format date
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString();
  };

  const heroHeadline = pageCopy?.['hero-headline'] || '';
  const heroSubtitle = pageCopy?.['hero-subtitle'] || '';
  const alertsHeadline = pageCopy?.['subsection-1-headline'] || '';
  const alertsDescription = pageCopy?.['subsection-1-description'] || '';
  const trainingHeadline = pageCopy?.['subsection-2-headline'] || '';
  const trainingDescription = pageCopy?.['subsection-2-description'] || '';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {heroHeadline && (
            <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
              <Shield className="h-7 w-7 text-green-600" />
              {heroHeadline}
            </h1>
          )}
          {heroSubtitle && (
            /^\s*<\w/.test(heroSubtitle) ? (
              <div
                className={`mt-1 prose prose-sm max-w-none [&>p]:m-0 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}
                dangerouslySetInnerHTML={{ __html: heroSubtitle }}
              />
            ) : (
              <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{heroSubtitle}</p>
            )
          )}
        </div>
      </div>

      {/* Safety Award banner — all fields live in Site Settings → Safety Award.
          Hidden entirely until a headline is set, so it can be retired or
          swapped each year without a code change. */}
      {awardHeadline && (
        <Card className="bg-gradient-to-r from-emerald-600 to-green-700 text-white border-0 overflow-hidden">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {awardPhoto ? (
                <img
                  src={awardPhoto}
                  alt={awardName || 'Safety award winner'}
                  /* object-top, not the default center: headshots are portrait
                     crops and centering a 2:3 photo in a square window cuts off
                     the top of the subject's head. */
                  className="w-20 h-20 rounded-2xl object-cover object-top border-2 border-white/30 shrink-0"
                  loading="lazy"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-white/15 border-2 border-white/30 flex items-center justify-center shrink-0">
                  <Award className="h-9 w-9 text-white" aria-hidden="true" />
                </div>
              )}
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Award className="h-3.5 w-3.5" aria-hidden="true" />
                  {awardHeadline}
                </div>
                {awardName && <h2 className="text-2xl font-bold leading-tight">{awardName}</h2>}
                {awardTitle && <p className="text-green-100">{awardTitle}</p>}
                {awardMessage && <p className="text-green-50/90 text-sm mt-2">{awardMessage}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions — fully CMS-driven via the Quick Actions collection */}
      <QuickActionCards actions={quickActions} theme={theme} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Safety Alerts */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              {alertsHeadline && <CardTitle className={isDark ? 'text-white' : ''}>{alertsHeadline}</CardTitle>}
              {alertsDescription && (
                <CardDescription className={isDark ? 'text-slate-400' : ''}>{alertsDescription}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-muted/30'}`}>
                      <div className="flex items-start gap-4">
                        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-16 rounded-full" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : alerts.length > 0 ? (
                <>
                  {/* Urgent Alerts */}
                  {urgentAlerts.map((alert) => (
                    <a key={alert.id} href={`/jewett-junction/safety/${alert.slug || alert.id}`} className={`block p-4 rounded-lg ${isDark ? 'bg-red-900/30 border border-red-800 hover:bg-red-900/50' : 'bg-red-50 border border-red-200 hover:bg-red-100'} transition-colors`}>
                      <div className="flex items-start gap-4">
                        {alert.image?.url ? (
                          <img src={alert.image.url} alt={alert.name} className="w-12 h-12 rounded-lg object-cover shrink-0" loading="lazy" />
                        ) : (
                          <div className={`w-12 h-12 ${isDark ? 'bg-red-900' : 'bg-red-100'} rounded-lg flex items-center justify-center shrink-0`}>
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-red-200 text-red-800 hover:bg-red-200">URGENT</Badge>
                            {alert['effective-date'] && formatDate(alert['effective-date']) && <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>{formatDate(alert['effective-date'])}</span>}
                          </div>
                          <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>{alert.name}</h3>
                          <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{stripHtml(alert.description || getContent(alert))?.substring(0, 200)}</p>
                        </div>
                        <ChevronRight className={`h-5 w-5 shrink-0 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                      </div>
                    </a>
                  ))}
                  {/* Regular Alerts */}
                  {regularAlerts.slice(0, 2).map((alert) => (
                    <a key={alert.id} href={`/jewett-junction/safety/${alert.slug || alert.id}`} className={`block p-4 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700 border border-slate-700' : 'hover:bg-muted/50 border border-muted'}`}>
                      <div className="flex items-start gap-4">
                        {alert.image?.url ? (
                          <img src={alert.image.url} alt={alert.name} className="w-12 h-12 rounded-lg object-cover shrink-0" loading="lazy" />
                        ) : (
                          <div className={`w-12 h-12 ${isDark ? 'bg-yellow-900' : 'bg-yellow-100'} rounded-lg flex items-center justify-center shrink-0`}>
                            <Clock className="h-6 w-6 text-yellow-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Alert</Badge>
                            {alert['effective-date'] && formatDate(alert['effective-date']) && <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>{formatDate(alert['effective-date'])}</span>}
                          </div>
                          <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>{alert.name}</h3>
                          <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{stripHtml(alert.description || getContent(alert))?.substring(0, 200)}</p>
                        </div>
                        <ChevronRight className={`h-5 w-5 shrink-0 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`} />
                      </div>
                    </a>
                  ))}
                </>
              ) : displayItems.length > 0 ? (
                /* CMS items without content-type - display as general safety content */
                <>
                  {displayItems.slice(0, 4).map((item) => (
                    <a key={item.id} href={`/jewett-junction/safety/${item.slug || item.id}`} className={`block p-4 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700 border border-slate-700' : 'hover:bg-muted/50 border border-muted'}`}>
                      <div className="flex items-start gap-4">
                        {item.image?.url ? (
                          <img src={item.image.url} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" loading="lazy" />
                        ) : (
                          <div className={`w-12 h-12 ${isDark ? 'bg-green-900' : 'bg-green-100'} rounded-lg flex items-center justify-center shrink-0`}>
                            <Shield className="h-6 w-6 text-green-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">Safety</Badge>
                            {item['expiration-date'] && <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>Expires: {formatDate(item['expiration-date'])}</span>}
                          </div>
                          <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>{item.name}</h3>
                          <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{stripHtml(item.description || getContent(item))?.substring(0, 200)}</p>
                        </div>
                        <ChevronRight className={`h-5 w-5 shrink-0 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`} />
                      </div>
                    </a>
                  ))}
                </>
              ) : (
                /* Empty state when no CMS content */
                <div className={`text-center py-8 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                  <Shield className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No safety alerts at this time.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Required Training — hides entirely when there's no content. */}
          {(() => {
            const trainingSource = training.length > 0
              ? training.slice(0, 2)
              : safetyItems.filter((item) => item['video-link']).slice(0, 2);
            if (trainingSource.length === 0) return null;
            return (
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                {trainingHeadline && <CardTitle className={isDark ? 'text-white' : ''}>{trainingHeadline}</CardTitle>}
                {trainingDescription && (
                  <CardDescription className={isDark ? 'text-slate-400' : ''}>{trainingDescription}</CardDescription>
                )}
              </div>
              <a href={resourcesLink}>
                <Button variant="outline" size="sm" className={isDark ? 'border-slate-600 text-slate-300' : ''}>
                  View All Courses
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainingSource.map((item, i) => ({
                  name: item.name,
                  href: `/jewett-junction/safety/${item.slug || item.id}`,
                  desc: stripHtml(item.description || getContent(item))?.trim().substring(0, 80) || '',
                  color: i === 0 ? 'green' : 'blue',
                  icon: i === 0 ? Shield : HardHat,
                })).map((course) => (
                  <a
                    key={course.name}
                    href={course.href}
                    className="block group"
                    aria-label={`Open training: ${course.name}`}
                  >
                    <Card className={`border h-full transition-colors min-h-[44px] ${isDark ? `bg-slate-700 border-slate-600 group-hover:border-${course.color}-600 group-hover:bg-slate-700/80` : `group-hover:border-${course.color}-300 group-hover:shadow-md`}`}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-10 h-10 ${isDark ? `bg-${course.color}-900` : `bg-${course.color}-100`} rounded-lg flex items-center justify-center`}>
                            <course.icon className={`h-5 w-5 text-${course.color}-600`} />
                          </div>
                          <Badge className={`bg-${course.color}-100 text-${course.color}-700`}>Required</Badge>
                        </div>
                        <h3 className={`font-semibold mb-1 group-hover:text-${course.color}-500 transition-colors ${isDark ? 'text-white' : ''}`}>{course.name}</h3>
                        {course.desc && (
                          <p className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{course.desc}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>Required</span>
                          <span className={`inline-flex items-center gap-1 text-sm font-medium text-${course.color}-500 group-hover:gap-2 transition-all`}>
                            View Details
                            <ChevronRight className="h-4 w-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
            );
          })()}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Safety Contact */}
          <TeamContactCard
            department="Safety"
            pageKey="Safety"
            title="Safety Team Contact"
            fallbackEmail={safetyEmail}
            theme={theme}
            accent="green"
            showDirectoryLink={false}
          />

          {/* Safety Newsletter — hidden when no newsletter exists in CMS */}
          {latestNewsletter && (
            <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
              <CardHeader>
                <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>Safety Newsletter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Stay updated with the latest safety news and tips.</p>
                <a href={`/jewett-junction/safety/${latestNewsletter.slug || latestNewsletter.id}`} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-muted/50'}`}>
                  <div className={`w-10 h-10 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg flex items-center justify-center shrink-0`}>
                    <Newspaper className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <div className={`font-medium text-sm truncate ${isDark ? 'text-white' : ''}`}>{latestNewsletter.name}</div>
                    <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>
                      {formatDate(latestNewsletter['effective-date']) || stripHtml(latestNewsletter.description || getContent(latestNewsletter))?.substring(0, 60) || 'Read the latest issue'}
                    </div>
                  </div>
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
