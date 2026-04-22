import * as React from 'react';
import { Download, Loader2, CheckCircle2, XCircle } from 'lucide-react';

const API_BASE = '/jewett-junction';

interface BackfillResult {
  scanned: number;
  created: number;
  skipped: number;
  failed: number;
  failures?: Array<{ submissionId: string; error: string }>;
  error?: string;
}

export function FormSubmissionsBackfill() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [result, setResult] = React.useState<BackfillResult | null>(null);

  const run = async () => {
    if (!confirm('Import all existing Webflow form submissions into this collection? Safe to re-run — duplicates are skipped.')) return;
    setIsRunning(true);
    setResult(null);
    try {
      const token = localStorage.getItem('admin_token') || '';
      const res = await fetch(`${API_BASE}/api/admin/backfill-form-submissions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ scanned: 0, created: 0, skipped: 0, failed: 0, error: err?.message || 'Network error' });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="mb-4 p-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl flex items-start gap-4">
      <div className="flex-1">
        <h3 className="font-medium text-white mb-1">Backfill from Webflow</h3>
        <p className="text-sm text-slate-400">
          Pull all existing form submissions from Webflow&apos;s Forms dashboard into this collection. Idempotent — safe to run any time.
        </p>
        {result && !result.error && (
          <div className="mt-3 flex items-center gap-3 text-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span className="text-slate-300">
              Scanned <strong className="text-white">{result.scanned}</strong>, imported{' '}
              <strong className="text-white">{result.created}</strong>, skipped{' '}
              <strong className="text-white">{result.skipped}</strong>
              {result.failed > 0 && <>, <strong className="text-rose-400">{result.failed} failed</strong></>}.
            </span>
          </div>
        )}
        {result?.error && (
          <div className="mt-3 flex items-center gap-2 text-sm text-rose-400">
            <XCircle className="h-4 w-4" />
            <span>{result.error}</span>
          </div>
        )}
        {result?.failures && result.failures.length > 0 && (
          <details className="mt-2 text-xs text-slate-400">
            <summary className="cursor-pointer">Show {result.failures.length} failure(s)</summary>
            <ul className="mt-2 space-y-1">
              {result.failures.slice(0, 10).map((f) => (
                <li key={f.submissionId}>
                  <code className="text-slate-500">{f.submissionId}</code>: {f.error}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
      <button
        onClick={run}
        disabled={isRunning}
        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white rounded-lg text-sm font-medium flex items-center gap-2"
      >
        {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {isRunning ? 'Importing…' : 'Backfill Now'}
      </button>
    </div>
  );
}
