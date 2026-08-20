import * as React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

/**
 * The search + filter bar used by the Directory, Resources and Events lists.
 *
 * Two rows, because search, a dozen filters and a view toggle cannot share one
 * line: the filters' min-content width is large enough that a `flex-1` search
 * field beside them collapses to an unreadable stub.
 *
 *   row 1 — search (takes the width) + whatever toggle the page passes as children
 *   row 2 — every filter on ONE line that scrolls sideways, then the live count
 *
 * The filter row scrolls rather than wraps, so adding categories grows the
 * scroll distance instead of pushing the bar taller. Nothing is ever hidden
 * behind a "first N" cap.
 */

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

/**
 * Pins an "all" entry first, then orders the rest by size so the biggest groups
 * sit where the eye starts. Ties break alphabetically to keep the order stable
 * between renders.
 */
export function buildFilterOptions(
  counts: Record<string, number>,
  total: number,
  allLabel = 'All',
): FilterOption[] {
  const rest = Object.entries(counts)
    .map(([label, count]) => ({ value: label, label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  return [{ value: allLabel, label: allLabel, count: total }, ...rest];
}

// Static class strings — Tailwind cannot see `bg-${accent}-500`, so the accents
// are spelled out and looked up.
const ACCENTS = {
  cyan: {
    field: 'focus:border-cyan-500 focus:ring-cyan-500',
    chipOn: 'bg-cyan-500 text-white',
    countOn: 'text-cyan-100',
    ring: 'focus-visible:ring-cyan-500',
  },
  amber: {
    field: 'focus:border-amber-500 focus:ring-amber-500',
    chipOn: 'bg-amber-500 text-white',
    countOn: 'text-amber-100',
    ring: 'focus-visible:ring-amber-500',
  },
  indigo: {
    field: 'focus:border-indigo-500 focus:ring-indigo-500',
    chipOn: 'bg-indigo-500 text-white',
    countOn: 'text-indigo-100',
    ring: 'focus-visible:ring-indigo-500',
  },
} as const;

interface FilterBarProps {
  /** Anchor id, so in-page links can scroll to the list. */
  id?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
  /** Accessible name for the filter row, e.g. "Filter by department". */
  filterLabel: string;
  accent: keyof typeof ACCENTS;
  resultCount: number;
  totalCount: number;
  /** Plural noun for the count, e.g. "employees". Hidden on narrow screens. */
  noun: string;
  /** The page's view toggle, placed beside the search field. */
  children?: React.ReactNode;
}

export function FilterBar({
  id,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  options,
  selected,
  onSelect,
  filterLabel,
  accent,
  resultCount,
  totalCount,
  noun,
  children,
}: FilterBarProps) {
  const a = ACCENTS[accent];
  const stripRef = React.useRef<HTMLDivElement | null>(null);
  const activeChipRef = React.useRef<HTMLButtonElement | null>(null);
  // Which edges of the strip still have filters hidden past them.
  const [overflow, setOverflow] = React.useState({ start: false, end: false });

  React.useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const update = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      setOverflow({ start: strip.scrollLeft > 4, end: strip.scrollLeft < max - 4 });
    };
    update();
    strip.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(strip);
    return () => {
      strip.removeEventListener('scroll', update);
      observer.disconnect();
    };
  }, [options.length]);

  // A deep link (or a pick from the far end of the strip) can leave the active
  // chip out of frame. Nudge the strip, and only the strip — scrollIntoView
  // would drag the whole page along with it.
  React.useEffect(() => {
    const strip = stripRef.current;
    const chip = activeChipRef.current;
    if (!strip || !chip) return;
    const stripBox = strip.getBoundingClientRect();
    const chipBox = chip.getBoundingClientRect();
    strip.scrollBy({
      left: chipBox.left - stripBox.left - (stripBox.width - chipBox.width) / 2,
      behavior: 'smooth',
    });
  }, [selected]);

  // Soft edges say "there's more this way", and stop a half-clipped chip from
  // reading as a collision with the count sitting beside the strip.
  const fade = `linear-gradient(to right, ${
    overflow.start ? 'transparent' : '#000'
  } 0, #000 2rem, #000 calc(100% - 2rem), ${overflow.end ? 'transparent' : '#000'} 100%)`;

  return (
    <Card id={id} className="bg-slate-800/50 border-slate-700 scroll-mt-8">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:ring-1 outline-none transition-colors ${a.field}`}
            />
          </div>
          {children}
        </div>

        <div className="flex items-center gap-4 border-t border-slate-700/60 pt-3">
          <div
            ref={stripRef}
            className="flex-1 min-w-0 overflow-x-auto scrollbar-none"
            role="group"
            aria-label={filterLabel}
            style={{ maskImage: fade, WebkitMaskImage: fade }}
          >
            <div className="flex items-center gap-2 w-max pr-1">
              {options.map((option, index) => {
                const isActive = selected === option.value;
                return (
                  <React.Fragment key={option.value}>
                    <button
                      ref={isActive ? activeChipRef : undefined}
                      onClick={() => onSelect(option.value)}
                      aria-pressed={isActive}
                      className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 ${a.ring} ${
                        isActive
                          ? a.chipOn
                          : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {option.label}
                      <span
                        className={`ml-1.5 text-xs tabular-nums ${isActive ? a.countOn : 'text-slate-500'}`}
                      >
                        {option.count}
                      </span>
                    </button>
                    {/* The "all" entry is a different kind of choice to the rest —
                        but skip the rule when it is the only chip there is. */}
                    {index === 0 && options.length > 1 && (
                      <span aria-hidden="true" className="shrink-0 w-px h-5 bg-slate-700" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <p className="shrink-0 text-sm text-slate-400 tabular-nums" aria-live="polite">
            <span className="text-white font-medium">{resultCount}</span> of{' '}
            <span className="text-white font-medium">{totalCount}</span>
            <span className="hidden sm:inline"> {noun}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
