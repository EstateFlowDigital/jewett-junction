import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  FolderOpen,
  FileText,
  Download,
  Search,
  Shield,
  Users,
  Building,
  Wrench,
  ChevronRight,
  ExternalLink,
  BookOpen,
  FileSpreadsheet,
  FileImage,
  Video,
  Link,
  Star,
  Clock,
  Eye,
  Bookmark,
  Plus,
  Filter,
  Grid,
  List,
  HelpCircle,
  FolderPlus
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface CMSResource {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  category?: string;
  file?: { url: string };
  'external-link'?: string;
  icon?: string;
  'file-type'?: string;
  'file-size'?: string;
  'last-updated'?: string;
  featured?: boolean;
  'view-count'?: number;
}

interface ResourcesContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  resources?: CMSResource[];
}

const categoryConfig: Record<string, { icon: any; color: string; gradient: string; label: string }> = {
  'safety': { icon: Shield, color: 'orange', gradient: 'from-orange-500 to-red-500', label: 'Safety Documents' },
  'safety documents': { icon: Shield, color: 'orange', gradient: 'from-orange-500 to-red-500', label: 'Safety Documents' },
  'hr': { icon: Users, color: 'purple', gradient: 'from-purple-500 to-violet-500', label: 'HR Forms' },
  'hr forms': { icon: Users, color: 'purple', gradient: 'from-purple-500 to-violet-500', label: 'HR Forms' },
  'human resources': { icon: Users, color: 'purple', gradient: 'from-purple-500 to-violet-500', label: 'HR Forms' },
  'project': { icon: Building, color: 'blue', gradient: 'from-blue-500 to-cyan-500', label: 'Project Templates' },
  'project templates': { icon: Building, color: 'blue', gradient: 'from-blue-500 to-cyan-500', label: 'Project Templates' },
  'it': { icon: Wrench, color: 'cyan', gradient: 'from-cyan-500 to-teal-500', label: 'IT Guides' },
  'it guides': { icon: Wrench, color: 'cyan', gradient: 'from-cyan-500 to-teal-500', label: 'IT Guides' },
  'marketing': { icon: FileImage, color: 'pink', gradient: 'from-pink-500 to-rose-500', label: 'Marketing Assets' },
  'training': { icon: BookOpen, color: 'emerald', gradient: 'from-emerald-500 to-green-500', label: 'Training Materials' },
  'policies': { icon: FileText, color: 'slate', gradient: 'from-slate-500 to-slate-600', label: 'Company Policies' },
  'default': { icon: FolderOpen, color: 'amber', gradient: 'from-amber-500 to-orange-500', label: 'Documents' },
};

function getCategoryConfig(category: string | undefined) {
  if (!category) return categoryConfig['default'];
  const normalized = category.toLowerCase();
  return categoryConfig[normalized] || categoryConfig['default'];
}

function getFileIcon(fileType: string | undefined, url: string | undefined) {
  const type = fileType?.toLowerCase() || url?.split('.').pop()?.toLowerCase() || '';
  if (['pdf'].includes(type)) return FileText;
  if (['xls', 'xlsx', 'csv'].includes(type)) return FileSpreadsheet;
  if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(type)) return FileImage;
  if (['mp4', 'webm', 'mov'].includes(type)) return Video;
  if (url?.startsWith('http')) return Link;
  return FileText;
}

