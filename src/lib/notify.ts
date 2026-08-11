// Sends notification emails for form submissions (IT tickets, safety incidents,
// idea submissions, etc.) via the Resend API. Each form endpoint imports
// `sendNotification` and provides the recipient + body.
//
// Env vars (set in Webflow Cloud env / .dev.vars):
//   RESEND_API_KEY      — required
//   NOTIFY_FROM_EMAIL   — required, e.g. "noreply@jewettconstruction.com"
//                         (must be a Resend-verified sending domain)
//   IT_INBOX_EMAIL      — IT support inbox
//   SAFETY_INBOX_EMAIL  — safety/EH&S team inbox
//   HR_INBOX_EMAIL      — HR team inbox
//   IDEAS_INBOX_EMAIL   — general ideas/feedback inbox
//   SIGNAGE_INBOX_EMAIL — signage request inbox
//
// If RESEND_API_KEY is not configured, sendNotification returns a graceful
// `{ ok: false, skipped: true }` so the form submission still succeeds —
// the CMS record is the source of truth, the email is best-effort delivery.

interface RuntimeEnv {
  RESEND_API_KEY?: string;
  NOTIFY_FROM_EMAIL?: string;
  // Base URL of the intranet — used to build the "View in Jewett Junction"
  // link. Already configured in Webflow Cloud.
  SITE_URL?: string;
  // Comma-separated list of addresses CC'd on every notification — used
  // during rollout so marketing/leadership can audit all submissions.
  NOTIFY_CC_EMAIL?: string;
  IT_INBOX_EMAIL?: string;
  SAFETY_INBOX_EMAIL?: string;
  HR_INBOX_EMAIL?: string;
  IDEAS_INBOX_EMAIL?: string;
  SIGNAGE_INBOX_EMAIL?: string;
  // Any *_INBOX_EMAIL may be a comma-separated list of addresses.
  MISSION_INBOX_EMAIL?: string;
  SALES_LEAD_INBOX_EMAIL?: string;
  BUILTWELL_INBOX_EMAIL?: string;
  MARKETING_INBOX_EMAIL?: string;
}

function getEnv(locals: any): RuntimeEnv {
  const runtime = (locals as any)?.runtime?.env;
  if (runtime) return runtime as RuntimeEnv;
  return import.meta.env as unknown as RuntimeEnv;
}

export type InboxKey =
  | 'it'
  | 'safety'
  | 'hr'
  | 'ideas'
  | 'signage'
  | 'mission'
  | 'salesLead'
  | 'builtwell'
  | 'marketing';

function inboxAddress(env: RuntimeEnv, key: InboxKey): string | undefined {
  switch (key) {
    case 'it': return env.IT_INBOX_EMAIL;
    case 'safety': return env.SAFETY_INBOX_EMAIL;
    case 'hr': return env.HR_INBOX_EMAIL;
    case 'ideas': return env.IDEAS_INBOX_EMAIL;
    case 'signage': return env.SIGNAGE_INBOX_EMAIL;
    case 'mission': return env.MISSION_INBOX_EMAIL;
    case 'salesLead': return env.SALES_LEAD_INBOX_EMAIL;
    case 'builtwell': return env.BUILTWELL_INBOX_EMAIL;
    case 'marketing': return env.MARKETING_INBOX_EMAIL;
  }
}

// An inbox may be configured with several addresses ("a@x.com, b@x.com").
// Resend accepts an array for `to`, so split and trim into one.
function parseRecipients(raw: string): string[] {
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface NotifyParams {
  inbox: InboxKey;
  subject: string;
  // Ordered { label, value } pairs rendered as labelled rows in the email.
  // Keep `value` plain text — escapeHtml is applied automatically.
  fields: Array<{ label: string; value: string | undefined | null }>;
  // Optional reply-to so the team can reply directly to the submitter.
  replyTo?: string;
  // Optional extra CC addresses for this specific notification, on top of
  // the global NOTIFY_CC_EMAIL list.
  cc?: string[];
  // Optional image rendered inline above the fields — used by the job site
  // photo form so recipients see the photo instead of a bare CDN link.
  imageUrl?: string;
  // Optional destination for the "View in Jewett Junction" button. Defaults
  // to the admin submissions list when SITE_URL is configured.
  viewUrl?: string;
}

const BRAND_RED = '#D8292E';
const LOGO_URL =
  'https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e98/6a034aab70b73de112b95971_6a034a93b918876d95f33147_1778600595859-JCC-Horizontal-Small.jpeg';

// Every form subject follows "[Form Name] detail". Split it so the email can
// show the form name as a kicker and the detail as the headline. Falls back
// to the whole subject if a caller ever drops the convention.
function splitSubject(subject: string): { kicker: string; title: string } {
  const m = subject.match(/^\s*\[([^\]]+)\]\s*(.*)$/);
  if (!m) return { kicker: 'Jewett Junction', title: subject };
  return { kicker: m[1], title: m[2] || m[1] };
}

// Date inputs arrive as plain YYYY-MM-DD. Render them the way a person would
// write them. Parsed as UTC and formatted in Eastern would shift the day back,
// so format the parts directly — these are calendar dates, not instants.
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
function prettifyDate(value: string): string {
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return value;
  const [, y, mo, d] = m;
  const month = MONTHS[Number(mo) - 1];
  if (!month) return value;
  return `${month} ${Number(d)}, ${y}`;
}

function isImageUrl(url: string): boolean {
  return /^https:\/\//i.test(url);
}

