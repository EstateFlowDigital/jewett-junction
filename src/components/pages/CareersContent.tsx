import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  Briefcase,
  MapPin,
  Clock,
  Heart,
  GraduationCap,
  Users,
  Gift,
  Calendar,
  Home,
  PiggyBank,
  Shield,
  Award,
  ChevronRight,
  ExternalLink,
  Send,
  CheckCircle,
  AlertCircle,
  Upload,
  User,
  Mail,
  Phone,
  FileText
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface JobPosting {
  id: string;
  name: string;
  slug?: string;
  department?: string;
  location?: string;
  description?: string;
  requirements?: string;
  'referral-bonus'?: number;
  'apply-link'?: string;
  'employment-type'?: string;
  'is-active'?: boolean;
}

interface CareersContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  jobs?: JobPosting[];
}

const benefits = [
  {
    icon: Heart,
    title: 'Medical, Dental & Vision',
    description: 'Comprehensive coverage with multiple plan options and 4-tier coverage for you and your family.',
  },
  {
    icon: GraduationCap,
    title: 'Tuition Reimbursement',
    description: 'Up to $3,000 annually for accredited degree programs after one year of service.',
  },
  {
    icon: Users,
    title: 'Wellness Program',
    description: 'Community activities including yoga, cooking classes, book clubs, and team outings.',
  },
  {
    icon: Gift,
    title: 'Referral Program',
    description: 'Earn bonus incentives for employee referrals that result in successful hires.',
  },
  {
    icon: Calendar,
    title: 'Paid Time Off',
    description: 'Pro-rata accrual throughout the year for vacation, sick time, and personal days.',
  },
  {
    icon: Home,
    title: 'Flexible Work',
    description: 'Remote work arrangements available with eligibility standards for qualifying roles.',
  },
  {
    icon: PiggyBank,
    title: 'Retirement Planning',
    description: '100% company match on contributions up to 4% with no vesting schedule.',
  },
  {
    icon: Shield,
    title: 'Insurance Coverage',
    description: 'Company-sponsored short & long-term disability plus life insurance protection.',
  },
];

const awards = [
  { year: '2024', title: 'Best Company to Work For' },
  { year: '2023', title: 'Best Companies to Work For' },
  { year: '2023', title: 'Verified Employer Silver' },
];

// Sample jobs for when CMS is not connected
const sampleJobs: JobPosting[] = [
  { id: '1', name: 'Project Manager', department: 'Commercial', location: 'Columbus, OH', 'employment-type': 'Full-time' },
  { id: '2', name: 'Safety Coordinator', department: 'Safety', location: 'Cleveland, OH', 'employment-type': 'Full-time' },
  { id: '3', name: 'Field Engineer', department: 'Engineering', location: 'Cincinnati, OH', 'employment-type': 'Full-time' },
  { id: '4', name: 'Construction Superintendent', department: 'Operations', location: 'Columbus, OH', 'employment-type': 'Full-time' },
  { id: '5', name: 'MEP Coordinator', department: 'Engineering', location: 'Cleveland, OH', 'employment-type': 'Full-time' },
  { id: '6', name: 'Administrative Assistant', department: 'Admin', location: 'Columbus, OH', 'employment-type': 'Full-time' },
];

