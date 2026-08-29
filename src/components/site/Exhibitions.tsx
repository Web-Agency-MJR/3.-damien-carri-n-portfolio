import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";

type Entry = { year: string; title: string; place: string };

const groups: { id: string; title: string; entries: Entry[] }[] = [
  {
    id: "individuales",
    title: "Exposiciones Individuales",
    entries: [
      { year: "2024", title: "Cartografías del oro", place: "Sala Alcalá 31, Madrid" },
      { year: "2022", title: "Un paseo por mis adentros", place: "Galería Nieves Fernández, Madrid" },
      { year: "2019", title: "Reliquias", place: "Centro de Arte Contemporáneo, Málaga" },
      { year: "2016", title: "Materia primera", place: "Casa de Vacas, Madrid" },
    ],
  },
  {
    id: "colectivas",
    title: "Exposiciones Colectivas",
    entries: [
      { year: "2025", title: "Escultura española hoy", place: "Fundación Barrié, A Coruña" },
      { year: "2023", title: "ARCO Madrid", place: "Stand galería invitada, IFEMA" },
      { year: "2021", title: "Oficio y materia", place: "Museo de Artes Decorativas, Sevilla" },
      { year: "2018", title: "Nuevos lenguajes del bronce", place: "Fonderia Artistica, Pietrasanta" },
    ],
  },
  {
    id: "premios",
    title: "Premios y Menciones",
    entries: [
      { year: "2024", title: "Premio Nacional de Artes Plásticas — Finalista", place: "Ministerio de Cultura" },
      { year: "2020", title: "Mención de honor en dorado tradicional", place: "Gremio de Artesanos" },
      { year: "2017", title: "Beca de residencia artística", place: "Real Academia de España en Roma" },
    ],
  },
];

export function Exhibitions() {
  return (
    <section id="curriculum" className="border-y border-border bg-secondary/40 scroll-mt-32">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Currículum</p>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">Exposiciones y reconocimientos</h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <Accordion type="single" collapsible defaultValue="individuales" className="w-full">
            {groups.map((group) => (
              <AccordionItem key={group.id} value={group.id} className="border-border">
                <AccordionTrigger className="font-display py-7 text-2xl hover:no-underline sm:text-3xl">
                  {group.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="divide-y divide-border">
                    {group.entries.map((entry) => (
                      <li
                        key={`${group.id}-${entry.year}-${entry.title}`}
                        className="grid gap-1 py-4 sm:grid-cols-[5rem_1fr_auto] sm:items-baseline sm:gap-6"
                      >
                        <span className="text-xs tracking-[0.16em] text-gold">{entry.year}</span>
                        <span className="font-serif text-lg">{entry.title}</span>
                        <span className="text-sm text-muted-foreground">{entry.place}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
