import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  Users,
  Search,
  Phone,
  Mail,
  Building,
  MapPin,
  Filter,
  Grid,
  List,
  Star,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  UserCircle,
  Briefcase,
  Calendar,
  Globe,
  Shield,
  HardHat,
  Calculator,
  Megaphone,
  Laptop,
  Heart
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useDebounce, fuzzySearch } from '../../lib/search';

interface CMSEmployee {
  id: string;
  name: string;
  slug?: string;
  role: string;
  department: string;
  email?: string;
  phone?: string;
  photo?: { url: string; alt?: string };
  bio?: string;
  'start-date'?: string;
  'is-featured'?: boolean;
  location?: string;
  office?: string;
}

interface DirectorySettings {
  'hr-email'?: string;
}

interface DirectoryContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  employees?: CMSEmployee[];
  settings?: DirectorySettings;
  uiStrings?: Record<string, string>;
}

const departmentConfig: Record<string, { color: string; gradient: string; icon: any; label: string }> = {
  // New "Dept" field options (canonical)
  'executive': { color: 'amber', gradient: 'from-amber-400 to-orange-500', icon: Star, label: 'Executive' },
  'estimating': { color: 'cyan', gradient: 'from-cyan-500 to-teal-500', icon: Calculator, label: 'Estimating' },
  'design': { color: 'purple', gradient: 'from-purple-500 to-violet-500', icon: Building, label: 'Design' },
  'finance': { color: 'amber', gradient: 'from-amber-500 to-yellow-500', icon: Calculator, label: 'Finance' },
  'field operations': { color: 'blue', gradient: 'from-blue-500 to-cyan-500', icon: HardHat, label: 'Field Operations' },
  'pre-construction': { color: 'teal', gradient: 'from-teal-500 to-cyan-500', icon: Calculator, label: 'Pre-Construction' },
  'preconstruction': { color: 'teal', gradient: 'from-teal-500 to-cyan-500', icon: Calculator, label: 'Pre-Construction' },
  'hr': { color: 'purple', gradient: 'from-purple-500 to-violet-500', icon: Heart, label: 'HR' },
  'marketing': { color: 'pink', gradient: 'from-pink-500 to-rose-500', icon: Megaphone, label: 'Marketing' },
  'office operations': { color: 'emerald', gradient: 'from-emerald-500 to-green-500', icon: Briefcase, label: 'Office Operations' },
  // Legacy team-department values still kept so existing records keep rendering
  'safety': { color: 'orange', gradient: 'from-orange-500 to-red-500', icon: Shield, label: 'Safety' },
  'human resources': { color: 'purple', gradient: 'from-purple-500 to-violet-500', icon: Heart, label: 'Human Resources' },
  'operations': { color: 'blue', gradient: 'from-blue-500 to-cyan-500', icon: HardHat, label: 'Operations' },
  'information technology': { color: 'indigo', gradient: 'from-indigo-500 to-blue-500', icon: Laptop, label: 'IT' },
  'it': { color: 'indigo', gradient: 'from-indigo-500 to-blue-500', icon: Laptop, label: 'IT' },
  'engineering': { color: 'cyan', gradient: 'from-cyan-500 to-teal-500', icon: Building, label: 'Engineering' },
  'commercial': { color: 'emerald', gradient: 'from-emerald-500 to-green-500', icon: Briefcase, label: 'Commercial' },
  'admin': { color: 'slate', gradient: 'from-slate-500 to-slate-600', icon: Users, label: 'Admin' },
  'default': { color: 'slate', gradient: 'from-slate-500 to-slate-600', icon: Users, label: 'Team' },
};

function getDeptConfig(dept: string | undefined) {
  if (!dept) return departmentConfig['default'];
  const normalized = dept.toLowerCase();
  return departmentConfig[normalized] || departmentConfig['default'];
}

