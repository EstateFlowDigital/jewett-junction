import * as React from "react"
import { Card } from "@/components/ui/card"
import { Shield, Award, Flame, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Days Without Incident",
    value: "247",
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: "Your Badges",
    value: "8",
    subtext: "of 15",
    icon: Award,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "Day Streak",
    value: "12",
    subtext: "days",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    label: "Leaderboard Rank",
    value: "#7",
    subtext: "of 156",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </span>
                  {stat.subtext && (
                    <span className="text-sm text-gray-400">{stat.subtext}</span>
                  )}
                </div>
              </div>
              <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
