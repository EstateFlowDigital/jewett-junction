import * as React from 'react';
import { Loader2, CheckCircle2, AlertCircle, Send, Camera, X } from 'lucide-react';

const API_BASE = '/jewett-junction';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

interface FormData {
  submitterName: string;
  jobSite: string;
  description: string;
}

type FormStatus = 'idle' | 'uploading' | 'submitting' | 'success' | 'error';

const EMPTY_FORM: FormData = {
  submitterName: '',
  jobSite: '',
  description: '',
};

interface JobSitePhotoFormProps {
  uiStrings?: Record<string, string>;
}

export function JobSitePhotoForm({ uiStrings = {} }: JobSitePhotoFormProps = {}) {
  const ui = (key: string, fallback: string) => uiStrings[key] || fallback;
  const [formData, setFormData] = React.useState<FormData>(EMPTY_FORM);
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = React.useState<string>('');
  const [status, setStatus] = React.useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Release the object URL when the preview changes or the form unmounts.
  React.useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const clearPhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview('');
    setPhotoFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      clearPhoto();
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setValidationErrors((prev) => ({ ...prev, photo: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' }));
      clearPhoto();
      return;
    }
    if (file.size > MAX_BYTES) {
      setValidationErrors((prev) => ({ ...prev, photo: 'File too large. Maximum size is 4 MB.' }));
      clearPhoto();
      return;
    }

    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.photo;
      return newErrors;
    });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.submitterName.trim()) {
      errors.submitterName = 'Name is required';
    }
    if (!formData.jobSite.trim()) {
      errors.jobSite = 'Job site is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    if (!photoFile) {
      errors.photo = 'Please choose a photo to upload';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadPhoto = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const response = await fetch(`${API_BASE}/api/upload-photo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileData: base64,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.url) {
      throw new Error(data.error || `Photo upload failed (${response.status})`);
    }

    return data.url as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !photoFile) {
      return;
    }

    setErrorMessage('');

    // Upload the photo first — if it fails, don't record a submission with no image.
    let photoUrl: string;
    setStatus('uploading');
    try {
      photoUrl = await uploadPhoto(photoFile);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Unable to upload photo. Please try again.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(`${API_BASE}/api/jobsite-photo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          photoUrl,
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData(EMPTY_FORM);
        clearPhoto();
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit photo');
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

  const isBusy = status === 'uploading' || status === 'submitting';

  // Success state
  if (status === 'success') {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 shrink-0 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Photo Submitted!</h3>
        <p className="text-slate-300 mb-6">
          Thanks for sharing. The marketing team will review your photo and may feature it on our website or social channels.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-3 min-h-[44px] bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          {ui('form-submit-another-photo', 'Submit Another Photo')}
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
            placeholder="Enter your first and last name"
          />
          {validationErrors.submitterName && (
            <p id="submitterName-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.submitterName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="jobSite" className="block text-sm font-medium text-slate-300 mb-2">
            Job Site <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            id="jobSite"
            name="jobSite"
            value={formData.jobSite}
            onChange={handleInputChange}
            aria-invalid={!!validationErrors.jobSite}
            aria-describedby={validationErrors.jobSite ? 'jobSite-error' : undefined}
            className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
              validationErrors.jobSite ? 'border-rose-500' : 'border-slate-700'
            }`}
            placeholder="Enter the job site name"
          />
          {validationErrors.jobSite && (
            <p id="jobSite-error" className="mt-1 text-sm text-rose-400">
              {validationErrors.jobSite}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
          Description of what's happening in the photo <span className="text-rose-400">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          aria-invalid={!!validationErrors.description}
          aria-describedby={validationErrors.description ? 'description-error' : undefined}
          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none resize-none ${
            validationErrors.description ? 'border-rose-500' : 'border-slate-700'
          }`}
          placeholder="Tell us what's going on in the shot — the crew, the milestone, the work being done..."
        />
        {validationErrors.description && (
          <p id="description-error" className="mt-1 text-sm text-rose-400">
            {validationErrors.description}
          </p>
        )}
      </div>

      {/* Photo Upload */}
      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-slate-300 mb-2">
          Photo <span className="text-rose-400">*</span>
        </label>
        <input
          type="file"
          id="photo"
          name="photo"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          aria-invalid={!!validationErrors.photo}
          aria-describedby={validationErrors.photo ? 'photo-error' : 'photo-hint'}
          className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-700 file:text-white hover:file:bg-slate-600 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
            validationErrors.photo ? 'border-rose-500' : 'border-slate-700'
          }`}
        />
        <p id="photo-hint" className="mt-1 text-xs text-slate-500">
          JPEG, PNG, WebP or GIF. Maximum 4 MB.
        </p>
        {validationErrors.photo && (
          <p id="photo-error" className="mt-1 text-sm text-rose-400">
            {validationErrors.photo}
          </p>
        )}

        {photoFile && (
          <div className="mt-3 flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Selected photo preview"
                className="h-16 w-16 object-cover rounded-lg flex-shrink-0"
              />
            ) : (
              <div className="h-16 w-16 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Camera className="h-6 w-6 text-slate-400" aria-hidden="true" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white truncate">{photoFile.name}</p>
              <p className="text-xs text-slate-400">{Math.round(photoFile.size / 1024)} KB</p>
            </div>
            <button
              type="button"
              onClick={clearPhoto}
              disabled={isBusy}
              aria-label="Remove selected photo"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isBusy}
          className="px-8 py-3 min-h-[44px] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          {isBusy ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              {status === 'uploading' ? 'Uploading photo…' : 'Submitting…'}
            </>
          ) : (
            <>
              <Send className="h-5 w-5" aria-hidden="true" />
              {ui('form-submit-photo', 'Submit Photo')}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
