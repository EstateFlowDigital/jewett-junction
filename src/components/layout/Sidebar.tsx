import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { mainNavItems, type NavItem } from "@/lib/constants/navigation"
import { Menu, HardHat, Settings, Palette } from "lucide-react"
import { ThemeSelector } from "./ThemeSelector"

interface SidebarProps {
  currentPath?: string
  currentTheme?: string
}

export function Sidebar({ currentPath = "", currentTheme = "modern" }: SidebarProps) {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            rounded="full"
            className="fixed top-4 left-4 z-40 md:hidden bg-white shadow-md"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <MobileSidebarContent currentPath={currentPath} currentTheme={currentTheme} />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <aside
      className="fixed left-0 top-0 z-30 h-screen w-16 bg-white border-r border-gray-100 flex flex-col"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex h-14 items-center justify-center">
        <a href="/jewett-junction/dashboard" aria-label="Jewett Junction Home" className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <HardHat className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-1 py-2 px-2" aria-label="Primary">
        {mainNavItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            isActive={currentPath === item.href || currentPath.startsWith(item.href + "/")}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="py-3 px-2 space-y-2" role="group" aria-label="Utility navigation">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <a
                href="/jewett-junction/preview"
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors mx-auto"
                aria-label="Theme Preview"
              >
                <Palette className="h-5 w-5" aria-hidden="true" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Theme Preview</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <a
                href="/jewett-junction/settings"
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors mx-auto"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" aria-hidden="true" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  )
}

interface SidebarNavItemProps {
  item: NavItem
  isActive: boolean
}

function SidebarNavItem({ item, isActive }: SidebarNavItemProps) {
  const Icon = item.icon

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <a
            href={item.href}
            aria-label={item.title}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200",
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            )}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full -ml-2" aria-hidden="true" />
            )}
          </a>
        </TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {item.title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function MobileSidebarContent({ currentPath, currentTheme }: { currentPath: string; currentTheme: string }) {
  return (
    <div className="flex h-full flex-col bg-white" role="navigation" aria-label="Mobile navigation">
      {/* Header */}
      <div className="flex h-14 items-center gap-3 border-b border-gray-100 px-4">
        <a href="/jewett-junction/dashboard" aria-label="Jewett Junction Home" className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <HardHat className="h-5 w-5" aria-hidden="true" />
        </a>
        <span className="font-semibold text-gray-900">Jewett Junction</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1" aria-label="Primary">
        {mainNavItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + "/")

          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.title}</span>
            </a>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 p-2 space-y-1" role="group" aria-label="Utility navigation">
        <ThemeSelector currentTheme={currentTheme} />
        <a
          href="/jewett-junction/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <Settings className="h-5 w-5" aria-hidden="true" />
          <span>Settings</span>
        </a>
      </div>
    </div>
  )
}
