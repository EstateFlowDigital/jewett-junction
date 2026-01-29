import * as React from 'react';
import { Lock, LogOut, Send, Settings, Loader2, CheckCircle2, XCircle, Megaphone, Calendar, Briefcase, Heart, Users, FolderOpen, HeartHandshake, HardHat, Monitor, Palette, Lightbulb, LayoutDashboard, Menu, X } from 'lucide-react';

const API_BASE = '/jewett-junction';

interface NavItem {
  key: string;
  name: string;
  icon: any;
  color: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', name: 'Overview', icon: LayoutDashboard, color: 'slate', href: '/jewett-junction/admin' },
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

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  title: string;
}

export function AdminLayout({ children, currentPage, title }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [toast, setToast] = React.useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Check for existing token on mount
  React.useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      verifyToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Auto-dismiss toast
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/login`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('admin_token');
      }
    } catch {
      localStorage.removeItem('admin_token');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const response = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setLoginError(data.error || 'Invalid password');
      }
    } catch (err: any) {
      setLoginError(`Connection error: ${err?.message || 'Unable to reach server'}`);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const response = await fetch(`${API_BASE}/api/admin/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token') || ''}`,
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setToast({ type: 'success', message: 'Site published successfully!' });
      } else {
        setToast({ type: 'error', message: data.error || 'Failed to publish' });
      }
    } catch (err: any) {
      setToast({ type: 'error', message: `Publish error: ${err?.message}` });
    } finally {
      setIsPublishing(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Lock className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
            <p className="text-slate-400 text-center mb-6">Enter password to continue</p>

            <form onSubmit={handleLogin} className="space-y-4" role="form" aria-label="Admin login form">
              <div>
                <label htmlFor="admin-password" className="sr-only">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  aria-describedby={loginError ? 'login-error' : undefined}
                  aria-invalid={loginError ? 'true' : undefined}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  autoFocus
                />
              </div>
              {loginError && (
                <p id="login-error" role="alert" className="text-rose-400 text-sm">{loginError}</p>
              )}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full min-h-[44px] py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                {isLoggingIn ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Lock className="h-4 w-4" aria-hidden="true" />}
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated layout
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 min-h-[44px] min-w-[44px] p-2 bg-slate-800 border border-slate-700 rounded-xl text-white hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label={isSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isSidebarOpen}
        aria-controls="admin-sidebar"
      >
        {isSidebarOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        role="navigation"
        aria-label="Admin navigation"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Settings className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-slate-500">Jewett Junction</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto" aria-label="Admin sections">
          <ul className="space-y-1" role="list">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.key;
              const Icon = item.icon;
              const colorClasses = {
                slate: isActive ? 'bg-slate-500/20 text-slate-300 border-slate-500/30' : '',
                blue: isActive ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : '',
                indigo: isActive ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : '',
                emerald: isActive ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : '',
                pink: isActive ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' : '',
                cyan: isActive ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : '',
                amber: isActive ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : '',
                violet: isActive ? 'bg-violet-500/20 text-violet-400 border-violet-500/30' : '',
                orange: isActive ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : '',
                sky: isActive ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : '',
                rose: isActive ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : '',
                yellow: isActive ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : '',
              };
              return (
                <li key={item.key}>
                  <a
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center gap-3 px-3 min-h-[44px] rounded-lg transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isActive
                        ? `${colorClasses[item.color as keyof typeof colorClasses]} border`
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            aria-label={isPublishing ? 'Publishing site...' : 'Publish site to Webflow'}
            className="w-full flex items-center justify-center gap-2 px-4 min-h-[44px] bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg font-medium text-sm transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            {isPublishing ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
            {isPublishing ? 'Publishing...' : 'Publish Site'}
          </button>
          <button
            onClick={handleLogout}
            aria-label="Log out of admin panel"
            className="w-full flex items-center justify-center gap-2 px-4 min-h-[44px] text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-auto pt-16 lg:pt-6" role="main">
        <h1 className="text-xl lg:text-2xl font-bold text-white mb-6">{title}</h1>
        {children}
      </main>

      {/* Toast Notification */}
      {toast && (
        <div
          role="alert"
          aria-live="polite"
          className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg z-50 ${
            toast.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-rose-500/20 border border-rose-500/30'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-hidden="true" />
          ) : (
            <XCircle className="h-5 w-5 text-rose-400" aria-hidden="true" />
          )}
          <span className={toast.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}>
            {toast.message}
          </span>
        </div>
      )}
    </div>
  );
}