// Sample resources when CMS is not connected
const sampleResources: CMSResource[] = [
  { id: '1', name: 'Safety Manual 2026', description: 'Complete company safety guidelines and procedures', category: 'Safety', 'file-type': 'PDF', 'file-size': '2.4 MB', 'last-updated': '2026-01-10', featured: true, 'view-count': 245 },
  { id: '2', name: 'Employee Handbook', description: 'Policies, benefits, and company culture guide', category: 'HR', 'file-type': 'PDF', 'file-size': '1.8 MB', 'last-updated': '2026-01-08', featured: true, 'view-count': 189 },
  { id: '3', name: 'Project Budget Template', description: 'Standard budget tracking spreadsheet for all projects', category: 'Project', 'file-type': 'Excel', 'file-size': '156 KB', 'last-updated': '2026-01-05', 'view-count': 134 },
  { id: '4', name: 'Brand Guidelines', description: 'Logo usage, colors, fonts, and visual standards', category: 'Marketing', 'file-type': 'PDF', 'file-size': '5.2 MB', 'last-updated': '2026-01-03', featured: true, 'view-count': 98 },
  { id: '5', name: 'IT Security Policy', description: 'Data protection and cybersecurity guidelines', category: 'IT', 'file-type': 'PDF', 'file-size': '890 KB', 'last-updated': '2026-01-02', 'view-count': 156 },
  { id: '6', name: 'PTO Request Form', description: 'Time off request submission form', category: 'HR', 'file-type': 'PDF', 'file-size': '45 KB', 'last-updated': '2025-12-20', 'view-count': 312 },
  { id: '7', name: 'OSHA Training Checklist', description: 'Required safety training completion tracker', category: 'Safety', 'file-type': 'Excel', 'file-size': '78 KB', 'last-updated': '2025-12-18', 'view-count': 201 },
  { id: '8', name: 'Project Status Report Template', description: 'Weekly status report format for project managers', category: 'Project', 'file-type': 'Word', 'file-size': '112 KB', 'last-updated': '2025-12-15', 'view-count': 167 },
  { id: '9', name: 'Expense Report Form', description: 'Business expense reimbursement submission', category: 'HR', 'file-type': 'PDF', 'file-size': '52 KB', 'last-updated': '2025-12-12', 'view-count': 278 },
  { id: '10', name: 'VPN Setup Guide', description: 'Step-by-step remote access configuration', category: 'IT', 'file-type': 'PDF', 'file-size': '1.1 MB', 'last-updated': '2025-12-10', 'view-count': 145 },
];

