import * as React from 'react';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';

const API_BASE = '/jewett-junction';

interface FormData {
  submitterName: string;
  companyContact: string;
  reason: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_FORM: FormData = {
  submitterName: '',
  companyContact: '',
  reason: '',
};

interface SalesLeadFormProps {
  uiStrings?: Record<string, string>;
}

export function SalesLeadForm({ uiStrings = {} }: SalesLeadFormProps = {}) {
  const ui = (key: string, fallback: string) => uiStrings[key] || fallback;
  const [formData, setFormData] = React.useState<FormData>(EMPTY_FORM);
  const [status, setStatus] = React.useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.submitterName.trim()) {
      errors.submitterName = 'Your name is required';
    }
    if (!formData.companyContact.trim()) {
      errors.companyContact = 'Company or contact name is required';
    }
    if (!formData.reason.trim()) {
      errors.reason = 'Reason for submission is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE}/api/sales-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        // Reset form after success
        setFormData(EMPTY_FORM);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit lead');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(`Connection error: ${err?.message || 'Unable to reach server'}`);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Success state
  if (status === 'success') {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Lead Submitted!</h3>
        <p className="text-slate-300 mb-6">
          Thank you. The Business Development team will review the information and follow up as appropriate.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-3 min-h-[44px] bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          {ui('form-submit-another-lead', 'Submit Another Lead')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Error Banner */}
      {status === 'error' && (
        <div
          role="alert"
          className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-start gap-3"
        >
          <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium text-rose-300">Submission Failed</p>
            <p className="text-sm text-rose-400">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Submitter + Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="submitterName" className="block text-sm font-medium text-slate-300 mb-2">
            Your First and Last Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            id="submitterName"
            name="submitterName"
            value={formData.submitterName}
            onChange={handleInputChange}
            aria-invalid={!!validationErrors.submitterName}
            aria-describedby={validationErrors.submitterName ? 'submitterName-error' : undefined}
            className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
              validationErrors.submitterName ? 'border-rose-500' : 'border-slate-700'
            }`}
            placeholder="Enter your full name"
          />
          {validationErrors.submitterName && (
            <p id="submitterName-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.submitterName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="companyContact" className="block text-sm font-medium text-slate-300 mb-2">
            Name of company/contact you're submitting <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            id="companyContact"
            name="companyContact"
            value={formData.companyContact}
            onChange={handleInputChange}
            aria-invalid={!!validationErrors.companyContact}
            aria-describedby={validationErrors.companyContact ? 'companyContact-error' : undefined}
            className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
              validationErrors.companyContact ? 'border-rose-500' : 'border-slate-700'
            }`}
            placeholder="Company name or contact name"
          />
          {validationErrors.companyContact && (
            <p id="companyContact-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.companyContact}
            </p>
          )}
        </div>
      </div>

      {/* Reason */}
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-slate-300 mb-2">
          Reason for submission <span className="text-rose-400">*</span>
        </label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleInputChange}
          rows={6}
          aria-invalid={!!validationErrors.reason}
          aria-describedby={validationErrors.reason ? 'reason-error' : undefined}
          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none resize-none ${
            validationErrors.reason ? 'border-rose-500' : 'border-slate-700'
          }`}
          placeholder="Include the company name, contact information, project details, and any relevant background..."
        />
        {validationErrors.reason && (
          <p id="reason-error" className="mt-1 text-sm text-rose-400">
            {validationErrors.reason}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-8 py-3 min-h-[44px] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" aria-hidden="true" />
              {ui('form-submit-lead', 'Submit Lead')}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
