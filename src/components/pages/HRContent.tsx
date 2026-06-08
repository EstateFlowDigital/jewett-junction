import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, Clock, Heart, DollarSign, Calendar, FileText, Shield, Phone, Mail, ExternalLink, ChevronRight, BookOpen, CreditCard, Globe, AlertCircle } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { CmsIcon } from '../ui/cms-icon';
import { TeamContactCard } from './TeamContactCard';
import { QuickActionCards, type QuickAction } from './QuickActionCards';

interface HRItem {
  id: string;
  name: string;
  slug?: string;
  'content-type'?: string;
  description?: string;
  'full-content'?: string;
  content?: string;
  'document-link'?: string;
  'effective-date'?: string;
  featured?: boolean;
  icon?: { url: string };
  /** Custom hex color (e.g. #d22630) for the benefit/policy icon tile. Optional;
   *  falls back to the theme default when blank. */
  'icon-color'?: string;
}

interface SiteSettingsLite {
  'eap-phone'?: string;
  'eap-portal-url'?: string;
  'hr-email'?: string;
  'hr-portal-adp'?: string;
  'hr-portal-bcbs'?: string;
  'hr-portal-fidelity'?: string;
}

const getContent = (item: { 'full-content'?: string; content?: string }) => item['full-content'] || item.content;

interface HRPageCopy {
  'hero-headline'?: string;
  'hero-subtitle'?: string;
  /** Title for the Benefits Overview block. */
  'subsection-1-headline'?: string;
  'subsection-1-description'?: string;
  /** Title for the Forms & Documents block. */
  'subsection-2-headline'?: string;
  'subsection-2-description'?: string;
}

interface HRContentProps {
  /** Quick-action cards for this page, pre-filtered server-side from the
   *  Quick Actions CMS collection. */
  quickActions?: QuickAction[];
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  initialItems?: HRItem[];
  settings?: SiteSettingsLite;
  pageCopy?: HRPageCopy | null;
}

