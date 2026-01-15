import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react"

const events = [
  {
    id: 1,
    title: "All-Hands Meeting",
    date: "Jan 15",
    day: "Wed",
    time: "10:00 AM",
    location: "Main Conference Room",
    type: "meeting",
  },
  {
    id: 2,
    title: "Safety Training Workshop",
    date: "Jan 17",
    day: "Fri",
    time: "2:00 PM",
    location: "Training Center",
    type: "training",
  },
  {
    id: 3,
    title: "Team Lunch",
    date: "Jan 18",
    day: "Sat",
    time: "12:30 PM",
    location: "Tony's Italian",
    type: "social",
  },
  {
    id: 4,
    title: "Q1 Planning Session",
    date: "Jan 22",
    day: "Wed",
    time: "9:00 AM",
    location: "Board Room",
    type: "meeting",
  },
]

const typeColors = {
  meeting: "bg-blue-100 text-blue-700",
  training: "bg-green-100 text-green-700",
  social: "bg-purple-100 text-purple-700",
}

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Events
        </CardTitle>
        <a href="/events">
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </a>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-3 rounded-xl transition-colors"
          >
            {/* Date Badge */}
            <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-primary/10 shrink-0">
              <span className="text-xs text-primary font-medium">{event.day}</span>
              <span className="text-lg font-bold text-primary">{event.date.split(" ")[1]}</span>
            </div>

            {/* Event Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                {event.title}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </span>
              </div>
            </div>

            {/* Type Badge */}
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColors[event.type as keyof typeof typeColors]}`}>
              {event.type}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
