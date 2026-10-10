import * as React from 'react';

/**
 * The two-field guess form on /culture/candy-jar. The page decides whether
 * guessing is open; this only renders while it is.
 */
export function CandyJarForm() {
  const [name, setName] = React.useState('');
  const [guess, setGuess] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');
  const [updated, setUpdated] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');
    try {
      const res = await fetch('/jewett-junction/api/candy-jar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, guess }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong saving your guess. Please try again.');
      setUpdated(!!data.updated);
      setStatus('success');
    } catch (error: any) {
      setMessage(error?.message || 'Something went wrong saving your guess. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-6" role="status">
        <h2 className="text-xl font-semibold text-white mb-2">Your guess is in!</h2>
        <p className="text-slate-300">
          {updated ? 'We replaced your earlier guess with ' : 'You guessed '}
          <span className="font-semibold text-white">{Number(guess.replace(/,/g, '')).toLocaleString('en-US')}</span>
          {updated ? '.' : ' pieces of candy.'} Good luck!
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="candy-name" className="block text-sm font-medium text-slate-300 mb-2">
          Your First and Last Name <span className="text-amber-400">*</span>
        </label>
        <input
          id="candy-name"
          type="text"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="e.g., Jane Doe"
        />
      </div>
      <div>
        <label htmlFor="candy-guess" className="block text-sm font-medium text-slate-300 mb-2">
          How many pieces of candy do you think are in the jar? <span className="text-amber-400">*</span>
        </label>
        <input
          id="candy-guess"
          type="text"
          inputMode="numeric"
          pattern="[0-9,]*"
          required
          maxLength={9}
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className={inputClass}
          placeholder="e.g., 350"
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-rose-400" role="alert">{message}</p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit my guess'}
      </button>
    </form>
  );
}
