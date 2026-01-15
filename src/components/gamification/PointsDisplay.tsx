import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, TrendingUp, Zap, Target } from "lucide-react"

interface PointsDisplayProps {
  points?: number
  level?: number
  nextLevelPoints?: number
  className?: string
}

// Calculate level from points
function calculateLevel(points: number): { level: number; currentLevelPoints: number; nextLevelPoints: number } {
  // Level thresholds: 0-500 = L1, 501-1500 = L2, 1501-3000 = L3, etc.
  const levels = [
    { threshold: 0, name: "Newcomer" },
    { threshold: 500, name: "Contributor" },
    { threshold: 1500, name: "Achiever" },
    { threshold: 3000, name: "Expert" },
    { threshold: 5000, name: "Master" },
    { threshold: 8000, name: "Champion" },
    { threshold: 12000, name: "Legend" },
  ]

  let currentLevel = 1
  let currentThreshold = 0
  let nextThreshold = 500

  for (let i = 0; i < levels.length; i++) {
    if (points >= levels[i].threshold) {
      currentLevel = i + 1
      currentThreshold = levels[i].threshold
      nextThreshold = levels[i + 1]?.threshold || levels[i].threshold + 5000
    }
  }

  return {
    level: currentLevel,
    currentLevelPoints: currentThreshold,
    nextLevelPoints: nextThreshold
  }
}

export function PointsDisplay({ points = 2450, className }: PointsDisplayProps) {
  const { level, currentLevelPoints, nextLevelPoints } = calculateLevel(points)
  const progress = ((points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100
  const pointsToNext = nextLevelPoints - points

  const levelNames = ["", "Newcomer", "Contributor", "Achiever", "Expert", "Master", "Champion", "Legend"]

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Star className="h-5 w-5 text-[--brand-primary]" />
          My Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* XP Total */}
        <div className="text-center">
          <div className="text-4xl font-bold text-[--brand-secondary]">
            {points.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Total XP Points</div>
        </div>

        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">
              Level {level}: {levelNames[level]}
            </span>
            <span className="text-gray-500">
              {pointsToNext.toLocaleString()} XP to next level
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[--brand-primary] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{currentLevelPoints.toLocaleString()}</span>
            <span>{nextLevelPoints.toLocaleString()}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <Zap className="h-4 w-4 text-orange-500 mx-auto mb-1" />
            <div className="text-lg font-semibold text-gray-900">12</div>
            <div className="text-xs text-gray-500">Day Streak</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <Target className="h-4 w-4 text-blue-500 mx-auto mb-1" />
            <div className="text-lg font-semibold text-gray-900">3</div>
            <div className="text-xs text-gray-500">Badges</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <TrendingUp className="h-4 w-4 text-green-500 mx-auto mb-1" />
            <div className="text-lg font-semibold text-gray-900">#7</div>
            <div className="text-xs text-gray-500">Rank</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Compact version for TopNav or header
export function PointsBadge({ points = 2450, className }: { points?: number; className?: string }) {
  const { level } = calculateLevel(points)

  return (
    <div className={cn(
      "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[--brand-primary] text-[--brand-secondary]",
      className
    )}>
      <Star className="h-3.5 w-3.5" />
      <span className="text-sm font-semibold">{points.toLocaleString()}</span>
      <span className="text-xs opacity-75">L{level}</span>
    </div>
  )
}

// Mini inline display
export function PointsInline({ points = 2450, className }: { points?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm font-medium", className)}>
      <Star className="h-4 w-4 text-[--brand-primary]" />
      <span>{points.toLocaleString()} XP</span>
    </span>
  )
}
