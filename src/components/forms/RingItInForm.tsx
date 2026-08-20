import * as React from 'react';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';

const API_BASE = '/jewett-junction';

interface FormData {
  submitterName: string;
  contractWin: string;
  shoutout: string;
  details: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_FORM: FormData = {
  submitterName: '',
  contractWin: '',
  shoutout: '',
  details: '',
};

interface RingItInFormProps {
  uiStrings?: Record<string, string>;
}

export function RingItInForm({ uiStrings = {} }: RingItInFormProps = {}) {
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
    if (!formData.contractWin.trim()) {
      errors.contractWin = 'Please tell us which win we are celebrating';
    }
    if (!formData.shoutout.trim()) {
      errors.shoutout = 'Please tell us who you would like to shout out';
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
      const response = await fetch(`${API_BASE}/api/ring-it-in`, {
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
        setErrorMessage(data.error || 'Failed to submit shoutout');
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
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const fieldClass = (invalid: boolean) =>
    `w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 focus-visible:outline-none ${
      invalid ? 'border-rose-500' : 'border-slate-700'
    }`;

  // Success state
  if (status === 'success') {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 shrink-0 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-amber-400" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Shoutout Submitted!</h3>
        <p className="text-slate-300 mb-6">
          Thanks for ringing it in. Your shoutout has been sent to the team.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-3 min-h-[44px] bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          {ui('form-submit-another-shoutout', 'Submit Another Shoutout')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
          className={fieldClass(!!validationErrors.submitterName)}
          placeholder="Enter your full name"
        />
        {validationErrors.submitterName && (
          <p id="submitterName-error" className="mt-1 text-sm text-rose-400">
            {validationErrors.submitterName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contractWin" className="block text-sm font-medium text-slate-300 mb-2">
          What contract win are we celebrating? <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          id="contractWin"
          name="contractWin"
          value={formData.contractWin}
          onChange={handleInputChange}
          aria-invalid={!!validationErrors.contractWin}
          aria-describedby={
            validationErrors.contractWin ? 'contractWin-error contractWin-help' : 'contractWin-help'
          }
          className={fieldClass(!!validationErrors.contractWin)}
          placeholder="Project or client name"
        />
        <p id="contractWin-help" className="mt-1 text-sm text-slate-400">
          The project, client, or bid we just landed.
        </p>
        {validationErrors.contractWin && (
          <p id="contractWin-error" className="mt-1 text-sm text-rose-400">
            {validationErrors.contractWin}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="shoutout" className="block text-sm font-medium text-slate-300 mb-2">
          Who would you like to shout out? <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          id="shoutout"
          name="shoutout"
          value={formData.shoutout}
          onChange={handleInputChange}
          aria-invalid={!!validationErrors.shoutout}
          aria-describedby={validationErrors.shoutout ? 'shoutout-error shoutout-help' : 'shoutout-help'}
          className={fieldClass(!!validationErrors.shoutout)}
          placeholder="Name the people who made it happen"
        />
        <p id="shoutout-help" className="mt-1 text-sm text-slate-400">
          One person or the whole team — whoever deserves the credit.
        </p>
        {validationErrors.shoutout && (
          <p id="shoutout-error" className="mt-1 text-sm text-rose-400">
            {validationErrors.shoutout}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-slate-300 mb-2">
          Please share any additional details you'd like to include.
        </label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleInputChange}
          rows={5}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-amber-500 focus-visible:outline-none resize-none"
          placeholder="Anything else worth celebrating — optional."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-8 py-3 min-h-[44px] bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" aria-hidden="true" />
              {ui('form-submit-shoutout', 'Submit Shoutout')}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
