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
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Your command center",
  },
  {
    title: "Safety",
    href: "/safety",
    icon: Shield,
    description: "4EverSafe resources",
  },
  {
    title: "HR",
    href: "/hr",
    icon: Users,
    description: "Benefits, policies, forms",
  },
  {
    title: "IT Helpdesk",
    href: "/it-helpdesk",
    icon: Monitor,
    description: "Tech support & tickets",
  },
  {
    title: "Marketing",
    href: "/marketing",
    icon: Megaphone,
    description: "Brand assets & templates",
  },
  {
    title: "Events",
    href: "/events",
    icon: Calendar,
    description: "Company calendar",
  },
  {
    title: "Culture",
    href: "/culture",
    icon: Heart,
    description: "Stories & values",
  },
  {
    title: "Careers",
    href: "/careers",
    icon: Briefcase,
    description: "Open positions & referrals",
  },
  {
    title: "Directory",
    href: "/directory",
    icon: BookUser,
    description: "Employee contacts",
  },
  {
    title: "Resources",
    href: "/resources",
    icon: FolderOpen,
    description: "Documents & links",
  },
]
