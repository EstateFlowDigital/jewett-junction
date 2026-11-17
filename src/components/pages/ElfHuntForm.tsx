import * as React from 'react';

const API_BASE = '/jewett-junction';
// Phone photos are often 3–8 MB, and /api/upload-photo takes 4 MB at most, so
// the photo is shrunk in the browser to fit inside this many pixels per side
// and saved as a JPEG before it's sent.
const MAX_SIDE = 2000;
const JPEG_QUALITY = 0.85;

type Status = 'idle' | 'uploading' | 'submitting' | 'success' | 'error';

// Draw the chosen photo onto a canvas at a sensible size and return a JPEG.
// Doing it this way also turns iPhone HEIC photos into JPEGs on Safari.
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
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("That photo couldn't be prepared. Please try again."))), 'image/jpeg', JPEG_QUALITY),
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
 * The photo form on /culture/elf-hunt: a name and a photo of the elf. The page
 * decides whether the hunt is open; this only renders while it is.
 */
export function ElfHuntForm() {
  const [name, setName] = React.useState('');
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');
  const [message, setMessage] = React.useState('');
  const fileInput = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function choosePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const chosen = e.target.files?.[0] || null;
    if (preview) URL.revokeObjectURL(preview);
    setFile(chosen);
    setPreview(chosen ? URL.createObjectURL(chosen) : '');
    if (status === 'error') setStatus('idle');
  }

  function reset() {
    setName('');
    setFile(null);
    setPreview('');
    if (fileInput.current) fileInput.current.value = '';
    setStatus('idle');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    if (!name.trim()) {
      setMessage('Please enter your name.');
      setStatus('error');
      return;
    }
    if (!file) {
      setMessage('Please choose a photo of the elf.');
      setStatus('error');
      return;
    }

    try {
      setStatus('uploading');
      const jpeg = await shrinkPhoto(file);
      const upload = await fetch(`${API_BASE}/api/upload-photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: 'elf-hunt.jpg',
          fileType: 'image/jpeg',
          fileData: await toBase64(jpeg),
        }),
      });
      const uploaded = await upload.json().catch(() => ({}));
      if (!upload.ok || !uploaded.url) throw new Error(uploaded.error || 'Your photo didn’t upload. Please try again.');

      setStatus('submitting');
      const res = await fetch(`${API_BASE}/api/elf-hunt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, photoUrl: uploaded.url }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong sending your photo. Please try again.');
      setStatus('success');
    } catch (error: any) {
      setMessage(error?.message || 'Something went wrong sending your photo. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-6" role="status">
        <h2 className="text-xl font-semibold text-white mb-2">Your photo is in</h2>
        <p className="text-slate-300 mb-6">Thanks for playing. Stay tuned for this week’s winners.</p>
        <button
          type="button"
          onClick={reset}
          className="px-6 py-3 min-h-[44px] rounded-xl border border-slate-600 text-slate-200 hover:border-emerald-500 hover:text-white transition-colors"
        >
          Send another photo
        </button>
      </div>
    );
  }

  const busy = status === 'uploading' || status === 'submitting';
  const inputClass =
    'w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="elf-name" className="block text-sm font-medium text-slate-300 mb-2">
          Your Name <span className="text-emerald-400">*</span>
        </label>
        <input
          id="elf-name"
          type="text"
          required
          maxLength={80}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="First and last name"
        />
      </div>

      <div>
        <label htmlFor="elf-photo" className="block text-sm font-medium text-slate-300 mb-2">
          Photo <span className="text-emerald-400">*</span>
        </label>
        <input
          id="elf-photo"
          ref={fileInput}
          type="file"
          accept="image/*"
          required
          onChange={choosePhoto}
          className="block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-4 file:py-2.5 file:font-semibold file:text-white hover:file:bg-emerald-700 file:min-h-[44px]"
        />
        {preview && (
          <img src={preview} alt="Your elf photo" className="mt-4 max-h-64 w-auto rounded-lg border border-slate-700" />
        )}
      </div>

      {status === 'error' && (
        <p className="text-sm text-rose-400" role="alert">{message}</p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 min-h-[44px] transition-colors disabled:opacity-60"
      >
        {status === 'uploading' ? 'Uploading photo…' : status === 'submitting' ? 'Sending…' : 'Submit my photo'}
      </button>
    </form>
  );
}
