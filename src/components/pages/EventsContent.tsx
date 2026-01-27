import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Filter,
  Video,
  CalendarDays,
  Bell,
  ExternalLink,
  Search,
  ChevronDown,
  ChevronLeft,
  Star,
  Sparkles,
  PartyPopper,
  GraduationCap,
  Megaphone,
  Shield,
  Heart,
  X,
  Download
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  getGoogleCalendarUrl,
  getOutlookCalendarUrl,
  downloadICSFile,
  type CalendarEvent
} from '../../lib/calendar-utils';

interface CMSEvent {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  'event-date': string;
  'end-date'?: string;
  location?: string;
  category?: string;
  'registration-link'?: string;
  'banner-image'?: string;
  'virtual-link'?: string;
  'is-mandatory'?: boolean;
  'is-virtual'?: boolean;
  capacity?: number;
}

interface EventsContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  events?: CMSEvent[];
}

const categoryConfig: Record<string, { color: string; gradient: string; icon: any; label: string }> = {
  'all-hands': { color: 'blue', gradient: 'from-blue-500 to-cyan-500', icon: Megaphone, label: 'All-Hands Meeting' },
  'all-hands-meeting': { color: 'blue', gradient: 'from-blue-500 to-cyan-500', icon: Megaphone, label: 'All-Hands Meeting' },
  'training': { color: 'emerald', gradient: 'from-emerald-500 to-teal-500', icon: GraduationCap, label: 'Training' },
  'hr-session': { color: 'violet', gradient: 'from-violet-500 to-purple-500', icon: Heart, label: 'HR Session' },
  'safety-meeting': { color: 'orange', gradient: 'from-orange-500 to-red-500', icon: Shield, label: 'Safety Meeting' },
  'safety': { color: 'orange', gradient: 'from-orange-500 to-red-500', icon: Shield, label: 'Safety' },
  'social-event': { color: 'pink', gradient: 'from-pink-500 to-rose-500', icon: PartyPopper, label: 'Social Event' },
  'social': { color: 'pink', gradient: 'from-pink-500 to-rose-500', icon: PartyPopper, label: 'Social Event' },
  'workshop': { color: 'amber', gradient: 'from-amber-500 to-orange-500', icon: Sparkles, label: 'Workshop' },
  'webinar': { color: 'cyan', gradient: 'from-cyan-500 to-blue-500', icon: Video, label: 'Webinar' },
  'holiday': { color: 'rose', gradient: 'from-rose-500 to-pink-500', icon: Star, label: 'Holiday' },
  'company': { color: 'indigo', gradient: 'from-indigo-500 to-violet-500', icon: Users, label: 'Company' },
  'default': { color: 'slate', gradient: 'from-slate-500 to-slate-600', icon: Calendar, label: 'Event' },
};

function getCategoryConfig(category: string | undefined) {
  if (!category) return categoryConfig['default'];
  const normalized = category.toLowerCase().replace(/\s+/g, '-');
  return categoryConfig[normalized] || categoryConfig['default'];
}

function formatEventDate(dateStr: string) {
  const date = new Date(dateStr);
  // Handle invalid dates
  if (isNaN(date.getTime())) {
    return {
      month: '',
      day: '',
      time: '',
      weekday: '',
      full: '',
    };
  }
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: date.getDate().toString(),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    full: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  };
}

function isToday(dateStr: string) {
  const eventDate = new Date(dateStr);
  const today = new Date();
  return eventDate.toDateString() === today.toDateString();
}

function isThisWeek(dateStr: string) {
  const eventDate = new Date(dateStr);
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  return eventDate >= today && eventDate <= nextWeek;
}

function stripHtml(html: string | undefined) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

// Sample events for when CMS is not connected
const sampleEvents: CMSEvent[] = [
  {
    id: '1',
    name: 'Q1 2025 All-Hands Meeting',
    description: 'Join us for our quarterly all-hands to review 2024 wins and discuss 2025 goals. Breakfast will be provided.',
    'event-date': new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    location: 'Main Conference Room',
    category: 'All-Hands Meeting',
    'is-mandatory': true,
  },
  {
    id: '2',
    name: 'Safety Certification Training',
    description: 'Annual safety certification renewal training. All field staff must complete this training by end of month.',
    'event-date': new Date(Date.now() + 86400000 * 5).toISOString(),
    location: 'Training Center',
    category: 'Training',
    'is-mandatory': true,
  },
  {
    id: '3',
    name: 'Team Happy Hour',
    description: 'Celebrate our successful quarter with the team! Appetizers and drinks provided.',
    'event-date': new Date(Date.now() + 86400000 * 7).toISOString(),
    location: 'The Pub Downtown',
    category: 'Social Event',
  },
  {
    id: '4',
    name: 'Benefits Q&A Session',
    description: 'HR will answer your questions about benefits enrollment and explain the new healthcare options.',
    'event-date': new Date(Date.now() + 86400000 * 10).toISOString(),
    location: 'Virtual (Teams)',
    category: 'HR Session',
    'is-virtual': true,
    'virtual-link': 'https://teams.microsoft.com/...',
  },
  {
    id: '5',
    name: 'Project Management Workshop',
    description: 'Learn best practices for project management from our senior PMs. Open to all departments.',
    'event-date': new Date(Date.now() + 86400000 * 14).toISOString(),
    location: 'Room 201',
    category: 'Workshop',
  },
];

