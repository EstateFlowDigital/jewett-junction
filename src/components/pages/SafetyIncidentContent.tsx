import * as React from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const TYPES = ['Near-miss', 'Injury', 'Property Damage', 'Hazard Observation', 'First Aid', 'Equipment Failure', 'Other'];
const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];
const DEPARTMENTS = ['Operations', 'Engineering', 'Project Management', 'Estimating', 'Safety', 'HR', 'Field', 'Other'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function SafetyIncidentContent() {
  const [status, setStatus] = React.useState<Status>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [formData, setFormData] = React.useState({
    name: '', email: '', phone: '', department: '',
    incidentType: '', severity: 'Medium', jobSite: '', occurredAt: '',
    title: '', description: '', immediateActions: '',
  });

  const update = (k: string, v: string) => setFormData((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    try {
      const res = await fetch('/jewett-junction/api/safety-incident', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to submit incident report');
      }
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', department: '', incidentType: '', severity: 'Medium', jobSite: '', occurredAt: '', title: '', description: '', immediateActions: '' });
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
          <h2 className="text-2xl font-bold text-white mb-2">Report submitted</h2>
          <p className="text-slate-300 mb-6">The safety team has been notified. For life-threatening emergencies, call 911 first.</p>
          <button onClick={() => setStatus('idle')} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium">Submit another report</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h1 className="text-2xl font-bold text-white">Report a Safety Incident</h1>
          <p className="text-slate-400 text-sm mt-1">Near-miss, injury, hazard, or property damage. <strong className="text-rose-300">Call 911 first if it's a life-threatening emergency.</strong></p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Your Name" required value={formData.name} onChange={(v) => update('name', v)} maxLength={160} />
            <Field label="Email" required type="email" value={formData.email} onChange={(v) => update('email', v)} maxLength={160} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Phone" type="tel" value={formData.phone} onChange={(v) => update('phone', v)} maxLength={40} placeholder="(555) 123-4567" />
            <Select label="Department" value={formData.department} onChange={(v) => update('department', v)} options={DEPARTMENTS} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Incident Type" required value={formData.incidentType} onChange={(v) => update('incidentType', v)} options={TYPES} />
            <Select label="Severity" value={formData.severity} onChange={(v) => update('severity', v)} options={SEVERITIES} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Job Site / Location" value={formData.jobSite} onChange={(v) => update('jobSite', v)} maxLength={200} placeholder="e.g., Long Cadillac, 123 Main St" />
            <Field label="When did it occur?" type="datetime-local" value={formData.occurredAt} onChange={(v) => update('occurredAt', v)} />
          </div>
          <Field label="Short Summary" required value={formData.title} onChange={(v) => update('title', v)} maxLength={200} placeholder="One-line description of what happened" />
          <Textarea label="Describe What Happened" required value={formData.description} onChange={(v) => update('description', v)} maxLength={10000} rows={5} placeholder="Walk through what happened in detail. Who was involved? What conditions led to it?" />
          <Textarea label="Immediate Actions Taken" value={formData.immediateActions} onChange={(v) => update('immediateActions', v)} maxLength={5000} rows={3} placeholder="What was done right after? First aid given? Area secured? Equipment shut down?" />
          {status === 'error' && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> <span>{errorMessage}</span>
            </div>
          )}
          <button type="submit" disabled={status === 'submitting'} className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center justify-center gap-2">
            {status === 'submitting' ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : 'Submit Incident Report'}
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
        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none" />
    </div>
  );
}

function Textarea({ label, required, value, onChange, maxLength, rows, placeholder }: { label: string; required?: boolean; value: string; onChange: (v: string) => void; maxLength?: number; rows?: number; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}{required && <span className="text-rose-400 ml-1">*</span>}</label>
      <textarea required={required} value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} rows={rows} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none" />
    </div>
  );
}

function Select({ label, required, value, onChange, options }: { label: string; required?: boolean; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}{required && <span className="text-rose-400 ml-1">*</span>}</label>
      <select required={required} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none">
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
