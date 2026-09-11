import * as React from 'react';
import { FileText, ChevronRight, FolderOpen } from 'lucide-react';
import { DeadlinesNotice } from '../shared/DeadlinesNotice';
import { QuickActionCards, type QuickAction } from './QuickActionCards';

/**
 * Finance tab: the CTC & Billing Forecast due-dates notice, then the finance
 * documents.
 *
 * Documents are Resources items with the "Finance page" switch on. They live
 * in the Resources collection rather than a finance-only one so they also
 * appear in the Resources library, keep their real category (the W-9 is a
 * Form, not a "Finance"), and can be replaced by marketing without a deploy —
 * the W-9 is dated and needs swapping every January.
 *
 * Each card links to the document's landing page (/resources/<slug>), which
 * has the inline PDF viewer and the download button. No direct-download
 * shortcut here: that is how every other document on the intranet works, and
 * the landing page is where people expect to read before they save.
 *
 * No state, no effects: rendered as server HTML with no client directive.
 */

interface FinanceDocument {
  id?: string;
  slug?: string;
  name?: string;
  description?: string;
  'file-type'?: string;
  'file-size'?: string;
  'last-updated'?: string;
  file?: { url?: string };
  'external-link'?: string;
}

interface FinanceContentProps {
  documents: FinanceDocument[];
  settings: Record<string, any>;
  pageCopy?: Record<string, any> | null;
  /** Portals and links for this tab — Quick Actions tagged page-slug "finance". */
  quickActions?: QuickAction[];
}

function formatUpdated(iso: string | undefined) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function FinanceContent({ documents, settings, pageCopy = null, quickActions = [] }: FinanceContentProps) {
  const docsHeading = pageCopy?.['subsection-1-headline'] || 'Finance Documents';
  const docsDescription =
    pageCopy?.['subsection-1-description'] ||
    'Forms and references from Accounting. Open a document to preview it in your browser and download it.';

  return (
    <div className="space-y-8">
      <DeadlinesNotice
        headline={settings['finance-deadlines-headline'] || ''}
        body={settings['finance-deadlines-body'] || ''}
      />

      {/* Portals (HH2 for AP / AIA requisitions, …) — CMS-driven, so Accounting
          can add another without a deploy. Renders nothing when there are none. */}
      <QuickActionCards actions={quickActions} theme="dark" />

      <section aria-labelledby="finance-docs-heading">
        <div className="mb-4">
          <h2 id="finance-docs-heading" className="text-lg font-semibold text-white">
            {docsHeading}
          </h2>
          {docsDescription && <p className="text-sm text-slate-400 mt-1">{docsDescription}</p>}
        </div>

        {documents.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, i) => {
              const href = `/jewett-junction/resources/${doc.slug || doc.id}`;
              const updated = formatUpdated(doc['last-updated']);
              const meta = [doc['file-type'] || 'File', doc['file-size'], updated && `Updated ${updated}`]
                .filter(Boolean)
                .join(' • ');

              return (
                <li key={doc.id || doc.slug || i}>
                  <a
                    href={href}
                    className="group flex items-start gap-4 p-5 min-h-[44px] rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/30 hover:bg-slate-800/70 transition-colors"
                    aria-label={`${doc.name} — view and download`}
                  >
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FileText className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {doc.name}
                      </h3>
                      {doc.description && (
                        <p className="text-sm text-slate-400 mt-1 leading-relaxed">{doc.description}</p>
                      )}
                      <div className="flex items-center justify-between gap-3 mt-3">
                        {meta && <span className="text-xs text-slate-500">{meta}</span>}
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 group-hover:text-emerald-300 shrink-0">
                          View &amp; download
                          <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-10 text-center">
            <FolderOpen className="h-10 w-10 text-slate-600 mx-auto mb-3" aria-hidden="true" />
            <p className="text-slate-400">No finance documents have been published yet.</p>
            <p className="text-sm text-slate-500 mt-1">
              Turn on “Finance page” for a document in Resources to show it here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
