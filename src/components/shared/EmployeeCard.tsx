import * as React from 'react';
import { Card, CardContent } from '../ui/card';
import {
  Users,
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

/**
 * One employee's Directory card — photo, name, role, department, location,
 * tenure, and Call / Email buttons. Extracted from the Directory so other
 * pages (the Finance team section) show the identical box rather than a copy
 * that drifts. Department colours and labels live here with it.
 */

export interface CMSEmployee {
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
  /** Other departments this person is also listed under, comma-separated ("HR"). */
  'additional-departments'?: string;
  location?: string;
  office?: string;
}

export const departmentConfig: Record<string, { color: string; gradient: string; icon: any; label: string }> = {
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

export function getDeptConfig(dept: string | undefined) {
  if (!dept) return departmentConfig['default'];
  const normalized = dept.toLowerCase();
  return departmentConfig[normalized] || departmentConfig['default'];
}

/**
 * Every department label a person is listed under in the Directory: their
 * main department first, then any from "Also List Under" (e.g. Payroll sits
 * in Finance and HR). Unknown names are dropped rather than shown as "Team".
 */
export function getEmployeeDeptLabels(emp: Pick<CMSEmployee, 'department' | 'additional-departments'>): string[] {
  const labels = [getDeptConfig(emp.department).label];
  for (const raw of (emp['additional-departments'] || '').split(',')) {
    const name = raw.trim();
    if (!name) continue;
    const config = getDeptConfig(name);
    if (config === departmentConfig['default']) continue;
    if (!labels.includes(config.label)) labels.push(config.label);
  }
  return labels;
}

export function getInitials(name: string) {
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

export function formatTenure(startDate: string | undefined) {
  if (!startDate) return null;
  const start = new Date(startDate);
  // Handle invalid dates
  if (isNaN(start.getTime())) return null;
  const now = new Date();
  const years = Math.floor((now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  if (years < 1) return 'New hire';
  return `${years} year${years > 1 ? 's' : ''}`;
}

export function EmployeeCard({ emp }: { emp: CMSEmployee }) {
  const config = getDeptConfig(emp.department);
  const tenure = formatTenure(emp['start-date']);
  return (
    <Card
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
}
