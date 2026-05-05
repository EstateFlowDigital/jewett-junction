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
  // Comma-separated list of addresses CC'd on every notification — used
  // during rollout so marketing/leadership can audit all submissions.
  NOTIFY_CC_EMAIL?: string;
  IT_INBOX_EMAIL?: string;
  SAFETY_INBOX_EMAIL?: string;
  HR_INBOX_EMAIL?: string;
  IDEAS_INBOX_EMAIL?: string;
  SIGNAGE_INBOX_EMAIL?: string;
}

function getEnv(locals: any): RuntimeEnv {
  const runtime = (locals as any)?.runtime?.env;
  if (runtime) return runtime as RuntimeEnv;
  return import.meta.env as unknown as RuntimeEnv;
}

export type InboxKey = 'it' | 'safety' | 'hr' | 'ideas' | 'signage';

function inboxAddress(env: RuntimeEnv, key: InboxKey): string | undefined {
  switch (key) {
    case 'it': return env.IT_INBOX_EMAIL;
    case 'safety': return env.SAFETY_INBOX_EMAIL;
    case 'hr': return env.HR_INBOX_EMAIL;
    case 'ideas': return env.IDEAS_INBOX_EMAIL;
    case 'signage': return env.SIGNAGE_INBOX_EMAIL;
  }
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
  // Ordered { label, value } pairs rendered as a definition list in the email.
  // Keep `value` plain text — escapeHtml is applied automatically.
  fields: Array<{ label: string; value: string | undefined | null }>;
  // Optional reply-to so the team can reply directly to the submitter.
  replyTo?: string;
  // Optional extra CC addresses for this specific notification, on top of
  // the global NOTIFY_CC_EMAIL list.
  cc?: string[];
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
  const to = inboxAddress(env, params.inbox);

  if (!apiKey || !from || !to) {
    console.warn(`notify: skipped — missing config (apiKey:${!!apiKey} from:${!!from} to:${!!to})`);
    return { ok: false, skipped: true };
  }

  const rows = params.fields
    .filter((f) => f.value && String(f.value).trim() !== '')
    .map((f) => `<p style="margin:0 0 8px"><strong>${escapeHtml(f.label)}:</strong> ${escapeHtml(String(f.value)).replace(/\n/g, '<br/>')}</p>`)
    .join('');

  const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#111">
<h2 style="margin:0 0 16px;font-size:18px">${escapeHtml(params.subject)}</h2>
${rows}
<p style="margin:24px 0 0;color:#888;font-size:12px">Sent automatically by Jewett Junction.</p>
</body></html>`;

  // CC list: from env (comma-separated) plus any per-call extras.
  // Strip duplicates and the primary `to` so nobody gets emailed twice.
  const ccFromEnv = (env.NOTIFY_CC_EMAIL || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const cc = Array.from(new Set([...ccFromEnv, ...(params.cc || [])]))
    .filter((addr) => addr.toLowerCase() !== to.toLowerCase());

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
