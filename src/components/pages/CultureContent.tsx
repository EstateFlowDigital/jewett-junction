import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  Heart,
  Award,
  Users,
  Star,
  Trophy,
  Target,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Shield,
  HandHeart,
  ThumbsUp,
  MessageCircle,
  Quote,
  Calendar,
  Clock,
  Flame,
  Gift,
  Medal,
  Zap,
  PartyPopper
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface CMSCultureStory {
  id: string;
  name: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: { url: string; alt?: string };
  'featured-image'?: { url: string; alt?: string };
  author?: string;
  'published-date'?: string;
  category?: string;
  type?: string;
  featured?: boolean;
  'person-name'?: string;
  'person-role'?: string;
  'person-tenure'?: string;
  quote?: string;
}

interface CultureContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
  stories?: CMSCultureStory[];
}

function stripHtml(html: string | undefined) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// Core values data
const coreValues = [
  {
    icon: Shield,
    name: 'Safety First',
    tagline: '4EverSafe',
    description: 'Nothing is more important than everyone going home safe. We never compromise on safety.',
    color: 'orange',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Star,
    name: 'Excellence',
    tagline: 'Quality in all we do',
    description: 'We take pride in our work and strive for excellence in every project we undertake.',
    color: 'amber',
    gradient: 'from-amber-500 to-yellow-500'
  },
  {
    icon: Users,
    name: 'Teamwork',
    tagline: 'Better together',
    description: 'Our greatest strength is our people working together toward shared goals.',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Target,
    name: 'Integrity',
    tagline: 'Do the right thing',
    description: 'We act with honesty and transparency, earning trust through our actions.',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500'
  },
];

// Sample stories when CMS is not connected
const sampleStories: CMSCultureStory[] = [
  {
    id: '1',
    name: 'Employee Spotlight: Jennifer Davis',
    type: 'Employee Spotlight',
    'person-name': 'Jennifer Davis',
    'person-role': 'Project Manager',
    'person-tenure': '8 years',
    quote: "What I love most about Jewett is the people. We're not just coworkers—we're a family that supports each other through every challenge.",
    excerpt: "Jennifer's leadership on the Downtown Office Complex project exemplifies our commitment to excellence. Her dedication to safety and quality has set a new standard for our team.",
    featured: true,
  },
  {
    id: '2',
    name: 'Team Win: Plaza Project Completion',
    type: 'Team Win',
    excerpt: 'Congratulations to the Downtown Plaza team for completing Phase 2 two weeks ahead of schedule!',
    author: 'Operations Team',
    'published-date': new Date().toISOString(),
  },
  {
    id: '3',
    name: '500 Days Without Incident',
    type: 'Recognition',
    excerpt: 'Our safety team has achieved an incredible milestone—500 consecutive days without a recordable incident. Thank you for making safety a priority every single day.',
    author: 'Safety Department',
    'published-date': new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Core Value Champion: Marcus Rodriguez',
    type: 'Recognition',
    'person-name': 'Marcus Rodriguez',
    'person-role': 'Site Superintendent',
    excerpt: 'Marcus consistently demonstrates our core value of Teamwork, mentoring new hires and fostering collaboration across departments.',
    'published-date': new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Community Service Day Success',
    type: 'Core Value',
    excerpt: 'Over 100 employees volunteered this weekend, contributing 450+ hours to local charities. Together, we raised $25,000 for Habitat for Humanity.',
    author: 'HR Team',
    'published-date': new Date().toISOString(),
  },
];

const typeConfig: Record<string, { icon: any; color: string; gradient: string; label: string }> = {
  'employee-spotlight': { icon: Star, color: 'amber', gradient: 'from-amber-500 to-orange-500', label: 'Employee Spotlight' },
  'spotlight': { icon: Star, color: 'amber', gradient: 'from-amber-500 to-orange-500', label: 'Spotlight' },
  'team-win': { icon: Trophy, color: 'emerald', gradient: 'from-emerald-500 to-teal-500', label: 'Team Win' },
  'win': { icon: Trophy, color: 'emerald', gradient: 'from-emerald-500 to-teal-500', label: 'Team Win' },
  'recognition': { icon: Award, color: 'blue', gradient: 'from-blue-500 to-indigo-500', label: 'Recognition' },
  'core-value': { icon: Heart, color: 'pink', gradient: 'from-pink-500 to-rose-500', label: 'Core Value' },
  'milestone': { icon: Medal, color: 'purple', gradient: 'from-purple-500 to-violet-500', label: 'Milestone' },
  'community': { icon: HandHeart, color: 'cyan', gradient: 'from-cyan-500 to-blue-500', label: 'Community Impact' },
  'default': { icon: Sparkles, color: 'slate', gradient: 'from-slate-500 to-slate-600', label: 'Culture Story' },
};

