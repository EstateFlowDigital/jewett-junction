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

interface DirectoryContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  employees?: CMSEmployee[];
}

const departmentConfig: Record<string, { color: string; gradient: string; icon: any; label: string }> = {
  'safety': { color: 'orange', gradient: 'from-orange-500 to-red-500', icon: Shield, label: 'Safety' },
  'human resources': { color: 'purple', gradient: 'from-purple-500 to-violet-500', icon: Heart, label: 'Human Resources' },
  'hr': { color: 'purple', gradient: 'from-purple-500 to-violet-500', icon: Heart, label: 'HR' },
  'operations': { color: 'blue', gradient: 'from-blue-500 to-cyan-500', icon: HardHat, label: 'Operations' },
  'information technology': { color: 'indigo', gradient: 'from-indigo-500 to-blue-500', icon: Laptop, label: 'IT' },
  'it': { color: 'indigo', gradient: 'from-indigo-500 to-blue-500', icon: Laptop, label: 'IT' },
  'finance': { color: 'amber', gradient: 'from-amber-500 to-yellow-500', icon: Calculator, label: 'Finance' },
  'marketing': { color: 'pink', gradient: 'from-pink-500 to-rose-500', icon: Megaphone, label: 'Marketing' },
  'engineering': { color: 'cyan', gradient: 'from-cyan-500 to-teal-500', icon: Building, label: 'Engineering' },
  'commercial': { color: 'emerald', gradient: 'from-emerald-500 to-green-500', icon: Briefcase, label: 'Commercial' },
  'admin': { color: 'slate', gradient: 'from-slate-500 to-slate-600', icon: Users, label: 'Admin' },
  'executive': { color: 'gold', gradient: 'from-amber-400 to-orange-500', icon: Star, label: 'Executive' },
  'default': { color: 'slate', gradient: 'from-slate-500 to-slate-600', icon: Users, label: 'Team' },
};

