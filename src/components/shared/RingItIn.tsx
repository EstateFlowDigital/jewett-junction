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
//
// The weighting deliberately does NOT roll off steeply into the highs. A phone
// speaker cannot radiate much below ~500Hz, so a gong whose energy all sits at
// 138-380Hz is close to silent on a handset however loud the page turns it up.
// Carrying real weight up through ~1.3kHz is what makes the strike survive a
// small speaker; on desktop speakers and headphones the low partials still give
// it body. Highs decay faster than lows, as they do on real struck metal.
const PARTIALS: Array<[ratio: number, gain: number, decay: number]> = [
  [1.0, 0.55, 6.0],
  [1.52, 0.45, 5.2],
  [2.09, 0.42, 4.6],
  [2.73, 0.4, 4.0],
  [3.43, 0.38, 3.4],
  [4.21, 0.34, 2.8],
  [5.12, 0.3, 2.2],
  [6.35, 0.22, 1.7],
  [7.68, 0.15, 1.3],
  [9.42, 0.1, 1.0],
];

// How long a strike stays AUDIBLE — which is not how long its oscillators run.
// Each partial ramps exponentially down to RAMP_FLOOR (-80dB), but the note
// stops being heard far earlier; past roughly -45dB it is lost under ordinary
// room noise. Timing the ripple off the oscillator tail instead left the rings
// expanding for ~2.5s after the gong had gone silent.
//
// Solving the ramp for the moment it crosses that floor, and taking the partial
// that lasts longest, keeps sound and motion ending together even if the
// partials are retuned.
const AUDIBLE_FLOOR_DB = -45;
const RAMP_FLOOR = 0.0001;

const GONG_DURATION_MS = Math.round(
  1000 *
    Math.max(
      ...PARTIALS.map(
        ([, gain, decay]) =>
          (decay * ((AUDIBLE_FLOOR_DB / 20) * Math.LN10)) / Math.log(RAMP_FLOOR / gain),
      ),
    ),
);

// Gain staging. The partials sum well above 1.0 on the strike, so they are
// scaled down, limited, then brought back up: limiting BEFORE the makeup is
// what buys loudness without clipping. Raising PRE_GAIN alone would only feed
// the limiter more and get squashed — MAKEUP is the knob that sets output
// level, and it is set to land the peak just under full scale.
const PRE_GAIN = 0.3;
const MAKEUP = 1.82;

export function strikeGong(ctx: BaseAudioContext) {
  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.value = PRE_GAIN;
  // A true limiter (high ratio, fast attack) catching only the strike peak,
  // rather than the -12dB threshold that used to compress the whole tail flat.
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -3;
  limiter.knee.value = 3;
  limiter.ratio.value = 20;
  limiter.attack.value = 0.002;
  limiter.release.value = 0.25;
  const makeup = ctx.createGain();
  makeup.gain.value = MAKEUP;
  master.connect(limiter);
  limiter.connect(makeup);
  makeup.connect(ctx.destination);

  const base = 138; // Hz — medium gong; tuned up from 96 at the client's request
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

  // The mallet strike — a short burst of band-passed noise. Centred well above
  // the old 460Hz: the transient is the part a phone speaker reproduces best,
  // and it is what reads as "loud" before the tone itself arrives.
  const len = Math.floor(ctx.sampleRate * 0.09);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 1200;
  bp.Q.value = 0.7;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.75, now);
  ng.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  noise.connect(bp);
  bp.connect(ng);
  ng.connect(master);
  noise.start(now);
}

export function RingItIn({ headline, message = '', link = '', buttonLabel = 'Submit your Shoutout' }: RingItInProps) {
  // Where the shoutout button goes when Site Settings has no link set. The CMS
  // value still wins, so this is a floor rather than an override.
  const href = link || '/jewett-junction/ring-it-in';

  const ctxRef = React.useRef<AudioContext | null>(null);
  // 0 = silent and unrendered; any other value is a strike id that re-keys the
  // ripple so a re-click restarts it mid-ring.
  const [ringing, setRinging] = React.useState(0);
  const silenceTimer = React.useRef<number | null>(null);

  const strike = React.useCallback(() => {
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (!ctxRef.current) ctxRef.current = new Ctx();
      const ctx = ctxRef.current;

      // iOS unlocks an AudioContext only when a source node is *started inside
      // the gesture itself*, and it re-locks whenever the tab backgrounds. A
      // silent one-sample buffer does that unlocking.
      //
      // Everything from here stays synchronous on purpose. Waiting for
      // resume() to resolve before striking pushes the strike outside the
      // gesture, which is enough for iOS to stay silent — the timing is safe
      // either way, because a suspended context's currentTime is merely frozen
      // and resumes from the same value, so events scheduled against it keep
      // their relative offsets.
      const unlock = ctx.createBufferSource();
      unlock.buffer = ctx.createBuffer(1, 1, 22050);
      unlock.connect(ctx.destination);
      unlock.start(0);

      if (ctx.state === 'suspended') void ctx.resume();
      strikeGong(ctx);
    } catch {
      /* no audio support — the animation still acknowledges the click */
    }
    setRinging((n) => n + 1);
    // Re-striking restarts the clock, so the rings outlive the newest note only.
    if (silenceTimer.current !== null) window.clearTimeout(silenceTimer.current);
    silenceTimer.current = window.setTimeout(() => {
      silenceTimer.current = null;
      setRinging(0);
    }, GONG_DURATION_MS);
  }, []);

  React.useEffect(
    () => () => {
      if (silenceTimer.current !== null) window.clearTimeout(silenceTimer.current);
    },
    [],
  );

  const onShoutout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href) return;
    e.preventDefault();
    strike();
    window.setTimeout(() => {
      window.location.href = href;
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
          {/* Ripple rings. Rendered only while the strike is audible — the
              wrapper fades them out along the note's decay and then unmounts. */}
          {ringing > 0 && (
            <span
              key={ringing}
              aria-hidden="true"
              className="motion-reduce:hidden animate-gong-decay"
              style={{ '--gong-duration': `${GONG_DURATION_MS}ms` } as React.CSSProperties}
            >
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

        {href && (
          <a
            href={href}
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
