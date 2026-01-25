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
  Zap,
  Upload,
  ImagePlus,
  HardHat,
  HeartHandshake,
  Monitor,
  Palette,
  Lightbulb,
  Database,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';

// Base path for API calls - matches the deployment path
const API_BASE = '/jewett-junction';

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
  hrContent: {
    name: 'HR Content',
    icon: HeartHandshake,
    color: 'violet',
    gradient: 'from-violet-500 to-purple-500',
    slug: 'hr-content',
    description: 'HR policies, benefits, and employee resources',
    fields: [
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'e.g., PTO Policy', icon: FileText },
      { key: 'content-type', label: 'Content Type', type: 'select', options: ['Policy', 'Benefit', 'Form', 'FAQ', 'Announcement', 'Training', 'Procedure'], icon: Tag },
      { key: 'icon', label: 'Icon Image', type: 'image', placeholder: 'https://example.com/icon.png', helpText: 'Small icon for display', icon: Image },
      { key: 'description', label: 'Short Description', type: 'textarea', placeholder: 'Brief summary...', helpText: 'Shows in card preview' },
      { key: 'content', label: 'Full Content', type: 'richtext', placeholder: 'Full policy or content text...' },
      { key: 'document-link', label: 'Document Link', type: 'url', placeholder: 'https://...', helpText: 'Link to PDF or external document', icon: Link },
      { key: 'effective-date', label: 'Effective Date', type: 'datetime', helpText: 'When does this take effect?', icon: Calendar },
      { key: 'applies-to', label: 'Applies To', type: 'select', options: ['All Employees', 'Full-time', 'Part-time', 'Management', 'Field Staff', 'Office Staff'], icon: Users },
      { key: 'priority-order', label: 'Display Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first' },
      { key: 'featured', label: 'Featured', type: 'boolean', helpText: 'Show prominently on HR page' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Visible on the site' },
    ]
  },
  safetyContent: {
    name: 'Safety Content',
    icon: HardHat,
    color: 'orange',
    gradient: 'from-orange-500 to-red-500',
    slug: 'safety-content',
    description: 'Safety protocols, training, and alerts',
    fields: [
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'e.g., Fall Protection Protocol', icon: FileText },
      { key: 'content-type', label: 'Content Type', type: 'select', options: ['Alert', 'Training', 'Protocol', 'Certification', 'Incident Report', 'Best Practice', 'Equipment'], icon: Tag },
      { key: 'image', label: 'Image', type: 'image', placeholder: 'https://example.com/image.jpg', helpText: 'Safety-related image', icon: Image },
      { key: 'severity', label: 'Severity Level', type: 'select', options: ['Info', 'Warning', 'Critical', 'Emergency'], icon: AlertCircle },
      { key: 'description', label: 'Short Description', type: 'textarea', placeholder: 'Brief summary...' },
      { key: 'content', label: 'Full Content', type: 'richtext', placeholder: 'Full safety content...' },
      { key: 'document-link', label: 'Document Link', type: 'url', placeholder: 'https://...', icon: Link },
      { key: 'video-link', label: 'Training Video', type: 'url', placeholder: 'YouTube or Vimeo link', icon: Video },
      { key: 'expiration-date', label: 'Expiration Date', type: 'datetime', helpText: 'When does this expire?', icon: Clock },
      { key: 'required-for', label: 'Required For', type: 'select', options: ['All Employees', 'Field Workers', 'Supervisors', 'New Hires', 'Specific Trades'], icon: Users },
      { key: 'priority-order', label: 'Display Order', type: 'number', placeholder: '1' },
      { key: 'featured', label: 'Featured', type: 'boolean', helpText: 'Show prominently' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Visible on the site' },
    ]
  },
  itKnowledgeBase: {
    name: 'IT Knowledge Base',
    icon: Monitor,
    color: 'sky',
    gradient: 'from-sky-500 to-blue-500',
    slug: 'it-knowledge-base',
    description: 'IT help articles, guides, and FAQs',
    fields: [
      { key: 'name', label: 'Article Title', type: 'text', required: true, placeholder: 'e.g., How to Reset Your Password', icon: FileText },
      { key: 'article-type', label: 'Article Type', type: 'select', options: ['FAQ', 'How-To Guide', 'Troubleshooting', 'Software', 'Hardware', 'Security', 'Policy'], icon: Tag },
      { key: 'icon', label: 'Icon Image', type: 'image', placeholder: 'https://example.com/icon.png', icon: Image },
      { key: 'summary', label: 'Summary', type: 'textarea', placeholder: 'Brief description of this article...' },
      { key: 'content', label: 'Full Content', type: 'richtext', placeholder: 'Step-by-step instructions...' },
      { key: 'video-link', label: 'Video Tutorial', type: 'url', placeholder: 'YouTube or Loom link', icon: Video },
      { key: 'download-link', label: 'Download Link', type: 'url', placeholder: 'Link to software or file', icon: Link },
      { key: 'platform', label: 'Platform', type: 'select', options: ['Windows', 'Mac', 'Mobile', 'Web', 'All'], icon: Monitor },
      { key: 'difficulty', label: 'Difficulty', type: 'select', options: ['Easy', 'Intermediate', 'Advanced'], icon: Award },
      { key: 'views', label: 'View Count', type: 'number', placeholder: '0', helpText: 'Tracks article popularity' },
      { key: 'helpful-votes', label: 'Helpful Votes', type: 'number', placeholder: '0' },
      { key: 'featured', label: 'Featured', type: 'boolean', helpText: 'Show on IT Helpdesk homepage' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Visible on the site' },
    ]
  },
  marketingAssets: {
    name: 'Marketing Assets',
    icon: Palette,
    color: 'fuchsia',
    gradient: 'from-fuchsia-500 to-pink-500',
    slug: 'marketing-assets',
    description: 'Brand assets, templates, and marketing materials',
    fields: [
      { key: 'name', label: 'Asset Name', type: 'text', required: true, placeholder: 'e.g., Company Logo - Primary', icon: FileText },
      { key: 'asset-type', label: 'Asset Type', type: 'select', options: ['Logo', 'Template', 'Photo', 'Video', 'Presentation', 'Letterhead', 'Signage', 'Brand Guide'], icon: Tag },
      { key: 'thumbnail', label: 'Thumbnail', type: 'image', placeholder: 'https://example.com/thumb.jpg', helpText: 'Small preview image', icon: Image },
      { key: 'preview-image', label: 'Full Preview', type: 'image', placeholder: 'https://example.com/preview.jpg', helpText: 'Larger preview image', icon: Image },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'What is this asset for?' },
      { key: 'download-link', label: 'Download Link', type: 'url', placeholder: 'https://...', icon: Link },
      { key: 'file-format', label: 'File Format', type: 'select', options: ['PNG', 'JPG', 'SVG', 'PDF', 'PPTX', 'DOCX', 'AI', 'PSD', 'MP4'], icon: FileText },
      { key: 'file-size', label: 'File Size', type: 'text', placeholder: 'e.g., 2.5 MB' },
      { key: 'usage-guidelines', label: 'Usage Guidelines', type: 'richtext', placeholder: 'How and when to use this asset...' },
      { key: 'tags', label: 'Tags', type: 'text', placeholder: 'logo, primary, blue', helpText: 'Comma-separated keywords' },
      { key: 'version', label: 'Version', type: 'text', placeholder: 'v1.0' },
      { key: 'featured', label: 'Featured', type: 'boolean', helpText: 'Show prominently' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Available for download' },
    ]
  },
  submittedIdeas: {
    name: 'Submitted Ideas',
    icon: Lightbulb,
    color: 'yellow',
    gradient: 'from-yellow-500 to-amber-500',
    slug: 'submitted-ideas',
    description: 'Employee suggestions and improvement ideas',
    fields: [
      { key: 'name', label: 'Idea Title', type: 'text', required: true, placeholder: 'Brief title for the idea', icon: Lightbulb },
      { key: 'category', label: 'Category', type: 'select', options: ['Process Improvement', 'Safety', 'Cost Savings', 'Culture', 'Technology', 'Training', 'Other'], icon: Tag },
      { key: 'description', label: 'Full Description', type: 'richtext', placeholder: 'Detailed description of the idea...' },
      { key: 'submitted-by', label: 'Submitted By', type: 'text', placeholder: 'Employee name', icon: Users },
      { key: 'submitter-email', label: 'Submitter Email', type: 'email', placeholder: 'email@company.com', icon: Mail },
      { key: 'department', label: 'Department', type: 'text', placeholder: 'Which department?', icon: Building },
      { key: 'status', label: 'Status', type: 'select', options: ['New', 'Under Review', 'Approved', 'In Progress', 'Implemented', 'Declined'], icon: Tag },
      { key: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High'], icon: Zap },
      { key: 'admin-notes', label: 'Admin Notes', type: 'richtext', placeholder: 'Internal notes about this idea...', helpText: 'Not visible to submitter' },
      { key: 'votes', label: 'Votes', type: 'number', placeholder: '0', helpText: 'Employee upvotes' },
      { key: 'featured', label: 'Featured', type: 'boolean', helpText: 'Highlight this idea' },
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

  // Upload state - tracks which field is currently uploading
  const [uploadingField, setUploadingField] = React.useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [dragOverField, setDragOverField] = React.useState<string | null>(null);

  // Sync collections state
  const [showSyncModal, setShowSyncModal] = React.useState(false);
  const [syncStatus, setSyncStatus] = React.useState<'idle' | 'loading' | 'syncing' | 'done'>('idle');
  const [existingCollections, setExistingCollections] = React.useState<any[]>([]);
  const [definedCollections, setDefinedCollections] = React.useState<any[]>([]);
  const [selectedToSync, setSelectedToSync] = React.useState<string[]>([]);
  const [syncResults, setSyncResults] = React.useState<any[]>([]);

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
      const response = await fetch(`${API_BASE}/api/admin/login`, {
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
      const response = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      let data;
      try {
        data = await response.json();
      } catch {
        setLoginError(`Server error (${response.status}): Invalid response`);
        return;
      }

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        setPassword('');
      } else {
        // Show detailed error including hints if available
        let errorMsg = data.error || 'Invalid password';
        if (data.hint) {
          errorMsg += `. ${data.hint}`;
        }
        setLoginError(errorMsg);
      }
    } catch (err: any) {
      // Network/fetch error
      console.error('Login fetch error:', err);
      setLoginError(`Connection error: ${err?.message || 'Unable to reach server'}. Make sure the site is deployed and try again.`);
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
      const response = await fetch(`/api/admin/items?collection=${activeCollection}`, {
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
      const response = await fetch(`${API_BASE}/api/admin/items`, {
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

      const response = await fetch(`${API_BASE}/api/admin/items`, {
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
      const response = await fetch(`${API_BASE}/api/admin/publish`, {
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

  // Fetch existing collections from Webflow
  const fetchCollections = async () => {
    setSyncStatus('loading');
    try {
      const response = await fetch(`${API_BASE}/api/admin/collections`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });

      if (!response.ok) throw new Error('Failed to fetch collections');

      const data = await response.json();
      setExistingCollections(data.existing || []);
      setDefinedCollections(data.defined || []);

      // Pre-select collections that don't exist yet
      const existingSlugs = new Set(data.existing.map((c: any) => c.slug));
      const missing = data.defined.filter((d: any) => !existingSlugs.has(d.slug)).map((d: any) => d.slug);
      setSelectedToSync(missing);

      setSyncStatus('idle');
    } catch (err: any) {
      setError(err.message);
      setSyncStatus('idle');
    }
  };

  // Sync selected collections to Webflow
  const syncCollections = async () => {
    if (selectedToSync.length === 0) {
      setError('Please select at least one collection to sync');
      return;
    }

    setSyncStatus('syncing');
    setSyncResults([]);

    try {
      const response = await fetch(`${API_BASE}/api/admin/collections`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ collections: selectedToSync })
      });

      if (!response.ok) throw new Error('Failed to sync collections');

      const data = await response.json();
      setSyncResults(data.results || []);
      setSyncStatus('done');
      setSuccess(`Synced ${data.summary.created} collections successfully!`);

      // Refresh the collections list
      await fetchCollections();
    } catch (err: any) {
      setError(err.message);
      setSyncStatus('idle');
    }
  };

  // Open sync modal and fetch collections
  const openSyncModal = () => {
    setShowSyncModal(true);
    setSyncResults([]);
    fetchCollections();
  };

  // Handle file upload for image fields
  const handleFileUpload = async (file: File, fieldKey: string) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG');
      return;
    }

    // Validate file size (max 4MB)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File too large. Maximum size is 4MB');
      return;
    }

    setUploadingField(fieldKey);
    setUploadProgress(0);
    setError('');

    try {
      // Create form data
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', activeCollection);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch(`${API_BASE}/api/admin/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        body: uploadFormData
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await response.json();
      setUploadProgress(100);

      // Set the URL in form data
      setFormData({ ...formData, [fieldKey]: data.url });
      setSuccess('Image uploaded successfully!');

      // Reset progress after a moment
      setTimeout(() => {
        setUploadProgress(0);
        setUploadingField(null);
      }, 500);

    } catch (err: any) {
      setError(err.message);
      setUploadingField(null);
      setUploadProgress(0);
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent, fieldKey: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(null);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0], fieldKey);
    }
  };

  const handleDragOver = (e: React.DragEvent, fieldKey: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(fieldKey);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(null);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-white truncate">Content Admin</h1>
              <p className="text-xs text-slate-400 hidden sm:block">Jewett Junction CMS</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={openSyncModal}
              className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-violet-500/20"
            >
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Sync Collections</span>
              <span className="sm:hidden">Sync</span>
            </button>

            <button
              onClick={handlePublishSite}
              disabled={isPublishing}
              className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
            >
              {isPublishing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Publish Site</span>
              <span className="sm:hidden">Publish</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 sm:px-4 sm:py-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-xl text-sm flex items-center gap-2 transition-colors border border-slate-700/50"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sync Collections Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-700/50 flex items-center justify-between bg-gradient-to-r from-violet-600/10 to-purple-600/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Sync Collections</h2>
                  <p className="text-sm text-slate-400">Create CMS collections in Webflow</p>
                </div>
              </div>
              <button
                onClick={() => setShowSyncModal(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto max-h-[50vh]">
              {syncStatus === 'loading' ? (
                <div className="text-center py-10">
                  <Loader2 className="h-10 w-10 text-violet-400 animate-spin mx-auto mb-4" />
                  <p className="text-slate-400">Fetching collections from Webflow...</p>
                </div>
              ) : syncStatus === 'syncing' ? (
                <div className="text-center py-10">
                  <Loader2 className="h-10 w-10 text-violet-400 animate-spin mx-auto mb-4" />
                  <p className="text-slate-400">Creating collections...</p>
                  <p className="text-xs text-slate-500 mt-2">This may take a moment</p>
                </div>
              ) : syncStatus === 'done' && syncResults.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white mb-3">Sync Results</h3>
                  {syncResults.map((result: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center gap-3 ${
                        result.status === 'created'
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : result.status === 'exists'
                          ? 'bg-blue-500/10 border-blue-500/30'
                          : 'bg-rose-500/10 border-rose-500/30'
                      }`}
                    >
                      {result.status === 'created' ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      ) : result.status === 'exists' ? (
                        <Check className="h-5 w-5 text-blue-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium">{result.slug}</p>
                        <p className={`text-xs ${
                          result.status === 'created' ? 'text-emerald-400' :
                          result.status === 'exists' ? 'text-blue-400' : 'text-rose-400'
                        }`}>
                          {result.message}
                        </p>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setSyncStatus('idle');
                      setSyncResults([]);
                    }}
                    className="w-full mt-4 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-xl text-sm transition-colors"
                  >
                    Sync More Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Legend */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Exists
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span> Missing
                    </span>
                  </div>

                  {/* Collections List */}
                  {definedCollections.map((col: any) => {
                    const exists = existingCollections.some((e: any) => e.slug === col.slug);
                    const isSelected = selectedToSync.includes(col.slug);

                    return (
                      <div
                        key={col.slug}
                        className={`p-4 rounded-xl border transition-all ${
                          exists
                            ? 'bg-emerald-500/5 border-emerald-500/20'
                            : isSelected
                            ? 'bg-violet-500/10 border-violet-500/50'
                            : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {!exists && (
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedToSync([...selectedToSync, col.slug]);
                                } else {
                                  setSelectedToSync(selectedToSync.filter(s => s !== col.slug));
                                }
                              }}
                              className="w-5 h-5 rounded-lg border-slate-600 bg-slate-800 text-violet-500 focus:ring-violet-500/20"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-white">{col.displayName}</span>
                              {exists ? (
                                <span className="px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">
                                  Exists
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded-full">
                                  Missing
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                              {col.fieldCount} fields • slug: {col.slug}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {definedCollections.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-amber-500/50" />
                      <p>Could not load collection definitions</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {syncStatus !== 'loading' && syncStatus !== 'syncing' && syncStatus !== 'done' && (
              <div className="p-5 border-t border-slate-700/50 flex items-center justify-between bg-slate-800/30">
                <p className="text-sm text-slate-400">
                  {selectedToSync.length} collection{selectedToSync.length !== 1 ? 's' : ''} selected
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowSyncModal(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={syncCollections}
                    disabled={selectedToSync.length === 0}
                    className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-violet-500/20"
                  >
                    <Database className="h-4 w-4" />
                    Create Collections
                  </button>
                </div>
              </div>
            )}

            {syncStatus === 'done' && (
              <div className="p-5 border-t border-slate-700/50 flex justify-end bg-slate-800/30">
                <button
                  onClick={() => setShowSyncModal(false)}
                  className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-medium transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      {(success || error) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Mobile Collection Selector */}
        <div className="lg:hidden mb-4">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Collection</label>
          <select
            value={activeCollection}
            onChange={(e) => {
              setActiveCollection(e.target.value as CollectionKey);
              setIsEditing(false);
            }}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none cursor-pointer"
          >
            {Object.entries(COLLECTIONS).map(([key, col]) => (
              <option key={key} value={key}>{col.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar - Collections (hidden on mobile) */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Collections list */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
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

              {/* Quick tips - now inside sticky container */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-medium text-white">Quick Tips</span>
                </div>
                <ul className="text-xs text-slate-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 mt-0.5">•</span>
                    <span>Click "Sync Collections" to create new CMS collections in Webflow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>Use "Save as Draft" to preview before publishing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>Drag & drop images directly or click to upload (max 4MB)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span>Click "Publish Site" to make all changes live</span>
                  </li>
                </ul>
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
                  {config.fields.map((field) => {
                    const FieldIcon = field.icon;
                    return (
                      <div key={field.key} className="group">
                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                          {FieldIcon && <FieldIcon className="h-4 w-4 text-slate-500" />}
                          {field.label}
                          {field.required && <span className="text-rose-400 ml-1">*</span>}
                        </label>

                        {/* Image field with upload and preview */}
                        {field.type === 'image' && (
                          <div className="space-y-3">
                            {/* Show preview if we have an image */}
                            {formData[field.key] ? (
                              <div className="relative rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50">
                                <img
                                  src={formData[field.key]}
                                  alt="Preview"
                                  className="w-full h-48 object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="1"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpath d="M21 15l-5-5L5 21"/%3E%3C/svg%3E';
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                    <span className="text-white text-xs truncate max-w-[60%]">{formData[field.key].split('/').pop()}</span>
                                    <button
                                      type="button"
                                      onClick={() => setFormData({ ...formData, [field.key]: '' })}
                                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Upload zone when no image */
                              <div
                                onDrop={(e) => handleDrop(e, field.key)}
                                onDragOver={(e) => handleDragOver(e, field.key)}
                                onDragLeave={handleDragLeave}
                                className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
                                  dragOverField === field.key
                                    ? 'border-blue-500 bg-blue-500/10'
                                    : 'border-slate-600/50 hover:border-slate-500 bg-slate-900/30'
                                } ${uploadingField === field.key ? 'pointer-events-none' : ''}`}
                              >
                                {uploadingField === field.key ? (
                                  /* Upload progress */
                                  <div className="text-center">
                                    <Loader2 className="h-10 w-10 text-blue-400 animate-spin mx-auto mb-3" />
                                    <p className="text-sm text-white font-medium mb-2">Uploading...</p>
                                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                                      <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                      ></div>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2">{uploadProgress}%</p>
                                  </div>
                                ) : (
                                  /* Upload prompt */
                                  <div className="text-center">
                                    <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3 border border-slate-700">
                                      <ImagePlus className="h-7 w-7 text-slate-400" />
                                    </div>
                                    <p className="text-sm text-white font-medium mb-1">
                                      Drag & drop an image here
                                    </p>
                                    <p className="text-xs text-slate-500 mb-4">or</p>
                                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-medium rounded-xl cursor-pointer transition-all shadow-lg shadow-blue-500/20">
                                      <Upload className="h-4 w-4" />
                                      Choose File
                                      <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) handleFileUpload(file, field.key);
                                          e.target.value = '';
                                        }}
                                        className="hidden"
                                      />
                                    </label>
                                    <p className="text-xs text-slate-500 mt-3">
                                      JPEG, PNG, GIF, WebP, SVG • Max 4MB
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* URL input toggle (collapsed by default) */}
                            {!formData[field.key] && !uploadingField && (
                              <details className="group">
                                <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-400 flex items-center gap-1">
                                  <Link className="h-3 w-3" />
                                  Or paste image URL
                                </summary>
                                <div className="mt-2 relative">
                                  <input
                                    type="url"
                                    value={formData[field.key] || ''}
                                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-2.5 pr-10 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white text-sm placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                  />
                                  <Image className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                </div>
                              </details>
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