export function HRContent({ theme = 'modern', initialItems = [], settings = {}, pageCopy = null, quickActions = [] }: HRContentProps) {
  const isDark = theme === 'dark';
  const resourcesLink = `/jewett-junction/resources`;
  const eapPhone = settings['eap-phone'] || '';
  const eapPortalUrl = settings['eap-portal-url'] || '';
  const hrEmail = settings['hr-email'] || 'hr@jewettconstruction.com';
  const portalLinks: { name: string; desc: string; href: string }[] = [
    { name: 'ADP Workforce Now', desc: 'Payroll & Time', href: settings['hr-portal-adp'] || '' },
    { name: 'Benefits Portal', desc: 'BCBS & Wellness', href: settings['hr-portal-bcbs'] || '' },
    { name: '401(k) Portal', desc: 'Fidelity NetBenefits', href: settings['hr-portal-fidelity'] || '' },
  ].filter((l) => l.href);

  // CMS state - use initialItems if provided (server-side fetched)
  const [hrItems, setHrItems] = React.useState<HRItem[]>(initialItems);
  const [isLoading, setIsLoading] = React.useState(initialItems.length === 0);

  // Only fetch client-side if no initial items provided
  React.useEffect(() => {
    if (initialItems.length > 0) return;

    async function fetchHRContent() {
      try {
        const response = await fetch('/jewett-junction/api/cms/hr?limit=20');
        if (!response.ok) throw new Error('Failed to load content');
        const data = await response.json();
        setHrItems(data.items || []);
      } catch (err: any) {
        console.error('Error fetching HR content:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHRContent();
  }, [initialItems.length]);

  // Filter items by type - handle case where content-type is not set
  const announcements = hrItems.filter(item => item['content-type'] === 'Announcement' && item.featured);
  const policies = hrItems.filter(item => item['content-type'] === 'Policy');
  // Benefits Overview also surfaces holiday/PTO/time-off items even if their
  // content-type is set to Policy or left blank — they belong here visually
  // and the client expects them to show alongside health/401k benefits.
  const BENEFIT_NAME_HINTS = /benefit|holiday|pto|vacation|time\s*off|leave|wellness|401|health|insurance/i;
  const benefits = hrItems.filter(
    (item) =>
      item['content-type'] === 'Benefit' ||
      BENEFIT_NAME_HINTS.test(item.name || ''),
  );
  const forms = hrItems.filter(item => item['content-type'] === 'Form');
  const featuredItem = announcements[0] || hrItems.find(item => item.featured);

  // If no items have content-type set, use all items as fallback for display
  const hasContentTypes = announcements.length > 0 || policies.length > 0 || benefits.length > 0 || forms.length > 0;
  const displayItems = hasContentTypes ? [] : hrItems;

  // Helper to strip HTML
  const stripHtml = (html?: string) => html?.replace(/<[^>]*>/g, '').trim() || '';

  // The four quick-action cards (Pay & Tax Info, Time Off, Benefits, Get Help)
  // used to link to hardcoded slugs (/hr/pay-tax-info, /hr/time-off, etc.)
  // that didn't exist as CMS items, so the [slug] page redirected back to
  // /hr and the click looked broken. Resolve them dynamically by keyword.
  const findHRLink = (keywords: string[], fallback = '/jewett-junction/hr'): string => {
    const needle = (s?: string) => (s || '').toLowerCase();
    const match = hrItems.find((it) => {
      const haystack = `${needle(it.name)} ${needle(it.slug)} ${needle(it['content-type'])}`;
      return keywords.some((k) => haystack.includes(k.toLowerCase()));
    });
    return match ? `/jewett-junction/hr/${match.slug || match.id}` : fallback;
  };
  const payLink = findHRLink(['pay & tax', 'pay and tax', 'paystub', 'tax info', 'payroll', 'w-2', 'w2', 'pay', 'salary']);
  const timeOffLink = findHRLink(['time off', 'pto', 'vacation', 'leave', 'holiday']);
  const benefitsLink = findHRLink(['benefits guide', 'benefits package', 'open enrollment', 'benefit', 'health', 'insurance', '401k']);

  const heroHeadline = pageCopy?.['hero-headline'] || '';
  const heroSubtitle = pageCopy?.['hero-subtitle'] || '';
  const benefitsHeadline = pageCopy?.['subsection-1-headline'] || '';
  const benefitsDescription = pageCopy?.['subsection-1-description'] || '';
  const formsHeadline = pageCopy?.['subsection-2-headline'] || '';
  const formsDescription = pageCopy?.['subsection-2-description'] || '';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {heroHeadline && (
            <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
              <Users className="h-7 w-7 text-purple-600" />
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

      {/* Featured Announcement - CMS or Static Fallback */}
      {isLoading ? (
        <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0">
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-xl bg-white/20" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48 bg-white/20" />
                  <Skeleton className="h-4 w-72 bg-white/20" />
                </div>
              </div>
              <Skeleton className="h-10 w-28 rounded-md bg-white/20" />
            </div>
          </CardContent>
        </Card>
      ) : featuredItem ? (
        <a href={`/jewett-junction/hr/${featuredItem.slug || featuredItem.id}`} className="block">
          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0 hover:from-purple-500 hover:to-purple-600 transition-all">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    {featuredItem.icon?.url ? (
                      <CmsIcon
                        url={featuredItem.icon.url}
                        color={featuredItem['icon-color']}
                        size={28}
                        ariaLabel={featuredItem.name}
                      />
                    ) : (
                      <AlertCircle className="h-7 w-7" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{featuredItem.name}</h2>
                    <p className="text-purple-100">{stripHtml(featuredItem.description || getContent(featuredItem))?.substring(0, 150)}</p>
                  </div>
                </div>
                <Button className="bg-white text-purple-700 hover:bg-purple-50 shrink-0">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </a>
      ) : displayItems.length > 0 ? (
        /* Show first CMS item as featured when no content-type is set */
        <a href={`/jewett-junction/hr/${displayItems[0].slug || displayItems[0].id}`} className="block">
          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0 hover:from-purple-500 hover:to-purple-600 transition-all">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    {displayItems[0].icon?.url ? (
                      <CmsIcon
                        url={displayItems[0].icon.url}
                        color={displayItems[0]['icon-color']}
                        size={28}
                        ariaLabel={displayItems[0].name}
                      />
                    ) : (
                      <Users className="h-7 w-7" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{displayItems[0].name}</h2>
                    <p className="text-purple-100">{stripHtml(displayItems[0].description || getContent(displayItems[0]))?.substring(0, 150)}</p>
                  </div>
                </div>
                <Button className="bg-white text-purple-700 hover:bg-purple-50 shrink-0">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </a>
      ) : (
        /* Empty state when no CMS content */
        <Card className={`border ${isDark ? 'bg-slate-800 border-slate-700' : ''}`}>
          <CardContent className="py-8 text-center">
            <Users className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-slate-600' : 'text-muted-foreground'} opacity-50`} />
            <p className={isDark ? 'text-slate-400' : 'text-muted-foreground'}>No HR announcements posted yet — check back soon.</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions — fully CMS-driven via the Quick Actions collection */}
      <QuickActionCards actions={quickActions} theme={theme} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Benefits Overview */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              {benefitsHeadline && <CardTitle className={isDark ? 'text-white' : ''}>{benefitsHeadline}</CardTitle>}
              {benefitsDescription && <CardDescription className={isDark ? 'text-slate-400' : ''}>{benefitsDescription}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Up to 4 benefit-like items. Honors CMS-provided icon image
                    and `icon-color` hex for the tile, falling back to a
                    pleasant default rotation when not set. */}
                {(benefits.length > 0 ? benefits : displayItems).slice(0, 4).map((benefit, i) => {
                  const FALLBACK_ICONS = [Heart, DollarSign, Calendar, Shield];
                  const FALLBACK_COLORS = ['red', 'green', 'blue', 'purple'];
                  const FallbackIcon = FALLBACK_ICONS[i % FALLBACK_ICONS.length];
                  const fallbackColor = FALLBACK_COLORS[i % FALLBACK_COLORS.length];
                  const customHex = /^#[0-9a-fA-F]{6}$/.test(benefit['icon-color'] || '')
                    ? benefit['icon-color']
                    : undefined;
                  const iconUrl = benefit.icon?.url;
                  return (
                    <a
                      key={benefit.id || benefit.name}
                      href={`/jewett-junction/hr/${benefit.slug || benefit.id}`}
                      className="block group"
                      aria-label={`View benefit: ${benefit.name}`}
                    >
                      <Card className={`border h-full transition-all min-h-[44px] ${isDark ? 'bg-slate-700 border-slate-600 hover:border-purple-500/50 hover:bg-slate-700/80' : 'hover:border-purple-300 hover:shadow-md'}`}>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={
                                customHex
                                  ? 'w-10 h-10 rounded-lg flex items-center justify-center'
                                  : `w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? `bg-${fallbackColor}-900` : `bg-${fallbackColor}-100`}`
                              }
                              style={customHex ? { backgroundColor: `${customHex}33` } : undefined}
                            >
                              {iconUrl ? (
                                <CmsIcon
                                  url={iconUrl}
                                  color={customHex || undefined}
                                  size={20}
                                  ariaLabel={benefit.name}
                                />
                              ) : (
                                <FallbackIcon
                                  className={customHex ? 'h-5 w-5' : `h-5 w-5 text-${fallbackColor}-600`}
                                  style={customHex ? { color: customHex } : undefined}
                                />
                              )}
                            </div>
                            <h3 className={`font-semibold group-hover:text-purple-500 transition-colors ${isDark ? 'text-white' : ''}`}>{benefit.name}</h3>
                            <ChevronRight className={`h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                          </div>
                          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                            {stripHtml(benefit.description || getContent(benefit))?.substring(0, 100)}
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* HR Forms */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                {formsHeadline && <CardTitle className={isDark ? 'text-white' : ''}>{formsHeadline}</CardTitle>}
                {formsDescription && <CardDescription className={isDark ? 'text-slate-400' : ''}>{formsDescription}</CardDescription>}
              </div>
              <Button variant="outline" size="sm" className={isDark ? 'border-slate-600 text-slate-300' : ''}>
                View All <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Show forms from CMS, or display items without content-type */}
                {(forms.length > 0 ? forms.slice(0, 4) : displayItems.filter(item => item['document-link']).slice(0, 4)).map((form) => ({
                  name: form.name,
                  desc: stripHtml(form.description) || 'HR Document',
                  link: form['document-link'] || resourcesLink
                })).map((form) => (
                  <a key={form.name} href={form.link} target={form.link.startsWith('http') ? '_blank' : undefined} rel={form.link.startsWith('http') ? 'noopener' : undefined} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors group ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-muted/50'}`}>
                    <div className={`w-10 h-10 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg flex items-center justify-center shrink-0`}>
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium truncate group-hover:text-primary ${isDark ? 'text-white' : ''}`}>{form.name}</div>
                      <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>{form.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* HR Contact */}
          <div id="hr-contact">
            <TeamContactCard
              department="HR"
              pageKey="HR"
              title="HR Team"
              fallbackEmail={hrEmail}
              theme={theme}
              accent="purple"
            />
          </div>

          {/* EAP */}
          {(eapPhone || eapPortalUrl) && (
            <Card className={isDark ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-200'}>
              <CardHeader className={isDark ? 'bg-green-900/50 border-b border-green-800' : 'bg-green-100 border-b border-green-200'}>
                <CardTitle className={`text-base ${isDark ? 'text-green-300' : 'text-green-900'}`}>Employee Assistance</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className={`text-sm mb-4 ${isDark ? 'text-green-300' : 'text-green-800'}`}>Free, confidential support for you and your family.</p>
                {eapPhone && (
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm ${isDark ? 'text-green-300' : 'text-green-800'}`}>24/7 Helpline</span>
                    <a href={`tel:${eapPhone.replace(/[^\d+]/g, '')}`} className={`font-bold hover:underline ${isDark ? 'text-green-200' : 'text-green-900'}`}>{eapPhone}</a>
                  </div>
                )}
                {eapPortalUrl && (
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <a href={eapPortalUrl} target="_blank" rel="noopener">Access EAP Portal</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* External Links */}
          {portalLinks.length > 0 && (
            <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
              <CardHeader>
                <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {portalLinks.map((link) => (
                  <a key={link.name} href={link.href} target="_blank" rel="noopener" className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-muted/50'}`}>
                    <div className={`w-10 h-10 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg flex items-center justify-center shrink-0`}>
                      <ExternalLink className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className={`font-medium text-sm ${isDark ? 'text-white' : ''}`}>{link.name}</div>
                      <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>{link.desc}</div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
