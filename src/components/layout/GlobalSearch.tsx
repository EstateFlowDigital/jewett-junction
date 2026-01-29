import * as React from 'react';
import { Command } from 'cmdk';
import { Dialog, DialogContent } from '../ui/dialog';
import { Search, FileText, Calendar, Users, Briefcase, Heart, FolderOpen, Loader2 } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'announcement' | 'event' | 'employee' | 'resource' | 'job' | 'culture';
  title: string;
  description: string;
  url: string;
  meta?: string;
}

const typeIcons: Record<string, React.ElementType> = {
  announcement: FileText,
  event: Calendar,
  employee: Users,
  resource: FolderOpen,
  job: Briefcase,
  culture: Heart,
};

const typeLabels: Record<string, string> = {
  announcement: 'Announcements',
  event: 'Events',
  employee: 'Directory',
  resource: 'Resources',
  job: 'Careers',
  culture: 'Culture',
};

const typeColors: Record<string, string> = {
  announcement: 'text-blue-400',
  event: 'text-purple-400',
  employee: 'text-green-400',
  resource: 'text-amber-400',
  job: 'text-cyan-400',
  culture: 'text-pink-400',
};

interface GlobalSearchProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function GlobalSearch({ open: controlledOpen, onOpenChange }: GlobalSearchProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  // Load recent searches from localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem('jj-recent-searches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Keyboard shortcut to open search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  // Debounced search
  React.useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/jewett-junction/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.success) {
          setResults(data.results);
        }
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Save recent search
  const saveRecentSearch = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('jj-recent-searches', JSON.stringify(updated));
  };

  // Navigate to result
  const handleSelect = (url: string) => {
    if (query) {
      saveRecentSearch(query);
    }
    setOpen(false);
    setQuery('');
    window.location.href = url;
  };

  // Group results by type
  const groupedResults = React.useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    results.forEach(result => {
      if (!groups[result.type]) {
        groups[result.type] = [];
      }
      groups[result.type].push(result);
    });
    return groups;
  }, [results]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 max-w-2xl bg-slate-900 border-slate-700">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-400 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-3">
          <div className="flex items-center border-b border-slate-700 px-4">
            <Search className="mr-2 h-5 w-5 shrink-0 text-slate-400" />
            <Command.Input
              placeholder="Search announcements, events, people, resources..."
              value={query}
              onValueChange={setQuery}
              className="flex h-14 w-full rounded-md bg-transparent py-3 text-base text-white outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {isLoading && <Loader2 className="h-5 w-5 animate-spin text-slate-400" />}
          </div>
          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-slate-400">
              {query.length < 2 ? 'Type at least 2 characters to search...' : 'No results found.'}
            </Command.Empty>

            {/* Recent Searches */}
            {query.length === 0 && recentSearches.length > 0 && (
              <Command.Group heading="Recent Searches">
                {recentSearches.map((search) => (
                  <Command.Item
                    key={search}
                    value={search}
                    onSelect={() => setQuery(search)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 cursor-pointer hover:bg-slate-800 aria-selected:bg-slate-800"
                  >
                    <Search className="h-4 w-4 text-slate-500" />
                    <span>{search}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* Quick Links when no query */}
            {query.length === 0 && (
              <Command.Group heading="Quick Links">
                <Command.Item
                  value="Dashboard"
                  onSelect={() => handleSelect('/jewett-junction/')}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 cursor-pointer hover:bg-slate-800 aria-selected:bg-slate-800"
                >
                  <FileText className="h-4 w-4 text-blue-400" />
                  <span>Dashboard</span>
                </Command.Item>
                <Command.Item
                  value="Events"
                  onSelect={() => handleSelect('/jewett-junction/events')}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 cursor-pointer hover:bg-slate-800 aria-selected:bg-slate-800"
                >
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span>Events</span>
                </Command.Item>
                <Command.Item
                  value="Directory"
                  onSelect={() => handleSelect('/jewett-junction/directory')}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 cursor-pointer hover:bg-slate-800 aria-selected:bg-slate-800"
                >
                  <Users className="h-4 w-4 text-green-400" />
                  <span>Employee Directory</span>
                </Command.Item>
                <Command.Item
                  value="Careers"
                  onSelect={() => handleSelect('/jewett-junction/careers')}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 cursor-pointer hover:bg-slate-800 aria-selected:bg-slate-800"
                >
                  <Briefcase className="h-4 w-4 text-cyan-400" />
                  <span>Open Positions</span>
                </Command.Item>
              </Command.Group>
            )}

            {/* Search Results grouped by type */}
            {Object.entries(groupedResults).map(([type, items]) => {
              const Icon = typeIcons[type] || FileText;
              const colorClass = typeColors[type] || 'text-slate-400';

              return (
                <Command.Group key={type} heading={typeLabels[type] || type}>
                  {items.map((result) => (
                    <Command.Item
                      key={result.id}
                      value={`${result.title} ${result.description}`}
                      onSelect={() => handleSelect(result.url)}
                      className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-slate-800 aria-selected:bg-slate-800"
                    >
                      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${colorClass}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">{result.title}</div>
                        <div className="text-slate-400 text-xs line-clamp-1">{result.description}</div>
                        {result.meta && (
                          <div className="text-slate-500 text-xs mt-0.5">{result.meta}</div>
                        )}
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              );
            })}
          </Command.List>
          <div className="border-t border-slate-700 px-4 py-2 text-xs text-slate-500 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 font-mono">↑↓</kbd>
                <span>navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 font-mono">↵</kbd>
                <span>select</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 font-mono">esc</kbd>
                <span>close</span>
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 font-mono">⌘K</kbd>
              <span>to search</span>
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