function getInitials(name: string) {
  const initials = name
    .replace(/[^\p{L}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return initials || '·';
}

function formatTenure(startDate: string | undefined) {
  if (!startDate) return null;
  const start = new Date(startDate);
  // Handle invalid dates
  if (isNaN(start.getTime())) return null;
  const now = new Date();
  const years = Math.floor((now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  if (years < 1) return 'New hire';
  return `${years} year${years > 1 ? 's' : ''}`;
}

// Leadership display order — these names appear first in the directory, in
// this exact sequence, then everyone else is alphabetical by name. Matches
// the order on the public Team page on jewettconstruction.com.
const LEADERSHIP_ORDER: string[] = [
  'Craig Jewett',
  'Greg Stewart',
  'Dan Ray',
  'Andrew Affronti',
  'Damon Brown',
  'Lori Smith',
  'Jon Warner',
  'Nate Weeks',
  'Diane Grillo',
  'Lynn Palmer',
  'Doug Reymore',
  'Sarah LeBlanc',
];
const LEADERSHIP_INDEX = new Map(
  LEADERSHIP_ORDER.map((name, i) => [name.trim().toLowerCase(), i]),
);
function directorySortOrder(name: string | undefined): number {
  const key = (name || '').trim().toLowerCase();
  const idx = LEADERSHIP_INDEX.get(key);
  return idx === undefined ? LEADERSHIP_ORDER.length : idx;
}

export function DirectoryContent({ theme = 'dark', employees: cmsEmployees = [], settings = {}, uiStrings = {} }: DirectoryContentProps) {
  const ui = (key: string, fallback: string) => uiStrings[key] || fallback;
  // Apply the leadership-first-then-alphabetical sort once up front. Search
  // and department filtering downstream preserve this order automatically
  // because Array.filter is stable; fuzzySearch is the only step that re-ranks
  // and only kicks in when there's an active search term.
  const allEmployees = React.useMemo(() => {
    return [...cmsEmployees].sort((a, b) => {
      const oa = directorySortOrder(a.name);
      const ob = directorySortOrder(b.name);
      if (oa !== ob) return oa - ob;
      // Both leadership in same slot (shouldn't happen) or both non-leadership:
      // alphabetical by name.
      return (a.name || '').localeCompare(b.name || '');
    });
  }, [cmsEmployees]);
  const hrEmail = settings['hr-email'] || 'hr@jewettconstruction.com';
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDept, setSelectedDept] = React.useState('All');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  // Debounce search term for better performance
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Get unique departments for filter
  const departments = ['All', ...new Set(allEmployees.map(e => getDeptConfig(e.department).label))];

  // Honour ?department=X from the URL so TeamContactCard's "View Directory"
  // link lands on the correct filtered view. Falls back to "All" when the
  // requested value isn't a valid department for the current employee set.
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('department');
    if (!requested) return;
    // Match either the dropdown label (e.g. "IT") or any case/whitespace
    // variant of the raw query — fuzzily resolves "it" / "Information Technology" too.
    const match = departments.find(
      (d) => d.toLowerCase() === requested.toLowerCase() || getDeptConfig(requested).label === d,
    );
    if (match) setSelectedDept(match);
  }, [departments.length]);

  // Get featured employees
  const featuredEmployees = allEmployees.filter(e => e['is-featured']);

  // Filter employees based on search and department with fuzzy matching
  const filteredEmployees = React.useMemo(() => {
    // First filter by department
    const deptFiltered = selectedDept === 'All'
      ? allEmployees
      : allEmployees.filter(emp => getDeptConfig(emp.department).label === selectedDept);

    // If no search term, return department-filtered results
    if (!debouncedSearch.trim()) {
      return deptFiltered;
    }

    // Use fuzzy search for better matching
    const searchResults = fuzzySearch(deptFiltered, debouncedSearch, {
      keys: ['name', 'role', 'department', 'location', 'email'],
      threshold: 0.75,
      exactFirst: true,
    });

    return searchResults.map(result => result.item);
  }, [allEmployees, debouncedSearch, selectedDept]);

  // Get unique locations (skip empties so the stats card doesn't inflate count with "Unknown")
  const locations = [...new Set(allEmployees.map(e => e.location).filter((l): l is string => !!l))];

  // Department counts
  const deptCounts = allEmployees.reduce((acc, emp) => {
    const label = getDeptConfig(emp.department).label;
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2aDZ2Nmg2di02aC02di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Users className="h-3 w-3 mr-1" />
                {allEmployees.length} Team Members
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Employee<br />Directory
            </h1>
            <p className="text-lg text-cyan-100 mb-6 max-w-xl">
              Connect with your colleagues across all departments and locations.
              Find the right person to help you get things done.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-white text-cyan-700 hover:bg-cyan-50"
                onClick={() => document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Directory
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Quick Stats — Locations stat hidden until at least one employee has an office set */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: allEmployees.length === 1 ? 'Total Employee' : 'Total Employees', value: allEmployees.length, icon: Users },
              { label: Object.keys(deptCounts).length === 1 ? 'Department' : 'Departments', value: Object.keys(deptCounts).length, icon: Building },
              ...(locations.length > 0 ? [{ label: locations.length === 1 ? 'Location' : 'Locations', value: locations.length, icon: MapPin }] : []),
              { label: featuredEmployees.length === 1 ? 'Key Contact' : 'Key Contacts', value: featuredEmployees.length, icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <stat.icon className="h-5 w-5 text-cyan-200 mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-cyan-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Key Contacts */}
      {featuredEmployees.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400" />
                Key Contacts
              </h2>
              <p className="text-sm text-slate-400">Primary points of contact for common needs</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredEmployees.slice(0, 4).map((emp) => {
              const config = getDeptConfig(emp.department);
              return (
                <Card
                  key={emp.id}
                  className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all group"
                >
                  <CardContent className="p-4">
                    {/* Clickable identity block — links to employee profile.
                        Action buttons live outside so they don't nest inside <a>. */}
                    <a
                      href={`/jewett-junction/directory/${emp.slug || emp.id}`}
                      className="flex items-center gap-4 rounded-lg -m-1 p-1 hover:bg-slate-800/40 transition-colors min-h-[44px]"
                      aria-label={`View ${emp.name}'s profile`}
                    >
                      {emp.photo?.url ? (
                        <img
                          src={emp.photo.url}
                          alt={emp.photo.alt || emp.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-slate-600"
                          loading="lazy"
                        />
                      ) : (
                        <div className={`w-14 h-14 shrink-0 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                          {getInitials(emp.name)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                          {emp.name}
                        </h3>
                        <p className="text-sm text-slate-400">{emp.role}</p>
                        <Badge className={`mt-1 bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/30 text-xs`}>
                          {config.label}
                        </Badge>
                      </div>
                    </a>
                    <div className="flex gap-2 mt-4">
                      {emp.phone && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 min-h-[44px] border-slate-600 text-slate-300 hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
                          asChild
                        >
                          <a href={`tel:${emp.phone}`}>
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </a>
                        </Button>
                      )}
                      {emp.email && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 min-h-[44px] border-slate-600 text-slate-300 hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
                          asChild
                        >
                          <a href={`mailto:${emp.email}`}>
                            <Mail className="h-3 w-3 mr-1" />
                            Email
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <Card id="directory" className="bg-slate-800/50 border-slate-700 scroll-mt-8">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder={ui('directory-search-placeholder', 'Search by name, role, department, or location...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
              />
            </div>

            {/* Department Pills */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => {
                const isActive = selectedDept === dept;
                const config = dept === 'All' ? null : getDeptConfig(dept);
                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {config && <config.icon className="h-3.5 w-3.5" />}
                    {dept}
                    {dept !== 'All' && (
                      <span className={`text-xs ${isActive ? 'text-cyan-200' : 'text-slate-500'}`}>
                        ({deptCounts[dept] || 0})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-slate-900/50 rounded-lg p-1 border border-slate-600">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
                className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                  viewMode === 'grid' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
                className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                  viewMode === 'list' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Showing <span className="text-white font-medium">{filteredEmployees.length}</span> of{' '}
          <span className="text-white font-medium">{allEmployees.length}</span> employees
        </p>
      </div>

      {/* Employee Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => {
            const config = getDeptConfig(emp.department);
            const tenure = formatTenure(emp['start-date']);
            return (
              <Card
                key={emp.id}
                className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all group overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Header with gradient */}
                  <div className={`h-16 bg-gradient-to-r ${config.gradient} relative`}>
                    <div className="absolute -bottom-8 left-4">
                      {emp.photo?.url ? (
                        <img
                          src={emp.photo.url}
                          alt={emp.photo.alt || emp.name}
                          className="w-16 h-16 rounded-xl object-cover border-4 border-slate-800 shadow-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 shrink-0 rounded-xl bg-slate-700 border-4 border-slate-800 shadow-lg flex items-center justify-center text-white font-bold text-xl">
                          {getInitials(emp.name)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-10 px-4 pb-4">
                    {/* Clickable identity + meta block — links to employee profile.
                        Phone/Email buttons sit outside so they remain functional. */}
                    <a
                      href={`/jewett-junction/directory/${emp.slug || emp.id}`}
                      className="block rounded-lg -m-1 p-1 hover:bg-slate-800/40 transition-colors min-h-[44px]"
                      aria-label={`View ${emp.name}'s profile`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                            {emp.name}
                          </h3>
                          <p className="text-sm text-slate-400">{emp.role}</p>
                        </div>
                        {emp['is-featured'] && (
                          <Star className="h-4 w-4 text-amber-400 flex-shrink-0" />
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <config.icon className="h-4 w-4" />
                          <span>{config.label}</span>
                        </div>
                        {emp.location && (
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <MapPin className="h-4 w-4" />
                            <span>{emp.location}</span>
                          </div>
                        )}
                        {tenure && (
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Calendar className="h-4 w-4" />
                            <span>{tenure}</span>
                          </div>
                        )}
                      </div>
                    </a>

                    <div className="flex gap-2">
                      {emp.phone ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                          asChild
                        >
                          <a href={`tel:${emp.phone}`}>
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </a>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled
                          className="flex-1 border-slate-700 text-slate-600"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      )}
                      {emp.email ? (
                        <Button
                          size="sm"
                          className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                          asChild
                        >
                          <a href={`mailto:${emp.email}`}>
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </a>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled
                          className="flex-1 bg-slate-700 text-slate-500"
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-2">
          {filteredEmployees.map((emp) => {
            const config = getDeptConfig(emp.department);
            const tenure = formatTenure(emp['start-date']);
            return (
              <Card
                key={emp.id}
                className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all group"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {emp.photo?.url ? (
                      <img
                        src={emp.photo.url}
                        alt={emp.photo.alt || emp.name}
                        className="w-12 h-12 rounded-xl object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold`}>
                        {getInitials(emp.name)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                            {emp.name}
                          </h3>
                          {emp['is-featured'] && (
                            <Star className="h-3 w-3 text-amber-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-slate-400">{emp.role}</p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Badge className={`bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/30`}>
                          <config.icon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>

                      {emp.location && (
                        <div className="text-sm text-slate-400 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {emp.location}
                        </div>
                      )}

                      <div className="flex items-center gap-2 justify-end">
                        {emp.phone && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-slate-400 hover:text-cyan-400"
                            asChild
                          >
                            <a href={`tel:${emp.phone}`}>
                              <Phone className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {emp.email && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-slate-400 hover:text-cyan-400"
                            asChild
                          >
                            <a href={`mailto:${emp.email}`}>
                              <Mail className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* No Results */}
      {filteredEmployees.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No employees found</h3>
            <p className="text-slate-400 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              variant="outline"
              onClick={() => { setSearchTerm(''); setSelectedDept('All'); }}
              className="border-slate-600 text-slate-300"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
