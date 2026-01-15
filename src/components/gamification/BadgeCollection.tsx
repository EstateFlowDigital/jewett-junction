import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Award, Lock } from "lucide-react"
import { badges, getBadgeRarityColor, type Badge } from "@/lib/constants/gamification"

interface BadgeCollectionProps {
  earnedBadgeIds?: string[]
  showLocked?: boolean
  className?: string
}

export function BadgeCollection({
  earnedBadgeIds = ["safety_champion", "team_player", "event_enthusiast"],
  showLocked = true,
  className
}: BadgeCollectionProps) {
  const earnedBadges = badges.filter(b => earnedBadgeIds.includes(b.id))
  const lockedBadges = badges.filter(b => !earnedBadgeIds.includes(b.id))

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-[--brand-primary]" />
          My Badges
          <span className="text-sm font-normal text-gray-500">
            ({earnedBadges.length}/{badges.length})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Earned Badges */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Earned</h4>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {earnedBadges.map((badge) => (
              <BadgeItem key={badge.id} badge={badge} earned />
            ))}
          </div>
        </div>

        {/* Locked Badges */}
        {showLocked && lockedBadges.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-3">Available to Earn</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {lockedBadges.map((badge) => (
                <BadgeItem key={badge.id} badge={badge} earned={false} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface BadgeItemProps {
  badge: Badge
  earned: boolean
}

function BadgeItem({ badge, earned }: BadgeItemProps) {
  const Icon = badge.icon

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "relative aspect-square rounded-xl flex items-center justify-center cursor-pointer transition-all",
              earned
                ? cn("border-2", getBadgeRarityColor(badge.rarity), "hover:scale-105")
                : "bg-gray-100 border-2 border-dashed border-gray-300 opacity-50"
            )}
          >
            {earned ? (
              <Icon className="h-6 w-6" />
            ) : (
              <Lock className="h-5 w-5 text-gray-400" />
            )}
            {/* Rarity indicator dot */}
            {earned && (
              <div className={cn(
                "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
                badge.rarity === "legendary" && "bg-amber-500",
                badge.rarity === "rare" && "bg-blue-500",
                badge.rarity === "uncommon" && "bg-green-500",
                badge.rarity === "common" && "bg-gray-400"
              )} />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <div className="font-medium">{badge.name}</div>
            <div className="text-xs text-gray-500">{badge.description}</div>
            <div className="flex items-center gap-2 text-xs">
              <span className={cn(
                "px-1.5 py-0.5 rounded capitalize",
                getBadgeRarityColor(badge.rarity)
              )}>
                {badge.rarity}
              </span>
              <span className="text-[--brand-primary] font-medium">+{badge.points} XP</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Compact horizontal badge display
export function BadgeStrip({
  earnedBadgeIds = ["safety_champion", "team_player", "event_enthusiast"],
  maxDisplay = 5,
  className
}: { earnedBadgeIds?: string[]; maxDisplay?: number; className?: string }) {
  const earnedBadges = badges.filter(b => earnedBadgeIds.includes(b.id)).slice(0, maxDisplay)
  const remaining = badges.filter(b => earnedBadgeIds.includes(b.id)).length - maxDisplay

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {earnedBadges.map((badge) => {
        const Icon = badge.icon
        return (
          <TooltipProvider key={badge.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center border",
                  getBadgeRarityColor(badge.rarity)
                )}>
                  <Icon className="h-4 w-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <span className="text-sm">{badge.name}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      })}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium">
          +{remaining}
        </div>
      )}
    </div>
  )
}
