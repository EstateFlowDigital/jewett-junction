import * as React from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Award,
  Star,
  ChevronRight,
  Edit,
  Camera,
  Shield,
  Trophy,
  Zap
} from 'lucide-react';
import { BadgeStrip } from '../gamification/BadgeCollection';

// Identity is keyed off a localStorage email — set in /settings.
// We look that email up in the Employees CMS collection and render the real
// record. If nothing is set, render a clear empty state pointing at /settings.
const PROFILE_EMAIL_KEY = 'jewett_profile_email';

interface EmployeeRecord {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  department?: string;
  'team-department'?: string;
  'office-location'?: string;
  bio?: string;
  skills?: string;
  certifications?: string;
  'start-date'?: string;
  photo?: { url: string };
}

const defaultGamification = {
  points: 0,
  level: 1,
  earnedBadges: [] as string[],
  streak: 0,
};

export function ProfileContent() {
  const [profile, setProfile] = React.useState<EmployeeRecord | null>(null);
  const [profileEmail, setProfileEmail] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const email = (typeof window !== 'undefined' && window.localStorage.getItem(PROFILE_EMAIL_KEY)) || '';
    setProfileEmail(email);
    if (!email) {
      setIsLoading(false);
      return;
    }
    fetch('/jewett-junction/api/cms/employees?limit=200')
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data) => {
        const match = (data.items || []).find(
          (e: EmployeeRecord) => (e.email || '').toLowerCase() === email.toLowerCase(),
        );
        setProfile(match || null);
      })
      .catch(() => setProfile(null))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="glass rounded-2xl border border-slate-800/50 p-12 text-center">
        <User className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-pulse" aria-hidden="true" />
        <p className="text-slate-400">Loading profile…</p>
      </div>
    );
  }

  if (!profileEmail || !profile) {
    return (
      <div className="glass rounded-2xl border border-slate-800/50 p-10 text-center max-w-xl mx-auto">
        <User className="w-12 h-12 text-slate-500 mx-auto mb-4" aria-hidden="true" />
        <h2 className="text-xl font-bold text-white mb-2">Profile not connected</h2>
        <p className="text-slate-400 mb-5">
          {profileEmail
            ? `No employee record matches "${profileEmail}". Update your work email in Settings or ask HR to add you to the directory.`
            : 'Set your work email in Settings to load your profile from the company directory.'}
        </p>
        <a
          href="/jewett-junction/settings"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
        >
          <ChevronRight className="w-4 h-4" /> Open Settings
        </a>
      </div>
    );
  }

  const user = {
    name: profile.name || 'Employee',
    email: profile.email || profileEmail,
    phone: profile.phone || '',
    department: profile['team-department'] || profile.department || '',
    role: profile.role || '',
    location: profile['office-location'] || '',
    startDate: profile['start-date'] || '',
    bio: profile.bio || '',
    skills: (profile.skills || '').split(',').map((s) => s.trim()).filter(Boolean),
    certifications: (profile.certifications || '').split(',').map((s) => s.trim()).filter(Boolean),
    photo: profile.photo?.url || '',
    ...defaultGamification,
  };
  const yearsAtCompany = user.startDate
    ? Math.floor((new Date().getTime() - new Date(user.startDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : 0;
  const mockUser = user; // keep downstream JSX referencing `mockUser` working

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <User className="w-7 h-7 text-slate-400" aria-hidden="true" />
            My Profile
          </h1>
          <p className="text-slate-400">View and manage your profile information</p>
        </div>
        <a
          href="/jewett-junction/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" aria-hidden="true" />
          Dashboard
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="glass rounded-2xl border border-slate-800/50 overflow-hidden">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {mockUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <button
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors"
                    aria-label="Change profile photo"
                  >
                    <Camera className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">{mockUser.name}</h2>
                      <p className="text-slate-400">{mockUser.role} - {mockUser.department}</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                      <Edit className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      {mockUser.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      {yearsAtCompany}+ years
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-400" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm text-white">{mockUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl">
                  <Phone className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm text-white">{mockUser.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl">
                  <Briefcase className="w-5 h-5 text-purple-400" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-slate-500">Department</p>
                    <p className="text-sm text-white">{mockUser.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl">
                  <Calendar className="w-5 h-5 text-amber-400" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-slate-500">Start Date</p>
                    <p className="text-sm text-white">{new Date(mockUser.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="glass rounded-2xl border border-slate-800/50 overflow-hidden">
            <div className="p-5 border-b border-slate-700/50">
              <h3 className="font-semibold text-white">About</h3>
            </div>
            <div className="p-5">
              <p className="text-slate-300">{mockUser.bio}</p>
            </div>
          </div>

          {/* Skills & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl border border-slate-800/50 overflow-hidden">
              <div className="p-5 border-b border-slate-700/50">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" aria-hidden="true" />
                  Skills
                </h3>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {mockUser.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl border border-slate-800/50 overflow-hidden">
              <div className="p-5 border-b border-slate-700/50">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                  Certifications
                </h3>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {mockUser.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Points Overview */}
          <div className="glass rounded-2xl border border-slate-800/50 overflow-hidden">
            <div className="p-5 border-b border-slate-700/50">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" aria-hidden="true" />
                Points & Level
              </h3>
            </div>
            <div className="p-5">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-white mb-1">{mockUser.points.toLocaleString()}</div>
                <div className="text-sm text-slate-400">Total XP</div>
              </div>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-lg font-bold text-white">{mockUser.level}</span>
                  </div>
                  <div className="text-xs text-slate-400">Level</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Zap className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="text-xs text-slate-400">{mockUser.streak} day streak</div>
                </div>
              </div>
              <a
                href="/jewett-junction/profile/points"
                className="block w-full text-center px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl text-sm transition-colors"
              >
                View Points History
              </a>
            </div>
          </div>

          {/* Badges Preview */}
          <div className="glass rounded-2xl border border-slate-800/50 overflow-hidden">
            <div className="p-5 border-b border-slate-700/50 flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" aria-hidden="true" />
                My Badges
              </h3>
              <span className="text-sm text-slate-400">{mockUser.earnedBadges.length} earned</span>
            </div>
            <div className="p-5">
              <BadgeStrip earnedBadgeIds={mockUser.earnedBadges} maxDisplay={5} className="justify-center mb-4" />
              <a
                href="/jewett-junction/profile/badges"
                className="block w-full text-center px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl text-sm transition-colors"
              >
                View All Badges
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="glass rounded-2xl border border-slate-800/50 overflow-hidden">
            <div className="p-5 border-b border-slate-700/50">
              <h3 className="font-semibold text-white text-sm">Quick Links</h3>
            </div>
            <div className="p-3 space-y-1">
              <a
                href="/jewett-junction/settings"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 transition-colors"
              >
                <span className="text-sm text-slate-300">Settings</span>
                <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
              </a>
              <a
                href="/jewett-junction/notifications"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 transition-colors"
              >
                <span className="text-sm text-slate-300">Notifications</span>
                <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
              </a>
              <a
                href="/jewett-junction/it-helpdesk"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 transition-colors"
              >
                <span className="text-sm text-slate-300">IT Helpdesk</span>
                <ChevronRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
