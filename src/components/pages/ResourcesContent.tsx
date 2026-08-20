import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { FilterBar, buildFilterOptions } from '../shared/FilterBar';
import {
  FolderOpen,
  FileText,
  Download,
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
  Filter,
  Grid,
  List
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

interface ResourcesPageCopy {
  'hero-headline'?: string;
  'hero-subtitle'?: string;
}

interface ResourcesContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  resources?: CMSResource[];
  pageCopy?: ResourcesPageCopy | null;
  uiStrings?: Record<string, string>;
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

function stripHtml(html: string | undefined) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export function ResourcesContent({ theme = 'dark', resources: cmsResources = [], pageCopy = null, uiStrings = {} }: ResourcesContentProps) {
  const ui = (key: string, fallback: string) => uiStrings[key] || fallback;
  // Hero copy is CMS-editable via the Page Copy collection (slug: 'resources').
  // Headline can include a literal "\n" or "<br>" — the renderer splits on either.
  const heroHeadlineRaw = pageCopy?.['hero-headline']?.trim() || '';
  const heroSubtitleRaw = pageCopy?.['hero-subtitle']?.trim() || '';
  const heroHeadlineLines = heroHeadlineRaw.split(/\\n|<br\s*\/?>/i);
  const heroSubtitleIsHtml = /^\s*<\w/.test(heroSubtitleRaw);
  // Use CMS resources directly - no hardcoded fallback
  const allResources = cmsResources;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  // Get unique categories
  const categoryCounts = allResources.reduce((acc, r) => {
    const config = getCategoryConfig(r.category);
    acc[config.label] = (acc[config.label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filterOptions = React.useMemo(
    () => buildFilterOptions(categoryCounts, allResources.length),
    // categoryCounts is rebuilt each render; its content only changes with the list.
    [allResources],
  );
  const categories = React.useMemo(() => filterOptions.map((o) => o.value), [filterOptions]);

  // Honour ?category=X so section pages can deep-link to a filtered view
  // (e.g. the Safety hub's "Safety Resources" tile → only safety documents).
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const requested = new URLSearchParams(window.location.search).get('category');
    if (!requested) return;
    const norm = requested.toLowerCase();
    // The filter compares display labels ("Safety Documents"), but callers link
    // with the raw CMS category ("?category=Safety"). Matching only on the label
    // meant the Safety hub's deep link silently showed everything, so fall back
    // to resolving the raw value through the same config the chips use.
    const match =
      categories.find((c) => c.toLowerCase() === norm) ||
      (categoryConfig[norm] && categories.includes(categoryConfig[norm].label)
        ? categoryConfig[norm].label
        : undefined);
    if (match) setSelectedCategory(match);
  }, [categories.length]);

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
    // Handle invalid dates
    if (isNaN(date.getTime())) return '';
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
            {heroHeadlineRaw && (
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {heroHeadlineLines.map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < heroHeadlineLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
            )}
            {heroSubtitleRaw && (
              heroSubtitleIsHtml ? (
                <div className="text-lg text-amber-100 mb-6 max-w-xl [&>p]:m-0" dangerouslySetInnerHTML={{ __html: heroSubtitleRaw }} />
              ) : (
                <p className="text-lg text-amber-100 mb-6 max-w-xl">{heroSubtitleRaw}</p>
              )
            )}
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-white text-amber-700 hover:bg-amber-50"
                onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Resources
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: allResources.length === 1 ? 'Total Document' : 'Total Documents', value: allResources.length, icon: FileText },
              { label: Object.keys(categoryCounts).length === 1 ? 'Category' : 'Categories', value: Object.keys(categoryCounts).length, icon: FolderOpen },
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
                    <div className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-4`}>
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
                      <p className="text-sm text-slate-400 mb-3">{stripHtml(resource.description)}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {resource['file-type'] || 'Link'}{resource['file-size'] ? ` • ${resource['file-size']}` : ''}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-amber-400 hover:text-amber-300"
                        asChild
                      >
                        <a href={`/jewett-junction/resources/${resource.slug || resource.id}`}>
                          <ChevronRight className="h-4 w-4" />
                        </a>
                      </Button>
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
                <div className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${config.gradient} mx-auto mb-3 flex items-center justify-center`}>
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
      <FilterBar
        id="resources"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder={ui('resources-search-placeholder', 'Search documents by name, description, or category...')}
        options={filterOptions}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        filterLabel="Filter by category"
        accent="amber"
        resultCount={sortedResources.length}
        totalCount={allResources.length}
        noun="resources"
      >
        <div className="shrink-0 flex items-center gap-1 bg-slate-900/50 rounded-lg p-1 border border-slate-600">
          <button
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
            aria-pressed={viewMode === 'grid'}
            className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
              viewMode === 'grid' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
            className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
              viewMode === 'list' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </FilterBar>


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
                          {/* min-w-0 lets the truncate on the heading actually take effect. As a
                              flex item this link defaulted to min-width:auto, so long document
                              names ("Credit Card & Check Payment Request Form") stretched the row
                              wider than a phone screen and scrolled the whole page sideways. */}
                          <a href={`/jewett-junction/resources/${resource.slug || resource.id}`} className="block min-w-0">
                            <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
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
                      <p className="text-sm text-slate-400 mb-4">{stripHtml(resource.description)}</p>
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

                    <Button
                      className="w-full bg-amber-600 hover:bg-amber-700"
                      size="sm"
                      asChild
                    >
                      <a href={`/jewett-junction/resources/${resource.slug || resource.id}`}>
                        View Details
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
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
                          {/* min-w-0 lets the truncate on the heading actually take effect. As a
                              flex item this link defaulted to min-width:auto, so long document
                              names ("Credit Card & Check Payment Request Form") stretched the row
                              wider than a phone screen and scrolled the whole page sideways. */}
                          <a href={`/jewett-junction/resources/${resource.slug || resource.id}`} className="block min-w-0">
                            <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                              {resource.name}
                            </h3>
                          </a>
                          {resource.featured && <Star className="h-3 w-3 text-amber-400 flex-shrink-0" />}
                        </div>
                        {resource.description && (
                          <p className="text-sm text-slate-400">{stripHtml(resource.description)}</p>
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
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-amber-400 hover:text-amber-300"
                          asChild
                        >
                          <a href={`/jewett-junction/resources/${resource.slug || resource.id}`}>
                            <ChevronRight className="h-4 w-4" />
                          </a>
                        </Button>
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

    </div>
  );
}
