import * as React from 'react';
import { CalendarClock } from 'lucide-react';

/**
 * The CTC & Billing Forecast due-dates notice, shown on Finance and Safety.
 *
 * One component for both pages so the dates cannot drift. Both strings come
 * from Site Settings (finance-deadlines-headline / -body): the dates change
 * every year, so they must be editable without a deploy. Clearing the headline
 * in the CMS hides the notice everywhere — same convention as Ring It In.
 *
 * Pure markup with no state, so pages can render it without a client
 * directive and it costs nothing to hydrate.
 */

interface DeadlinesNoticeProps {
  headline?: string;
  body?: string;
}

export function DeadlinesNotice({ headline = '', body = '' }: DeadlinesNoticeProps) {
  if (!headline.trim()) return null;

  // The body is plain text with one date per line. Split so each date gets its
  // own row rather than relying on whitespace-pre-line, which would leave the
  // intro sentence and the dates styled identically.
  const lines = body.split('\n').map((l) => l.trim()).filter(Boolean);
  const intro = lines.filter((l) => !/^\w+ \d{1,2}/.test(l));
  const dates = lines.filter((l) => /^\w+ \d{1,2}/.test(l));

  return (
    <section
      aria-labelledby="deadlines-heading"
      className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] p-5 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
          <CalendarClock className="h-5 w-5 text-amber-400" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 id="deadlines-heading" className="text-base sm:text-lg font-semibold text-white">
            {headline}
          </h2>
          {intro.map((line, i) => (
            <p key={i} className="text-sm text-slate-300 mt-1 leading-relaxed">
              {line}
            </p>
          ))}
          {dates.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Due dates">
              {dates.map((d) => (
                <li
                  key={d}
                  className="rounded-lg bg-slate-900/60 border border-amber-500/25 px-3 py-1.5 text-sm font-medium text-amber-100 tabular-nums"
                >
                  {d}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
