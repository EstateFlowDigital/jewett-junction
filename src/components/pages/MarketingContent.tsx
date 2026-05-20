import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Megaphone, Palette, FileText, Image, PenTool, Presentation, ChevronRight, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { TeamContactCard } from './TeamContactCard';

interface MarketingAsset {
  id: string;
  name: string;
  slug?: string;
  'asset-type'?: string;
  description?: string;
  'file-link'?: string;
  'download-link'?: string;
  'preview-image'?: { url: string };
  thumbnail?: { url: string };
  'file-format'?: string;
  'file-size'?: string;
  featured?: boolean;
}

interface MarketingSettings {
  'marketing-email'?: string;
  'social-facebook-url'?: string;
  'social-instagram-url'?: string;
  'social-linkedin-url'?: string;
  'social-youtube-url'?: string;
}

interface MarketingContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  initialItems?: MarketingAsset[];
  settings?: MarketingSettings;
}

export function MarketingContent({ theme = 'modern', initialItems = [], settings = {} }: MarketingContentProps) {
  const isDark = theme === 'dark';
  const marketingEmail = settings['marketing-email'] || 'marketing@jewettconstruction.com';
  const socialLinks = [
    { name: 'Facebook', href: settings['social-facebook-url'], icon: Facebook, hoverText: 'hover:text-[#1877F2]', hoverBorder: 'hover:border-[#1877F2]/50' },
    { name: 'Instagram', href: settings['social-instagram-url'], icon: Instagram, hoverText: 'hover:text-[#E4405F]', hoverBorder: 'hover:border-[#E4405F]/50' },
    { name: 'LinkedIn', href: settings['social-linkedin-url'], icon: Linkedin, hoverText: 'hover:text-[#0A66C2]', hoverBorder: 'hover:border-[#0A66C2]/50' },
    { name: 'YouTube', href: settings['social-youtube-url'], icon: Youtube, hoverText: 'hover:text-[#FF0000]', hoverBorder: 'hover:border-[#FF0000]/50' },
  ].filter((s) => s.href);

  // CMS state - use initialItems if provided (server-side fetched)
  const [assets, setAssets] = React.useState<MarketingAsset[]>(initialItems);
  const [isLoading, setIsLoading] = React.useState(initialItems.length === 0);

  // Only fetch client-side if no initial items provided
  React.useEffect(() => {
    if (initialItems.length > 0) return;

    async function fetchMarketingContent() {
      try {
        const response = await fetch('/jewett-junction/api/cms/marketing?limit=20');
        if (!response.ok) throw new Error('Failed to load content');
        const data = await response.json();
        setAssets(data.items || []);
      } catch (err: any) {
        console.error('Error fetching Marketing content:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMarketingContent();
  }, [initialItems.length]);

  // Filter assets by type
  const recentAssets = assets.slice(0, 4);
  const brandAssets = assets.filter(a => a['asset-type'] === 'Brand Asset');
  const templates = assets.filter(a => a['asset-type'] === 'Template');
  const photos = assets.filter(a => a['asset-type'] === 'Photo');

  // Helper to strip HTML
  const stripHtml = (html?: string) => html?.replace(/<[^>]*>/g, '').trim() || '';

  // Resolve the "Brand Guidelines" hero link dynamically — the previous hardcoded
  // /marketing/brand-guidelines slug had no matching CMS item, so the [slug]
  // page redirected back to /marketing and the click appeared to do nothing.
  const findAssetLink = (keywords: string[]): string => {
    const needle = (s?: string) => (s || '').toLowerCase();
    const match = assets.find((a) => {
      const haystack = `${needle(a.name)} ${needle(a.slug)} ${needle(a['asset-type'])}`;
      return keywords.some((k) => haystack.includes(k.toLowerCase()));
    });
    return match ? `/jewett-junction/marketing/${match.slug || match.id}` : '/jewett-junction/marketing/brand-assets';
  };
  const brandGuidelinesLink = findAssetLink(['brand guideline', 'brand guide', 'guidelines', 'brand standard']);

  const resources = [
    { name: 'Brand Assets', desc: 'Logos, colors, typography', icon: Palette, href: `/jewett-junction/marketing/brand-assets`, color: 'blue' },
    { name: 'Letterhead & Forms', desc: 'Official documents', icon: FileText, href: `/jewett-junction/marketing/letterhead`, color: 'green' },
    { name: 'Presentations', desc: 'Templates and decks', icon: Presentation, href: `/jewett-junction/marketing/presentations`, color: 'purple' },
    { name: 'Signage Request', desc: 'Order job site signs', icon: PenTool, href: `/jewett-junction/marketing/signage`, color: 'orange' },
    { name: 'Photo Library', desc: 'Project and team photos', icon: Image, href: `/jewett-junction/marketing/photos`, color: 'pink' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
          <Megaphone className="h-7 w-7 text-rose-600" />
          Marketing Hub
        </h1>
        <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
          Brand assets, templates, and marketing resources
        </p>
      </div>

      {/* Brand Banner */}
      <Card className="bg-gradient-to-r from-rose-600 to-pink-600 text-white border-0">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Jewett Construction Brand Guidelines</h2>
              <p className="text-rose-100">Ensure brand consistency across all materials</p>
            </div>
            <a href={brandGuidelinesLink}>
              <Button className="bg-white text-rose-700 hover:bg-rose-50">
                View Brand Guide
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Follow Us — social links */}
      {socialLinks.length > 0 && (
        <Card className={isDark ? 'bg-slate-800/50 border-slate-700' : ''}>
          <CardContent className="py-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>Follow Jewett Construction</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                  Connect with us on social and help amplify our story
                </p>
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Jewett Construction on ${s.name}`}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all ${
                      isDark
                        ? `bg-slate-900/60 border-slate-700 text-slate-300 ${s.hoverText} ${s.hoverBorder}`
                        : `bg-white border-slate-200 text-slate-600 ${s.hoverText} ${s.hoverBorder} hover:shadow-sm`
                    }`}
                  >
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <a key={resource.name} href={resource.href}>
            <Card className={`h-full transition-all hover:shadow-lg cursor-pointer ${isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'hover:border-slate-300'}`}>
              <CardContent className="pt-6">
                <div className={`w-12 h-12 ${isDark ? `bg-${resource.color}-900` : `bg-${resource.color}-100`} rounded-xl mb-4 flex items-center justify-center`}>
                  <resource.icon className={`h-6 w-6 text-${resource.color}-600`} />
                </div>
                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : ''}`}>{resource.name}</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{resource.desc}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Recent Updates */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : ''}>Recent Updates</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : ''}>Latest additions to the marketing library</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`flex items-center justify-between p-4 rounded-lg border ${isDark ? 'border-slate-600 bg-slate-700/50' : 'bg-muted/30'}`}>
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-48" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-5 w-5 rounded" />
                    </div>
                  ))}
                </div>
              ) : recentAssets.length > 0 ? (
                recentAssets.map((asset) => (
                  <a key={asset.id} href={`/jewett-junction/marketing/${asset.slug || asset.id}`} className={`flex items-center justify-between p-4 rounded-lg border ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-muted/50'} transition-colors cursor-pointer`}>
                    <div className="flex items-center gap-3">
                      {(asset['preview-image']?.url || asset.thumbnail?.url) ? (
                        <img src={asset['preview-image']?.url || asset.thumbnail?.url} alt={asset.name} className="w-12 h-12 rounded-lg object-cover shrink-0" loading="lazy" />
                      ) : (
                        <div className={`w-12 h-12 ${isDark ? 'bg-rose-900' : 'bg-rose-100'} rounded-lg flex items-center justify-center shrink-0`}>
                          <FileText className="h-6 w-6 text-rose-600" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className={`font-medium truncate ${isDark ? 'text-white' : ''}`}>{asset.name}</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{asset['asset-type'] || 'Asset'}</div>
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 shrink-0 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`} />
                  </a>
                ))
              ) : (
                /* Empty state when no assets */
                <div className={`text-center py-6 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                  <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>No marketing assets available.</p>
                  <a href="/jewett-junction/admin" className="text-rose-600 hover:underline text-sm mt-1 inline-block">
                    Add content in the admin panel
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <TeamContactCard
            department="Marketing"
            title="Marketing Contact"
            fallbackEmail={marketingEmail}
            theme={theme}
            accent="rose"
          />

          <Card className={isDark ? 'bg-rose-900/30 border-rose-800' : 'bg-rose-50 border-rose-200'}>
            <CardContent className="pt-6 text-center">
              <PenTool className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>Custom Request?</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>Need something custom designed?</p>
              <a href="/jewett-junction/submit-idea" className="w-full">
                <Button className="w-full bg-rose-600 hover:bg-rose-700">Submit Request</Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
