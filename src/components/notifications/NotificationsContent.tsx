import * as React from 'react';
import {
  Bell,
  ChevronRight,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  Megaphone,
  Calendar,
  Award,
  Shield,
  AlertCircle,
  Info,
  Settings,
  X
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'announcement' | 'event' | 'badge' | 'safety' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
}

// Notifications are derived from real CMS data: announcements, events, and
// urgent safety items. Read state is persisted in localStorage by id.
const READ_STORAGE_KEY = 'jewett_notifications_read';
// Decode common HTML entities (Webflow returns `&nbsp;` etc.) before
// stripping tags so the rendered notification body doesn't leak raw escapes.
const ENTITIES: Record<string, string> = {
  '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>',
  '&quot;': '"', '&#39;': "'", '&apos;': "'",
};
const stripHtml = (html?: string) => {
  if (!html) return '';
  let decoded = html;
  for (const [entity, char] of Object.entries(ENTITIES)) {
    decoded = decoded.split(entity).join(char);
  }
  decoded = decoded
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
  return decoded.replace(/<[^>]*>/g, '').trim();
};
const truncate = (s: string, n: number) => (s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…');

function loadReadIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(READ_STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveReadIds(ids: Set<string>) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(READ_STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}

async function fetchNotifications(): Promise<Notification[]> {
  const read = loadReadIds();
  const out: Notification[] = [];
  try {
    const [annRes, evtRes, safRes] = await Promise.all([
      fetch('/jewett-junction/api/cms/announcements?limit=20').catch(() => null),
      fetch('/jewett-junction/api/cms/events?limit=20').catch(() => null),
      fetch('/jewett-junction/api/cms/safety?limit=10').catch(() => null),
    ]);
    if (annRes && annRes.ok) {
      const data = await annRes.json();
      for (const a of data.items || []) {
        const id = `ann-${a.id}`;
        const slug = a.slug || a.id;
        out.push({
          id,
          type: 'announcement',
          title: a.name || 'Announcement',
          message: truncate(stripHtml(a.content || ''), 140),
          date: a['published-date'] || a.lastUpdated || new Date().toISOString(),
          read: read.has(id),
          link: `/jewett-junction/announcements/${slug}`,
        });
      }
    }
    if (evtRes && evtRes.ok) {
      const data = await evtRes.json();
      const now = Date.now();
      for (const e of data.items || []) {
        const dateStr = e['event-date'];
        if (!dateStr) continue;
        const eventTs = new Date(dateStr).getTime();
        if (isNaN(eventTs) || eventTs < now - 86400000) continue; // past events skipped
        const id = `evt-${e.id}`;
        const slug = e.slug || e.id;
        out.push({
          id,
          type: 'event',
          title: e.name || 'Upcoming Event',
          message: truncate(stripHtml(e.description || e.location || ''), 140) || 'See event details.',
          date: dateStr,
          read: read.has(id),
          link: `/jewett-junction/events/${slug}`,
        });
      }
    }
    if (safRes && safRes.ok) {
      const data = await safRes.json();
      for (const s of data.items || []) {
        if (s.severity !== 'Critical' && s.severity !== 'Emergency') continue;
        const id = `saf-${s.id}`;
        const slug = s.slug || s.id;
        out.push({
          id,
          type: 'safety',
          title: s.name || 'Safety Alert',
          message: truncate(stripHtml(s.description || s['full-content'] || s.content || ''), 140) || 'Critical safety alert.',
          date: s['effective-date'] || new Date().toISOString(),
          read: read.has(id),
          link: `/jewett-junction/safety/${slug}`,
        });
      }
    }
  } catch (err) {
    console.error('Notifications fetch error:', err);
  }
  out.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return out;
}

const typeIcons: Record<Notification['type'], React.ElementType> = {
  announcement: Megaphone,
  event: Calendar,
  badge: Award,
  safety: Shield,
  system: Info
};

const typeColors: Record<Notification['type'], string> = {
  announcement: 'text-blue-400 bg-blue-500/20',
  event: 'text-purple-400 bg-purple-500/20',
  badge: 'text-amber-400 bg-amber-500/20',
  safety: 'text-red-400 bg-red-500/20',
  system: 'text-slate-400 bg-slate-500/20'
};

export function NotificationsContent() {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [filter, setFilter] = React.useState<'all' | 'unread'>('all');
  const [typeFilter, setTypeFilter] = React.useState<string>('all');

  React.useEffect(() => {
    fetchNotifications().then((items) => {
      setNotifications(items);
      setIsLoading(false);
    });
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    const matchesReadFilter = filter === 'all' || !n.read;
    const matchesTypeFilter = typeFilter === 'all' || n.type === typeFilter;
    return matchesReadFilter && matchesTypeFilter;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    const ids = loadReadIds();
    ids.add(id);
    saveReadIds(ids);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    const ids = loadReadIds();
    notifications.forEach((n) => ids.add(n.id));
    saveReadIds(ids);
  };

  const deleteNotification = (id: string) => {
    // Hide locally; CMS-sourced items will reappear on refresh by design.
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    if (confirm('Hide all notifications from this view? CMS-driven entries will reappear on refresh.')) {
      setNotifications([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Bell className="w-7 h-7 text-amber-400" aria-hidden="true" />
            Notifications
            {unreadCount > 0 && (
              <span className="px-2 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-slate-400">Stay updated with the latest news and alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/jewett-junction/settings"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors"
          >
            <Settings className="w-4 h-4" aria-hidden="true" />
            Preferences
          </a>
          <a
            href="/jewett-junction/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" aria-hidden="true" />
            Dashboard
          </a>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="glass rounded-xl border border-slate-800/50 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" aria-hidden="true" />
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <div className="w-px h-6 bg-slate-700 mx-2" />
            {['all', 'announcement', 'event', 'badge', 'safety', 'system'].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                  typeFilter === type
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>

          {/* Bulk Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <CheckCheck className="w-4 h-4" aria-hidden="true" />
              Mark all read
            </button>
            <button
              onClick={clearAll}
              disabled={notifications.length === 0}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      {isLoading ? (
        <div className="glass rounded-2xl border border-slate-800/50 p-12 text-center">
          <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-pulse" aria-hidden="true" />
          <p className="text-slate-400">Loading notifications…</p>
        </div>
      ) : filteredNotifications.length > 0 ? (
        <div className="glass rounded-2xl border border-slate-800/50 overflow-hidden divide-y divide-slate-700/50">
          {filteredNotifications.map((notification) => {
            const Icon = typeIcons[notification.type];
            const colorClass = typeColors[notification.type];

            return (
              <div
                key={notification.id}
                className={`p-4 flex items-start gap-4 hover:bg-slate-800/30 transition-colors ${
                  !notification.read ? 'bg-slate-800/20' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`font-medium ${!notification.read ? 'text-white' : 'text-slate-300'}`}>
                        {notification.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-slate-500">{formatDate(notification.date)}</span>
                    <div className="flex items-center gap-2">
                      {notification.link && (
                        <a
                          href={notification.link}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          View details
                        </a>
                      )}
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" aria-hidden="true" />
                          Mark read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                      >
                        <X className="w-3 h-3" aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass rounded-2xl border border-slate-800/50 p-12 text-center">
          <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" aria-hidden="true" />
          <h3 className="text-lg font-medium text-white mb-2">No notifications</h3>
          <p className="text-slate-400">
            {filter === 'unread'
              ? "You're all caught up! No unread notifications."
              : 'No notifications to display.'}
          </p>
        </div>
      )}

      {/* Quick Info */}
      <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm text-slate-300">
              Notification preferences can be customized in{' '}
              <a href="/jewett-junction/settings" className="text-blue-400 hover:text-blue-300">
                Settings
              </a>
              . You can choose which types of notifications you want to receive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
