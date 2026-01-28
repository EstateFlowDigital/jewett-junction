import type { APIRoute } from 'astro';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
};

// Helper to add CORS headers to any response
function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

// Get env vars from runtime context (Cloudflare) or fallback to import.meta.env (local dev)
function getEnvVar(locals: any, key: string): string {
  const runtime = (locals as any)?.runtime;
  return runtime?.env?.[key] || (import.meta.env as any)[key];
}

// Verify admin token
function verifyToken(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token || !token.startsWith('admin_')) {
    return false;
  }

  const parts = token.split('_');
  if (parts.length !== 3) return false;

  const timestamp = parseInt(parts[2], 36);
  const now = Date.now();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  return now - timestamp <= maxAge;
}

// OPTIONS - Handle CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
};

// Collection definitions with field specifications
const COLLECTION_DEFINITIONS = {
  announcements: {
    displayName: 'Announcements',
    singularName: 'Announcement',
    slug: 'announcements',
    fields: [
      { displayName: 'Content', slug: 'content', type: 'RichText', isRequired: false },
      { displayName: 'Image', slug: 'image', type: 'Image', isRequired: false },
      { displayName: 'Author', slug: 'author', type: 'PlainText', isRequired: false },
      { displayName: 'Category', slug: 'category', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Company News' }, { name: 'HR Update' }, { name: 'Safety Alert' },
          { name: 'Project Update' }, { name: 'Team News' }, { name: 'Policy Change' }
        ]}
      },
      { displayName: 'Priority', slug: 'priority', type: 'Option', isRequired: false,
        validations: { options: [{ name: 'Normal' }, { name: 'High' }, { name: 'Urgent' }] }
      },
      { displayName: 'Expiration Date', slug: 'expiration-date', type: 'DateTime', isRequired: false },
      { displayName: 'Button Text', slug: 'cta-text', type: 'PlainText', isRequired: false },
      { displayName: 'Button Link', slug: 'cta-link', type: 'Link', isRequired: false },
      { displayName: 'Pin to Top', slug: 'is-pinned', type: 'Bool', isRequired: false },
    ]
  },
  events: {
    displayName: 'Events',
    singularName: 'Event',
    slug: 'events',
    fields: [
      { displayName: 'Event Date', slug: 'event-date', type: 'DateTime', isRequired: true },
      { displayName: 'End Date', slug: 'end-date', type: 'DateTime', isRequired: false },
      { displayName: 'Banner Image', slug: 'banner-image', type: 'Image', isRequired: false },
      { displayName: 'Location', slug: 'location', type: 'PlainText', isRequired: false },
      { displayName: 'Virtual Link', slug: 'virtual-link', type: 'Link', isRequired: false },
      { displayName: 'Event Type', slug: 'category', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'All-Hands Meeting' }, { name: 'Training' }, { name: 'HR Session' },
          { name: 'Safety Meeting' }, { name: 'Social Event' }, { name: 'Workshop' },
          { name: 'Webinar' }, { name: 'Holiday' }
        ]}
      },
      { displayName: 'Description', slug: 'description', type: 'RichText', isRequired: false },
      { displayName: 'Max Capacity', slug: 'capacity', type: 'Number', isRequired: false },
      { displayName: 'Registration Link', slug: 'registration-link', type: 'Link', isRequired: false },
      { displayName: 'Mandatory', slug: 'is-mandatory', type: 'Bool', isRequired: false },
      { displayName: 'Virtual Event', slug: 'is-virtual', type: 'Bool', isRequired: false },
    ]
  },
  'job-postings': {
    displayName: 'Job Postings',
    singularName: 'Job Posting',
    slug: 'job-postings',
    fields: [
      { displayName: 'Department', slug: 'department', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Commercial' }, { name: 'Safety' }, { name: 'Engineering' },
          { name: 'Operations' }, { name: 'Admin' }, { name: 'HR' },
          { name: 'IT' }, { name: 'Finance' }, { name: 'Marketing' }, { name: 'Executive' }
        ]}
      },
      { displayName: 'Location', slug: 'location', type: 'PlainText', isRequired: false },
      { displayName: 'Employment Type', slug: 'employment-type', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Full-time' }, { name: 'Part-time' }, { name: 'Contract' },
          { name: 'Internship' }, { name: 'Temporary' }
        ]}
      },
      { displayName: 'Experience Level', slug: 'experience-level', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Entry Level' }, { name: 'Mid Level' }, { name: 'Senior' },
          { name: 'Lead' }, { name: 'Manager' }, { name: 'Director' }, { name: 'Executive' }
        ]}
      },
      { displayName: 'Salary Min', slug: 'salary-min', type: 'Number', isRequired: false },
      { displayName: 'Salary Max', slug: 'salary-max', type: 'Number', isRequired: false },
      { displayName: 'Description', slug: 'description', type: 'RichText', isRequired: true },
      { displayName: 'Requirements', slug: 'requirements', type: 'RichText', isRequired: false },
      { displayName: 'Benefits', slug: 'benefits', type: 'PlainText', isRequired: false },
      { displayName: 'Referral Bonus', slug: 'referral-bonus', type: 'Number', isRequired: false },
      { displayName: 'Apply Link', slug: 'apply-link', type: 'Link', isRequired: false },
      { displayName: 'Urgency', slug: 'urgency', type: 'Option', isRequired: false,
        validations: { options: [{ name: 'Normal' }, { name: 'Priority' }, { name: 'Urgent' }] }
      },
      { displayName: 'Active', slug: 'job-is-active', type: 'Bool', isRequired: false },
      { displayName: 'Remote Eligible', slug: 'is-remote', type: 'Bool', isRequired: false },
      { displayName: 'Featured', slug: 'featured', type: 'Bool', isRequired: false },
    ]
  },
  'culture-stories': {
    displayName: 'Culture Stories',
    singularName: 'Culture Story',
    slug: 'culture-stories',
    fields: [
      { displayName: 'Story Type', slug: 'type', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Employee Spotlight' }, { name: 'Team Win' }, { name: 'Recognition' },
          { name: 'Core Value' }, { name: 'Milestone' }, { name: 'Community Impact' }
        ]}
      },
      { displayName: 'Featured Image', slug: 'featured-image', type: 'Image', isRequired: false },
      { displayName: 'Video URL', slug: 'video-url', type: 'Link', isRequired: false },
      { displayName: 'Content', slug: 'content', type: 'RichText', isRequired: false },
      { displayName: 'Excerpt', slug: 'excerpt', type: 'PlainText', isRequired: false },
      { displayName: 'Person Name', slug: 'person-name', type: 'PlainText', isRequired: false },
      { displayName: 'Person Role', slug: 'person-role', type: 'PlainText', isRequired: false },
      { displayName: 'Tenure', slug: 'person-tenure', type: 'PlainText', isRequired: false },
      { displayName: 'Quote', slug: 'quote', type: 'PlainText', isRequired: false },
      { displayName: 'Author', slug: 'author', type: 'PlainText', isRequired: false },
      { displayName: 'Featured', slug: 'featured', type: 'Bool', isRequired: false },
    ]
  },
  employees: {
    displayName: 'Employees',
    singularName: 'Employee',
    slug: 'employees',
    fields: [
      { displayName: 'Photo', slug: 'photo', type: 'Image', isRequired: false },
      { displayName: 'Role', slug: 'role', type: 'PlainText', isRequired: true },
      { displayName: 'Department', slug: 'department', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Commercial' }, { name: 'Safety' }, { name: 'Engineering' },
          { name: 'Operations' }, { name: 'Admin' }, { name: 'HR' },
          { name: 'IT' }, { name: 'Finance' }, { name: 'Marketing' }, { name: 'Executive' }
        ]}
      },
      { displayName: 'Office Location', slug: 'office-location', type: 'PlainText', isRequired: false },
      { displayName: 'Email', slug: 'email', type: 'Email', isRequired: false },
      { displayName: 'Phone', slug: 'phone', type: 'Phone', isRequired: false },
      { displayName: 'Extension', slug: 'extension', type: 'PlainText', isRequired: false },
      { displayName: 'LinkedIn', slug: 'linkedin', type: 'Link', isRequired: false },
      { displayName: 'Start Date', slug: 'start-date', type: 'DateTime', isRequired: false },
      { displayName: 'Bio', slug: 'bio', type: 'PlainText', isRequired: false },
      { displayName: 'Skills', slug: 'skills', type: 'PlainText', isRequired: false },
      { displayName: 'Certifications', slug: 'certifications', type: 'PlainText', isRequired: false },
      { displayName: 'Featured', slug: 'is-featured', type: 'Bool', isRequired: false },
      { displayName: 'Leadership', slug: 'is-leadership', type: 'Bool', isRequired: false },
    ]
  },
  resources: {
    displayName: 'Resources',
    singularName: 'Resource',
    slug: 'resources',
    fields: [
      { displayName: 'Thumbnail', slug: 'thumbnail', type: 'Image', isRequired: false },
      { displayName: 'Category', slug: 'category', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Safety' }, { name: 'HR Policies' }, { name: 'Benefits' },
          { name: 'IT Support' }, { name: 'Training' }, { name: 'Forms' },
          { name: 'Templates' }, { name: 'Procedures' }, { name: 'Other' }
        ]}
      },
      { displayName: 'Description', slug: 'description', type: 'PlainText', isRequired: false },
      { displayName: 'File Type', slug: 'file-type', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'PDF' }, { name: 'Word Doc' }, { name: 'Excel' }, { name: 'PowerPoint' },
          { name: 'Video' }, { name: 'Web Link' }, { name: 'Form' }, { name: 'Other' }
        ]}
      },
      { displayName: 'Resource Link', slug: 'external-link', type: 'Link', isRequired: false },
      { displayName: 'File Size', slug: 'file-size', type: 'PlainText', isRequired: false },
      { displayName: 'Last Updated', slug: 'last-updated', type: 'DateTime', isRequired: false },
      { displayName: 'Version', slug: 'version', type: 'PlainText', isRequired: false },
      { displayName: 'Audience', slug: 'audience', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'All Employees' }, { name: 'Field Staff' }, { name: 'Office Staff' },
          { name: 'Management' }, { name: 'New Hires' }, { name: 'HR Only' }
        ]}
      },
      { displayName: 'Required Reading', slug: 'is-required', type: 'Bool', isRequired: false },
      { displayName: 'Mark as New', slug: 'is-new', type: 'Bool', isRequired: false },
    ]
  },
  'hr-content': {
    displayName: 'HR Content',
    singularName: 'HR Item',
    slug: 'hr-content',
    fields: [
      { displayName: 'Content Type', slug: 'content-type', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Policy' }, { name: 'Benefit' }, { name: 'Form' }, { name: 'FAQ' },
          { name: 'Announcement' }, { name: 'Training' }, { name: 'Procedure' }
        ]}
      },
      { displayName: 'Icon', slug: 'icon', type: 'Image', isRequired: false },
      { displayName: 'Description', slug: 'description', type: 'PlainText', isRequired: false },
      { displayName: 'Full Content', slug: 'content', type: 'RichText', isRequired: false },
      { displayName: 'Document Link', slug: 'document-link', type: 'Link', isRequired: false },
      { displayName: 'Effective Date', slug: 'effective-date', type: 'DateTime', isRequired: false },
      { displayName: 'Applies To', slug: 'applies-to', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'All Employees' }, { name: 'Full-time' }, { name: 'Part-time' },
          { name: 'Management' }, { name: 'Field Staff' }, { name: 'Office Staff' }
        ]}
      },
      { displayName: 'Priority Order', slug: 'priority-order', type: 'Number', isRequired: false },
      { displayName: 'Featured', slug: 'featured', type: 'Bool', isRequired: false },
      { displayName: 'Active', slug: 'is-active', type: 'Bool', isRequired: false },
    ]
  },
  'safety-content': {
    displayName: 'Safety Content',
    singularName: 'Safety Item',
    slug: 'safety-content',
    fields: [
      { displayName: 'Content Type', slug: 'content-type', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Alert' }, { name: 'Training' }, { name: 'Protocol' }, { name: 'Certification' },
          { name: 'Incident Report' }, { name: 'Best Practice' }, { name: 'Equipment' }
        ]}
      },
      { displayName: 'Image', slug: 'image', type: 'Image', isRequired: false },
      { displayName: 'Severity', slug: 'severity', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Info' }, { name: 'Warning' }, { name: 'Critical' }, { name: 'Emergency' }
        ]}
      },
      { displayName: 'Description', slug: 'description', type: 'PlainText', isRequired: false },
      { displayName: 'Full Content', slug: 'content', type: 'RichText', isRequired: false },
      { displayName: 'Document Link', slug: 'document-link', type: 'Link', isRequired: false },
      { displayName: 'Video Link', slug: 'video-link', type: 'Link', isRequired: false },
      { displayName: 'Expiration Date', slug: 'expiration-date', type: 'DateTime', isRequired: false },
      { displayName: 'Required For', slug: 'required-for', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'All Employees' }, { name: 'Field Workers' }, { name: 'Supervisors' },
          { name: 'New Hires' }, { name: 'Specific Trades' }
        ]}
      },
      { displayName: 'Priority Order', slug: 'priority-order', type: 'Number', isRequired: false },
      { displayName: 'Featured', slug: 'featured', type: 'Bool', isRequired: false },
      { displayName: 'Active', slug: 'is-active', type: 'Bool', isRequired: false },
    ]
  },
  'it-knowledge-base': {
    displayName: 'IT Knowledge Base',
    singularName: 'IT Article',
    slug: 'it-knowledge-base',
    fields: [
      { displayName: 'Article Type', slug: 'article-type', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'FAQ' }, { name: 'How-To Guide' }, { name: 'Troubleshooting' },
          { name: 'Software' }, { name: 'Hardware' }, { name: 'Security' }, { name: 'Policy' }
        ]}
      },
      { displayName: 'Icon', slug: 'icon', type: 'Image', isRequired: false },
      { displayName: 'Summary', slug: 'summary', type: 'PlainText', isRequired: false },
      { displayName: 'Full Content', slug: 'content', type: 'RichText', isRequired: false },
      { displayName: 'Video Tutorial', slug: 'video-link', type: 'Link', isRequired: false },
      { displayName: 'Download Link', slug: 'download-link', type: 'Link', isRequired: false },
      { displayName: 'Platform', slug: 'platform', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Windows' }, { name: 'Mac' }, { name: 'Mobile' }, { name: 'Web' }, { name: 'All' }
        ]}
      },
      { displayName: 'Difficulty', slug: 'difficulty', type: 'Option', isRequired: false,
        validations: { options: [{ name: 'Easy' }, { name: 'Intermediate' }, { name: 'Advanced' }] }
      },
      { displayName: 'Views', slug: 'views', type: 'Number', isRequired: false },
      { displayName: 'Helpful Votes', slug: 'helpful-votes', type: 'Number', isRequired: false },
      { displayName: 'Featured', slug: 'featured', type: 'Bool', isRequired: false },
      { displayName: 'Active', slug: 'is-active', type: 'Bool', isRequired: false },
    ]
  },
  'marketing-assets': {
    displayName: 'Marketing Assets',
    singularName: 'Marketing Asset',
    slug: 'marketing-assets',
    fields: [
      { displayName: 'Asset Type', slug: 'asset-type', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Logo' }, { name: 'Template' }, { name: 'Photo' }, { name: 'Video' },
          { name: 'Presentation' }, { name: 'Letterhead' }, { name: 'Signage' }, { name: 'Brand Guide' }
        ]}
      },
      { displayName: 'Thumbnail', slug: 'thumbnail', type: 'Image', isRequired: false },
      { displayName: 'Preview Image', slug: 'preview-image', type: 'Image', isRequired: false },
      { displayName: 'Description', slug: 'description', type: 'PlainText', isRequired: false },
      { displayName: 'Download Link', slug: 'download-link', type: 'Link', isRequired: false },
      { displayName: 'File Format', slug: 'file-format', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'PNG' }, { name: 'JPG' }, { name: 'SVG' }, { name: 'PDF' },
          { name: 'PPTX' }, { name: 'DOCX' }, { name: 'AI' }, { name: 'PSD' }, { name: 'MP4' }
        ]}
      },
      { displayName: 'File Size', slug: 'file-size', type: 'PlainText', isRequired: false },
      { displayName: 'Usage Guidelines', slug: 'usage-guidelines', type: 'RichText', isRequired: false },
      { displayName: 'Tags', slug: 'tags', type: 'PlainText', isRequired: false },
      { displayName: 'Version', slug: 'version', type: 'PlainText', isRequired: false },
      { displayName: 'Featured', slug: 'featured', type: 'Bool', isRequired: false },
      { displayName: 'Active', slug: 'is-active', type: 'Bool', isRequired: false },
    ]
  },
  'submitted-ideas': {
    displayName: 'Submitted Ideas',
    singularName: 'Idea',
    slug: 'submitted-ideas',
    fields: [
      { displayName: 'Category', slug: 'category', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'Process Improvement' }, { name: 'Safety' }, { name: 'Cost Savings' },
          { name: 'Culture' }, { name: 'Technology' }, { name: 'Training' }, { name: 'Other' }
        ]}
      },
      { displayName: 'Description', slug: 'description', type: 'RichText', isRequired: false },
      { displayName: 'Submitted By', slug: 'submitted-by', type: 'PlainText', isRequired: false },
      { displayName: 'Email', slug: 'submitter-email', type: 'Email', isRequired: false },
      { displayName: 'Department', slug: 'department', type: 'PlainText', isRequired: false },
      { displayName: 'Status', slug: 'status', type: 'Option', isRequired: false,
        validations: { options: [
          { name: 'New' }, { name: 'Under Review' }, { name: 'Approved' },
          { name: 'In Progress' }, { name: 'Implemented' }, { name: 'Declined' }
        ]}
      },
      { displayName: 'Priority', slug: 'priority', type: 'Option', isRequired: false,
        validations: { options: [{ name: 'Low' }, { name: 'Medium' }, { name: 'High' }] }
      },
      { displayName: 'Admin Notes', slug: 'admin-notes', type: 'RichText', isRequired: false },
      { displayName: 'Votes', slug: 'votes', type: 'Number', isRequired: false },
      { displayName: 'Featured', slug: 'featured', type: 'Bool', isRequired: false },
    ]
  },
};

