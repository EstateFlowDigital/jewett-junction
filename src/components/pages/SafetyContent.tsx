import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Shield, AlertTriangle, Eye, BookOpen, FileText, Phone, Mail, Newspaper, ChevronRight, Download, Clock, HardHat, Flame, Zap } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface SafetyContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
}

export function SafetyContent({ theme = 'modern' }: SafetyContentProps) {
  const isDark = theme === 'dark';
  const resourcesLink = `/resources/${theme}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
            <Shield className="h-7 w-7 text-green-600" />
            Safety Hub
          </h1>
          <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
            4EverSafe - Our commitment to bringing everyone home safely
          </p>
        </div>
      </div>

      {/* Safety Stats Banner */}
      <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0">
        <CardContent className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-1">247</div>
              <div className="text-green-100 text-sm">Days Without Incident</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-1">312</div>
              <div className="text-green-100 text-sm">Company Record</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-1">98%</div>
              <div className="text-green-100 text-sm">Training Compliance</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-1">42</div>
              <div className="text-green-100 text-sm">Active Sites</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className={`hover:shadow-lg transition-all cursor-pointer ${isDark ? 'bg-slate-800 border-red-800 hover:border-red-600' : 'border-red-200 bg-red-50/50 hover:border-red-400'}`}>
          <CardContent className="py-4 text-center">
            <div className={`w-12 h-12 ${isDark ? 'bg-red-900' : 'bg-red-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className={`font-semibold ${isDark ? 'text-red-400' : 'text-red-900'}`}>Report Incident</div>
            <div className={`text-sm ${isDark ? 'text-red-500' : 'text-red-700'}`}>Submit safety report</div>
          </CardContent>
        </Card>
        <Card className={`hover:shadow-lg transition-all cursor-pointer ${isDark ? 'bg-slate-800 border-yellow-800 hover:border-yellow-600' : 'border-yellow-200 bg-yellow-50/50 hover:border-yellow-400'}`}>
          <CardContent className="py-4 text-center">
            <div className={`w-12 h-12 ${isDark ? 'bg-yellow-900' : 'bg-yellow-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
              <Eye className="h-6 w-6 text-yellow-600" />
            </div>
            <div className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-yellow-900'}`}>Report Hazard</div>
            <div className={`text-sm ${isDark ? 'text-yellow-500' : 'text-yellow-700'}`}>Identify unsafe conditions</div>
          </CardContent>
        </Card>
        <Card className={`hover:shadow-lg transition-all cursor-pointer ${isDark ? 'bg-slate-800 border-blue-800 hover:border-blue-600' : 'border-blue-200 bg-blue-50/50 hover:border-blue-400'}`}>
          <CardContent className="py-4 text-center">
            <div className={`w-12 h-12 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-900'}`}>Safety Training</div>
            <div className={`text-sm ${isDark ? 'text-blue-500' : 'text-blue-700'}`}>View available courses</div>
          </CardContent>
        </Card>
        <Card className={`hover:shadow-lg transition-all cursor-pointer ${isDark ? 'bg-slate-800 border-green-800 hover:border-green-600' : 'border-green-200 bg-green-50/50 hover:border-green-400'}`}>
          <CardContent className="py-4 text-center">
            <div className={`w-12 h-12 ${isDark ? 'bg-green-900' : 'bg-green-100'} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-900'}`}>Safety Docs</div>
            <div className={`text-sm ${isDark ? 'text-green-500' : 'text-green-700'}`}>Policies & procedures</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Safety Alerts */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : ''}>Safety Alerts & Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-red-900/30 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${isDark ? 'bg-red-900' : 'bg-red-100'} rounded-lg flex items-center justify-center shrink-0`}>
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-red-200 text-red-800 hover:bg-red-200">URGENT</Badge>
                      <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>Jan 14, 2026</span>
                    </div>
                    <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>Cold Weather Safety Advisory</h3>
                    <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Temperatures expected to drop below 20°F this week. Review cold weather protocols and ensure all crews have proper gear.</p>
                  </div>
                </div>
              </div>
              <div className={`p-4 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-muted/50'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${isDark ? 'bg-yellow-900' : 'bg-yellow-100'} rounded-lg flex items-center justify-center shrink-0`}>
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Reminder</Badge>
                      <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>Jan 12, 2026</span>
                    </div>
                    <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>PPE Inspection Due</h3>
                    <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Monthly PPE inspection is due by January 20th. All supervisors must complete and submit inspection forms.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Required Training */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className={isDark ? 'text-white' : ''}>Required Safety Training</CardTitle>
                <CardDescription className={isDark ? 'text-slate-400' : ''}>Complete your certifications</CardDescription>
              </div>
              <Button variant="outline" size="sm" className={isDark ? 'border-slate-600 text-slate-300' : ''}>
                View All Courses
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className={`border transition-colors ${isDark ? 'bg-slate-700 border-slate-600 hover:border-green-600' : 'hover:border-green-300'}`}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 ${isDark ? 'bg-green-900' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <Badge className="bg-green-100 text-green-700">Required</Badge>
                    </div>
                    <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : ''}`}>OSHA 30-Hour Construction</h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Comprehensive construction safety training.</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>30 hours</span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">Start Course</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className={`border transition-colors ${isDark ? 'bg-slate-700 border-slate-600 hover:border-blue-600' : 'hover:border-blue-300'}`}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg flex items-center justify-center`}>
                        <HardHat className="h-5 w-5 text-blue-600" />
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">Required</Badge>
                    </div>
                    <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : ''}`}>Fall Protection Certification</h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Essential training for working at heights.</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>4 hours</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Start Course</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Safety Contact */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>Safety Team Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">JM</span>
                </div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>James Mitchell</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Director of Safety</p>
              </div>
              <div className="space-y-3">
                <a href="tel:555-0123" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-muted/50 hover:bg-muted'}`}>
                  <Phone className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`} />
                  <span className={`text-sm ${isDark ? 'text-slate-300' : ''}`}>(555) 012-3456</span>
                </a>
                <a href="mailto:safety@jewettconstruction.com" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-muted/50 hover:bg-muted'}`}>
                  <Mail className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`} />
                  <span className={`text-sm truncate ${isDark ? 'text-slate-300' : ''}`}>safety@jewettconstruction.com</span>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Numbers */}
          <Card className={isDark ? 'bg-red-900/30 border-red-800' : 'bg-red-50 border-red-200'}>
            <CardHeader className={isDark ? 'bg-red-900/50 border-b border-red-800' : 'bg-red-100 border-b border-red-200'}>
              <CardTitle className={`text-base ${isDark ? 'text-red-300' : 'text-red-900'}`}>Emergency Numbers</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDark ? 'text-red-300' : 'text-red-800'}`}>Emergency Services</span>
                <span className={`font-bold ${isDark ? 'text-red-200' : 'text-red-900'}`}>911</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDark ? 'text-red-300' : 'text-red-800'}`}>Poison Control</span>
                <span className={`font-bold ${isDark ? 'text-red-200' : 'text-red-900'}`}>1-800-222-1222</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDark ? 'text-red-300' : 'text-red-800'}`}>Safety Hotline (24/7)</span>
                <span className={`font-bold ${isDark ? 'text-red-200' : 'text-red-900'}`}>(555) 999-0000</span>
              </div>
            </CardContent>
          </Card>

          {/* Safety Newsletter */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>Safety Newsletter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>Stay updated with the latest safety news and tips.</p>
              <a href={resourcesLink} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-muted/50'}`}>
                <div className={`w-10 h-10 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg flex items-center justify-center shrink-0`}>
                  <Newspaper className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className={`font-medium text-sm ${isDark ? 'text-white' : ''}`}>January 2026 Issue</div>
                  <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>Winter Safety Focus</div>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
