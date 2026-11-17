import type { APIRoute } from 'astro';
import { COLLECTIONS } from '../../lib/webflow-cms';
import { getWebflowApiToken } from '../../lib/admin-auth';
import { sendNotification } from '../../lib/notify';
import { mapSubmissionToFieldData } from '../../lib/form-submission-mapper';
import {
  elfHuntStatus,
  elfWeekLabel,
  cleanName,
  isUploadedPhotoUrl,
  easternTimestamp,
} from '../../lib/elf-hunt';

export const prerender = false;

const BASE_URL = 'https://api.webflow.com/v2';

// "Where's the Elf?" photo submissions (Nov 30 to Dec 23). The form uploads
// the photo through /api/upload-photo first, then posts the name and photo
// link here. Each photo becomes its own Form Submissions draft, filed under
// the week it was sent (the elf moves every Monday), and is emailed with the
// photo inline to the elfHunt inbox. The Eastern timestamp, to the second, is
// what decides who found the elf first that week.

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

export const POST: APIRoute = async ({ request, locals }) => {
  const status = elfHuntStatus();
  if (status === 'upcoming' && !import.meta.env.DEV) {
    return json({ error: 'The elf hunt starts Monday, November 30.' }, 403);
  }
  if (status === 'closed' && !import.meta.env.DEV) {
    return json({ error: 'The elf hunt has ended.' }, 403);
  }

  let data: any;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  const name = cleanName(data?.name);
  if (!name) return json({ error: 'Please enter your name.' }, 400);
  if (!isUploadedPhotoUrl(data?.photoUrl)) return json({ error: 'Please upload a photo of the elf.' }, 400);
  const photoUrl = String(data.photoUrl);

  const apiToken = getWebflowApiToken(locals);
  const collectionId = COLLECTIONS.formSubmissions;
  if (!apiToken || !collectionId) {
    console.error('elf-hunt: WEBFLOW_API_TOKEN or the formSubmissions collection is not configured');
    return json({ error: 'Server configuration error' }, 500);
  }

  const now = new Date();
  const week = elfWeekLabel(now);
  const when = easternTimestamp(now);
  const submissionId = `elf-hunt-${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const fieldData = mapSubmissionToFieldData({
    id: submissionId,
    formId: 'elf-hunt',
    displayName: `Elf Hunt (week of ${week})`,
    formResponse: {
      'Your Name': name,
      'Week Of': week,
      'Submitted (Eastern)': when,
      'Photo': photoUrl,
    },
    dateSubmitted: now.toISOString(),
    publishedPath: '/culture/elf-hunt',
  });

  try {
    // Drafts, like the other form records: internal, never published pages.
    const res = await fetch(`${BASE_URL}/collections/${collectionId}/items`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiToken}`, 'Content-Type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ isArchived: false, isDraft: true, fieldData }),
    });
    if (!res.ok) {
      console.error('elf-hunt: Webflow create failed', res.status, (await res.text()).substring(0, 300));
      return json({ error: 'Something went wrong sending your photo. Please try again.' }, 502);
    }

    await sendNotification(locals, {
      inbox: 'elfHunt',
      subject: `[Elf Hunt] ${name}, week of ${week}`,
      imageUrl: photoUrl,
      fields: [
        { label: 'Name', value: name },
        { label: 'Week of', value: week },
        { label: 'Submitted (Eastern)', value: when },
        { label: 'Photo', value: photoUrl },
      ],
    });

    return json({ success: true });
  } catch (error: any) {
    console.error('elf-hunt: error saving submission:', error?.message);
    return json({ error: 'Something went wrong sending your photo. Please try again.' }, 502);
  }
};

// CORS preflight is handled by middleware
export const OPTIONS: APIRoute = async () => new Response(null, { status: 204 });
