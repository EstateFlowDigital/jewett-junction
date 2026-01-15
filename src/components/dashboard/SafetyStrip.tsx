import * as React from "react"
import { Shield, Hammer, Building } from "lucide-react"

export function SafetyStrip() {
  return (
    <div className="col-span-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl border p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* 4EverSafe Badge */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Shield className="h-7 w-7" />
          </div>
          <div>
            <h3 className="font-bold text-lg">4EverSafe</h3>
            <p className="text-sm text-muted-foreground">
              Safety is our #1 priority
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="flex-1 text-center md:text-left px-4">
          <p className="text-lg font-medium italic text-foreground/80">
            "Building Relationships Since 1972"
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Quality. Safety. Integrity. Excellence.
          </p>
        </div>

        {/* Supports the Trades Badge */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Hammer className="h-7 w-7 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Supports the Trades</h3>
            <p className="text-sm text-muted-foreground">
              Investing in our workforce
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">50+</p>
          <p className="text-xs text-muted-foreground">Years of Excellence</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">500+</p>
          <p className="text-xs text-muted-foreground">Projects Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">98%</p>
          <p className="text-xs text-muted-foreground">Client Satisfaction</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">0</p>
          <p className="text-xs text-muted-foreground">Lost Time Incidents (YTD)</p>
        </div>
      </div>
    </div>
  )
}
