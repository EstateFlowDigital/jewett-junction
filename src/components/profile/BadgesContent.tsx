import * as React from 'react';
import { Award, Lock, ChevronRight, Search, Filter } from 'lucide-react';
import { badges, getBadgeRarityColor, getBadgeCategoryColor, type Badge } from '@/lib/constants/gamification';

// Mock earned badges - in production this would come from API
const earnedBadgeIds = ['safety_champion', 'team_player', 'event_enthusiast'];
const badgeEarnedDates: Record<string, string> = {
  safety_champion: '2024-01-15',
  team_player: '2024-02-20',
  event_enthusiast: '2024-03-10'
};

export function BadgesContent() {
  const [filter, setFilter] = React.useState<'all' | 'earned' | 'locked'>('all');
  const [categoryFilter, setCategoryFilter] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = ['all', 'safety', 'culture', 'learning', 'engagement', 'special'];

  const filteredBadges = badges.filter((badge) => {
    const isEarned = earnedBadgeIds.includes(badge.id);
    const matchesFilter =
      filter === 'all' ||
      (filter === 'earned' && isEarned) ||
      (filter === 'locked' && !isEarned);
    const matchesCategory = categoryFilter === 'all' || badge.category === categoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesCategory && matchesSearch;
  });

  const earnedCount = badges.filter((b) => earnedBadgeIds.includes(b.id)).length;
  const totalPoints = badges
    .filter((b) => earnedBadgeIds.includes(b.id))
    .reduce((sum, b) => sum + b.points, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Award className="w-7 h-7 text-purple-400" aria-hidden="true" />
            My Badges
          </h1>
          <p className="text-slate-400">
            {earnedCount} of {badges.length} badges earned ({totalPoints.toLocaleString()} XP)
          </p>
        </div>
        <a
          href="/jewett-junction/profile"
          className="inline-flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" aria-hidden="true" />
          Back to Profile
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass rounded-xl border border-slate-800/50 p-4 text-center">
          <div className="text-2xl font-bold text-white">{earnedCount}</div>
          <div className="text-sm text-slate-400">Badges Earned</div>
        </div>
        <div className="glass rounded-xl border border-slate-800/50 p-4 text-center">
          <div className="text-2xl font-bold text-white">{badges.length - earnedCount}</div>
          <div className="text-sm text-slate-400">Badges Remaining</div>
        </div>
        <div className="glass rounded-xl border border-slate-800/50 p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">{totalPoints.toLocaleString()}</div>
          <div className="text-sm text-slate-400">XP from Badges</div>
        </div>
        <div className="glass rounded-xl border border-slate-800/50 p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {Math.round((earnedCount / badges.length) * 100)}%
          </div>
          <div className="text-sm text-slate-400">Completion</div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl border border-slate-800/50 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search badges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {(['all', 'earned', 'locked'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Filter className="w-4 h-4 text-slate-500 mt-2" aria-hidden="true" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
                categoryFilter === cat
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            earned={earnedBadgeIds.includes(badge.id)}
            earnedDate={badgeEarnedDates[badge.id]}
          />
        ))}
      </div>

      {filteredBadges.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-12 h-12 text-slate-600 mx-auto mb-4" aria-hidden="true" />
          <p className="text-slate-400">No badges match your filters</p>
        </div>
      )}
    </div>
  );
}

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
  earnedDate?: string;
}

function BadgeCard({ badge, earned, earnedDate }: BadgeCardProps) {
  const Icon = badge.icon;

  return (
    <div
      className={`glass rounded-xl border overflow-hidden transition-all ${
        earned
          ? 'border-slate-700/50 hover:border-slate-600'
          : 'border-slate-800/50 opacity-60'
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              earned ? getBadgeRarityColor(badge.rarity) : 'bg-slate-800'
            }`}
          >
            {earned ? (
              <Icon className="w-7 h-7" aria-hidden="true" />
            ) : (
              <Lock className="w-6 h-6 text-slate-500" aria-hidden="true" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{badge.name}</h3>
            <p className="text-sm text-slate-400 line-clamp-2 mt-1">{badge.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getBadgeCategoryColor(badge.category)}`}>
              {badge.category}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getBadgeRarityColor(badge.rarity)}`}>
              {badge.rarity}
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-amber-400">+{badge.points} XP</div>
            {earned && earnedDate && (
              <div className="text-xs text-slate-500">
                {new Date(earnedDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
