import * as React from "react"
import { Pin, ArrowRight, Megaphone } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Headline {
  id: string
  name?: string
  title?: string
  slug?: string
  excerpt?: string
  summary?: string
  description?: string
  date?: string
  'published-date'?: string
  priority?: "normal" | "important" | "urgent"
  'is-pinned'?: boolean
  isPinned?: boolean
  author?: string
  department?: string
}

interface HeadlinesProps {
  headlines?: Headline[]
}

const priorityStyles = {
  normal: "bg-secondary text-secondary-foreground",
  important: "bg-blue-500 text-white",
  urgent: "bg-destructive text-destructive-foreground",
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function Headlines({ headlines = [] }: HeadlinesProps) {
  return (
    <DashboardCard
      title="Jewett Headlines"
      description="Company news & announcements"
      action={
        <a href="/jewett-junction/announcements">
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </a>
      }
    >
      <div className="space-y-4">
        {headlines.length > 0 ? (
          headlines.slice(0, 4).map((headline) => {
            const title = headline.name || headline.title || 'Untitled'
            const excerpt = headline.excerpt || headline.summary || headline.description || ''
            const date = formatDate(headline.date || headline['published-date'])
            const priority = headline.priority || 'normal'
            const isPinned = headline['is-pinned'] || headline.isPinned
            const author = headline.author || headline.department

            return (
              <a
                key={headline.id}
                href={`/jewett-junction/announcements/${headline.slug || headline.id}`}
                className="block group"
              >
                <article className="flex gap-4 p-3 -mx-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {isPinned && (
                        <Pin className="h-3 w-3 text-primary shrink-0" />
                      )}
                      <Badge
                        variant="secondary"
                        className={cn("text-[10px]", priorityStyles[priority])}
                      >
                        {priority === "urgent" ? "Urgent" : priority === "important" ? "Important" : "News"}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                      {title}
                    </h4>
                    {excerpt && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {excerpt.replace(/<[^>]*>/g, '')}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      {date && <span>{date}</span>}
                      {author && (
                        <>
                          {date && <span>•</span>}
                          <span>{author}</span>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              </a>
            )
          })
        ) : (
          <div className="py-8 text-center">
            <Megaphone className="h-8 w-8 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">No announcements at this time</p>
          </div>
        )}
      </div>
    </DashboardCard>
  )
}
