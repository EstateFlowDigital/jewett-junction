import * as React from 'react';
import {
  Lock,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  RefreshCw,
  Send,
  Megaphone,
  Calendar,
  Briefcase,
  Heart,
  Users,
  FolderOpen,
  Check,
  AlertCircle,
  Loader2,
  Settings,
  Sparkles,
  Shield
} from 'lucide-react';

// Collection configurations
const COLLECTIONS = {
  announcements: {
    name: 'Announcements',
    icon: Megaphone,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    fields: [
      { key: 'name', label: 'Title', type: 'text', required: true },
      { key: 'content', label: 'Content', type: 'richtext', required: true },
      { key: 'author', label: 'Author', type: 'text' },
      { key: 'priority', label: 'Priority', type: 'select', options: ['normal', 'high'] },
      { key: 'is-pinned', label: 'Pinned', type: 'boolean' },
    ]
  },
  events: {
    name: 'Events',
    icon: Calendar,
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-500',
    fields: [
      { key: 'name', label: 'Event Title', type: 'text', required: true },
      { key: 'event-date', label: 'Date', type: 'datetime', required: true },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'category', label: 'Category', type: 'select', options: ['Company', 'Training', 'HR', 'Safety', 'Social'] },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'registration-link', label: 'Registration Link', type: 'url' },
    ]
  },
  jobPostings: {
    name: 'Job Postings',
    icon: Briefcase,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    fields: [
      { key: 'name', label: 'Job Title', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'select', options: ['Commercial', 'Safety', 'Engineering', 'Operations', 'Admin', 'HR', 'IT'] },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'employment-type', label: 'Employment Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract'] },
      { key: 'description', label: 'Description', type: 'richtext' },
      { key: 'requirements', label: 'Requirements', type: 'richtext' },
      { key: 'referral-bonus', label: 'Referral Bonus ($)', type: 'number' },
      { key: 'apply-link', label: 'Apply Link', type: 'url' },
      { key: 'job-is-active', label: 'Active', type: 'boolean' },
    ]
  },
  cultureStories: {
    name: 'Culture Stories',
    icon: Heart,
    color: 'pink',
    gradient: 'from-pink-500 to-rose-500',
    fields: [
      { key: 'name', label: 'Title', type: 'text', required: true },
      { key: 'type', label: 'Type', type: 'select', options: ['Spotlight', 'Win', 'Recognition', 'Value'] },
      { key: 'content', label: 'Content', type: 'richtext' },
      { key: 'excerpt', label: 'Short Excerpt', type: 'textarea' },
      { key: 'author', label: 'Author/Attribution', type: 'text' },
      { key: 'featured', label: 'Featured', type: 'boolean' },
    ]
  },
  employees: {
    name: 'Employees',
    icon: Users,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    fields: [
      { key: 'name', label: 'Full Name', type: 'text', required: true },
      { key: 'role', label: 'Job Title', type: 'text', required: true },
      { key: 'department', label: 'Department', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'phone', label: 'Phone', type: 'tel' },
      { key: 'bio', label: 'Bio', type: 'textarea' },
      { key: 'is-featured', label: 'Featured', type: 'boolean' },
    ]
  },
  resources: {
    name: 'Resources',
    icon: FolderOpen,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    fields: [
      { key: 'name', label: 'Resource Name', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'select', options: ['Safety', 'HR', 'Project', 'IT', 'Other'] },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'external-link', label: 'External Link', type: 'url' },
    ]
  },
};

type CollectionKey = keyof typeof COLLECTIONS;

interface AdminDashboardProps {}

