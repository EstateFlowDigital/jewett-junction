import * as React from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const TICKET_TYPES = ['Hardware', 'Software', 'Account / Access', 'Network', 'Email', 'Phone', 'Other'];
const URGENCIES = ['Low', 'Normal', 'High', 'Urgent'];
const DEPARTMENTS = ['Operations', 'Engineering', 'Project Management', 'Estimating', 'Safety', 'HR', 'Marketing', 'Finance', 'Field', 'Other'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ITTicketContent() {
  const [status, setStatus] = React.useState<Status>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [formData, setFormData] = React.useState({
    name: '', email: '', department: '', category: '', urgency: 'Normal',
    device: '', title: '', description: '',
  });

  const update = (k: string, v: string) => setFormData((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      const res = await fetch('/jewett-junction/api/it-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to submit ticket');
      }
      setStatus('success');
      setFormData({ name: '', email: '', department: '', category: '', urgency: 'Normal', device: '', title: '', description: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Submission failed. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-2xl p-8 border border-emerald-500/30 bg-emerald-500/5 text-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Ticket submitted</h2>
          <p className="text-slate-300 mb-6">Our IT team has been notified and will follow up at the email you provided.</p>
          <button onClick={() => setStatus('idle')} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium">Submit another ticket</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold text-white">Submit an IT Ticket</h1>
          <p className="text-slate-400 text-sm mt-1">Hardware, software, access, or anything tech-related. Urgent issues get prioritized.</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Your Name" required value={formData.name} onChange={(v) => update('name', v)} maxLength={160} />
            <Field label="Email" required type="email" value={formData.email} onChange={(v) => update('email', v)} maxLength={160} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Department" value={formData.department} onChange={(v) => update('department', v)} options={DEPARTMENTS} />
            <Select label="Issue Type" required value={formData.category} onChange={(v) => update('category', v)} options={TICKET_TYPES} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Urgency" value={formData.urgency} onChange={(v) => update('urgency', v)} options={URGENCIES} />
            <Field label="Device / Equipment" value={formData.device} onChange={(v) => update('device', v)} maxLength={160} placeholder="e.g., MacBook Pro, iPhone, Office printer" />
          </div>
          <Field label="Short Summary" required value={formData.title} onChange={(v) => update('title', v)} maxLength={200} placeholder="One-line description of the issue" />
          <Textarea label="Describe the Issue" required value={formData.description} onChange={(v) => update('description', v)} maxLength={10000} rows={5} placeholder="What's happening? When did it start? What have you already tried?" />
          {status === 'error' && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> <span>{errorMessage}</span>
            </div>
          )}
          <button type="submit" disabled={status === 'submitting'} className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center justify-center gap-2">
            {status === 'submitting' ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : 'Submit Ticket'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, required, type = 'text', value, onChange, maxLength, placeholder }: { label: string; required?: boolean; type?: string; value: string; onChange: (v: string) => void; maxLength?: number; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}{required && <span className="text-rose-400 ml-1">*</span>}</label>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
    </div>
  );
}

function Textarea({ label, required, value, onChange, maxLength, rows, placeholder }: { label: string; required?: boolean; value: string; onChange: (v: string) => void; maxLength?: number; rows?: number; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}{required && <span className="text-rose-400 ml-1">*</span>}</label>
      <textarea required={required} value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} rows={rows} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none" />
    </div>
  );
}

function Select({ label, required, value, onChange, options }: { label: string; required?: boolean; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}{required && <span className="text-rose-400 ml-1">*</span>}</label>
      <select required={required} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
