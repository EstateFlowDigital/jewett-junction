import * as React from 'react';
import {
  Star,
  TrendingUp,
  Trophy,
  Zap,
  ChevronRight,
  Calendar,
  Award,
  Shield,
  Users,
  BookOpen,
  MessageCircle,
  Filter
} from 'lucide-react';
import { pointActions, mockLeaderboard } from '@/lib/constants/gamification';

// Mock points history - in production this would come from API
const mockPointsHistory = [
  { id: '1', action: 'Complete Safety Training', points: 100, category: 'safety', date: '2024-01-28' },
  { id: '2', action: 'Attend Company Event', points: 25, category: 'culture', date: '2024-01-25' },
  { id: '3', action: 'Submit Improvement Idea', points: 30, category: 'engagement', date: '2024-01-22' },
  { id: '4', action: 'Help a Colleague', points: 20, category: 'culture', date: '2024-01-20' },
  { id: '5', action: 'Complete Learning Course', points: 75, category: 'learning', date: '2024-01-18' },
  { id: '6', action: 'Submit Safety Report', points: 50, category: 'safety', date: '2024-01-15' },
  { id: '7', action: 'Attend Company Event', points: 25, category: 'culture', date: '2024-01-12' },
  { id: '8', action: 'Help a Colleague', points: 20, category: 'culture', date: '2024-01-10' },
  { id: '9', action: 'Complete Project Milestone', points: 150, category: 'work', date: '2024-01-08' },
  { id: '10', action: 'Birthday Celebration', points: 50, category: 'special', date: '2024-01-05' },
];

const mockStats = {
  totalPoints: 1250,
  level: 5,
  nextLevelPoints: 1500,
  rank: 15,
  streak: 12,
  thisMonth: 545,
  lastMonth: 420
};

const categoryIcons: Record<string, React.ElementType> = {
  safety: Shield,
  culture: Users,
  learning: BookOpen,
  engagement: MessageCircle,
  work: Zap,
  special: Star,
  careers: Trophy
};

const categoryColors: Record<string, string> = {
  safety: 'text-red-400 bg-red-500/20',
  culture: 'text-purple-400 bg-purple-500/20',
  learning: 'text-blue-400 bg-blue-500/20',
  engagement: 'text-green-400 bg-green-500/20',
  work: 'text-amber-400 bg-amber-500/20',
  special: 'text-pink-400 bg-pink-500/20',
  careers: 'text-emerald-400 bg-emerald-500/20'
};

export function PointsHistoryContent() {
  const [categoryFilter, setCategoryFilter] = React.useState<string>('all');

  const categories = ['all', 'safety', 'culture', 'learning', 'engagement', 'work', 'special'];

  const filteredHistory = mockPointsHistory.filter(
    (item) => categoryFilter === 'all' || item.category === categoryFilter
  );

  const progressPercent = (mockStats.totalPoints / mockStats.nextLevelPoints) * 100;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Star className="w-7 h-7 text-amber-400" aria-hidden="true" />
            Points History
          </h1>
          <p className="text-slate-400">Track your XP earnings and activity</p>
        </div>
        <a
          href="/jewett-junction/profile"
          className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" aria-hidden="true" />
          Back to Profile
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Level Progress */}
          <div className="glass rounded-2xl border border-slate-800/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-white">Level Progress</h2>
                <p className="text-sm text-slate-400">
                  {mockStats.nextLevelPoints - mockStats.totalPoints} XP to Level {mockStats.level + 1}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{mockStats.level}</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-slate-400">{mockStats.totalPoints.toLocaleString()} XP</span>
              <span className="text-slate-400">{mockStats.nextLevelPoints.toLocaleString()} XP</span>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" aria-hidden="true" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
                  categoryFilter === cat
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* History List */}
          <div className="glass rounded-2xl border border-slate-800/50 overflow-hidden">
            <div className="p-5 border-b border-slate-700/50">
              <h2 className="font-semibold text-white">Recent Activity</h2>
            </div>
            <div className="divide-y divide-slate-700/50">
              {filteredHistory.map((item) => {
                const CategoryIcon = categoryIcons[item.category] || Star;
                const colorClass = categoryColors[item.category] || 'text-slate-400 bg-slate-500/20';

                return (
                  <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-slate-800/30 transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                      <CategoryIcon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{item.action}</p>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-amber-400">+{item.points}</span>
                      <p className="text-xs text-slate-500">XP</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="glass rounded-2xl border border-slate-800/50 p-5">
            <h3 className="font-semibold text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-amber-400" aria-hidden="true" />
                  <span className="text-sm text-slate-300">Rank</span>
                </div>
                <span className="font-semibold text-white">#{mockStats.rank}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-400" aria-hidden="true" />
                  <span className="text-sm text-slate-300">Streak</span>
                </div>
                <span className="font-semibold text-white">{mockStats.streak} days</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                  <span className="text-sm text-slate-300">This Month</span>
                </div>
                <span className="font-semibold text-emerald-400">+{mockStats.thisMonth} XP</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-400" aria-hidden="true" />
                  <span className="text-sm text-slate-300">Last Month</span>
                </div>
                <span className="font-semibold text-slate-400">+{mockStats.lastMonth} XP</span>
              </div>
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="glass rounded-2xl border border-slate-800/50 overflow-hidden">
            <div className="p-5 border-b border-slate-700/50">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" aria-hidden="true" />
                Leaderboard
              </h3>
            </div>
            <div className="p-3">
              {mockLeaderboard.slice(0, 5).map((entry) => (
                <div
                  key={entry.userId}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/30 transition-colors"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                      entry.rank === 1
                        ? 'bg-amber-500 text-white'
                        : entry.rank === 2
                        ? 'bg-slate-400 text-white'
                        : entry.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {entry.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{entry.name}</p>
                    <p className="text-xs text-slate-500">{entry.department}</p>
                  </div>
                  <div className="text-sm font-medium text-amber-400">{entry.points.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Ways to Earn */}
          <div className="glass rounded-2xl border border-slate-800/50 overflow-hidden">
            <div className="p-5 border-b border-slate-700/50">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" aria-hidden="true" />
                Ways to Earn XP
              </h3>
            </div>
            <div className="p-3 space-y-2">
              {pointActions.slice(0, 5).map((action) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/30 transition-colors"
                >
                  <span className="text-sm text-slate-300">{action.name}</span>
                  <span className="text-sm font-medium text-amber-400">+{action.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
