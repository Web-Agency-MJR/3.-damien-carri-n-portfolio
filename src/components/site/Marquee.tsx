import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import homeMarquee from "@/data/home-marquee.json";
import { Reveal } from "./Reveal";

interface HomeImage {
  position: number;
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
}

const images = [...homeMarquee.images].sort(
  (a, b) => a.position - b.position,
) as HomeImage[];

// Distribución intercalada: fila 1 → 1,4,7… · fila 2 → 2,5,8… · fila 3 → 3,6,9…
const rows: HomeImage[][] = [0, 1, 2].map((offset) =>
  images.filter((_, i) => i % 3 === offset),
);

function MarqueeRow({
  images: rowImages,
  direction,
  duration,
  onSelect,
}: {
  images: HomeImage[];
  direction: "left" | "right";
  duration: number;
  onSelect: (image: HomeImage) => void;
}) {
  const loop = [...rowImages, ...rowImages];

  return (
    <div className="marquee-mask group/row overflow-hidden">
      <div
        className="marquee-track flex w-max gap-4 group-hover/row:[animation-play-state:paused] sm:gap-6"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {loop.map((img, i) => (
          <figure
            key={`${img.position}-${i}`}
            className="relative size-40 shrink-0 overflow-hidden rounded-2xl bg-muted shadow-[inset_0_0_40px_-14px_oklch(0_0_0/0.5)] sm:size-52 lg:size-60"
          >
            <button
              type="button"
              onClick={() => onSelect(img)}
              aria-label={`Ampliar imagen: ${img.alt}`}
              className="block size-full cursor-pointer"
              tabIndex={i < rowImages.length ? 0 : -1}
              aria-hidden={i >= rowImages.length}
            >
              <img
                src={img.imageUrl}
                alt={img.alt}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 ease-out hover:scale-[1.04]"
              />
            </button>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
          </figure>
        ))}
      </div>
    </div>
  );
}

function HomeImageViewer({
  index,
  onOpenChange,
  onIndexChange,
}: {
  index: number | null;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}) {
  const image = index !== null ? images[index] : null;
  const total = images.length;

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndexChange((index + 1) % total);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onIndexChange]);

  const step = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + total) % total);
  };

  return (
    <Dialog open={image !== null} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[94svh] w-[94vw] max-w-4xl flex-col items-center gap-0 overflow-y-auto rounded-sm border-border bg-background p-4 sm:max-w-4xl sm:p-8">
        {image && (
          <>
            <DialogTitle className="sr-only">{image.alt}</DialogTitle>
            <DialogDescription className="sr-only">
              Visor de imagen {image.position} de {total}
            </DialogDescription>

            <div className="relative flex w-full items-center justify-center">
              <img
                key={image.position}
                src={image.imageUrl}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="max-h-[68svh] w-auto max-w-full animate-scale-in object-contain"
              />

              <button
                type="button"
                aria-label="Imagen anterior"
                onClick={() => step(-1)}
                className="absolute left-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-opacity hover:opacity-70 sm:left-2"
              >
                <ChevronLeft className="size-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Imagen siguiente"
                onClick={() => step(1)}
                className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-opacity hover:opacity-70 sm:right-2"
              >
                <ChevronRight className="size-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-6 flex w-full items-baseline justify-between gap-6 border-t border-border pt-5">
              <p className="font-serif text-base leading-relaxed sm:text-lg">
                {image.alt}
              </p>
              <span className="shrink-0 text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground">
                {image.position} / {total}
              </span>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function Marquee() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <section className="overflow-hidden border-y border-border bg-secondary/40 py-20 sm:py-28">
      <Reveal className="mx-auto mb-14 max-w-6xl px-6">
        <h2 className="mt-4 max-w-2xl font-sans text-4xl leading-tight font-light tracking-[0.04em] sm:text-5xl">
          La materia se trabaja con las manos, nunca con prisa
        </h2>
      </Reveal>

      <div className="flex flex-col gap-4 sm:gap-6">
        <MarqueeRow
          images={rows[0]!}
          direction="left"
          duration={58}
          onSelect={(img) => setViewerIndex(img.position - 1)}
        />
        <MarqueeRow
          images={rows[1]!}
          direction="right"
          duration={68}
          onSelect={(img) => setViewerIndex(img.position - 1)}
        />
        <MarqueeRow
          images={rows[2]!}
          direction="left"
          duration={50}
          onSelect={(img) => setViewerIndex(img.position - 1)}
        />
      </div>

      <HomeImageViewer
        index={viewerIndex}
        onOpenChange={(open) => {
          if (!open) setViewerIndex(null);
        }}
        onIndexChange={setViewerIndex}
      />
    </section>
  );
}
