import * as React from 'react';

/**
 * "Ring It In" — celebration box for contract wins (Home + Culture).
 *
 * Clicking the gong strikes it: a Web Audio–synthesized gong sound plus a
 * ripple animation. The sound is synthesized rather than an mp3 so there is no
 * asset to host and nothing to download — a gong is a stack of inharmonic
 * sine partials with long decays, which oscillators do well.
 *
 * All copy comes from Site Settings (ring-it-in-*); the box is hidden by the
 * pages when the headline is empty, so it can be retired between wins without
 * a code change.
 *
 * The shoutout button is a real <a>, so navigation works before this island
 * hydrates — only the sound needs JS. Post-hydration it delays navigation
 * ~700ms so the strike is heard before the page changes.
 */

interface RingItInProps {
  headline: string;
  message?: string;
  link?: string;
  buttonLabel?: string;
}

// Non-integer partial ratios are what make it a gong and not a church bell.
const PARTIALS: Array<[ratio: number, gain: number, decay: number]> = [
  [1.0, 0.9, 3.8],
  [1.52, 0.55, 3.2],
  [2.09, 0.38, 2.7],
  [2.73, 0.26, 2.2],
  [3.43, 0.18, 1.7],
  [4.21, 0.12, 1.3],
  [5.12, 0.07, 1.0],
];

function strikeGong(ctx: AudioContext) {
  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.value = 0.28;
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -12;
  master.connect(limiter);
  limiter.connect(ctx.destination);

  const base = 96; // Hz — large gong territory
  for (const [ratio, gain, decay] of PARTIALS) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = base * ratio;
    // A whisper of pitch sag as the metal settles.
    osc.frequency.exponentialRampToValueAtTime(base * ratio * 0.994, now + decay);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(gain, now + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, now + decay);
    osc.connect(g);
    g.connect(master);
    osc.start(now);
    osc.stop(now + decay + 0.1);
  }

  // The mallet strike — a short burst of band-passed noise.
  const len = Math.floor(ctx.sampleRate * 0.09);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 320;
  bp.Q.value = 0.8;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.5, now);
  ng.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  noise.connect(bp);
  bp.connect(ng);
  ng.connect(master);
  noise.start(now);
}

export function RingItIn({ headline, message = '', link = '', buttonLabel = 'Submit your Shoutout' }: RingItInProps) {
  const ctxRef = React.useRef<AudioContext | null>(null);
  const [ringing, setRinging] = React.useState(0); // increments per strike so re-clicks re-trigger the ripple

  const strike = React.useCallback(() => {
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (!ctxRef.current) ctxRef.current = new Ctx();
      const ctx = ctxRef.current;
      // Browsers suspend fresh contexts until a user gesture; this IS one.
      if (ctx.state === 'suspended') void ctx.resume();
      strikeGong(ctx);
    } catch {
      /* no audio support — the animation still acknowledges the click */
    }
    setRinging((n) => n + 1);
  }, []);

  const onShoutout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!link) return;
    e.preventDefault();
    strike();
    window.setTimeout(() => {
      window.location.href = link;
    }, 700);
  };

  return (
    <div className="glass rounded-2xl border border-amber-500/30 hover:border-amber-500/50 transition-all overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-7">
        {/* The gong. A button, so it is keyboard-strikeable. */}
        <button
          type="button"
          onClick={strike}
          aria-label="Ring the gong"
          className="relative shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full"
        >
          {/* ripple rings — re-keyed per strike so every hit ripples */}
          {ringing > 0 && (
            <span key={ringing} aria-hidden="true" className="motion-reduce:hidden">
              <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping" />
              <span className="absolute -inset-2 rounded-full border-2 border-amber-400/30 animate-ping [animation-duration:1.4s]" />
            </span>
          )}
          <span
            className={`relative flex w-24 h-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 shadow-lg shadow-amber-500/30 border-4 border-amber-300/40 transition-transform group-hover:scale-105 group-active:scale-95`}
          >
            {/* concentric gong face */}
            <span className="absolute inset-3 rounded-full border border-amber-200/40" aria-hidden="true" />
            <span className="absolute inset-6 rounded-full border border-amber-200/30" aria-hidden="true" />
            <span className="w-6 h-6 rounded-full bg-amber-200/80 shadow-inner" aria-hidden="true" />
          </span>
          <span className="sr-only">Plays a gong sound</span>
        </button>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            {headline}
            <span aria-hidden="true">🔔</span>
          </h3>
          {message && <p className="text-slate-300 mt-1.5 leading-relaxed">{message}</p>}
          <p className="text-xs text-slate-500 mt-1.5">Tap the gong to ring it.</p>
        </div>

        {link && (
          <a
            href={link}
            onClick={onShoutout}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold transition-colors"
          >
            {buttonLabel}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