function getDeptConfig(dept: string | undefined) {
  if (!dept) return departmentConfig['default'];
  const normalized = dept.toLowerCase();
  return departmentConfig[normalized] || departmentConfig['default'];
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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

// Sample employees when CMS is not connected
const sampleEmployees: CMSEmployee[] = [
  { id: '1', name: 'James Mitchell', role: 'Director of Safety', department: 'Safety', location: 'Columbus, OH', email: 'j.mitchell@jewett.com', phone: '(555) 123-4567', 'is-featured': true, 'start-date': '2015-03-15' },
  { id: '2', name: 'Jennifer Davis', role: 'HR Manager', department: 'Human Resources', location: 'Columbus, OH', email: 'j.davis@jewett.com', phone: '(555) 234-5678', 'is-featured': true, 'start-date': '2017-06-01' },
  { id: '3', name: 'Mike Thompson', role: 'Project Manager', department: 'Operations', location: 'Cleveland, OH', email: 'm.thompson@jewett.com', phone: '(555) 345-6789', 'start-date': '2018-09-20' },
  { id: '4', name: 'Sarah Chen', role: 'IT Manager', department: 'Information Technology', location: 'Columbus, OH', email: 's.chen@jewett.com', phone: '(555) 456-7890', 'is-featured': true, 'start-date': '2019-01-15' },
  { id: '5', name: 'Robert Johnson', role: 'CFO', department: 'Finance', location: 'Columbus, OH', email: 'r.johnson@jewett.com', phone: '(555) 567-8901', 'is-featured': true, 'start-date': '2012-04-10' },
  { id: '6', name: 'Lisa Wang', role: 'Marketing Director', department: 'Marketing', location: 'Columbus, OH', email: 'l.wang@jewett.com', phone: '(555) 678-9012', 'start-date': '2020-02-28' },
  { id: '7', name: 'David Martinez', role: 'Site Superintendent', department: 'Operations', location: 'Cincinnati, OH', email: 'd.martinez@jewett.com', phone: '(555) 789-0123', 'start-date': '2016-11-01' },
  { id: '8', name: 'Amanda Brooks', role: 'Project Engineer', department: 'Engineering', location: 'Cleveland, OH', email: 'a.brooks@jewett.com', 'start-date': '2021-08-15' },
  { id: '9', name: 'Marcus Rodriguez', role: 'Safety Coordinator', department: 'Safety', location: 'Columbus, OH', email: 'm.rodriguez@jewett.com', phone: '(555) 890-1234', 'start-date': '2019-05-20' },
  { id: '10', name: 'Emily Watson', role: 'HR Specialist', department: 'Human Resources', location: 'Columbus, OH', email: 'e.watson@jewett.com', 'start-date': '2022-03-01' },
];

export function DirectoryContent({ theme = 'dark', employees: cmsEmployees = [] }: DirectoryContentProps) {
  const allEmployees = cmsEmployees.length > 0 ? cmsEmployees : sampleEmployees;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDept, setSelectedDept] = React.useState('All');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  // Get unique departments for filter
  const departments = ['All', ...new Set(allEmployees.map(e => getDeptConfig(e.department).label))];

  // Get featured employees
  const featuredEmployees = allEmployees.filter(e => e['is-featured']);

  // Filter employees based on search and department
  const filteredEmployees = allEmployees.filter(emp => {
    const matchesSearch = searchTerm === '' ||
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.location?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const empDeptLabel = getDeptConfig(emp.department).label;
    const matchesDept = selectedDept === 'All' || empDeptLabel === selectedDept;
    return matchesSearch && matchesDept;
  });

  // Get unique locations
  const locations = [...new Set(allEmployees.map(e => e.location || 'Unknown'))];

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

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Total Employees', value: allEmployees.length, icon: Users },
              { label: 'Departments', value: Object.keys(deptCounts).length, icon: Building },
              { label: 'Locations', value: locations.length, icon: MapPin },
              { label: 'Key Contacts', value: featuredEmployees.length, icon: Star },
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
                    <div className="flex items-center gap-4">
                      {emp.photo?.url ? (
                        <img
                          src={emp.photo.url}
                          alt={emp.photo.alt || emp.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-slate-600"
                          loading="lazy"
                        />
                      ) : (
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                          {getInitials(emp.name)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <a href={`/jewett-junction/directory/${emp.slug || emp.id}`} className="block">
                          <h3 className="font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                            {emp.name}
                          </h3>
                        </a>
                        <p className="text-sm text-slate-400 truncate">{emp.role}</p>
                        <Badge className={`mt-1 bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/30 text-xs`}>
                          {config.label}
                        </Badge>
                      </div>
                    </div>
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
                placeholder="Search by name, role, department, or location..."
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
                        <div className="w-16 h-16 rounded-xl bg-slate-700 border-4 border-slate-800 shadow-lg flex items-center justify-center text-white font-bold text-xl">
                          {getInitials(emp.name)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-10 px-4 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <a href={`/jewett-junction/directory/${emp.slug || emp.id}`} className="block">
                          <h3 className="font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">
                            {emp.name}
                          </h3>
                        </a>
                        <p className="text-sm text-slate-400 truncate">{emp.role}</p>
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
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white font-bold`}>
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
                        <p className="text-sm text-slate-400 truncate">{emp.role}</p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Badge className={`bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/30`}>
                          <config.icon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>

                      <div className="text-sm text-slate-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {emp.location || 'Unknown'}
                      </div>

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

      {/* Need Help CTA */}
      <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 border-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2aDZ2Nmg2di02aC02di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <CardContent className="py-8 px-6 md:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Can't Find Who You're Looking For?
                </h2>
                <p className="text-cyan-100">
                  Contact HR and we'll help you connect with the right person.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white text-cyan-700 hover:bg-cyan-50 flex-shrink-0"
              asChild
            >
              <a href="mailto:hr@jewett.com">
                Contact HR
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
