import * as React from 'react';
import { Card, CardContent } from '../ui/card';
import { Zap } from 'lucide-react';
import { getIcon } from '../admin/icon-map';

export interface QuickAction {
  id?: string;
  name?: string;
  slug?: string;
  'page-slug'?: string;
  title?: string;
  subtitle?: string;
  'destination-url'?: string;
  'icon-name'?: string;
  'accent-color'?: string;
  'sort-order'?: number;
  'is-active'?: boolean;
}

interface QuickActionCardsProps {
  /** Array of quick-action records fetched from the CMS, already filtered by page. */
  actions?: QuickAction[];
  /** Theme — only `dark` is styled differently right now. */
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
}

// Tailwind purges dynamically constructed class names (`bg-${accent}-900`),
// so each accent's classes must appear as static string literals somewhere
// in the bundle. This palette keeps every Quick Action color rendering
// regardless of whether the value is also used elsewhere in the app.
type Palette = {
  cardDark: string;
  cardLight: string;
  tileDark: string;
  tileLight: string;
  iconText: string;
  titleDark: string;
  titleLight: string;
  subDark: string;
  subLight: string;
};
const PALETTE: Record<string, Palette> = {
  blue: {
    cardDark: 'bg-slate-800 border-blue-800 hover:border-blue-600',
    cardLight: 'border-blue-200 bg-blue-50/50 hover:border-blue-400',
    tileDark: 'bg-blue-900',
    tileLight: 'bg-blue-100',
    iconText: 'text-blue-600',
    titleDark: 'text-blue-400',
    titleLight: 'text-blue-900',
    subDark: 'text-blue-500',
    subLight: 'text-blue-700',
  },
  green: {
    cardDark: 'bg-slate-800 border-green-800 hover:border-green-600',
    cardLight: 'border-green-200 bg-green-50/50 hover:border-green-400',
    tileDark: 'bg-green-900',
    tileLight: 'bg-green-100',
    iconText: 'text-green-600',
    titleDark: 'text-green-400',
    titleLight: 'text-green-900',
    subDark: 'text-green-500',
    subLight: 'text-green-700',
  },
  emerald: {
    cardDark: 'bg-slate-800 border-emerald-800 hover:border-emerald-600',
    cardLight: 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-400',
    tileDark: 'bg-emerald-900',
    tileLight: 'bg-emerald-100',
    iconText: 'text-emerald-600',
    titleDark: 'text-emerald-400',
    titleLight: 'text-emerald-900',
    subDark: 'text-emerald-500',
    subLight: 'text-emerald-700',
  },
  purple: {
    cardDark: 'bg-slate-800 border-purple-800 hover:border-purple-600',
    cardLight: 'border-purple-200 bg-purple-50/50 hover:border-purple-400',
    tileDark: 'bg-purple-900',
    tileLight: 'bg-purple-100',
    iconText: 'text-purple-600',
    titleDark: 'text-purple-400',
    titleLight: 'text-purple-900',
    subDark: 'text-purple-500',
    subLight: 'text-purple-700',
  },
  violet: {
    cardDark: 'bg-slate-800 border-violet-800 hover:border-violet-600',
    cardLight: 'border-violet-200 bg-violet-50/50 hover:border-violet-400',
    tileDark: 'bg-violet-900',
    tileLight: 'bg-violet-100',
    iconText: 'text-violet-600',
    titleDark: 'text-violet-400',
    titleLight: 'text-violet-900',
    subDark: 'text-violet-500',
    subLight: 'text-violet-700',
  },
  orange: {
    cardDark: 'bg-slate-800 border-orange-800 hover:border-orange-600',
    cardLight: 'border-orange-200 bg-orange-50/50 hover:border-orange-400',
    tileDark: 'bg-orange-900',
    tileLight: 'bg-orange-100',
    iconText: 'text-orange-600',
    titleDark: 'text-orange-400',
    titleLight: 'text-orange-900',
    subDark: 'text-orange-500',
    subLight: 'text-orange-700',
  },
  amber: {
    cardDark: 'bg-slate-800 border-amber-800 hover:border-amber-600',
    cardLight: 'border-amber-200 bg-amber-50/50 hover:border-amber-400',
    tileDark: 'bg-amber-900',
    tileLight: 'bg-amber-100',
    iconText: 'text-amber-600',
    titleDark: 'text-amber-400',
    titleLight: 'text-amber-900',
    subDark: 'text-amber-500',
    subLight: 'text-amber-700',
  },
  red: {
    cardDark: 'bg-slate-800 border-red-800 hover:border-red-600',
    cardLight: 'border-red-200 bg-red-50/50 hover:border-red-400',
    tileDark: 'bg-red-900',
    tileLight: 'bg-red-100',
    iconText: 'text-red-600',
    titleDark: 'text-red-400',
    titleLight: 'text-red-900',
    subDark: 'text-red-500',
    subLight: 'text-red-700',
  },
  rose: {
    cardDark: 'bg-slate-800 border-rose-800 hover:border-rose-600',
    cardLight: 'border-rose-200 bg-rose-50/50 hover:border-rose-400',
    tileDark: 'bg-rose-900',
    tileLight: 'bg-rose-100',
    iconText: 'text-rose-600',
    titleDark: 'text-rose-400',
    titleLight: 'text-rose-900',
    subDark: 'text-rose-500',
    subLight: 'text-rose-700',
  },
  pink: {
    cardDark: 'bg-slate-800 border-pink-800 hover:border-pink-600',
    cardLight: 'border-pink-200 bg-pink-50/50 hover:border-pink-400',
    tileDark: 'bg-pink-900',
    tileLight: 'bg-pink-100',
    iconText: 'text-pink-600',
    titleDark: 'text-pink-400',
    titleLight: 'text-pink-900',
    subDark: 'text-pink-500',
    subLight: 'text-pink-700',
  },
  cyan: {
    cardDark: 'bg-slate-800 border-cyan-800 hover:border-cyan-600',
    cardLight: 'border-cyan-200 bg-cyan-50/50 hover:border-cyan-400',
    tileDark: 'bg-cyan-900',
    tileLight: 'bg-cyan-100',
    iconText: 'text-cyan-600',
    titleDark: 'text-cyan-400',
    titleLight: 'text-cyan-900',
    subDark: 'text-cyan-500',
    subLight: 'text-cyan-700',
  },
  sky: {
    cardDark: 'bg-slate-800 border-sky-800 hover:border-sky-600',
    cardLight: 'border-sky-200 bg-sky-50/50 hover:border-sky-400',
    tileDark: 'bg-sky-900',
    tileLight: 'bg-sky-100',
    iconText: 'text-sky-600',
    titleDark: 'text-sky-400',
    titleLight: 'text-sky-900',
    subDark: 'text-sky-500',
    subLight: 'text-sky-700',
  },
  indigo: {
    cardDark: 'bg-slate-800 border-indigo-800 hover:border-indigo-600',
    cardLight: 'border-indigo-200 bg-indigo-50/50 hover:border-indigo-400',
    tileDark: 'bg-indigo-900',
    tileLight: 'bg-indigo-100',
    iconText: 'text-indigo-600',
    titleDark: 'text-indigo-400',
    titleLight: 'text-indigo-900',
    subDark: 'text-indigo-500',
    subLight: 'text-indigo-700',
  },
  yellow: {
    cardDark: 'bg-slate-800 border-yellow-800 hover:border-yellow-600',
    cardLight: 'border-yellow-200 bg-yellow-50/50 hover:border-yellow-400',
    tileDark: 'bg-yellow-900',
    tileLight: 'bg-yellow-100',
    iconText: 'text-yellow-600',
    titleDark: 'text-yellow-400',
    titleLight: 'text-yellow-900',
    subDark: 'text-yellow-500',
    subLight: 'text-yellow-700',
  },
  teal: {
    cardDark: 'bg-slate-800 border-teal-800 hover:border-teal-600',
    cardLight: 'border-teal-200 bg-teal-50/50 hover:border-teal-400',
    tileDark: 'bg-teal-900',
    tileLight: 'bg-teal-100',
    iconText: 'text-teal-600',
    titleDark: 'text-teal-400',
    titleLight: 'text-teal-900',
    subDark: 'text-teal-500',
    subLight: 'text-teal-700',
  },
};

