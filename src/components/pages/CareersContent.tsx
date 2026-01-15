import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Briefcase, MapPin, DollarSign, Clock, Users, ChevronRight, Gift, Star, Building } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface CareersContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
}

export function CareersContent({ theme = 'modern' }: CareersContentProps) {
  const isDark = theme === 'dark';

  const jobs = [
    { title: 'Project Manager', dept: 'Operations', location: 'Denver, CO', type: 'Full-time', bonus: '$500' },
    { title: 'Safety Coordinator', dept: 'Safety', location: 'Boulder, CO', type: 'Full-time', bonus: '$500' },
    { title: 'Equipment Operator', dept: 'Field', location: 'Fort Collins, CO', type: 'Full-time', bonus: '$300' },
    { title: 'Administrative Assistant', dept: 'Admin', location: 'Denver, CO', type: 'Full-time', bonus: '$250' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
          <Briefcase className="h-7 w-7 text-emerald-600" />
          Careers & Referrals
        </h1>
        <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
          Join our team or refer talented professionals
        </p>
      </div>

      {/* Referral Banner */}
      <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                <Gift className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Employee Referral Program</h2>
                <p className="text-emerald-100">Earn up to $500 for each successful referral!</p>
              </div>
            </div>
            <Button className="bg-white text-emerald-700 hover:bg-emerald-50">
              Submit Referral
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Open Positions */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className={isDark ? 'text-white' : ''}>Open Positions</CardTitle>
                  <CardDescription className={isDark ? 'text-slate-400' : ''}>{jobs.length} opportunities available</CardDescription>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">{jobs.length} Open</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {jobs.map((job, i) => (
                <div key={i} className={`p-4 rounded-lg border transition-colors cursor-pointer ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-muted/50'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>{job.title}</h3>
                      <div className={`flex flex-wrap items-center gap-3 mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                        <span className="flex items-center gap-1"><Building className="h-4 w-4" /> {job.dept}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={`${isDark ? 'border-emerald-700 text-emerald-400' : 'border-emerald-200 text-emerald-700'}`}>
                        <Gift className="h-3 w-3 mr-1" /> {job.bonus}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Apply Now</Button>
                    <Button size="sm" variant="outline" className={isDark ? 'border-slate-600' : ''}>Refer Someone</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Why Work Here */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : ''}>Why Jewett Construction?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Star, title: 'Industry Leader', desc: '50+ years of excellence' },
                  { icon: Users, title: 'Great Team', desc: 'Collaborative culture' },
                  { icon: DollarSign, title: 'Competitive Pay', desc: 'Above market rates' },
                  { icon: Gift, title: 'Full Benefits', desc: 'Health, 401k, PTO' },
                ].map((item) => (
                  <div key={item.title} className={`p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-muted/50'}`}>
                    <item.icon className={`h-6 w-6 mb-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <div className={`font-medium ${isDark ? 'text-white' : ''}`}>{item.title}</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>Referral Bonuses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-muted/50'}`}>
                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Management Positions</div>
                <div className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>$500</div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-muted/50'}`}>
                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Skilled Trades</div>
                <div className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>$300</div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-muted/50'}`}>
                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Entry Level</div>
                <div className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>$250</div>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>
                Bonuses paid after 90-day probation period
              </p>
            </CardContent>
          </Card>

          <Card className={isDark ? 'bg-emerald-900/30 border-emerald-800' : 'bg-emerald-50 border-emerald-200'}>
            <CardContent className="pt-6">
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>Questions?</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Contact our recruiting team</p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Contact HR</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
