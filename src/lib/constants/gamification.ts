import {
  Award,
  Shield,
  Heart,
  Users,
  Star,
  Trophy,
  Zap,
  Target,
  BookOpen,
  Calendar,
  MessageCircle,
  ThumbsUp,
  type LucideIcon
} from "lucide-react"

export interface Badge {
  id: string
  name: string
  description: string
  icon: LucideIcon
  category: "safety" | "culture" | "learning" | "engagement" | "special"
  points: number
  rarity: "common" | "uncommon" | "rare" | "legendary"
  earnedAt?: Date
}

export interface PointAction {
  id: string
  name: string
  points: number
  category: string
}

export interface LeaderboardEntry {
  rank: number
  userId: string
  name: string
  department: string
  avatar?: string
  points: number
  badges: number
  streak: number
}

// Point values for different actions
export const pointActions: PointAction[] = [
  { id: "safety_report", name: "Submit Safety Report", points: 50, category: "safety" },
  { id: "safety_training", name: "Complete Safety Training", points: 100, category: "safety" },
  { id: "attend_event", name: "Attend Company Event", points: 25, category: "culture" },
  { id: "refer_employee", name: "Employee Referral", points: 500, category: "careers" },
  { id: "complete_course", name: "Complete Learning Course", points: 75, category: "learning" },
  { id: "submit_idea", name: "Submit Improvement Idea", points: 30, category: "engagement" },
  { id: "help_colleague", name: "Help a Colleague", points: 20, category: "culture" },
  { id: "anniversary", name: "Work Anniversary", points: 200, category: "special" },
  { id: "birthday", name: "Birthday Celebration", points: 50, category: "special" },
  { id: "project_complete", name: "Complete Project Milestone", points: 150, category: "work" },
]

// Available badges
export const badges: Badge[] = [
  // Safety Badges
  {
    id: "safety_champion",
    name: "Safety Champion",
    description: "Completed all safety training modules",
    icon: Shield,
    category: "safety",
    points: 500,
    rarity: "uncommon"
  },
  {
    id: "safety_reporter",
    name: "Safety Reporter",
    description: "Submitted 10 safety observations",
    icon: Target,
    category: "safety",
    points: 250,
    rarity: "common"
  },
  {
    id: "zero_incidents",
    name: "Zero Incidents Hero",
    description: "1 year without safety incidents",
    icon: Award,
    category: "safety",
    points: 1000,
    rarity: "legendary"
  },

  // Culture Badges
  {
    id: "team_player",
    name: "Team Player",
    description: "Helped 25 colleagues",
    icon: Users,
    category: "culture",
    points: 300,
    rarity: "uncommon"
  },
  {
    id: "event_enthusiast",
    name: "Event Enthusiast",
    description: "Attended 10 company events",
    icon: Calendar,
    category: "culture",
    points: 200,
    rarity: "common"
  },
  {
    id: "culture_ambassador",
    name: "Culture Ambassador",
    description: "Recognized for embodying company values",
    icon: Heart,
    category: "culture",
    points: 750,
    rarity: "rare"
  },

  // Learning Badges
  {
    id: "quick_learner",
    name: "Quick Learner",
    description: "Completed 5 courses in one month",
    icon: Zap,
    category: "learning",
    points: 400,
    rarity: "uncommon"
  },
  {
    id: "knowledge_seeker",
    name: "Knowledge Seeker",
    description: "Completed 20 learning modules",
    icon: BookOpen,
    category: "learning",
    points: 600,
    rarity: "rare"
  },

  // Engagement Badges
  {
    id: "idea_generator",
    name: "Idea Generator",
    description: "Submitted 5 improvement ideas",
    icon: MessageCircle,
    category: "engagement",
    points: 250,
    rarity: "common"
  },
  {
    id: "feedback_champion",
    name: "Feedback Champion",
    description: "Provided constructive feedback 20 times",
    icon: ThumbsUp,
    category: "engagement",
    points: 350,
    rarity: "uncommon"
  },

  // Special Badges
  {
    id: "rising_star",
    name: "Rising Star",
    description: "Top performer in first 90 days",
    icon: Star,
    category: "special",
    points: 500,
    rarity: "rare"
  },
  {
    id: "jewett_legend",
    name: "Jewett Legend",
    description: "10+ years with the company",
    icon: Trophy,
    category: "special",
    points: 2000,
    rarity: "legendary"
  },
]

// Mock leaderboard data
export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: "1", name: "Mike Johnson", department: "Field Operations", points: 4250, badges: 8, streak: 45 },
  { rank: 2, userId: "2", name: "Sarah Chen", department: "Project Management", points: 3890, badges: 7, streak: 32 },
  { rank: 3, userId: "3", name: "Carlos Rodriguez", department: "Safety", points: 3650, badges: 9, streak: 28 },
  { rank: 4, userId: "4", name: "Emily Thompson", department: "HR", points: 3420, badges: 6, streak: 21 },
  { rank: 5, userId: "5", name: "David Park", department: "Estimating", points: 3180, badges: 5, streak: 15 },
  { rank: 6, userId: "6", name: "Lisa Martinez", department: "Marketing", points: 2950, badges: 6, streak: 19 },
  { rank: 7, userId: "7", name: "James Wilson", department: "IT", points: 2780, badges: 4, streak: 12 },
  { rank: 8, userId: "8", name: "Anna Kim", department: "Finance", points: 2540, badges: 5, streak: 8 },
  { rank: 9, userId: "9", name: "Robert Brown", department: "Field Operations", points: 2320, badges: 4, streak: 14 },
  { rank: 10, userId: "10", name: "Jennifer Lee", department: "Admin", points: 2100, badges: 3, streak: 6 },
]

// Get badge rarity color
export function getBadgeRarityColor(rarity: Badge["rarity"]): string {
  switch (rarity) {
    case "common": return "bg-gray-100 text-gray-700 border-gray-300"
    case "uncommon": return "bg-green-100 text-green-700 border-green-300"
    case "rare": return "bg-blue-100 text-blue-700 border-blue-300"
    case "legendary": return "bg-amber-100 text-amber-700 border-amber-300"
    default: return "bg-gray-100 text-gray-700 border-gray-300"
  }
}

// Get badge category color
export function getBadgeCategoryColor(category: Badge["category"]): string {
  switch (category) {
    case "safety": return "bg-red-50 text-red-700"
    case "culture": return "bg-purple-50 text-purple-700"
    case "learning": return "bg-blue-50 text-blue-700"
    case "engagement": return "bg-green-50 text-green-700"
    case "special": return "bg-amber-50 text-amber-700"
    default: return "bg-gray-50 text-gray-700"
  }
}
