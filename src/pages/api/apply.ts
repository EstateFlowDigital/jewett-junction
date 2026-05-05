import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { getWebflowApiToken } from '../../lib/admin-auth';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

interface ApplicationSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  experience?: string;
  referralSource?: string;
  coverLetter?: string;
  isVeteran?: boolean;
  resumeFileName?: string;
  submittedAt: string;
}

const experienceLabels: Record<string, string> = {
  '0-1': '0-1 years',
  '1-3': '1-3 years',
  '3-5': '3-5 years',
  '5-10': '5-10 years',
  '10+': '10+ years',
};

const referralLabels: Record<string, string> = {
  employee: 'Employee Referral',
  linkedin: 'LinkedIn',
  indeed: 'Indeed',
  website: 'Company Website',
  'career-fair': 'Career Fair',
  other: 'Other',
};

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
}

export const POST: APIRoute = async ({ request, locals }) => {
  let data: ApplicationSubmission;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!data.firstName || !data.lastName || !data.email || !data.position) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate email shape (basic syntactic check)
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(String(data.email).trim())) {
    return new Response(JSON.stringify({ error: 'Invalid email address' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  // Enforce reasonable caps on free-text fields to prevent abuse and
  // avoid Webflow validation errors (name field is PlainText max 256).
  const NAME_MAX = 80;
  const POSITION_MAX = 200;
  const COVER_LETTER_MAX = 5000;
  const PHONE_MAX = 40;
  if (data.firstName.length > NAME_MAX || data.lastName.length > NAME_MAX) {
    return new Response(JSON.stringify({ error: 'Name too long' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }
  if (data.position.length > POSITION_MAX) {
    return new Response(JSON.stringify({ error: 'Position too long' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }
  if (data.coverLetter && data.coverLetter.length > COVER_LETTER_MAX) {
    return new Response(JSON.stringify({ error: 'Cover letter too long (max 5000 characters)' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }
  if (data.phone && data.phone.length > PHONE_MAX) {
    return new Response(JSON.stringify({ error: 'Phone number too long' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiToken = getWebflowApiToken(locals);
  const collectionId = COLLECTIONS.jobApplications;
  if (!apiToken || !collectionId) {
    console.error('apply: WEBFLOW_API_TOKEN or jobApplications collection id missing');
    return new Response(JSON.stringify({ error: 'Server not configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }

  const displayName = `${data.firstName} ${data.lastName} \u2014 ${data.position}`;
  const timestamp = data.submittedAt || new Date().toISOString();
  const uniqueSlug = `${slugify(`${data.firstName}-${data.lastName}-${data.position}`)}-${Date.now().toString(36)}`;

  const fieldData: Record<string, any> = {
    name: displayName.slice(0, 256),
    slug: uniqueSlug,
    'first-name': data.firstName,
    'last-name': data.lastName,
    email: data.email,
    position: data.position,
    status: 'New',
    'submitted-at': timestamp,
  };
  if (data.phone) fieldData.phone = data.phone;
  if (data.coverLetter) fieldData['cover-letter'] = data.coverLetter;
  if (data.resumeFileName) fieldData['resume-file-name'] = data.resumeFileName;
  if (typeof data.isVeteran === 'boolean') fieldData['is-veteran'] = data.isVeteran;
  if (data.experience) fieldData.experience = experienceLabels[data.experience] || data.experience;
  if (data.referralSource) fieldData['referral-source'] = referralLabels[data.referralSource] || data.referralSource;

  try {
    const res = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      // Always create as draft — these are private internal records, not public pages.
      // The admin UI lists drafts, so this doesn't hide them from the team.
      body: JSON.stringify({ isArchived: false, isDraft: true, fieldData }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('apply: Webflow create failed', res.status, err.substring(0, 500));
      return new Response(JSON.stringify({ error: 'Unable to record application right now' }), {
        status: 502, headers: { 'Content-Type': 'application/json' },
      });
    }
    const created = await res.json();
    return new Response(JSON.stringify({ success: true, id: created.id }), {
      status: 200, headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error('apply: exception', e?.message);
    return new Response(JSON.stringify({ error: 'Unable to record application right now' }), {
      status: 502, headers: { 'Content-Type': 'application/json' },
    });
  }
};
