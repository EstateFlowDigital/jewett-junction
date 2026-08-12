import * as React from 'react';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';

const API_BASE = '/jewett-junction';

interface FormData {
  nominatorName: string;
  nomineeName: string;
  observation: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_FORM: FormData = {
  nominatorName: '',
  nomineeName: '',
  observation: '',
};

interface MissionNominationFormProps {
  uiStrings?: Record<string, string>;
}

export function MissionNominationForm({ uiStrings = {} }: MissionNominationFormProps = {}) {
  const ui = (key: string, fallback: string) => uiStrings[key] || fallback;
  const [formData, setFormData] = React.useState<FormData>(EMPTY_FORM);
  const [status, setStatus] = React.useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.nominatorName.trim()) {
      errors.nominatorName = 'Your name is required';
    }
    if (!formData.nomineeName.trim()) {
      errors.nomineeName = 'Please tell us who you are nominating';
    }
    if (!formData.observation.trim()) {
      errors.observation = 'Please describe what you observed';
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
      const response = await fetch(`${API_BASE}/api/mission-nomination`, {
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
        setErrorMessage(data.error || 'Failed to submit nomination');
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
        <div className="w-16 h-16 shrink-0 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Nomination Submitted!</h3>
        <p className="text-slate-300 mb-6">
          Thank you for recognizing a coworker. Your nomination has been sent to the team for review.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-3 min-h-[44px] bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          {ui('form-submit-another-nomination', 'Submit Another Nomination')}
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

      {/* Nominator + Nominee */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nominatorName" className="block text-sm font-medium text-slate-300 mb-2">
            Your First and Last Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            id="nominatorName"
            name="nominatorName"
            value={formData.nominatorName}
            onChange={handleInputChange}
            aria-invalid={!!validationErrors.nominatorName}
            aria-describedby={validationErrors.nominatorName ? 'nominatorName-error' : undefined}
            className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
              validationErrors.nominatorName ? 'border-rose-500' : 'border-slate-700'
            }`}
            placeholder="Enter your full name"
          />
          {validationErrors.nominatorName && (
            <p id="nominatorName-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.nominatorName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="nomineeName" className="block text-sm font-medium text-slate-300 mb-2">
            Who are you nominating? <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            id="nomineeName"
            name="nomineeName"
            value={formData.nomineeName}
            onChange={handleInputChange}
            aria-invalid={!!validationErrors.nomineeName}
            aria-describedby={
              validationErrors.nomineeName ? 'nomineeName-error nomineeName-help' : 'nomineeName-help'
            }
            className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
              validationErrors.nomineeName ? 'border-rose-500' : 'border-slate-700'
            }`}
            placeholder="Enter their full name"
          />
          <p id="nomineeName-help" className="mt-1 text-sm text-slate-400">
            First and last name of the person you're recognizing
          </p>
          {validationErrors.nomineeName && (
            <p id="nomineeName-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.nomineeName}
            </p>
          )}
        </div>
      </div>

      {/* Observation */}
      <div>
        <label htmlFor="observation" className="block text-sm font-medium text-slate-300 mb-2">
          Please explain what you observed that exemplifies living our mission.{' '}
          <span className="text-rose-400">*</span>
        </label>
        <textarea
          id="observation"
          name="observation"
          value={formData.observation}
          onChange={handleInputChange}
          rows={6}
          aria-invalid={!!validationErrors.observation}
          aria-describedby={
            validationErrors.observation ? 'observation-error observation-help' : 'observation-help'
          }
          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none resize-none ${
            validationErrors.observation ? 'border-rose-500' : 'border-slate-700'
          }`}
          placeholder="Share the details — what happened, who it impacted, and why it stood out..."
        />
        <p id="observation-help" className="mt-1 text-sm text-slate-400">
          Jewett Construction exists to create positive experiences and lasting impressions.
        </p>
        {validationErrors.observation && (
          <p id="observation-error" className="mt-1 text-sm text-rose-400">
            {validationErrors.observation}
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
              {ui('form-submit-nomination', 'Submit Nomination')}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
