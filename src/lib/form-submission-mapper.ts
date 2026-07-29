// Shared helpers to turn a raw Webflow form submission into a CMS fieldData
// payload. Used by both the live webhook receiver and the backfill endpoint
// so the mapping stays consistent.

type AnyRecord = Record<string, unknown>;

function pickField(response: AnyRecord, matchers: RegExp[]): string | undefined {
  for (const [key, value] of Object.entries(response)) {
    if (typeof value !== 'string') continue;
    if (matchers.some((re) => re.test(key))) return value;
  }
  return undefined;
}

// Also match the attribution labels our own forms use ("Submitted By",
// "Requested By", "Nominated By") so the admin triage list shows a real
// submitter name instead of a blank column.
const NAME_MATCHERS = [
  /^name$/i,
  /full\s*name/i,
  /contact\s*name/i,
  /your\s*name/i,
  /first\s*name/i,
  /submitted\s*by/i,
  /requested\s*by/i,
  /nominated\s*by/i,
  /reported\s*by/i,
];
const EMAIL_MATCHERS = [/^e?-?mail/i, /email\s*address/i];
const PHONE_MATCHERS = [/^phone/i, /phone\s*number/i, /mobile/i, /contact\s*number/i];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderFullResponseHtml(response: AnyRecord): string {
  const entries = Object.entries(response);
  if (entries.length === 0) return '';
  const rows = entries
    .map(([k, v]) => {
      const value = typeof v === 'string' ? v : JSON.stringify(v);
      return `<p><strong>${escapeHtml(k)}:</strong> ${escapeHtml(value)}</p>`;
    })
    .join('');
  return rows;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function formatDisplayName(formName: string, submitterName: string | undefined, submittedAt: string): string {
  const when = new Date(submittedAt);
  const whenStr = isNaN(when.getTime())
    ? ''
    : when.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const parts = [formName || 'Form Submission'];
  if (submitterName) parts.push(submitterName);
  if (whenStr) parts.push(whenStr);
  return parts.join(' — ').slice(0, 256);
}

export interface WebflowSubmissionLike {
  id: string;
  formId?: string;
  displayName?: string;
  formResponse?: AnyRecord;
  dateSubmitted?: string;
  publishedPath?: string;
}

/** Canonical slug & dedup key — prefixed by submission-id so backfill & webhook
 * never race each other. */
export function submissionSlug(submissionId: string): string {
  return `sub-${submissionId}`;
}

export interface FormSubmissionFieldData {
  name: string;
  slug: string;
  'form-name'?: string;
  'webflow-form-id'?: string;
  'submission-id': string;
  'submitted-at'?: string;
  'submitter-name'?: string;
  'submitter-email'?: string;
  'submitter-phone'?: string;
  'published-path'?: string;
  'full-response'?: string;
  status: string;
}

export function mapSubmissionToFieldData(submission: WebflowSubmissionLike): FormSubmissionFieldData {
  const response: AnyRecord = submission.formResponse || {};
  const submittedAt = submission.dateSubmitted || new Date().toISOString();
  const formName = submission.displayName || 'Form Submission';

  const submitterName = pickField(response, NAME_MATCHERS);
  const submitterEmail = pickField(response, EMAIL_MATCHERS);
  const submitterPhone = pickField(response, PHONE_MATCHERS);

  const displayName = formatDisplayName(formName, submitterName, submittedAt);
  const slug = submissionSlug(submission.id);

  const fieldData: FormSubmissionFieldData = {
    name: displayName,
    slug,
    'submission-id': submission.id,
    status: 'New',
  };
  if (formName) fieldData['form-name'] = formName;
  if (submission.formId) fieldData['webflow-form-id'] = submission.formId;
  if (submittedAt) fieldData['submitted-at'] = submittedAt;
  if (submitterName) fieldData['submitter-name'] = submitterName;
  if (submitterEmail) fieldData['submitter-email'] = submitterEmail;
  if (submitterPhone) fieldData['submitter-phone'] = submitterPhone;
  if (submission.publishedPath) fieldData['published-path'] = submission.publishedPath;
  const fullResponseHtml = renderFullResponseHtml(response);
  if (fullResponseHtml) fieldData['full-response'] = fullResponseHtml;

  return fieldData;
}

// Webhook payload shape (from Webflow v2 form_submission trigger)
export interface WebflowFormSubmissionWebhook {
  triggerType?: string;
  payload?: {
    id?: string;
    formId?: string;
    name?: string;
    siteId?: string;
    data?: AnyRecord;
    submittedAt?: string;
    formElementId?: string | null;
    schema?: unknown[];
  };
}

export function mapWebhookPayload(body: WebflowFormSubmissionWebhook): WebflowSubmissionLike | null {
  const p = body.payload;
  if (!p || !p.id) return null;
  return {
    id: p.id,
    formId: p.formId,
    displayName: p.name,
    formResponse: p.data,
    dateSubmitted: p.submittedAt,
    publishedPath: undefined,
  };
}

export { slugify };
