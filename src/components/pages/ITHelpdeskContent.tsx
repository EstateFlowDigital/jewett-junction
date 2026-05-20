import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Headphones, Ticket, BookOpen, Monitor, Wifi, Shield, Phone, Mail, Clock, ChevronRight, HelpCircle, Settings, AlertTriangle } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TeamContactCard } from './TeamContactCard';

interface ITArticle {
  id: string;
  name: string;
  slug?: string;
  category?: string;
  'article-type'?: string;
  description?: string;
  summary?: string;
  'full-content'?: string;
  content?: string;
  'article-link'?: string;
  'video-tutorial'?: string;
  'video-link'?: string;
  'download-link'?: string;
  platform?: string;
  difficulty?: string;
  featured?: boolean;
  icon?: { url: string };
}

interface ITSettings {
  'it-phone'?: string;
  'it-email'?: string;
  'it-hours-weekday'?: string;
  'it-hours-saturday'?: string;
  'it-emergency-hours'?: string;
  'it-system-status-message'?: string;
  'it-system-status-level'?: string;
}

const STATUS_THEME: Record<string, { card: string; header: string; title: string; text: string }> = {
  Operational: {
    card: 'bg-green-900/30 border-green-800',
    header: '',
    title: 'text-green-300',
    text: 'text-green-300',
  },
  Degraded: {
    card: 'bg-amber-900/30 border-amber-800',
    header: '',
    title: 'text-amber-300',
    text: 'text-amber-200',
  },
  Outage: {
    card: 'bg-red-900/30 border-red-800',
    header: '',
    title: 'text-red-300',
    text: 'text-red-200',
  },
  Maintenance: {
    card: 'bg-blue-900/30 border-blue-800',
    header: '',
    title: 'text-blue-300',
    text: 'text-blue-200',
  },
};

interface ITHelpdeskContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  initialItems?: ITArticle[];
  settings?: ITSettings;
}