function buildHtml(params: NotifyParams, viewUrl: string): string {
  const { kicker, title } = splitSubject(params.subject);
  const visible = params.fields.filter(
    (f) => f.value !== undefined && f.value !== null && String(f.value).trim() !== '',
  );

  const rows = visible
    .map((f, i) => {
      const raw = prettifyDate(String(f.value).trim());
      const value = escapeHtml(raw).replace(/\n/g, '<br/>');
      const border = i === 0 ? '' : 'border-top:1px solid #eceef1;';
      return `<tr><td style="padding:14px 0;${border}">
<p style="margin:0 0 5px;font:700 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.07em;text-transform:uppercase;color:#6b7280;">${escapeHtml(f.label)}</p>
<p style="margin:0;font:400 15px/1.6 Arial,Helvetica,sans-serif;color:#14181f;word-break:break-word;">${value}</p>
</td></tr>`;
    })
    .join('');

  const photo =
    params.imageUrl && isImageUrl(params.imageUrl)
      ? `<tr><td style="padding:4px 32px 0;">
<a href="${escapeHtml(params.imageUrl)}" style="text-decoration:none;">
<img src="${escapeHtml(params.imageUrl)}" alt="Submitted photo" width="536" style="display:block;width:100%;max-width:536px;height:auto;border:1px solid #e3e5e9;border-radius:8px;" />
</a>
</td></tr>`
      : '';

  const button = viewUrl
    ? `<tr><td style="padding:26px 32px 4px;">
<a href="${escapeHtml(viewUrl)}" style="display:inline-block;background:${BRAND_RED};color:#ffffff;font:700 14px/1 Arial,Helvetica,sans-serif;text-decoration:none;padding:14px 26px;border-radius:8px;">View in Jewett Junction</a>
</td></tr>`
    : '';

  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light only" />
<title>${escapeHtml(params.subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;-webkit-text-size-adjust:100%;">
<div style="display:none;font-size:0;line-height:0;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(title)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f5f7;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e3e5e9;border-radius:12px;">
<tr><td align="center" style="padding:26px 24px 18px;">
<img src="${LOGO_URL}" alt="Jewett Construction" width="190" style="display:block;width:190px;max-width:58%;height:auto;border:0;" />
</td></tr>
<tr><td style="height:4px;background:${BRAND_RED};font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:26px 32px 2px;">
<p style="margin:0 0 7px;font:700 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.09em;text-transform:uppercase;color:${BRAND_RED};">${escapeHtml(kicker)}</p>
<h1 style="margin:0;font:700 21px/1.35 Arial,Helvetica,sans-serif;color:#14181f;">${escapeHtml(title)}</h1>
</td></tr>
${photo}
<tr><td style="padding:10px 32px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${rows}</table>
</td></tr>
${button}
<tr><td style="padding:26px 32px 28px;">
<p style="margin:0;border-top:1px solid #eceef1;padding-top:16px;font:400 12px/1.6 Arial,Helvetica,sans-serif;color:#9199a5;">
Submitted through Jewett Junction, the Jewett Construction employee intranet. This message was sent automatically — replies go to the submitter where an address was provided.
</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

// Plain-text alternative. Improves deliverability and keeps the message
// readable in clients that refuse HTML.
function buildText(params: NotifyParams, viewUrl: string): string {
  const { kicker, title } = splitSubject(params.subject);
  const lines = [kicker.toUpperCase(), title, ''];
  let imageAlreadyListed = false;
  for (const f of params.fields) {
    if (f.value === undefined || f.value === null || String(f.value).trim() === '') continue;
    const raw = String(f.value).trim();
    if (params.imageUrl && raw === params.imageUrl) imageAlreadyListed = true;
    lines.push(`${f.label}: ${prettifyDate(raw)}`);
  }
  // Only add the photo link if a field didn't already carry it.
  if (params.imageUrl && !imageAlreadyListed) lines.push('', `Photo: ${params.imageUrl}`);
  if (viewUrl) lines.push('', `View in Jewett Junction: ${viewUrl}`);
  lines.push('', 'Submitted through Jewett Junction, the Jewett Construction employee intranet.');
  return lines.join('\n');
}

export interface NotifyResult {
  ok: boolean;
  skipped?: boolean;
  error?: string;
}

export async function sendNotification(locals: any, params: NotifyParams): Promise<NotifyResult> {
  const env = getEnv(locals);
  const apiKey = env.RESEND_API_KEY;
  const from = env.NOTIFY_FROM_EMAIL;
  const toRaw = inboxAddress(env, params.inbox);
  const to = toRaw ? parseRecipients(toRaw) : [];

  if (!apiKey || !from || to.length === 0) {
    console.warn(`notify: skipped — missing config (apiKey:${!!apiKey} from:${!!from} to:${to.length})`);
    return { ok: false, skipped: true };
  }

  const siteUrl = (env.SITE_URL || '').replace(/\/+$/, '');
  const viewUrl = params.viewUrl || (siteUrl ? `${siteUrl}/admin/form-submissions` : '');
  const html = buildHtml(params, viewUrl);
  const text = buildText(params, viewUrl);

  // CC list: from env (comma-separated) plus any per-call extras.
  // Strip duplicates and the primary `to` so nobody gets emailed twice.
  const ccFromEnv = (env.NOTIFY_CC_EMAIL || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const toLower = new Set(to.map((a) => a.toLowerCase()));
  const cc = Array.from(new Set([...ccFromEnv, ...(params.cc || [])]))
    .filter((addr) => !toLower.has(addr.toLowerCase()));

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject: params.subject,
        html,
        text,
        ...(cc.length > 0 ? { cc } : {}),
        ...(params.replyTo ? { reply_to: params.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error('notify: Resend error', res.status, errText.substring(0, 300));
      return { ok: false, error: `${res.status}: ${errText.substring(0, 200)}` };
    }
    return { ok: true };
  } catch (e: any) {
    console.error('notify: exception', e?.message);
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}
