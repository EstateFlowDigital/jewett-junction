// Icon identifiers - these will be looked up in CollectionEditor
// Using strings instead of React components so they can be serialized across Astro/React boundary

export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'number' | 'textarea' | 'richtext' | 'datetime' | 'select' | 'boolean' | 'image' | 'file' | 'multi-image' | 'color';
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  icon?: string; // Changed from component to string identifier
  /**
   * Optional section heading. Fields that share a `group` are rendered
   * together under a collapsible heading in the admin form. Fields with no
   * group fall back to a "General" group when the collection has any groups
   * defined; otherwise the collection renders as a flat list (legacy mode).
   */
  group?: string;
}

export interface CollectionConfig {
  name: string;
  icon: string; // Changed from component to string identifier
  color: string;
  gradient: string;
  description?: string;
  slug?: string;
  fields: FieldConfig[];
}

export const COLLECTIONS: Record<string, CollectionConfig> = {
  announcements: {
    name: 'Announcements',
    icon: 'Megaphone',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Company-wide announcements and news updates',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'Enter announcement title', icon: 'FileText', group: 'Basics' },
      { key: 'content', label: 'Content', type: 'richtext', required: true, placeholder: 'Write your announcement content...', helpText: 'Supports basic HTML formatting', group: 'Basics' },
      { key: 'author', label: 'Author', type: 'text', placeholder: 'e.g., HR Team, CEO Office', icon: 'Users', group: 'Basics' },

      // Images
      { key: 'blog-body-image', label: 'Thumbnail / Body Image', type: 'image', helpText: 'Recommended: 1600×900px (16:9 landscape). Used as the card thumbnail and the hero at the top of the detail page.', icon: 'Image', group: 'Images' },
      { key: 'image', label: 'Social Sharing Image', type: 'image', helpText: 'Recommended: 1200×630px. Open Graph image used when shared on social. Used as a card fallback only when no Body Image is set.', icon: 'Image', group: 'Images' },

      // Categorization
      { key: 'news-category', label: 'News Category', type: 'select', options: ['Company News', 'HR Update', 'Safety Alert', 'Project Update', 'Team News', 'Policy Change'], icon: 'Tag', group: 'Categorization' },
      { key: 'priority-level', label: 'Priority', type: 'select', options: ['Normal', 'High', 'Urgent'], icon: 'Bell', group: 'Categorization' },
      { key: 'published-date', label: 'Published Date', type: 'datetime', helpText: 'When the announcement should appear as published. Drives the timestamp on the dashboard feed.', icon: 'Calendar', group: 'Categorization' },
      { key: 'expiration-date', label: 'Expiration Date', type: 'datetime', helpText: 'Optional — when should this announcement auto-hide?', icon: 'Clock', group: 'Categorization' },
      { key: 'is-pinned', label: 'Pin to Top', type: 'boolean', helpText: 'Pinned announcements appear first', group: 'Categorization' },

      // Call to Action
      { key: 'cta-text', label: 'Button Text', type: 'text', placeholder: 'e.g., Learn More, Register Now', icon: 'Zap', group: 'Call to Action' },
      { key: 'cta-link', label: 'Button Link', type: 'url', placeholder: 'https://...', icon: 'Link', group: 'Call to Action' },
    ]
  },
  events: {
    name: 'Events',
    icon: 'Calendar',
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-500',
    description: 'Company events, meetings, and training sessions',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'Enter event name', icon: 'Calendar', group: 'Basics' },
      { key: 'event-category', label: 'Event Type', type: 'select', options: ['All-Hands Meeting', 'Training', 'HR Session', 'Safety Meeting', 'Social Event', 'Workshop', 'Webinar', 'Holiday'], icon: 'Tag', group: 'Basics' },
      { key: 'description', label: 'Description', type: 'richtext', placeholder: 'Describe the event...', helpText: 'Include agenda, what to bring, etc.', group: 'Basics' },
      { key: 'banner-image', label: 'Event Banner', type: 'image', helpText: 'Recommended: 1920×600px (wide banner). Shown at the top of the event page.', icon: 'Image', group: 'Basics' },

      // When & Where
      { key: 'event-date', label: 'Start Date & Time', type: 'datetime', required: true, icon: 'Clock', group: 'When & Where' },
      { key: 'end-date', label: 'End Date & Time', type: 'datetime', helpText: 'Optional — fill in for multi-day events', icon: 'Clock', group: 'When & Where' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g., Main Conference Room, Building A', icon: 'MapPin', group: 'When & Where' },
      { key: 'virtual-event', label: 'Virtual Event', type: 'boolean', helpText: 'Is this a virtual or online event?', group: 'When & Where' },
      { key: 'virtual-meeting-link', label: 'Virtual Meeting Link', type: 'url', placeholder: 'Teams/Zoom link', helpText: 'Fill in if this is a virtual or hybrid event', icon: 'Video', group: 'When & Where' },

      // Registration
      { key: 'max-capacity', label: 'Max Capacity', type: 'number', placeholder: 'Leave empty for unlimited', icon: 'Users', group: 'Registration' },
      { key: 'registration-link', label: 'Registration Link', type: 'url', placeholder: 'https://...', icon: 'Link', group: 'Registration' },
      { key: 'mandatory-attendance', label: 'Mandatory Attendance', type: 'boolean', helpText: 'Mark if attendance is required', group: 'Registration' },
    ]
  },
  jobPostings: {
    name: 'Job Postings',
    icon: 'Briefcase',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    description: 'Open positions and career opportunities',
    fields: [
      // Basics
      { key: 'name', label: 'Job Title', type: 'text', required: true, placeholder: 'e.g., Project Manager', icon: 'Briefcase', group: 'Basics' },
      { key: 'job-department', label: 'Department', type: 'select', options: ['Commercial', 'Safety', 'Engineering', 'Operations', 'Admin', 'HR', 'IT', 'Finance', 'Marketing', 'Executive'], icon: 'Building', group: 'Basics' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g., Columbus, OH', icon: 'MapPin', group: 'Basics' },
      { key: 'employment-type', label: 'Employment Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'], icon: 'Clock', group: 'Basics' },
      { key: 'experience-level', label: 'Experience Level', type: 'select', options: ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Manager', 'Director', 'Executive'], icon: 'Award', group: 'Basics' },

      // Compensation
      { key: 'salary-min', label: 'Salary Range — Min ($)', type: 'number', placeholder: '50000', icon: 'DollarSign', group: 'Compensation' },
      { key: 'salary-max', label: 'Salary Range — Max ($)', type: 'number', placeholder: '75000', icon: 'DollarSign', group: 'Compensation' },
      { key: 'referral-bonus', label: 'Referral Bonus ($)', type: 'number', placeholder: '500', helpText: 'Leaves blank to use the default from Site Settings', icon: 'DollarSign', group: 'Compensation' },
      { key: 'benefits', label: 'Benefits Summary', type: 'textarea', placeholder: '401k, health insurance, PTO...', helpText: 'Highlight key benefits', icon: 'Star', group: 'Compensation' },

      // Description
      { key: 'description', label: 'Job Description', type: 'richtext', required: true, placeholder: 'Describe the role and responsibilities...', helpText: 'Be specific about day-to-day duties', group: 'Description' },
      { key: 'requirements', label: 'Requirements', type: 'richtext', placeholder: 'List qualifications, skills, certifications...', helpText: 'Include must-haves and nice-to-haves', group: 'Description' },

      // Display & Status
      { key: 'apply-link', label: 'Application Link', type: 'url', placeholder: 'JotForm or external link', icon: 'Link', group: 'Display & Status' },
      { key: 'urgency', label: 'Hiring Urgency', type: 'select', options: ['Normal', 'Priority', 'Urgent'], icon: 'Zap', group: 'Display & Status' },
      { key: 'job-is-active', label: 'Active Posting', type: 'boolean', helpText: 'Deactivate to hide from listings without deleting', group: 'Display & Status' },
      { key: 'is-remote', label: 'Remote Eligible', type: 'boolean', helpText: 'Can this role be done remotely?', group: 'Display & Status' },
      { key: 'featured', label: 'Featured Position', type: 'boolean', helpText: 'Show prominently on the Careers page', group: 'Display & Status' },
    ]
  },
  cultureStories: {
    name: 'Culture Stories',
    icon: 'Heart',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-500',
    description: 'Employee spotlights, team wins, and company culture',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'e.g., Employee Spotlight: John Smith', icon: 'Star', group: 'Basics' },
      { key: 'story-type', label: 'Story Type', type: 'select', options: ['Employee Spotlight', 'Team Win', 'Recognition', 'Core Value', 'Milestone', 'Community Impact'], helpText: 'Controls placement on the Culture page: Employee Spotlight → Spotlight carousel; Team Win → Team Wins; everything else (Recognition, Milestone, Community Impact, Core Value) → Recent Recognitions.', icon: 'Tag', group: 'Basics' },
      { key: 'excerpt', label: 'Short Preview', type: 'textarea', placeholder: 'Brief preview text (2-3 sentences)', helpText: 'Shows on dashboard cards', group: 'Basics' },
      { key: 'content', label: 'Full Story', type: 'richtext', placeholder: 'Tell the story...', group: 'Basics' },

      // Media
      { key: 'featured-image', label: 'Featured Image', type: 'image', helpText: 'Recommended: 1200×800px (3:2 landscape). Photo of employee or team.', icon: 'Image', group: 'Media' },
      { key: 'video-url', label: 'Video URL', type: 'url', placeholder: 'YouTube or Vimeo link', helpText: 'Optional video content', icon: 'Video', group: 'Media' },

      // Featured Person
      { key: 'person-name', label: 'Featured Person', type: 'text', placeholder: 'Name of employee being featured', icon: 'Users', group: 'Featured Person' },
      { key: 'person-role', label: 'Their Role', type: 'text', placeholder: 'Job title', icon: 'Briefcase', group: 'Featured Person' },
      { key: 'person-tenure', label: 'Years at Company', type: 'text', placeholder: 'e.g., 5 years', icon: 'Clock', group: 'Featured Person' },
      { key: 'quote', label: 'Featured Quote', type: 'textarea', placeholder: 'A memorable quote from the person', icon: 'FileText', group: 'Featured Person' },

      // Publishing
      { key: 'author', label: 'Nominated By / Written By', type: 'text', placeholder: 'e.g., Jane Smith', helpText: 'On Employee Spotlights this shows as "Nominated by <name>". On Team Wins and Recognitions it shows as the attribution line "— <name>".', icon: 'Users', group: 'Publishing' },
      { key: 'published-date', label: 'Published Date', type: 'datetime', helpText: 'Sort order on the Culture page is newest first by this date.', icon: 'Calendar', group: 'Publishing' },
      { key: 'featured', label: 'Featured Story', type: 'boolean', helpText: 'Show on the dashboard Culture Corner', group: 'Publishing' },
    ]
  },
  employees: {
    name: 'Employees',
    icon: 'Users',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    description: 'Employee directory and profiles',
    fields: [
      // Basics
      { key: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'First Last', icon: 'Users', group: 'Basics' },
      { key: 'photo', label: 'Profile Photo', type: 'image', helpText: 'Recommended: 400×400px (square). Used on the employee directory.', icon: 'Image', group: 'Basics' },
      { key: 'role', label: 'Job Title', type: 'text', required: true, placeholder: 'e.g., Senior Project Manager', icon: 'Briefcase', group: 'Basics' },
      { key: 'dept', label: 'Department', type: 'select', options: ['Executive', 'Estimating', 'Design', 'Finance', 'Field Operations', 'Pre-Construction', 'HR', 'Marketing', 'Office Operations'], icon: 'Building', group: 'Basics' },

      // Contact
      { key: 'email', label: 'Work Email', type: 'email', placeholder: 'name@jewett.com', icon: 'Mail', group: 'Contact' },
      { key: 'phone', label: 'Work Phone', type: 'tel', placeholder: 'e.g., 614-555-0100', icon: 'Phone', group: 'Contact' },
      { key: 'extension', label: 'Phone Extension', type: 'text', placeholder: 'ext. 123', icon: 'Phone', group: 'Contact' },
      { key: 'office-location', label: 'Office Location', type: 'text', placeholder: 'e.g., Columbus HQ', icon: 'MapPin', group: 'Contact' },
      { key: 'linkedin-url', label: 'LinkedIn Profile', type: 'url', placeholder: 'https://linkedin.com/in/...', icon: 'Linkedin', group: 'Contact' },
      { key: 'support-portal-url', label: 'Support Portal URL', type: 'url', placeholder: 'https://portal.example.com/login', helpText: 'Optional. When set, the team contact card on the matching page (HR, IT, Safety, Marketing) shows this portal link INSTEAD of the email — useful for outsourced vendors like a managed IT provider.', icon: 'ExternalLink', group: 'Contact' },
      { key: 'support-portal-message', label: 'Support Portal Message', type: 'textarea', placeholder: 'For IT related issues please log in to the portal:', helpText: 'Short instruction shown above the portal link. Leave blank for a sensible default.', group: 'Contact' },

      // Background
      { key: 'start-date', label: 'Start Date', type: 'datetime', helpText: 'When did they join the company?', icon: 'Calendar', group: 'Background' },
      { key: 'bio', label: 'Bio / About', type: 'textarea', placeholder: 'Brief bio or description...', helpText: 'Professional background, interests, etc.', group: 'Background' },
      { key: 'skills', label: 'Skills & Expertise', type: 'text', placeholder: 'e.g., Project Management, OSHA, AutoCAD', helpText: 'Comma-separated list', icon: 'Award', group: 'Background' },
      { key: 'certifications', label: 'Certifications', type: 'text', placeholder: 'e.g., PMP, LEED AP, CPA', icon: 'Award', group: 'Background' },

      // Display & Roles
      { key: 'is-featured', label: 'Featured Employee', type: 'boolean', helpText: 'Show on homepage spotlight', group: 'Display & Roles' },
      { key: 'leadership-team', label: 'Leadership Team', type: 'boolean', helpText: 'Part of leadership/management', group: 'Display & Roles' },
      { key: 'page-contact-for', label: 'Page Contact For', type: 'text', placeholder: 'HR, Safety, IT, Marketing', helpText: 'Comma-separated list — this person becomes the primary contact card on each listed page. Valid values: HR, Safety, IT, Marketing. Case-insensitive. Leave blank if not a page lead.', icon: 'Star', group: 'Display & Roles' },
    ]
  },
  resources: {
    name: 'Resources',
    icon: 'FolderOpen',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    description: 'Documents, links, and helpful resources',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'e.g., Employee Handbook', icon: 'FileText', group: 'Basics' },
      { key: 'resource-category', label: 'Category', type: 'select', options: ['Safety', 'HR Policies', 'Benefits', 'IT Support', 'Training', 'Forms', 'Templates', 'Procedures', 'Other'], icon: 'Tag', group: 'Basics' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'What is this resource for?', helpText: 'Brief description of the content', group: 'Basics' },
      { key: 'thumbnail', label: 'Thumbnail Image', type: 'image', helpText: 'Recommended: 600×600px (square). Used as the resource card preview.', icon: 'Image', group: 'Basics' },
      { key: 'icon', label: 'Icon', type: 'image', helpText: 'Optional. Small icon shown on the resource detail page header in place of the default folder glyph. Square SVG/PNG recommended.', icon: 'Image', group: 'Basics' },

      // File / Link
      { key: 'file-type', label: 'File Type', type: 'select', options: ['PDF', 'Word Doc', 'Excel', 'PowerPoint', 'Video', 'Web Link', 'Form', 'Other'], icon: 'FileText', group: 'File / Link' },
      { key: 'file', label: 'Document File (PDF)', type: 'file', helpText: 'Upload a PDF — employees can preview in-browser and download', icon: 'FileText', group: 'File / Link' },
      { key: 'external-link', label: 'External Link', type: 'url', placeholder: 'https://...', helpText: 'Use instead of file upload for third-party resources', icon: 'Link', group: 'File / Link' },
      { key: 'file-size', label: 'File Size', type: 'text', placeholder: 'e.g., 2.5 MB', icon: 'FileText', group: 'File / Link' },

      // Metadata
      { key: 'last-updated', label: 'Last Updated', type: 'datetime', helpText: 'When was this last revised?', icon: 'Clock', group: 'Metadata' },
      { key: 'version', label: 'Version', type: 'text', placeholder: 'e.g., v2.1', icon: 'Tag', group: 'Metadata' },
      { key: 'audience', label: 'Target Audience', type: 'select', options: ['All Employees', 'Field Staff', 'Office Staff', 'Management', 'New Hires', 'HR Only'], icon: 'Users', group: 'Metadata' },
      { key: 'is-required', label: 'Required Reading', type: 'boolean', helpText: 'Required for all employees in the target audience', group: 'Metadata' },
      { key: 'is-new', label: 'Mark as New', type: 'boolean', helpText: 'Show "New" badge on the resource card', group: 'Metadata' },
    ]
  },
  hrContent: {
    name: 'HR Content',
    icon: 'HeartHandshake',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-500',
    slug: 'hr-content',
    description: 'HR policies, benefits, and employee resources',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'e.g., PTO Policy', icon: 'FileText', group: 'Basics' },
      { key: 'content-type', label: 'Content Type', type: 'select', options: ['Policy', 'Benefit', 'Form', 'FAQ', 'Announcement', 'Training', 'Procedure'], icon: 'Tag', group: 'Basics' },
      { key: 'description', label: 'Short Description', type: 'textarea', placeholder: 'Brief summary...', helpText: 'Shows in card preview', group: 'Basics' },
      { key: 'full-content', label: 'Full Content', type: 'richtext', placeholder: 'Full policy or content text...', group: 'Basics' },
      { key: 'document-link', label: 'Document Link', type: 'url', placeholder: 'https://...', helpText: 'Link to PDF or external document', icon: 'Link', group: 'Basics' },

      // Icon & Appearance
      { key: 'icon', label: 'Icon Image', type: 'image', helpText: 'Recommended: 64×64px (square SVG/PNG). For dashboard tiles, prefer a single-color SVG and pair with the Icon Color field below.', icon: 'Image', group: 'Icon & Appearance' },
      { key: 'icon-color', label: 'Icon Tile Color', type: 'color', helpText: 'Background color of the icon tile on the dashboard. Leave blank to use the default theme color.', group: 'Icon & Appearance' },

      // Metadata
      { key: 'effective-date', label: 'Effective Date', type: 'datetime', helpText: 'When does this take effect?', icon: 'Calendar', group: 'Metadata' },
      { key: 'applies-to', label: 'Applies To', type: 'select', options: ['All Employees', 'Full-time', 'Part-time', 'Management', 'Field Staff', 'Office Staff'], icon: 'Users', group: 'Metadata' },
      { key: 'priority-order', label: 'Display Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first', group: 'Metadata' },
      { key: 'featured', label: 'Featured', type: 'boolean', helpText: 'Show prominently on the HR page', group: 'Metadata' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Visible on the site', group: 'Metadata' },
    ]
  },
  safetyContent: {
    name: 'Safety Content',
    icon: 'HardHat',
    color: 'orange',
    gradient: 'from-orange-500 to-red-500',
    slug: 'safety-content',
    description: 'Safety protocols, training, and alerts',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'e.g., Fall Protection Protocol', icon: 'FileText', group: 'Basics' },
      { key: 'content-type', label: 'Content Type', type: 'select', options: ['Alert', 'Training', 'Protocol', 'Certification', 'Incident Report', 'Best Practice', 'Equipment'], icon: 'Tag', group: 'Basics' },
      { key: 'severity', label: 'Severity Level', type: 'select', options: ['Info', 'Warning', 'Critical', 'Emergency'], icon: 'AlertCircle', group: 'Basics' },
      { key: 'description', label: 'Short Description', type: 'textarea', placeholder: 'Brief summary...', group: 'Basics' },
      { key: 'full-content', label: 'Full Content', type: 'richtext', placeholder: 'Full safety content...', group: 'Basics' },

      // Media & Links
      { key: 'image', label: 'Image', type: 'image', helpText: 'Recommended: 1200×800px (3:2 landscape). Used on safety cards.', icon: 'Image', group: 'Media & Links' },
      { key: 'icon-color', label: 'Icon Tile Color', type: 'color', helpText: 'Background color of the icon tile on the dashboard. Leave blank to use the default theme color.', group: 'Media & Links' },
      { key: 'document-link', label: 'Document Link', type: 'url', placeholder: 'https://...', icon: 'Link', group: 'Media & Links' },
      { key: 'video-link', label: 'Training Video', type: 'url', placeholder: 'YouTube or Vimeo link', icon: 'Video', group: 'Media & Links' },

      // Metadata
      { key: 'expiration-date', label: 'Expiration Date', type: 'datetime', helpText: 'When does this expire?', icon: 'Clock', group: 'Metadata' },
      { key: 'required-for', label: 'Required For', type: 'select', options: ['All Employees', 'Field Workers', 'Supervisors', 'New Hires', 'Specific Trades'], icon: 'Users', group: 'Metadata' },
      { key: 'priority-order', label: 'Display Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first', group: 'Metadata' },
      { key: 'featured', label: 'Featured', type: 'boolean', helpText: 'Show prominently on the Safety page', group: 'Metadata' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Visible on the site', group: 'Metadata' },
    ]
  },
  itKnowledgeBase: {
    name: 'IT Knowledge Base',
    icon: 'Monitor',
    color: 'sky',
    gradient: 'from-sky-500 to-blue-500',
    slug: 'it-knowledge-base',
    description: 'IT help articles, guides, and FAQs',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'e.g., How to Reset Your Password', icon: 'FileText', group: 'Basics' },
      { key: 'article-type', label: 'Article Type', type: 'select', options: ['FAQ', 'How-To Guide', 'Troubleshooting', 'Software', 'Hardware', 'Security', 'Policy'], icon: 'Tag', group: 'Basics' },
      { key: 'summary', label: 'Summary', type: 'textarea', placeholder: 'Brief description of this article...', helpText: 'Shows in card preview', group: 'Basics' },
      { key: 'full-content', label: 'Full Content', type: 'richtext', placeholder: 'Step-by-step instructions...', group: 'Basics' },

      // Media & Links
      { key: 'icon', label: 'Icon Image', type: 'image', helpText: 'Recommended: 64×64px (square SVG/PNG). Pair with the Icon Color field for tinted dashboard tiles.', icon: 'Image', group: 'Media & Links' },
      { key: 'icon-color', label: 'Icon Tile Color', type: 'color', helpText: 'Background color of the icon tile on the dashboard. Leave blank to use the default theme color.', group: 'Media & Links' },
      { key: 'video-tutorial', label: 'Video Tutorial', type: 'url', placeholder: 'YouTube or Loom link', icon: 'Video', group: 'Media & Links' },
      { key: 'download-link', label: 'Download Link', type: 'url', placeholder: 'Link to software or file', icon: 'Link', group: 'Media & Links' },

      // Metadata
      { key: 'platform', label: 'Platform', type: 'select', options: ['Windows', 'Mac', 'Mobile', 'Web', 'All'], icon: 'Monitor', group: 'Metadata' },
      { key: 'difficulty', label: 'Difficulty', type: 'select', options: ['Easy', 'Intermediate', 'Advanced'], icon: 'Award', group: 'Metadata' },
      { key: 'featured', label: 'Featured', type: 'boolean', helpText: 'Show on the IT Helpdesk homepage', group: 'Metadata' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Visible on the site', group: 'Metadata' },

      // Stats (auto-tracked)
      { key: 'views', label: 'View Count', type: 'number', placeholder: '0', helpText: 'Tracks article popularity — usually auto-incremented', group: 'Stats' },
      { key: 'helpful-votes', label: 'Helpful Votes', type: 'number', placeholder: '0', helpText: 'Employee upvotes on this article', group: 'Stats' },
    ]
  },
  marketingAssets: {
    name: 'Marketing Assets',
    icon: 'Palette',
    color: 'rose',
    gradient: 'from-fuchsia-500 to-pink-500',
    slug: 'marketing-assets',
    description: 'Brand assets, templates, and marketing materials',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'e.g., Company Logo - Primary', icon: 'FileText', group: 'Basics' },
      { key: 'asset-type', label: 'Asset Type', type: 'select', options: ['Logo', 'Template', 'Photo', 'Video', 'Presentation', 'Letterhead', 'Signage', 'Brand Guide'], helpText: 'Brand Assets page shows: Logo, Brand Guide. Letterhead & Forms shows: Letterhead, Template. Presentations shows: Presentation. Photo Library shows: Photo, Video.', icon: 'Tag', group: 'Basics' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'What is this asset for?', group: 'Basics' },

      // Preview Images
      { key: 'thumbnail', label: 'Thumbnail', type: 'image', helpText: 'Recommended: 600×600px (square). Small preview on the asset grid.', icon: 'Image', group: 'Preview Images' },
      { key: 'preview-image', label: 'Full Preview', type: 'image', helpText: 'Recommended: 1600×1067px. Shown when expanding an asset.', icon: 'Image', group: 'Preview Images' },

      // File
      { key: 'download-link', label: 'Download Link', type: 'url', placeholder: 'https://...', helpText: 'Where employees can download this asset', icon: 'Link', group: 'File' },
      { key: 'file-format', label: 'File Format', type: 'select', options: ['PNG', 'JPG', 'SVG', 'PDF', 'PPTX', 'DOCX', 'AI', 'PSD', 'MP4'], icon: 'FileText', group: 'File' },
      { key: 'file-size', label: 'File Size', type: 'text', placeholder: 'e.g., 2.5 MB', group: 'File' },
      { key: 'version', label: 'Version', type: 'text', placeholder: 'v1.0', group: 'File' },

      // Usage
      { key: 'usage-guidelines', label: 'Usage Guidelines', type: 'richtext', placeholder: 'How and when to use this asset...', group: 'Usage' },
      { key: 'tags', label: 'Tags', type: 'text', placeholder: 'logo, primary, blue', helpText: 'Comma-separated keywords for search', group: 'Usage' },
      { key: 'featured', label: 'Featured', type: 'boolean', helpText: 'Show prominently on the Marketing Hub', group: 'Usage' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Available for download', group: 'Usage' },
    ]
  },
  submittedIdeas: {
    name: 'Submitted Ideas',
    icon: 'Lightbulb',
    color: 'yellow',
    gradient: 'from-yellow-500 to-amber-500',
    slug: 'submitted-ideas',
    description: 'Employee suggestions and improvement ideas',
    fields: [
      // Submission
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'Brief title for the idea', icon: 'Lightbulb', group: 'Submission' },
      { key: 'category', label: 'Category', type: 'select', options: ['Process Improvement', 'Safety', 'Cost Savings', 'Culture', 'Technology', 'Training', 'Other'], helpText: 'Marketing/Resource requests come in under "Other" — check the description for the real category', icon: 'Tag', group: 'Submission' },
      { key: 'description', label: 'Full Description', type: 'richtext', placeholder: 'Detailed description of the idea...', group: 'Submission' },

      // Submitter
      { key: 'submitted-by', label: 'Submitted By', type: 'text', placeholder: 'Employee name', icon: 'Users', group: 'Submitter' },
      { key: 'email', label: 'Submitter Email', type: 'email', placeholder: 'email@company.com', icon: 'Mail', group: 'Submitter' },
      { key: 'department', label: 'Department', type: 'text', placeholder: 'Which department?', icon: 'Building', group: 'Submitter' },

      // Triage
      { key: 'status', label: 'Status', type: 'select', options: ['New', 'Under Review', 'Approved', 'In Progress', 'Implemented', 'Declined'], icon: 'Tag', group: 'Triage' },
      { key: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High'], icon: 'Zap', group: 'Triage' },
      { key: 'admin-notes', label: 'Internal Notes', type: 'richtext', placeholder: 'Internal notes about this idea...', helpText: 'Not visible to submitter', group: 'Triage' },
      { key: 'votes', label: 'Votes', type: 'number', placeholder: '0', helpText: 'Employee upvotes', group: 'Triage' },
      { key: 'featured', label: 'Featured', type: 'boolean', helpText: 'Highlight this idea in admin views', group: 'Triage' },
    ]
  },
  blogPosts: {
    name: 'Blog Posts',
    icon: 'BookOpen',
    color: 'teal',
    gradient: 'from-teal-500 to-emerald-500',
    slug: 'blog-posts',
    description: 'Blog articles and company news',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'Enter blog post title', icon: 'FileText', group: 'Basics' },
      { key: 'date', label: 'Publish Date', type: 'datetime', helpText: 'When to publish this post', icon: 'Calendar', group: 'Basics' },

      // Images
      { key: 'main-image', label: 'Thumbnail Image', type: 'image', helpText: 'Recommended: 1200\u00d7800px (3:2 landscape). Used on listing cards.', icon: 'Image', group: 'Images' },
      { key: 'main-image-alt-text', label: 'Thumbnail Alt Text', type: 'text', placeholder: 'Describe the image\u2026', helpText: 'For accessibility and SEO', icon: 'FileText', group: 'Images' },
      { key: 'blog-body-image', label: 'Body Image', type: 'image', helpText: 'Recommended: 1600\u00d7900px (16:9). Hero image at the top of the article.', icon: 'Image', group: 'Images' },
      { key: 'blog-body-image-alt', label: 'Body Image Alt Text', type: 'text', placeholder: 'Describe the body image\u2026', helpText: 'For accessibility and SEO', icon: 'FileText', group: 'Images' },

      // Page Content
      { key: 'blog-page-heading-h1', label: 'Page Heading (H1)', type: 'richtext', placeholder: 'Main page heading\u2026', group: 'Page Content' },
      { key: 'blog-page-short-description', label: 'Page Description', type: 'richtext', placeholder: 'Brief description for the blog page\u2026', group: 'Page Content' },
      { key: 'blog-long-description', label: 'Full Article Content', type: 'richtext', placeholder: 'Write the full blog post content\u2026', group: 'Page Content' },

      // Card Display
      { key: 'blog-card-title-h2', label: 'Card Title (H2)', type: 'richtext', placeholder: 'Title for blog card\u2026', helpText: 'Shown on listing cards', group: 'Card Display' },
      { key: 'blog-card-title-h3', label: 'Card Subtitle (H3)', type: 'richtext', placeholder: 'Subtitle for blog card\u2026', group: 'Card Display' },
      { key: 'blog-card-short-description', label: 'Card Description', type: 'richtext', placeholder: 'Short description for card view\u2026', group: 'Card Display' },

      // Additional Media
      { key: 'cdn-image-visibility', label: 'Show CDN Image', type: 'boolean', helpText: 'Display the extra CDN image block on the article page', group: 'Additional Media' },
      { key: 'cdn-image-url', label: 'CDN Image URL', type: 'text', placeholder: 'https://...', icon: 'Link', group: 'Additional Media' },
      { key: 'video-visibility', label: 'Show Video', type: 'boolean', helpText: 'Display the video embed on the article page', group: 'Additional Media' },
      { key: 'video', label: 'Video URL', type: 'text', placeholder: 'Video embed URL', icon: 'Video', group: 'Additional Media' },
      { key: 'additional-content-visibility', label: 'Show Additional Content', type: 'boolean', helpText: 'Display the optional secondary content block', group: 'Additional Media' },

      // Image Layout — fine-tunes how images render on the public article page
      { key: 'min-image-height', label: 'Min Image Height', type: 'text', placeholder: 'e.g., 25rem', helpText: 'CSS min-height for the body image. Leave blank for default.', group: 'Image Layout' },
      { key: 'object-position-2', label: 'Image Object Position', type: 'text', placeholder: 'e.g., center top', helpText: 'CSS object-position for the body image. Leave blank for center.', group: 'Image Layout' },

      // Inline Gallery — up to 2 gallery slots shown mid-article
      { key: 'gallery-image-1-visibility', label: 'Show Gallery Image 1', type: 'boolean', group: 'Inline Gallery' },
      { key: 'gallery-image-1', label: 'Gallery Image 1 URL', type: 'text', placeholder: 'https://...', icon: 'Image', group: 'Inline Gallery' },
      { key: 'gallery-image-1-alt-text', label: 'Gallery Image 1 Alt Text', type: 'text', placeholder: 'Describe the image…', group: 'Inline Gallery' },
      { key: 'gallery-image-2-visibility', label: 'Show Gallery Image 2', type: 'boolean', group: 'Inline Gallery' },
      { key: 'gallery-image-2', label: 'Gallery Image 2 URL', type: 'text', placeholder: 'https://...', icon: 'Image', group: 'Inline Gallery' },
      { key: 'gallery-image-2-alt-text', label: 'Gallery Image 2 Alt Text', type: 'text', placeholder: 'Describe the image…', group: 'Inline Gallery' },

      // SEO
      { key: 'seo-title-tag', label: 'SEO Title', type: 'text', placeholder: 'SEO title tag', helpText: 'Used in the browser tab and search results (50\u201360 chars)', icon: 'Tag', group: 'SEO' },
      { key: 'seo-meta-description', label: 'SEO Description', type: 'text', placeholder: 'SEO meta description', helpText: '150\u2013160 characters for search results', icon: 'Tag', group: 'SEO' },

      // Relationships (advanced \u2014 IDs only)
      { key: 'blog-category', label: 'Blog Category (ID)', type: 'text', helpText: 'Webflow item ID from the Blog Categories collection', icon: 'Tag', group: 'Relationships' },
      { key: 'blog-related-to-industry', label: 'Related Industry (ID)', type: 'text', helpText: 'Webflow item ID from the Industries collection', icon: 'Link', group: 'Relationships' },
      { key: 'airtable-id', label: 'Airtable ID', type: 'text', helpText: 'Sync key \u2014 set automatically by the Airtable integration', icon: 'Tag', group: 'Relationships' },
    ]
  },
  blogCategories: {
    name: 'Blog Categories',
    icon: 'Tag',
    color: 'lime',
    gradient: 'from-lime-500 to-green-500',
    slug: 'blog-categories',
    description: 'Categories for organizing blog posts',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'Enter category name', icon: 'Tag', group: 'Basics' },
      { key: 'category-name-eyebrow-text', label: 'Eyebrow Text', type: 'text', placeholder: 'Small text above heading', helpText: 'Small label shown above the page heading', icon: 'FileText', group: 'Basics' },

      // Image
      { key: 'main-image', label: 'Category Image', type: 'image', helpText: 'Recommended: 1600\u00d71067px (3:2 landscape). Used as the category hero.', icon: 'Image', group: 'Image' },
      { key: 'main-image-alt-text', label: 'Image Alt Text', type: 'text', placeholder: 'Describe the image...', helpText: 'For accessibility and SEO', icon: 'FileText', group: 'Image' },

      // Page Content
      { key: 'category-page-heading-h1', label: 'Page Heading (H1)', type: 'richtext', placeholder: 'Main category page heading...', group: 'Page Content' },
      { key: 'category-long-description', label: 'Full Description', type: 'richtext', placeholder: 'Full category description...', group: 'Page Content' },

      // Card Display
      { key: 'category-card-title-h2', label: 'Card Title (H2)', type: 'richtext', placeholder: 'Title for category card...', group: 'Card Display' },
      { key: 'category-card-short-description', label: 'Card Description', type: 'richtext', placeholder: 'Short description for card view...', group: 'Card Display' },

      // SEO & Sync
      { key: 'seo-title-tag', label: 'SEO Title', type: 'text', placeholder: 'SEO title tag', helpText: 'Used in the browser tab and search results (50\u201360 chars)', icon: 'Tag', group: 'SEO & Sync' },
      { key: 'seo-meta-description', label: 'SEO Description', type: 'text', placeholder: 'SEO meta description', helpText: '150\u2013160 characters for search results', icon: 'Tag', group: 'SEO & Sync' },
      { key: 'airtable-id', label: 'Airtable ID', type: 'text', helpText: 'Sync key \u2014 set automatically by the Airtable integration', icon: 'Tag', group: 'SEO & Sync' },
    ]
  },
  faqs: {
    name: 'FAQs',
    icon: 'CircleHelp',
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-500',
    slug: 'frequently-asked-questions',
    description: 'Frequently asked questions',
    fields: [
      // Question & Answer
      { key: 'name', label: 'Question', type: 'text', required: true, placeholder: 'Enter the FAQ question', icon: 'CircleHelp', group: 'Question & Answer' },
      { key: 'faq-short-answer', label: 'Short Answer', type: 'richtext', placeholder: 'Brief answer to the question...', helpText: 'Shown on listing/accordion views', group: 'Question & Answer' },
      { key: 'faq-long-answer', label: 'Long Answer', type: 'richtext', placeholder: 'Detailed answer with full explanation...', group: 'Question & Answer' },
      { key: 'faq-category', label: 'Category', type: 'select', options: ['General Construction Process', 'Regulatory Compliance & Site Preparation', 'Budget, Cost & Financing', 'Sustainability & Innovation', 'Construction Methodologies & Specialized Builds', 'Project Execution & Risk Management', 'Post-Construction & Maintenance'], icon: 'Tag', group: 'Question & Answer' },

      // Image
      { key: 'main-image', label: 'Image', type: 'image', helpText: 'Optional. Recommended: 1200×800px (3:2 landscape).', icon: 'Image', group: 'Image' },
      { key: 'main-image-alt-text', label: 'Image Alt Text', type: 'text', placeholder: 'Describe the image...', helpText: 'For accessibility and SEO', icon: 'FileText', group: 'Image' },

      // Card Display
      { key: 'faqs-card-title-h1', label: 'Card Title (H1)', type: 'richtext', placeholder: 'Title for FAQ card...', group: 'Card Display' },
      { key: 'faqs-card-title-h2', label: 'Card Title (H2)', type: 'richtext', placeholder: 'Subtitle for FAQ card...', group: 'Card Display' },
      { key: 'faqs-card-title-h3', label: 'Card Title (H3)', type: 'richtext', placeholder: 'Additional title for FAQ card...', group: 'Card Display' },

      // Relationships
      { key: 'faq-related-to-service', label: 'Related Service (ID)', type: 'text', helpText: 'Webflow item ID from the Services collection', icon: 'Link', group: 'Relationships' },
      { key: 'faq-related-to-service-area', label: 'Related Service Area (ID)', type: 'text', helpText: 'Webflow item ID from the Service Areas collection', icon: 'Link', group: 'Relationships' },

      // SEO
      { key: 'seo-title-tag', label: 'SEO Title', type: 'text', placeholder: 'SEO title tag', helpText: 'Used in the browser tab and search results (50–60 chars)', icon: 'Tag', group: 'SEO' },
      { key: 'seo-meta-description', label: 'SEO Description', type: 'text', placeholder: 'SEO meta description', helpText: '150–160 characters for search results', icon: 'Tag', group: 'SEO' },
    ]
  },
  services: {
    name: 'Services',
    icon: 'Wrench',
    color: 'slate',
    gradient: 'from-slate-500 to-zinc-500',
    slug: 'services',
    description: 'Company services offered',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'Enter service name', icon: 'FileText', group: 'Basics' },
      { key: 'sort-order', label: 'Display Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first', group: 'Basics' },
      { key: 'icon-svg-path-1', label: 'Icon SVG Path', type: 'text', placeholder: 'SVG path data for icon', helpText: 'Custom inline SVG path. Advanced — leave blank for default icon.', icon: 'Star', group: 'Basics' },

      // Image
      { key: 'main-image', label: 'Main Image', type: 'image', helpText: 'Recommended: 1600×1067px (3:2 landscape). Hero image on the service page.', icon: 'Image', group: 'Image' },
      { key: 'main-image-alt-text', label: 'Image Alt Text', type: 'text', placeholder: 'Describe the image...', helpText: 'For accessibility and SEO', icon: 'FileText', group: 'Image' },

      // Page Content
      { key: 'service-page-heading-h1', label: 'Page Heading (H1)', type: 'richtext', placeholder: 'Main service page heading...', group: 'Page Content' },
      { key: 'service-page-short-description', label: 'Page Description', type: 'richtext', placeholder: 'Brief description for the service page...', group: 'Page Content' },
      { key: 'service-long-description', label: 'Full Description', type: 'richtext', placeholder: 'Full service description...', group: 'Page Content' },

      // Card Display
      { key: 'service-card-title-h2', label: 'Card Title (H2)', type: 'richtext', placeholder: 'Title for service card...', group: 'Card Display' },
      { key: 'service-card-title-h3', label: 'Card Subtitle (H3)', type: 'richtext', placeholder: 'Subtitle for service card...', group: 'Card Display' },
      { key: 'service-card-short-description', label: 'Card Description', type: 'richtext', placeholder: 'Short description for card view...', group: 'Card Display' },

      // Layout (advanced)
      { key: 'is-reversed', label: 'Layout — Is First', type: 'text', placeholder: 'Layout ordering flag', helpText: 'Advanced layout flag — leave as-is unless instructed', group: 'Layout' },
      { key: 'line-visibility', label: 'Show Decorative Line', type: 'boolean', helpText: 'Toggle the decorative divider line', group: 'Layout' },

      // SEO
      { key: 'seo-title-tag-2', label: 'SEO Title', type: 'text', placeholder: 'SEO title tag', helpText: 'Used in the browser tab and search results (50–60 chars)', icon: 'Tag', group: 'SEO' },
      { key: 'seo-meta-description-2', label: 'SEO Description', type: 'text', placeholder: 'SEO meta description', helpText: '150–160 characters for search results', icon: 'Tag', group: 'SEO' },
    ]
  },
  industries: {
    name: 'Industries',
    icon: 'Building',
    color: 'stone',
    gradient: 'from-stone-500 to-neutral-500',
    slug: 'industries',
    description: 'Industries served',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'Enter industry name', icon: 'Building', group: 'Basics' },
      { key: 'industry-button', label: 'Button Text', type: 'text', placeholder: 'Button label', icon: 'Zap', group: 'Basics' },
      { key: 'svg-icon-path-1', label: 'Icon SVG Path', type: 'text', placeholder: 'SVG path data for icon', helpText: 'Custom inline SVG path. Advanced — leave blank for default icon.', icon: 'Star', group: 'Basics' },

      // Image
      { key: 'main-image', label: 'Main Image', type: 'image', helpText: 'Recommended: 1600×1067px (3:2 landscape). Hero image on the industry page.', icon: 'Image', group: 'Image' },
      { key: 'main-image-alt-text', label: 'Image Alt Text', type: 'text', placeholder: 'Describe the image...', helpText: 'For accessibility and SEO', icon: 'FileText', group: 'Image' },

      // Page Content
      { key: 'industries-page-heading-h1', label: 'Page Heading (H1)', type: 'richtext', placeholder: 'Main industry page heading...', group: 'Page Content' },
      { key: 'industries-page-short-description', label: 'Page Description', type: 'richtext', placeholder: 'Brief description for the industry page...', group: 'Page Content' },
      { key: 'industries-long-description', label: 'Full Description', type: 'richtext', placeholder: 'Full industry description...', group: 'Page Content' },

      // Card Display
      { key: 'industries-card-title-h2', label: 'Card Title (H2)', type: 'richtext', placeholder: 'Title for industry card...', group: 'Card Display' },
      { key: 'industries-card-title-h3', label: 'Card Subtitle (H3)', type: 'richtext', placeholder: 'Subtitle for industry card...', group: 'Card Display' },
      { key: 'industries-card-short-description', label: 'Card Description', type: 'richtext', placeholder: 'Short description for card view...', group: 'Card Display' },

      // Layout (advanced)
      { key: 'is-reversed', label: 'Layout — Is First', type: 'text', placeholder: 'Layout ordering flag', helpText: 'Advanced layout flag — leave as-is unless instructed', group: 'Layout' },

      // SEO
      { key: 'seo-title-tag-2', label: 'SEO Title', type: 'text', placeholder: 'SEO title tag', helpText: 'Used in the browser tab and search results (50–60 chars)', icon: 'Tag', group: 'SEO' },
      { key: 'seo-meta-description-2', label: 'SEO Description', type: 'text', placeholder: 'SEO meta description', helpText: '150–160 characters for search results', icon: 'Tag', group: 'SEO' },
    ]
  },
  serviceAreas: {
    name: 'Service Areas',
    icon: 'MapPin',
    color: 'red',
    gradient: 'from-red-500 to-rose-500',
    slug: 'service-areas',
    description: 'Geographic service areas',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'Enter service area name', icon: 'MapPin', group: 'Basics' },

      // Image
      { key: 'main-image', label: 'Main Image', type: 'image', helpText: 'Recommended: 1600×1067px (3:2 landscape). Hero image on the service area page.', icon: 'Image', group: 'Image' },
      { key: 'main-image-alt-text', label: 'Image Alt Text', type: 'text', placeholder: 'Describe the image...', helpText: 'For accessibility and SEO', icon: 'FileText', group: 'Image' },

      // Page Content
      { key: 'service-area-page-heading-h1', label: 'Page Heading (H1)', type: 'richtext', placeholder: 'Main service area page heading...', group: 'Page Content' },
      { key: 'service-area-page-short-description', label: 'Page Description', type: 'richtext', placeholder: 'Brief description for the service area...', group: 'Page Content' },
      { key: 'service-area-long-description', label: 'Full Description', type: 'richtext', placeholder: 'Full service area description...', group: 'Page Content' },

      // Card Display
      { key: 'service-area-card-title-h2', label: 'Card Title (H2)', type: 'richtext', placeholder: 'Title for area card...', group: 'Card Display' },
      { key: 'service-area-card-title-h3', label: 'Card Subtitle (H3)', type: 'richtext', placeholder: 'Subtitle for area card...', group: 'Card Display' },
      { key: 'service-area-card-short-description', label: 'Card Description', type: 'richtext', placeholder: 'Short description for card view...', group: 'Card Display' },

      // Layout (advanced)
      { key: 'is-reversed', label: 'Layout — Is First', type: 'text', placeholder: 'Layout ordering flag', helpText: 'Advanced layout flag — leave as-is unless instructed', group: 'Layout' },

      // SEO
      { key: 'seo-title-tag-2', label: 'SEO Title', type: 'text', placeholder: 'SEO title tag', helpText: 'Used in the browser tab and search results (50–60 chars)', icon: 'Tag', group: 'SEO' },
      { key: 'seo-meta-description-2', label: 'SEO Description', type: 'text', placeholder: 'SEO meta description', helpText: '150–160 characters for search results', icon: 'Tag', group: 'SEO' },
    ]
  },
  teamMembers: {
    name: 'Team Members',
    icon: 'Users',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-500',
    slug: 'team-members',
    description: 'Company team members and staff',
    fields: [
      // Basics
      { key: 'name', label: 'Title', type: 'text', required: true, placeholder: 'Full name', icon: 'Users', group: 'Basics' },
      { key: 'title', label: 'Job Title', type: 'text', placeholder: 'e.g., Project Manager', icon: 'Briefcase', group: 'Basics' },
      { key: 'linkedin-url', label: 'LinkedIn URL', type: 'url', placeholder: 'https://linkedin.com/in/...', icon: 'Linkedin', group: 'Basics' },
      { key: 'sort-order', label: 'Display Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first', group: 'Basics' },

      // Photo
      { key: 'main-image', label: 'Photo', type: 'image', helpText: 'Recommended: 800×800px (square). Team member headshot.', icon: 'Image', group: 'Photo' },
      { key: 'main-image-alt-text', label: 'Photo Alt Text', type: 'text', placeholder: 'Describe the photo...', helpText: 'For accessibility and SEO', icon: 'FileText', group: 'Photo' },

      // Page Content
      { key: 'team-members-page-heading-h1', label: 'Page Heading (H1)', type: 'richtext', placeholder: 'Member page heading...', group: 'Page Content' },
      { key: 'team-members-page-short-description', label: 'Page Description', type: 'richtext', placeholder: 'Brief description...', group: 'Page Content' },
      { key: 'team-members-long-description', label: 'Full Bio', type: 'richtext', placeholder: 'Full team member biography...', group: 'Page Content' },

      // Card Display
      { key: 'team-members-card-title-h2', label: 'Card Title (H2)', type: 'richtext', placeholder: 'Title for member card...', group: 'Card Display' },
      { key: 'team-members-card-title-h3', label: 'Card Subtitle (H3)', type: 'richtext', placeholder: 'Subtitle for member card...', group: 'Card Display' },
      { key: 'team-members-card-short-description', label: 'Card Description', type: 'richtext', placeholder: 'Short description for card view...', group: 'Card Display' },

      // SEO
      { key: 'seo-title-tag', label: 'SEO Title', type: 'text', placeholder: 'SEO title tag', helpText: 'Used in the browser tab and search results (50–60 chars)', icon: 'Tag', group: 'SEO' },
      { key: 'seo-meta-description', label: 'SEO Description', type: 'text', placeholder: 'SEO meta description', helpText: '150–160 characters for search results', icon: 'Tag', group: 'SEO' },
    ]
  },
  ourWork: {
    name: 'Our Work',
    icon: 'Sparkles',
    color: 'amber',
    gradient: 'from-amber-500 to-yellow-500',
    slug: 'our-work',
    description: 'Project portfolio and case studies',
    fields: [
      // Basics
      { key: 'name', label: 'Project Name', type: 'text', required: true, placeholder: 'Enter project name', icon: 'FileText', group: 'Basics' },
      { key: 'architect-designer', label: 'Architect / Designer', type: 'text', placeholder: 'Architect or designer name', icon: 'Users', group: 'Basics' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'Project location', icon: 'MapPin', group: 'Basics' },
      { key: 'featured-project', label: 'Featured Project', type: 'boolean', helpText: 'Highlight this project on the Our Work landing', group: 'Basics' },
      { key: 'sort-order', label: 'Display Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first', group: 'Basics' },

      // Main Image
      { key: 'main-image', label: 'Main Image', type: 'image', helpText: 'Recommended: 1600\u00d71067px (3:2 landscape). Shows on listing cards and as the project hero.', icon: 'Image', group: 'Main Image' },
      { key: 'main-image-alt-text', label: 'Main Image Alt Text', type: 'text', placeholder: 'Describe the image\u2026', helpText: 'For accessibility and SEO', icon: 'FileText', group: 'Main Image' },

      // Page Content
      { key: 'our-work-page-heading-h1', label: 'Page Heading (H1)', type: 'richtext', placeholder: 'Main project page heading\u2026', group: 'Page Content' },
      { key: 'our-work-page-short-description', label: 'Page Description', type: 'richtext', placeholder: 'Brief project description\u2026', group: 'Page Content' },
      { key: 'intro-section-heading-h2', label: 'Intro Heading (H2)', type: 'richtext', placeholder: 'Intro section heading\u2026', group: 'Page Content' },
      { key: 'our-work-long-description', label: 'Full Project Description', type: 'richtext', placeholder: 'Full project description\u2026', group: 'Page Content' },

      // Card Display
      { key: 'our-work-card-title-h2', label: 'Card Title (H2)', type: 'richtext', placeholder: 'Title for project card\u2026', helpText: 'Shown on listing cards', group: 'Card Display' },
      { key: 'our-work-card-title-h3', label: 'Card Subtitle (H3)', type: 'richtext', placeholder: 'Subtitle for project card\u2026', group: 'Card Display' },
      { key: 'our-work-card-short-description', label: 'Card Description', type: 'richtext', placeholder: 'Short description for card view\u2026', group: 'Card Display' },

      // Media
      { key: 'video-url', label: 'Video URL', type: 'text', placeholder: 'Video embed URL', icon: 'Video', group: 'Media' },
      { key: 'gallery', label: 'Gallery (Images 1\u201325)', type: 'multi-image', helpText: 'Drag & drop up to 25 images. Recommended: 1600\u00d71067px each (max 4 MB).', icon: 'Image', group: 'Media' },
      { key: 'gallery-2', label: 'Gallery (Images 26\u201350)', type: 'multi-image', helpText: 'Overflow gallery for projects with 25+ images.', icon: 'Image', group: 'Media' },

      // SEO
      { key: 'seo-title-tag', label: 'SEO Title', type: 'text', placeholder: 'SEO title tag', helpText: 'Used in the browser tab and search results (50\u201360 chars)', icon: 'Tag', group: 'SEO' },
      { key: 'seo-meta-description', label: 'SEO Description', type: 'text', placeholder: 'SEO meta description', helpText: '150\u2013160 characters for search results', icon: 'Tag', group: 'SEO' },

      // Relationships (advanced)
      { key: 'industries', label: 'Related Industry (ID)', type: 'text', helpText: 'Webflow item ID from the Industries collection', icon: 'Link', group: 'Relationships' },
      { key: 'related-service-area', label: 'Related Service Area (ID)', type: 'text', helpText: 'Webflow item ID from the Service Areas collection', icon: 'Link', group: 'Relationships' },
      { key: 'state-2', label: 'State Reference (ID)', type: 'text', helpText: 'Webflow item ID from the Service Areas collection', icon: 'Link', group: 'Relationships' },
      { key: 'old-page-url', label: 'Legacy URL (for redirects)', type: 'text', placeholder: 'https://\u2026', helpText: 'Optional \u2014 old URL this project used to live at', icon: 'Link', group: 'Relationships' },
    ]
  },
  imageGalleries: {
    name: 'Image Galleries',
    icon: 'Image',
    color: 'fuchsia',
    gradient: 'from-fuchsia-500 to-violet-500',
    slug: 'image-gallery',
    description: 'Photo galleries and image collections',
    fields: [
      { key: 'name', label: 'Gallery Name', type: 'text', required: true, placeholder: 'Enter gallery name', icon: 'Image' },
      { key: 'main-image-file', label: 'Main Image', type: 'image', helpText: 'Primary gallery image', icon: 'Image' },
      { key: 'main-image-alt-text', label: 'Image Alt Text', type: 'text', placeholder: 'Describe the image...', icon: 'FileText' },
    ]
  },
  banner: {
    name: 'Banner Messages',
    icon: 'Sparkles',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    description: 'Rotating announcement banner at top of the dashboard',
    fields: [
      { key: 'name', label: 'Internal Name', type: 'text', required: true, placeholder: 'e.g., Construction Safety Week', helpText: 'Used only in admin — not shown to employees', icon: 'FileText' },
      { key: 'message', label: 'Banner Text', type: 'text', required: true, placeholder: 'e.g., Safety First - 4EverSafe', helpText: 'Text shown in the scrolling banner', icon: 'Megaphone' },
      { key: 'display-order', label: 'Display Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first' },
      { key: 'icon-color', label: 'Icon Color', type: 'select', options: ['amber', 'emerald', 'pink', 'cyan', 'blue', 'purple'], helpText: 'Color of the leading icon', icon: 'Palette' },
      { key: 'expiration-date', label: 'Expiration Date', type: 'datetime', helpText: 'Optional — auto-hide after this time', icon: 'Clock' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Toggle off to hide without deleting' },
    ],
  },
  jobApplications: {
    name: 'Job Applications',
    icon: 'Briefcase',
    color: 'emerald',
    gradient: 'from-emerald-500 to-green-500',
    slug: 'job-applications',
    description: 'Inbound applications from the careers page',
    fields: [
      // Applicant
      { key: 'name', label: 'Display Name', type: 'text', required: true, placeholder: 'First Last \u2014 Position', helpText: 'Auto-populated on submit; edit to re-identify', icon: 'FileText', group: 'Applicant' },
      { key: 'first-name', label: 'First Name', type: 'text', required: true, icon: 'Users', group: 'Applicant' },
      { key: 'last-name', label: 'Last Name', type: 'text', required: true, icon: 'Users', group: 'Applicant' },
      { key: 'email', label: 'Email', type: 'email', required: true, icon: 'Mail', group: 'Applicant' },
      { key: 'phone', label: 'Phone', type: 'tel', icon: 'Phone', group: 'Applicant' },
      { key: 'is-veteran', label: 'Military Veteran', type: 'boolean', group: 'Applicant' },

      // Application
      { key: 'position', label: 'Position Applied For', type: 'text', required: true, icon: 'Briefcase', group: 'Application' },
      { key: 'experience', label: 'Experience', type: 'select', options: ['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years'], icon: 'Clock', group: 'Application' },
      { key: 'referral-source', label: 'Referral Source', type: 'select', options: ['Employee Referral', 'LinkedIn', 'Indeed', 'Company Website', 'Career Fair', 'Other'], icon: 'Tag', group: 'Application' },
      { key: 'cover-letter', label: 'Cover Letter', type: 'richtext', placeholder: 'Applicant\u2019s message\u2026', group: 'Application' },
      { key: 'resume-file-name', label: 'Resume File Name', type: 'text', helpText: 'Filename only \u2014 file storage not yet wired', icon: 'FileText', group: 'Application' },
      { key: 'submitted-at', label: 'Submitted At', type: 'datetime', icon: 'Clock', group: 'Application' },

      // Triage
      { key: 'status', label: 'Status', type: 'select', options: ['New', 'Under Review', 'Contacted', 'Interviewing', 'Rejected', 'Hired'], icon: 'Zap', group: 'Triage' },
      { key: 'admin-notes', label: 'Internal Notes', type: 'richtext', placeholder: 'Private reviewer notes\u2026', helpText: 'Not visible to applicant', group: 'Triage' },
    ],
  },
  settings: {
    name: 'Site Settings',
    icon: 'Settings',
    color: 'slate',
    gradient: 'from-slate-500 to-zinc-500',
    description: 'Singleton — global contact info, portal URLs, and defaults used across the intranet',
    fields: [
      { key: 'name', label: 'Internal Name', type: 'text', required: true, placeholder: 'Site Settings', helpText: 'Identifier for this singleton; not displayed publicly', icon: 'FileText', group: 'General' },
      { key: 'ring-it-in-headline', label: 'Ring It In — Headline', type: 'text', placeholder: 'Ring It In', helpText: 'Title on the celebration gong box (Home + Culture). Clear this field to hide the box.', icon: 'Bell' },
      { key: 'ring-it-in-message', label: 'Ring It In — Message', type: 'textarea', placeholder: 'Congratulations to Preconstruction on another contract win!', helpText: 'Celebration copy under the headline.' },
      { key: 'ring-it-in-link', label: 'Ring It In — Shoutout Link', type: 'url', placeholder: '/jewett-junction/living-the-mission', helpText: 'Where the Submit your Shoutout button goes.', icon: 'Link' },

      // Emergency & Support
      { key: 'eap-phone', label: 'EAP Phone', type: 'tel', placeholder: '1-800-XXX-XXXX', helpText: 'Employee Assistance Program — surfaced on HR page', icon: 'Phone', group: 'Emergency & Support' },
      { key: 'eap-portal-url', label: 'EAP Portal URL', type: 'url', placeholder: 'https://...', helpText: 'Link to EAP self-service portal', icon: 'Link', group: 'Emergency & Support' },
      { key: 'poison-control-phone', label: 'Poison Control Phone', type: 'tel', placeholder: '1-800-222-1222', helpText: 'Surfaced on Safety emergency contacts', icon: 'Phone', group: 'Emergency & Support' },

      // IT Helpdesk
      { key: 'it-phone', label: 'IT Helpdesk Phone', type: 'tel', placeholder: 'e.g., 614-555-0100', icon: 'Phone', group: 'IT Helpdesk' },
      { key: 'it-email', label: 'IT Helpdesk Email', type: 'email', placeholder: 'helpdesk@jewett.com', icon: 'Mail', group: 'IT Helpdesk' },
      { key: 'it-hours-weekday', label: 'IT Hours — Weekday', type: 'text', placeholder: 'Mon–Fri: 7am – 6pm', icon: 'Clock', group: 'IT Helpdesk' },
      { key: 'it-hours-saturday', label: 'IT Hours — Saturday', type: 'text', placeholder: 'Saturday: 9am – 1pm', icon: 'Clock', group: 'IT Helpdesk' },
      { key: 'it-emergency-hours', label: 'IT Emergency Hours', type: 'text', placeholder: '24/7 critical issues', icon: 'Clock', group: 'IT Helpdesk' },
      { key: 'it-system-status-message', label: 'System Status Message', type: 'text', placeholder: 'All systems operational', helpText: 'Shown on the IT Helpdesk sidebar. Leave blank to hide the panel entirely.', icon: 'AlertCircle', group: 'IT Helpdesk' },
      { key: 'it-system-status-level', label: 'System Status Level', type: 'select', options: ['Operational', 'Degraded', 'Outage', 'Maintenance'], helpText: 'Drives the color of the IT status panel', icon: 'Tag', group: 'IT Helpdesk' },

      // HR & Careers
      { key: 'hr-email', label: 'HR Email', type: 'email', placeholder: 'hr@jewett.com', icon: 'Mail', group: 'HR & Careers' },
      { key: 'careers-email', label: 'Careers Email', type: 'email', placeholder: 'careers@jewett.com', icon: 'Mail', group: 'HR & Careers' },
      { key: 'default-referral-bonus', label: 'Default Referral Bonus ($)', type: 'number', placeholder: '500', helpText: 'Fallback bonus shown when a job posting has no specific value', icon: 'DollarSign', group: 'HR & Careers' },
      { key: 'hr-portal-adp', label: 'ADP Portal URL', type: 'url', placeholder: 'https://workforcenow.adp.com/...', icon: 'Link', group: 'HR & Careers' },
      { key: 'hr-portal-bcbs', label: 'BCBS Portal URL', type: 'url', placeholder: 'https://bcbs.com/...', icon: 'Link', group: 'HR & Careers' },
      { key: 'hr-portal-fidelity', label: 'Fidelity Portal URL', type: 'url', placeholder: 'https://netbenefits.fidelity.com/...', icon: 'Link', group: 'HR & Careers' },

      // Safety
      { key: 'safety-email', label: 'Safety Email', type: 'email', placeholder: 'safety@jewett.com', icon: 'Mail', group: 'Safety' },
      { key: 'safety-days-without-incident', label: 'Days Without Incident', type: 'number', placeholder: '247', helpText: 'Drives the live counter on the Safety page banner', icon: 'Award', group: 'Safety' },
      { key: 'safety-company-record-days', label: 'Company Record (Days)', type: 'number', placeholder: '312', helpText: 'All-time best streak of incident-free days', icon: 'Award', group: 'Safety' },
      { key: 'safety-training-compliance', label: 'Training Compliance %', type: 'number', placeholder: '98', helpText: 'Percentage 0-100 — rendered as N%', icon: 'Award', group: 'Safety' },
      { key: 'safety-active-sites', label: 'Active Sites', type: 'number', placeholder: '42', helpText: 'Number of active job sites', icon: 'Building', group: 'Safety' },

      // Culture Stats
      { key: 'culture-volunteer-hours', label: 'Volunteer Hours', type: 'text', placeholder: '450+', helpText: 'Annual volunteer hours — accepts string suffixes like "450+"', icon: 'Star', group: 'Culture Stats' },
      { key: 'culture-donations', label: 'Annual Donations', type: 'text', placeholder: '$125K', helpText: 'Annual donation total shown on the Culture page Community Impact banner', icon: 'DollarSign', group: 'Culture Stats' },

      // Marketing
      { key: 'marketing-email', label: 'Marketing Email', type: 'email', placeholder: 'marketing@jewett.com', icon: 'Mail', group: 'Marketing' },
      { key: 'signage-review-days', label: 'Signage: Review Time', type: 'text', placeholder: '1-2 business days', helpText: 'Shown in the Signage Request page processing timeline (step 1)', icon: 'Clock', group: 'Marketing' },
      { key: 'signage-production-days', label: 'Signage: Production Time', type: 'text', placeholder: '3-5 business days', helpText: 'Shown in the Signage Request page processing timeline (step 2)', icon: 'Clock', group: 'Marketing' },
      { key: 'signage-delivery-days', label: 'Signage: Delivery Time', type: 'text', placeholder: '1-3 business days', helpText: 'Shown in the Signage Request page processing timeline (step 3)', icon: 'Clock', group: 'Marketing' },

      // Social Media
      { key: 'social-facebook-url', label: 'Facebook URL', type: 'url', placeholder: 'https://www.facebook.com/...', helpText: 'Shown in the Marketing Hub social card', icon: 'Link', group: 'Social Media' },
      { key: 'social-instagram-url', label: 'Instagram URL', type: 'url', placeholder: 'https://www.instagram.com/...', helpText: 'Shown in the Marketing Hub social card', icon: 'Link', group: 'Social Media' },
      { key: 'social-linkedin-url', label: 'LinkedIn URL', type: 'url', placeholder: 'https://www.linkedin.com/company/...', helpText: 'Shown in the Marketing Hub social card', icon: 'Linkedin', group: 'Social Media' },
      { key: 'social-youtube-url', label: 'YouTube URL', type: 'url', placeholder: 'https://www.youtube.com/@...', helpText: 'Shown in the Marketing Hub social card', icon: 'Link', group: 'Social Media' },
      { key: 'safety-award-headline', label: 'Safety Award: Headline', type: 'text', placeholder: '2026 Forever Safety Award Winner', helpText: 'Shown on the Safety page. Leave blank to hide the whole banner.', icon: 'Award', group: 'Safety' },
      { key: 'safety-award-winner-name', label: 'Safety Award: Winner Name', type: 'text', placeholder: 'Ed Pellerin', icon: 'Users', group: 'Safety' },
      { key: 'safety-award-winner-title', label: 'Safety Award: Winner Title', type: 'text', placeholder: 'Senior Superintendent', icon: 'Briefcase', group: 'Safety' },
      { key: 'safety-award-photo', label: 'Safety Award: Photo', type: 'image', helpText: 'Headshot. Recommended 400×400px square.', icon: 'Image', group: 'Safety' },
      { key: 'safety-award-message', label: 'Safety Award: Message', type: 'text', placeholder: 'Congratulations to…', helpText: 'Optional line under the name', icon: 'FileText', group: 'Safety' },
      { key: 'marketing-apparel-store-url', label: 'Apparel Store URL', type: 'url', placeholder: 'https://...', helpText: 'Link for the Apparel Store tile on the Marketing Hub. Leave blank to hide the tile.', icon: 'Link', group: 'Social Media' },

      // Brand identity — drives the Brand Assets page swatches + typography card.
      // Leave any field blank to fall back to the built-in Jewett defaults
      // (#D22630 / #78787F / #2A2A2A, Politica / Lato).
      { key: 'brand-heading-font', label: 'Heading Font', type: 'text', placeholder: 'Politica', helpText: 'Font family name used for headings on the Brand Assets page', icon: 'FileType', group: 'Brand Identity' },
      { key: 'brand-body-font', label: 'Body Font', type: 'text', placeholder: 'Lato', helpText: 'Font family name used for body copy on the Brand Assets page', icon: 'FileType', group: 'Brand Identity' },
      { key: 'brand-color-1-name', label: 'Color 1 — Name', type: 'text', placeholder: 'Jewett Red', icon: 'Palette', group: 'Brand Identity' },
      { key: 'brand-color-1-hex', label: 'Color 1 — Hex', type: 'color', helpText: 'Primary brand color shown first on the Brand Assets page', group: 'Brand Identity' },
      { key: 'brand-color-2-name', label: 'Color 2 — Name', type: 'text', placeholder: 'Jewett Grey', icon: 'Palette', group: 'Brand Identity' },
      { key: 'brand-color-2-hex', label: 'Color 2 — Hex', type: 'color', group: 'Brand Identity' },
      { key: 'brand-color-3-name', label: 'Color 3 — Name', type: 'text', placeholder: 'Jewett Dark', icon: 'Palette', group: 'Brand Identity' },
      { key: 'brand-color-3-hex', label: 'Color 3 — Hex', type: 'color', group: 'Brand Identity' },
    ],
  },
  pageCopy: {
    name: 'Page Copy',
    icon: 'FileText',
    color: 'sky',
    gradient: 'from-sky-500 to-cyan-500',
    slug: 'page-copy',
    description: 'Editable hero and section copy for fixed pages (Careers, HR, Safety, etc.). One record per page slug.',
    fields: [
      { key: 'name', label: 'Internal Name', type: 'text', required: true, placeholder: 'e.g., Careers Page Copy', helpText: 'Identifier — not shown publicly', icon: 'FileText' },
      { key: 'slug', label: 'Page Slug', type: 'text', required: true, placeholder: 'careers', helpText: 'Matches the URL — lowercase, no slashes. Currently wired pages: "careers", "hr", "safety", "it-helpdesk", "marketing".', icon: 'Link' },
      { key: 'hero-headline', label: 'Hero Headline', type: 'text', placeholder: 'Build Your Career with a Team That Puts People First', helpText: 'Big bold headline at the top of the page', icon: 'Type' },
      { key: 'hero-subtitle', label: 'Hero Subtitle', type: 'richtext', placeholder: 'Supporting paragraph under the hero headline...', helpText: 'Body copy that introduces the page' },
      { key: 'section-headline', label: 'Section Headline', type: 'text', placeholder: 'Why Jewett Construction?', helpText: 'Optional second headline lower on the page', icon: 'Type' },
      { key: 'section-body', label: 'Section Body', type: 'richtext', placeholder: 'Body copy for the secondary section...', helpText: 'Rich-text body for the second content block' },
      { key: 'application-description', label: 'Form / Application Description', type: 'textarea', placeholder: 'Fill out the form below to get started...', helpText: 'Optional callout shown above forms on pages like Careers or Signage' },
      { key: 'subsection-1-headline', label: 'Subsection 1 Headline', type: 'text', placeholder: 'e.g., Benefits Overview', helpText: 'First main subsection title on the page (HR: Benefits Overview · Safety: Safety Alerts & Updates · IT: Common Issues & Quick Fixes · Culture: Team Wins). Leave blank to use the page default.', icon: 'Type' },
      { key: 'subsection-1-description', label: 'Subsection 1 Description', type: 'text', placeholder: 'Your comprehensive benefits package', helpText: 'One-line description under the first subsection headline. Leave blank to hide.' },
      { key: 'subsection-2-headline', label: 'Subsection 2 Headline', type: 'text', placeholder: 'e.g., Forms & Documents', helpText: 'Second main subsection title on the page (HR: Forms & Documents · Safety: Required Safety Training · IT: My Recent Tickets · Culture: Recent Recognitions). Leave blank to use the page default.', icon: 'Type' },
      { key: 'subsection-2-description', label: 'Subsection 2 Description', type: 'text', placeholder: 'Commonly used HR forms', helpText: 'One-line description under the second subsection headline. Leave blank to hide.' },
      // Generic content blocks — used by the Help page for Quick Start /
      // Navigation / Search Tips / Getting Help. Available for any page that
      // needs rich-text content sections.
      { key: 'content-block-1-title', label: 'Content Block 1 Title', type: 'text', placeholder: 'e.g., Quick Start', helpText: 'Title for the first content block (Help page uses this for "Quick Start").', icon: 'Type' },
      { key: 'content-block-1-body', label: 'Content Block 1 Body', type: 'richtext', helpText: 'Rich-text body for the first content block.' },
      { key: 'content-block-2-title', label: 'Content Block 2 Title', type: 'text', placeholder: 'e.g., Navigation', helpText: 'Title for the second content block (Help page: "Navigation").', icon: 'Type' },
      { key: 'content-block-2-body', label: 'Content Block 2 Body', type: 'richtext', helpText: 'Rich-text body for the second content block.' },
      { key: 'content-block-3-title', label: 'Content Block 3 Title', type: 'text', placeholder: 'e.g., Search Tips', helpText: 'Title for the third content block (Help page: "Search Tips").', icon: 'Type' },
      { key: 'content-block-3-body', label: 'Content Block 3 Body', type: 'richtext', helpText: 'Rich-text body for the third content block.' },
      { key: 'content-block-4-title', label: 'Content Block 4 Title', type: 'text', placeholder: 'e.g., Getting Help', helpText: 'Title for the fourth content block (Help page: "Getting Help").', icon: 'Type' },
      { key: 'content-block-4-body', label: 'Content Block 4 Body', type: 'richtext', helpText: 'Rich-text body for the fourth content block.' },
      { key: 'footer-note', label: 'Footer Note', type: 'text', placeholder: 'Jewett Junction • Your Company Intranet', helpText: 'Small text at the bottom of the page.' },
    ],
  },
  benefitLinks: {
    name: 'Benefit Links',
    icon: 'Heart',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-500',
    slug: 'benefit-links',
    description: 'Outside benefit portals shown on the HR → Benefits page',
    fields: [
      { key: 'name', label: 'Benefit Name', type: 'text', required: true, placeholder: 'e.g., Delta Dental Insurance', icon: 'Heart' },
      { key: 'url', label: 'Portal URL', type: 'url', required: true, placeholder: 'https://...', helpText: 'Opens in a new tab', icon: 'Link' },
      { key: 'description', label: 'Description', type: 'text', placeholder: 'e.g., Dental plan portal', helpText: 'Short line under the name — good place for a Web ID or login note', icon: 'FileText' },
      { key: 'icon-name', label: 'Icon Name', type: 'text', placeholder: 'Heart', helpText: 'Lucide icon name (Heart, Shield, Eye, Stethoscope, Scale, HandHeart, PiggyBank, Smile)', icon: 'Sparkles' },
      { key: 'sort-order', label: 'Sort Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Toggle off to hide without deleting' },
    ],
  },
  coreValues: {
    name: 'Core Values',
    icon: 'Heart',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-500',
    slug: 'core-values',
    description: 'Company core values displayed on the Culture page',
    fields: [
      { key: 'name', label: 'Value Name', type: 'text', required: true, placeholder: 'e.g., Safety First', icon: 'Star' },
      { key: 'tagline', label: 'Tagline', type: 'text', placeholder: 'e.g., 4EverSafe', helpText: 'Short subtitle shown under the name', icon: 'FileText' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: '1-2 sentence description', helpText: 'Body text describing the value' },
      { key: 'icon-name', label: 'Icon Name', type: 'text', placeholder: 'Shield', helpText: 'Lucide icon name (Shield, Star, Users, Target, Heart, Award, etc.)', icon: 'Sparkles' },
      { key: 'color', label: 'Accent Color', type: 'text', placeholder: 'orange', helpText: 'Tailwind color name (orange, amber, blue, emerald, pink, etc.)', icon: 'Palette' },
      { key: 'link-url', label: 'Link URL', type: 'text', placeholder: '/jewett-junction/safety', helpText: 'Optional — makes this value tile clickable. Use a relative path like /jewett-junction/safety or a full https:// URL.', icon: 'Link' },
      { key: 'sort-order', label: 'Sort Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first' },
    ],
  },
  employeeBenefits: {
    name: 'Employee Benefits',
    icon: 'Heart',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    slug: 'employee-benefits',
    description: 'Benefits highlighted on the Careers page',
    fields: [
      { key: 'name', label: 'Benefit Title', type: 'text', required: true, placeholder: 'e.g., Medical, Dental & Vision', icon: 'Heart' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Detailed description of the benefit', helpText: 'Body text shown on the careers page' },
      { key: 'icon-name', label: 'Icon Name', type: 'text', placeholder: 'Heart', helpText: 'Lucide icon name (Heart, PiggyBank, GraduationCap, Calendar, Shield, Home, Users, Gift)', icon: 'Sparkles' },
      { key: 'sort-order', label: 'Sort Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Toggle off to hide without deleting' },
    ],
  },
  companyAwards: {
    name: 'Company Awards',
    icon: 'Award',
    color: 'amber',
    gradient: 'from-amber-500 to-yellow-500',
    slug: 'company-awards',
    description: 'Awards and recognitions shown on the Careers page',
    fields: [
      { key: 'name', label: 'Award Title', type: 'text', required: true, placeholder: 'e.g., Best Company to Work For', icon: 'Award' },
      { key: 'year', label: 'Year', type: 'text', placeholder: '2024', helpText: 'Award year', icon: 'Calendar' },
      { key: 'sort-order', label: 'Sort Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Toggle off to hide without deleting' },
    ],
  },
  quickActions: {
    name: 'Quick Actions',
    icon: 'Zap',
    color: 'blue',
    gradient: 'from-blue-500 to-violet-500',
    slug: 'quick-actions',
    description: 'The action cards at the top of the Home, HR, Safety, IT, and other landing pages. Filter by Page Slug to control which page each card appears on. Adding a Description turns a card into a large box with a paragraph and a button (used for the Home page submission boxes).',
    fields: [
      { key: 'name', label: 'Internal Name', type: 'text', required: true, placeholder: 'e.g., HR — Pay & Tax Info', helpText: 'Admin-only identifier (not shown to users)', icon: 'FileText' },
      { key: 'page-slug', label: 'Page Slug', type: 'select', required: true, options: ['dashboard', 'hr', 'safety', 'it', 'marketing', 'resources', 'culture', 'careers', 'directory', 'events'], helpText: 'Which landing page this card appears on ("dashboard" = the Home page)', icon: 'Tag' },
      { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'e.g., Submit Ticket', helpText: 'Large label shown on the card', icon: 'Type' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'e.g., Get help now', helpText: 'Short description under the title' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Do you know a teammate who is living the Jewett mission? ...', helpText: 'Optional. Filling this in turns the card into a large box with a paragraph and a button — used for the Home page submission boxes. Leave blank for a small tile.', icon: 'FileText' },
      { key: 'button-label', label: 'Button Label', type: 'text', placeholder: 'Submit your Nomination', helpText: 'Call-to-action text on the button. Only used when a Description is filled in.', icon: 'Type' },
      { key: 'destination-url', label: 'Destination URL', type: 'url', placeholder: '/jewett-junction/it-ticket', helpText: 'Where the card links to. Internal paths or full URLs.', icon: 'Link' },
      { key: 'icon-name', label: 'Icon Name', type: 'text', placeholder: 'Ticket', helpText: 'Lucide icon name (case-sensitive). Examples: Ticket, Phone, Heart, DollarSign, Calendar, AlertTriangle, BookOpen, Monitor, Settings, HardHat, FolderOpen, Mail.', icon: 'Image' },
      { key: 'accent-color', label: 'Accent Color', type: 'text', placeholder: 'blue', helpText: 'Tailwind color name. Common: blue, green, red, orange, purple, yellow, amber, pink, cyan, indigo, slate.', icon: 'Palette' },
      { key: 'sort-order', label: 'Sort Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first within a page' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Toggle off to hide this card without deleting it' },
    ],
  },
  uiStrings: {
    name: 'UI Strings',
    icon: 'Type',
    color: 'slate',
    gradient: 'from-slate-500 to-zinc-500',
    slug: 'ui-strings',
    description: 'Editable badge labels, empty-state messages, and button text across the dashboard. Each entry has a fixed Slug (key) — change the Value to update the text.',
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g., HR Update Badge', helpText: 'Admin-only label so you can find this string later', icon: 'Tag' },
      { key: 'slug', label: 'Slug (Key)', type: 'text', required: true, placeholder: 'badge-hr-update', helpText: 'The lookup key used in code. Do not change unless you know what depends on it.', icon: 'Link' },
      { key: 'value', label: 'Value', type: 'text', required: true, placeholder: 'HR Update', helpText: 'The text that actually displays on the site.', icon: 'Type' },
    ],
  },
  intranetSections: {
    name: 'Intranet Sections',
    icon: 'Compass',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    slug: 'intranet-sections',
    description: 'The 12 module cards that appear on the 404 "You Lost?" page and Help page. Edit names, descriptions, icons, and order without touching code.',
    fields: [
      { key: 'name', label: 'Section Name', type: 'text', required: true, placeholder: 'e.g., HR', icon: 'Tag' },
      { key: 'destination-url', label: 'Destination URL', type: 'url', placeholder: '/jewett-junction/hr', helpText: 'The path this section links to', icon: 'Link' },
      { key: 'description', label: 'Description', type: 'text', placeholder: 'One-line description shown under the section name', helpText: 'Keep under 100 chars', icon: 'FileText' },
      { key: 'icon-svg-path', label: 'Icon SVG Path', type: 'textarea', placeholder: 'M4 6a2 2 0 012-2…', helpText: 'The `d` attribute of an SVG <path> element. Copy from a 24x24 stroke-width-2 lucide icon.' },
      { key: 'gradient', label: 'Gradient', type: 'text', placeholder: 'from-blue-500 to-cyan-500', helpText: 'Tailwind gradient classes for the icon tile.', icon: 'Palette' },
      { key: 'accent-color', label: 'Accent Color', type: 'text', placeholder: 'blue', helpText: 'Single tailwind color name used for shadow/accent tint.', icon: 'Palette' },
      { key: 'sort-order', label: 'Sort Order', type: 'number', placeholder: '1', helpText: 'Lower numbers appear first', icon: 'ArrowUpDown' },
      { key: 'is-active', label: 'Active', type: 'boolean', helpText: 'Toggle off to hide this section from the 404 hub and Help page' },
    ],
  },
  formSubmissions: {
    name: 'Form Submissions',
    icon: 'Mail',
    color: 'cyan',
    gradient: 'from-cyan-500 to-sky-500',
    slug: 'form-submissions',
    description: 'Inbound messages from native Webflow forms',
    fields: [
      { key: 'name', label: 'Display Name', type: 'text', required: true, helpText: 'Auto-generated on webhook ingest; safe to edit', icon: 'FileText' },
      { key: 'form-name', label: 'Form Name', type: 'text', helpText: 'Which Webflow form was submitted', icon: 'Tag' },
      { key: 'submitted-at', label: 'Submitted At', type: 'datetime', icon: 'Clock' },
      { key: 'submitter-name', label: 'Submitter Name', type: 'text', icon: 'Users' },
      { key: 'submitter-email', label: 'Submitter Email', type: 'email', icon: 'Mail' },
      { key: 'submitter-phone', label: 'Submitter Phone', type: 'tel', icon: 'Phone' },
      { key: 'published-path', label: 'Submitted From (Page)', type: 'text', icon: 'Link' },
      { key: 'full-response', label: 'Full Response', type: 'richtext', helpText: 'All submitted form fields' },
      { key: 'status', label: 'Status', type: 'select', options: ['New', 'Reviewed', 'Contacted', 'Qualified', 'Rejected', 'Archived'], icon: 'Zap' },
      { key: 'admin-notes', label: 'Internal Notes', type: 'richtext', helpText: 'Not visible to submitter' },
      { key: 'webflow-form-id', label: 'Webflow Form ID', type: 'text', helpText: 'Populated automatically', icon: 'Tag' },
      { key: 'submission-id', label: 'Submission ID', type: 'text', helpText: 'Unique dedup key from Webflow', icon: 'Tag' },
    ],
  },
};

export type CollectionKey = keyof typeof COLLECTIONS;
