import type { APIRoute } from 'astro';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
const SAMPLE_DATA: Record<string, any[]> = {
  announcements: [
    {
      name: 'Q1 2025 All-Hands Meeting',
      slug: 'q1-2025-all-hands-meeting',
      content: '<p>Join us for our quarterly all-hands meeting to review our 2024 accomplishments and discuss our exciting plans for 2025. Breakfast will be provided.</p>',
      author: 'CEO Office',
      category: 'Company News',
      priority: 'High',
      'cta-text': 'Add to Calendar',
      'is-pinned': true
    },
    {
      name: 'New Safety Training Portal Launched',
      slug: 'new-safety-training-portal',
      content: '<p>We\'ve upgraded our safety training system with a new, user-friendly portal. All employees must complete their annual safety certification by February 28th.</p>',
      author: 'Safety Team',
      category: 'Safety Alert',
      priority: 'Urgent',
      'cta-text': 'Start Training',
      'is-pinned': true
    },
    {
      name: 'Benefits Open Enrollment Now Open',
      slug: 'benefits-open-enrollment',
      content: '<p>Open enrollment for 2025 benefits runs January 15-31. Review your options and make any changes to your health, dental, and vision coverage.</p>',
      author: 'HR Team',
      category: 'HR Update',
      priority: 'Normal',
      'cta-text': 'Review Benefits'
    }
  ],
  events: [
    {
      name: 'Q1 All-Hands Meeting',
      slug: 'q1-all-hands-meeting',
      'event-date': new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Main Conference Room, Building A',
      category: 'All-Hands Meeting',
      description: '<p>Quarterly company meeting to review progress and discuss upcoming initiatives. All employees are expected to attend.</p>',
      'is-mandatory': true,
      'is-virtual': false
    },
    {
      name: 'OSHA Safety Certification Training',
      slug: 'osha-safety-training',
      'event-date': new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Training Center',
      category: 'Training',
      description: '<p>Annual OSHA 30-hour safety certification course. Mandatory for all field personnel.</p>',
      capacity: 25,
      'is-mandatory': true
    },
    {
      name: 'Team Building Happy Hour',
      slug: 'team-building-happy-hour',
      'event-date': new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'The Pub Downtown',
      category: 'Social Event',
      description: '<p>Join your colleagues for an evening of fun and networking. First round on the company!</p>',
      'is-mandatory': false
    },
    {
      name: 'Benefits Q&A Webinar',
      slug: 'benefits-qa-webinar',
      'event-date': new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Microsoft Teams',
      category: 'HR Session',
      description: '<p>Live Q&A session with HR about your 2025 benefits options. Get your questions answered!</p>',
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
      description: '<p>Lead large-scale commercial construction projects from inception to completion. Manage client relationships, budgets, and cross-functional teams.</p>',
      requirements: '<ul><li>10+ years construction experience</li><li>PMP certification preferred</li><li>Strong leadership skills</li></ul>',
      benefits: '401k match, health/dental/vision, company vehicle, performance bonus',
      urgency: 'Priority',
      'job-is-active': true,
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
      requirements: '<ul><li>OSHA 30-hour certification</li><li>5+ years safety experience</li><li>Excellent communication skills</li></ul>',
      benefits: '401k match, health/dental/vision, PTO, training budget',
      urgency: 'Normal',
      'job-is-active': true,
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
      requirements: '<ul><li>BS in Civil Engineering or Construction Management</li><li>0-3 years experience</li><li>AutoCAD proficiency</li></ul>',
      benefits: '401k match, health/dental/vision, mentorship program',
      urgency: 'Normal',
      'job-is-active': true,
      'is-remote': false
    }
  ],
  'culture-stories': [
    {
      name: 'Employee Spotlight: Sarah Martinez',
      slug: 'employee-spotlight-sarah-martinez',
      type: 'Employee Spotlight',
      content: '<p>Sarah joined Jewett Construction 8 years ago as a project coordinator and has grown into one of our most respected project managers. Her dedication to excellence and team mentorship exemplifies our core values.</p>',
      excerpt: 'From project coordinator to senior PM, Sarah\'s journey showcases what\'s possible at Jewett.',
      'person-name': 'Sarah Martinez',
      'person-role': 'Senior Project Manager',
      'person-tenure': '8 years',
      quote: 'What I love most about Jewett is the culture of continuous improvement. Every day is an opportunity to learn and grow.',
      author: 'HR Team',
      featured: true
    },
    {
      name: 'Team Win: Downtown Plaza Completed Early',
      slug: 'team-win-downtown-plaza',
      type: 'Team Win',
      content: '<p>Congratulations to the Downtown Plaza project team for completing Phase 2 structural work two weeks ahead of schedule! This milestone achievement demonstrates our commitment to excellence and collaboration.</p>',
      excerpt: 'The Downtown Plaza team delivered Phase 2 two weeks early through exceptional teamwork.',
      author: 'Marketing Team',
      featured: true
    },
    {
      name: 'Core Value: Safety First',
      slug: 'core-value-safety-first',
      type: 'Core Value',
      content: '<p>At Jewett Construction, nothing is more important than everyone going home safe. Our 4EverSafe commitment guides every decision we make, from planning to execution.</p>',
      excerpt: 'Safety isn\'t just a priority—it\'s our foundation.',
      author: 'Safety Team',
      featured: true
    }
  ],
  employees: [
    {
      name: 'John Richardson',
      slug: 'john-richardson',
      role: 'Chief Executive Officer',
      department: 'Executive',
      'office-location': 'Columbus HQ',
      email: 'jrichardson@jewettconstruction.com',
      phone: '(614) 555-0100',
      bio: 'John has led Jewett Construction for over 15 years, growing the company from a regional builder to a nationally recognized construction firm.',
      'is-featured': true,
      'is-leadership': true
    },
    {
      name: 'Maria Santos',
      slug: 'maria-santos',
      role: 'VP of Operations',
      department: 'Operations',
      'office-location': 'Columbus HQ',
      email: 'msantos@jewettconstruction.com',
      phone: '(614) 555-0101',
      bio: 'Maria oversees all field operations and ensures projects are delivered on time and within budget.',
      'is-featured': true,
      'is-leadership': true
    },
    {
      name: 'Robert Chen',
      slug: 'robert-chen',
      role: 'Director of Safety',
      department: 'Safety',
      'office-location': 'Columbus HQ',
      email: 'rchen@jewettconstruction.com',
      phone: '(614) 555-0102',
      certifications: 'OSHA 500, CSP, CHST',
      bio: 'Robert leads our 4EverSafe program and has helped maintain our industry-leading safety record.',
      'is-leadership': true
    },
    {
      name: 'Jennifer Williams',
      slug: 'jennifer-williams',
      role: 'HR Director',
      department: 'HR',
      'office-location': 'Columbus HQ',
      email: 'jwilliams@jewettconstruction.com',
      phone: '(614) 555-0103',
      bio: 'Jennifer manages all HR functions including recruitment, benefits, and employee development programs.',
      'is-leadership': true
    }
  ],
  resources: [
    {
      name: 'Employee Handbook 2025',
      slug: 'employee-handbook-2025',
      category: 'HR Policies',
      description: 'Complete guide to company policies, procedures, and employee expectations.',
      'file-type': 'PDF',
      'file-size': '2.4 MB',
      version: 'v2025.1',
      audience: 'All Employees',
      'is-required': true,
      'is-new': true
    },
    {
      name: 'Safety Procedures Manual',
      slug: 'safety-procedures-manual',
      category: 'Safety',
      description: 'Comprehensive safety guidelines and emergency procedures for all job sites.',
      'file-type': 'PDF',
      'file-size': '5.1 MB',
      version: 'v3.2',
      audience: 'All Employees',
      'is-required': true
    },
    {
      name: 'Benefits Summary Guide',
      slug: 'benefits-summary-guide',
      category: 'Benefits',
      description: 'Overview of all employee benefits including health, dental, vision, and 401k.',
      'file-type': 'PDF',
      'file-size': '1.8 MB',
      version: 'v2025',
      audience: 'All Employees',
      'is-new': true
    },
    {
      name: 'IT Setup Guide for New Employees',
      slug: 'it-setup-guide',
      category: 'IT Support',
      description: 'Step-by-step guide to setting up your computer, email, and required software.',
      'file-type': 'PDF',
      'file-size': '3.2 MB',
      audience: 'New Hires'
    }
  ],
  'hr-content': [
    {
      name: 'PTO Policy',
      slug: 'pto-policy',
      'content-type': 'Policy',
      description: 'Guidelines for requesting and using paid time off.',
      content: '<p>Full-time employees receive 15 days PTO annually, plus 10 paid holidays. PTO must be requested at least 2 weeks in advance for planned absences.</p>',
      'applies-to': 'All Employees',
      'priority-order': 1,
      featured: true,
      'is-active': true
    },
    {
      name: 'Health Insurance Options',
      slug: 'health-insurance-options',
      'content-type': 'Benefit',
      description: 'Overview of available health insurance plans and coverage levels.',
      content: '<p>We offer three tiers of health coverage: Bronze, Silver, and Gold. All plans include preventive care at no cost and competitive copays.</p>',
      'applies-to': 'Full-time',
      'priority-order': 2,
      featured: true,
      'is-active': true
    },
    {
      name: '401(k) Retirement Plan',
      slug: '401k-retirement-plan',
      'content-type': 'Benefit',
      description: 'Details about our 401(k) plan and company matching.',
      content: '<p>Jewett matches 100% of contributions up to 4% of salary. Vesting is immediate for employee contributions and gradual over 3 years for company match.</p>',
      'applies-to': 'All Employees',
      featured: true,
      'is-active': true
    }
  ],
  'safety-content': [
    {
      name: 'Fall Protection Protocol',
      slug: 'fall-protection-protocol',
      'content-type': 'Protocol',
      severity: 'Critical',
      description: 'Required fall protection procedures for all elevated work.',
      content: '<p>All work at heights of 6 feet or more requires fall protection. This includes guardrails, safety nets, or personal fall arrest systems.</p>',
      'required-for': 'Field Workers',
      'priority-order': 1,
      featured: true,
      'is-active': true
    },
    {
      name: 'PPE Requirements',
      slug: 'ppe-requirements',
      'content-type': 'Protocol',
      severity: 'Warning',
      description: 'Personal protective equipment requirements by job site area.',
      content: '<p>Hard hats, safety glasses, and steel-toed boots are required at all times on active job sites. Additional PPE may be required based on specific tasks.</p>',
      'required-for': 'All Employees',
      'priority-order': 2,
      featured: true,
      'is-active': true
    },
    {
      name: 'Heat Illness Prevention',
      slug: 'heat-illness-prevention',
      'content-type': 'Best Practice',
      severity: 'Info',
      description: 'Guidelines for preventing heat-related illness during summer months.',
      content: '<p>Stay hydrated, take regular breaks in shaded areas, and know the signs of heat exhaustion. Work schedules may be adjusted during extreme heat.</p>',
      'required-for': 'Field Workers',
      'is-active': true
    }
  ],
  'it-knowledge-base': [
    {
      name: 'How to Reset Your Password',
      slug: 'how-to-reset-password',
      'article-type': 'How-To Guide',
      summary: 'Step-by-step instructions for resetting your network password.',
      content: '<p>1. Go to password.jewettconstruction.com<br>2. Enter your email address<br>3. Click "Reset Password"<br>4. Check your email for the reset link<br>5. Create a new password following the requirements</p>',
      platform: 'All',
      difficulty: 'Easy',
      featured: true,
      'is-active': true
    },
    {
      name: 'VPN Setup Guide',
      slug: 'vpn-setup-guide',
      'article-type': 'How-To Guide',
      summary: 'How to connect to the company VPN for remote work.',
      content: '<p>Download the GlobalProtect app from the IT portal and enter vpn.jewettconstruction.com as the portal address. Use your network credentials to log in.</p>',
      platform: 'All',
      difficulty: 'Intermediate',
      featured: true,
      'is-active': true
    },
    {
      name: 'Microsoft Teams Quick Start',
      slug: 'microsoft-teams-quick-start',
      'article-type': 'Software',
      summary: 'Getting started with Microsoft Teams for communication and collaboration.',
      content: '<p>Teams is our primary tool for chat, video calls, and file sharing. Download from the Microsoft 365 portal and sign in with your work email.</p>',
      platform: 'All',
      difficulty: 'Easy',
      featured: true,
      'is-active': true
    }
  ],
  'marketing-assets': [
    {
      name: 'Jewett Logo - Primary',
      slug: 'jewett-logo-primary',
      'asset-type': 'Logo',
      description: 'Primary company logo for standard use on white/light backgrounds.',
      'file-format': 'SVG',
      'file-size': '24 KB',
      tags: 'logo, primary, color',
      version: 'v2.0',
      featured: true,
      'is-active': true
    },
    {
      name: 'Jewett Logo - White',
      slug: 'jewett-logo-white',
      'asset-type': 'Logo',
      description: 'White version of company logo for use on dark backgrounds.',
      'file-format': 'SVG',
      'file-size': '22 KB',
      tags: 'logo, white, reversed',
      version: 'v2.0',
      'is-active': true
    },
    {
      name: 'Brand Guidelines',
      slug: 'brand-guidelines',
      'asset-type': 'Brand Guide',
      description: 'Complete brand standards including colors, typography, and logo usage.',
      'file-format': 'PDF',
      'file-size': '8.5 MB',
      version: 'v2025',
      featured: true,
      'is-active': true
    },
    {
      name: 'PowerPoint Template',
      slug: 'powerpoint-template',
      'asset-type': 'Template',
      description: 'Official company presentation template with branded slides.',
      'file-format': 'PPTX',
      'file-size': '4.2 MB',
      version: 'v1.3',
      'is-active': true
    }
  ],
  'submitted-ideas': [
    {
      name: 'Digital Timesheet App',
      slug: 'digital-timesheet-app',
      category: 'Technology',
      description: '<p>Develop a mobile app for field workers to submit timesheets instead of paper forms. Would save time and reduce errors.</p>',
      'submitted-by': 'Mike Thompson',
      'submitter-email': 'mthompson@jewettconstruction.com',
      department: 'Operations',
      status: 'Under Review',
      priority: 'High',
      votes: 24,
      featured: true
    },
    {
      name: 'Tool Tracking System',
      slug: 'tool-tracking-system',
      category: 'Process Improvement',
      description: '<p>Implement QR codes on tools and equipment for easy tracking. Would help reduce lost equipment and improve accountability.</p>',
      'submitted-by': 'Jennifer Adams',
      department: 'Safety',
      status: 'Approved',
      priority: 'Medium',
      votes: 18
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

    const results: any[] = [];

    // Process each collection to sync
    for (const collectionKey of collectionsToSync) {
      const definition = COLLECTION_DEFINITIONS[collectionKey as keyof typeof COLLECTION_DEFINITIONS];
      if (!definition) {
        results.push({ slug: collectionKey, status: 'error', message: 'Unknown collection' });
        continue;
      }

      // Check if collection already exists
      if (existingSlugs.has(definition.slug)) {
        // Find the existing collection to get its ID
        const existing = existingCollections.find((c: any) => c.slug === definition.slug);

        // If addSampleItems is true, add sample items to existing collection
        if (addSampleItems && existing?.id) {
          const sampleItems = SAMPLE_DATA[definition.slug] || [];
          console.log(`Adding ${sampleItems.length} sample items to existing collection ${definition.slug} (${existing.id})`);
          let itemsCreated = 0;
          let itemErrors: string[] = [];

          for (const sampleItem of sampleItems) {
            try {
              // Remove 'slug' field - Webflow auto-generates it from 'name'
              const { slug: _slug, ...fieldData } = sampleItem;
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
          results.push({
            slug: definition.slug,
            status: 'exists',
            message: 'Collection already exists',
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
