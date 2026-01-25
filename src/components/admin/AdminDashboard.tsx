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
  Shield,
  Image,
  Link,
  Video,
  DollarSign,
  Clock,
  MapPin,
  Tag,
  Star,
  Bell,
  FileText,
  Globe,
  Linkedin,
  Phone,
  Mail,
  Building,
  Award,
  Zap
} from 'lucide-react';

// Collection configurations with expanded fields
const COLLECTIONS = {
  announcements: {
    name: 'Announcements',
    icon: Megaphone,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Company-wide announcements and news updates',
    fields: [
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'Enter announcement title', icon: FileText },
      { key: 'content', label: 'Content', type: 'richtext', required: true, placeholder: 'Write your announcement content...', helpText: 'Supports basic HTML formatting' },
      { key: 'image', label: 'Featured Image', type: 'image', placeholder: 'https://example.com/image.jpg', helpText: 'Paste image URL (recommended: 1200x630px)', icon: Image },
      { key: 'author', label: 'Author', type: 'text', placeholder: 'e.g., HR Team, CEO Office', icon: Users },
      { key: 'category', label: 'Category', type: 'select', options: ['Company News', 'HR Update', 'Safety Alert', 'Project Update', 'Team News', 'Policy Change'], icon: Tag },
      { key: 'priority', label: 'Priority', type: 'select', options: ['Normal', 'High', 'Urgent'], icon: Bell },
      { key: 'expiration-date', label: 'Expiration Date', type: 'datetime', helpText: 'Optional: When should this announcement expire?', icon: Clock },
      { key: 'cta-text', label: 'Button Text', type: 'text', placeholder: 'e.g., Learn More, Register Now', icon: Zap },
      { key: 'cta-link', label: 'Button Link', type: 'url', placeholder: 'https://...', icon: Link },
      { key: 'is-pinned', label: 'Pin to Top', type: 'boolean', helpText: 'Pinned announcements appear first' },
    ]
  },
  events: {
    name: 'Events',
    icon: Calendar,
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-500',
    description: 'Company events, meetings, and training sessions',
    fields: [
      { key: 'name', label: 'Event Title', type: 'text', required: true, placeholder: 'Enter event name', icon: Calendar },
      { key: 'event-date', label: 'Start Date & Time', type: 'datetime', required: true, icon: Clock },
      { key: 'end-date', label: 'End Date & Time', type: 'datetime', helpText: 'Optional for multi-day events', icon: Clock },
      { key: 'banner-image', label: 'Event Banner', type: 'image', placeholder: 'https://example.com/banner.jpg', helpText: 'Recommended: 1920x600px', icon: Image },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g., Main Conference Room, Building A', icon: MapPin },
      { key: 'virtual-link', label: 'Virtual Meeting Link', type: 'url', placeholder: 'Teams/Zoom link', helpText: 'For virtual or hybrid events', icon: Video },
      { key: 'category', label: 'Event Type', type: 'select', options: ['All-Hands Meeting', 'Training', 'HR Session', 'Safety Meeting', 'Social Event', 'Workshop', 'Webinar', 'Holiday'], icon: Tag },
      { key: 'description', label: 'Description', type: 'richtext', placeholder: 'Describe the event...', helpText: 'Include agenda, what to bring, etc.' },
      { key: 'capacity', label: 'Max Capacity', type: 'number', placeholder: 'Leave empty for unlimited', icon: Users },
      { key: 'registration-link', label: 'Registration Link', type: 'url', placeholder: 'https://...', icon: Link },
      { key: 'is-mandatory', label: 'Mandatory Attendance', type: 'boolean', helpText: 'Mark if attendance is required' },
      { key: 'is-virtual', label: 'Virtual Event', type: 'boolean', helpText: 'Is this a virtual/online event?' },
    ]
  },
  jobPostings: {
    name: 'Job Postings',
    icon: Briefcase,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    description: 'Open positions and career opportunities',
    fields: [
      { key: 'name', label: 'Job Title', type: 'text', required: true, placeholder: 'e.g., Project Manager', icon: Briefcase },
      { key: 'department', label: 'Department', type: 'select', options: ['Commercial', 'Safety', 'Engineering', 'Operations', 'Admin', 'HR', 'IT', 'Finance', 'Marketing', 'Executive'], icon: Building },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g., Columbus, OH', icon: MapPin },
      { key: 'employment-type', label: 'Employment Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'], icon: Clock },
      { key: 'experience-level', label: 'Experience Level', type: 'select', options: ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Manager', 'Director', 'Executive'], icon: Award },
      { key: 'salary-min', label: 'Salary Range Min ($)', type: 'number', placeholder: '50000', icon: DollarSign },
      { key: 'salary-max', label: 'Salary Range Max ($)', type: 'number', placeholder: '75000', icon: DollarSign },
      { key: 'description', label: 'Job Description', type: 'richtext', required: true, placeholder: 'Describe the role and responsibilities...', helpText: 'Be specific about day-to-day duties' },
      { key: 'requirements', label: 'Requirements', type: 'richtext', placeholder: 'List qualifications, skills, certifications...', helpText: 'Include must-haves and nice-to-haves' },
      { key: 'benefits', label: 'Benefits Summary', type: 'textarea', placeholder: '401k, health insurance, PTO...', helpText: 'Highlight key benefits', icon: Star },
      { key: 'referral-bonus', label: 'Referral Bonus ($)', type: 'number', placeholder: '500', icon: DollarSign },
      { key: 'apply-link', label: 'Application Link', type: 'url', placeholder: 'JotForm or external link', icon: Link },
      { key: 'urgency', label: 'Hiring Urgency', type: 'select', options: ['Normal', 'Priority', 'Urgent'], icon: Zap },
      { key: 'job-is-active', label: 'Active Posting', type: 'boolean', helpText: 'Deactivate to hide from listings' },
      { key: 'is-remote', label: 'Remote Eligible', type: 'boolean', helpText: 'Can this role be done remotely?' },
      { key: 'featured', label: 'Featured Position', type: 'boolean', helpText: 'Show prominently on careers page' },
    ]
  },
  cultureStories: {
    name: 'Culture Stories',
    icon: Heart,
    color: 'pink',
    gradient: 'from-pink-500 to-rose-500',
    description: 'Employee spotlights, team wins, and company culture',
    fields: [
      { key: 'name', label: 'Story Title', type: 'text', required: true, placeholder: 'e.g., Employee Spotlight: John Smith', icon: Star },
      { key: 'type', label: 'Story Type', type: 'select', options: ['Employee Spotlight', 'Team Win', 'Recognition', 'Core Value', 'Milestone', 'Community Impact'], icon: Tag },
      { key: 'featured-image', label: 'Featured Image', type: 'image', placeholder: 'https://example.com/photo.jpg', helpText: 'Photo of employee or team', icon: Image },
      { key: 'video-url', label: 'Video URL', type: 'url', placeholder: 'YouTube or Vimeo link', helpText: 'Optional video content', icon: Video },
      { key: 'content', label: 'Full Story', type: 'richtext', placeholder: 'Tell the story...', helpText: 'Write the full story content' },
      { key: 'excerpt', label: 'Short Preview', type: 'textarea', placeholder: 'Brief preview text (2-3 sentences)', helpText: 'Shows on dashboard cards' },
      { key: 'person-name', label: 'Featured Person', type: 'text', placeholder: 'Name of employee being featured', icon: Users },
      { key: 'person-role', label: 'Their Role', type: 'text', placeholder: 'Job title', icon: Briefcase },
      { key: 'person-tenure', label: 'Years at Company', type: 'text', placeholder: 'e.g., 5 years', icon: Clock },
      { key: 'quote', label: 'Featured Quote', type: 'textarea', placeholder: 'A memorable quote from the person', icon: FileText },
      { key: 'author', label: 'Written By', type: 'text', placeholder: 'Author name', icon: Users },
      { key: 'featured', label: 'Featured Story', type: 'boolean', helpText: 'Show on dashboard' },
    ]
  },
  employees: {
    name: 'Employees',
    icon: Users,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    description: 'Employee directory and profiles',
    fields: [
      { key: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'First Last', icon: Users },
      { key: 'photo', label: 'Profile Photo', type: 'image', placeholder: 'https://example.com/photo.jpg', helpText: 'Square photo recommended (400x400px)', icon: Image },
      { key: 'role', label: 'Job Title', type: 'text', required: true, placeholder: 'e.g., Senior Project Manager', icon: Briefcase },
      { key: 'department', label: 'Department', type: 'select', options: ['Commercial', 'Safety', 'Engineering', 'Operations', 'Admin', 'HR', 'IT', 'Finance', 'Marketing', 'Executive'], icon: Building },
      { key: 'office-location', label: 'Office Location', type: 'text', placeholder: 'e.g., Columbus HQ', icon: MapPin },
      { key: 'email', label: 'Work Email', type: 'email', placeholder: 'name@jewett.com', icon: Mail },
      { key: 'phone', label: 'Work Phone', type: 'tel', placeholder: '(555) 123-4567', icon: Phone },
      { key: 'extension', label: 'Phone Extension', type: 'text', placeholder: 'ext. 123', icon: Phone },
      { key: 'linkedin', label: 'LinkedIn Profile', type: 'url', placeholder: 'https://linkedin.com/in/...', icon: Linkedin },
      { key: 'start-date', label: 'Start Date', type: 'datetime', helpText: 'When did they join the company?', icon: Calendar },
      { key: 'bio', label: 'Bio / About', type: 'textarea', placeholder: 'Brief bio or description...', helpText: 'Professional background, interests, etc.' },
      { key: 'skills', label: 'Skills & Expertise', type: 'text', placeholder: 'e.g., Project Management, OSHA, AutoCAD', helpText: 'Comma-separated list', icon: Award },
      { key: 'certifications', label: 'Certifications', type: 'text', placeholder: 'e.g., PMP, LEED AP, CPA', icon: Award },
      { key: 'is-featured', label: 'Featured Employee', type: 'boolean', helpText: 'Show on homepage spotlight' },
      { key: 'is-leadership', label: 'Leadership Team', type: 'boolean', helpText: 'Part of leadership/management' },
    ]
  },
  resources: {
    name: 'Resources',
    icon: FolderOpen,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    description: 'Documents, links, and helpful resources',
    fields: [
      { key: 'name', label: 'Resource Name', type: 'text', required: true, placeholder: 'e.g., Employee Handbook', icon: FileText },
      { key: 'thumbnail', label: 'Thumbnail Image', type: 'image', placeholder: 'https://example.com/thumbnail.jpg', helpText: 'Preview image or icon', icon: Image },
      { key: 'category', label: 'Category', type: 'select', options: ['Safety', 'HR Policies', 'Benefits', 'IT Support', 'Training', 'Forms', 'Templates', 'Procedures', 'Other'], icon: Tag },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'What is this resource for?', helpText: 'Brief description of the content' },
      { key: 'file-type', label: 'File Type', type: 'select', options: ['PDF', 'Word Doc', 'Excel', 'PowerPoint', 'Video', 'Web Link', 'Form', 'Other'], icon: FileText },
      { key: 'external-link', label: 'Resource Link', type: 'url', placeholder: 'https://...', helpText: 'Link to document or external resource', icon: Link },
      { key: 'file-size', label: 'File Size', type: 'text', placeholder: 'e.g., 2.5 MB', icon: FileText },
      { key: 'last-updated', label: 'Last Updated', type: 'datetime', helpText: 'When was this last revised?', icon: Clock },
      { key: 'version', label: 'Version', type: 'text', placeholder: 'e.g., v2.1', icon: Tag },
      { key: 'audience', label: 'Target Audience', type: 'select', options: ['All Employees', 'Field Staff', 'Office Staff', 'Management', 'New Hires', 'HR Only'], icon: Users },
      { key: 'is-required', label: 'Required Reading', type: 'boolean', helpText: 'Is this required for all employees?' },
      { key: 'is-new', label: 'Mark as New', type: 'boolean', helpText: 'Show "New" badge' },
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
                      <ColIcon className="h-5 w-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium block">{col.name}</span>
                        {isActive && col.description && (
                          <span className="text-xs opacity-75 block truncate">{col.description}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick stats */}
              <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Total fields:</span>
                  <span className="text-slate-300 font-medium">{config.fields.length}</span>
                </div>
              </div>
            </div>

            {/* Quick tips */}
            <div className="mt-4 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-white">Quick Tips</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>Use "Save as Draft" to preview before publishing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>Images need a direct URL (upload to Cloudinary/Imgur first)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>Click "Publish Site" to make all changes live</span>
                </li>
              </ul>
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
                  {config.fields.map((field) => {
                    const FieldIcon = field.icon;
                    return (
                      <div key={field.key} className="group">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                          {FieldIcon && <FieldIcon className="h-4 w-4 text-slate-500" />}
                          {field.label}
                          {field.required && <span className="text-rose-400 ml-1">*</span>}
                        </label>

                        {/* Image field with preview */}
                        {field.type === 'image' && (
                          <div className="space-y-3">
                            <div className="relative">
                              <input
                                type="url"
                                value={formData[field.key] || ''}
                                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                placeholder={field.placeholder || 'https://example.com/image.jpg'}
                                className="w-full px-4 py-3 pr-12 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              />
                              <Image className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            </div>
                            {formData[field.key] && (
                              <div className="relative rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50">
                                <img
                                  src={formData[field.key]}
                                  alt="Preview"
                                  className="w-full h-40 object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => setFormData({ ...formData, [field.key]: '' })}
                                  className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-rose-600 text-white rounded-lg transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Text, email, tel, url fields */}
                        {(field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'url') && (
                          <div className="relative">
                            <input
                              type={field.type === 'url' ? 'url' : field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text'}
                              value={formData[field.key] || ''}
                              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                              placeholder={field.placeholder}
                              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            />
                          </div>
                        )}

                        {/* Number field */}
                        {field.type === 'number' && (
                          <div className="relative">
                            <input
                              type="number"
                              value={formData[field.key] || ''}
                              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value ? parseInt(e.target.value) : '' })}
                              placeholder={field.placeholder}
                              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            />
                          </div>
                        )}

                        {/* Textarea */}
                        {field.type === 'textarea' && (
                          <textarea
                            value={formData[field.key] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            rows={3}
                            placeholder={field.placeholder}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                          />
                        )}

                        {/* Rich text */}
                        {field.type === 'richtext' && (
                          <textarea
                            value={formData[field.key] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            rows={6}
                            placeholder={field.placeholder || "Supports basic HTML formatting"}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none font-mono text-sm"
                          />
                        )}

                        {/* Datetime */}
                        {field.type === 'datetime' && (
                          <input
                            type="datetime-local"
                            value={formData[field.key]?.slice(0, 16) || ''}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                          />
                        )}

                        {/* Select dropdown */}
                        {field.type === 'select' && (
                          <select
                            value={formData[field.key] || ''}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="">Select {field.label.toLowerCase()}...</option>
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt.toLowerCase().replace(/\s+/g, '-')}>{opt}</option>
                            ))}
                          </select>
                        )}

                        {/* Boolean toggle */}
                        {field.type === 'boolean' && (
                          <label className="flex items-center gap-3 cursor-pointer group/toggle">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={formData[field.key] || false}
                                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.checked })}
                                className="sr-only peer"
                              />
                              <div className="w-12 h-6 bg-slate-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500 transition-all"></div>
                              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-6 transition-transform"></div>
                            </div>
                            <span className="text-slate-400 group-hover/toggle:text-white transition-colors">
                              {formData[field.key] ? 'Enabled' : 'Disabled'}
                            </span>
                          </label>
                        )}

                        {/* Help text */}
                        {field.helpText && (
                          <p className="mt-1.5 text-xs text-slate-500">{field.helpText}</p>
                        )}
                      </div>
                    );
                  })}
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
                    {items.map((item) => {
                      // Get image from various possible fields
                      const imageUrl = item.fieldData?.image || item.fieldData?.['banner-image'] || item.fieldData?.['featured-image'] || item.fieldData?.photo || item.fieldData?.thumbnail;
                      // Get subtitle info based on collection type
                      const subtitle = item.fieldData?.department || item.fieldData?.category || item.fieldData?.type || item.fieldData?.role;
                      const location = item.fieldData?.location || item.fieldData?.['office-location'];

                      return (
                        <div
                          key={item.id}
                          className="p-5 flex items-center justify-between hover:bg-slate-700/20 transition-colors group"
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {/* Show image thumbnail if available */}
                            {imageUrl ? (
                              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700/50">
                                <img
                                  src={imageUrl}
                                  alt=""
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br ${config.gradient}/20 flex items-center justify-center"><svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>`;
                                  }}
                                />
                              </div>
                            ) : (
                              <div className={`w-12 h-12 bg-gradient-to-br ${config.gradient}/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                                <Icon className={`h-5 w-5 text-${config.color}-400`} />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <h3 className="font-medium text-white truncate">
                                {item.fieldData?.name || item.fieldData?.title || 'Untitled'}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                {subtitle && (
                                  <span className="truncate">{subtitle}</span>
                                )}
                                {subtitle && location && <span>•</span>}
                                {location && (
                                  <span className="truncate flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {location}
                                  </span>
                                )}
                                {!subtitle && !location && (
                                  <span className="truncate">ID: {item.id.slice(0, 12)}...</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                              item.isDraft
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {item.isDraft ? 'Draft' : 'Published'}
                            </span>
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
