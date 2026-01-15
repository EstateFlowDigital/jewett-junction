import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, Clock, Heart, DollarSign, Calendar, FileText, Shield, Phone, Mail, ExternalLink, ChevronRight, BookOpen, CreditCard, Globe } from 'lucide-react';
import { Button } from '../ui/button';

interface HRContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
}

export function HRContent({ theme = 'modern' }: HRContentProps) {
  const isDark = theme === 'dark';
  const resourcesLink = `/resources/${theme}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
            <Users className="h-7 w-7 text-purple-600" />
            HR Resources
          </h1>
          <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
            Benefits, policies, forms, and employee support
          </p>
        </div>
      </div>

      {/* Open Enrollment Alert */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white border-0">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Open Enrollment Ends January 31st</h2>
                <p className="text-purple-100">Don't miss your chance to update your benefits selections for 2026.</p>
              </div>
            </div>
            <Button className="bg-white text-purple-700 hover:bg-purple-50">
              Review Benefits
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="https://adp.com" target="_blank" rel="noopener">
          <Card className={`hover:shadow-lg transition-all cursor-pointer h-full ${isDark ? 'bg-slate-800 border-blue-800 hover:border-blue-600' : 'border-blue-200 bg-blue-50/50 hover:border-blue-400'}`}>
            <CardContent className="py-4 text-center">
              <div className={`w-12 h-12 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-900'}`}>Pay & Tax Info</div>
              <div className={`text-sm ${isDark ? 'text-blue-500' : 'text-blue-700'}`}>View in ADP</div>
            </CardContent>
          </Card>
        </a>
        <a href="https://adp.com" target="_blank" rel="noopener">
          <Card className={`hover:shadow-lg transition-all cursor-pointer h-full ${isDark ? 'bg-slate-800 border-green-800 hover:border-green-600' : 'border-green-200 bg-green-50/50 hover:border-green-400'}`}>
            <CardContent className="py-4 text-center">
              <div className={`w-12 h-12 ${isDark ? 'bg-green-900' : 'bg-green-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-900'}`}>Time Off</div>
              <div className={`text-sm ${isDark ? 'text-green-500' : 'text-green-700'}`}>Request PTO</div>
            </CardContent>
          </Card>
        </a>
        <Card className={`hover:shadow-lg transition-all cursor-pointer ${isDark ? 'bg-slate-800 border-purple-800 hover:border-purple-600' : 'border-purple-200 bg-purple-50/50 hover:border-purple-400'}`}>
          <CardContent className="py-4 text-center">
            <div className={`w-12 h-12 ${isDark ? 'bg-purple-900' : 'bg-purple-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
              <Heart className="h-6 w-6 text-purple-600" />
            </div>
            <div className={`font-semibold ${isDark ? 'text-purple-400' : 'text-purple-900'}`}>Benefits</div>
            <div className={`text-sm ${isDark ? 'text-purple-500' : 'text-purple-700'}`}>Health & wellness</div>
          </CardContent>
        </Card>
        <Card className={`hover:shadow-lg transition-all cursor-pointer ${isDark ? 'bg-slate-800 border-orange-800 hover:border-orange-600' : 'border-orange-200 bg-orange-50/50 hover:border-orange-400'}`}>
          <CardContent className="py-4 text-center">
            <div className={`w-12 h-12 ${isDark ? 'bg-orange-900' : 'bg-orange-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
              <Phone className="h-6 w-6 text-orange-600" />
            </div>
            <div className={`font-semibold ${isDark ? 'text-orange-400' : 'text-orange-900'}`}>Get Help</div>
            <div className={`text-sm ${isDark ? 'text-orange-500' : 'text-orange-700'}`}>EAP & support</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Benefits Overview */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : ''}>Benefits Overview</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : ''}>Your comprehensive benefits package</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className={`border ${isDark ? 'bg-slate-700 border-slate-600' : ''}`}>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 ${isDark ? 'bg-red-900' : 'bg-red-100'} rounded-lg flex items-center justify-center`}>
                        <Heart className="h-5 w-5 text-red-600" />
                      </div>
                      <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>Medical Insurance</h3>
                    </div>
                    <p className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Comprehensive health coverage through Blue Cross Blue Shield.</p>
                    <ul className={`text-sm space-y-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                      <li>• PPO and HMO options available</li>
                      <li>• Low deductibles and copays</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className={`border ${isDark ? 'bg-slate-700 border-slate-600' : ''}`}>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 ${isDark ? 'bg-green-900' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>401(k) Retirement</h3>
                    </div>
                    <p className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Secure your future with competitive retirement savings.</p>
                    <ul className={`text-sm space-y-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                      <li>• Company matches up to 6%</li>
                      <li>• Immediate vesting</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* HR Forms */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className={isDark ? 'text-white' : ''}>Forms & Documents</CardTitle>
                <CardDescription className={isDark ? 'text-slate-400' : ''}>Commonly used HR forms</CardDescription>
              </div>
              <Button variant="outline" size="sm" className={isDark ? 'border-slate-600 text-slate-300' : ''}>
                View All <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { name: 'Employee Handbook', desc: 'PDF - 2026 Edition' },
                  { name: 'Direct Deposit Form', desc: 'PDF - Fillable' },
                  { name: 'W-4 Form', desc: 'PDF - Tax Withholding' },
                  { name: 'Address Change', desc: 'Online Form' },
                ].map((form) => (
                  <a key={form.name} href={resourcesLink} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors group ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-muted/50'}`}>
                    <div className={`w-10 h-10 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg flex items-center justify-center shrink-0`}>
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium truncate group-hover:text-primary ${isDark ? 'text-white' : ''}`}>{form.name}</div>
                      <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>{form.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* HR Contact */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>HR Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">JD</span>
                </div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>Jennifer Davis</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>HR Manager</p>
              </div>
              <div className="space-y-3">
                <a href="tel:555-5000" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-muted/50 hover:bg-muted'}`}>
                  <Phone className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`} />
                  <span className={`text-sm ${isDark ? 'text-slate-300' : ''}`}>(555) 500-0000</span>
                </a>
                <a href="mailto:hr@jewettconstruction.com" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-muted/50 hover:bg-muted'}`}>
                  <Mail className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`} />
                  <span className={`text-sm truncate ${isDark ? 'text-slate-300' : ''}`}>hr@jewettconstruction.com</span>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* EAP */}
          <Card className={isDark ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-200'}>
            <CardHeader className={isDark ? 'bg-green-900/50 border-b border-green-800' : 'bg-green-100 border-b border-green-200'}>
              <CardTitle className={`text-base ${isDark ? 'text-green-300' : 'text-green-900'}`}>Employee Assistance</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className={`text-sm mb-4 ${isDark ? 'text-green-300' : 'text-green-800'}`}>Free, confidential support for you and your family.</p>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm ${isDark ? 'text-green-300' : 'text-green-800'}`}>24/7 Helpline</span>
                <span className={`font-bold ${isDark ? 'text-green-200' : 'text-green-900'}`}>1-800-EAP-4YOU</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">Access EAP Portal</Button>
            </CardContent>
          </Card>

          {/* External Links */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'ADP Workforce Now', desc: 'Payroll & Time', href: 'https://adp.com' },
                { name: 'Benefits Portal', desc: 'BCBS & Wellness', href: 'https://bcbs.com' },
                { name: '401(k) Portal', desc: 'Fidelity NetBenefits', href: 'https://netbenefits.fidelity.com' },
              ].map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener" className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-muted/50'}`}>
                  <div className={`w-10 h-10 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg flex items-center justify-center shrink-0`}>
                    <ExternalLink className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className={`font-medium text-sm ${isDark ? 'text-white' : ''}`}>{link.name}</div>
                    <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>{link.desc}</div>
                  </div>
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
