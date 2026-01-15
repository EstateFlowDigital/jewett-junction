import * as React from "react"
import { Star } from "lucide-react"

export function WelcomeSection() {
  const firstName = "Mike" // Would come from user context
  const greeting = getGreeting()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          {greeting}, {firstName}
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening at Jewett Construction today.
        </p>
      </div>

      {/* XP Badge */}
      <div className="hidden sm:flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
        <Star className="h-5 w-5" />
        <span className="font-semibold">2,450 XP</span>
        <span className="text-sm opacity-75">Level 3</span>
      </div>
    </div>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}
