import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { GalleryWork } from "@/data/galleries";

export interface LightboxContext {
  works: GalleryWork[];
  index: number;
}

export function WorkLightbox({
  context,
  onOpenChange,
  onIndexChange,
  onInquire,
}: {
  context: LightboxContext | null;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
  onInquire: (work: GalleryWork) => void;
}) {
  const work = context ? (context.works[context.index] ?? null) : null;
  const total = context?.works.length ?? 0;
  const touchX = useRef<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => setZoomed(false), [work?.id]);

  useEffect(() => {
    if (!context) return;
    const { index } = context;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndexChange((index + 1) % total);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [context, total, onIndexChange]);

  const specs = work
    ? ([
        ["Técnica y soporte", work.technique],
        ["Dimensiones", work.dimensions],
        ["Año de creación", work.year],
      ] as const).filter(([, v]) => !!v)
    : [];

  const step = (delta: number) => {
    if (!context || total < 2) return;
    onIndexChange((context.index + delta + total) % total);
  };

  return (
    <Dialog open={!!work} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[94svh] w-[96vw] max-w-6xl gap-0 overflow-y-auto rounded-sm border-border bg-background p-0 sm:max-w-6xl">
        {work && (
          <div className="grid lg:grid-cols-[1.4fr_1fr]">
            <div
              className="relative flex items-center justify-center overflow-hidden bg-secondary p-4 sm:p-8"
              onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
                if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
                touchX.current = null;
              }}
            >
              <img
                key={work.id}
                src={work.imageUrl}
                alt={work.title}
                width={work.width}
                height={work.height}
                onClick={() => setZoomed((z) => !z)}
                className={`max-h-[70svh] w-auto object-contain transition-transform duration-500 ease-out ${
                  zoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                }`}
              />

              {total > 1 && (
                <>
                  <button
                    aria-label="Obra anterior"
                    onClick={() => step(-1)}
                    className="absolute left-3 flex size-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-opacity hover:opacity-70"
                  >
                    <ChevronLeft className="size-4" strokeWidth={1.5} />
                  </button>
                  <button
                    aria-label="Obra siguiente"
                    onClick={() => step(1)}
                    className="absolute right-3 flex size-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-opacity hover:opacity-70"
                  >
                    <ChevronRight className="size-4" strokeWidth={1.5} />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-col justify-between gap-8 p-8 sm:p-10">
              <div>
                {total > 1 && (
                  <span className="text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground">
                    {context!.index + 1} / {total}
                  </span>
                )}
                <DialogTitle className="font-display mt-4 text-3xl leading-tight font-normal sm:text-4xl">
                  {work.title}
                </DialogTitle>
                {work.info && (
                  <DialogDescription className="font-serif mt-4 text-base leading-relaxed text-muted-foreground">
                    {work.info}
                  </DialogDescription>
                )}

                {specs.length > 0 && (
                  <dl className="mt-8 divide-y divide-border border-y border-border">
                    {specs.map(([label, value]) => (
                      <div key={label} className="flex items-baseline justify-between gap-6 py-3.5">
                        <dt className="text-[0.68rem] tracking-[0.16em] uppercase text-muted-foreground">
                          {label}
                        </dt>
                        <dd className="text-right text-sm">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              <button
                onClick={() => onInquire(work)}
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-primary px-6 py-4 text-[0.72rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
              >
                Consultar sobre esta pieza
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
