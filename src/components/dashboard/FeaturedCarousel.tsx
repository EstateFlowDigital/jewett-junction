import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface CarouselAnnouncement {
  id: string;
  name: string;
  slug?: string;
  excerpt?: string;
  imageUrl?: string;
  author?: string;
  priority?: string;
  category?: string;
}

interface FeaturedCarouselProps {
  announcements: CarouselAnnouncement[];
}

export function FeaturedCarousel({ announcements }: FeaturedCarouselProps) {
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
        playOnInit: !prefersReducedMotion,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  if (announcements.length === 0) return null;

  return (
    <div
      className="relative mb-10"
      aria-roledescription="carousel"
      aria-label="Featured announcements"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
          Featured Announcements
        </span>
        {scrollSnaps.length > 1 && (
          <div className="flex items-center gap-1.5">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? 'bg-blue-400 w-4'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex -ml-4">
          {announcements.map((announcement, index) => (
            <div
              key={announcement.id}
              className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${announcements.length}`}
            >
              <a
                href={`/jewett-junction/announcements/${announcement.slug || announcement.id}`}
                className="block h-full bg-gradient-to-br from-blue-600/60 to-purple-600/60 rounded-2xl border border-blue-500/20 overflow-hidden hover:from-blue-600/80 hover:to-purple-600/80 transition-all group"
              >
                {announcement.imageUrl ? (
                  // Fixed 16:9 window so every card's image is the same shape
                  // regardless of how wide the card is at a given breakpoint.
                  // Pair with 1600×900px uploads for a pixel-perfect fit.
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={announcement.imageUrl}
                      alt={announcement.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  // No image — show a branded megaphone motif over a dotted
                  // pattern instead of a bare initial letter, so image-less
                  // cards still read as finished. Same 16:9 window so heights
                  // stay consistent whether or not an image is set.
                  <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-blue-500/25 via-indigo-500/20 to-purple-500/25 flex items-center justify-center overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />
                    <div className="relative w-14 h-14 shrink-0 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-7 h-7 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] text-blue-200 uppercase tracking-wider font-medium">
                      {announcement.category || 'Featured'}
                    </span>
                    {announcement.priority === 'Urgent' && (
                      <span className="px-1.5 py-0.5 bg-red-500/30 text-red-300 text-[10px] rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {announcement.name}
                  </h3>
                  {announcement.excerpt && (
                    <p className="text-blue-100/80 text-sm mb-3">
                      {announcement.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-200/60">
                      {announcement.author || 'Company'}
                    </span>
                    <span className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-xs font-medium group-hover:bg-white/20 transition-colors">
                      Read More
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
