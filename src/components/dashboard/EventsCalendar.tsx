import * as React from "react"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: "company" | "training" | "social" | "meeting"
}

// Mock data - will be replaced with CMS data
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Safety Training - Fall Protection",
    date: "Jan 15",
    time: "9:00 AM",
    location: "Training Center",
    type: "training",
  },
  {
    id: "2",
    title: "Q1 All-Hands Meeting",
    date: "Jan 20",
    time: "2:00 PM",
    location: "Main Conference Room",
    type: "company",
  },
  {
    id: "3",
    title: "Team Lunch - Marketing",
    date: "Jan 22",
    time: "12:00 PM",
    location: "Cafe",
    type: "social",
  },
  {
    id: "4",
    title: "Project Kickoff - Harbor View",
    date: "Jan 25",
    time: "10:00 AM",
    location: "Room 201",
    type: "meeting",
  },
]

const typeStyles = {
  company: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  training: "bg-green-500/10 text-green-600 border-green-500/20",
  social: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  meeting: "bg-orange-500/10 text-orange-600 border-orange-500/20",
}

const typeLabels = {
  company: "Company",
  training: "Training",
  social: "Social",
  meeting: "Meeting",
}

export function EventsCalendar() {
  return (
    <DashboardCard
      title="Upcoming Events"
      description="What's happening"
      action={
        <Button variant="ghost" size="sm" className="text-primary">
          Full Calendar
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      }
    >
      <div className="space-y-3">
        {mockEvents.map((event) => (
          <a
            key={event.id}
            href={`/events/${event.id}`}
            className="flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-accent/50 transition-colors group"
          >
            {/* Date box */}
            <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary shrink-0">
              <span className="text-xs font-medium">
                {event.date.split(" ")[0]}
              </span>
              <span className="text-lg font-bold leading-none">
                {event.date.split(" ")[1]}
              </span>
            </div>

            {/* Event details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="outline"
                  className={cn("text-[10px] px-1.5", typeStyles[event.type])}
                >
                  {typeLabels[event.type]}
                </Badge>
              </div>
              <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                {event.title}
              </h4>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
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
          </a>
        ))}
      </div>
    </DashboardCard>
  )
}
