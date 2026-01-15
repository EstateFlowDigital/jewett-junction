import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Calendar, Clock, MapPin, Users, ChevronRight, Plus, Filter } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface EventsContentProps {
  theme?: 'modern' | 'classic' | 'minimal' | 'warm' | 'dark' | 'patriotic';
}

export function EventsContent({ theme = 'modern' }: EventsContentProps) {
  const isDark = theme === 'dark';

  const events = [
    { title: 'All-Hands Meeting', date: 'Jan 15', time: '10:00 AM', location: 'Main Conference', type: 'Company', color: 'blue' },
    { title: 'Safety Training', date: 'Jan 17', time: '2:00 PM', location: 'Training Center', type: 'Training', color: 'green' },
    { title: 'New Hire Orientation', date: 'Jan 20', time: '9:00 AM', location: 'HR Office', type: 'HR', color: 'purple' },
    { title: 'Project Kickoff', date: 'Jan 22', time: '1:00 PM', location: 'Boardroom', type: 'Project', color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-3 ${isDark ? 'text-white' : ''}`}>
            <Calendar className="h-7 w-7 text-indigo-600" />
            Company Events
          </h1>
          <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
            Meetings, trainings, and company gatherings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className={isDark ? 'border-slate-600 text-slate-300' : ''}>
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" /> Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Events */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : ''}>Upcoming Events</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : ''}>What's happening this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event, i) => (
                <div key={i} className={`flex gap-4 p-4 rounded-lg border transition-colors cursor-pointer ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'hover:bg-muted/50'}`}>
                  <div className={`w-14 h-14 bg-${event.color}-${isDark ? '900' : '100'} rounded-lg flex flex-col items-center justify-center text-${event.color}-600 shrink-0`}>
                    <span className="text-xs font-medium">{event.date.split(' ')[0]}</span>
                    <span className="text-lg font-bold">{event.date.split(' ')[1]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : ''}`}>{event.title}</h3>
                      <Badge variant="secondary" className={`bg-${event.color}-100 text-${event.color}-700`}>{event.type}</Badge>
                    </div>
                    <div className={`flex items-center gap-4 text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {event.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {event.location}</span>
                    </div>
                  </div>
                  <ChevronRight className={`h-5 w-5 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Calendar Grid (Simplified) */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : ''}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : ''}>January 2026</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className={`text-xs font-medium py-2 ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <div key={day} className={`py-2 text-sm rounded-lg ${day === 15 ? (isDark ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-700') : (isDark ? 'hover:bg-slate-700' : 'hover:bg-muted')} cursor-pointer ${isDark ? 'text-white' : ''}`}>
                    {day}
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
              <CardTitle className={`text-base ${isDark ? 'text-white' : ''}`}>Event Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: 'Company Wide', count: 4, color: 'blue' },
                { name: 'Training', count: 8, color: 'green' },
                { name: 'HR Events', count: 3, color: 'purple' },
                { name: 'Social', count: 2, color: 'orange' },
              ].map((cat) => (
                <div key={cat.name} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${isDark ? 'hover:bg-slate-700' : 'hover:bg-muted/50'}`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-${cat.color}-500`}></div>
                    <span className={`text-sm ${isDark ? 'text-white' : ''}`}>{cat.name}</span>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-muted-foreground'}`}>{cat.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className={isDark ? 'bg-indigo-900/30 border-indigo-800' : 'bg-indigo-50 border-indigo-200'}>
            <CardContent className="pt-6 text-center">
              <Calendar className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <h3 className={`font-semibold mb-2 ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>Subscribe to Calendar</h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-indigo-400' : 'text-indigo-700'}`}>Get events in your calendar app</p>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Add to Calendar</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
