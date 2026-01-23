import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Lightbulb,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target,
  TrendingUp,
  Shield,
  Users,
  Wrench,
  DollarSign
} from 'lucide-react';

interface IdeaSubmissionContentProps {
  theme?: 'dark';
  notificationEmail?: string;
}

const categories = [
  { id: 'process', label: 'Process Improvement', icon: Wrench, description: 'Make existing workflows more efficient' },
  { id: 'safety', label: 'Safety Enhancement', icon: Shield, description: 'Improve workplace safety' },
  { id: 'cost', label: 'Cost Savings', icon: DollarSign, description: 'Reduce expenses or increase efficiency' },
  { id: 'culture', label: 'Team & Culture', icon: Users, description: 'Enhance workplace culture' },
  { id: 'innovation', label: 'New Initiative', icon: Sparkles, description: 'Propose something new' },
  { id: 'other', label: 'Other', icon: Lightbulb, description: 'Something else entirely' },
];

const impactLevels = [
  { id: 'low', label: 'Nice to Have', description: 'Would improve things slightly' },
  { id: 'medium', label: 'Moderate Impact', description: 'Would make a noticeable difference' },
  { id: 'high', label: 'High Impact', description: 'Could significantly improve operations' },
  { id: 'critical', label: 'Game Changer', description: 'Could transform how we work' },
];

export function IdeaSubmissionContent({ theme = 'dark', notificationEmail }: IdeaSubmissionContentProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    department: '',
    title: '',
    category: '',
    impact: '',
    description: '',
    benefits: '',
    resources: '',
  });
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setFormData(prev => ({ ...prev, category: categoryId }));
  };

  const handleImpactSelect = (impactId: string) => {
    setFormData(prev => ({ ...prev, impact: impactId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.title || !formData.category || !formData.description) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      // Submit to API endpoint
      const response = await fetch('/api/submit-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          notificationEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit idea');
      }

      setStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        department: '',
        title: '',
        category: '',
        impact: '',
        description: '',
        benefits: '',
        resources: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage('There was an error submitting your idea. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-emerald-900/30 border-emerald-700">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Idea Submitted!</h2>
            <p className="text-slate-300 mb-6">
              Thank you for sharing your idea. Our team will review it and get back to you soon.
            </p>
            <Button
              onClick={() => setStatus('idle')}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Submit Another Idea
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2aDZ2Nmg2di02aC02di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-white/20 text-white border-white/30">
              <Lightbulb className="h-3 w-3 mr-1" />
              Innovation Hub
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Share Your Ideas
          </h1>
          <p className="text-lg text-amber-100 max-w-2xl">
            Great ideas can come from anywhere. Share your thoughts on how we can improve processes,
            enhance safety, save costs, or make Jewett an even better place to work.
          </p>
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-rose-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Target className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">All Ideas Welcome</h3>
              <p className="text-sm text-slate-400">Big or small, every idea has potential impact.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Quick Review</h3>
              <p className="text-sm text-slate-400">Our team reviews submissions weekly.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Recognition</h3>
              <p className="text-sm text-slate-400">Great ideas get recognized and rewarded.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            Submit Your Idea
          </CardTitle>
          <CardDescription className="text-slate-400">
            Fill out the form below to share your idea with us.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                  placeholder="john.smith@jewett.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
              >
                <option value="">Select your department</option>
                <option value="operations">Operations</option>
                <option value="safety">Safety</option>
                <option value="engineering">Engineering</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
                <option value="admin">Administration</option>
                <option value="field">Field Operations</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Idea Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Idea Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                placeholder="Give your idea a short, descriptive title"
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Category <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.category === cat.id
                        ? 'bg-amber-500/20 border-amber-500 ring-1 ring-amber-500'
                        : 'bg-slate-900/50 border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <cat.icon className={`h-5 w-5 mb-2 ${formData.category === cat.id ? 'text-amber-400' : 'text-slate-400'}`} />
                    <div className={`font-medium text-sm ${formData.category === cat.id ? 'text-white' : 'text-slate-300'}`}>
                      {cat.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{cat.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Impact Level */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Expected Impact
              </label>
              <div className="flex flex-wrap gap-2">
                {impactLevels.map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => handleImpactSelect(level.id)}
                    className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                      formData.impact === level.id
                        ? 'bg-amber-500/20 border-amber-500 text-white'
                        : 'bg-slate-900/50 border-slate-600 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Describe Your Idea <span className="text-rose-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors resize-none"
                placeholder="Explain your idea in detail. What problem does it solve? How would it work?"
              />
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Expected Benefits
              </label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors resize-none"
                placeholder="What benefits would this bring? Cost savings, time savings, improved safety, etc."
              />
            </div>

            {/* Resources Needed */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Resources Needed
              </label>
              <textarea
                name="resources"
                value={formData.resources}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors resize-none"
                placeholder="What would be needed to implement this idea? (optional)"
              />
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-rose-500/20 border border-rose-500/50">
                <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <p className="text-rose-300 text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3"
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
                    Submit Idea
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
