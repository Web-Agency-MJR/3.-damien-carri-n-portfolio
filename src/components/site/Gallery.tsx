import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Expand, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { artworks, statusLabels, type Artwork } from "@/data/artworks";
import { ArtworkLightbox } from "./ArtworkLightbox";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export const galleryFilters = [
  { value: "all", label: "Todas las Obras" },
  { value: "2D", label: "Pintura (2D)" },
  { value: "3D", label: "Escultura (3D)" },
  { value: "GOLD", label: "Dorado (Gallery V)" },
  { value: "Videos", label: "Vídeos" },
  
] as const;

function statusClass(status: Artwork["status"]) {
  if (status === "available") return "border-available/40 text-available";
  if (status === "gallery") return "border-gold/50 text-gold";
  return "border-border text-muted-foreground";
}

function GalleryCard({ artwork, onOpen, index }: { artwork: Artwork; onOpen: () => void; index: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className="group mb-6 block w-full break-inside-avoid overflow-hidden rounded-sm bg-card text-left"
    >
      <div className="relative overflow-hidden">
        {!loaded && <Skeleton className="absolute inset-0 z-10 size-full rounded-none" />}
        <img
          src={artwork.imageUrl}
          alt={`${artwork.title}, ${artwork.technique}, ${artwork.year}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={cn(
            "relative w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <h3 className="font-display text-xl text-background">{artwork.title}</h3>
          <p className="mt-1 text-xs tracking-[0.18em] uppercase text-background/70">
            {artwork.year} · {artwork.technique}
          </p>
        </div>
        <span className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <Expand className="size-3.5" strokeWidth={1.5} />
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-4 pt-3">
        <p className="font-serif text-lg">{artwork.title}</p>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-0.5 text-[0.62rem] tracking-[0.14em] uppercase",
            statusClass(artwork.status),
          )}
        >
          {statusLabels[artwork.status]}
        </span>
      </div>
    </motion.button>
  );
}

export function Gallery({
  filter,
  onFilterChange,
  onInquire,
}: {
  filter: string;
  onFilterChange: (value: string) => void;
  onInquire: (artwork: Artwork) => void;
}) {
  const [active, setActive] = useState<Artwork | null>(null);
  const [visible, setVisible] = useState(8);

  const filtered = useMemo(() => {
    if (filter === "all") return artworks;
    if (filter === "available") return artworks.filter((a) => a.status === "available");
    return artworks.filter((a) => a.category === filter);
  }, [filter]);

  const shown = filtered.slice(0, visible);

  return (
    <section id="obra" className="mx-auto max-w-7xl scroll-mt-32 px-6 py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Portfolio</p>
        <h2 className="font-display mt-4 text-4xl sm:text-5xl">Obra reunida</h2>
        <p className="font-serif mt-4 max-w-xl text-lg text-muted-foreground">
          Pintura, escultura y dorado en un mismo recorrido. Filtra por disciplina o consulta
          únicamente la obra disponible.
        </p>
      </Reveal>

      <Tabs
        value={filter}
        onValueChange={(v) => {
          onFilterChange(v);
          setVisible(8);
        }}
        className="mt-10"
      >
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
          {galleryFilters.map((f) => (
            <TabsTrigger
              key={f.value}
              value={f.value}
              className="rounded-full border border-border bg-transparent px-5 py-2 text-xs tracking-[0.12em] uppercase text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-none"
            >
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-12 gap-6 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
        {shown.map((artwork, i) => (
          <GalleryCard key={artwork.id} artwork={artwork} index={i} onOpen={() => setActive(artwork)} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="font-serif py-16 text-center text-lg text-muted-foreground">
          No hay obras en esta categoría por el momento.
        </p>
      )}

      {visible < filtered.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + 8)}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3 text-[0.72rem] tracking-[0.2em] uppercase transition-colors hover:bg-foreground hover:text-background"
          >
            <Plus className="size-3.5" strokeWidth={1.5} /> Ver más obra
          </button>
        </div>
      )}

      <ArtworkLightbox
        artwork={active}
        onOpenChange={(open) => !open && setActive(null)}
        onInquire={(artwork) => {
          setActive(null);
          onInquire(artwork);
        }}
      />
    </section>
  );
}
