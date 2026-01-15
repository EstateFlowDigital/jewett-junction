import * as React from "react"
import { ChevronLeft, ChevronRight, Star, UserPlus } from "lucide-react"
import { DashboardCard } from "./DashboardCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SpotlightEmployee {
  id: string
  name: string
  role: string
  department: string
  photo?: string
  recognition: string
  nominatedBy?: string
}

// Mock data - will be replaced with CMS data
const mockSpotlights: SpotlightEmployee[] = [
  {
    id: "1",
    name: "Maria Garcia",
    role: "Project Manager",
    department: "Commercial Division",
    recognition: "Led the Downtown Plaza project to completion 2 weeks ahead of schedule while maintaining our highest safety standards.",
    nominatedBy: "John Smith",
  },
  {
    id: "2",
    name: "James Wilson",
    role: "Safety Coordinator",
    department: "Safety Department",
    recognition: "Implemented new safety training program that reduced incidents by 40% across all job sites.",
    nominatedBy: "Sarah Johnson",
  },
  {
    id: "3",
    name: "Emily Chen",
    role: "Senior Estimator",
    department: "Pre-Construction",
    recognition: "Developed innovative cost-saving approaches that saved clients over $2M this quarter.",
    nominatedBy: "Mike Brown",
  },
]

export function EmployeeSpotlight() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const employee = mockSpotlights[currentIndex]

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? mockSpotlights.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === mockSpotlights.length - 1 ? 0 : prev + 1
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <DashboardCard
      title="Employee Spotlight"
      description="Celebrating our team"
      action={
        <Button variant="outline" size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Nominate
        </Button>
      }
    >
      <div className="relative">
        {/* Carousel content */}
        <div className="text-center py-4">
          <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-primary/20">
            <AvatarImage src={employee.photo} alt={employee.name} />
            <AvatarFallback className="text-lg bg-primary text-primary-foreground">
              {getInitials(employee.name)}
            </AvatarFallback>
          </Avatar>

          <h4 className="font-semibold text-lg">{employee.name}</h4>
          <p className="text-sm text-muted-foreground">
            {employee.role} • {employee.department}
          </p>

          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <Star className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm italic">"{employee.recognition}"</p>
            {employee.nominatedBy && (
              <p className="text-xs text-muted-foreground mt-2">
                Nominated by {employee.nominatedBy}
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <Button variant="ghost" size="icon" onClick={goToPrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Dots indicator */}
          <div className="flex gap-1.5">
            {mockSpotlights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  index === currentIndex ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>

          <Button variant="ghost" size="icon" onClick={goToNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DashboardCard>
  )
}
