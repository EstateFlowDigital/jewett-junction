import * as React from 'react';
import { Upload, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { COLLECTIONS as COLLECTION_CONFIGS } from './collections';

const API_BASE = '/jewett-junction';

const BULK_COLLECTIONS = [
  'announcements', 'events', 'jobPostings', 'cultureStories', 'employees', 'resources',
  'hrContent', 'safetyContent', 'itKnowledgeBase', 'marketingAssets', 'submittedIdeas', 'banner',
];

function parseCsv(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return { headers: [], rows: [] };
  const parseLine = (line: string): string[] => {
    const out: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQuotes) {
        if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (c === '"') { inQuotes = false; }
        else { cur += c; }
      } else {
        if (c === '"') inQuotes = true;
        else if (c === ',') { out.push(cur); cur = ''; }
        else cur += c;
      }
    }
    out.push(cur);
    return out.map((v) => v.trim());
  };
  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const cells = parseLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = cells[idx] ?? ''; });
    return row;
  });
  return { headers, rows };
}

export function BulkUploader() {
  const [collection, setCollection] = React.useState('announcements');
  const [parsed, setParsed] = React.useState<{ headers: string[]; rows: Record<string, string>[] } | null>(null);
  const [isImporting, setIsImporting] = React.useState(false);
  const [result, setResult] = React.useState<{ succeeded: number; failed: number; results: Array<{ ok: boolean; row: number; error?: string }> } | null>(null);

  const config = (COLLECTION_CONFIGS as any)[collection];
  const validKeys = new Set(config?.fields.map((f: any) => f.key) ?? []);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      setParsed(parseCsv(text));
      setResult(null);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!parsed || parsed.rows.length === 0) return;
    setIsImporting(true);
    setResult(null);
    const rows = parsed.rows.map((row) => {
      const filtered: Record<string, string> = {};
      for (const [k, v] of Object.entries(row)) {
        if (validKeys.has(k) && v !== '') filtered[k] = v;
      }
      return filtered;
    });
    const token = localStorage.getItem('admin_token') || '';
    const res = await fetch(`${API_BASE}/api/admin/bulk-import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({ collection, rows }),
    });
    const data = await res.json();
    setResult(data);
    setIsImporting(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Target Collection</label>
          <select value={collection} onChange={(e) => { setCollection(e.target.value); setParsed(null); setResult(null); }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white">
            {BULK_COLLECTIONS.map((k) => (
              <option key={k} value={k}>{(COLLECTION_CONFIGS as any)[k]?.name || k}</option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1">CSV headers must match field slugs: {Array.from(validKeys).join(', ')}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">CSV File</label>
          <input type="file" accept=".csv,text/csv" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                 className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600" />
        </div>
      </div>

      {parsed && parsed.rows.length > 0 && (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-white">Preview — first 5 of {parsed.rows.length} rows</h3>
            <button onClick={handleImport} disabled={isImporting}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-sm flex items-center gap-2">
              {isImporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Import {parsed.rows.length} rows
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="text-xs text-slate-300 w-full">
              <thead><tr className="border-b border-slate-700">
                {parsed.headers.map((h) => (
                  <th key={h} className={`text-left p-2 ${validKeys.has(h) ? 'text-white' : 'text-slate-500 line-through'}`}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {parsed.rows.slice(0, 5).map((row, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    {parsed.headers.map((h) => <td key={h} className="p-2 max-w-[200px] truncate">{row[h]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-2">Strikethrough columns are ignored — header doesn't match any field in this collection.</p>
        </div>
      )}

      {result && (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <span className="text-white">{result.succeeded} succeeded</span>
            {result.failed > 0 && (<>
              <XCircle className="h-5 w-5 text-rose-400 ml-4" />
              <span className="text-white">{result.failed} failed</span>
            </>)}
          </div>
          {result.failed > 0 && (
            <details className="text-xs text-slate-400">
              <summary className="cursor-pointer">Show failures</summary>
              <ul className="mt-2 space-y-1">
                {result.results.filter((r) => !r.ok).map((r) => (
                  <li key={r.row}>Row {r.row + 1}: {r.error}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
