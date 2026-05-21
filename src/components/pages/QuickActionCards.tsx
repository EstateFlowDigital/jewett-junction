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
        const href = action['destination-url'] || '#';
        const title = action.title || action.name || '';
        const subtitle = action.subtitle || '';
        return (
          <a key={action.id || action.slug || title} href={href}>
            <Card
              className={`hover:shadow-lg transition-all cursor-pointer h-full ${
                isDark
                  ? `bg-slate-800 border-${accent}-800 hover:border-${accent}-600`
                  : `border-${accent}-200 bg-${accent}-50/50 hover:border-${accent}-400`
              }`}
            >
              <CardContent className="py-4 text-center">
                <div className={`w-12 h-12 ${isDark ? `bg-${accent}-900` : `bg-${accent}-100`} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 text-${accent}-600`} />
                </div>
                <div className={`font-semibold ${isDark ? `text-${accent}-400` : `text-${accent}-900`}`}>{title}</div>
                {subtitle && (
                  <div className={`text-sm ${isDark ? `text-${accent}-500` : `text-${accent}-700`}`}>{subtitle}</div>
                )}
              </CardContent>
            </Card>
          </a>
        );
      })}
    </div>
  );
}