export function ITHelpdeskContent({ theme = 'modern', initialItems = [], settings = {} }: ITHelpdeskContentProps) {
  const isDark = theme === 'dark';
  const resourcesLink = `/jewett-junction/resources`;
  const itEmail = settings['it-email'] || 'it@jewettconstruction.com';
  const statusMessage = settings['it-system-status-message'] || '';
  const statusTheme = STATUS_THEME[settings['it-system-status-level'] || 'Operational'] || STATUS_THEME.Operational;
  const itHoursWeekday = settings['it-hours-weekday'] || '7:00 AM - 6:00 PM';
  const itHoursSaturday = settings['it-hours-saturday'] || '8:00 AM - 12:00 PM';
  const itEmergencyHours = settings['it-emergency-hours'] || '24/7 On-Call';

  // CMS state - use initialItems if provided (server-side fetched)
  const [articles, setArticles] = React.useState<ITArticle[]>(initialItems);
  const [isLoading, setIsLoading] = React.useState(initialItems.length === 0);

  // Only fetch client-side if no initial items provided
  React.useEffect(() => {
    if (initialItems.length > 0) return;

    async function fetchITContent() {
      try {
        const response = await fetch('/jewett-junction/api/cms/it?limit=20');
        if (!response.ok) throw new Error('Failed to load content');
        const data = await response.json();
        setArticles(data.items || []);
      } catch (err: any) {
        console.error('Error fetching IT content:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchITContent();
  }, [initialItems.length]);

  // article-type is the real Webflow slug. Valid options are:
  // FAQ, How-To Guide, Troubleshooting, Software, Hardware, Security, Policy.
  // Older items may still use the legacy `category` field.
  const articleType = (a: ITArticle) => a['article-type'] || a.category || '';
  // The Software section gets its own dedicated bucket. Everything else lives
  // in the general "Help Articles" bucket so FAQ/Hardware/Security/Policy
  // articles don't disappear from the listing.
  const softwareArticles = articles.filter(a => articleType(a) === 'Software');
  const howToArticles = articles.filter(a => articleType(a) && articleType(a) !== 'Software');

  // If nothing has article-type set, fall back to showing every article.
  const hasTypes = howToArticles.length > 0 || softwareArticles.length > 0;
  const displayArticles = hasTypes ? [] : articles;

  // Helper to strip HTML
  const stripHtml = (html?: string) => html?.replace(/<[^>]*>/g, '').trim() || '';

  // Icon mapping for article categories
  const getCategoryIcon = (title: string) => {
    if (title.toLowerCase().includes('password')) return Shield;
    if (title.toLowerCase().includes('vpn') || title.toLowerCase().includes('wifi')) return Wifi;
    if (title.toLowerCase().includes('email')) return Mail;
    if (title.toLowerCase().includes('print')) return Monitor;
    return HelpCircle;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
          <Headphones className="h-7 w-7 text-blue-600" />
          IT Help Desk
        </h1>
        <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
          Technical support, resources, and self-service tools
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="/jewett-junction/it-ticket">
          <Card className={`hover:shadow-lg transition-all cursor-pointer h-full ${isDark ? 'bg-slate-800 border-blue-800 hover:border-blue-600' : 'border-blue-200 bg-blue-50/50 hover:border-blue-400'}`}>
            <CardContent className="py-4 text-center">
              <div className={`w-12 h-12 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                <Ticket className="h-6 w-6 text-blue-600" />
              </div>
              <div className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-900'}`}>Submit Ticket</div>
              <div className={`text-sm ${isDark ? 'text-blue-500' : 'text-blue-700'}`}>Get help now</div>
            </CardContent>
          </Card>
        </a>
        <a href={resourcesLink}>
          <Card className={`hover:shadow-lg transition-all cursor-pointer h-full ${isDark ? 'bg-slate-800 border-purple-800 hover:border-purple-600' : 'border-purple-200 bg-purple-50/50 hover:border-purple-400'}`}>
            <CardContent className="py-4 text-center">
              <div className={`w-12 h-12 ${isDark ? 'bg-purple-900' : 'bg-purple-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className={`font-semibold ${isDark ? 'text-purple-400' : 'text-purple-900'}`}>Knowledge Base</div>
              <div className={`text-sm ${isDark ? 'text-purple-500' : 'text-purple-700'}`}>Self-service help</div>
            </CardContent>
          </Card>
        </a>
        <a href={resourcesLink}>
          <Card className={`hover:shadow-lg transition-all cursor-pointer h-full ${isDark ? 'bg-slate-800 border-green-800 hover:border-green-600' : 'border-green-200 bg-green-50/50 hover:border-green-400'}`}>
            <CardContent className="py-4 text-center">
              <div className={`w-12 h-12 ${isDark ? 'bg-green-900' : 'bg-green-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                <Monitor className="h-6 w-6 text-green-600" />
              </div>
              <div className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-900'}`}>Software</div>
              <div className={`text-sm ${isDark ? 'text-green-500' : 'text-green-700'}`}>Request access</div>
            </CardContent>
          </Card>
        </a>
        <a href={resourcesLink}>
          <Card className={`hover:shadow-lg transition-all cursor-pointer h-full ${isDark ? 'bg-slate-800 border-orange-800 hover:border-orange-600' : 'border-orange-200 bg-orange-50/50 hover:border-orange-400'}`}>
            <CardContent className="py-4 text-center">
              <div className={`w-12 h-12 ${isDark ? 'bg-orange-900' : 'bg-orange-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
              <div className={`font-semibold ${isDark ? 'text-orange-400' : 'text-orange-900'}`}>My Devices</div>
              <div className={`text-sm ${isDark ? 'text-orange-500' : 'text-orange-700'}`}>Manage equipment</div>
            </CardContent>
          </Card>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Common Issues */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : ''}>Common Issues & Quick Fixes</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : ''}>Resolve issues yourself with these guides</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-muted/30'}`}>
                      <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <Skeleton className="h-5 w-5 rounded" />
                    </div>
                  ))}
                </div>
              ) : (howToArticles.length > 0 || displayArticles.length > 0) ? (
                /* Show how-to articles, or all articles if no type is set - link to detail pages */
                (howToArticles.length > 0 ? howToArticles.slice(0, 4) : displayArticles.slice(0, 4)).map((article) => (
                  <a key={article.id} href={`/jewett-junction/it-helpdesk/${article.slug || article.id}`} className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700 border border-slate-700' : 'hover:bg-muted/50 border border-muted'}`}>
                    {article.icon?.url ? (
                      <img src={article.icon.url} alt={article.name} className="w-12 h-12 rounded-lg object-cover shrink-0" loading="lazy" />
                    ) : (
                      <div className={`w-12 h-12 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg flex items-center justify-center shrink-0`}>
                        {(() => {
                          const Icon = getCategoryIcon(article.name);
                          return <Icon className="h-6 w-6 text-blue-600" />;
                        })()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium ${isDark ? 'text-white' : ''}`}>{article.name}</div>
                      <div className={`text-sm truncate ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{stripHtml(article.description || article.summary)?.substring(0, 80) || 'IT Resource'}</div>
                    </div>
                    <ChevronRight className={`h-5 w-5 shrink-0 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`} />
                  </a>
                ))
              ) : (
                /* Empty state when no articles */
                <div className={`text-center py-6 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                  <HelpCircle className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>No articles available.</p>
                  <a href="/jewett-junction/admin" className="text-blue-600 hover:underline text-sm mt-1 inline-block">
                    Add content in the admin panel
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* My Tickets */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className={isDark ? 'text-white' : ''}>My Recent Tickets</CardTitle>
                <CardDescription className={isDark ? 'text-slate-400' : ''}>Track your support requests</CardDescription>
              </div>
              <a href="/jewett-junction/it-ticket">
                <Button variant="outline" size="sm" className={isDark ? 'border-slate-600 text-slate-300' : ''}>Submit Ticket</Button>
              </a>
            </CardHeader>
            <CardContent>
              <div className={`p-6 rounded-lg border text-center ${isDark ? 'bg-slate-700/50 border-slate-600' : 'bg-muted/30'}`}>
                <Monitor className={`h-10 w-10 mx-auto mb-3 ${isDark ? 'text-slate-500' : 'text-muted-foreground'} opacity-50`} />
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>No active tickets</p>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>Submit a request to get IT support</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* IT Contact — primary lead from Employees collection */}
          <TeamContactCard
            department="IT"
            pageKey="IT"
            title="IT Support"
            fallbackEmail={itEmail}
            theme={theme}
            accent="sky"
          />

          {/* System Status — only shows when admin has set a message */}
          {statusMessage && (
            <Card className={statusTheme.card}>
              <CardHeader>
                <CardTitle className={`text-base ${statusTheme.title}`}>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm ${statusTheme.text}`}>{statusMessage}</p>
              </CardContent>
            </Card>
          )}

          {/* Hours */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>Support Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={isDark ? 'text-slate-400' : 'text-muted-foreground'}>Mon - Fri</span>
                <span className={`font-medium ${isDark ? 'text-white' : ''}`}>{itHoursWeekday}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-slate-400' : 'text-muted-foreground'}>Saturday</span>
                <span className={`font-medium ${isDark ? 'text-white' : ''}`}>{itHoursSaturday}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-slate-400' : 'text-muted-foreground'}>Emergency</span>
                <span className={`font-medium ${isDark ? 'text-white' : ''}`}>{itEmergencyHours}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
