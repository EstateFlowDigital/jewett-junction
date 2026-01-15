import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { FolderOpen, FileText, Download, Search, Filter, Shield, Users, Building, Wrench } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface ResourcesContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
}

export function ResourcesContent({ theme = 'modern' }: ResourcesContentProps) {
  const isDark = theme === 'dark';

  const categories = [
    { name: 'Safety Documents', icon: Shield, count: 24, color: 'green' },
    { name: 'HR Forms', icon: Users, count: 18, color: 'purple' },
    { name: 'Project Templates', icon: Building, count: 32, color: 'blue' },
    { name: 'IT Guides', icon: Wrench, count: 15, color: 'orange' },
  ];

  const recentDocs = [
    { name: 'Safety Manual 2026', type: 'PDF', size: '2.4 MB', date: 'Jan 10, 2026' },
    { name: 'Employee Handbook', type: 'PDF', size: '1.8 MB', date: 'Jan 8, 2026' },
    { name: 'Project Budget Template', type: 'Excel', size: '156 KB', date: 'Jan 5, 2026' },
    { name: 'Brand Guidelines', type: 'PDF', size: '5.2 MB', date: 'Jan 3, 2026' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
          <FolderOpen className="h-7 w-7 text-amber-600" />
          Resource Library
        </h1>
        <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
          Documents, templates, and guides
        </p>
      </div>

      {/* Search */}
      <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`} />
              <input
                type="text"
                placeholder="Search documents..."
                className={`w-full pl-10 pr-4 py-2 border rounded-md text-sm ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
              />
            </div>
            <Button variant="outline" className={isDark ? 'border-slate-600 text-slate-300' : ''}>
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Card key={cat.name} className={`cursor-pointer transition-all hover:shadow-lg ${isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'hover:border-slate-300'}`}>
            <CardContent className="pt-6 text-center">
              <div className={`w-12 h-12 ${isDark ? `bg-${cat.color}-900` : `bg-${cat.color}-100`} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                <cat.icon className={`h-6 w-6 text-${cat.color}-600`} />
              </div>
              <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>{cat.name}</h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{cat.count} documents</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Recent Documents */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : ''}>Recently Updated</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : ''}>Latest documents and resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentDocs.map((doc) => (
                <div key={doc.name} className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-muted/50'}`}>
                  <div className={`w-10 h-10 ${isDark ? 'bg-amber-900' : 'bg-amber-100'} rounded-lg flex items-center justify-center`}>
                    <FileText className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium truncate ${isDark ? 'text-white' : ''}`}>{doc.name}</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                      {doc.type} • {doc.size} • {doc.date}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className={isDark ? 'text-slate-400 hover:text-white' : ''}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-muted/50'}`}>
                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Total Documents</div>
                <div className={`text-2xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>89</div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-muted/50'}`}>
                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Categories</div>
                <div className={`text-2xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>12</div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-muted/50'}`}>
                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Updated This Month</div>
                <div className={`text-2xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>8</div>
              </div>
            </CardContent>
          </Card>

          <Card className={isDark ? 'bg-amber-900/30 border-amber-800' : 'bg-amber-50 border-amber-200'}>
            <CardContent className="pt-6 text-center">
              <FileText className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>Need a Document?</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>Can't find what you're looking for?</p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">Request Document</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
