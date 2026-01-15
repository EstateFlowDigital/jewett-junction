import {
  LayoutDashboard,
  Shield,
  Users,
  Monitor,
  Megaphone,
  Calendar,
  Heart,
  Briefcase,
  BookUser,
  FolderOpen,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  description?: string
}

export const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/jewett-junction/dashboard",
    icon: LayoutDashboard,
    description: "Your command center",
  },
  {
    title: "Safety",
    href: "/jewett-junction/safety",
    icon: Shield,
    description: "4EverSafe resources",
  },
  {
    title: "HR",
    href: "/jewett-junction/hr",
    icon: Users,
    description: "Benefits, policies, forms",
  },
  {
    title: "IT Helpdesk",
    href: "/jewett-junction/it-helpdesk",
    icon: Monitor,
    description: "Tech support & tickets",
  },
  {
    title: "Marketing",
    href: "/jewett-junction/marketing",
    icon: Megaphone,
    description: "Brand assets & templates",
  },
  {
    title: "Events",
    href: "/jewett-junction/events",
    icon: Calendar,
    description: "Company calendar",
  },
  {
    title: "Culture",
    href: "/jewett-junction/culture",
    icon: Heart,
    description: "Stories & values",
  },
  {
    title: "Careers",
    href: "/jewett-junction/careers",
    icon: Briefcase,
    description: "Open positions & referrals",
  },
  {
    title: "Directory",
    href: "/jewett-junction/directory",
    icon: BookUser,
    description: "Employee contacts",
  },
  {
    title: "Resources",
    href: "/jewett-junction/resources",
    icon: FolderOpen,
    description: "Documents & links",
  },
]
