import * as React from "react"
import { Check, ChevronUp } from "lucide-react"

interface Theme {
  id: string
  name: string
  description: string
  colors: string[]
}

const themes: Theme[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean & contemporary",
    colors: ["#3B82F6", "#10B981", "#F8FAFC"]
  },
  {
    id: "classic",
    name: "Classic",
    description: "Professional & traditional",
    colors: ["#1E3A5F", "#2563EB", "#F8FAFC"]
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple & elegant",
    colors: ["#292524", "#78716C", "#FAFAF9"]
  },
  {
    id: "warm",
    name: "Warm",
    description: "Friendly & inviting",
    colors: ["#F59E0B", "#EA580C", "#FFFBEB"]
  },
  {
    id: "dark",
    name: "Dark",
    description: "Modern dark mode",
    colors: ["#3B82F6", "#8B5CF6", "#0F172A"]
  },
  {
    id: "patriotic",
    name: "Patriotic",
    description: "Red, white & blue",
    colors: ["#1E3A8A", "#DC2626", "#FFFFFF"]
  }
]

interface ThemeSwitcherProps {
  currentTheme?: string
}

export function ThemeSwitcher({ currentTheme = "modern" }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentPath, setCurrentPath] = React.useState<string | null>(null)

  // Get the actual path on mount (client-side only)
  React.useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const current = themes.find(t => t.id === currentTheme) || themes[0]

  // Compute href for a theme based on current path
  const getThemeHref = (themeId: string): string => {
    if (!currentPath) return `/dashboard/${themeId}`

    const themeNames = ['modern', 'classic', 'minimal', 'warm', 'dark', 'patriotic']
    for (const themeName of themeNames) {
      if (currentPath.includes(`/${themeName}`)) {
        return currentPath.replace(`/${themeName}`, `/${themeId}`)
      }
    }
    return `/dashboard/${themeId}`
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Theme Panel */}
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Choose Theme Style</h3>
              <p className="text-sm text-gray-500">Preview different dashboard designs</p>
            </div>

            <div className="p-2 max-h-80 overflow-y-auto">
              {themes.map((theme) => {
                const isActive = theme.id === currentTheme
                const handleClick = (e: React.MouseEvent) => {
                  e.preventDefault()
                  const href = getThemeHref(theme.id)
                  // Force full page reload to ensure all styles are fresh
                  window.location.href = href
                }
                return (
                  <a
                    key={theme.id}
                    href={getThemeHref(theme.id)}
                    onClick={handleClick}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-blue-50 border-2 border-blue-500"
                        : "hover:bg-gray-50 border-2 border-transparent"
                    }`}
                  >
                    {/* Color Preview */}
                    <div className="flex -space-x-1">
                      {theme.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* Theme Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900">{theme.name}</div>
                      <div className="text-xs text-gray-500">{theme.description}</div>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </a>
                )
              })}
            </div>

            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <a
                href="/preview"
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1"
              >
                View full comparison page
              </a>
            </div>
          </div>
        </>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all ${
          isOpen
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
        }`}
      >
        {/* Current Theme Colors */}
        <div className="flex -space-x-1">
          {current.colors.slice(0, 2).map((color, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <span className="text-sm font-medium">{current.name}</span>

        <ChevronUp className={`w-4 h-4 transition-transform ${isOpen ? "" : "rotate-180"}`} />
      </button>
    </div>
  )
}
