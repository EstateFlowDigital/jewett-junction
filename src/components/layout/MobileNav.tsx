"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
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
  Settings,
  Palette,
  HardHat,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Safety", href: "/safety", icon: Shield },
  { title: "HR", href: "/hr", icon: Users },
  { title: "IT Helpdesk", href: "/it-helpdesk", icon: Monitor },
  { title: "Marketing", href: "/marketing", icon: Megaphone },
  { title: "Events", href: "/events", icon: Calendar },
  { title: "Culture", href: "/culture", icon: Heart },
  { title: "Careers", href: "/careers", icon: Briefcase },
  { title: "Directory", href: "/directory", icon: BookUser },
  { title: "Resources", href: "/resources", icon: FolderOpen },
];

interface MobileNavProps {
  currentTheme?: string;
  currentPath?: string;
  className?: string;
}

export function MobileNav({ currentTheme = "modern", currentPath = "", className }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Build URLs with theme suffix
  const getThemedHref = (baseHref: string) => `${baseHref}/${currentTheme}`;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "fixed top-4 left-4 z-50 md:hidden",
            "bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200",
            "hover:bg-gray-50 active:bg-gray-100",
            "h-12 w-12 rounded-xl",
            className
          )}
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[85vw] max-w-[320px] p-0 border-r-0"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex h-full flex-col bg-white">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
            <a
              href="/"
              className="flex items-center gap-3"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <HardHat className="h-5 w-5" />
              </div>
              <span className="font-semibold text-gray-900">Jewett Junction</span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const themedHref = getThemedHref(item.href);
                const isActive = currentPath.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <a
                      href={themedHref}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                        "active:scale-[0.98]",
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-100 p-3 space-y-1">
            <a
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Palette className="h-5 w-5" />
              <span>Theme Selector</span>
            </a>
            <a
              href={`/settings/${currentTheme}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