export function AdminDashboard({}: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const [activeCollection, setActiveCollection] = React.useState<CollectionKey>('announcements');
  const [items, setItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const [isEditing, setIsEditing] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<any>(null);
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  const [isPublishing, setIsPublishing] = React.useState(false);

  // Check for existing token on mount
  React.useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      verifyToken(token);
    }
  }, []);

  // Load items when collection changes
  React.useEffect(() => {
    if (isAuthenticated) {
      loadItems();
    }
  }, [activeCollection, isAuthenticated]);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/jewett-junction/api/admin/login', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('admin_token');
      }
    } catch {
      localStorage.removeItem('admin_token');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const response = await fetch('/jewett-junction/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    } catch (err) {
      setLoginError('Connection error. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setItems([]);
  };

  const getToken = () => localStorage.getItem('admin_token') || '';

  const loadItems = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/jewett-junction/api/admin/items?collection=${activeCollection}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
          return;
        }
        throw new Error('Failed to load items');
      }

      const data = await response.json();
      setItems(data.items || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({});
    setIsEditing(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item.fieldData || {});
    setIsEditing(true);
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    setIsLoading(true);
    try {
      const response = await fetch('/jewett-junction/api/admin/items', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ collection: activeCollection, itemId })
      });

      if (!response.ok) throw new Error('Failed to delete item');

      setSuccess('Item deleted successfully');
      loadItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (publishLive: boolean = false) => {
    setIsLoading(true);
    setError('');

    try {
      const method = editingItem ? 'PATCH' : 'POST';
      const body: any = {
        collection: activeCollection,
        fields: formData,
        isLive: publishLive
      };

      if (editingItem) {
        body.itemId = editingItem.id;
      }

      const response = await fetch('/jewett-junction/api/admin/items', {
        method,
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save item');
      }

      setSuccess(editingItem ? 'Item updated!' : 'Item created!');
      setIsEditing(false);
      setEditingItem(null);
      setFormData({});
      loadItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublishSite = async () => {
    if (!confirm('Publish all changes to the live site?')) return;

    setIsPublishing(true);
    setError('');

    try {
      const response = await fetch('/jewett-junction/api/admin/publish', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });

      if (!response.ok) throw new Error('Failed to publish site');

      setSuccess('Site published successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  // Clear messages after 3 seconds
  React.useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Login Screen - styled like dashboard
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo/Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-white">Jewett Junction</h2>
                <p className="text-sm text-slate-400">Content Management</p>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl shadow-black/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl flex items-center justify-center mx-auto mb-5 border border-blue-500/20">
                <Lock className="h-10 w-10 text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
              <p className="text-slate-400">Enter your password to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-600/50 rounded-2xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-lg"
                  autoFocus
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                  <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
                  <span className="text-rose-300">{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn || !password}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Access Admin Panel
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-slate-500 text-sm mt-6">
              Protected area for authorized personnel only
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard - styled like main dashboard
  const config = COLLECTIONS[activeCollection];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Content Admin</h1>
              <p className="text-xs text-slate-400">Jewett Junction CMS</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePublishSite}
              disabled={isPublishing}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
            >
              {isPublishing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Publish Site
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-xl text-sm flex items-center gap-2 transition-colors border border-slate-700/50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      {(success || error) && (
        <div className="max-w-7xl mx-auto px-6 pt-4">
          {success && (
            <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl backdrop-blur-sm">
              <Check className="h-5 w-5 text-emerald-400" />
              <span className="text-emerald-300">{success}</span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl backdrop-blur-sm">
              <AlertCircle className="h-5 w-5 text-rose-400" />
              <span className="text-rose-300">{error}</span>
            </div>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Collections */}
          <aside className="w-72 flex-shrink-0">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-slate-700/50 bg-slate-800/50">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Collections</span>
              </div>
              <div className="p-3 space-y-1">
                {Object.entries(COLLECTIONS).map(([key, col]) => {
                  const ColIcon = col.icon;
                  const isActive = activeCollection === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveCollection(key as CollectionKey);
                        setIsEditing(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        isActive
                          ? `bg-gradient-to-r ${col.gradient} text-white shadow-lg`
                          : 'text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      <ColIcon className="h-5 w-5" />
                      <span className="font-medium">{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {isEditing ? (
              // Edit/Create Form
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                <div className="p-5 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">
                      {editingItem ? `Edit ${config.name.slice(0, -1)}` : `New ${config.name.slice(0, -1)}`}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingItem(null);
                      setFormData({});
                    }}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {config.fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        {field.label}
                        {field.required && <span className="text-rose-400 ml-1">*</span>}
                      </label>

                      {(field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'url') && (
                        <input
                          type={field.type === 'url' ? 'url' : field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text'}
                          value={formData[field.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      )}

                      {field.type === 'number' && (
                        <input
                          type="number"
                          value={formData[field.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      )}

                      {field.type === 'textarea' && (
                        <textarea
                          value={formData[field.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                        />
                      )}

                      {field.type === 'richtext' && (
                        <textarea
                          value={formData[field.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          rows={5}
                          placeholder="Supports basic HTML formatting"
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none font-mono text-sm"
                        />
                      )}

                      {field.type === 'datetime' && (
                        <input
                          type="datetime-local"
                          value={formData[field.key]?.slice(0, 16) || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: new Date(e.target.value).toISOString() })}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      )}

                      {field.type === 'select' && (
                        <select
                          value={formData[field.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        >
                          <option value="">Select...</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                          ))}
                        </select>
                      )}

                      {field.type === 'boolean' && (
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={formData[field.key] || false}
                              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500 transition-all"></div>
                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
                          </div>
                          <span className="text-slate-300 group-hover:text-white transition-colors">Enable</span>
                        </label>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-5 border-t border-slate-700/50 flex items-center justify-end gap-3 bg-slate-800/50">
                  <button
                    onClick={() => handleSave(false)}
                    disabled={isLoading}
                    className="px-5 py-2.5 bg-slate-700/80 hover:bg-slate-600/80 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-colors border border-slate-600/50"
                  >
                    <Save className="h-4 w-4" />
                    Save as Draft
                  </button>
                  <button
                    onClick={() => handleSave(true)}
                    disabled={isLoading}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Save & Publish
                  </button>
                </div>
              </div>
            ) : (
              // Items List
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                {/* Header with gradient */}
                <div className={`p-5 border-b border-slate-700/50 bg-gradient-to-r ${config.gradient}/10`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">{config.name}</h2>
                        <p className="text-sm text-slate-400">{items.length} items in collection</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={loadItems}
                        disabled={isLoading}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-colors"
                      >
                        <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                      </button>
                      <button
                        onClick={handleCreate}
                        className={`px-5 py-2.5 bg-gradient-to-r ${config.gradient} text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl`}
                      >
                        <Plus className="h-4 w-4" />
                        Add New
                      </button>
                    </div>
                  </div>
                </div>

                {isLoading && items.length === 0 ? (
                  <div className="p-16 text-center">
                    <Loader2 className="h-10 w-10 text-slate-500 animate-spin mx-auto mb-4" />
                    <p className="text-slate-400">Loading items...</p>
                  </div>
                ) : items.length === 0 ? (
                  <div className="p-16 text-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${config.gradient}/20 rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                      <Icon className="h-10 w-10 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No {config.name.toLowerCase()} yet</h3>
                    <p className="text-slate-400 mb-6">Get started by creating your first item</p>
                    <button
                      onClick={handleCreate}
                      className={`px-6 py-3 bg-gradient-to-r ${config.gradient} text-white rounded-xl font-medium inline-flex items-center gap-2 shadow-lg`}
                    >
                      <Sparkles className="h-4 w-4" />
                      Create First {config.name.slice(0, -1)}
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-700/50">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 flex items-center justify-between hover:bg-slate-700/20 transition-colors group"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={`w-10 h-10 bg-gradient-to-br ${config.gradient}/20 rounded-lg flex items-center justify-center`}>
                            <Icon className={`h-5 w-5 text-${config.color}-400`} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-medium text-white truncate">
                              {item.fieldData?.name || item.fieldData?.title || 'Untitled'}
                            </h3>
                            <p className="text-sm text-slate-500 truncate">
                              ID: {item.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            item.isDraft
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {item.isDraft ? 'Draft' : 'Published'}
                          </span>
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
