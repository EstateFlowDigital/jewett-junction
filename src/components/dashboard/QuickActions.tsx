import * as React from "react"
import {
  FileText,
  Calendar,
  Users,
  HelpCircle,
  BookOpen,
  Gift
} from "lucide-react"

const actions = [
  { label: "Submit Report", icon: FileText, href: "/jewett-junction/safety/report" },
  { label: "View Calendar", icon: Calendar, href: "/jewett-junction/events" },
  { label: "Directory", icon: Users, href: "/jewett-junction/directory" },
  { label: "IT Help", icon: HelpCircle, href: "/jewett-junction/it-helpdesk" },
  { label: "Training", icon: BookOpen, href: "/jewett-junction/resources" },
  { label: "Refer Friend", icon: Gift, href: "/jewett-junction/careers" },
]

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <a
            key={action.label}
            href={action.href}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all shadow-sm"
          >
            <Icon className="h-4 w-4 text-gray-400" />
            {action.label}
          </a>
        )
      })}
    </div>
  )
}
