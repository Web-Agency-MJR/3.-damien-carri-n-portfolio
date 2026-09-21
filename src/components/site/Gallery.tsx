import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  galleries,
  galleryWorks,
  summaryWorks,
  type GalleryWork,
} from "@/data/galleries";
import { GalleryCarousel } from "./GalleryCarousel";
import { WorkLightbox, type LightboxContext } from "./WorkLightbox";
import { Reveal } from "./Reveal";

export function Gallery({
  filter,
  onFilterChange,
  onInquire,
}: {
  filter: string;
  onFilterChange: (value: string) => void;
  onInquire: (work: GalleryWork) => void;
}) {
  const [lightbox, setLightbox] = useState<LightboxContext | null>(null);

  const active = useMemo(
    () => galleries.find((g) => g.id === filter) ?? null,
    [filter],
  );
  const summary = useMemo(() => summaryWorks(5), []);

  const tabs = galleries.map((g) => ({ value: g.id, label: g.label }));

  return (
    <section id="obra" className="mx-auto max-w-7xl scroll-mt-32 px-6 py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Portfolio</p>
        <h2 className="font-gallery mt-4 text-4xl leading-[1.2] font-semibold tracking-[-0.02em] sm:text-5xl">
          Todas las obras
        </h2>
        <p className="font-serif mt-4 max-w-xl text-lg text-muted-foreground">
          Un recorrido por las galerías del atelier. Selecciona una galería para ver sus obras.
        </p>
      </Reveal>

      <Tabs value={filter} onValueChange={onFilterChange} className="mt-10">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
          {tabs.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="rounded-full border border-border bg-transparent px-5 py-2 text-xs tracking-[0.12em] uppercase text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {active ? (
        active.groups.length > 0 ? (
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2">
            {active.groups.map((group, i) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <GalleryCarousel
                  works={group.works}
                  delay={i * 550}
                  onOpen={(index) => setLightbox({ works: group.works, index })}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="font-serif py-20 text-center text-lg text-muted-foreground">
            Esta galería estará disponible próximamente.
          </p>
        )
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {summary.map((work, i) => (
            <motion.button
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox({ works: summary, index: i })}
              className="group text-left"
            >
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-sm bg-secondary/60 p-4 sm:p-6">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  width={work.width}
                  height={work.height}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <p className="font-serif mt-3 truncate text-center text-base">{work.title}</p>
            </motion.button>
          ))}
        </div>
      )}

      <WorkLightbox
        context={lightbox}
        onOpenChange={(open) => !open && setLightbox(null)}
        onIndexChange={(index) => setLightbox((c) => (c ? { ...c, index } : c))}
        onInquire={(work) => {
          setLightbox(null);
          onInquire(work);
        }}
      />
    </section>
  );
}

export { galleryWorks };
