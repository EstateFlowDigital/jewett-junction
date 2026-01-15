import * as React from "react"
import { cn } from "@/lib/utils"
import { Sidebar } from "./Sidebar"

interface AppShellProps {
  children: React.ReactNode
  currentPath?: string
  currentTheme?: string
}

export function AppShell({ children, currentPath, currentTheme = "modern" }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar currentPath={currentPath} currentTheme={currentTheme} />
      <main className="pl-0 md:pl-16 min-h-screen">
        <div className="max-w-6xl mx-auto p-6 md:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
