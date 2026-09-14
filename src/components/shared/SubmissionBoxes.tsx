import * as React from 'react';
import { getIcon } from '../admin/icon-map';
import { Gong } from './RingItIn';

/**
 * The large "submission box" cards — Living the Mission, Internal Sales Lead
 * Submission — driven by Quick Actions that carry a Description. Shared by the
 * homepage and Culture so the card is one implementation, not two copies that
 * drift.
 *
 * The sales-lead card carries the celebration gong: a contract win is what
 * that form leads to. It is matched on the destination URL rather than the
 * title, so renaming the card in the CMS cannot silently break the pairing.
 *
 * Needs hydration only for the gong, so render it with client:load.
 */

// Spelled out because Tailwind cannot see `bg-${accent}-500/20`-style strings.
const PALETTE: Record<string, { ring: string; chip: string; icon: string; btn: string; hover: string }> = {
  pink: { ring: 'hover:border-pink-500/40', chip: 'bg-pink-500/15 border-pink-500/30', icon: 'text-pink-400', btn: 'bg-pink-600 hover:bg-pink-500', hover: 'group-hover:text-pink-300' },
  emerald: { ring: 'hover:border-emerald-500/40', chip: 'bg-emerald-500/15 border-emerald-500/30', icon: 'text-emerald-400', btn: 'bg-emerald-600 hover:bg-emerald-500', hover: 'group-hover:text-emerald-300' },
  blue: { ring: 'hover:border-blue-500/40', chip: 'bg-blue-500/15 border-blue-500/30', icon: 'text-blue-400', btn: 'bg-blue-600 hover:bg-blue-500', hover: 'group-hover:text-blue-300' },
  amber: { ring: 'hover:border-amber-500/40', chip: 'bg-amber-500/15 border-amber-500/30', icon: 'text-amber-400', btn: 'bg-amber-600 hover:bg-amber-500', hover: 'group-hover:text-amber-300' },
  purple: { ring: 'hover:border-purple-500/40', chip: 'bg-purple-500/15 border-purple-500/30', icon: 'text-purple-400', btn: 'bg-purple-600 hover:bg-purple-500', hover: 'group-hover:text-purple-300' },
};

export interface SubmissionAction {
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  'destination-url'?: string;
  'icon-name'?: string;
  'accent-color'?: string;
  'button-label'?: string;
}

interface SubmissionBoxesProps {
  actions: SubmissionAction[];
}

export function SubmissionBoxes({ actions }: SubmissionBoxesProps) {
  const boxes = actions.filter((a) => !!a.description);
  if (boxes.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 ${boxes.length > 1 ? 'lg:grid-cols-2' : ''} gap-4`}>
      {boxes.map((action, i) => {
        const p = PALETTE[action['accent-color'] || ''] || PALETTE.blue;
        const Icon = getIcon(action['icon-name']);
        const href = action['destination-url'] || '#';
        const external = /^https?:\/\//.test(href);
        const hasGong = href.includes('/sales-lead');

        const body = (
          <>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${p.chip} border rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                {Icon && <Icon className={`w-6 h-6 ${p.icon}`} aria-hidden="true" />}
              </div>
              <div className="min-w-0">
                <h3 className={`text-lg font-semibold text-white ${p.hover} transition-colors`}>{action.title || action.name}</h3>
                {action.subtitle && <p className="text-xs uppercase tracking-wider text-slate-500 mt-0.5">{action.subtitle}</p>}
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mt-4 flex-1">{action.description}</p>
          </>
        );

        const cta = (
          <span className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white ${p.btn} transition-colors self-start`}>
            {action['button-label'] || 'Get started'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </span>
        );

        const key = action.id || action.slug || i;

        // With a gong the card cannot be one big <a> — a button nested in a link
        // is invalid and swallows the tap — so the gong-bearing card is a plain
        // container with its own link, and the rest stay as links.
        return hasGong ? (
          <div key={key} className={`glass rounded-2xl p-6 border border-slate-700/50 ${p.ring} transition-all group flex flex-col`}>
            {body}
            <div className="flex items-center gap-5 mt-5">
              <Gong sizeClass="w-16 h-16" />
              <div className="min-w-0 flex-1">
                <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="inline-block">
                  {cta}
                </a>
                <p className="text-xs text-slate-500 mt-2">Tap the gong to ring in a win.</p>
              </div>
            </div>
          </div>
        ) : (
          <a
            key={key}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={`glass rounded-2xl p-6 border border-slate-700/50 ${p.ring} transition-all card-hover group flex flex-col`}
          >
            {body}
            <div className="mt-5">{cta}</div>
          </a>
        );
      })}
    </div>
  );
}
