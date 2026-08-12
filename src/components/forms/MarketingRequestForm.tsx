import * as React from 'react';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';

const API_BASE = '/jewett-junction';

interface FormData {
  requesterName: string;
  projectSite: string;
  requestDescription: string;
  neededByDate: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_FORM: FormData = {
  requesterName: '',
  projectSite: '',
  requestDescription: '',
  neededByDate: '',
};

interface MarketingRequestFormProps {
  uiStrings?: Record<string, string>;
}

export function MarketingRequestForm({ uiStrings = {} }: MarketingRequestFormProps = {}) {
  const ui = (key: string, fallback: string) => uiStrings[key] || fallback;
  const [formData, setFormData] = React.useState<FormData>(EMPTY_FORM);
  const [status, setStatus] = React.useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.requesterName.trim()) {
      errors.requesterName = 'Name is required';
    }
    if (!formData.projectSite.trim()) {
      errors.projectSite = 'Jobsite / project is required';
    }
    if (!formData.requestDescription.trim()) {
      errors.requestDescription = 'Request description is required';
    }
    if (!formData.neededByDate) {
      errors.neededByDate = 'Date needed is required';
    } else {
      const selectedDate = new Date(formData.neededByDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.neededByDate = 'Date must be in the future';
      }
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
      const response = await fetch(`${API_BASE}/api/marketing-request`, {
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
        setFormData(EMPTY_FORM);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit request');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(`Connection error: ${err?.message || 'Unable to reach server'}`);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        <div className="w-16 h-16 shrink-0 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Request Submitted!</h3>
        <p className="text-slate-300 mb-6">
          Your request has been received. The marketing team will review it and follow up with next steps.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-3 min-h-[44px] bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          {ui('form-submit-another-request', 'Submit Another Request')}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="requesterName" className="block text-sm font-medium text-slate-300 mb-2">
            Your First and Last Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            id="requesterName"
            name="requesterName"
            value={formData.requesterName}
            onChange={handleInputChange}
            aria-invalid={!!validationErrors.requesterName}
            aria-describedby={validationErrors.requesterName ? 'requesterName-error' : undefined}
            className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
              validationErrors.requesterName ? 'border-rose-500' : 'border-slate-700'
            }`}
            placeholder="Enter your first and last name"
          />
          {validationErrors.requesterName && (
            <p id="requesterName-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.requesterName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="projectSite" className="block text-sm font-medium text-slate-300 mb-2">
            Jobsite / Project <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            id="projectSite"
            name="projectSite"
            value={formData.projectSite}
            onChange={handleInputChange}
            aria-invalid={!!validationErrors.projectSite}
            aria-describedby={validationErrors.projectSite ? 'projectSite-error' : undefined}
            className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
              validationErrors.projectSite ? 'border-rose-500' : 'border-slate-700'
            }`}
            placeholder="Enter the jobsite or project name"
          />
          {validationErrors.projectSite && (
            <p id="projectSite-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.projectSite}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="requestDescription" className="block text-sm font-medium text-slate-300 mb-2">
          Request description <span className="text-rose-400">*</span>
        </label>
        <textarea
          id="requestDescription"
          name="requestDescription"
          value={formData.requestDescription}
          onChange={handleInputChange}
          rows={4}
          aria-invalid={!!validationErrors.requestDescription}
          aria-describedby={validationErrors.requestDescription ? 'requestDescription-error' : undefined}
          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none resize-none ${
            validationErrors.requestDescription ? 'border-rose-500' : 'border-slate-700'
          }`}
          placeholder="Describe what you need — collateral, signage, photography, presentations, or anything else..."
        />
        {validationErrors.requestDescription && (
          <p id="requestDescription-error" className="mt-1 text-sm text-rose-400">
            {validationErrors.requestDescription}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="neededByDate" className="block text-sm font-medium text-slate-300 mb-2">
            Date needed by <span className="text-rose-400">*</span>
          </label>
          <input
            type="date"
            id="neededByDate"
            name="neededByDate"
            value={formData.neededByDate}
            onChange={handleInputChange}
            aria-invalid={!!validationErrors.neededByDate}
            aria-describedby={validationErrors.neededByDate ? 'neededByDate-error' : undefined}
            className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
              validationErrors.neededByDate ? 'border-rose-500' : 'border-slate-700'
            }`}
          />
          {validationErrors.neededByDate && (
            <p id="neededByDate-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.neededByDate}
            </p>
          )}
        </div>
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
              {ui('form-submit-request', 'Submit Request')}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
