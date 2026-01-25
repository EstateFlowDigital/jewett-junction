import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, Search, Phone, Mail, Building, MapPin, Filter } from 'lucide-react';
import { Button } from '../ui/button';

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
}

interface DirectoryContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  employees?: CMSEmployee[];
}

const deptColors: Record<string, string> = {
  Safety: 'green',
  'Human Resources': 'purple',
  HR: 'purple',
  Operations: 'blue',
  'Information Technology': 'indigo',
  IT: 'indigo',
  Finance: 'amber',
  Marketing: 'pink',
  Engineering: 'cyan',
  Commercial: 'orange',
  Admin: 'slate',
};

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export function DirectoryContent({ theme = 'modern', employees: cmsEmployees = [] }: DirectoryContentProps) {
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDept, setSelectedDept] = React.useState('All Departments');

  // Transform CMS employees to display format, fallback to sample data if empty
  const allEmployees = cmsEmployees.length > 0
    ? cmsEmployees.map(e => ({
        name: e.name,
        role: e.role,
        dept: e.department,
        location: 'Columbus', // Default location
        initials: getInitials(e.name),
        color: deptColors[e.department] || 'blue',
        email: e.email,
        phone: e.phone,
        photo: e.photo?.url,
      }))
    : [
        { name: 'James Mitchell', role: 'Director of Safety', dept: 'Safety', location: 'Denver', initials: 'JM', color: 'green' },
        { name: 'Jennifer Davis', role: 'HR Manager', dept: 'Human Resources', location: 'Denver', initials: 'JD', color: 'purple' },
        { name: 'Mike Thompson', role: 'Project Manager', dept: 'Operations', location: 'Boulder', initials: 'MT', color: 'blue' },
        { name: 'Sarah Chen', role: 'IT Manager', dept: 'Information Technology', location: 'Denver', initials: 'SC', color: 'indigo' },
        { name: 'Robert Johnson', role: 'CFO', dept: 'Finance', location: 'Denver', initials: 'RJ', color: 'amber' },
        { name: 'Lisa Wang', role: 'Marketing Director', dept: 'Marketing', location: 'Denver', initials: 'LW', color: 'pink' },
      ];

  // Get unique departments for filter
  const departments = ['All Departments', ...new Set(allEmployees.map(e => e.dept))];

  // Filter employees based on search and department
  const employees = allEmployees.filter(emp => {
    const matchesSearch = searchTerm === '' ||
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.dept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All Departments' || emp.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
          <Users className="h-7 w-7 text-cyan-600" />
          Employee Directory
        </h1>
        <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
          Find and connect with your colleagues
        </p>
      </div>

      {/* Search */}
      <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`} />
              <input
                type="text"
                placeholder="Search by name, role, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-md text-sm ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-400' : ''}`}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className={`px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-slate-700 border-slate-600 text-white' : ''}`}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((emp) => (
          <Card key={emp.name} className={`transition-all hover:shadow-lg cursor-pointer ${isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'hover:border-slate-300'}`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 bg-${emp.color}-${isDark ? '900' : '100'} rounded-full flex items-center justify-center text-${emp.color}-${isDark ? '400' : '600'} font-bold text-lg shrink-0`}>
                  {emp.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate ${isDark ? 'text-white' : ''}`}>{emp.name}</h3>
                  <p className={`text-sm truncate ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{emp.role}</p>
                  <div className={`flex items-center gap-3 mt-2 text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>
                    <span className="flex items-center gap-1"><Building className="h-3 w-3" /> {emp.dept}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {emp.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {emp.phone ? (
                  <a href={`tel:${emp.phone}`} className="flex-1">
                    <Button size="sm" variant="outline" className={`w-full ${isDark ? 'border-slate-600' : ''}`}>
                      <Phone className="h-4 w-4 mr-1" /> Call
                    </Button>
                  </a>
                ) : (
                  <Button size="sm" variant="outline" disabled className={`flex-1 ${isDark ? 'border-slate-600' : ''}`}>
                    <Phone className="h-4 w-4 mr-1" /> Call
                  </Button>
                )}
                {emp.email ? (
                  <a href={`mailto:${emp.email}`} className="flex-1">
                    <Button size="sm" variant="outline" className={`w-full ${isDark ? 'border-slate-600' : ''}`}>
                      <Mail className="h-4 w-4 mr-1" /> Email
                    </Button>
                  </a>
                ) : (
                  <Button size="sm" variant="outline" disabled className={`flex-1 ${isDark ? 'border-slate-600' : ''}`}>
                    <Mail className="h-4 w-4 mr-1" /> Email
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Employees', value: allEmployees.length.toString() },
          { label: 'Departments', value: [...new Set(allEmployees.map(e => e.dept))].length.toString() },
          { label: 'Locations', value: [...new Set(allEmployees.map(e => e.location))].length.toString() },
          { label: 'Showing', value: employees.length.toString() },
        ].map((stat) => (
          <Card key={stat.label} className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardContent className="pt-6 text-center">
              <div className={`text-3xl font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>{stat.value}</div>
              <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
