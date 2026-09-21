import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const title = "Producciones PUNTO ART Presenta — Damien Carrión";
const description =
  "Presentación audiovisual de Producciones PUNTO ART sobre la obra artística de Damien Carrión.";

const textureImages = [
  "/images/process-1.jpg",
  "/images/process-2.jpg",
  "/images/process-3.jpg",
  "/images/process-4.jpg",
  "/images/process-5.jpg",
  "/images/process-6.jpg",
  "/images/process-7.jpg",
  "/images/artist-portrait.jpg",
];

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "video.other" },
      { property: "og:url", content: "https://damien-carri.lovable.app/video" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://damien-carri.lovable.app/video" }],
  }),
  component: VideoPage,
});

function VideoPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-cinema px-4 py-24 text-cinema-foreground sm:px-8 sm:py-28">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.2 }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-[-8%] grid rotate-[-3deg] grid-cols-2 gap-3 opacity-[0.08] sm:grid-cols-4 sm:gap-5">
          {[...textureImages, ...textureImages].map((image, index) => (
            <motion.div
              key={`${image}-${index}`}
              animate={reduceMotion ? undefined : { y: index % 2 === 0 ? [0, -18, 0] : [0, 18, 0] }}
              transition={{ duration: 12 + (index % 4) * 2, repeat: Infinity, ease: "easeInOut" }}
              className="min-h-44 overflow-hidden border border-cinema-foreground/10 sm:min-h-56"
            >
              <img
                src={image}
                alt=""
                width={720}
                height={540}
                className="size-full object-cover grayscale contrast-125"
              />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 bg-cinema/72" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-cinema-line/25" />
      </motion.div>

      <Link
        to="/"
        aria-label="Volver a la página principal"
        className="group absolute right-4 top-4 z-30 inline-flex items-center gap-2 border border-cinema-foreground/20 bg-cinema/70 px-4 py-2.5 text-[0.68rem] font-medium tracking-[0.18em] uppercase text-cinema-foreground backdrop-blur-md transition-colors hover:border-cinema-foreground/50 sm:right-8 sm:top-8"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.5} />
        Volver
      </Link>

      <section className="relative z-10 w-full max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.35, duration: reduceMotion ? 0 : 0.8 }}
          className="mb-7 text-center sm:mb-10"
        >
          <p className="text-[0.64rem] font-medium tracking-[0.34em] uppercase text-cinema-foreground/55 sm:text-xs">
            Producciones
          </p>
          <h1 className="font-display mt-3 text-3xl leading-[1.2] font-medium tracking-normal sm:text-5xl lg:text-6xl">
            PUNTO ART <span className="block text-cinema-foreground/72 sm:mt-1">Presenta</span>
          </h1>
          <div className="mx-auto mt-5 h-px w-24 bg-cinema-line sm:w-32" />
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 26, scale: reduceMotion ? 1 : 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.65, duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 aspect-video w-full max-w-5xl overflow-hidden rounded-sm border border-cinema-foreground/10 bg-cinema shadow-[0_0_50px_color-mix(in_oklab,var(--cinema-foreground)_5%,transparent)]"
        >
          <iframe
            src="https://www.youtube.com/embed/VKpKD18FWR8"
            title="Producciones PUNTO ART Presenta"
            className="size-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </motion.div>
      </section>
    </main>
  );
}