import * as React from "react"
import { Heart, ArrowRight } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CultureStory {
  id: string
  title: string
  excerpt: string
  image?: string
  tag: string
  date: string
}

// Mock data - will be replaced with CMS data
const mockStories: CultureStory[] = [
  {
    id: "1",
    title: "Habitat for Humanity Build Day",
    excerpt: "Our team volunteered to help build homes for families in need.",
    tag: "Community",
    date: "Jan 8, 2026",
  },
  {
    id: "2",
    title: "Wellness Wednesday: Yoga at Lunch",
    excerpt: "Join us every Wednesday for a relaxing yoga session.",
    tag: "Wellness",
    date: "Jan 5, 2026",
  },
  {
    id: "3",
    title: "Holiday Party Highlights",
    excerpt: "Thank you to everyone who made our annual celebration special!",
    tag: "Team",
    date: "Dec 20, 2025",
  },
]

const tagStyles: Record<string, string> = {
  Community: "bg-green-500/10 text-green-600",
  Wellness: "bg-blue-500/10 text-blue-600",
  Team: "bg-purple-500/10 text-purple-600",
}

export function CultureCorner() {
  return (
    <DashboardCard
      title="Culture Corner"
      description="Stories from our team"
      action={
        <Button variant="ghost" size="sm" className="text-primary">
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      }
    >
      <div className="space-y-4">
        {mockStories.map((story) => (
          <a
            key={story.id}
            href={`/culture/${story.id}`}
            className="flex gap-4 p-3 -mx-3 rounded-lg hover:bg-accent/50 transition-colors group"
          >
            {/* Placeholder image */}
            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Heart className="h-6 w-6 text-muted-foreground" />
            </div>

            <div className="flex-1 min-w-0">
              <Badge
                variant="secondary"
                className={`text-[10px] mb-1 ${tagStyles[story.tag] || ""}`}
              >
                {story.tag}
              </Badge>
              <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                {story.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {story.excerpt}
              </p>
            </div>
          </a>
        ))}
      </div>
    </DashboardCard>
  )
}
