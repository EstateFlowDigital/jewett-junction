"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  LayoutDashboard,
  Shield,
  Users,
  Monitor,
  Megaphone,
  Calendar,
  Heart,
  BookUser,
  FolderOpen,
  Lightbulb,
  HelpCircle,
  Bell,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/jewett-junction/dashboard", icon: LayoutDashboard },
  { title: "Safety", href: "/jewett-junction/safety", icon: Shield },
  { title: "HR", href: "/jewett-junction/hr", icon: Users },
  { title: "IT Helpdesk", href: "/jewett-junction/it-helpdesk", icon: Monitor },
  { title: "Marketing", href: "/jewett-junction/marketing", icon: Megaphone },
  { title: "Events", href: "/jewett-junction/events", icon: Calendar },
  { title: "Culture", href: "/jewett-junction/culture", icon: Heart },
  { title: "Directory", href: "/jewett-junction/directory", icon: BookUser },
  { title: "Resources", href: "/jewett-junction/resources", icon: FolderOpen },
];

interface MobileNavProps {
  currentTheme?: string;
  currentPath?: string;
  className?: string;
}

export function MobileNav({ currentTheme = "dark", currentPath = "", className }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // The trigger is server-rendered, so it exists and looks pressable before
  // this island hydrates. A tap in that window hit nothing and was silently
  // swallowed — on a phone over a slow connection that gap is long enough that
  // people tapped twice and concluded the button was broken.
  //
  // nav-boot.astro records a pre-hydration tap; replay it here on mount so the
  // first tap always opens the menu, however early it lands.
  React.useEffect(() => {
    const w = window as any;
    w.__jjNavReady = true;
    if (w.__jjNavPending) {
      w.__jjNavPending = false;
      setIsOpen(true);
    }
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "fixed top-4 left-4 z-50 md:hidden",
            "bg-slate-800/95 backdrop-blur-sm shadow-lg border border-slate-700",
            "hover:bg-slate-700 active:bg-slate-600",
            "h-12 w-12 rounded-xl",
            className
          )}
          aria-label="Open navigation menu"
          data-mobile-nav-trigger
        >
          <Menu className="h-6 w-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[280px] sm:w-[320px] p-0 border-r-0 bg-slate-900 border-slate-800"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex h-full flex-col bg-slate-900">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
            <a
              href="/jewett-junction/dashboard"
              className="block max-w-[170px]"
              onClick={() => setIsOpen(false)}
              aria-label="Jewett Junction home"
            >
              {/* Same transparent PNG the desktop rail uses — see SideNav.astro */}
              <img
                src="https://cdn.prod.website-files.com/67a464bc7184fcb8aacb0e8d/69f8f8155aebffd506c331d7_1777924117776-JCC-Horizontal-Small.png"
                alt="Jewett Construction"
                width={1136}
                height={224}
                className="w-full h-auto"
              />
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-2">
            <ul className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                // Dashboard lives at the bare mount root, so startsWith would
                // match every other nav item (they all begin with the mount).
                // Use strict equality for the root and prefix-match for the rest.
                const isActive = item.href === "/jewett-junction/dashboard"
                  ? currentPath === "/jewett-junction/dashboard" || currentPath === "/jewett-junction/"
                  : currentPath.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 min-h-[48px] text-sm font-medium transition-all",
                        "active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                        isActive
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      <span>{item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-800 px-3 py-2 space-y-0.5">
            <a
              href="/jewett-junction/submit-idea"
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 min-h-[48px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                currentPath.startsWith("/jewett-junction/submit-idea")
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
              )}
            >
              <Lightbulb className="h-5 w-5" aria-hidden="true" />
              <span>Submit an Idea</span>
            </a>
            <a
              href="/jewett-junction/notifications"
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 min-h-[48px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                currentPath.startsWith("/jewett-junction/notifications")
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
              )}
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              <span>Notifications</span>
            </a>
            <a
              href="/jewett-junction/help"
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-3 min-h-[48px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                currentPath.startsWith("/jewett-junction/help")
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
              )}
            >
              <HelpCircle className="h-5 w-5" aria-hidden="true" />
              <span>Help</span>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
