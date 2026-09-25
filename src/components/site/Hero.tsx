import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowDown } from "lucide-react";
const heroSculpture = "/images/hero-sculpture.jpg";

/** A fragment is a clipped window onto the same source image, offset while scattered. */
type Fragment = {
  clip: string;
  from: { x: number; y: number; r: number };
};

const fragments: Fragment[] = [
  { clip: "polygon(4% 8%, 22% 4%, 25% 27%, 6% 30%)", from: { x: -320, y: -180, r: -22 } },
  { clip: "polygon(24% 3%, 44% 6%, 42% 26%, 26% 26%)", from: { x: -140, y: -260, r: 16 } },
  { clip: "polygon(46% 5%, 66% 3%, 64% 24%, 45% 25%)", from: { x: 130, y: -290, r: -13 } },
  { clip: "polygon(68% 4%, 92% 8%, 90% 30%, 66% 27%)", from: { x: 330, y: -200, r: 19 } },
  { clip: "polygon(0% 34%, 18% 33%, 16% 58%, 0% 57%)", from: { x: -380, y: -40, r: -17 } },
  { clip: "polygon(20% 30%, 42% 30%, 41% 56%, 19% 55%)", from: { x: -260, y: 40, r: 11 } },
  { clip: "polygon(44% 29%, 63% 30%, 62% 57%, 43% 56%)", from: { x: 60, y: 90, r: -20 } },
  { clip: "polygon(65% 31%, 84% 32%, 83% 59%, 64% 58%)", from: { x: 300, y: 20, r: 14 } },
  { clip: "polygon(86% 33%, 100% 34%, 100% 62%, 85% 60%)", from: { x: 400, y: 110, r: -10 } },
  { clip: "polygon(2% 62%, 20% 61%, 22% 96%, 3% 97%)", from: { x: -340, y: 210, r: 18 } },
  { clip: "polygon(23% 63%, 44% 62%, 45% 98%, 24% 98%)", from: { x: -160, y: 300, r: -15 } },
  { clip: "polygon(46% 61%, 64% 62%, 64% 98%, 46% 99%)", from: { x: 110, y: 320, r: 12 } },
  { clip: "polygon(66% 63%, 86% 64%, 87% 98%, 65% 97%)", from: { x: 280, y: 250, r: -18 } },
  { clip: "polygon(88% 64%, 100% 65%, 100% 96%, 89% 97%)", from: { x: 420, y: 180, r: 21 } },
];

const NAME = "Damien Carrión";

function FragmentLayer({
  fragment,
  progress,
  index,
}: {
  fragment: Fragment;
  progress: MotionValue<number>;
  index: number;
}) {
  const start = 0.04 + (index % 5) * 0.02;
  const end = start + 0.5;
  const x = useTransform(progress, [start, end], [fragment.from.x, 0], { clamp: true });
  const y = useTransform(progress, [start, end], [fragment.from.y, 0], { clamp: true });
  const rotate = useTransform(progress, [start, end], [fragment.from.r, 0], { clamp: true });
  const opacity = useTransform(progress, [0, 0.12], [0.5, 1]);

  return (
    <motion.div
      aria-hidden
      style={{ x, y, rotate, opacity, clipPath: fragment.clip }}
      className="absolute inset-0"
    >
      <img
        src={heroSculpture}
        alt=""
        width={1536}
        height={1024}
        className="size-full object-cover"
      />
    </motion.div>
  );
}

export function Hero({ onExplore, onProjects }: { onExplore: () => void; onProjects: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const baseOpacity = useTransform(scrollYProgress, [0, 0.55], [0.55, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.12]);
  const hintOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  return (
    /* The tall track pins the hero: the page cannot advance past it until the
       sculpture has fully reassembled. */
    <section id="inicio" ref={ref} className="relative h-[220svh] sm:h-[320svh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-cream">
        <motion.div style={{ scale }} className="absolute inset-0">
          <motion.img
            src={heroSculpture}
            alt="Escultura fragmentada de Damien Carrión que se recompone al desplazarse"
            width={1536}
            height={1024}
            fetchPriority="high"
            className="size-full object-cover"
            style={{ opacity: baseOpacity }}
          />
          {fragments.map((fragment, i) => (
            <FragmentLayer key={i} fragment={fragment} progress={scrollYProgress} index={i} />
          ))}
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/15 to-background" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 52% 34% at 50% 52%, color-mix(in oklab, var(--background) 75%, transparent), transparent 72%)",
          }}
        />

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="eyebrow"
          >
            Pintor · Escultor · Maestro dorador
          </motion.p>

          <h1 className="font-script mt-4 flex justify-center pb-4 text-[clamp(2.6rem,11vw,9rem)] leading-[1.15] font-normal tracking-normal whitespace-nowrap">
            <span className="sr-only">{NAME}</span>
            <span aria-hidden className="inline-flex">
              {NAME.split("").map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.55, ease: "easeOut" }}
                  className="inline-block"
                >
                  {char === " " ? "\u00a0" : char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.9 }}
            className="font-serif mx-auto mt-4 max-w-xl text-lg text-foreground/70 italic sm:mt-8 sm:text-2xl"
          >
            Compartir emociones a través del Arte...
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={onExplore}
              className="group inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-3.5 text-[0.72rem] tracking-[0.22em] uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              Ver la obra
              <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={1.5} />
            </button>
            <a
              href="https://www.youtube.com/watch?v=cc0tTly2VoY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-[0.72rem] tracking-[0.22em] uppercase text-background transition-opacity hover:opacity-80"
            >
              Presentación
            </a>
            <button
              onClick={onProjects}
              className="inline-flex items-center gap-2 px-4 py-3.5 text-[0.72rem] uppercase text-foreground/80 transition-colors hover:text-foreground"
            >
              Proyectos <ArrowDown className="size-3.5" strokeWidth={1.5} />
            </button>
          </motion.div>
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="eyebrow absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          Obra recompuesta
        </motion.p>
      </div>
    </section>
  );
}
