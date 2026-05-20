import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Ticket,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Headphones,
  Clock,
  ShieldCheck,
  BookOpen,
  ChevronRight,
  Monitor,
  Wifi,
  Mail,
  HelpCircle,
} from 'lucide-react';

const TICKET_TYPES = ['Hardware', 'Software', 'Account / Access', 'Network', 'Email', 'Phone', 'Other'];
const URGENCIES = ['Low', 'Normal', 'High', 'Urgent'];
const DEPARTMENTS = ['Operations', 'Engineering', 'Project Management', 'Estimating', 'Safety', 'HR', 'Marketing', 'Finance', 'Field', 'Other'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface ITTicketContentProps {
  itEmail?: string;
  itPhone?: string;
}

export function ITTicketContent({ itEmail, itPhone }: ITTicketContentProps = {}) {
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
      <div className="max-w-3xl mx-auto">
        <Card className="bg-emerald-900/30 border-emerald-700">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Ticket submitted</h2>
            <p className="text-slate-300 mb-6 max-w-md mx-auto">
              Our IT team has been notified and will follow up at the email you provided.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button onClick={() => setStatus('idle')} className="bg-blue-600 hover:bg-blue-700">
                Submit another ticket
              </Button>
              <a href="/jewett-junction/it-helpdesk">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  Back to IT Helpdesk
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
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 p-8 md:p-12">
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Ticket className="h-3 w-3 mr-1" />
              IT Helpdesk
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Submit an IT Ticket
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Hardware, software, access, or anything tech-related. Urgent issues get prioritized — our IT team
            will follow up at the email you provide.
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Fast Response</h3>
              <p className="text-sm text-slate-400">Standard tickets answered within one business day.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Tracked &amp; Logged</h3>
              <p className="text-sm text-slate-400">Every ticket is logged and stays visible to the IT team.</p>
            </div>
          </CardContent>
        </Card>
        <a href="/jewett-junction/it-helpdesk" className="block">
          <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500 transition-colors h-full">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1 flex items-center justify-between">
                  Try Self-Service <ChevronRight className="h-4 w-4 text-slate-500" />
                </h3>
                <p className="text-sm text-slate-400">Browse the knowledge base before opening a ticket.</p>
              </div>
            </CardContent>
          </Card>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Ticket className="h-5 w-5 text-blue-400" />
                Ticket Details
              </CardTitle>
              <CardDescription className="text-slate-400">
                Fill in as much detail as you can — it helps IT resolve your issue faster.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Your Name" required value={formData.name} onChange={(v) => update('name', v)} maxLength={160} placeholder="John Smith" />
                  <Field label="Email" required type="email" value={formData.email} onChange={(v) => update('email', v)} maxLength={160} placeholder="you@jewettconstruction.com" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select label="Department" value={formData.department} onChange={(v) => update('department', v)} options={DEPARTMENTS} placeholder="Select your department" />
                  <Select label="Issue Type" required value={formData.category} onChange={(v) => update('category', v)} options={TICKET_TYPES} placeholder="What kind of issue?" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select label="Urgency" value={formData.urgency} onChange={(v) => update('urgency', v)} options={URGENCIES} />
                  <Field label="Device / Equipment" value={formData.device} onChange={(v) => update('device', v)} maxLength={160} placeholder="e.g., MacBook Pro, Office printer" />
                </div>
                <Field label="Short Summary" required value={formData.title} onChange={(v) => update('title', v)} maxLength={200} placeholder="One-line description of the issue" />
                <Textarea label="Describe the Issue" required value={formData.description} onChange={(v) => update('description', v)} maxLength={10000} rows={5} placeholder="What's happening? When did it start? What have you already tried?" />
                {status === 'error' && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /> <span>{errorMessage}</span>
                  </div>
                )}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium py-3"
                    size="lg"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" /> Submit Ticket
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
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Headphones className="h-4 w-4 text-blue-400" /> Need Help Fast?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {itEmail && (
                <a href={`mailto:${itEmail}`} className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">Email IT</div>
                    <div className="text-xs text-slate-400 truncate">{itEmail}</div>
                  </div>
                </a>
              )}
              {itPhone && (
                <a href={`tel:${itPhone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-colors">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <Headphones className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">Call IT</div>
                    <div className="text-xs text-slate-400">{itPhone}</div>
                  </div>
                </a>
              )}
              {!itEmail && !itPhone && (
                <p className="text-sm text-slate-400">For urgent issues, ping IT in your usual team channel.</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-400" /> Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <SidebarLink href="/jewett-junction/it-helpdesk" icon={BookOpen} label="Knowledge Base" />
              <SidebarLink href="/jewett-junction/resources" icon={Wifi} label="VPN & Network" />
              <SidebarLink href="/jewett-junction/resources" icon={Monitor} label="Software Requests" />
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
        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
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
        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none"
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
        className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
      >
        <option value="">{placeholder || 'Select...'}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SidebarLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <a href={href} className="flex items-center justify-between gap-2 p-2.5 rounded-lg hover:bg-slate-700/50 transition-colors group">
      <span className="flex items-center gap-3 text-sm text-slate-300 group-hover:text-white">
        <Icon className="h-4 w-4 text-slate-400 group-hover:text-blue-400" />
        {label}
      </span>
      <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-slate-300" />
    </a>
  );
}
