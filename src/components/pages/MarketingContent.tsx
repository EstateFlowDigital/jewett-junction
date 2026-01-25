import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Megaphone, Palette, FileText, Image, PenTool, Presentation, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

interface MarketingContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
}

interface MarketingAsset {
  id: string;
  name: string;
  'asset-type'?: string;
  description?: string;
  'file-link'?: string;
  'preview-image'?: { url: string };
  featured?: boolean;
}

export function MarketingContent({ theme = 'modern' }: MarketingContentProps) {
  const isDark = theme === 'dark';

  // CMS state
  const [assets, setAssets] = React.useState<MarketingAsset[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch Marketing content from CMS
  React.useEffect(() => {
    async function fetchMarketingContent() {
      try {
        const response = await fetch('/api/cms/marketing?limit=20');
        if (!response.ok) throw new Error('Failed to load content');
        const data = await response.json();
        setAssets(data.items || []);
      } catch (err: any) {
        console.error('Error fetching Marketing content:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMarketingContent();
  }, []);

  // Filter assets by type
  const recentAssets = assets.slice(0, 4);
  const brandAssets = assets.filter(a => a['asset-type'] === 'Brand Asset');
  const templates = assets.filter(a => a['asset-type'] === 'Template');
  const photos = assets.filter(a => a['asset-type'] === 'Photo');

  // Helper to strip HTML
  const stripHtml = (html?: string) => html?.replace(/<[^>]*>/g, '').trim() || '';

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
            <Button className="bg-white text-rose-700 hover:bg-rose-50">
              Download Brand Guide
            </Button>
          </div>
        </CardContent>
      </Card>

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
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-rose-600" />
                </div>
              ) : (
                (recentAssets.length > 0 ? recentAssets.map((asset) => ({
                  name: asset.name,
                  date: asset['asset-type'] || 'Asset',
                  link: asset['file-link']
                })) : [
                  { name: 'Q4 2025 Presentation Template', date: 'Jan 12, 2026', link: undefined },
                  { name: 'Updated Logo Files (SVG)', date: 'Jan 10, 2026', link: undefined },
                  { name: 'New Project Photo Set - Downtown Tower', date: 'Jan 8, 2026', link: undefined },
                  { name: 'Safety Signage Templates', date: 'Jan 5, 2026', link: undefined },
                ]).map((item) => (
                  <a key={item.name} href={item.link || '#'} target={item.link ? '_blank' : undefined} rel={item.link ? 'noopener' : undefined} className={`flex items-center justify-between p-4 rounded-lg border ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-muted/50'} transition-colors cursor-pointer`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${isDark ? 'bg-rose-900' : 'bg-rose-100'} rounded-lg flex items-center justify-center`}>
                        <FileText className="h-5 w-5 text-rose-600" />
                      </div>
                      <div>
                        <div className={`font-medium ${isDark ? 'text-white' : ''}`}>{item.name}</div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{item.date}</div>
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`} />
                  </a>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>Marketing Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-rose-600">LW</span>
                </div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>Lisa Wang</h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Marketing Director</p>
                <Button className="w-full" variant="outline">Contact Marketing</Button>
              </div>
            </CardContent>
          </Card>

          <Card className={isDark ? 'bg-rose-900/30 border-rose-800' : 'bg-rose-50 border-rose-200'}>
            <CardContent className="pt-6 text-center">
              <PenTool className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>Custom Request?</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>Need something custom designed?</p>
              <Button className="w-full bg-rose-600 hover:bg-rose-700">Submit Request</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
