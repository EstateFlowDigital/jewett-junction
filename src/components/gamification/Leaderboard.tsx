import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Flame, TrendingUp } from "lucide-react"
import { mockLeaderboard, type LeaderboardEntry } from "@/lib/constants/gamification"

interface LeaderboardProps {
  limit?: number
  showFullList?: boolean
  className?: string
}

export function Leaderboard({ limit = 5, showFullList = false, className }: LeaderboardProps) {
  const entries = showFullList ? mockLeaderboard : mockLeaderboard.slice(0, limit)

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="h-5 w-5 text-[--brand-primary]" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.map((entry) => (
          <LeaderboardRow key={entry.userId} entry={entry} />
        ))}
        {!showFullList && (
          <a
            href="/jewett-junction/culture"
            className="block text-center text-sm text-[--brand-secondary] hover:underline pt-2"
          >
            View full leaderboard →
          </a>
        )}
      </CardContent>
    </Card>
  )
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const RankIcon = entry.rank === 1 ? Trophy : entry.rank === 2 ? Medal : entry.rank === 3 ? Award : null

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
      {/* Rank */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
        entry.rank === 1 && "bg-[--brand-primary] text-[--brand-secondary]",
        entry.rank === 2 && "bg-gray-300 text-gray-700",
        entry.rank === 3 && "bg-amber-600 text-white",
        entry.rank > 3 && "bg-gray-100 text-gray-600"
      )}>
        {RankIcon ? <RankIcon className="h-4 w-4" /> : entry.rank}
      </div>

      {/* Avatar */}
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarImage src={entry.avatar} />
        <AvatarFallback className="bg-[--brand-primary-light] text-[--brand-secondary] text-sm">
          {entry.name.split(" ").map(n => n[0]).join("")}
        </AvatarFallback>
      </Avatar>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-gray-900 truncate">{entry.name}</div>
        <div className="text-xs text-gray-500 truncate">{entry.department}</div>
      </div>

      {/* Stats */}
      <div className="text-right shrink-0">
        <div className="font-semibold text-sm text-[--brand-secondary]">
          {entry.points.toLocaleString()} XP
        </div>
        <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
          <Flame className="h-3 w-3 text-orange-500" />
          {entry.streak} day streak
        </div>
      </div>
    </div>
  )
}

// Compact version for sidebar or small spaces
export function LeaderboardMini({ className }: { className?: string }) {
  const top3 = mockLeaderboard.slice(0, 3)

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <TrendingUp className="h-4 w-4" />
        Top Performers
      </div>
      {top3.map((entry) => (
        <div key={entry.userId} className="flex items-center gap-2">
          <span className={cn(
            "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
            entry.rank === 1 && "bg-[--brand-primary] text-[--brand-secondary]",
            entry.rank === 2 && "bg-gray-300 text-gray-700",
            entry.rank === 3 && "bg-amber-600 text-white"
          )}>
            {entry.rank}
          </span>
          <span className="text-sm text-gray-700 truncate flex-1">{entry.name}</span>
          <span className="text-xs text-gray-500">{entry.points.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}
