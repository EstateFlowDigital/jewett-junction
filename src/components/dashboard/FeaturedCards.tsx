import * as React from "react"
import { Button } from "@/components/ui/button"
import { Trophy, BookOpen, Shield } from "lucide-react"

const features = [
  {
    title: "Safety Training",
    description: "Complete your monthly safety refresher course. Stay safe, stay compliant.",
    icon: Shield,
    action: "Start Training",
    href: "/jewett-junction/safety/training",
    gradient: "from-emerald-600 to-emerald-800",
    iconBg: "bg-white/20",
  },
  {
    title: "Leaderboard",
    description: "See how you rank against your colleagues. Earn points, climb the ranks!",
    icon: Trophy,
    action: "View Rankings",
    href: "/jewett-junction/culture",
    gradient: "from-blue-600 to-blue-800",
    iconBg: "bg-white/20",
  },
  {
    title: "Learning Hub",
    description: "Explore courses, certifications, and professional development resources.",
    icon: BookOpen,
    action: "Browse Courses",
    href: "/jewett-junction/resources",
    gradient: "from-indigo-600 to-indigo-800",
    iconBg: "bg-white/20",
  },
]

export function FeaturedCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {features.map((feature) => {
        const Icon = feature.icon
        return (
          <div
            key={feature.title}
            className={`bg-gradient-to-br ${feature.gradient} rounded-2xl p-6 text-white`}
          >
            <div className={`inline-flex p-3 rounded-xl ${feature.iconBg} mb-4`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-white/80 mb-4 leading-relaxed">
              {feature.description}
            </p>
            <a href={feature.href}>
              <Button
                variant="secondary"
                className="bg-white text-gray-900 hover:bg-white/90 border-0"
              >
                {feature.action}
              </Button>
            </a>
          </div>
        )
      })}
    </div>
  )
}
