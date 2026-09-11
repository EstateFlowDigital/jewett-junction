import * as React from 'react';
import { FileText, Download, ExternalLink, FolderOpen } from 'lucide-react';
import { DeadlinesNotice } from '../shared/DeadlinesNotice';

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
}

function formatUpdated(iso: string | undefined) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function FinanceContent({ documents, settings, pageCopy = null }: FinanceContentProps) {
  const docsHeading = pageCopy?.['subsection-1-headline'] || 'Finance Documents';
  const docsDescription =
    pageCopy?.['subsection-1-description'] ||
    'Forms and references from Accounting. Open a document to preview it in your browser, or download it directly.';

  return (
    <div className="space-y-8">
      <DeadlinesNotice
        headline={settings['finance-deadlines-headline'] || ''}
        body={settings['finance-deadlines-body'] || ''}
      />

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
              const detailHref = `/jewett-junction/resources/${doc.slug || doc.id}`;
              const fileHref = doc.file?.url || doc['external-link'] || '';
              const isExternal = !doc.file?.url && !!doc['external-link'];
              const updated = formatUpdated(doc['last-updated']);
              const meta = [doc['file-type'] || (isExternal ? 'Link' : 'File'), doc['file-size'], updated && `Updated ${updated}`]
                .filter(Boolean)
                .join(' • ');

              return (
                <li
                  key={doc.id || doc.slug || i}
                  className="rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/30 transition-colors flex flex-col"
                >
                  <a href={detailHref} className="group flex items-start gap-4 p-5 flex-1 min-h-[44px]">
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
                      {meta && <p className="text-xs text-slate-500 mt-2">{meta}</p>}
                    </div>
                  </a>
                  {fileHref && (
                    <div className="px-5 pb-5 pt-0">
                      <a
                        href={fileHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={!isExternal ? '' : undefined}
                        className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-sm font-medium text-slate-200 hover:text-white hover:border-emerald-500/40 transition-colors"
                      >
                        {isExternal ? (
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Download className="h-4 w-4" aria-hidden="true" />
                        )}
                        {isExternal ? 'Open link' : 'Download PDF'}
                      </a>
                    </div>
                  )}
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
