import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

/**
 * Dogs of Jewett — photos people send in, managed in the admin (Dogs of
 * Jewett collection) and rotated the way the Featured Announcements carousel
 * rotates. Photos are shown in a vertical 4:5 frame because most arrive from
 * phones in portrait.
 *
 * With one or two dogs there is nothing to rotate, so they sit centred in a
 * static row instead of a carousel that can't move.
 */

export interface Dog {
  id: string;
  name?: string;
  caption?: string;
  photo?: { url: string; alt?: string };
}

const CAROUSEL_MIN = 3;

function DogCard({ dog }: { dog: Dog }) {
  return (
    <figure className="h-full rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-700">
      <div className="aspect-[4/5] w-full overflow-hidden bg-slate-900">
        <img
          src={dog.photo?.url}
          alt={dog.photo?.alt || dog.caption || dog.name || 'A Jewett dog'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {dog.caption && (
        <figcaption className="p-4 text-sm text-slate-300 leading-relaxed">{dog.caption}</figcaption>
      )}
    </figure>
  );
}

function DogsCarousel({ dogs }: { dogs: Dog[] }) {
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
        playOnInit: !prefersReducedMotion,
      }),
    ],
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

  return (
    <div aria-roledescription="carousel" aria-label="Dogs of Jewett">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex -ml-4">
          {dogs.map((dog, index) => (
            <div
              key={dog.id}
              className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] xl:flex-[0_0_25%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${dogs.length}`}
            >
              <DogCard dog={dog} />
            </div>
          ))}
        </div>
      </div>

      {scrollSnaps.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="p-3 -m-1.5 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex}
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  index === selectedIndex ? 'bg-amber-400 w-4' : 'bg-slate-600 w-2 hover:bg-slate-500'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function DogsOfJewett({ dogs }: { dogs: Dog[] }) {
  if (dogs.length === 0) return null;

  return (
    <Card id="dogs-of-jewett" className="bg-slate-800/50 border-slate-700 overflow-hidden scroll-mt-8">
      <CardHeader className="border-b border-slate-700">
        <CardTitle className="text-white flex items-center gap-2">
          <Heart className="h-5 w-5 text-amber-400" aria-hidden="true" />
          Dogs of Jewett
        </CardTitle>
        <CardDescription className="text-slate-400">The four-legged members of the team</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {dogs.length >= CAROUSEL_MIN ? (
          <DogsCarousel dogs={dogs} />
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {dogs.map((dog) => (
              <div key={dog.id} className="w-full sm:w-72">
                <DogCard dog={dog} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
