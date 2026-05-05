import * as React from "react"
import { Heart, ArrowRight } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CultureStory {
  id: string
  name?: string
  title?: string
  slug?: string
  excerpt?: string
  summary?: string
  description?: string
  image?: { url: string }
  'preview-image'?: { url: string }
  tag?: string
  category?: string
  date?: string
  'published-date'?: string
}

interface CultureCornerProps {
  stories?: CultureStory[]
}

const tagStyles: Record<string, string> = {
  Community: "bg-green-500/10 text-green-600",
  Wellness: "bg-blue-500/10 text-blue-600",
  Team: "bg-purple-500/10 text-purple-600",
  default: "bg-slate-500/10 text-slate-600",
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function CultureCorner({ stories = [] }: CultureCornerProps) {
  return (
    <DashboardCard
      title="Culture Corner"
      description="Stories from our team"
      action={
        <a href="/jewett-junction/culture">
          <Button variant="ghost" size="sm" className="text-primary">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </a>
      }
    >
      <div className="space-y-4">
        {stories.length > 0 ? (
          stories.slice(0, 3).map((story) => {
            const title = story.name || story.title || 'Untitled'
            const excerpt = story.excerpt || story.summary || story.description || ''
            const tag = story.tag || story.category || 'Team'
            const s = story as any;
            const imageUrl = s['featured-image']?.url || s.image?.url || s['preview-image']?.url

            return (
              <a
                key={story.id}
                href={`/jewett-junction/culture/${story.slug || story.id}`}
                className="flex gap-4 p-3 -mx-3 rounded-lg hover:bg-accent/50 transition-colors group"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Heart className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <Badge
                    variant="secondary"
                    className={`text-[10px] mb-1 ${tagStyles[tag] || tagStyles.default}`}
                  >
                    {tag}
                  </Badge>
                  <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                    {title}
                  </h4>
                  {excerpt && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {excerpt.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                </div>
              </a>
            )
          })
        ) : (
          <div className="py-8 text-center">
            <Heart className="h-8 w-8 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">No culture stories at this time</p>
          </div>
        )}
      </div>
    </DashboardCard>
  )
}
