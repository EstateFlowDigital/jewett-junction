import * as React from 'react';
import {
  Megaphone,
  Calendar,
  Briefcase,
  Heart,
  Users,
  FolderOpen,
  HeartHandshake,
  HardHat,
  Monitor,
  Palette,
  Lightbulb,
  Loader2,
  TrendingUp,
  Clock,
  ExternalLink,
  BookOpen,
  Tag,
  CircleHelp,
  Wrench,
  Building,
  MapPin,
  Sparkles,
  Image,
  Mail,
  Settings,
  Award,
  Inbox,
  ChevronRight,
  FileText,
  Zap,
  Type,
} from 'lucide-react';

const API_BASE = '/jewett-junction';

interface CollectionStat {
  key: string;
  name: string;
  icon: any;
  color: string;
  gradient: string;
  count: number;
  href: string;
  scope: 'intranet' | 'website';
}

interface CollectionMeta {
  key: string;
  name: string;
  icon: any;
  color: string;
  gradient: string;
  href: string;
}

interface CollectionGroup {
  label: string;
  scope: 'intranet' | 'website';
  items: CollectionMeta[];
}

const COLLECTION_GROUPS: CollectionGroup[] = [
  {
    label: 'Intranet',
    scope: 'intranet',
    items: [
      { key: 'announcements', name: 'Announcements', icon: Megaphone, color: 'blue', gradient: 'from-blue-500 to-cyan-500', href: '/jewett-junction/admin/announcements' },
      { key: 'banner', name: 'Banner Messages', icon: Sparkles, color: 'purple', gradient: 'from-purple-500 to-pink-500', href: '/jewett-junction/admin/banner' },
      { key: 'events', name: 'Events', icon: Calendar, color: 'indigo', gradient: 'from-indigo-500 to-purple-500', href: '/jewett-junction/admin/events' },
      { key: 'jobPostings', name: 'Job Postings', icon: Briefcase, color: 'emerald', gradient: 'from-emerald-500 to-teal-500', href: '/jewett-junction/admin/jobs' },
      { key: 'cultureStories', name: 'Culture Stories', icon: Heart, color: 'pink', gradient: 'from-pink-500 to-rose-500', href: '/jewett-junction/admin/culture' },
      { key: 'employees', name: 'Employees', icon: Users, color: 'cyan', gradient: 'from-cyan-500 to-blue-500', href: '/jewett-junction/admin/employees' },
      { key: 'resources', name: 'Resources', icon: FolderOpen, color: 'amber', gradient: 'from-amber-500 to-orange-500', href: '/jewett-junction/admin/resources' },
      { key: 'hrContent', name: 'HR Content', icon: HeartHandshake, color: 'violet', gradient: 'from-violet-500 to-purple-500', href: '/jewett-junction/admin/hr' },
      { key: 'safetyContent', name: 'Safety Content', icon: HardHat, color: 'orange', gradient: 'from-orange-500 to-red-500', href: '/jewett-junction/admin/safety' },
      { key: 'itKnowledgeBase', name: 'IT Knowledge', icon: Monitor, color: 'sky', gradient: 'from-sky-500 to-blue-500', href: '/jewett-junction/admin/it' },
      { key: 'marketingAssets', name: 'Marketing', icon: Palette, color: 'rose', gradient: 'from-fuchsia-500 to-pink-500', href: '/jewett-junction/admin/marketing' },
      { key: 'submittedIdeas', name: 'Ideas', icon: Lightbulb, color: 'yellow', gradient: 'from-yellow-500 to-amber-500', href: '/jewett-junction/admin/ideas' },
      { key: 'formSubmissions', name: 'Form Submissions', icon: Mail, color: 'cyan', gradient: 'from-cyan-500 to-sky-500', href: '/jewett-junction/admin/form-submissions' },
      { key: 'settings', name: 'Site Settings', icon: Settings, color: 'slate', gradient: 'from-slate-500 to-zinc-500', href: '/jewett-junction/admin/site-settings' },
      { key: 'pageCopy', name: 'Page Copy (Hero Text)', icon: FileText, color: 'indigo', gradient: 'from-indigo-500 to-violet-500', href: '/jewett-junction/admin/page-copy' },
      { key: 'intranetSections', name: 'Intranet Sections (404 / Help)', icon: Sparkles, color: 'blue', gradient: 'from-blue-500 to-cyan-500', href: '/jewett-junction/admin/intranet-sections' },
      { key: 'quickActions', name: 'Quick Actions (Card Tiles)', icon: Zap, color: 'violet', gradient: 'from-blue-500 to-violet-500', href: '/jewett-junction/admin/quick-actions' },
      { key: 'uiStrings', name: 'UI Strings (Badges, Empty States)', icon: Type, color: 'slate', gradient: 'from-slate-500 to-zinc-500', href: '/jewett-junction/admin/ui-strings' },
      { key: 'benefitLinks', name: 'Benefit Links', icon: Heart, color: 'violet', gradient: 'from-violet-500 to-purple-500', href: '/jewett-junction/admin/benefit-links' },
      { key: 'coreValues', name: 'Core Values', icon: Heart, color: 'pink', gradient: 'from-pink-500 to-rose-500', href: '/jewett-junction/admin/core-values' },
      { key: 'employeeBenefits', name: 'Employee Benefits', icon: Heart, color: 'emerald', gradient: 'from-emerald-500 to-teal-500', href: '/jewett-junction/admin/employee-benefits' },
      { key: 'companyAwards', name: 'Company Awards', icon: Award, color: 'amber', gradient: 'from-amber-500 to-yellow-500', href: '/jewett-junction/admin/company-awards' },
    ],
  },
  {
    label: 'Website',
    scope: 'website',
    items: [
      { key: 'blogPosts', name: 'Blog Posts', icon: BookOpen, color: 'teal', gradient: 'from-teal-500 to-emerald-500', href: '/jewett-junction/admin/blog' },
      { key: 'blogCategories', name: 'Blog Categories', icon: Tag, color: 'lime', gradient: 'from-lime-500 to-green-500', href: '/jewett-junction/admin/blog-categories' },
      { key: 'faqs', name: 'FAQs', icon: CircleHelp, color: 'purple', gradient: 'from-purple-500 to-indigo-500', href: '/jewett-junction/admin/faqs' },
      { key: 'services', name: 'Services', icon: Wrench, color: 'slate', gradient: 'from-slate-500 to-zinc-500', href: '/jewett-junction/admin/services' },
      { key: 'industries', name: 'Industries', icon: Building, color: 'stone', gradient: 'from-stone-500 to-neutral-500', href: '/jewett-junction/admin/industries' },
      { key: 'serviceAreas', name: 'Service Areas', icon: MapPin, color: 'red', gradient: 'from-red-500 to-rose-500', href: '/jewett-junction/admin/service-areas' },
      { key: 'teamMembers', name: 'Team Members', icon: Users, color: 'blue', gradient: 'from-blue-500 to-indigo-500', href: '/jewett-junction/admin/team-members' },
      { key: 'ourWork', name: 'Our Work', icon: Sparkles, color: 'amber', gradient: 'from-amber-500 to-yellow-500', href: '/jewett-junction/admin/our-work' },
      { key: 'imageGalleries', name: 'Image Galleries', icon: Image, color: 'fuchsia', gradient: 'from-fuchsia-500 to-violet-500', href: '/jewett-junction/admin/galleries' },
    ],
  },
];

