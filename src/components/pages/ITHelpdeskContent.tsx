import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Headphones, Ticket, BookOpen, Monitor, Wifi, Shield, Phone, Mail, Clock, ChevronRight, HelpCircle, Settings, AlertTriangle } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { CmsIcon } from '../ui/cms-icon';
import { TeamContactCard } from './TeamContactCard';
import { QuickActionCards, type QuickAction } from './QuickActionCards';

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
  'icon-color'?: string;
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

interface ITPageCopy {
  'hero-headline'?: string;
  'hero-subtitle'?: string;
  /** Title for the Common Issues & Quick Fixes block. */
  'subsection-1-headline'?: string;
  'subsection-1-description'?: string;
  /** Title for the My Recent Tickets block. */
  'subsection-2-headline'?: string;
  'subsection-2-description'?: string;
}

interface ITHelpdeskContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  initialItems?: ITArticle[];
  settings?: ITSettings;
  pageCopy?: ITPageCopy | null;
  /** Quick-action cards for this page, pre-filtered server-side from the
   *  Quick Actions CMS collection. */
  quickActions?: QuickAction[];
}

export function ITHelpdeskContent({ theme = 'modern', initialItems = [], settings = {}, pageCopy = null, quickActions = [] }: ITHelpdeskContentProps) {
  const isDark = theme === 'dark';
  const resourcesLink = `/jewett-junction/resources`;
  const itEmail = settings['it-email'] || 'it@jewettconstruction.com';

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

  const heroHeadline = pageCopy?.['hero-headline'] || '';
  const heroSubtitle = pageCopy?.['hero-subtitle'] || '';
  const issuesHeadline = pageCopy?.['subsection-1-headline'] || '';
  const issuesDescription = pageCopy?.['subsection-1-description'] || '';

  return (
    <div className="space-y-6">
      <div>
        {heroHeadline && (
          <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
            <Headphones className="h-7 w-7 text-blue-600" />
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

      {/* Quick Actions — fully CMS-driven via the Quick Actions collection */}
      <QuickActionCards actions={quickActions} theme={theme} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Common Issues */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              {issuesHeadline && <CardTitle className={isDark ? 'text-white' : ''}>{issuesHeadline}</CardTitle>}
              {issuesDescription && <CardDescription className={isDark ? 'text-slate-400' : ''}>{issuesDescription}</CardDescription>}
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
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${article.icon?.url ? '' : (isDark ? 'bg-blue-900' : 'bg-blue-100')}`}
                      style={article.icon?.url && /^#[0-9a-fA-F]{6}$/.test(article['icon-color'] || '') ? { backgroundColor: `${article['icon-color']}33` } : undefined}
                    >
                      {article.icon?.url ? (
                        <CmsIcon
                          url={article.icon.url}
                          color={article['icon-color']}
                          size={24}
                          ariaLabel={article.name}
                        />
                      ) : (
                        (() => {
                          const Icon = getCategoryIcon(article.name);
                          return <Icon className="h-6 w-6 text-blue-600" />;
                        })()
                      )}
                    </div>
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
                  <p>No how-to articles available yet — check back soon.</p>
                </div>
              )}
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
            showDirectoryLink={false}
          />
        </div>
      </div>
    </div>
  );
}
