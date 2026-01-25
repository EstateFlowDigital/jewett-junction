import type { APIRoute } from 'astro';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

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

// GET - Fetch existing collections
export const GET: APIRoute = async ({ request, locals }) => {
  if (!verifyToken(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const apiToken = getEnvVar(locals, 'WEBFLOW_API_TOKEN');
  const siteId = getEnvVar(locals, 'WEBFLOW_SITE_ID');

  if (!siteId || !apiToken) {
    return new Response(JSON.stringify({ error: 'API credentials not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
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
    return new Response(JSON.stringify({
      existing: data.collections || [],
      defined: Object.keys(COLLECTION_DEFINITIONS).map(key => ({
        slug: key,
        displayName: COLLECTION_DEFINITIONS[key as keyof typeof COLLECTION_DEFINITIONS].displayName,
        fieldCount: COLLECTION_DEFINITIONS[key as keyof typeof COLLECTION_DEFINITIONS].fields.length
      }))
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error fetching collections:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST - Create/sync collections
export const POST: APIRoute = async ({ request, locals }) => {
  if (!verifyToken(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const apiToken = getEnvVar(locals, 'WEBFLOW_API_TOKEN');
  const siteId = getEnvVar(locals, 'WEBFLOW_SITE_ID');

  if (!siteId || !apiToken) {
    return new Response(JSON.stringify({ error: 'API credentials not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const { collections: collectionsToSync } = body;

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
        results.push({
          slug: definition.slug,
          status: 'exists',
          message: 'Collection already exists',
          id: existing?.id
        });
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

            if (fieldResponse.ok) {
              fieldsCreated++;
            } else {
              const fieldError = await fieldResponse.json();
              fieldErrors.push(`${field.slug}: ${fieldError.message || 'Unknown error'}`);
            }

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (fieldErr: any) {
            fieldErrors.push(`${field.slug}: ${fieldErr.message}`);
          }
        }

        results.push({
          slug: definition.slug,
          status: 'created',
          message: `Created with ${fieldsCreated}/${definition.fields.length} fields`,
          id: collectionId,
          fieldsCreated,
          totalFields: definition.fields.length,
          fieldErrors: fieldErrors.length > 0 ? fieldErrors : undefined
        });

      } catch (createErr: any) {
        results.push({
          slug: definition.slug,
          status: 'error',
          message: createErr.message
        });
      }

      // Delay between collections to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return new Response(JSON.stringify({
      success: true,
      results,
      summary: {
        total: collectionsToSync.length,
        created: results.filter(r => r.status === 'created').length,
        existing: results.filter(r => r.status === 'exists').length,
        errors: results.filter(r => r.status === 'error').length
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error syncing collections:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
