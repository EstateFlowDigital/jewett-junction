import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, Clock, Heart, DollarSign, Calendar, FileText, Shield, Phone, Mail, ExternalLink, ChevronRight, BookOpen, CreditCard, Globe, AlertCircle } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { TeamContactCard } from './TeamContactCard';

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

interface HRContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  initialItems?: HRItem[];
  settings?: SiteSettingsLite;
}

export function HRContent({ theme = 'modern', initialItems = [], settings = {} }: HRContentProps) {
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
  const benefits = hrItems.filter(item => item['content-type'] === 'Benefit');
  const forms = hrItems.filter(item => item['content-type'] === 'Form');
  const featuredItem = announcements[0] || hrItems.find(item => item.featured);

  // If no items have content-type set, use all items as fallback for display
  const hasContentTypes = announcements.length > 0 || policies.length > 0 || benefits.length > 0 || forms.length > 0;
  const displayItems = hasContentTypes ? [] : hrItems;

  // Helper to strip HTML
  const stripHtml = (html?: string) => html?.replace(/<[^>]*>/g, '').trim() || '';

  // The four quick-action cards (Pay, Time Off, Benefits, Help) used to link to
  // hardcoded slugs like '/hr/pay-tax-info' that don't exist in the CMS, so the
  // [slug] page redirected back to /hr — making the cards appear unclickable.
  // Find the first HR item whose name OR slug contains any of the keywords.
  // Falls back to the HR listing so the click always goes somewhere visible.
  const findHRLink = (keywords: string[]): string => {
    const needle = (s?: string) => (s || '').toLowerCase();
    const match = hrItems.find((item) => {
      const haystack = `${needle(item.name)} ${needle(item.slug)} ${needle(item['content-type'])}`;
      return keywords.some((k) => haystack.includes(k.toLowerCase()));
    });
    return match ? `/jewett-junction/hr/${match.slug || match.id}` : '/jewett-junction/hr';
  };
  const payLink = findHRLink(['pay', 'tax', 'salary', 'payroll']);
  const timeOffLink = findHRLink(['time off', 'pto', 'vacation', 'holiday', 'leave']);
  const benefitsLink = findHRLink(['benefit', 'health', 'insurance', '401k']);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
            <Users className="h-7 w-7 text-purple-600" />
            HR Resources
          </h1>
          <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
            Benefits, policies, forms, and employee support
          </p>
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
                  {featuredItem.icon?.url ? (
                    <img src={featuredItem.icon.url} alt={featuredItem.name} className="w-14 h-14 rounded-xl object-cover shrink-0" loading="lazy" />
                  ) : (
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <AlertCircle className="h-7 w-7" />
                    </div>
                  )}
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
                  {displayItems[0].icon?.url ? (
                    <img src={displayItems[0].icon.url} alt={displayItems[0].name} className="w-14 h-14 rounded-xl object-cover shrink-0" loading="lazy" />
                  ) : (
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Users className="h-7 w-7" />
                    </div>
                  )}
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
            <p className={isDark ? 'text-slate-400' : 'text-muted-foreground'}>No HR announcements at this time.</p>
            <a href="/jewett-junction/admin" className="text-purple-600 hover:underline text-sm mt-2 inline-block">
              Add content in the admin panel
            </a>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href={payLink}>
          <Card className={`hover:shadow-lg transition-all cursor-pointer h-full ${isDark ? 'bg-slate-800 border-blue-800 hover:border-blue-600' : 'border-blue-200 bg-blue-50/50 hover:border-blue-400'}`}>
            <CardContent className="py-4 text-center">
              <div className={`w-12 h-12 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-900'}`}>Pay & Tax Info</div>
              <div className={`text-sm ${isDark ? 'text-blue-500' : 'text-blue-700'}`}>View details</div>
            </CardContent>
          </Card>
        </a>
        <a href={timeOffLink}>
          <Card className={`hover:shadow-lg transition-all cursor-pointer h-full ${isDark ? 'bg-slate-800 border-green-800 hover:border-green-600' : 'border-green-200 bg-green-50/50 hover:border-green-400'}`}>
            <CardContent className="py-4 text-center">
              <div className={`w-12 h-12 ${isDark ? 'bg-green-900' : 'bg-green-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-900'}`}>Time Off</div>
              <div className={`text-sm ${isDark ? 'text-green-500' : 'text-green-700'}`}>Request PTO</div>
            </CardContent>
          </Card>
        </a>
        <a href={benefitsLink}>
          <Card className={`hover:shadow-lg transition-all cursor-pointer h-full ${isDark ? 'bg-slate-800 border-purple-800 hover:border-purple-600' : 'border-purple-200 bg-purple-50/50 hover:border-purple-400'}`}>
            <CardContent className="py-4 text-center">
              <div className={`w-12 h-12 ${isDark ? 'bg-purple-900' : 'bg-purple-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div className={`font-semibold ${isDark ? 'text-purple-400' : 'text-purple-900'}`}>Benefits</div>
              <div className={`text-sm ${isDark ? 'text-purple-500' : 'text-purple-700'}`}>Health & wellness</div>
            </CardContent>
          </Card>
        </a>
        <a href={eapPhone ? `tel:${eapPhone.replace(/[^\d+]/g, '')}` : '#hr-contact'}>
          <Card className={`hover:shadow-lg transition-all cursor-pointer h-full ${isDark ? 'bg-slate-800 border-orange-800 hover:border-orange-600' : 'border-orange-200 bg-orange-50/50 hover:border-orange-400'}`}>
            <CardContent className="py-4 text-center">
              <div className={`w-12 h-12 ${isDark ? 'bg-orange-900' : 'bg-orange-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                <Phone className="h-6 w-6 text-orange-600" />
              </div>
              <div className={`font-semibold ${isDark ? 'text-orange-400' : 'text-orange-900'}`}>Get Help</div>
              <div className={`text-sm ${isDark ? 'text-orange-500' : 'text-orange-700'}`}>EAP & support</div>
            </CardContent>
          </Card>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Benefits Overview */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : ''}>Benefits Overview</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : ''}>Your comprehensive benefits package</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Show benefits from CMS, or display items without content-type, or empty state */}
                {(benefits.length > 0 ? benefits.slice(0, 2) : displayItems.slice(0, 2)).map((benefit, i) => ({
                  name: benefit.name,
                  desc: stripHtml(benefit.description || getContent(benefit))?.substring(0, 100),
                  icon: i === 0 ? Heart : DollarSign,
                  color: i === 0 ? 'red' : 'green'
                })).map((benefit, index) => (
                  <Card key={benefit.name} className={`border ${isDark ? 'bg-slate-700 border-slate-600' : ''}`}>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 ${isDark ? `bg-${benefit.color}-900` : `bg-${benefit.color}-100`} rounded-lg flex items-center justify-center`}>
                          <benefit.icon className={`h-5 w-5 text-${benefit.color}-600`} />
                        </div>
                        <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>{benefit.name}</h3>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{benefit.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* HR Forms */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className={isDark ? 'text-white' : ''}>Forms & Documents</CardTitle>
                <CardDescription className={isDark ? 'text-slate-400' : ''}>Commonly used HR forms</CardDescription>
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
