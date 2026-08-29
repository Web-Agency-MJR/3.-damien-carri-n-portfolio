import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowDown } from "lucide-react";
import heroSculpture from "@/assets/hero-sculpture.jpg";

/** A fragment is a clipped window onto the same source image, offset while scattered. */
type Fragment = {
  clip: string;
  from: { x: number; y: number; r: number };
};

const fragments: Fragment[] = [
  { clip: "polygon(4% 10%, 24% 6%, 26% 30%, 6% 32%)", from: { x: -210, y: -130, r: -15 } },
  { clip: "polygon(0% 42%, 16% 44%, 14% 76%, 0% 74%)", from: { x: -250, y: -20, r: -18 } },
  { clip: "polygon(63% 30%, 80% 32%, 78% 60%, 62% 58%)", from: { x: 190, y: 30, r: 12 } },
  { clip: "polygon(22% 70%, 38% 72%, 36% 98%, 20% 96%)", from: { x: -170, y: 120, r: 14 } },
  { clip: "polygon(64% 62%, 82% 64%, 84% 98%, 62% 96%)", from: { x: 200, y: 150, r: -9 } },
];

function FragmentLayer({ fragment, progress }: { fragment: Fragment; progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 0.75], [fragment.from.x, 0]);
  const y = useTransform(progress, [0, 0.75], [fragment.from.y, 0]);
  const rotate = useTransform(progress, [0, 0.75], [fragment.from.r, 0]);
  const opacity = useTransform(progress, [0, 0.15], [0.55, 1]);

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

export function Hero({ onExplore }: { onExplore: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const baseOpacity = useTransform(scrollYProgress, [0, 0.7], [0.6, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-cream"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        {/* assembled base, fades in as fragments converge */}
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
          <FragmentLayer key={i} fragment={fragment} progress={scrollYProgress} />
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/15 to-background" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 46% 34% at 50% 52%, color-mix(in oklab, var(--background) 72%, transparent), transparent 72%)",
        }}
      />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="eyebrow"
        >
          Pintor · Escultor · Maestro dorador
        </motion.p>

        <h1 className="paint-reveal font-display mt-6 text-[clamp(3rem,11vw,8.5rem)] leading-[0.92] font-medium tracking-tight">
          Damien Carrión
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          className="font-serif mx-auto mt-8 max-w-xl text-xl text-foreground/70 italic sm:text-2xl"
        >
          Compartir emociones a través del Arte...
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.8 }}
          onClick={onExplore}
          className="group mt-12 inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-3.5 text-[0.72rem] tracking-[0.22em] uppercase transition-colors hover:bg-foreground hover:text-background"
        >
          Ver la obra
          <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={1.5} />
        </motion.button>
      </motion.div>
    </section>
  );
}