function getTypeConfig(type: string | undefined) {
  if (!type) return typeConfig['default'];
  const normalized = type.toLowerCase().replace(/\s+/g, '-');
  return typeConfig[normalized] || typeConfig['default'];
}

export function CultureContent({ theme = 'dark', stories: cmsStories = [] }: CultureContentProps) {
  const allStories = cmsStories.length > 0 ? cmsStories : sampleStories;
  const [activeValueIndex, setActiveValueIndex] = React.useState(0);
  const [spotlightIndex, setSpotlightIndex] = React.useState(0);

  // Filter stories by type
  const spotlightStories = allStories.filter(s =>
    s.type?.toLowerCase().includes('spotlight') || s.category?.toLowerCase().includes('spotlight')
  );
  const winStories = allStories.filter(s =>
    s.type?.toLowerCase().includes('win') || s.category?.toLowerCase().includes('win')
  );
  const recognitionStories = allStories.filter(s =>
    s.type?.toLowerCase().includes('recognition') || s.category?.toLowerCase().includes('recognition')
  );
  const otherStories = allStories.filter(s =>
    !s.type?.toLowerCase().includes('spotlight') &&
    !s.type?.toLowerCase().includes('win') &&
    !s.type?.toLowerCase().includes('recognition') &&
    !s.category?.toLowerCase().includes('spotlight') &&
    !s.category?.toLowerCase().includes('win') &&
    !s.category?.toLowerCase().includes('recognition')
  );

  // Get current spotlight
  const currentSpotlight = spotlightStories[spotlightIndex] || spotlightStories[0];

  // Get current month for spotlight badge
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Auto-rotate values
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveValueIndex((prev) => (prev + 1) % coreValues.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-rose-600 to-purple-600 p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2aDZ2Nmg2di02aC02di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Heart className="h-3 w-3 mr-1" />
              People Matter Most
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Culture &<br />Our Community
          </h1>
          <p className="text-lg text-pink-100 mb-6 max-w-2xl">
            At Jewett, we believe that our people are our greatest asset. We celebrate wins, recognize achievements,
            and build a culture where everyone can thrive.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-white text-pink-700 hover:bg-pink-50"
              onClick={() => document.getElementById('spotlight')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Meet Our Team
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Award className="h-4 w-4 mr-2" />
              Nominate a Teammate
            </Button>
          </div>
        </div>

        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-rose-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Core Values Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Our Core Values</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            These principles guide everything we do—from the projects we build to the relationships we nurture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreValues.map((value, index) => (
            <Card
              key={value.name}
              className={`bg-slate-800/50 border-slate-700 transition-all cursor-pointer ${
                activeValueIndex === index ? 'ring-2 ring-pink-500 border-pink-500/50' : 'hover:border-slate-600'
              }`}
              onClick={() => setActiveValueIndex(index)}
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <value.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{value.name}</h3>
                <p className={`text-sm text-${value.color}-400 font-medium mb-2`}>{value.tagline}</p>
                <p className="text-sm text-slate-400">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Team Spotlights', count: spotlightStories.length || 12, icon: Star, color: 'amber' },
          { label: 'Team Wins', count: winStories.length || 24, icon: Trophy, color: 'emerald' },
          { label: 'Recognitions', count: recognitionStories.length + otherStories.length || 156, icon: Award, color: 'blue' },
          { label: 'Volunteer Hours', count: '450+', icon: HandHeart, color: 'pink' },
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

      {/* Employee Spotlight Section */}
      {spotlightStories.length > 0 && (
        <Card id="spotlight" className="bg-slate-800/50 border-slate-700 overflow-hidden scroll-mt-8">
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-400" />
                  Employee Spotlight
                </CardTitle>
                <CardDescription className="text-slate-400">Celebrating our amazing team members</CardDescription>
              </div>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                {currentMonth}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {currentSpotlight && (
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Photo/Avatar Column */}
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-8 flex flex-col items-center justify-center text-center">
                  {currentSpotlight.image?.url || currentSpotlight['featured-image']?.url ? (
                    <img
                      src={currentSpotlight.image?.url || currentSpotlight['featured-image']?.url}
                      alt={currentSpotlight.image?.alt || currentSpotlight.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-xl mb-4"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold text-white border-4 border-white/30 shadow-xl mb-4">
                      {getInitials(currentSpotlight['person-name'] || currentSpotlight.name)}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-1">
                    {currentSpotlight['person-name'] || currentSpotlight.name}
                  </h3>
                  {currentSpotlight['person-role'] && (
                    <p className="text-amber-100">{currentSpotlight['person-role']}</p>
                  )}
                  {currentSpotlight['person-tenure'] && (
                    <Badge className="bg-white/20 text-white border-white/30 mt-3">
                      <Clock className="h-3 w-3 mr-1" />
                      {currentSpotlight['person-tenure']}
                    </Badge>
                  )}
                </div>

                {/* Content Column */}
                <div className="lg:col-span-2 p-8">
                  {currentSpotlight.quote && (
                    <div className="mb-6">
                      <Quote className="h-8 w-8 text-amber-500/30 mb-3" />
                      <blockquote className="text-xl text-white italic leading-relaxed">
                        "{currentSpotlight.quote}"
                      </blockquote>
                    </div>
                  )}

                  <div className="space-y-4">
                    <p className="text-slate-300">
                      {stripHtml(currentSpotlight.content) || currentSpotlight.excerpt}
                    </p>

                    {currentSpotlight.author && (
                      <p className="text-sm text-slate-500">— Nominated by {currentSpotlight.author}</p>
                    )}
                  </div>

                  {/* Navigation for multiple spotlights */}
                  {spotlightStories.length > 1 && (
                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-700">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSpotlightIndex((prev) => (prev - 1 + spotlightStories.length) % spotlightStories.length)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-slate-400">
                        {spotlightIndex + 1} of {spotlightStories.length}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSpotlightIndex((prev) => (prev + 1) % spotlightStories.length)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Stories Grid - Team Wins & Recognitions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Wins */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-emerald-400" />
              Team Wins
            </CardTitle>
            <CardDescription className="text-slate-400">Celebrating our victories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(winStories.length > 0 ? winStories : allStories.filter(s => s.type?.toLowerCase().includes('win'))).slice(0, 3).map((story) => {
              const config = getTypeConfig(story.type);
              return (
                <div
                  key={story.id}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-emerald-500/30 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0`}>
                      <config.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <a href={`/jewett-junction/culture/${story.slug || story.id}`} className="block">
                        <h4 className="font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                          {story.name}
                        </h4>
                      </a>
                      <p className="text-sm text-slate-400 line-clamp-2">
                        {stripHtml(story.content) || story.excerpt}
                      </p>
                      {story.author && (
                        <p className="text-xs text-slate-500 mt-2">— {story.author}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {winStories.length === 0 && (
              <div className="text-center py-6">
                <Trophy className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500">No team wins to display yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recognitions */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-400" />
              Recent Recognitions
            </CardTitle>
            <CardDescription className="text-slate-400">Kudos from the team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {([...recognitionStories, ...otherStories].slice(0, 3)).map((story) => {
              const config = getTypeConfig(story.type);
              return (
                <div
                  key={story.id}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-blue-500/30 transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0`}>
                      <config.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <a href={`/jewett-junction/culture/${story.slug || story.id}`} className="block">
                        <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors mb-1">
                          {story.name}
                        </h4>
                      </a>
                      <p className="text-sm text-slate-400 line-clamp-2">
                        {stripHtml(story.content) || story.excerpt}
                      </p>
                      {story.author && (
                        <p className="text-xs text-slate-500 mt-2">— {story.author}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {recognitionStories.length === 0 && otherStories.length === 0 && (
              <div className="text-center py-6">
                <Award className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500">No recognitions to display yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Community Impact Banner */}
      <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 border-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2aDZ2Nmg2di02aC02di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <CardContent className="py-8 px-6 md:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                  <HandHeart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">Community Impact</h2>
                  <p className="text-cyan-100">Making a difference together</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-3xl font-bold text-white">$125K</p>
                <p className="text-sm text-cyan-100">Donated in 2025</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-3xl font-bold text-white">450+</p>
                <p className="text-sm text-cyan-100">Volunteer Hours</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <Button size="lg" className="bg-white text-cyan-700 hover:bg-cyan-50">
                <Gift className="h-4 w-4 mr-2" />
                Get Involved
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nomination CTA */}
      <Card className="bg-gradient-to-r from-pink-600 to-rose-600 border-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2aDZ2Nmg2di02aC02di02aC02djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <CardContent className="py-8 px-6 md:px-8 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Know Someone Amazing?
                </h2>
                <p className="text-pink-100">
                  Nominate a teammate who embodies our core values. Your recognition could make their day!
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white text-pink-700 hover:bg-pink-50 flex-shrink-0"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Submit Nomination
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
