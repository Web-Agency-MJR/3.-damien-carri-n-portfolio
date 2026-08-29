import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { statusLabels, type Artwork } from "@/data/artworks";
import { cn } from "@/lib/utils";

const specs = (artwork: Artwork) => [
  { label: "Técnica y soporte", value: artwork.technique },
  { label: "Dimensiones", value: artwork.dimensions },
  { label: "Año de creación", value: String(artwork.year) },
];

function statusClass(status: Artwork["status"]) {
  if (status === "available") return "border-available/40 text-available bg-available/10";
  if (status === "gallery") return "border-gold/50 text-gold bg-gold/10";
  return "border-border text-muted-foreground bg-muted";
}

export function ArtworkLightbox({
  artwork,
  onOpenChange,
  onInquire,
}: {
  artwork: Artwork | null;
  onOpenChange: (open: boolean) => void;
  onInquire: (artwork: Artwork) => void;
}) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <Dialog
      open={!!artwork}
      onOpenChange={(open) => {
        setZoomed(false);
        onOpenChange(open);
      }}
    >
      <DialogContent
        
        className="max-h-[94svh] w-[96vw] max-w-6xl gap-0 overflow-y-auto rounded-sm border-border bg-background p-0 sm:max-w-6xl"
      >
        {artwork && (
          <div className="grid lg:grid-cols-[1.4fr_1fr]">
            <div className="flex items-center justify-center overflow-hidden bg-secondary p-4 sm:p-8">
              <img
                src={artwork.imageUrl}
                alt={`${artwork.title}, ${artwork.technique}`}
                onClick={() => setZoomed((z) => !z)}
                className={cn(
                  "max-h-[70svh] w-auto object-contain transition-transform duration-500 ease-out",
                  zoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in",
                )}
              />
            </div>

            <div className="flex flex-col justify-between gap-8 p-8 sm:p-10">
              <div>
                <span
                  className={cn(
                    "inline-block rounded-full border px-3 py-1 text-[0.62rem] tracking-[0.16em] uppercase",
                    statusClass(artwork.status),
                  )}
                >
                  {statusLabels[artwork.status]}
                </span>

                <DialogTitle className="font-display mt-5 text-4xl leading-tight font-normal">
                  {artwork.title}
                </DialogTitle>
                <DialogDescription className="font-serif mt-4 text-base leading-relaxed text-muted-foreground">
                  {artwork.description ?? "Obra del estudio de Damien Carrión."}
                </DialogDescription>

                <dl className="mt-8 divide-y divide-border border-y border-border">
                  {specs(artwork).map((spec) => (
                    <div key={spec.label} className="flex items-baseline justify-between gap-6 py-3.5">
                      <dt className="text-[0.68rem] tracking-[0.16em] uppercase text-muted-foreground">
                        {spec.label}
                      </dt>
                      <dd className="text-right text-sm">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <button
                onClick={() => onInquire(artwork)}
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
