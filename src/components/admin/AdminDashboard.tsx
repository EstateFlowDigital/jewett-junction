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
  Loader2
} from 'lucide-react';

// Collection configurations
const COLLECTIONS = {
  announcements: {
    name: 'Announcements',
    icon: Megaphone,
    color: 'blue',
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

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Access</h1>
              <p className="text-slate-400 mt-2">Enter password to manage content</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  autoFocus
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 p-3 bg-rose-500/20 border border-rose-500/50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-rose-400" />
                  <span className="text-rose-300 text-sm">{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn || !password}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Access Admin Panel
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  const config = COLLECTIONS[activeCollection];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Lock className="h-5 w-5 text-blue-400" />
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
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
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
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm flex items-center gap-2 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      {(success || error) && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          {success && (
            <div className="flex items-center gap-2 p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
              <Check className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm">{success}</span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-500/20 border border-rose-500/50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-rose-400" />
              <span className="text-rose-300 text-sm">{error}</span>
            </div>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Collections */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-3 border-b border-slate-700">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Collections</span>
              </div>
              <div className="p-2">
                {Object.entries(COLLECTIONS).map(([key, col]) => {
                  const Icon = col.icon;
                  const isActive = activeCollection === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveCollection(key as CollectionKey);
                        setIsEditing(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        isActive
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {isEditing ? (
              // Edit/Create Form
              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    {editingItem ? `Edit ${config.name.slice(0, -1)}` : `New ${config.name.slice(0, -1)}`}
                  </h2>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingItem(null);
                      setFormData({});
                    }}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6 space-y-5">
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
                          className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:border-blue-500 outline-none"
                        />
                      )}

                      {field.type === 'number' && (
                        <input
                          type="number"
                          value={formData[field.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:border-blue-500 outline-none"
                        />
                      )}

                      {field.type === 'textarea' && (
                        <textarea
                          value={formData[field.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:border-blue-500 outline-none resize-none"
                        />
                      )}

                      {field.type === 'richtext' && (
                        <textarea
                          value={formData[field.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          rows={5}
                          placeholder="Supports basic HTML formatting"
                          className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:border-blue-500 outline-none resize-none font-mono text-sm"
                        />
                      )}

                      {field.type === 'datetime' && (
                        <input
                          type="datetime-local"
                          value={formData[field.key]?.slice(0, 16) || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: new Date(e.target.value).toISOString() })}
                          className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 outline-none"
                        />
                      )}

                      {field.type === 'select' && (
                        <select
                          value={formData[field.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 outline-none"
                        >
                          <option value="">Select...</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                          ))}
                        </select>
                      )}

                      {field.type === 'boolean' && (
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData[field.key] || false}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.checked })}
                            className="w-5 h-5 rounded border-slate-600 bg-slate-900/50 text-blue-500 focus:ring-blue-500"
                          />
                          <span className="text-slate-300">Enable</span>
                        </label>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-slate-700 flex items-center justify-end gap-3">
                  <button
                    onClick={() => handleSave(false)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    Save as Draft
                  </button>
                  <button
                    onClick={() => handleSave(true)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
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
              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <config.icon className={`h-5 w-5 text-${config.color}-400`} />
                    <h2 className="text-lg font-semibold text-white">{config.name}</h2>
                    <span className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded-full">
                      {items.length} items
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={loadItems}
                      disabled={isLoading}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={handleCreate}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      Add New
                    </button>
                  </div>
                </div>

                {isLoading && items.length === 0 ? (
                  <div className="p-12 text-center">
                    <Loader2 className="h-8 w-8 text-slate-500 animate-spin mx-auto mb-3" />
                    <p className="text-slate-400">Loading items...</p>
                  </div>
                ) : items.length === 0 ? (
                  <div className="p-12 text-center">
                    <config.icon className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 mb-4">No {config.name.toLowerCase()} yet</p>
                    <button
                      onClick={handleCreate}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                    >
                      Create First {config.name.slice(0, -1)}
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-700">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white truncate">
                            {item.fieldData?.name || item.fieldData?.title || 'Untitled'}
                          </h3>
                          <p className="text-sm text-slate-400 truncate">
                            {item.fieldData?.slug || item.id}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            item.isDraft
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {item.isDraft ? 'Draft' : 'Published'}
                          </span>
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
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
