import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Headphones, Ticket, BookOpen, Monitor, Wifi, Shield, Phone, Mail, Clock, ChevronRight, HelpCircle, Settings, AlertTriangle, Loader2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface ITHelpdeskContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
}

interface ITArticle {
  id: string;
  name: string;
  category?: string;
  description?: string;
  content?: string;
  'article-link'?: string;
  featured?: boolean;
  icon?: { url: string };
}

export function ITHelpdeskContent({ theme = 'modern' }: ITHelpdeskContentProps) {
  const isDark = theme === 'dark';
  const resourcesLink = `/jewett-junction/resources`;

  // CMS state
  const [articles, setArticles] = React.useState<ITArticle[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Fetch IT content from CMS
  React.useEffect(() => {
    async function fetchITContent() {
      try {
        const response = await fetch('/api/cms/it?limit=20');
        if (!response.ok) throw new Error('Failed to load content');
        const data = await response.json();
        setArticles(data.items || []);
      } catch (err: any) {
        console.error('Error fetching IT content:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchITContent();
  }, []);

  // Filter articles by category
  const howToArticles = articles.filter(a => a.category === 'How-To' || a.category === 'Troubleshooting');
  const softwareArticles = articles.filter(a => a.category === 'Software');

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
        <a href="/jewett-junction/submit-idea">
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
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                </div>
              ) : (
                (howToArticles.length > 0 ? howToArticles.slice(0, 4).map((article) => ({
                  title: article.name,
                  desc: stripHtml(article.description)?.substring(0, 60) || 'Quick fix guide',
                  link: article['article-link'] || resourcesLink,
                  icon: getCategoryIcon(article.name),
                  imageUrl: article.icon?.url
                })) : [
                  { title: 'Password Reset', desc: 'Reset your network password', link: resourcesLink, icon: Shield, imageUrl: undefined },
                  { title: 'VPN Connection Issues', desc: 'Troubleshoot remote access', link: resourcesLink, icon: Wifi, imageUrl: undefined },
                  { title: 'Email Setup', desc: 'Configure email on mobile devices', link: resourcesLink, icon: Mail, imageUrl: undefined },
                  { title: 'Printer Problems', desc: 'Fix common printing issues', link: resourcesLink, icon: Monitor, imageUrl: undefined },
                ]).map((item) => (
                  <a key={item.title} href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel={item.link.startsWith('http') ? 'noopener' : undefined} className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-muted/50'}`}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded-lg object-cover" loading="lazy" />
                    ) : (
                      <div className={`w-10 h-10 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg flex items-center justify-center`}>
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className={`font-medium ${isDark ? 'text-white' : ''}`}>{item.title}</div>
                      <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{item.desc}</div>
                    </div>
                    <ChevronRight className={`h-5 w-5 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`} />
                  </a>
                ))
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
              <Button variant="outline" size="sm" className={isDark ? 'border-slate-600 text-slate-300' : ''}>View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className={`p-4 rounded-lg border ${isDark ? 'bg-slate-700 border-slate-600' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${isDark ? 'text-white' : ''}`}>#IT-2024-0142</span>
                    <Badge className="bg-green-100 text-green-700">Resolved</Badge>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Email not syncing on mobile device</p>
                  <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>Resolved Jan 10, 2026</p>
                </div>
                <div className={`p-4 rounded-lg border ${isDark ? 'bg-slate-700 border-slate-600' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${isDark ? 'text-white' : ''}`}>#IT-2024-0138</span>
                    <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Request new monitor for home office</p>
                  <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>Updated Jan 12, 2026</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* IT Contact */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>IT Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a href="tel:555-4357" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-muted/50 hover:bg-muted'}`}>
                <Phone className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`} />
                <div>
                  <div className={`text-sm font-medium ${isDark ? 'text-white' : ''}`}>(555) 4-HELP</div>
                  <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>Call for urgent issues</div>
                </div>
              </a>
              <a href="mailto:it@jewettconstruction.com" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-muted/50 hover:bg-muted'}`}>
                <Mail className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`} />
                <div>
                  <div className={`text-sm font-medium ${isDark ? 'text-white' : ''}`}>it@jewettconstruction.com</div>
                  <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>Non-urgent requests</div>
                </div>
              </a>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className={isDark ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-200'}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-green-300' : 'text-green-900'}`}>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['Email', 'VPN', 'Network', 'Cloud Services'].map((system) => (
                <div key={system} className="flex items-center justify-between">
                  <span className={`text-sm ${isDark ? 'text-green-300' : 'text-green-800'}`}>{system}</span>
                  <Badge className="bg-green-200 text-green-700">Operational</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Hours */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>Support Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={isDark ? 'text-slate-400' : 'text-muted-foreground'}>Mon - Fri</span>
                <span className={`font-medium ${isDark ? 'text-white' : ''}`}>7:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-slate-400' : 'text-muted-foreground'}>Saturday</span>
                <span className={`font-medium ${isDark ? 'text-white' : ''}`}>8:00 AM - 12:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-slate-400' : 'text-muted-foreground'}>Emergency</span>
                <span className={`font-medium ${isDark ? 'text-white' : ''}`}>24/7 On-Call</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
