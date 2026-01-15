import * as React from "react"
import { Palette, Check, ChevronDown } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface Theme {
  id: string
  name: string
  description: string
  colors: {
    primary: string
    accent: string
  }
}

const themes: Theme[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean blue tones",
    colors: { primary: "#3b82f6", accent: "#0ea5e9" }
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional navy",
    colors: { primary: "#1e40af", accent: "#1d4ed8" }
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple grayscale",
    colors: { primary: "#374151", accent: "#6b7280" }
  },
  {
    id: "warm",
    name: "Warm",
    description: "Earth tones",
    colors: { primary: "#d97706", accent: "#ea580c" }
  },
  {
    id: "dark",
    name: "Dark",
    description: "Dark mode style",
    colors: { primary: "#6366f1", accent: "#8b5cf6" }
  },
  {
    id: "patriotic",
    name: "Patriotic",
    description: "Red, white & blue",
    colors: { primary: "#dc2626", accent: "#1d4ed8" }
  },
]

interface ThemeSelectorProps {
  currentTheme?: string
}

export function ThemeSelector({ currentTheme = "modern" }: ThemeSelectorProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (themeId: string) => {
    // Navigate to the selected theme dashboard
    if (themeId === "modern") {
      window.location.href = "/dashboard"
    } else {
      window.location.href = `/dashboard/${themeId}`
    }
  }

  const activeTheme = themes.find(t => t.id === currentTheme) || themes[0]

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
        <Palette className="h-4 w-4" />
        <span className="text-sm">Theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
          <Palette className="h-4 w-4" />
          <span className="flex-1 text-left text-sm">Theme: {activeTheme.name}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Select Dashboard Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="flex gap-1">
              <div
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <div
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: theme.colors.accent }}
              />
            </div>
            <div className="flex-1">
              <div className="font-medium">{theme.name}</div>
              <div className="text-xs text-muted-foreground">{theme.description}</div>
            </div>
            {currentTheme === theme.id && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSelector
