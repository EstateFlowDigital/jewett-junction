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
  LayoutDashboard,
  LogOut,
  Settings,
  Send
} from 'lucide-react';

interface NavItem {
  key: string;
  name: string;
  icon: any;
  color: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, color: 'slate', href: '/jewett-junction/admin' },
  { key: 'announcements', name: 'Announcements', icon: Megaphone, color: 'blue', href: '/jewett-junction/admin/announcements' },
  { key: 'events', name: 'Events', icon: Calendar, color: 'indigo', href: '/jewett-junction/admin/events' },
  { key: 'jobs', name: 'Job Postings', icon: Briefcase, color: 'emerald', href: '/jewett-junction/admin/jobs' },
  { key: 'culture', name: 'Culture Stories', icon: Heart, color: 'pink', href: '/jewett-junction/admin/culture' },
  { key: 'employees', name: 'Employees', icon: Users, color: 'cyan', href: '/jewett-junction/admin/employees' },
  { key: 'resources', name: 'Resources', icon: FolderOpen, color: 'amber', href: '/jewett-junction/admin/resources' },
  { key: 'hr', name: 'HR Content', icon: HeartHandshake, color: 'violet', href: '/jewett-junction/admin/hr' },
  { key: 'safety', name: 'Safety Content', icon: HardHat, color: 'orange', href: '/jewett-junction/admin/safety' },
  { key: 'it', name: 'IT Knowledge', icon: Monitor, color: 'sky', href: '/jewett-junction/admin/it' },
  { key: 'marketing', name: 'Marketing', icon: Palette, color: 'rose', href: '/jewett-junction/admin/marketing' },
  { key: 'ideas', name: 'Submitted Ideas', icon: Lightbulb, color: 'yellow', href: '/jewett-junction/admin/ideas' },
];

interface AdminSidebarProps {
  currentPage: string;
  onLogout: () => void;
  onPublish: () => void;
  isPublishing?: boolean;
}

export function AdminSidebar({ currentPage, onLogout, onPublish, isPublishing }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-slate-500">Jewett Junction</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.key;
            const Icon = item.icon;
            return (
              <a
                key={item.key}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                  isActive
                    ? `bg-${item.color}-500/20 text-${item.color}-400 border border-${item.color}-500/30`
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? `text-${item.color}-400` : ''}`} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Footer Actions */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <button
          onClick={onPublish}
          disabled={isPublishing}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg font-medium text-sm transition-all disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {isPublishing ? 'Publishing...' : 'Publish Site'}
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm transition-all"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
