import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Award, FileText, Calendar, Users } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "badge",
    icon: Award,
    title: "You earned the Safety Champion badge!",
    time: "2 hours ago",
    color: "text-yellow-500",
  },
  {
    id: 2,
    type: "news",
    icon: FileText,
    title: "New company update: Q4 Results",
    time: "4 hours ago",
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "event",
    icon: Calendar,
    title: "Team lunch scheduled for Friday",
    time: "Yesterday",
    color: "text-green-500",
  },
  {
    id: 4,
    type: "team",
    icon: Users,
    title: "Welcome Sarah Chen to the team!",
    time: "2 days ago",
    color: "text-purple-500",
  },
  {
    id: 5,
    type: "reminder",
    icon: Bell,
    title: "Safety training due in 3 days",
    time: "3 days ago",
    color: "text-red-500",
    urgent: true,
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 group cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-2 rounded-xl transition-colors"
            >
              <div className={`p-2 rounded-xl bg-gray-100 ${activity.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 group-hover:text-primary transition-colors">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              {activity.urgent && (
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
