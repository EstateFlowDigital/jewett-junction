import * as React from "react"
import { Pin, ArrowRight } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Headline {
  id: string
  title: string
  excerpt: string
  date: string
  priority: "normal" | "important" | "urgent"
  isPinned?: boolean
  author?: string
}

// Mock data - will be replaced with CMS data
const mockHeadlines: Headline[] = [
  {
    id: "1",
    title: "Q4 Safety Excellence Award Winners Announced",
    excerpt: "Congratulations to all teams who achieved zero incidents this quarter.",
    date: "Jan 10, 2026",
    priority: "important",
    isPinned: true,
    author: "Leadership Team",
  },
  {
    id: "2",
    title: "New Health Benefits Package Starting February",
    excerpt: "Enhanced dental and vision coverage now available for all employees.",
    date: "Jan 8, 2026",
    priority: "normal",
    author: "HR Department",
  },
  {
    id: "3",
    title: "Winter Weather Protocol Reminder",
    excerpt: "Review updated procedures for working in cold weather conditions.",
    date: "Jan 6, 2026",
    priority: "urgent",
    author: "Safety Team",
  },
  {
    id: "4",
    title: "Employee Appreciation Day - Save the Date!",
    excerpt: "Join us on February 14th for a special celebration.",
    date: "Jan 5, 2026",
    priority: "normal",
    author: "Culture Committee",
  },
]

const priorityStyles = {
  normal: "bg-secondary text-secondary-foreground",
  important: "bg-blue-500 text-white",
  urgent: "bg-destructive text-destructive-foreground",
}

export function Headlines() {
  return (
    <DashboardCard
      title="Jewett Headlines"
      description="Company news & announcements"
      action={
        <Button variant="ghost" size="sm" className="text-primary">
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      }
    >
      <div className="space-y-4">
        {mockHeadlines.map((headline) => (
          <a
            key={headline.id}
            href={`/jewett-junction/headlines/${headline.id}`}
            className="block group"
          >
            <article className="flex gap-4 p-3 -mx-3 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {headline.isPinned && (
                    <Pin className="h-3 w-3 text-primary shrink-0" />
                  )}
                  <Badge
                    variant="secondary"
                    className={cn("text-[10px]", priorityStyles[headline.priority])}
                  >
                    {headline.priority === "urgent" ? "Urgent" : headline.priority === "important" ? "Important" : "News"}
                  </Badge>
                </div>
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                  {headline.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {headline.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>{headline.date}</span>
                  {headline.author && (
                    <>
                      <span>•</span>
                      <span>{headline.author}</span>
                    </>
                  )}
                </div>
              </div>
            </article>
          </a>
        ))}
      </div>
    </DashboardCard>
  )
}
