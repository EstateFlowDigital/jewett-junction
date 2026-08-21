import * as React from 'react';
import { Trophy, Award, Star, Heart, Medal, HandHeart, Sparkles } from 'lucide-react';

/**
 * Team Wins and Recent Recognitions, shown on both Culture and the homepage.
 *
 * Extracted rather than copied so the two never drift. It is pure markup with
 * no state, so the homepage renders it with no client directive at all — the
 * blocks are server-rendered HTML there and cost nothing to hydrate, which also
 * means they keep working if an island ever fails to start.
 */

const typeConfig: Record<string, { icon: any; gradient: string }> = {
  'employee-spotlight': { icon: Star, gradient: 'from-amber-500 to-orange-500' },
  'spotlight': { icon: Star, gradient: 'from-amber-500 to-orange-500' },
  'team-win': { icon: Trophy, gradient: 'from-emerald-500 to-teal-500' },
  'win': { icon: Trophy, gradient: 'from-emerald-500 to-teal-500' },
  'recognition': { icon: Award, gradient: 'from-blue-500 to-indigo-500' },
  'core-value': { icon: Heart, gradient: 'from-pink-500 to-rose-500' },
  'milestone': { icon: Medal, gradient: 'from-purple-500 to-violet-500' },
  'community': { icon: HandHeart, gradient: 'from-cyan-500 to-blue-500' },
  'default': { icon: Sparkles, gradient: 'from-slate-500 to-slate-600' },
};

function getTypeConfig(type: string | undefined) {
  if (!type) return typeConfig['default'];
  return typeConfig[type.toLowerCase().replace(/\s+/g, '-')] || typeConfig['default'];
}

function stripHtml(html: string | undefined) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

interface Story {
  id?: string;
  slug?: string;
  name?: string;
  type?: string;
  category?: string;
  content?: string;
  excerpt?: string;
  author?: string;
}

function matches(s: Story, word: string) {
  return (
    s.type?.toLowerCase().includes(word) || s.category?.toLowerCase().includes(word)
  );
}

interface TeamWinsRecognitionsProps {
  stories: Story[];
  winsHeadline?: string;
  winsDescription?: string;
  recognitionsHeadline?: string;
  recognitionsDescription?: string;
  /** Homepage shows a link through to the full Culture page; Culture itself doesn't. */
  showViewAll?: boolean;
  limit?: number;
}

export function TeamWinsRecognitions({
  stories,
  winsHeadline = 'Team Wins',
  winsDescription = '',
  recognitionsHeadline = 'Recent Recognitions',
  recognitionsDescription = '',
  showViewAll = false,
  limit = 3,
}: TeamWinsRecognitionsProps) {
  const wins = stories.filter((s) => matches(s, 'win'));
  const recognitions = stories.filter((s) => matches(s, 'recognition'));
  const others = stories.filter(
    (s) => !matches(s, 'spotlight') && !matches(s, 'win') && !matches(s, 'recognition'),
  );

  const blocks = [
    {
      key: 'wins',
      headline: winsHeadline,
      description: winsDescription,
      Icon: Trophy,
      iconClass: 'text-emerald-400',
      hoverText: 'group-hover:text-emerald-400',
      hoverBorder: 'hover:border-emerald-500/30',
      items: wins.slice(0, limit),
      emptyIcon: Trophy,
      emptyText: 'No team wins to display yet',
    },
    {
      key: 'recognitions',
      headline: recognitionsHeadline,
      description: recognitionsDescription,
      Icon: Award,
      iconClass: 'text-blue-400',
      hoverText: 'group-hover:text-blue-400',
      hoverBorder: 'hover:border-blue-500/30',
      items: [...recognitions, ...others].slice(0, limit),
      emptyIcon: Award,
      emptyText: 'No recognitions to display yet',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {blocks.map((block) => (
        <div
          key={block.key}
          className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden flex flex-col"
        >
          <div className="p-5 border-b border-slate-700/60 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-white font-semibold flex items-center gap-2 text-sm sm:text-base">
                <block.Icon className={`h-5 w-5 shrink-0 ${block.iconClass}`} aria-hidden="true" />
                {block.headline}
              </h2>
              {block.description && (
                <p className="text-slate-400 text-sm mt-1">{block.description}</p>
              )}
            </div>
            {showViewAll && (
              <a
                href="/jewett-junction/culture"
                className="shrink-0 text-sm text-slate-400 hover:text-white transition-colors"
              >
                View All
              </a>
            )}
          </div>

          <div className="p-4 space-y-3 flex-1">
            {block.items.length > 0 ? (
              block.items.map((story, i) => {
                const config = getTypeConfig(story.type);
                return (
                  <a
                    key={story.id || story.slug || i}
                    href={`/jewett-junction/culture/${story.slug || story.id}`}
                    className={`block p-4 rounded-xl bg-slate-900/50 border border-slate-700 ${block.hoverBorder} hover:bg-slate-900/70 transition-colors group min-h-[44px]`}
                    aria-label={`Read: ${story.name}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <config.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-semibold text-white ${block.hoverText} transition-colors mb-1`}
                        >
                          {story.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {stripHtml(story.content) || story.excerpt}
                        </p>
                        {story.author && (
                          <p className="text-xs text-slate-500 mt-2">— {story.author}</p>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })
            ) : (
              <div className="text-center py-6">
                <block.emptyIcon
                  className="h-10 w-10 text-slate-600 mx-auto mb-3"
                  aria-hidden="true"
                />
                <p className="text-slate-500">{block.emptyText}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
