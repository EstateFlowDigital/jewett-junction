import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react"

interface Event {
  id: string
  name?: string
  title?: string
  slug?: string
  'event-date'?: string
  date?: string
  location?: string
  category?: string
  type?: string
  'is-virtual'?: boolean
}

interface UpcomingEventsProps {
  events?: Event[]
}

const typeColors: Record<string, string> = {
  meeting: "bg-blue-100 text-blue-700",
  'all-hands': "bg-blue-100 text-blue-700",
  'all-hands-meeting': "bg-blue-100 text-blue-700",
  training: "bg-green-100 text-green-700",
  social: "bg-purple-100 text-purple-700",
  'social-event': "bg-purple-100 text-purple-700",
  safety: "bg-orange-100 text-orange-700",
  'safety-meeting': "bg-orange-100 text-orange-700",
  workshop: "bg-amber-100 text-amber-700",
  default: "bg-gray-100 text-gray-700",
}

function formatEventDate(dateStr: string | undefined) {
  if (!dateStr) return { day: '', date: '', time: '' }
  const eventDate = new Date(dateStr)
  if (isNaN(eventDate.getTime())) return { day: '', date: '', time: '' }

  return {
    day: eventDate.toLocaleDateString('en-US', { weekday: 'short' }),
    date: eventDate.getDate().toString(),
    time: eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  }
}

function getTypeColor(type: string | undefined): string {
  if (!type) return typeColors.default
  const normalized = type.toLowerCase().replace(/\s+/g, '-')
  return typeColors[normalized] || typeColors.default
}

function getTypeLabel(type: string | undefined): string {
  if (!type) return 'Event'
  return type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export function UpcomingEvents({ events = [] }: UpcomingEventsProps) {
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Events
        </CardTitle>
        <a href="/jewett-junction/events">
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </a>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.length > 0 ? (
          events.slice(0, 4).map((event) => {
            const title = event.name || event.title || 'Untitled Event'
            const dateInfo = formatEventDate(event['event-date'] || event.date)
            const eventType = event.category || event.type || 'event'

            return (
              <a
                key={event.id}
                href={`/jewett-junction/events/${event.slug || event.id}`}
                className="flex items-center gap-4 group hover:bg-gray-50 -mx-2 px-2 py-3 rounded-xl transition-colors"
              >
                {/* Date Badge */}
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-primary/10 shrink-0">
                  <span className="text-xs text-primary font-medium">{dateInfo.day}</span>
                  <span className="text-lg font-bold text-primary">{dateInfo.date}</span>
                </div>

                {/* Event Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                    {title}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    {dateInfo.time && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {dateInfo.time}
                      </span>
                    )}
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Type Badge */}
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(eventType)}`}>
                  {getTypeLabel(eventType)}
                </span>
              </a>
            )
          })
        ) : (
          <div className="py-8 text-center">
            <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">No upcoming events</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
