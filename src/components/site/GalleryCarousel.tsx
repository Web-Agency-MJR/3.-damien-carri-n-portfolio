import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryWork } from "@/data/galleries";

const INTERVAL = 4000;

export function GalleryCarousel({
  works,
  delay = 0,
  onOpen,
}: {
  works: GalleryWork[];
  delay?: number;
  onOpen: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (paused || works.length < 2) return;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      setIndex((i) => (i + 1) % works.length);
      interval = window.setInterval(() => setIndex((i) => (i + 1) % works.length), INTERVAL);
    }, INTERVAL + delay);
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [paused, works.length, delay, index === -1]);

  if (works.length === 0) return null;
  const work = works[index];

  const step = (d: number) => setIndex((i) => (i + d + works.length) % works.length);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        setPaused(true);
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current !== null) {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }
        window.setTimeout(() => setPaused(false), 600);
      }}
    >
      <button
        onClick={() => onOpen(index)}
        aria-label={`Ver obra ${work.title}`}
        className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-sm bg-secondary/60 p-4 sm:p-6"
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={work.id}
            src={work.imageUrl}
            alt={work.title}
            width={work.width}
            height={work.height}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-4 m-auto max-h-[calc(100%-2rem)] max-w-[calc(100%-2rem)] object-contain sm:inset-6 sm:max-h-[calc(100%-3rem)] sm:max-w-[calc(100%-3rem)]"
          />
        </AnimatePresence>
      </button>

      {works.length > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={() => step(-1)}
            className="absolute top-1/2 left-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100 max-sm:opacity-100"
          >
            <ChevronLeft className="size-4" strokeWidth={1.5} />
          </button>
          <button
            aria-label="Siguiente"
            onClick={() => step(1)}
            className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100 max-sm:opacity-100"
          >
            <ChevronRight className="size-4" strokeWidth={1.5} />
          </button>
        </>
      )}

      <p className="font-serif mt-3 truncate text-center text-base">{work.title}</p>
    </div>
  );
}