function ApplicationForm({ jobs }: { jobs: JobPosting[] }) {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    referralSource: '',
    coverLetter: '',
    isVeteran: false,
    resumeFileName: '',
  });
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resumeFileName: file.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.position) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Failed to submit application');

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        referralSource: '',
        coverLetter: '',
        isVeteran: false,
        resumeFileName: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage('There was an error submitting your application. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-12 text-center">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Application Submitted!</h3>
        <p className="text-slate-300 mb-6 max-w-md mx-auto">
          Thank you for your interest in joining Jewett Construction. We'll review your application and get back to you within 24 hours.
        </p>
        <Button onClick={() => setStatus('idle')} className="bg-blue-600 hover:bg-blue-700">
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <User className="h-4 w-4 inline mr-1" />
            First Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Last Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            placeholder="Smith"
          />
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <Mail className="h-4 w-4 inline mr-1" />
            Email Address <span className="text-rose-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            placeholder="john.smith@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <Phone className="h-4 w-4 inline mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      {/* Position Selection */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          <Briefcase className="h-4 w-4 inline mr-1" />
          Position of Interest <span className="text-rose-400">*</span>
        </label>
        <select
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
        >
          <option value="">Select a position</option>
          <option value="general">General Application</option>
          {jobs.map(job => (
            <option key={job.id} value={job.name}>{job.name} - {job.location || 'Remote'}</option>
          ))}
        </select>
      </div>

      {/* Experience */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Years of Experience
        </label>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
        >
          <option value="">Select experience level</option>
          <option value="0-1">0-1 years</option>
          <option value="1-3">1-3 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5-10">5-10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>

      {/* How did you hear about us */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          How did you hear about us?
        </label>
        <select
          name="referralSource"
          value={formData.referralSource}
          onChange={handleInputChange}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
        >
          <option value="">Select an option</option>
          <option value="employee">Employee Referral</option>
          <option value="linkedin">LinkedIn</option>
          <option value="indeed">Indeed</option>
          <option value="website">Company Website</option>
          <option value="career-fair">Career Fair</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Resume Upload (placeholder - shows filename) */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          <FileText className="h-4 w-4 inline mr-1" />
          Resume
        </label>
        <div className="relative">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-600 border-dashed">
            <Upload className="h-5 w-5 text-slate-400" />
            <span className="text-slate-400 text-sm">
              {formData.resumeFileName || 'Click to upload PDF or Word document'}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-1">Note: File will be attached to your application email</p>
      </div>

      {/* Cover Letter */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Cover Letter / Additional Information
        </label>
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none"
          placeholder="Tell us about yourself, your experience, and why you're interested in joining Jewett Construction..."
        />
      </div>

      {/* Veteran Status */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="isVeteran"
          checked={formData.isVeteran}
          onChange={handleInputChange}
          className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900/50 text-blue-600 focus:ring-blue-500"
        />
        <label className="text-sm text-slate-300">
          I am a veteran or currently serving in the military.
          <span className="block text-slate-500 text-xs mt-1">We proudly support and welcome military talent.</span>
        </label>
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-rose-500/20 border border-rose-500/50">
          <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
          <p className="text-rose-300 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
          size="lg"
        >
          {status === 'submitting' ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Submit Application
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export function CareersContent({ theme = 'dark', jobs }: CareersContentProps) {
  const displayJobs = jobs && jobs.length > 0 ? jobs : sampleJobs;

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2aDZ2Nmg2di02aC02di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Briefcase className="h-3 w-3 mr-1" />
              {displayJobs.length} Open Positions
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Building Careers,<br />Constructing Futures.
          </h1>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl">
            Join a team where people matter more than anything. We value diverse perspectives,
            continuous innovation, and a culture built on over 50 years of excellence.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
              <a href="#positions">
                View Open Positions
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <a href="#apply">Apply Now</a>
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Application Form Section */}
      <Card id="apply" className="bg-slate-800/50 border-slate-700 overflow-hidden scroll-mt-8">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-white flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-400" />
            Start Your Journey
          </CardTitle>
          <CardDescription className="text-slate-400">
            Complete the form below and we'll respond within 24 hours. We welcome all talent, including veterans.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ApplicationForm jobs={displayJobs} />
        </CardContent>
      </Card>

      {/* About Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <p>
              Founded with deep roots in quality craftsmanship, Jewett Construction has grown into an
              industry leader through continuous innovation and an unwavering commitment to our people.
            </p>
            <p>
              We believe that <span className="text-white font-medium">people matter more than anything</span>.
              This isn't just a slogan—it's the foundation of everything we do. From the way we train our
              teams to how we approach every project, we prioritize the growth, safety, and well-being of
              our employees.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" />
              Recognition & Awards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {awards.map((award, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg bg-slate-900/50 border border-slate-700"
                >
                  <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Award className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{award.title}</p>
                    <p className="text-sm text-slate-400">{award.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benefits Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Benefits Blueprint</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We invest in our people with a comprehensive benefits package designed to support you and your family.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit) => (
            <Card
              key={benefit.title}
              className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors"
            >
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                  <benefit.icon className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-400">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div id="positions" className="scroll-mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Open Positions</h2>
            <p className="text-slate-400">
              Find your next opportunity with us
            </p>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {displayJobs.length} Openings
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayJobs.map((job) => (
            <Card
              key={job.id}
              className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 group"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge
                    variant="outline"
                    className="border-slate-600 text-slate-300 text-xs"
                  >
                    {job.department || 'General'}
                  </Badge>
                  <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {job.name}
                </h3>
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location || 'Remote'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{job['employment-type'] || 'Full-time'}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="sm"
                    asChild
                  >
                    <a href="#apply">
                      Apply Now
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Referral Program Banner */}
      <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 border-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2aDZ2Nmg2di02aC02di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <CardContent className="py-8 px-6 md:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Employee Referral Program
                </h2>
                <p className="text-emerald-100">
                  Know someone who'd be a great fit? Earn bonus incentives for successful referrals!
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 flex-shrink-0"
              asChild
            >
              <a href="#apply">Submit a Referral</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Have Questions?</h3>
              <p className="text-slate-400">
                Our recruiting team is here to help. Reach out and we'll get back to you within 24 hours.
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <a href="mailto:careers@jewett.com">Contact Recruiting Team</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
