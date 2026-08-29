import { processImages } from "@/data/artworks";
import { Reveal } from "./Reveal";

type RowProps = {
  images: string[];
  direction: "left" | "right";
  duration: number;
};

function MarqueeRow({ images, direction, duration }: RowProps) {
  const loop = [...images, ...images];

  return (
    <div className="marquee-mask group/row overflow-hidden">
      <div
        className="marquee-track flex w-max gap-4 group-hover/row:[animation-play-state:paused] sm:gap-6"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {loop.map((src, i) => (
          <figure
            key={`${src}-${i}`}
            className="relative size-40 shrink-0 overflow-hidden rounded-2xl bg-muted shadow-[inset_0_0_40px_-14px_oklch(0_0_0/0.5)] sm:size-52 lg:size-60"
          >
            <img
              src={src}
              alt="Damien Carrión trabajando en el taller"
              loading="lazy"
              width={900}
              height={900}
              className="size-full object-cover grayscale transition-[filter,transform] duration-700 hover:scale-[1.04] hover:grayscale-0"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
          </figure>
        ))}
      </div>
    </div>
  );
}

function rotate(items: string[], by: number) {
  return [...items.slice(by), ...items.slice(0, by)];
}

export function Marquee() {
  return (
    <section className="overflow-hidden border-y border-border bg-secondary/40 py-20 sm:py-28">
      <Reveal className="mx-auto mb-14 max-w-6xl px-6">
        <p className="eyebrow">El artista en el taller</p>
        <h2 className="font-display mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">
          La materia se trabaja con las manos, nunca con prisa
        </h2>
      </Reveal>

      <div className="flex flex-col gap-4 sm:gap-6">
        <MarqueeRow images={processImages} direction="left" duration={58} />
        <MarqueeRow images={rotate(processImages, 3)} direction="right" duration={68} />
        <MarqueeRow images={rotate(processImages, 5)} direction="left" duration={50} />
      </div>
    </section>
  );
}
