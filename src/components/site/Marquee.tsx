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

interface OverlayText {
  title: string;
  subtitle: string;
}

const images = [...homeMarquee.images].sort(
  (a, b) => a.position - b.position,
) as HomeImage[];

/** Strict left-to-right, top-to-bottom mapping for the 21 oval images. */
const overlayText: Record<number, OverlayText> = {
  1: { title: "DibujO", subtitle: "Tintas Secas / Retratos (since 1996)" },
  2: { title: "DibujO", subtitle: "Tintas Secas / Carboncillo y Sanguinas" },
  3: { title: "RestaurO (Dorados)", subtitle: "Patrimonio Nacional (2004)" },
  4: { title: "PinturA", subtitle: "ÓleoS" },
  5: {
    title: "''Autorretrato'' (50x40x5)",
    subtitle: "EsculturA / Relieve / Barro (2006)",
  },
  6: {
    title: "Figuras de gran Formato",
    subtitle: "Escultura / Escenografía / Trabajos para TEIÓN S.L (2007)",
  },
  7: { title: "PinturA", subtitle: "AcrílicoS" },
  8: {
    title: "MuraleS",
    subtitle: "Decoración artística. Reinventando tu Espacio (since 1998)",
  },
  9: {
    title: "EsculturA",
    subtitle: "EsculturA / Moldes / Vaciados / Piedra Artificial (2006)",
  },
  10: {
    title: '"el Origen" (31x32x15)',
    subtitle:
      "EsculturA / Piedra / Talla directa / Mármol rosa de Portugal (2007)",
  },
  11: { title: "ExposicioneS", subtitle: "Pintura / Escultura (since 1983)" },
  12: {
    title: '"Venus"',
    subtitle:
      "EsculturA / Talla directa / Piedra Arenisca, Caliza, Granito (2006)",
  },
  13: { title: "ImagineríA", subtitle: "Escultura Religiosa (2008)" },
  14: { title: "EsculturA", subtitle: "Moldeados / Escayolas / Vaciados (2006)" },
  15: {
    title: "RetratoS",
    subtitle: "Acrílicos / Acuarelas / Óleos (since 1996)",
  },
  16: {
    title: '"...Pensamiento" (57x34x22)',
    subtitle: "EsculturA / Forja / Hierro batido y soldaduras (2008)",
  },
  17: { title: "EsculturA", subtitle: "Vaciados / Yesos / Resinas / Bronces" },
  18: { title: "''El Puente''", subtitle: "Action Painting Show (2014)" },
  19: { title: "Trofeos & Maquetas", subtitle: "Desarrollos en distintos Materiales" },
  20: {
    title: "PublicidaD",
    subtitle:
      "Cartelería / Camisetas / Logos Corporativos / Marcapáginas (since 1993)",
  },
  21: {
    title: "...ProyectoS",
    subtitle: "Próximos Eventos (Work in Progress...)",
  },
};

/** External link overrides for specific oval images (position → URL). */
const externalLinks: Record<number, string> = {
  10: "https://www.realacademiabellasartessevilla.com/?page_id=760",
  16: "https://www.realacademiabellasartessevilla.com/?page_id=760",
  18: "https://www.youtube.com/watch?v=qjOaUbRhiZM&list=PLWb-ReAsOdoWTy8nkqlyCD7Doqj0VHj02",
};

const LINK_CLASS =
  "transition-transform duration-300 group-hover/link:scale-105";

function OvalImage({
  image,
  onSelect,
}: {
  image: HomeImage;
  onSelect: (image: HomeImage) => void;
}) {
  const overlay = overlayText[image.position];
  const href = externalLinks[image.position];

  const trigger = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir enlace externo: ${image.alt}`}
      className="group/link block size-full cursor-pointer"
    >
      <img
        src={image.imageUrl}
        alt={image.alt}
        loading="lazy"
        className="size-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:blur-[3px]"
      />
      {overlay && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-[50%] bg-black/40 px-4 text-center opacity-0 backdrop-blur-[6px] transition-all duration-300 group-hover:opacity-100">
          <span
            className={`font-gallery text-balance text-base font-semibold leading-tight text-white sm:text-lg ${LINK_CLASS}`}
          >
            {overlay.title}
          </span>
          <span
            className={`font-sans text-[0.6875rem] font-medium leading-snug text-gray-200 ${LINK_CLASS}`}
          >
            {overlay.subtitle}
          </span>
        </div>
      )}
    </a>
  ) : (
    <button
      type="button"
      onClick={() => onSelect(image)}
      aria-label={`Ampliar imagen: ${image.alt}`}
      className="block size-full cursor-pointer"
    >
      <img
        src={image.imageUrl}
        alt={image.alt}
        loading="lazy"
        className="size-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:blur-[3px]"
      />
      {overlay && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-[50%] bg-black/40 px-4 text-center opacity-0 backdrop-blur-[6px] transition-all duration-300 group-hover:opacity-100">
          <span className="font-gallery text-balance text-base font-semibold leading-tight text-white sm:text-lg">
            {overlay.title}
          </span>
          <span className="font-sans text-[0.6875rem] font-medium leading-snug text-gray-200">
            {overlay.subtitle}
          </span>
        </div>
      )}
    </button>
  );

  return (
    <figure className="group relative aspect-[2/1] w-full overflow-hidden rounded-[50%] bg-muted shadow-[0_10px_40px_-18px_oklch(0_0_0/0.45)] ring-1 ring-inset ring-foreground/10">
      {trigger}
    </figure>
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
        <h2 className="font-gallery mt-4 max-w-2xl text-4xl leading-[1.2] font-semibold tracking-[-0.02em] sm:text-5xl">
          La materia se trabaja con las manos, nunca con prisa
        </h2>
      </Reveal>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
        {images.map((img) => (
          <OvalImage
            key={img.position}
            image={img}
            onSelect={(image) => setViewerIndex(image.position - 1)}
          />
        ))}
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