// Sample data for each collection - created when syncing
// IMPORTANT: Option field values must match EXACTLY the option names defined in COLLECTION_DEFINITIONS
// Placeholder image URLs for testing
const PLACEHOLDER_IMAGE = 'https://placehold.co/800x600/1e293b/94a3b8?text=Sample+Image';
const PLACEHOLDER_BANNER = 'https://placehold.co/1920x600/1e293b/94a3b8?text=Banner+Image';
const PLACEHOLDER_THUMBNAIL = 'https://placehold.co/400x400/1e293b/94a3b8?text=Thumbnail';
const PLACEHOLDER_ICON = 'https://placehold.co/100x100/1e293b/94a3b8?text=Icon';
const PLACEHOLDER_PHOTO = 'https://placehold.co/400x400/1e293b/94a3b8?text=Photo';

const SAMPLE_DATA: Record<string, any[]> = {
  announcements: [
    {
      name: 'Q1 2025 All-Hands Meeting',
      slug: 'q1-2025-all-hands-meeting',
      content: '<p>Join us for our quarterly all-hands meeting to review our 2024 accomplishments and discuss our exciting plans for 2025. Breakfast will be provided.</p><ul><li>Review 2024 achievements</li><li>2025 Strategic Goals</li><li>Q&A with Leadership</li></ul>',
      image: PLACEHOLDER_IMAGE,
      author: 'CEO Office',
      category: 'Company News',
      priority: 'High',
      'expiration-date': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      'cta-text': 'Add to Calendar',
      'cta-link': 'https://calendar.google.com/calendar/render',
      'is-pinned': true,
      'published-date': new Date().toISOString()
    },
    {
      name: 'New Safety Training Portal Launched',
      slug: 'new-safety-training-portal',
      content: '<p>We\'ve upgraded our safety training system with a new, user-friendly portal. All employees must complete their annual safety certification by February 28th.</p>',
      image: PLACEHOLDER_IMAGE,
      author: 'Safety Team',
      category: 'Safety Alert',
      priority: 'Urgent',
      'expiration-date': new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      'cta-text': 'Start Training',
      'cta-link': 'https://training.example.com/safety',
      'is-pinned': true,
      'published-date': new Date().toISOString()
    },
    {
      name: 'Benefits Open Enrollment Now Open',
      slug: 'benefits-open-enrollment',
      content: '<p>Open enrollment for 2025 benefits runs January 15-31. Review your options and make any changes to your health, dental, and vision coverage.</p>',
      image: PLACEHOLDER_IMAGE,
      author: 'HR Team',
      category: 'HR Update',
      priority: 'Normal',
      'expiration-date': new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      'cta-text': 'Review Benefits',
      'cta-link': 'https://benefits.example.com',
      'is-pinned': false,
      'published-date': new Date().toISOString()
    }
  ],
  events: [
    {
      name: 'Q1 All-Hands Meeting',
      slug: 'q1-all-hands-meeting',
      'event-date': new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      'end-date': new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
      'banner-image': PLACEHOLDER_BANNER,
      location: 'Main Conference Room, Building A',
      'virtual-link': 'https://teams.microsoft.com/meet/allhands',
      category: 'All-Hands Meeting',
      description: '<p>Quarterly company meeting to review progress and discuss upcoming initiatives.</p><ul><li>2024 Review</li><li>2025 Goals</li><li>Department Updates</li><li>Q&A Session</li></ul>',
      capacity: 200,
      'registration-link': 'https://forms.example.com/register-allhands',
      'is-mandatory': true,
      'is-virtual': false
    },
    {
      name: 'OSHA Safety Certification Training',
      slug: 'osha-safety-training',
      'event-date': new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      'end-date': new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(),
      'banner-image': PLACEHOLDER_BANNER,
      location: 'Training Center, Room 101',
      category: 'Training',
      description: '<p>Annual OSHA 30-hour safety certification course. Mandatory for all field personnel.</p><p>Lunch will be provided. Please bring your hard hat and safety vest.</p>',
      capacity: 25,
      'registration-link': 'https://forms.example.com/osha-training',
      'is-mandatory': true,
      'is-virtual': false
    },
    {
      name: 'Team Building Happy Hour',
      slug: 'team-building-happy-hour',
      'event-date': new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      'end-date': new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
      'banner-image': PLACEHOLDER_BANNER,
      location: 'The Pub Downtown, 123 Main St',
      category: 'Social Event',
      description: '<p>Join your colleagues for an evening of fun and networking. First round on the company!</p>',
      capacity: 50,
      'is-mandatory': false,
      'is-virtual': false
    },
    {
      name: 'Benefits Q&A Webinar',
      slug: 'benefits-qa-webinar',
      'event-date': new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      'end-date': new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000).toISOString(),
      'banner-image': PLACEHOLDER_BANNER,
      location: 'Microsoft Teams',
      'virtual-link': 'https://teams.microsoft.com/meet/benefits-qa',
      category: 'HR Session',
      description: '<p>Live Q&A session with HR about your 2025 benefits options. Get your questions answered!</p>',
      capacity: 500,
      'registration-link': 'https://forms.example.com/benefits-qa',
      'is-mandatory': false,
      'is-virtual': true
    }
  ],
  'job-postings': [
    {
      name: 'Senior Project Manager',
      slug: 'senior-project-manager',
      department: 'Commercial',
      location: 'Columbus, OH',
      'employment-type': 'Full-time',
      'experience-level': 'Senior',
      'salary-min': 95000,
      'salary-max': 125000,
      description: '<p>Lead large-scale commercial construction projects from inception to completion. Manage client relationships, budgets, and cross-functional teams.</p><p><strong>Key Responsibilities:</strong></p><ul><li>Oversee project schedules and budgets</li><li>Coordinate with architects and engineers</li><li>Manage subcontractor relationships</li><li>Ensure quality and safety standards</li></ul>',
      requirements: '<ul><li>10+ years construction experience</li><li>PMP certification preferred</li><li>Strong leadership skills</li><li>Experience with commercial projects $10M+</li><li>Proficient in Procore, MS Project</li></ul>',
      benefits: '401k match (6%), comprehensive health/dental/vision, company vehicle, performance bonus up to 15%, 4 weeks PTO',
      'referral-bonus': 2500,
      'apply-link': 'https://careers.example.com/apply/senior-pm',
      urgency: 'Priority',
      'job-is-active': true,
      'is-remote': false,
      featured: true
    },
    {
      name: 'Safety Coordinator',
      slug: 'safety-coordinator',
      department: 'Safety',
      location: 'Cleveland, OH',
      'employment-type': 'Full-time',
      'experience-level': 'Mid Level',
      'salary-min': 65000,
      'salary-max': 80000,
      description: '<p>Ensure compliance with OSHA regulations across multiple job sites. Conduct safety training and incident investigations.</p>',
      requirements: '<ul><li>OSHA 30-hour certification required</li><li>5+ years safety experience in construction</li><li>Excellent communication skills</li><li>Bilingual (English/Spanish) preferred</li></ul>',
      benefits: '401k match, health/dental/vision, PTO, training budget, safety certification reimbursement',
      'referral-bonus': 1500,
      'apply-link': 'https://careers.example.com/apply/safety-coordinator',
      urgency: 'Normal',
      'job-is-active': true,
      'is-remote': false,
      featured: true
    },
    {
      name: 'Field Engineer',
      slug: 'field-engineer',
      department: 'Engineering',
      location: 'Cincinnati, OH',
      'employment-type': 'Full-time',
      'experience-level': 'Entry Level',
      'salary-min': 55000,
      'salary-max': 70000,
      description: '<p>Support project teams with technical coordination, RFIs, and quality control on active construction sites.</p>',
      requirements: '<ul><li>BS in Civil Engineering or Construction Management</li><li>0-3 years experience</li><li>AutoCAD proficiency</li><li>Strong analytical skills</li></ul>',
      benefits: '401k match, health/dental/vision, mentorship program, tuition reimbursement',
      'referral-bonus': 1000,
      'apply-link': 'https://careers.example.com/apply/field-engineer',
      urgency: 'Normal',
      'job-is-active': true,
      'is-remote': false,
      featured: false
    },
    {
      name: 'IT Support Specialist',
      slug: 'it-support-specialist',
      department: 'IT',
      location: 'Columbus, OH',
      'employment-type': 'Full-time',
      'experience-level': 'Entry Level',
      'salary-min': 45000,
      'salary-max': 60000,
      description: '<p>Provide technical support to employees across all locations. Troubleshoot hardware, software, and network issues.</p>',
      requirements: '<ul><li>Associates degree in IT or equivalent experience</li><li>CompTIA A+ certification preferred</li><li>Strong customer service skills</li></ul>',
      benefits: '401k match, health/dental/vision, remote work flexibility, professional development',
      'referral-bonus': 750,
      'apply-link': 'https://careers.example.com/apply/it-support',
      urgency: 'Urgent',
      'job-is-active': true,
      'is-remote': true,
      featured: false
    }
  ],
  'culture-stories': [
    {
      name: 'Employee Spotlight: Sarah Martinez',
      slug: 'employee-spotlight-sarah-martinez',
      type: 'Employee Spotlight',
      'featured-image': PLACEHOLDER_PHOTO,
      'video-url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      content: '<p>Sarah joined Jewett Construction 8 years ago as a project coordinator and has grown into one of our most respected project managers. Her dedication to excellence and team mentorship exemplifies our core values.</p><p>Through hard work and continuous learning, Sarah has led some of our most successful commercial projects, earning recognition from clients and colleagues alike.</p>',
      excerpt: 'From project coordinator to senior PM, Sarah\'s journey showcases what\'s possible at Jewett.',
      'person-name': 'Sarah Martinez',
      'person-role': 'Senior Project Manager',
      'person-tenure': '8 years',
      quote: 'What I love most about Jewett is the culture of continuous improvement. Every day is an opportunity to learn and grow.',
      author: 'HR Team',
      featured: true,
      'published-date': new Date().toISOString(),
      category: 'Employee Stories',
      image: PLACEHOLDER_IMAGE
    },
    {
      name: 'Team Win: Downtown Plaza Completed Early',
      slug: 'team-win-downtown-plaza',
      type: 'Team Win',
      'featured-image': PLACEHOLDER_IMAGE,
      content: '<p>Congratulations to the Downtown Plaza project team for completing Phase 2 structural work two weeks ahead of schedule! This milestone achievement demonstrates our commitment to excellence and collaboration.</p><p>The team overcame supply chain challenges and weather delays through innovative problem-solving and exceptional coordination.</p>',
      excerpt: 'The Downtown Plaza team delivered Phase 2 two weeks early through exceptional teamwork.',
      'person-name': 'Downtown Plaza Team',
      'person-role': 'Project Team',
      author: 'Marketing Team',
      featured: true,
      'published-date': new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Project Milestones',
      image: PLACEHOLDER_IMAGE
    },
    {
      name: 'Core Value: Safety First',
      slug: 'core-value-safety-first',
      type: 'Core Value',
      'featured-image': PLACEHOLDER_IMAGE,
      'video-url': 'https://www.youtube.com/watch?v=safety-video',
      content: '<p>At Jewett Construction, nothing is more important than everyone going home safe. Our 4EverSafe commitment guides every decision we make, from planning to execution.</p><p>This year alone, we\'ve achieved 500,000 hours without a lost-time incident—a testament to our team\'s dedication to safety.</p>',
      excerpt: 'Safety isn\'t just a priority—it\'s our foundation.',
      quote: 'Everyone deserves to go home safely to their families every single day.',
      author: 'Safety Team',
      featured: true,
      'published-date': new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Core Values',
      image: PLACEHOLDER_IMAGE
    },
    {
      name: '25 Year Anniversary: Tom Richardson',
      slug: '25-year-anniversary-tom-richardson',
      type: 'Milestone',
      'featured-image': PLACEHOLDER_PHOTO,
      content: '<p>This month we celebrate Tom Richardson\'s 25th anniversary with Jewett Construction! Starting as a laborer in 1999, Tom has grown with the company to become our most experienced superintendent.</p>',
      excerpt: 'Celebrating 25 years of dedication and excellence.',
      'person-name': 'Tom Richardson',
      'person-role': 'Senior Superintendent',
      'person-tenure': '25 years',
      quote: 'Jewett has been more than a job—it\'s been a career and a family.',
      author: 'Executive Team',
      featured: false,
      'published-date': new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      category: 'Milestones',
      image: PLACEHOLDER_PHOTO
    }
  ],
  employees: [
    {
      name: 'John Richardson',
      slug: 'john-richardson',
      photo: PLACEHOLDER_PHOTO,
      role: 'Chief Executive Officer',
      department: 'Executive',
      'office-location': 'Columbus HQ',
      email: 'jrichardson@jewettconstruction.com',
      phone: '(614) 555-0100',
      extension: '100',
      linkedin: 'https://linkedin.com/in/johnrichardson',
      'start-date': new Date('2009-01-15').toISOString(),
      bio: 'John has led Jewett Construction for over 15 years, growing the company from a regional builder to a nationally recognized construction firm with projects across the Midwest.',
      skills: 'Strategic Planning, Leadership, Business Development, Construction Management',
      certifications: 'MBA, PMP',
      'is-featured': true,
      'is-leadership': true
    },
    {
      name: 'Maria Santos',
      slug: 'maria-santos',
      photo: PLACEHOLDER_PHOTO,
      role: 'VP of Operations',
      department: 'Operations',
      'office-location': 'Columbus HQ',
      email: 'msantos@jewettconstruction.com',
      phone: '(614) 555-0101',
      extension: '101',
      linkedin: 'https://linkedin.com/in/mariasantos',
      'start-date': new Date('2012-06-01').toISOString(),
      bio: 'Maria oversees all field operations and ensures projects are delivered on time and within budget. She has managed over $500M in construction projects during her career.',
      skills: 'Operations Management, Project Oversight, Team Leadership, Process Improvement',
      certifications: 'PMP, LEED AP',
      'is-featured': true,
      'is-leadership': true
    },
    {
      name: 'Robert Chen',
      slug: 'robert-chen',
      photo: PLACEHOLDER_PHOTO,
      role: 'Director of Safety',
      department: 'Safety',
      'office-location': 'Columbus HQ',
      email: 'rchen@jewettconstruction.com',
      phone: '(614) 555-0102',
      extension: '102',
      linkedin: 'https://linkedin.com/in/robertchen',
      'start-date': new Date('2015-03-20').toISOString(),
      bio: 'Robert leads our 4EverSafe program and has helped maintain our industry-leading safety record with over 1 million hours without a lost-time incident.',
      skills: 'Safety Management, OSHA Compliance, Training, Incident Investigation',
      certifications: 'OSHA 500, CSP, CHST, CPR/First Aid Instructor',
      'is-featured': false,
      'is-leadership': true
    },
    {
      name: 'Jennifer Williams',
      slug: 'jennifer-williams',
      photo: PLACEHOLDER_PHOTO,
      role: 'HR Director',
      department: 'HR',
      'office-location': 'Columbus HQ',
      email: 'jwilliams@jewettconstruction.com',
      phone: '(614) 555-0103',
      extension: '103',
      linkedin: 'https://linkedin.com/in/jenniferwilliams',
      'start-date': new Date('2018-09-10').toISOString(),
      bio: 'Jennifer manages all HR functions including recruitment, benefits, and employee development programs. She has implemented award-winning training and retention programs.',
      skills: 'Human Resources, Recruitment, Employee Relations, Benefits Administration',
      certifications: 'SHRM-SCP, PHR',
      'is-featured': false,
      'is-leadership': true
    },
    {
      name: 'David Park',
      slug: 'david-park',
      photo: PLACEHOLDER_PHOTO,
      role: 'Senior Project Manager',
      department: 'Commercial',
      'office-location': 'Cleveland Office',
      email: 'dpark@jewettconstruction.com',
      phone: '(216) 555-0200',
      extension: '200',
      linkedin: 'https://linkedin.com/in/davidpark',
      'start-date': new Date('2016-04-15').toISOString(),
      bio: 'David manages large-scale commercial projects in the Cleveland region, specializing in healthcare and education facilities.',
      skills: 'Project Management, Client Relations, Scheduling, Budget Management',
      certifications: 'PMP, OSHA 30',
      'is-featured': true,
      'is-leadership': false
    }
  ],
  resources: [
    {
      name: 'Employee Handbook 2025',
      slug: 'employee-handbook-2025',
      thumbnail: PLACEHOLDER_THUMBNAIL,
      category: 'HR Policies',
      description: 'Complete guide to company policies, procedures, and employee expectations.',
      'file-type': 'PDF',
      'external-link': 'https://docs.example.com/handbook-2025.pdf',
      'file-size': '2.4 MB',
      'last-updated': new Date().toISOString(),
      version: 'v2025.1',
      audience: 'All Employees',
      'is-required': true,
      'is-new': true,
      file: 'https://docs.example.com/handbook-2025.pdf',
      icon: PLACEHOLDER_ICON
    },
    {
      name: 'Safety Procedures Manual',
      slug: 'safety-procedures-manual',
      thumbnail: PLACEHOLDER_THUMBNAIL,
      category: 'Safety',
      description: 'Comprehensive safety guidelines and emergency procedures for all job sites.',
      'file-type': 'PDF',
      'external-link': 'https://docs.example.com/safety-manual.pdf',
      'file-size': '5.1 MB',
      'last-updated': new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      version: 'v3.2',
      audience: 'All Employees',
      'is-required': true,
      'is-new': false,
      file: 'https://docs.example.com/safety-manual.pdf',
      icon: PLACEHOLDER_ICON
    },
    {
      name: 'Benefits Summary Guide',
      slug: 'benefits-summary-guide',
      thumbnail: PLACEHOLDER_THUMBNAIL,
      category: 'Benefits',
      description: 'Overview of all employee benefits including health, dental, vision, and 401k.',
      'file-type': 'PDF',
      'external-link': 'https://docs.example.com/benefits-2025.pdf',
      'file-size': '1.8 MB',
      'last-updated': new Date().toISOString(),
      version: 'v2025',
      audience: 'All Employees',
      'is-required': false,
      'is-new': true,
      file: 'https://docs.example.com/benefits-2025.pdf',
      icon: PLACEHOLDER_ICON
    },
    {
      name: 'IT Setup Guide for New Employees',
      slug: 'it-setup-guide',
      thumbnail: PLACEHOLDER_THUMBNAIL,
      category: 'IT Support',
      description: 'Step-by-step guide to setting up your computer, email, and required software.',
      'file-type': 'PDF',
      'external-link': 'https://docs.example.com/it-setup.pdf',
      'file-size': '3.2 MB',
      'last-updated': new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      version: 'v1.5',
      audience: 'New Hires',
      'is-required': false,
      'is-new': false,
      file: 'https://docs.example.com/it-setup.pdf',
      icon: PLACEHOLDER_ICON
    },
    {
      name: 'Time Off Request Form',
      slug: 'time-off-request-form',
      thumbnail: PLACEHOLDER_THUMBNAIL,
      category: 'Forms',
      description: 'Standard form for requesting PTO, sick leave, or other time off.',
      'file-type': 'Word Doc',
      'external-link': 'https://docs.example.com/time-off-form.docx',
      'file-size': '45 KB',
      'last-updated': new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      version: 'v2.0',
      audience: 'All Employees',
      'is-required': false,
      'is-new': false,
      file: 'https://docs.example.com/time-off-form.docx',
      icon: PLACEHOLDER_ICON
    }
  ],
  'hr-content': [
    {
      name: 'PTO Policy',
      slug: 'pto-policy',
      'content-type': 'Policy',
      icon: PLACEHOLDER_ICON,
      description: 'Guidelines for requesting and using paid time off.',
      content: '<p>Full-time employees receive 15 days PTO annually, plus 10 paid holidays. PTO must be requested at least 2 weeks in advance for planned absences.</p><p><strong>Accrual:</strong></p><ul><li>0-3 years: 15 days</li><li>3-5 years: 18 days</li><li>5+ years: 21 days</li></ul>',
      'document-link': 'https://docs.example.com/pto-policy.pdf',
      'effective-date': new Date('2025-01-01').toISOString(),
      'applies-to': 'All Employees',
      'priority-order': 1,
      featured: true,
      'is-active': true
    },
    {
      name: 'Health Insurance Options',
      slug: 'health-insurance-options',
      'content-type': 'Benefit',
      icon: PLACEHOLDER_ICON,
      description: 'Overview of available health insurance plans and coverage levels.',
      content: '<p>We offer three tiers of health coverage: Bronze, Silver, and Gold. All plans include preventive care at no cost and competitive copays.</p><p><strong>Monthly Premiums (Employee Only):</strong></p><ul><li>Bronze: $125</li><li>Silver: $200</li><li>Gold: $275</li></ul>',
      'document-link': 'https://docs.example.com/health-plans.pdf',
      'effective-date': new Date('2025-01-01').toISOString(),
      'applies-to': 'Full-time',
      'priority-order': 2,
      featured: true,
      'is-active': true
    },
    {
      name: '401(k) Retirement Plan',
      slug: '401k-retirement-plan',
      'content-type': 'Benefit',
      icon: PLACEHOLDER_ICON,
      description: 'Details about our 401(k) plan and company matching.',
      content: '<p>Jewett matches 100% of contributions up to 4% of salary. Vesting is immediate for employee contributions and gradual over 3 years for company match.</p><p>Employees are eligible to enroll after 30 days of employment.</p>',
      'document-link': 'https://docs.example.com/401k-guide.pdf',
      'effective-date': new Date('2024-01-01').toISOString(),
      'applies-to': 'All Employees',
      'priority-order': 3,
      featured: true,
      'is-active': true
    },
    {
      name: 'Remote Work Policy',
      slug: 'remote-work-policy',
      'content-type': 'Policy',
      icon: PLACEHOLDER_ICON,
      description: 'Guidelines for employees who work remotely or in hybrid arrangements.',
      content: '<p>Eligible employees may work remotely up to 2 days per week with manager approval. Remote workers must maintain core hours of 9 AM - 3 PM EST and be available via Teams.</p>',
      'document-link': 'https://docs.example.com/remote-work-policy.pdf',
      'effective-date': new Date('2024-06-01').toISOString(),
      'applies-to': 'Office Staff',
      'priority-order': 4,
      featured: false,
      'is-active': true
    },
    {
      name: 'Onboarding Checklist',
      slug: 'onboarding-checklist',
      'content-type': 'Procedure',
      icon: PLACEHOLDER_ICON,
      description: 'Step-by-step guide for new employee onboarding.',
      content: '<p><strong>Week 1:</strong></p><ul><li>Complete HR paperwork</li><li>Set up workstation</li><li>Meet with manager</li><li>Begin safety training</li></ul><p><strong>Week 2-4:</strong></p><ul><li>Complete all required training</li><li>Shadow team members</li><li>30-day check-in with HR</li></ul>',
      'document-link': 'https://docs.example.com/onboarding-checklist.pdf',
      'effective-date': new Date('2024-01-01').toISOString(),
      'applies-to': 'All Employees',
      'priority-order': 5,
      featured: false,
      'is-active': true
    }
  ],
  'safety-content': [
    {
      name: 'Fall Protection Protocol',
      slug: 'fall-protection-protocol',
      'content-type': 'Protocol',
      image: PLACEHOLDER_IMAGE,
      severity: 'Critical',
      description: 'Required fall protection procedures for all elevated work.',
      content: '<p>All work at heights of 6 feet or more requires fall protection. This includes guardrails, safety nets, or personal fall arrest systems.</p><p><strong>Requirements:</strong></p><ul><li>100% tie-off above 6 feet</li><li>Daily harness inspection</li><li>Annual fall protection training</li></ul>',
      'document-link': 'https://docs.example.com/fall-protection.pdf',
      'video-link': 'https://www.youtube.com/watch?v=fall-protection-training',
      'expiration-date': new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      'required-for': 'Field Workers',
      'priority-order': 1,
      featured: true,
      'is-active': true
    },
    {
      name: 'PPE Requirements',
      slug: 'ppe-requirements',
      'content-type': 'Protocol',
      image: PLACEHOLDER_IMAGE,
      severity: 'Warning',
      description: 'Personal protective equipment requirements by job site area.',
      content: '<p>Hard hats, safety glasses, and steel-toed boots are required at all times on active job sites. Additional PPE may be required based on specific tasks.</p><p><strong>Zone Requirements:</strong></p><ul><li>Green Zone: Hard hat, safety glasses, boots</li><li>Yellow Zone: Add hearing protection</li><li>Red Zone: Full PPE + respirator</li></ul>',
      'document-link': 'https://docs.example.com/ppe-requirements.pdf',
      'video-link': 'https://www.youtube.com/watch?v=ppe-training',
      'expiration-date': new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      'required-for': 'All Employees',
      'priority-order': 2,
      featured: true,
      'is-active': true
    },
    {
      name: 'Heat Illness Prevention',
      slug: 'heat-illness-prevention',
      'content-type': 'Best Practice',
      image: PLACEHOLDER_IMAGE,
      severity: 'Info',
      description: 'Guidelines for preventing heat-related illness during summer months.',
      content: '<p>Stay hydrated, take regular breaks in shaded areas, and know the signs of heat exhaustion. Work schedules may be adjusted during extreme heat.</p><p><strong>Warning Signs:</strong></p><ul><li>Heavy sweating</li><li>Dizziness or nausea</li><li>Rapid heartbeat</li></ul>',
      'document-link': 'https://docs.example.com/heat-illness.pdf',
      'video-link': 'https://www.youtube.com/watch?v=heat-illness-prevention',
      'expiration-date': new Date('2025-09-30').toISOString(),
      'required-for': 'Field Workers',
      'priority-order': 3,
      featured: false,
      'is-active': true
    },
    {
      name: 'Confined Space Entry',
      slug: 'confined-space-entry',
      'content-type': 'Protocol',
      image: PLACEHOLDER_IMAGE,
      severity: 'Critical',
      description: 'Procedures for safe entry into confined spaces.',
      content: '<p>Confined space entry requires a permit, atmospheric testing, and a trained attendant at all times.</p><p><strong>Before Entry:</strong></p><ul><li>Complete permit</li><li>Test atmosphere</li><li>Establish rescue plan</li><li>Assign attendant</li></ul>',
      'document-link': 'https://docs.example.com/confined-space.pdf',
      'video-link': 'https://www.youtube.com/watch?v=confined-space-training',
      'expiration-date': new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      'required-for': 'Supervisors',
      'priority-order': 4,
      featured: true,
      'is-active': true
    }
  ],
  'it-knowledge-base': [
    {
      name: 'How to Reset Your Password',
      slug: 'how-to-reset-password',
      'article-type': 'How-To Guide',
      icon: PLACEHOLDER_ICON,
      summary: 'Step-by-step instructions for resetting your network password.',
      content: '<p><strong>Step 1:</strong> Go to password.jewettconstruction.com</p><p><strong>Step 2:</strong> Enter your email address</p><p><strong>Step 3:</strong> Click "Reset Password"</p><p><strong>Step 4:</strong> Check your email for the reset link</p><p><strong>Step 5:</strong> Create a new password following the requirements</p><p><em>Password must be at least 12 characters with uppercase, lowercase, number, and special character.</em></p>',
      'video-link': 'https://www.youtube.com/watch?v=password-reset-video',
      'download-link': 'https://password.jewettconstruction.com',
      platform: 'All',
      difficulty: 'Easy',
      views: 1250,
      'helpful-votes': 98,
      featured: true,
      'is-active': true
    },
    {
      name: 'VPN Setup Guide',
      slug: 'vpn-setup-guide',
      'article-type': 'How-To Guide',
      icon: PLACEHOLDER_ICON,
      summary: 'How to connect to the company VPN for remote work.',
      content: '<p>Download the GlobalProtect app from the IT portal and enter vpn.jewettconstruction.com as the portal address. Use your network credentials to log in.</p><p><strong>Troubleshooting:</strong></p><ul><li>If connection fails, restart your computer</li><li>Ensure you\'re not on a restricted network</li><li>Contact IT if issues persist</li></ul>',
      'video-link': 'https://www.youtube.com/watch?v=vpn-setup-video',
      'download-link': 'https://it.jewettconstruction.com/downloads/globalprotect',
      platform: 'All',
      difficulty: 'Intermediate',
      views: 856,
      'helpful-votes': 72,
      featured: true,
      'is-active': true
    },
    {
      name: 'Microsoft Teams Quick Start',
      slug: 'microsoft-teams-quick-start',
      'article-type': 'Software',
      icon: PLACEHOLDER_ICON,
      summary: 'Getting started with Microsoft Teams for communication and collaboration.',
      content: '<p>Teams is our primary tool for chat, video calls, and file sharing. Download from the Microsoft 365 portal and sign in with your work email.</p><p><strong>Key Features:</strong></p><ul><li>Chat and messaging</li><li>Video conferencing</li><li>File sharing</li><li>Calendar integration</li></ul>',
      'video-link': 'https://www.youtube.com/watch?v=teams-intro-video',
      'download-link': 'https://teams.microsoft.com/downloads',
      platform: 'All',
      difficulty: 'Easy',
      views: 2100,
      'helpful-votes': 185,
      featured: true,
      'is-active': true
    },
    {
      name: 'Procore Mobile App Setup',
      slug: 'procore-mobile-app-setup',
      'article-type': 'Software',
      icon: PLACEHOLDER_ICON,
      summary: 'How to install and configure the Procore mobile app for field access.',
      content: '<p>The Procore mobile app gives you access to project documents, drawings, and daily logs from the field.</p><p><strong>Setup Steps:</strong></p><ol><li>Download Procore from App Store or Google Play</li><li>Sign in with your Jewett email</li><li>Select your assigned projects</li><li>Enable offline access for drawings</li></ol>',
      'video-link': 'https://www.youtube.com/watch?v=procore-mobile-setup',
      'download-link': 'https://procore.com/download',
      platform: 'Mobile',
      difficulty: 'Easy',
      views: 654,
      'helpful-votes': 45,
      featured: false,
      'is-active': true
    },
    {
      name: 'Troubleshooting Printer Issues',
      slug: 'troubleshooting-printer-issues',
      'article-type': 'Troubleshooting',
      icon: PLACEHOLDER_ICON,
      summary: 'Common printer problems and how to resolve them.',
      content: '<p><strong>Printer Not Found:</strong></p><ul><li>Restart your computer</li><li>Check network connection</li><li>Run printer troubleshooter</li></ul><p><strong>Print Jobs Stuck:</strong></p><ul><li>Clear print queue</li><li>Restart print spooler service</li></ul>',
      'video-link': 'https://www.youtube.com/watch?v=printer-troubleshooting',
      platform: 'Windows',
      difficulty: 'Intermediate',
      views: 423,
      'helpful-votes': 31,
      featured: false,
      'is-active': true
    }
  ],
  'marketing-assets': [
    {
      name: 'Jewett Logo - Primary',
      slug: 'jewett-logo-primary',
      'asset-type': 'Logo',
      thumbnail: PLACEHOLDER_THUMBNAIL,
      'preview-image': PLACEHOLDER_IMAGE,
      description: 'Primary company logo for standard use on white/light backgrounds.',
      'download-link': 'https://assets.example.com/logo-primary.svg',
      'file-format': 'SVG',
      'file-size': '24 KB',
      'usage-guidelines': '<p>Use this logo on:</p><ul><li>White or light backgrounds</li><li>Letterheads and documents</li><li>Digital presentations</li></ul><p>Minimum clear space: 0.5" around logo</p>',
      tags: 'logo, primary, color, brand',
      version: 'v2.0',
      featured: true,
      'is-active': true
    },
    {
      name: 'Jewett Logo - White',
      slug: 'jewett-logo-white',
      'asset-type': 'Logo',
      thumbnail: PLACEHOLDER_THUMBNAIL,
      'preview-image': PLACEHOLDER_IMAGE,
      description: 'White version of company logo for use on dark backgrounds.',
      'download-link': 'https://assets.example.com/logo-white.svg',
      'file-format': 'SVG',
      'file-size': '22 KB',
      'usage-guidelines': '<p>Use this logo on:</p><ul><li>Dark or colored backgrounds</li><li>Photography overlays</li><li>Safety vests and gear</li></ul>',
      tags: 'logo, white, reversed, dark-background',
      version: 'v2.0',
      featured: false,
      'is-active': true
    },
    {
      name: 'Brand Guidelines',
      slug: 'brand-guidelines',
      'asset-type': 'Brand Guide',
      thumbnail: PLACEHOLDER_THUMBNAIL,
      'preview-image': PLACEHOLDER_IMAGE,
      description: 'Complete brand standards including colors, typography, and logo usage.',
      'download-link': 'https://assets.example.com/brand-guidelines.pdf',
      'file-format': 'PDF',
      'file-size': '8.5 MB',
      'usage-guidelines': '<p>This is the authoritative source for all brand-related decisions. Review before creating any external materials.</p>',
      tags: 'brand, guidelines, standards, colors, typography',
      version: 'v2025',
      featured: true,
      'is-active': true
    },
    {
      name: 'PowerPoint Template',
      slug: 'powerpoint-template',
      'asset-type': 'Template',
      thumbnail: PLACEHOLDER_THUMBNAIL,
      'preview-image': PLACEHOLDER_IMAGE,
      description: 'Official company presentation template with branded slides.',
      'download-link': 'https://assets.example.com/presentation-template.pptx',
      'file-format': 'PPTX',
      'file-size': '4.2 MB',
      'usage-guidelines': '<p>Use this template for all client presentations and internal meetings. Includes:</p><ul><li>Title slides</li><li>Content layouts</li><li>Chart templates</li><li>Photo placeholders</li></ul>',
      tags: 'template, powerpoint, presentation, slides',
      version: 'v1.3',
      featured: false,
      'is-active': true
    },
    {
      name: 'Email Signature Template',
      slug: 'email-signature-template',
      'asset-type': 'Template',
      thumbnail: PLACEHOLDER_THUMBNAIL,
      'preview-image': PLACEHOLDER_IMAGE,
      description: 'Standard email signature with logo and contact information.',
      'download-link': 'https://assets.example.com/email-signature.html',
      'file-format': 'PNG',
      'file-size': '85 KB',
      'usage-guidelines': '<p>All employees should use this signature format. Customize with your name, title, and contact info using the Signature Generator in Outlook.</p>',
      tags: 'email, signature, contact, outlook',
      version: 'v1.1',
      featured: false,
      'is-active': true
    },
    {
      name: 'Project Photo - Commercial Building',
      slug: 'project-photo-commercial-building',
      'asset-type': 'Photo',
      thumbnail: PLACEHOLDER_THUMBNAIL,
      'preview-image': PLACEHOLDER_IMAGE,
      description: 'High-resolution photo of completed commercial building project.',
      'download-link': 'https://assets.example.com/commercial-building.jpg',
      'file-format': 'JPG',
      'file-size': '12.5 MB',
      'usage-guidelines': '<p>Use for:</p><ul><li>Website portfolio</li><li>Marketing materials</li><li>Proposals</li></ul><p>Photo credit: Jewett Construction Marketing</p>',
      tags: 'photo, commercial, building, portfolio, project',
      version: 'v1.0',
      featured: true,
      'is-active': true
    }
  ],
  'submitted-ideas': [
    {
      name: 'Digital Timesheet App',
      slug: 'digital-timesheet-app',
      category: 'Technology',
      description: '<p>Develop a mobile app for field workers to submit timesheets instead of paper forms. Would save time and reduce errors.</p><p><strong>Benefits:</strong></p><ul><li>Eliminate paper waste</li><li>Faster payroll processing</li><li>GPS verification</li><li>Real-time hours tracking</li></ul>',
      'submitted-by': 'Mike Thompson',
      'submitter-email': 'mthompson@jewettconstruction.com',
      department: 'Operations',
      status: 'Under Review',
      priority: 'High',
      'admin-notes': '<p>IT team is evaluating existing solutions. Budget allocated for Q2 implementation. Meeting scheduled with Mike to discuss requirements.</p>',
      votes: 24,
      featured: true
    },
    {
      name: 'Tool Tracking System',
      slug: 'tool-tracking-system',
      category: 'Process Improvement',
      description: '<p>Implement QR codes on tools and equipment for easy tracking. Would help reduce lost equipment and improve accountability.</p><p>Similar to inventory systems used in retail.</p>',
      'submitted-by': 'Jennifer Adams',
      'submitter-email': 'jadams@jewettconstruction.com',
      department: 'Safety',
      status: 'Approved',
      priority: 'Medium',
      'admin-notes': '<p>Approved for pilot program on 3 job sites. Equipment manager will lead implementation. Target start: March 2025.</p>',
      votes: 18,
      featured: true
    },
    {
      name: 'Weekly Safety Huddle Videos',
      slug: 'weekly-safety-huddle-videos',
      category: 'Safety',
      description: '<p>Create short (2-3 minute) weekly safety videos to supplement morning huddles. Would ensure consistent messaging across all sites.</p>',
      'submitted-by': 'Carlos Rodriguez',
      'submitter-email': 'crodriguez@jewettconstruction.com',
      department: 'Safety',
      status: 'In Progress',
      priority: 'High',
      'admin-notes': '<p>First video recorded and distributed. Positive feedback from superintendents. Marketing team assigned to produce weekly content.</p>',
      votes: 32,
      featured: true
    },
    {
      name: 'Ergonomic Office Chair Upgrade',
      slug: 'ergonomic-chair-upgrade',
      category: 'Culture',
      description: '<p>Replace old office chairs with ergonomic models to reduce back pain and improve comfort for office staff.</p>',
      'submitted-by': 'Linda Chen',
      'submitter-email': 'lchen@jewettconstruction.com',
      department: 'Admin',
      status: 'Implemented',
      priority: 'Low',
      'admin-notes': '<p>Completed in December 2024. New Herman Miller chairs deployed to all office locations. Positive feedback received.</p>',
      votes: 15,
      featured: false
    },
    {
      name: 'Monthly Lunch & Learn Sessions',
      slug: 'monthly-lunch-learn',
      category: 'Training',
      description: '<p>Host monthly lunch sessions where employees can share expertise on various topics. Would promote knowledge sharing and team bonding.</p>',
      'submitted-by': 'David Kim',
      'submitter-email': 'dkim@jewettconstruction.com',
      department: 'Engineering',
      status: 'New',
      priority: 'Medium',
      'admin-notes': '<p>Received January 2025. HR team to review and develop program structure.</p>',
      votes: 8,
      featured: false
    }
  ]
};

