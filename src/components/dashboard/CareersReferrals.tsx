import * as React from "react"
import { Briefcase, Users, ArrowRight, DollarSign } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface JobOpening {
  id: string
  title: string
  department: string
  location: string
  type: string
}

// Mock data - will be replaced with CMS data
const mockJobs: JobOpening[] = [
  {
    id: "1",
    title: "Senior Project Manager",
    department: "Commercial",
    location: "Main Office",
    type: "Full-time",
  },
  {
    id: "2",
    title: "Safety Coordinator",
    department: "Safety",
    location: "Field",
    type: "Full-time",
  },
  {
    id: "3",
    title: "Estimator",
    department: "Pre-Construction",
    location: "Main Office",
    type: "Full-time",
  },
]

export function CareersReferrals() {
  return (
    <DashboardCard
      title="Careers & Referrals"
      description="Help us grow our team"
    >
      <div className="space-y-4">
        {/* Open positions summary */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockJobs.length}</p>
              <p className="text-xs text-muted-foreground">Open Positions</p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/jewett-junction/careers">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Job listings */}
        <div className="space-y-2">
          {mockJobs.slice(0, 3).map((job) => (
            <a
              key={job.id}
              href={`/jewett-junction/careers/${job.id}`}
              className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-accent/50 transition-colors group"
            >
              <div>
                <p className="text-sm font-medium group-hover:text-primary transition-colors">
                  {job.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {job.department} • {job.location}
                </p>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                {job.type}
              </Badge>
            </a>
          ))}
        </div>

        <Separator />

        {/* Referral CTA */}
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Referral Bonus</p>
              <p className="text-xs text-muted-foreground">
                Earn up to $1,000 for successful referrals
              </p>
            </div>
          </div>
          <Button className="w-full" size="sm">
            <Users className="mr-2 h-4 w-4" />
            Refer a Candidate
          </Button>
        </div>
      </div>
    </DashboardCard>
  )
}