export function ResourcesContent({ theme = 'dark', resources: cmsResources = [] }: ResourcesContentProps) {
  const allResources = cmsResources.length > 0 ? cmsResources : sampleResources;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  // Get unique categories
  const categoryCounts = allResources.reduce((acc, r) => {
    const config = getCategoryConfig(r.category);
    acc[config.label] = (acc[config.label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = ['All', ...Object.keys(categoryCounts)];

  // Get featured resources
  const featuredResources = allResources.filter(r => r.featured);

  // Filter resources
  const filteredResources = allResources.filter(r => {
    const matchesSearch = searchTerm === '' ||
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (r.category?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const config = getCategoryConfig(r.category);
    const matchesCategory = selectedCategory === 'All' || config.label === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort by last updated
  const sortedResources = [...filteredResources].sort((a, b) => {
    const dateA = a['last-updated'] ? new Date(a['last-updated']).getTime() : 0;
    const dateB = b['last-updated'] ? new Date(b['last-updated']).getTime() : 0;
    return dateB - dateA;
  });

  function formatDate(dateStr: string | undefined) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2aDZ2Nmg2di02aC02di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <FolderOpen className="h-3 w-3 mr-1" />
                {allResources.length} Resources
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Resource<br />Library
            </h1>
            <p className="text-lg text-amber-100 mb-6 max-w-xl">
              Access all the documents, templates, and guides you need to get your work done.
              Everything organized and searchable in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-white text-amber-700 hover:bg-amber-50"
                onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Resources
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Plus className="h-4 w-4 mr-2" />
                Request Document
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Total Documents', value: allResources.length, icon: FileText },
              { label: 'Categories', value: Object.keys(categoryCounts).length, icon: FolderOpen },
              { label: 'Featured', value: featuredResources.length, icon: Star },
              { label: 'Recently Updated', value: sortedResources.filter(r => {
                const updated = r['last-updated'] ? new Date(r['last-updated']) : null;
                if (!updated) return false;
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return updated >= weekAgo;
              }).length, icon: Clock },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <stat.icon className="h-5 w-5 text-amber-200 mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-amber-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-orange-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400" />
                Featured Resources
              </h2>
              <p className="text-sm text-slate-400">Most important documents you should know</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredResources.slice(0, 4).map((resource) => {
              const config = getCategoryConfig(resource.category);
              const FileIcon = getFileIcon(resource['file-type'], resource.file?.url || resource['external-link']);
              return (
                <Card
                  key={resource.id}
                  className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all group"
                >
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-4`}>
                      <FileIcon className="h-6 w-6 text-white" />
                    </div>
                    <Badge className={`mb-2 bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/30`}>
                      {config.label}
                    </Badge>
                    <a href={`/jewett-junction/resources/${resource.slug || resource.id}`} className="block">
                      <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors mb-1">
                        {resource.name}
                      </h3>
                    </a>
                    {resource.description && (
                      <p className="text-sm text-slate-400 line-clamp-2 mb-3">{resource.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {resource['file-type'] || 'Link'}{resource['file-size'] ? ` • ${resource['file-size']}` : ''}
                      </span>
                      {(resource.file?.url || resource['external-link']) && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-amber-400 hover:text-amber-300"
                          asChild
                        >
                          <a href={resource.file?.url || resource['external-link']} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(categoryCounts).slice(0, 4).map(([label, count]) => {
          const configKey = Object.keys(categoryConfig).find(k => categoryConfig[k].label === label) || 'default';
          const config = categoryConfig[configKey];
          return (
            <Card
              key={label}
              onClick={() => setSelectedCategory(selectedCategory === label ? 'All' : label)}
              className={`cursor-pointer transition-all ${
                selectedCategory === label
                  ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-500/30'
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} mx-auto mb-3 flex items-center justify-center`}>
                  <config.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">{label}</h3>
                <p className="text-sm text-slate-400">{count} documents</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card id="resources" className="bg-slate-800/50 border-slate-700 scroll-mt-8">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search documents by name, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 5).map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {cat}
                    {cat !== 'All' && (
                      <span className={`text-xs ml-1 ${isActive ? 'text-amber-200' : 'text-slate-500'}`}>
                        ({categoryCounts[cat] || 0})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-slate-900/50 rounded-lg p-1 border border-slate-600">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing <span className="text-white font-medium">{sortedResources.length}</span> of{' '}
          <span className="text-white font-medium">{allResources.length}</span> resources
        </p>
      </div>

      {/* Resources Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedResources.map((resource) => {
            const config = getCategoryConfig(resource.category);
            const FileIcon = getFileIcon(resource['file-type'], resource.file?.url || resource['external-link']);
            return (
              <Card
                key={resource.id}
                className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all group"
              >
                <CardContent className="p-0">
                  {/* Header */}
                  <div className={`h-2 bg-gradient-to-r ${config.gradient}`}></div>

                  <div className="p-4">
                    <div className="flex items-start gap-4 mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-${config.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                        <FileIcon className={`h-6 w-6 text-${config.color}-400`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <a href={`/jewett-junction/resources/${resource.slug || resource.id}`} className="block">
                            <h3 className="font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
                              {resource.name}
                            </h3>
                          </a>
                          {resource.featured && <Star className="h-3 w-3 text-amber-400 flex-shrink-0" />}
                        </div>
                        <Badge className={`bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/30 text-xs`}>
                          {config.label}
                        </Badge>
                      </div>
                    </div>

                    {resource.description && (
                      <p className="text-sm text-slate-400 line-clamp-2 mb-4">{resource.description}</p>
                    )}

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span>{resource['file-type'] || 'Link'}{resource['file-size'] ? ` • ${resource['file-size']}` : ''}</span>
                      {resource['last-updated'] && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(resource['last-updated'])}
                        </span>
                      )}
                    </div>

                    {(resource.file?.url || resource['external-link']) && (
                      <Button
                        className="w-full bg-amber-600 hover:bg-amber-700"
                        size="sm"
                        asChild
                      >
                        <a href={resource.file?.url || resource['external-link']} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-2">
          {sortedResources.map((resource) => {
            const config = getCategoryConfig(resource.category);
            const FileIcon = getFileIcon(resource['file-type'], resource.file?.url || resource['external-link']);
            return (
              <Card
                key={resource.id}
                className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition-all group"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0`}>
                      <FileIcon className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-center">
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2">
                          <a href={`/jewett-junction/resources/${resource.slug || resource.id}`} className="block">
                            <h3 className="font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
                              {resource.name}
                            </h3>
                          </a>
                          {resource.featured && <Star className="h-3 w-3 text-amber-400 flex-shrink-0" />}
                        </div>
                        {resource.description && (
                          <p className="text-sm text-slate-400 truncate">{resource.description}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={`bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/30`}>
                          {config.label}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="text-sm text-slate-500">
                          {resource['file-type'] || 'Link'}{resource['file-size'] ? ` • ${resource['file-size']}` : ''}
                        </div>
                        {(resource.file?.url || resource['external-link']) && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-amber-400 hover:text-amber-300"
                            asChild
                          >
                            <a href={resource.file?.url || resource['external-link']} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* No Results */}
      {sortedResources.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="py-12 text-center">
            <FolderOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No resources found</h3>
            <p className="text-slate-400 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline"
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="border-slate-600 text-slate-300"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Request Document CTA */}
      <Card className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2aDZ2Nmg2di02aC02di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <CardContent className="py-8 px-6 md:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Can't Find What You Need?
                </h2>
                <p className="text-amber-100">
                  Submit a request and we'll help you find or create the document you're looking for.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white text-amber-700 hover:bg-amber-50 flex-shrink-0"
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              Request Document
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