// GET - Fetch existing collections
export const GET: APIRoute = async ({ request, locals }) => {
  if (!verifyToken(request)) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getEnvVar(locals, 'WEBFLOW_API_TOKEN');
  const siteId = getEnvVar(locals, 'WEBFLOW_SITE_ID');

  if (!siteId || !apiToken) {
    return withCors(new Response(JSON.stringify({ error: 'API credentials not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  try {
    const response = await fetch(`${BASE_URL}/sites/${siteId}/collections`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch collections: ${response.status}`);
    }

    const data = await response.json();

    // Return existing collections and what's defined
    return withCors(new Response(JSON.stringify({
      existing: data.collections || [],
      defined: Object.keys(COLLECTION_DEFINITIONS).map(key => ({
        slug: key,
        displayName: COLLECTION_DEFINITIONS[key as keyof typeof COLLECTION_DEFINITIONS].displayName,
        fieldCount: COLLECTION_DEFINITIONS[key as keyof typeof COLLECTION_DEFINITIONS].fields.length
      }))
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }));
  } catch (error: any) {
    console.error('Error fetching collections:', error);
    return withCors(new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};

// Helper to fetch collection fields from Webflow
async function getCollectionFields(collectionId: string, apiToken: string): Promise<Map<string, any>> {
  try {
    const response = await fetch(`${BASE_URL}/collections/${collectionId}`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.log(`Failed to fetch collection schema: ${response.status}`);
      return new Map();
    }

    const data = await response.json();
    const fieldMap = new Map<string, any>();

    // Map field slugs to their details
    if (data.fields) {
      for (const field of data.fields) {
        fieldMap.set(field.slug, {
          type: field.type,
          validations: field.validations
        });
      }
    }

    console.log(`Collection ${collectionId} has fields:`, Array.from(fieldMap.keys()));
    return fieldMap;
  } catch (err) {
    console.error('Error fetching collection fields:', err);
    return new Map();
  }
}

// Helper to filter sample data to only include existing fields with valid values
function filterFieldData(fieldData: Record<string, any>, existingFields: Map<string, any>): Record<string, any> {
  const filtered: Record<string, any> = {};

  for (const [key, value] of Object.entries(fieldData)) {
    // 'name' is always valid (built-in field)
    if (key === 'name') {
      filtered[key] = value;
      continue;
    }

    // Only include if the field exists in the collection
    if (!existingFields.has(key)) {
      console.log(`  Skipping field '${key}' - not in collection schema`);
      continue;
    }

    const fieldInfo = existingFields.get(key);

    // For Option fields, validate the value is in allowed options
    if (fieldInfo?.type === 'Option' && fieldInfo?.validations?.options) {
      const allowedOptions = fieldInfo.validations.options.map((opt: any) => opt.name);
      if (!allowedOptions.includes(value)) {
        console.log(`  Skipping field '${key}' - value '${value}' not in allowed options: [${allowedOptions.join(', ')}]`);
        continue;
      }
    }

    filtered[key] = value;
  }

  return filtered;
}

// Helper to safely consume a response body
async function consumeResponse(response: Response): Promise<any> {
  try {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  } catch {
    return { message: 'Failed to read response' };
  }
}

// POST - Create/sync collections
export const POST: APIRoute = async ({ request, locals }) => {
  if (!verifyToken(request)) {
    return withCors(new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  const apiToken = getEnvVar(locals, 'WEBFLOW_API_TOKEN');
  const siteId = getEnvVar(locals, 'WEBFLOW_SITE_ID');

  if (!siteId || !apiToken) {
    return withCors(new Response(JSON.stringify({ error: 'API credentials not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  try {
    const body = await request.json();
    const { collections: collectionsToSync = [], customCollections = [], addSampleItems = true } = body;

    console.log('=== SYNC REQUEST ===');
    console.log('Collections to sync:', collectionsToSync);
    console.log('addSampleItems:', addSampleItems);

    // Get existing collections first
    const existingResponse = await fetch(`${BASE_URL}/sites/${siteId}/collections`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'accept': 'application/json'
      }
    });

    if (!existingResponse.ok) {
      throw new Error('Failed to fetch existing collections');
    }

    const existingData = await existingResponse.json();
    const existingCollections = existingData.collections || [];
    const existingSlugs = new Set(existingCollections.map((c: any) => c.slug));

    console.log('Existing collections from Webflow:', existingCollections.map((c: any) => ({ slug: c.slug, id: c.id, displayName: c.displayName })));
    console.log('Existing slugs:', Array.from(existingSlugs));

    const results: any[] = [];

    // Process each collection to sync
    for (const collectionKey of collectionsToSync) {
      console.log(`\n--- Processing collection: ${collectionKey} ---`);
      const definition = COLLECTION_DEFINITIONS[collectionKey as keyof typeof COLLECTION_DEFINITIONS];
      if (!definition) {
        console.log(`Unknown collection key: ${collectionKey}`);
        results.push({ slug: collectionKey, status: 'error', message: 'Unknown collection' });
        continue;
      }
      console.log(`Definition found: slug=${definition.slug}, displayName=${definition.displayName}`);

      // Check if collection already exists
      const collectionExistsInWebflow = existingSlugs.has(definition.slug);
      console.log(`Collection exists in Webflow: ${collectionExistsInWebflow}`);

      if (collectionExistsInWebflow) {
        // Find the existing collection to get its ID
        const existing = existingCollections.find((c: any) => c.slug === definition.slug);
        console.log(`Found existing collection: id=${existing?.id}`);

        // If addSampleItems is true, add sample items to existing collection
        console.log(`Checking addSampleItems (${addSampleItems}) && existing?.id (${existing?.id})`);
        if (addSampleItems && existing?.id) {
          const sampleItems = SAMPLE_DATA[definition.slug] || [];
          console.log(`SAMPLE_DATA key used: '${definition.slug}', found ${sampleItems.length} sample items`);
          console.log(`Available SAMPLE_DATA keys:`, Object.keys(SAMPLE_DATA));
          if (sampleItems.length === 0) {
            console.log(`WARNING: No sample data found for '${definition.slug}'`);
          }

          // Fetch the collection's actual field schema
          console.log(`Fetching field schema for collection ${existing.id}...`);
          const existingFields = await getCollectionFields(existing.id, apiToken);

          if (existingFields.size === 0) {
            console.log(`WARNING: Could not fetch fields for collection. Will try with all fields.`);
          }

          console.log(`Adding ${sampleItems.length} sample items to existing collection ${definition.slug} (${existing.id})`);
          let itemsCreated = 0;
          let itemErrors: string[] = [];

          for (const sampleItem of sampleItems) {
            try {
              // Remove 'slug' field - Webflow auto-generates it from 'name'
              const { slug: _slug, ...rawFieldData } = sampleItem;

              // Filter to only include fields that exist in the collection
              const fieldData = existingFields.size > 0
                ? filterFieldData(rawFieldData, existingFields)
                : rawFieldData;

              console.log(`Creating item: ${sampleItem.name}`, JSON.stringify(fieldData).slice(0, 200));

              const itemResponse = await fetch(`${BASE_URL}/collections/${existing.id}/items`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${apiToken}`,
                  'accept': 'application/json',
                  'content-type': 'application/json'
                },
                body: JSON.stringify({
                  fieldData,
                  isArchived: false,
                  isDraft: false
                })
              });

              const itemData = await consumeResponse(itemResponse);
              console.log(`Item response for ${sampleItem.name}: ${itemResponse.status}`, JSON.stringify(itemData).slice(0, 300));
              if (itemResponse.ok) {
                itemsCreated++;
                console.log(`Successfully created item: ${sampleItem.name}`);
              } else {
                const errorMsg = `${sampleItem.name || _slug}: ${itemData.message || itemData.msg || JSON.stringify(itemData)}`;
                console.error(`Failed to create item: ${errorMsg}`);
                itemErrors.push(errorMsg);
              }

              // Longer delay to avoid Cloudflare Worker limits
              await new Promise(resolve => setTimeout(resolve, 300));
            } catch (itemErr: any) {
              itemErrors.push(`${sampleItem.name || 'item'}: ${itemErr.message}`);
            }
          }

          results.push({
            slug: definition.slug,
            status: 'exists',
            message: sampleItems.length > 0
              ? `Collection exists, added ${itemsCreated}/${sampleItems.length} sample items`
              : 'Collection already exists',
            id: existing.id,
            itemsCreated,
            totalSampleItems: sampleItems.length,
            itemErrors: itemErrors.length > 0 ? itemErrors : undefined
          });
        } else {
          console.log(`SKIPPING sample items: addSampleItems=${addSampleItems}, existing?.id=${existing?.id}`);
          results.push({
            slug: definition.slug,
            status: 'exists',
            message: 'Collection already exists (sample items skipped)',
            id: existing?.id
          });
        }
        continue;
      }

      // Create the collection
      try {
        const createResponse = await fetch(`${BASE_URL}/sites/${siteId}/collections`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'accept': 'application/json',
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            displayName: definition.displayName,
            singularName: definition.singularName,
            slug: definition.slug
          })
        });

        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          throw new Error(errorData.message || `Failed to create collection: ${createResponse.status}`);
        }

        const newCollection = await createResponse.json();
        const collectionId = newCollection.id;

        // Add fields to the collection
        let fieldsCreated = 0;
        let fieldErrors: string[] = [];

        for (const field of definition.fields) {
          try {
            const fieldBody: any = {
              displayName: field.displayName,
              slug: field.slug,
              type: field.type,
              isRequired: field.isRequired
            };

            // Add validations for Option type fields
            if (field.type === 'Option' && field.validations) {
              fieldBody.validations = field.validations;
            }

            const fieldResponse = await fetch(`${BASE_URL}/collections/${collectionId}/fields`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiToken}`,
                'accept': 'application/json',
                'content-type': 'application/json'
              },
              body: JSON.stringify(fieldBody)
            });

            const fieldData = await consumeResponse(fieldResponse);
            if (fieldResponse.ok) {
              fieldsCreated++;
            } else {
              fieldErrors.push(`${field.slug}: ${fieldData.message || 'Unknown error'}`);
            }

            // Delay to avoid rate limiting and Cloudflare Worker limits
            await new Promise(resolve => setTimeout(resolve, 200));
          } catch (fieldErr: any) {
            fieldErrors.push(`${field.slug}: ${fieldErr.message}`);
          }
        }

        // Now create sample items for this collection
        let itemsCreated = 0;
        let itemErrors: string[] = [];
        const sampleItems = SAMPLE_DATA[definition.slug] || [];

        for (const sampleItem of sampleItems) {
          try {
            // Remove 'slug' field - Webflow auto-generates it from 'name'
            const { slug: _slug, ...fieldData } = sampleItem;

            const itemResponse = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiToken}`,
                'accept': 'application/json',
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                fieldData,
                isArchived: false,
                isDraft: false
              })
            });

            const itemData = await consumeResponse(itemResponse);
            if (itemResponse.ok) {
              itemsCreated++;
            } else {
              itemErrors.push(`${sampleItem.name || _slug}: ${itemData.message || itemData.msg || JSON.stringify(itemData)}`);
            }

            // Longer delay to avoid Cloudflare Worker limits
            await new Promise(resolve => setTimeout(resolve, 300));
          } catch (itemErr: any) {
            itemErrors.push(`${sampleItem.name || 'item'}: ${itemErr.message}`);
          }
        }

        results.push({
          slug: definition.slug,
          status: 'created',
          message: `Created with ${fieldsCreated}/${definition.fields.length} fields and ${itemsCreated}/${sampleItems.length} sample items`,
          id: collectionId,
          fieldsCreated,
          totalFields: definition.fields.length,
          fieldErrors: fieldErrors.length > 0 ? fieldErrors : undefined,
          itemsCreated,
          totalSampleItems: sampleItems.length,
          itemErrors: itemErrors.length > 0 ? itemErrors : undefined
        });

      } catch (createErr: any) {
        results.push({
          slug: definition.slug,
          status: 'error',
          message: createErr.message
        });
      }

      // Delay between collections to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 750));
    }

    // Process custom collections (user-created from the UI)
    for (const customCol of customCollections) {
      // Check if collection already exists
      if (existingSlugs.has(customCol.slug)) {
        results.push({
          slug: customCol.slug,
          status: 'exists',
          message: 'Collection already exists',
          isCustom: true
        });
        continue;
      }

      try {
        // Create the collection
        const createResponse = await fetch(`${BASE_URL}/sites/${siteId}/collections`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'accept': 'application/json',
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            displayName: customCol.displayName,
            singularName: customCol.singularName || customCol.displayName,
            slug: customCol.slug
          })
        });

        const createData = await consumeResponse(createResponse);
        if (!createResponse.ok) {
          throw new Error(createData.message || `Failed to create collection: ${createResponse.status}`);
        }

        const collectionId = createData.id;

        // Add fields to the collection
        let fieldsCreated = 0;
        let fieldErrors: string[] = [];

        for (const field of (customCol.fields || [])) {
          try {
            const fieldBody: any = {
              displayName: field.displayName,
              slug: field.slug,
              type: field.type,
              isRequired: field.isRequired || false
            };

            const fieldResponse = await fetch(`${BASE_URL}/collections/${collectionId}/fields`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiToken}`,
                'accept': 'application/json',
                'content-type': 'application/json'
              },
              body: JSON.stringify(fieldBody)
            });

            const fieldData = await consumeResponse(fieldResponse);
            if (fieldResponse.ok) {
              fieldsCreated++;
            } else {
              fieldErrors.push(`${field.slug}: ${fieldData.message || 'Unknown error'}`);
            }

            await new Promise(resolve => setTimeout(resolve, 200));
          } catch (fieldErr: any) {
            fieldErrors.push(`${field.slug}: ${fieldErr.message}`);
          }
        }

        results.push({
          slug: customCol.slug,
          status: 'created',
          message: `Created with ${fieldsCreated}/${customCol.fields?.length || 0} fields (no sample data)`,
          id: collectionId,
          fieldsCreated,
          totalFields: customCol.fields?.length || 0,
          fieldErrors: fieldErrors.length > 0 ? fieldErrors : undefined,
          isCustom: true
        });

      } catch (createErr: any) {
        results.push({
          slug: customCol.slug,
          status: 'error',
          message: createErr.message,
          isCustom: true
        });
      }

      await new Promise(resolve => setTimeout(resolve, 750));
    }

    // Calculate total items created
    const totalItemsCreated = results.reduce((sum, r) => sum + (r.itemsCreated || 0), 0);
    const totalSampleItems = results.reduce((sum, r) => sum + (r.totalSampleItems || 0), 0);

    return withCors(new Response(JSON.stringify({
      success: true,
      results,
      summary: {
        total: collectionsToSync.length + customCollections.length,
        created: results.filter(r => r.status === 'created').length,
        customCreated: results.filter(r => r.status === 'created' && r.isCustom).length,
        existing: results.filter(r => r.status === 'exists').length,
        errors: results.filter(r => r.status === 'error').length,
        itemsCreated: totalItemsCreated,
        totalSampleItems: totalSampleItems
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }));

  } catch (error: any) {
    console.error('Error syncing collections:', error);
    return withCors(new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
};
