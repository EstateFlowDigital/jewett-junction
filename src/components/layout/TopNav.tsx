import * as React from "react"
import { Bell, Search, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-white">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <a href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[--brand-secondary] text-white font-bold text-sm">
              JJ
            </div>
            <span className="font-semibold text-lg text-gray-900">
              Jewett Junction
            </span>
          </a>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/dashboard" active>Dashboard</NavLink>
            <NavDropdown label="Resources">
              <DropdownMenuItem asChild>
                <a href="/safety">Safety</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/hr">HR</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/it-helpdesk">IT Helpdesk</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/marketing">Marketing</a>
              </DropdownMenuItem>
            </NavDropdown>
            <NavDropdown label="Community">
              <DropdownMenuItem asChild>
                <a href="/culture">Culture</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/events">Events</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/directory">Directory</a>
              </DropdownMenuItem>
            </NavDropdown>
            <NavLink href="/careers">
              Careers
              <Badge className="ml-1.5 bg-[--brand-primary] text-gray-900 text-[10px] px-1.5 py-0">
                3
              </Badge>
            </NavLink>
          </nav>
        </div>

        {/* Right: Search, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden lg:flex relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-64 rounded-md border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-1 focus:ring-gray-200"
            />
          </div>

          {/* Points */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-[--brand-primary-light] rounded-full">
            <span className="text-sm font-medium text-gray-900">1,250 XP</span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              3
            </span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                <Avatar className="h-9 w-9 border-2 border-[--brand-primary]">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-[--brand-primary] text-gray-900 font-medium">
                    JE
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>Jewett Employee</span>
                  <span className="text-xs font-normal text-gray-500">
                    employee@jewett.com
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuItem>My Badges</DropdownMenuItem>
              <DropdownMenuItem>Points History</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
        active
          ? "text-gray-900"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      )}
    >
      {children}
    </a>
  )
}

function NavDropdown({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
          {label}
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
