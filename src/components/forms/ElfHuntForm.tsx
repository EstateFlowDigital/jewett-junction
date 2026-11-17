import * as React from 'react';
import { Loader2, CheckCircle2, AlertCircle, Send, Camera, X } from 'lucide-react';

const API_BASE = '/jewett-junction';
// Phone photos are often 3–8 MB, and /api/upload-photo takes 4 MB at most, so
// the photo is shrunk in the browser to fit inside this many pixels per side
// and saved as a JPEG before it's sent. This also turns iPhone HEIC photos
// into JPEGs on Safari.
const MAX_SIDE = 2000;
const JPEG_QUALITY = 0.85;

type FormStatus = 'idle' | 'uploading' | 'submitting' | 'success' | 'error';

async function shrinkPhoto(file: File): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("That photo couldn't be opened. Please try a JPEG or PNG."));
      el.src = url;
    });
    const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("That photo couldn't be opened. Please try again.");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("That photo couldn't be prepared. Please try again."))),
        'image/jpeg',
        JPEG_QUALITY,
      ),
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function toBase64(blob: Blob): Promise<string> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

/**
 * The "Where's the Elf?" photo form on /culture/elf-hunt: a name and a photo.
 * Laid out like the job site photo form (JobSitePhotoForm) so it matches the
 * rest of the portal. The page decides whether the hunt is open; this only
 * renders while it is.
 */
export function ElfHuntForm() {
  const [name, setName] = React.useState('');
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = React.useState('');
  const [status, setStatus] = React.useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next.photo;
      return next;
    });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!photoFile) errors.photo = 'Please choose a photo of the elf';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !photoFile) return;
    setErrorMessage('');

    // Upload the photo first: if it fails, don't record a submission with no image.
    let photoUrl: string;
    setStatus('uploading');
    try {
      const jpeg = await shrinkPhoto(photoFile);
      const response = await fetch(`${API_BASE}/api/upload-photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: 'elf-hunt.jpg', fileType: 'image/jpeg', fileData: await toBase64(jpeg) }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) throw new Error(data.error || `Photo upload failed (${response.status})`);
      photoUrl = data.url;
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Unable to upload photo. Please try again.');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch(`${API_BASE}/api/elf-hunt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, photoUrl }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        setStatus('success');
        setName('');
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

  const isBusy = status === 'uploading' || status === 'submitting';

  if (status === 'success') {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 shrink-0 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Photo Submitted!</h3>
        <p className="text-slate-300 mb-6">Thanks for playing. Stay tuned for this week’s winners.</p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-3 min-h-[44px] bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          Submit Another Photo
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {status === 'error' && (
        <div role="alert" className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium text-rose-300">Submission Failed</p>
            <p className="text-sm text-rose-400">{errorMessage}</p>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="elfName" className="block text-sm font-medium text-slate-300 mb-2">
          Your Name <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          id="elfName"
          name="name"
          value={name}
          maxLength={80}
          autoComplete="name"
          onChange={(e) => {
            setName(e.target.value);
            if (validationErrors.name) setValidationErrors((prev) => ({ ...prev, name: '' }));
          }}
          aria-invalid={!!validationErrors.name}
          aria-describedby={validationErrors.name ? 'elfName-error' : undefined}
          className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
            validationErrors.name ? 'border-rose-500' : 'border-slate-700'
          }`}
          placeholder="Enter your first and last name"
        />
        {validationErrors.name && (
          <p id="elfName-error" className="mt-1 text-sm text-rose-400">
            {validationErrors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="elfPhoto" className="block text-sm font-medium text-slate-300 mb-2">
          Photo <span className="text-rose-400">*</span>
        </label>
        <input
          type="file"
          id="elfPhoto"
          name="photo"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          aria-invalid={!!validationErrors.photo}
          aria-describedby={validationErrors.photo ? 'elfPhoto-error' : 'elfPhoto-hint'}
          className={`w-full px-4 py-3 min-h-[44px] bg-slate-800/50 border rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-700 file:text-white hover:file:bg-slate-600 focus:ring-2 focus:ring-blue-500 focus-visible:outline-none ${
            validationErrors.photo ? 'border-rose-500' : 'border-slate-700'
          }`}
        />
        <p id="elfPhoto-hint" className="mt-1 text-xs text-slate-500">
          Take a photo or choose one from your phone.
        </p>
        {validationErrors.photo && (
          <p id="elfPhoto-error" className="mt-1 text-sm text-rose-400">
            {validationErrors.photo}
          </p>
        )}

        {photoFile && (
          <div className="mt-3 flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-xl">
            {photoPreview ? (
              <img src={photoPreview} alt="Selected photo preview" className="h-16 w-16 object-cover rounded-lg flex-shrink-0" />
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
              Submit Photo
            </>
          )}
        </button>
      </div>
    </form>
  );
}
