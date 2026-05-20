import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
  Send,
  ChevronRight,
  ShieldCheck,
  HardHat,
  Siren,
} from 'lucide-react';

const TYPES = ['Near-miss', 'Injury', 'Property Damage', 'Hazard Observation', 'First Aid', 'Equipment Failure', 'Other'];
const SEVERITIES = ['Low', 'Medium', 'High', 'Critical'];
const DEPARTMENTS = ['Operations', 'Engineering', 'Project Management', 'Estimating', 'Safety', 'HR', 'Field', 'Other'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface SafetyIncidentContentProps {
  safetyEmail?: string;
  safetyPhone?: string;
}

export function SafetyIncidentContent({ safetyEmail, safetyPhone }: SafetyIncidentContentProps = {}) {
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
      setFormData({
        name: '', email: '', phone: '', department: '',
        incidentType: '', severity: 'Medium', jobSite: '', occurredAt: '',
        title: '', description: '', immediateActions: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Submission failed. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="bg-emerald-900/30 border-emerald-700">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Report submitted</h2>
            <p className="text-slate-300 mb-6 max-w-md mx-auto">
              The safety team has been notified. <span className="text-rose-300 font-medium">For life-threatening emergencies, call 911 first.</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button onClick={() => setStatus('idle')} className="bg-rose-600 hover:bg-rose-700">
                Submit another report
              </Button>
              <a href="/jewett-junction/safety">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  Back to Safety Hub
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Emergency Banner */}
      <Card className="bg-rose-950/40 border-rose-700">
        <CardContent className="p-4 flex items-start gap-3">
          <Siren className="h-6 w-6 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-rose-100">
            <strong className="text-white">Life-threatening emergency?</strong> Call <a href="tel:911" className="font-bold underline hover:text-rose-300">911</a> first, then come back and file this report.
          </div>
        </CardContent>
      </Card>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-red-600 to-orange-600 p-8 md:p-12">
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Shield className="h-3 w-3 mr-1" />
              4EverSafe
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Report a Safety Incident
          </h1>
          <p className="text-lg text-rose-50 max-w-2xl">
            Near-miss, injury, hazard, or property damage — your report helps us bring everyone home safely.
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-rose-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">All Reports Matter</h3>
              <p className="text-sm text-slate-400">Near-misses help us prevent future injuries.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">No Retaliation</h3>
              <p className="text-sm text-slate-400">Honest reporting is protected and encouraged.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <HardHat className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Direct Notification</h3>
              <p className="text-sm text-slate-400">Safety team is notified the moment you submit.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-400" />
                Incident Details
              </CardTitle>
              <CardDescription className="text-slate-400">
                Walk us through what happened. The more detail, the better we can act on it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Your Name" required value={formData.name} onChange={(v) => update('name', v)} maxLength={160} placeholder="John Smith" />
                  <Field label="Email" required type="email" value={formData.email} onChange={(v) => update('email', v)} maxLength={160} placeholder="you@jewettconstruction.com" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone" type="tel" value={formData.phone} onChange={(v) => update('phone', v)} maxLength={40} placeholder="e.g., 614-555-0100" />
                  <Select label="Department" value={formData.department} onChange={(v) => update('department', v)} options={DEPARTMENTS} placeholder="Select your department" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select label="Incident Type" required value={formData.incidentType} onChange={(v) => update('incidentType', v)} options={TYPES} placeholder="What kind of incident?" />
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
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white font-medium py-3"
                    size="lg"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" /> Submit Incident Report
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-rose-950/30 border-rose-800">
            <CardHeader className="border-b border-rose-800/50">
              <CardTitle className="text-base text-rose-200 flex items-center gap-2">
                <Phone className="h-4 w-4" /> Emergency Numbers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-rose-200">Emergency Services</span>
                <a href="tel:911" className="font-bold text-rose-100 hover:text-white">911</a>
              </div>
              {safetyPhone && (
                <a href={`tel:${safetyPhone.replace(/[^\d+]/g, '')}`} className="flex items-center justify-between hover:opacity-80 transition-opacity">
                  <span className="text-sm text-rose-200">Safety Hotline</span>
                  <span className="font-bold text-rose-100">{safetyPhone}</span>
                </a>
              )}
              {safetyEmail && (
                <a href={`mailto:${safetyEmail}`} className="flex items-center justify-between hover:opacity-80 transition-opacity">
                  <span className="text-sm text-rose-200">Safety Email</span>
                  <span className="font-medium text-xs text-rose-100 truncate ml-2">{safetyEmail}</span>
                </a>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" /> Safety Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <SidebarLink href="/jewett-junction/safety" label="Safety Hub" />
              <SidebarLink href="/jewett-junction/resources" label="Policies & Procedures" />
              {safetyEmail && (
                <a href={`mailto:${safetyEmail}`} className="flex items-center justify-between gap-2 p-2.5 rounded-lg hover:bg-slate-700/50 transition-colors group">
                  <span className="flex items-center gap-3 text-sm text-slate-300 group-hover:text-white">
                    <Mail className="h-4 w-4 text-slate-400 group-hover:text-green-400" />
                    Contact Safety Team
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-slate-300" />
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, type = 'text', value, onChange, maxLength, placeholder }: { label: string; required?: boolean; type?: string; value: string; onChange: (v: string) => void; maxLength?: number; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}{required && <span className="text-rose-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-colors"
      />
    </div>
  );
}

function Textarea({ label, required, value, onChange, maxLength, rows, placeholder }: { label: string; required?: boolean; value: string; onChange: (v: string) => void; maxLength?: number; rows?: number; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}{required && <span className="text-rose-400 ml-1">*</span>}
      </label>
      <textarea
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-colors resize-none"
      />
    </div>
  );
}

function Select({ label, required, value, onChange, options, placeholder }: { label: string; required?: boolean; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}{required && <span className="text-rose-400 ml-1">*</span>}
      </label>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-colors"
      >
        <option value="">{placeholder || 'Select...'}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="flex items-center justify-between gap-2 p-2.5 rounded-lg hover:bg-slate-700/50 transition-colors group">
      <span className="flex items-center gap-3 text-sm text-slate-300 group-hover:text-white">
        <Shield className="h-4 w-4 text-slate-400 group-hover:text-green-400" />
        {label}
      </span>
      <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-slate-300" />
    </a>
  );
}