const ALL_COLLECTIONS = COLLECTION_GROUPS.flatMap((g) => g.items.map((item) => ({ ...item, scope: g.scope })));

function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (!then) return '';
  const diff = Date.now() - then;
  const min = Math.round(diff / 60_000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 30) return `${day}d ago`;
  return new Date(iso).toLocaleDateString();
}

// Collections that produce inbound submissions admins need to triage. Items
// with status "New" surface in the Needs Attention panel at the top of the
// dashboard so triage work isn't buried beneath the collection grid.
const TRIAGE_COLLECTIONS = new Set(['submittedIdeas', 'formSubmissions']);

export function AdminOverview() {
  const [stats, setStats] = React.useState<CollectionStat[]>([]);
  const [recentItems, setRecentItems] = React.useState<any[]>([]);
  const [triageItems, setTriageItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getToken = () => localStorage.getItem('admin_token') || '';

  React.useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    const token = getToken();

    // Fetch every collection in parallel — the previous sequential loop
    // serialized ~27 requests and made the dashboard feel sluggish on first
    // load. Each request is independent so Promise.all is safe.
    const results = await Promise.all(
      ALL_COLLECTIONS.map(async (meta) => {
        try {
          const response = await fetch(`${API_BASE}/api/admin/items?collection=${meta.key}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'X-Requested-With': 'XMLHttpRequest',
            },
          });
          if (!response.ok) return { meta, items: [] as any[] };
          const data = await response.json();
          return { meta, items: (data.items || []) as any[] };
        } catch {
          return { meta, items: [] as any[] };
        }
      })
    );

    const statsData: CollectionStat[] = [];
    const recent: any[] = [];
    const triage: any[] = [];

    for (const { meta, items } of results) {
      statsData.push({ ...meta, count: items.length });

      for (const item of items) {
        const enriched = {
          ...item,
          collectionKey: meta.key,
          collectionName: meta.name,
          icon: meta.icon,
          color: meta.color,
          href: meta.href,
        };
        recent.push(enriched);
        if (TRIAGE_COLLECTIONS.has(meta.key) && (item.fieldData?.status === 'New' || !item.fieldData?.status)) {
          triage.push(enriched);
        }
      }
    }

    // Sort by lastUpdated (or createdOn) descending so the dashboard shows
    // *recent* items, not the first three of each collection alphabetically.
    const tsOf = (item: any) =>
      new Date(item.lastUpdated || item.lastPublished || item.createdOn || 0).getTime();
    recent.sort((a, b) => tsOf(b) - tsOf(a));
    triage.sort((a, b) => tsOf(b) - tsOf(a));

    setStats(statsData);
    setRecentItems(recent.slice(0, 8));
    setTriageItems(triage.slice(0, 6));
    setIsLoading(false);
  };

  const totalItems = stats.reduce((acc, stat) => acc + stat.count, 0);
  const triageCount = triageItems.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions - Moved to top for easy access */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <nav aria-label="Quick actions" className="flex flex-wrap gap-3">
          <a
            href="/jewett-junction/admin/announcements"
            className="px-4 py-2 min-h-[44px] inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            + New Announcement
          </a>
          <a
            href="/jewett-junction/admin/events"
            className="px-4 py-2 min-h-[44px] inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            + New Event
          </a>
          <a
            href="/jewett-junction/admin/jobs"
            className="px-4 py-2 min-h-[44px] inline-flex items-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            + New Job Posting
          </a>
          <a
            href="/jewett-junction/admin/employees"
            className="px-4 py-2 min-h-[44px] inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            + New Employee
          </a>
        </nav>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="region" aria-label="Dashboard statistics">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Items</p>
              <p className="text-2xl font-bold text-white">{totalItems}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <FolderOpen className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Collections</p>
              <p className="text-2xl font-bold text-white">{stats.length}</p>
            </div>
          </div>
        </div>
        <a
          href="#needs-attention"
          className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-amber-500/40 hover:bg-slate-800/70 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          aria-label={`Needs attention: ${triageCount} pending`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${triageCount > 0 ? 'bg-gradient-to-br from-amber-500 to-orange-500' : 'bg-gradient-to-br from-slate-600 to-slate-700'}`}>
              <Inbox className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-400">Needs Attention</p>
              <p className="text-2xl font-bold text-white">
                {triageCount}
                {triageCount > 0 && <span className="ml-2 text-sm font-normal text-amber-400">new</span>}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-600 group-hover:text-amber-400 transition-colors" aria-hidden="true" />
          </div>
        </a>
      </div>

      {/* Needs Attention — surfaces new submissions, applications, and ideas
          so triage doesn't get buried below 27 collection tiles. */}
      {triageItems.length > 0 && (
        <div id="needs-attention" className="bg-amber-500/5 border border-amber-500/30 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-amber-500/20 flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <Inbox className="h-5 w-5 text-amber-400" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Needs Your Attention</h2>
              <p className="text-sm text-amber-200/70">New submissions, applications, and ideas waiting on you</p>
            </div>
          </div>
          <div className="divide-y divide-amber-500/10" role="list">
            {triageItems.map((item, index) => {
              const Icon = item.icon;
              const itemName = item.fieldData?.name || item.fieldData?.title || 'Untitled';
              const submitter = item.fieldData?.['submitter-name'] || item.fieldData?.['submitted-by'] || item.fieldData?.['first-name'];
              return (
                <a
                  key={`triage-${item.collectionKey}-${item.id}-${index}`}
                  href={item.href}
                  className="flex items-center gap-4 p-4 hover:bg-amber-500/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-500"
                  role="listitem"
                  aria-label={`Review ${itemName} in ${item.collectionName}`}
                >
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{itemName}</h3>
                    <p className="text-sm text-amber-200/70 truncate">
                      {item.collectionName}{submitter && ` · from ${submitter}`}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    New
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Collection Stats Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Collections</h2>
            <p className="text-sm text-slate-400">Manage your content</p>
          </div>
        </div>
        {COLLECTION_GROUPS.map((group) => {
          const groupStats = stats.filter((s) => s.scope === group.scope);
          const pillClass = group.scope === 'intranet'
            ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
          const dotClass = group.scope === 'intranet' ? 'bg-blue-400' : 'bg-emerald-400';
          return (
            <div key={group.scope} className="mb-8">
              <div className={`inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider rounded-full border ${pillClass}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                {group.label}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" role="list">
                {groupStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <a
                      key={stat.key}
                      href={stat.href}
                      aria-label={`Manage ${stat.name} - ${stat.count} items`}
                      className="group relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 min-h-[140px] hover:border-slate-600 hover:bg-slate-800/70 hover:shadow-xl hover:shadow-slate-900/50 hover:-translate-y-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                      role="listitem"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                      <div className="relative">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 shrink-0 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                            <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <span className="px-2.5 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full">
                            {stat.count} {stat.count === 1 ? 'item' : 'items'}
                          </span>
                        </div>
                        <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors">{stat.name}</h3>
                        <p className="text-sm text-slate-500 mt-1">Click to manage</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Items */}
      {recentItems.length > 0 && (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-slate-700/50">
            <h2 className="text-lg font-semibold text-white">Recently Edited</h2>
            <p className="text-sm text-slate-400">Sorted by latest change across all collections</p>
          </div>
          <div className="divide-y divide-slate-700/50" role="list">
            {recentItems.map((item, index) => {
              const Icon = item.icon;
              const itemName = item.fieldData?.name || item.fieldData?.title || 'Untitled';
              const ts = item.lastUpdated || item.lastPublished || item.createdOn;
              return (
                <a
                  key={`${item.collectionKey}-${item.id}-${index}`}
                  href={item.href}
                  aria-label={`Edit ${itemName} in ${item.collectionName}`}
                  className="flex items-center gap-4 p-4 min-h-[60px] hover:bg-slate-700/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                  role="listitem"
                >
                  <div className={`w-10 h-10 bg-${item.color}-500/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-5 w-5 text-${item.color}-400`} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">
                      {itemName}
                    </h3>
                    <p className="text-sm text-slate-500 truncate">
                      {item.collectionName}
                      {ts && <span className="ml-1.5 text-slate-600">· {formatRelativeTime(ts)}</span>}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.isDraft
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`} aria-label={item.isDraft ? 'Status: Draft' : 'Status: Published'}>
                    {item.isDraft ? 'Draft' : 'Published'}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
