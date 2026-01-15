import * as React from "react"
import {
  Shield,
  Users,
  Monitor,
  Megaphone,
  Building2,
  BookUser,
  FileText,
  Heart,
  ExternalLink,
} from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { cn } from "@/lib/utils"

interface QuickLink {
  title: string
  href: string
  icon: React.ElementType
  isExternal?: boolean
}

interface QuickLinkCategory {
  name: string
  links: QuickLink[]
}

const quickLinkCategories: QuickLinkCategory[] = [
  {
    name: "Safety First",
    links: [
      { title: "Safety Newsletter", href: "/safety/newsletter", icon: Shield },
      { title: "Crisis Management", href: "/safety/crisis", icon: Shield },
      { title: "Report Incident", href: "/safety/report", icon: FileText },
    ],
  },
  {
    name: "HR Resources",
    links: [
      { title: "Employee Handbook", href: "/hr/handbook", icon: FileText },
      { title: "Benefits Portal", href: "https://adp.com", icon: Heart, isExternal: true },
      { title: "Payroll / Timesheets", href: "https://adp.com", icon: Users, isExternal: true },
    ],
  },
  {
    name: "IT & Support",
    links: [
      { title: "IT Helpdesk", href: "/it-helpdesk", icon: Monitor },
      { title: "Submit Ticket", href: "/it-helpdesk/tickets", icon: FileText },
    ],
  },
  {
    name: "Marketing",
    links: [
      { title: "Brand Assets", href: "/marketing/brand-assets", icon: Megaphone },
      { title: "Signage Request", href: "/marketing/signage", icon: FileText },
    ],
  },
  {
    name: "Organization",
    links: [
      { title: "Org Chart", href: "/directory/org-chart", icon: Building2 },
      { title: "Team Contacts", href: "/directory", icon: BookUser },
    ],
  },
]

export function QuickLinksHub() {
  return (
    <DashboardCard
      title="Quick Links"
      description="Frequently used resources"
      className="col-span-full lg:col-span-2"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickLinkCategories.map((category) => (
          <div key={category.name}>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              {category.name}
            </h4>
            <ul className="space-y-2">
              {category.links.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex items-center gap-2 text-sm rounded-md px-2 py-1.5 -mx-2",
                      "hover:bg-accent hover:text-accent-foreground transition-colors"
                    )}
                  >
                    <link.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{link.title}</span>
                    {link.isExternal && (
                      <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}
