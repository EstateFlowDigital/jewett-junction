import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Megaphone, Palette, FileText, Image, PenTool, Presentation, ChevronRight, Facebook, Instagram, Linkedin, Youtube, ShoppingBag, Camera } from 'lucide-react';
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
  file?: { url: string };
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
  'marketing-apparel-store-url'?: string;
}

interface MarketingPageCopy {
  'hero-headline'?: string;
  'hero-subtitle'?: string;
  /** Brand Banner title + body (content-block-1). */
  'content-block-1-title'?: string;
  'content-block-1-body'?: string;
}

interface MarketingContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  initialItems?: MarketingAsset[];
  settings?: MarketingSettings;
  pageCopy?: MarketingPageCopy | null;
}

export function MarketingContent({ theme = 'modern', initialItems = [], settings = {}, pageCopy = null }: MarketingContentProps) {
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

  // Strict variant of findAssetLink — returns '' instead of the brand-assets
  // fallback so callers can tell "no such asset" from "found it".
  const findAssetLinkOrEmpty = (keywords: string[]): string => {
    const match = assets.find((a) => {
      const haystack = `${a.name || ''} ${a.slug || ''}`.toLowerCase();
      return keywords.some((k) => haystack.includes(k.toLowerCase()));
    });
    return match ? `/jewett-junction/marketing/${match.slug || match.id}` : '';
  };
  const apparelGuideLink = findAssetLinkOrEmpty(['apparel']);

  const apparelStoreUrl = settings['marketing-apparel-store-url'] || '';
  const resources = [
    { name: 'Brand Assets', desc: 'Logos, colors, typography', icon: Palette, href: `/jewett-junction/marketing/brand-assets`, color: 'blue', external: false },
    { name: 'Letterhead & Forms', desc: 'Official documents', icon: FileText, href: `/jewett-junction/marketing/letterhead`, color: 'green', external: false },
    { name: 'Presentations', desc: 'Templates and decks', icon: Presentation, href: `/jewett-junction/marketing/presentations`, color: 'purple', external: false },
    { name: 'Signage Request', desc: 'Order job site signs', icon: PenTool, href: `/jewett-junction/marketing/signage`, color: 'orange', external: false },
    { name: 'Submit a Job Site Photo', desc: 'Share photos from the field', icon: Camera, href: `/jewett-junction/marketing/submit-photo`, color: 'pink', external: false },
    { name: 'Marketing Request', desc: 'Collateral, print, and more', icon: Megaphone, href: `/jewett-junction/marketing/request`, color: 'rose', external: false },
    // Apparel — one box that has to reach BOTH the apparel guide and the
    // outside store. Prefer the internal guide page, which renders the guide
    // itself plus a "Shop the Apparel Store" button; linking straight to the
    // store would leave the guide unreachable from this box. Falls back to the
    // store URL if the guide asset isn't in the CMS.
    ...(apparelGuideLink || apparelStoreUrl
      ? [{
          name: 'Apparel',
          desc: 'Apparel guide and store',
          icon: ShoppingBag,
          href: apparelGuideLink || apparelStoreUrl,
          color: 'amber',
          external: !apparelGuideLink && apparelStoreUrl.startsWith('http'),
        }]
      : []),
  ];

  const heroHeadline = pageCopy?.['hero-headline'] || '';
  const heroSubtitle = pageCopy?.['hero-subtitle'] || '';
  const brandBannerTitle = pageCopy?.['content-block-1-title'] || '';
  const brandBannerBody = (pageCopy?.['content-block-1-body'] || '').replace(/<[^>]*>/g, '').trim();

  return (
    <div className="space-y-6">
      <div>
        {heroHeadline && (
          <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
            <Megaphone className="h-7 w-7 text-rose-600" />
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

      {/* Brand Banner — hidden when CMS title is blank */}
      {brandBannerTitle && (
        <Card className="bg-gradient-to-r from-rose-600 to-pink-600 text-white border-0">
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">{brandBannerTitle}</h2>
                {brandBannerBody && <p className="text-rose-100">{brandBannerBody}</p>}
              </div>
              <a href={brandGuidelinesLink}>
                <Button className="bg-white text-rose-700 hover:bg-rose-50">
                  View Brand Guide
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      )}

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
          <a
            key={resource.name}
            href={resource.href}
            target={resource.external ? '_blank' : undefined}
            rel={resource.external ? 'noopener noreferrer' : undefined}
          >
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
                recentAssets.map((asset) => {
                  // Prefer preview / thumbnail; fall back to the primary file URL
                  // when it's an image extension so logo records render properly.
                  const fileUrl: string | undefined = asset.file?.url || asset['download-link'];
                  const thumb =
                    asset['preview-image']?.url ||
                    asset.thumbnail?.url ||
                    (fileUrl && /\.(jpe?g|png|svg|webp|gif)(?:\?|$)/i.test(fileUrl) ? fileUrl : null);
                  return (
                  <a key={asset.id} href={`/jewett-junction/marketing/${asset.slug || asset.id}`} className={`flex items-center justify-between p-4 rounded-lg border ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-muted/50'} transition-colors cursor-pointer`}>
                    <div className="flex items-center gap-3">
                      {thumb ? (
                        <img src={thumb} alt={asset.name} className="w-12 h-12 rounded-lg object-contain p-1 shrink-0 bg-white" loading="lazy" />
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
                  );
                })
              ) : (
                /* Empty state when no assets */
                <div className={`text-center py-6 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                  <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>No marketing assets available yet — check back soon.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <TeamContactCard
            department="Marketing"
            pageKey="Marketing"
            title="Marketing Contact"
            fallbackEmail={marketingEmail}
            theme={theme}
            accent="rose"
          />
        </div>
      </div>
    </div>
  );
}
