import * as React from 'react';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';

const API_BASE = '/jewett-junction';

interface FormData {
  requesterName: string;
  department: string;
  signageType: string;
  projectName: string;
  neededByDate: string;
  deliveryAddress: string;
  quantity: number;
  specialInstructions: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const DEPARTMENTS = [
  'Accounting',
  'Administration',
  'Engineering',
  'Field Operations',
  'Human Resources',
  'IT',
  'Marketing',
  'Project Management',
  'Safety',
  'Sales',
];

const SIGNAGE_TYPES = [
  { id: 'job-site', label: 'Job Site Signage', description: 'Signs for construction sites and project locations' },
  { id: 'office', label: 'Office Signage', description: 'Interior and exterior office signs' },
  { id: 'vehicle', label: 'Vehicle Graphics', description: 'Fleet wraps, decals, and magnetic signs' },
  { id: 'event', label: 'Event Materials', description: 'Banners, displays, and promotional items' },
];

export function SignageRequestForm() {
  const [formData, setFormData] = React.useState<FormData>({
    requesterName: '',
    department: '',
    signageType: '',
    projectName: '',
    neededByDate: '',
    deliveryAddress: '',
    quantity: 1,
    specialInstructions: '',
  });
  const [status, setStatus] = React.useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.requesterName.trim()) {
      errors.requesterName = 'Name is required';
    }
    if (!formData.department) {
      errors.department = 'Department is required';
    }
    if (!formData.signageType) {
      errors.signageType = 'Please select a signage type';
    }
    if (!formData.projectName.trim()) {
      errors.projectName = 'Project name is required';
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
    if (!formData.deliveryAddress.trim()) {
      errors.deliveryAddress = 'Delivery address is required';
    }
    if (formData.quantity < 1) {
      errors.quantity = 'Quantity must be at least 1';
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
      const response = await fetch(`${API_BASE}/api/signage-request`, {
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
        setFormData({
          requesterName: '',
          department: '',
          signageType: '',
          projectName: '',
          neededByDate: '',
          deliveryAddress: '',
          quantity: 1,
          specialInstructions: '',
        });
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value,
    }));
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, signageType: value }));
    if (validationErrors.signageType) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.signageType;
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
        <h3 className="text-xl font-bold text-white mb-2">Request Submitted!</h3>
        <p className="text-slate-300 mb-6">
          Your signage request has been received. The marketing team will review your request and contact you within 2 business days.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-3 min-h-[44px] bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          Submit Another Request
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

      {/* Requester Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="requesterName" className="block text-sm font-medium text-slate-300 mb-2">
            Your Name <span className="text-rose-400">*</span>
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
            placeholder="Enter your full name"
          />
          {validationErrors.requesterName && (
            <p id="requesterName-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.requesterName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-slate-300 mb-2">
            Department <span className="text-rose-400">*</span>
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            aria-invalid={!!validationErrors.department}
            aria-describedby={validationErrors.department ? 'department-error' : undefined}
            className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
              validationErrors.department ? 'border-rose-500' : 'border-slate-700'
            }`}
          >
            <option value="">Select department</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {validationErrors.department && (
            <p id="department-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.department}
            </p>
          )}
        </div>
      </div>

      {/* Signage Type */}
      <fieldset>
        <legend className="block text-sm font-medium text-slate-300 mb-3">
          Signage Type <span className="text-rose-400">*</span>
        </legend>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          role="radiogroup"
          aria-invalid={!!validationErrors.signageType}
          aria-describedby={validationErrors.signageType ? 'signageType-error' : undefined}
        >
          {SIGNAGE_TYPES.map((type) => (
            <label
              key={type.id}
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all min-h-[44px] ${
                formData.signageType === type.id
                  ? 'bg-blue-500/10 border-blue-500/50'
                  : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
              }`}
            >
              <input
                type="radio"
                name="signageType"
                value={type.id}
                checked={formData.signageType === type.id}
                onChange={() => handleRadioChange(type.id)}
                className="mt-1 h-4 w-4 text-blue-500 border-slate-600 bg-slate-800 focus:ring-blue-500 focus:ring-offset-slate-900"
              />
              <div>
                <span className="block font-medium text-white">{type.label}</span>
                <span className="block text-sm text-slate-400">{type.description}</span>
              </div>
            </label>
          ))}
        </div>
        {validationErrors.signageType && (
          <p id="signageType-error" className="mt-2 text-sm text-rose-400">
            {validationErrors.signageType}
          </p>
        )}
      </fieldset>

      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-slate-300 mb-2">
            Project / Job Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            aria-invalid={!!validationErrors.projectName}
            aria-describedby={validationErrors.projectName ? 'projectName-error' : undefined}
            className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
              validationErrors.projectName ? 'border-rose-500' : 'border-slate-700'
            }`}
            placeholder="Enter project or job name"
          />
          {validationErrors.projectName && (
            <p id="projectName-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.projectName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="neededByDate" className="block text-sm font-medium text-slate-300 mb-2">
            Date Needed <span className="text-rose-400">*</span>
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

      {/* Delivery Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="deliveryAddress" className="block text-sm font-medium text-slate-300 mb-2">
            Delivery Address <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleInputChange}
            aria-invalid={!!validationErrors.deliveryAddress}
            aria-describedby={validationErrors.deliveryAddress ? 'deliveryAddress-error' : undefined}
            className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
              validationErrors.deliveryAddress ? 'border-rose-500' : 'border-slate-700'
            }`}
            placeholder="Enter delivery address"
          />
          {validationErrors.deliveryAddress && (
            <p id="deliveryAddress-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.deliveryAddress}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-slate-300 mb-2">
            Quantity <span className="text-rose-400">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            min="1"
            aria-invalid={!!validationErrors.quantity}
            aria-describedby={validationErrors.quantity ? 'quantity-error' : undefined}
            className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
              validationErrors.quantity ? 'border-rose-500' : 'border-slate-700'
            }`}
          />
          {validationErrors.quantity && (
            <p id="quantity-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.quantity}
            </p>
          )}
        </div>
      </div>

      {/* Special Instructions */}
      <div>
        <label htmlFor="specialInstructions" className="block text-sm font-medium text-slate-300 mb-2">
          Special Instructions or Details
        </label>
        <textarea
          id="specialInstructions"
          name="specialInstructions"
          value={formData.specialInstructions}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none resize-none"
          placeholder="Include any specific requirements, dimensions, colors, or other details..."
        />
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
              Submit Request
            </>
          )}
        </button>
      </div>
    </form>
  );
}
