import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Heart, Award, Users, Star, Trophy, Target, Sparkles, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface CMSCultureStory {
  id: string;
  name: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: { url: string; alt?: string };
  author?: string;
  'published-date'?: string;
  category?: string;
  type?: string;
  featured?: boolean;
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

export function CultureContent({ theme = 'modern', stories: cmsStories = [] }: CultureContentProps) {
  const isDark = theme === 'dark';

  // Filter stories by type
  const spotlightStories = cmsStories.filter(s => s.type?.toLowerCase() === 'spotlight' || s.category?.toLowerCase() === 'spotlight');
  const recognitionStories = cmsStories.filter(s => s.type?.toLowerCase() === 'recognition' || s.category?.toLowerCase() === 'recognition');
  const winStories = cmsStories.filter(s => s.type?.toLowerCase() === 'win' || s.category?.toLowerCase() === 'win');
  const otherStories = cmsStories.filter(s =>
    !['spotlight', 'recognition', 'win'].includes(s.type?.toLowerCase() || '') &&
    !['spotlight', 'recognition', 'win'].includes(s.category?.toLowerCase() || '')
  );

  // Get current spotlight (featured one or first spotlight story)
  const currentSpotlight = spotlightStories.find(s => s.featured) || spotlightStories[0];

  // Get current month for spotlight badge
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
          <Heart className="h-7 w-7 text-pink-600" />
          Our Culture
        </h1>
        <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
          Celebrating our team, values, and community
        </p>
      </div>

      {/* Core Values */}
      <Card className="bg-gradient-to-r from-pink-600 to-purple-600 text-white border-0">
        <CardContent className="py-6">
          <h2 className="text-xl font-bold mb-4 text-center">Our Core Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Shield, name: 'Safety First', desc: '4EverSafe' },
              { icon: Star, name: 'Excellence', desc: 'Quality in all we do' },
              { icon: Users, name: 'Teamwork', desc: 'Better together' },
              { icon: Target, name: 'Integrity', desc: 'Do the right thing' },
            ].map((value) => (
              <div key={value.name} className="p-3">
                <value.icon className="h-8 w-8 mx-auto mb-2 opacity-90" />
                <div className="font-semibold">{value.name}</div>
                <div className="text-sm opacity-80">{value.desc}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Employee Spotlight */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : ''}>Employee Spotlight</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : ''}>Celebrating our amazing team members</CardDescription>
            </CardHeader>
            <CardContent>
              {currentSpotlight ? (
                <div className={`p-6 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-gradient-to-br from-amber-50 to-orange-50'}`}>
                  <div className="flex items-start gap-4">
                    {currentSpotlight.image?.url ? (
                      <img
                        src={currentSpotlight.image.url}
                        alt={currentSpotlight.image.alt || currentSpotlight.name}
                        className="w-20 h-20 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-amber-200 rounded-full flex items-center justify-center text-2xl font-bold text-amber-700 shrink-0">
                        {getInitials(currentSpotlight.name)}
                      </div>
                    )}
                    <div>
                      <Badge className="bg-amber-100 text-amber-700 mb-2">{currentMonth}</Badge>
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : ''}`}>{currentSpotlight.name}</h3>
                      {currentSpotlight.author && (
                        <p className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{currentSpotlight.author}</p>
                      )}
                      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-muted-foreground'}`}>
                        {stripHtml(currentSpotlight.content) || currentSpotlight.excerpt || 'Outstanding contribution to our team!'}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`p-6 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-gradient-to-br from-amber-50 to-orange-50'}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-amber-200 rounded-full flex items-center justify-center text-2xl font-bold text-amber-700 shrink-0">
                      JD
                    </div>
                    <div>
                      <Badge className="bg-amber-100 text-amber-700 mb-2">{currentMonth}</Badge>
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : ''}`}>Jennifer Davis</h3>
                      <p className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Project Manager • 8 Years</p>
                      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-muted-foreground'}`}>
                        "Jennifer's leadership on the Downtown Office Complex project exemplifies our commitment to excellence. Her dedication to safety and quality has set a new standard for our team."
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Recognitions / Team Wins */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className={isDark ? 'text-white' : ''}>
                  {recognitionStories.length > 0 || winStories.length > 0 ? 'Team Highlights' : 'Recent Recognitions'}
                </CardTitle>
                <CardDescription className={isDark ? 'text-slate-400' : ''}>
                  {recognitionStories.length > 0 || winStories.length > 0 ? 'Celebrating wins and recognitions' : 'Kudos from the team'}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className={isDark ? 'border-slate-600 text-slate-300' : ''}>
                <Sparkles className="h-4 w-4 mr-2" /> Give Recognition
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[...winStories, ...recognitionStories, ...otherStories].length > 0 ? (
                [...winStories, ...recognitionStories, ...otherStories].slice(0, 5).map((story, i) => (
                  <div key={story.id || i} className={`p-4 rounded-lg border ${isDark ? 'border-slate-600' : ''}`}>
                    <div className="flex items-start gap-3">
                      {story.image?.url ? (
                        <img src={story.image.url} alt="" className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className={`w-10 h-10 ${isDark ? 'bg-amber-900' : 'bg-amber-100'} rounded-full flex items-center justify-center`}>
                          {story.type?.toLowerCase() === 'win' || story.category?.toLowerCase() === 'win' ? (
                            <Trophy className="h-5 w-5 text-amber-600" />
                          ) : (
                            <Star className="h-5 w-5 text-amber-600" />
                          )}
                        </div>
                      )}
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-foreground'}`}>{story.name}</p>
                        <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-muted-foreground'}`}>
                          {stripHtml(story.content) || story.excerpt || ''}
                        </p>
                        {story.author && (
                          <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>
                            — {story.author}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Fallback sample recognitions when no CMS data
                [
                  { from: 'Mike Thompson', to: 'Sarah Chen', message: 'Amazing work on the client presentation!', icon: Star },
                  { from: 'Lisa Wang', to: 'Team Alpha', message: 'Thanks for staying late to meet the deadline!', icon: Trophy },
                  { from: 'James Miller', to: 'Safety Team', message: '300 days without incident - incredible!', icon: Award },
                ].map((rec, i) => (
                  <div key={i} className={`p-4 rounded-lg border ${isDark ? 'border-slate-600' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${isDark ? 'bg-amber-900' : 'bg-amber-100'} rounded-full flex items-center justify-center`}>
                        <rec.icon className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-foreground'}`}>{rec.from}</span> recognized <span className={`font-medium ${isDark ? 'text-white' : 'text-foreground'}`}>{rec.to}</span>
                        </p>
                        <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : ''}`}>"{rec.message}"</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>
                {cmsStories.length > 0 ? 'Culture Stats' : 'Community Impact'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cmsStories.length > 0 ? (
                <>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>{cmsStories.length}</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Total Stories</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>{spotlightStories.length}</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Team Spotlights</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>{winStories.length}</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Team Wins</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>$125K</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Donated in 2025</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>450</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Volunteer Hours</div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className={isDark ? 'bg-pink-900/30 border-pink-800' : 'bg-pink-50 border-pink-200'}>
            <CardContent className="pt-6 text-center">
              <Award className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-pink-400' : 'text-pink-600'}`} />
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-pink-300' : 'text-pink-900'}`}>Nominate a Teammate</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-pink-400' : 'text-pink-700'}`}>Recognize someone who embodies our values</p>
              <Button className="w-full bg-pink-600 hover:bg-pink-700">Submit Nomination</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