export function EventsContent({ theme = 'dark', events: cmsEvents = [] }: EventsContentProps) {
  const allEvents = cmsEvents.length > 0 ? cmsEvents : sampleEvents;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All Events');
  const [viewMode, setViewMode] = React.useState<'list' | 'calendar'>('list');
  const [showCalendarDropdown, setShowCalendarDropdown] = React.useState(false);
  const [calendarDropdownEvent, setCalendarDropdownEvent] = React.useState<CMSEvent | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Get current month/year for calendar header
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCalendarDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Convert CMS event to calendar event
  const toCalendarEvent = (event: CMSEvent): CalendarEvent => ({
    name: event.name,
    description: event.description,
    location: event.location,
    startDate: new Date(event['event-date']),
    endDate: event['end-date'] ? new Date(event['end-date']) : undefined,
  });

  // Calendar action handlers
  const handleAddToGoogleCalendar = (event: CMSEvent) => {
    window.open(getGoogleCalendarUrl(toCalendarEvent(event)), '_blank', 'noopener,noreferrer');
    setShowCalendarDropdown(false);
  };

  const handleAddToOutlookCalendar = (event: CMSEvent) => {
    window.open(getOutlookCalendarUrl(toCalendarEvent(event)), '_blank', 'noopener,noreferrer');
    setShowCalendarDropdown(false);
  };

  const handleDownloadICS = (event: CMSEvent) => {
    downloadICSFile(toCalendarEvent(event));
    setShowCalendarDropdown(false);
  };

  const openCalendarDropdown = (event: CMSEvent) => {
    setCalendarDropdownEvent(event);
    setShowCalendarDropdown(true);
  };

  // Get unique categories
  const categories = ['All Events', ...new Set(allEvents.map(e => {
    const config = getCategoryConfig(e.category);
    return config.label;
  }))];

  // Filter events
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = searchTerm === '' ||
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.location?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (event.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const config = getCategoryConfig(event.category);
    const matchesCategory = selectedCategory === 'All Events' || config.label === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) =>
    new Date(a['event-date']).getTime() - new Date(b['event-date']).getTime()
  );

  // Get featured/upcoming events for hero
  const upcomingEvents = sortedEvents.slice(0, 3);
  const featuredEvent = upcomingEvents[0];

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);

  const getEventsForDay = (day: number) => {
    return sortedEvents.filter(event => {
      const eventDate = new Date(event['event-date']);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentMonth.getMonth() &&
             eventDate.getFullYear() === currentMonth.getFullYear();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2aDZ2Nmg2di02aC02di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - intro */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <CalendarDays className="h-3 w-3 mr-1" />
                {sortedEvents.length} Upcoming Events
              </Badge>
              {sortedEvents.some(e => e['is-mandatory']) && (
                <Badge className="bg-amber-500/30 text-amber-100 border-amber-400/30">
                  <Bell className="h-3 w-3 mr-1" />
                  Mandatory Events
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Company Events<br />&amp; Gatherings
            </h1>
            <p className="text-lg text-purple-100 mb-6 max-w-xl">
              Stay connected with meetings, trainings, team celebrations, and important company-wide events.
              Never miss what's happening at Jewett.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-white text-indigo-700 hover:bg-indigo-50"
                onClick={() => document.getElementById('events-list')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View All Events
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <div className="relative" ref={dropdownRef}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => featuredEvent && openCalendarDropdown(featuredEvent)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Add to Calendar
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>

                {/* Calendar Dropdown */}
                {showCalendarDropdown && calendarDropdownEvent && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="p-3 border-b border-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Add to Calendar</span>
                        <button
                          onClick={() => setShowCalendarDropdown(false)}
                          className="p-1 hover:bg-slate-700 rounded"
                        >
                          <X className="h-4 w-4 text-slate-400" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 truncate">{calendarDropdownEvent.name}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => handleAddToGoogleCalendar(calendarDropdownEvent)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 22c5.421 0 10-4.579 10-10S17.421 2 12 2 2 6.579 2 12s4.579 10 10 10zm0-18c4.337 0 8 3.663 8 8s-3.663 8-8 8-8-3.663-8-8 3.663-8 8-8z"/>
                          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>
                        Google Calendar
                      </button>
                      <button
                        onClick={() => handleAddToOutlookCalendar(calendarDropdownEvent)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21.5 2H2.5C1.67 2 1 2.67 1 3.5v17c0 .83.67 1.5 1.5 1.5h19c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5zM8 19H4V8h4v11zm6 0h-4V8h4v11zm6 0h-4V8h4v11z"/>
                        </svg>
                        Outlook Calendar
                      </button>
                      <button
                        onClick={() => handleDownloadICS(calendarDropdownEvent)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Download className="h-5 w-5" />
                        Download .ics File
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - featured event */}
          {featuredEvent && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  <Star className="h-3 w-3 mr-1" />
                  Next Up
                </Badge>
                {featuredEvent['is-mandatory'] && (
                  <Badge className="bg-amber-500/30 text-amber-100 border-amber-400/30">
                    Required
                  </Badge>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{featuredEvent.name}</h3>

              {featuredEvent.description && (
                <p className="text-purple-100 text-sm mb-4 line-clamp-2">{stripHtml(featuredEvent.description)}</p>
              )}

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-3 text-white/90">
                  <Calendar className="h-4 w-4 text-purple-200" />
                  <span className="text-sm">{formatEventDate(featuredEvent['event-date']).full}</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Clock className="h-4 w-4 text-purple-200" />
                  <span className="text-sm">{formatEventDate(featuredEvent['event-date']).time}</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  {featuredEvent['is-virtual'] ? (
                    <Video className="h-4 w-4 text-purple-200" />
                  ) : (
                    <MapPin className="h-4 w-4 text-purple-200" />
                  )}
                  <span className="text-sm">{featuredEvent.location || 'TBD'}</span>
                </div>
              </div>

              {(featuredEvent['registration-link'] || featuredEvent['virtual-link']) && (
                <Button
                  className="w-full bg-white text-indigo-700 hover:bg-indigo-50"
                  asChild
                >
                  <a href={featuredEvent['registration-link'] || featuredEvent['virtual-link']} target="_blank" rel="noopener noreferrer">
                    {featuredEvent['is-virtual'] ? 'Join Meeting' : 'Register Now'}
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'This Week', count: sortedEvents.filter(e => isThisWeek(e['event-date'])).length, icon: Calendar, color: 'blue' },
          { label: 'Mandatory', count: sortedEvents.filter(e => e['is-mandatory']).length, icon: Bell, color: 'amber' },
          { label: 'Virtual', count: sortedEvents.filter(e => e['is-virtual']).length, icon: Video, color: 'cyan' },
          { label: 'Training', count: sortedEvents.filter(e => getCategoryConfig(e.category).label === 'Training').length, icon: GraduationCap, color: 'emerald' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.count}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card id="events-list" className="bg-slate-800/50 border-slate-700 scroll-mt-8">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border rounded-xl text-sm bg-slate-900/50 border-slate-600 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/50 rounded-xl p-1 border border-slate-600" role="tablist" aria-label="View mode">
              <button
                onClick={() => setViewMode('list')}
                role="tab"
                aria-selected={viewMode === 'list'}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                  viewMode === 'list' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                role="tab"
                aria-selected={viewMode === 'calendar'}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                  viewMode === 'calendar' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Calendar
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Display */}
      {viewMode === 'list' ? (
        /* List View */
        <div className="space-y-4">
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => {
              const config = getCategoryConfig(event.category);
              const dateInfo = formatEventDate(event['event-date']);
              const IconComponent = config.icon;

              return (
                <Card
                  key={event.id}
                  className="bg-slate-800/50 border-slate-700 hover:border-indigo-500/50 transition-all group"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Date Column */}
                      <div className={`md:w-28 flex-shrink-0 p-4 md:p-6 bg-gradient-to-br ${config.gradient} md:rounded-l-lg flex flex-row md:flex-col items-center justify-center gap-2 md:gap-1`}>
                        <span className="text-sm font-medium text-white/80">{dateInfo.weekday}</span>
                        <span className="text-3xl md:text-4xl font-bold text-white">{dateInfo.day}</span>
                        <span className="text-sm font-medium text-white/80">{dateInfo.month}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 md:p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className={`bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/30`}>
                              <IconComponent className="h-3 w-3 mr-1" />
                              {config.label}
                            </Badge>
                            {event['is-mandatory'] && (
                              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                                Required
                              </Badge>
                            )}
                            {event['is-virtual'] && (
                              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                                <Video className="h-3 w-3 mr-1" />
                                Virtual
                              </Badge>
                            )}
                            {isToday(event['event-date']) && (
                              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 animate-pulse">
                                Today
                              </Badge>
                            )}
                          </div>
                        </div>

                        <a href={`/jewett-junction/events/${event.slug || event.id}`} className="block">
                          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                            {event.name}
                          </h3>
                        </a>

                        {event.description && (
                          <p className="text-sm text-slate-400 mb-4 line-clamp-2">{stripHtml(event.description)}</p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {dateInfo.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            {event['is-virtual'] ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                            {event.location || 'TBD'}
                          </span>
                          {event.capacity && (
                            <span className="flex items-center gap-1.5">
                              <Users className="h-4 w-4" />
                              {event.capacity} spots
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex items-center p-4 md:p-6 md:pl-0">
                        <div className="flex items-center gap-2">
                          {(event['registration-link'] || event['virtual-link']) && (
                            <Button
                              className="bg-indigo-600 hover:bg-indigo-700"
                              asChild
                            >
                              <a href={event['registration-link'] || event['virtual-link']} target="_blank" rel="noopener noreferrer">
                                {event['is-virtual'] ? 'Join' : 'Register'}
                                <ExternalLink className="h-4 w-4 ml-2" />
                              </a>
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            asChild
                          >
                            <a href={`/jewett-junction/events/${event.slug || event.id}`}>
                              Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No events found</h3>
                <p className="text-slate-400 mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  variant="outline"
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All Events'); }}
                  className="border-slate-600 text-slate-300"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        /* Calendar View */
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date())}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-slate-400 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before the first of the month */}
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} className="h-24 p-1"></div>
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDay(day);
                const isCurrentDay = new Date().getDate() === day &&
                                     new Date().getMonth() === currentMonth.getMonth() &&
                                     new Date().getFullYear() === currentMonth.getFullYear();

                return (
                  <div
                    key={day}
                    className={`h-24 p-1 rounded-lg border transition-colors ${
                      isCurrentDay
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : dayEvents.length > 0
                        ? 'border-slate-600 bg-slate-700/30 hover:bg-slate-700/50'
                        : 'border-slate-700/50 hover:bg-slate-700/30'
                    }`}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isCurrentDay ? 'text-indigo-400' : 'text-slate-300'
                    }`}>
                      {day}
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      {dayEvents.slice(0, 2).map((event) => {
                        const config = getCategoryConfig(event.category);
                        return (
                          <div
                            key={event.id}
                            className={`text-xs px-1.5 py-0.5 rounded bg-${config.color}-500/20 text-${config.color}-400 truncate`}
                            title={event.name}
                          >
                            {event.name}
                          </div>
                        );
                      })}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-slate-500 pl-1">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Legend */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-base">Event Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {Object.entries(categoryConfig)
              .filter(([key]) => key !== 'default')
              .slice(0, 8)
              .map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(config.label)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                    selectedCategory === config.label
                      ? `bg-${config.color}-500/20 border-${config.color}-500/50 text-${config.color}-400`
                      : 'border-slate-600 text-slate-400 hover:bg-slate-700/50'
                  }`}
                >
                  <config.icon className="h-4 w-4" />
                  <span className="text-sm">{config.label}</span>
                </button>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Subscribe CTA */}
      <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2aDZ2Nmg2di02aC02di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <CardContent className="py-8 px-6 md:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Never Miss an Event
                </h2>
                <p className="text-purple-100">
                  Subscribe to get event reminders and updates delivered to your calendar.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white text-indigo-700 hover:bg-indigo-50 flex-shrink-0"
              onClick={() => {
                // Generate and download a combined ICS file with all upcoming events
                const allEventsICS = sortedEvents.slice(0, 10).map(e => ({
                  name: e.name,
                  description: e.description,
                  location: e.location,
                  startDate: new Date(e['event-date']),
                  endDate: e['end-date'] ? new Date(e['end-date']) : undefined,
                }));
                if (allEventsICS.length > 0) {
                  downloadICSFile(allEventsICS[0]);
                  // Show a notification or alert
                  alert(`Calendar file downloaded with upcoming events. Import this file into your calendar app to stay updated.`);
                }
              }}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Subscribe to Calendar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