// Renders the 4-up grid of action cards at the top of HR / Safety / IT / etc.
// landing pages. Cards are CMS-driven (Quick Actions collection); each record
// supplies a lucide icon name, tailwind accent color, title, subtitle, and
// destination link. Returns null when the array is empty so the page collapses
// the section instead of leaving an empty grid.
export function QuickActionCards({ actions = [], theme = 'dark' }: QuickActionCardsProps) {
  if (!actions || actions.length === 0) return null;
  const isDark = theme === 'dark';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = getIcon(action['icon-name']) || Zap;
        const accent = action['accent-color'] || 'blue';
        const p = PALETTE[accent] || PALETTE.blue;
        const href = action['destination-url'] || '#';
        const title = action.title || action.name || '';
        const subtitle = action.subtitle || '';
        return (
          <a key={action.id || action.slug || title} href={href}>
            <Card
              className={`hover:shadow-lg transition-all cursor-pointer h-full ${
                isDark ? p.cardDark : p.cardLight
              }`}
            >
              <CardContent className="py-4 text-center">
                <div className={`w-12 h-12 shrink-0 ${isDark ? p.tileDark : p.tileLight} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${p.iconText}`} />
                </div>
                <div className={`font-semibold ${isDark ? p.titleDark : p.titleLight}`}>{title}</div>
                {subtitle && (
                  <div className={`text-sm ${isDark ? p.subDark : p.subLight}`}>{subtitle}</div>
                )}
              </CardContent>
            </Card>
          </a>
        );
      })}
    </div>
  );
}
