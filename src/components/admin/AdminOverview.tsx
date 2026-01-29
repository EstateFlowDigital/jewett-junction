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
  ExternalLink
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
}

const COLLECTION_META: Omit<CollectionStat, 'count'>[] = [
  { key: 'announcements', name: 'Announcements', icon: Megaphone, color: 'blue', gradient: 'from-blue-500 to-cyan-500', href: '/jewett-junction/admin/announcements' },
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
];

export function AdminOverview() {
  const [stats, setStats] = React.useState<CollectionStat[]>([]);
  const [recentItems, setRecentItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getToken = () => localStorage.getItem('admin_token') || '';

  React.useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    const statsData: CollectionStat[] = [];
    const recent: any[] = [];

    for (const meta of COLLECTION_META) {
      try {
        const response = await fetch(`${API_BASE}/api/admin/items?collection=${meta.key}`, {
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const items = data.items || [];
          statsData.push({
            ...meta,
            count: items.length
          });

          // Collect recent items (last 5 from each collection)
          items.slice(0, 3).forEach((item: any) => {
            recent.push({
              ...item,
              collectionKey: meta.key,
              collectionName: meta.name,
              icon: meta.icon,
              color: meta.color,
              href: meta.href
            });
          });
        } else {
          statsData.push({ ...meta, count: 0 });
        }
      } catch {
        statsData.push({ ...meta, count: 0 });
      }
    }

    setStats(statsData);
    // Sort recent items by lastUpdated or createdOn
    setRecentItems(recent.slice(0, 10));
    setIsLoading(false);
  };

  const totalItems = stats.reduce((acc, stat) => acc + stat.count, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="region" aria-label="Dashboard statistics">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
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
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <FolderOpen className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Collections</p>
              <p className="text-2xl font-bold text-white">{stats.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Recent Activity</p>
              <p className="text-2xl font-bold text-white">{recentItems.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Stats Grid */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-white">Collections Overview</h2>
          <p className="text-sm text-slate-400">Click a collection to manage its content</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-slate-700/30" role="list">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <a
                key={stat.key}
                href={stat.href}
                aria-label={`Manage ${stat.name} - ${stat.count} items`}
                className="bg-slate-800/50 p-5 min-h-[120px] hover:bg-slate-700/50 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                role="listitem"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </div>
                <h3 className="font-medium text-white mb-1">{stat.name}</h3>
                <p className="text-2xl font-bold text-slate-300">{stat.count}</p>
                <p className="text-xs text-slate-500">items</p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Recent Items */}
      {recentItems.length > 0 && (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-slate-700/50">
            <h2 className="text-lg font-semibold text-white">Recent Items</h2>
            <p className="text-sm text-slate-400">Latest content across all collections</p>
          </div>
          <div className="divide-y divide-slate-700/50" role="list">
            {recentItems.map((item, index) => {
              const Icon = item.icon;
              const itemName = item.fieldData?.name || item.fieldData?.title || 'Untitled';
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
                    <p className="text-sm text-slate-500">{item.collectionName}</p>
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

      {/* Quick Actions */}
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
    </div>
  );
}
