import { Reveal } from "./Reveal";

const projects = [
  {
    image: "/images/projects-escritos.webp",
    title: "EscritoS...",
    description: "Manifiesto\nDeclaración de Intenciones.",
  },
  {
    image: "/images/projects-stains-2024.webp",
    title: 'Exhibition 2024 "Stains"',
    description: 'CANCELED by coVid-19.\n"Stains" will be the main protagonist...\n(Acrilics & Mixed Tecnic).',
  },
  {
    image: "/images/projects-registros.webp",
    title: "RegistroS...",
    description: "Certificados de Autenticidad de las obras.",
  },
  {
    image: "/images/projects-les-taches.webp",
    title: '"Les Tâches" (COMING SOON in...)',
    description: 'Exhibition 2027 "Stains"\n(acrilics & mixed tecnic).\nCoVid-19',
  },
  {
    image: "/images/projects-marketing.webp",
    title: "Marketing",
    description: "Campaña 2026/27...\nAbierto el taller para nuevas obras.",
  },
  {
    image: "/images/projects-pareidolia.webp",
    title: "2027 Expo Pareidolia SERIE (Mini-Piezas I-II)",
    description: 'Exhibition 2027 "Stains"\n(acrilics & mixed tecnic).\nCoVid-19',
  },
];

function ProjectRow({ row }: { row: typeof projects }) {
  return (
    <div className="overflow-hidden" aria-label={row.map((item) => item.title).join(", ")}>
      <div className="projects-track flex w-max hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex w-[300vw] shrink-0 sm:w-[150vw] lg:w-[min(100vw,72rem)]">
            {row.map((item) => (
              <figure key={item.image} className="w-1/3 shrink-0 px-2 sm:px-3">
                <div className="aspect-[3/4] overflow-hidden bg-secondary">
                  <img src={item.image} alt={item.title} loading="lazy" className="size-full object-contain" />
                </div>
                <figcaption className="min-h-32 border-b border-border py-5 text-center sm:min-h-36">
                  <h3 className="font-gallery text-sm font-semibold leading-snug sm:text-base">{item.title}</h3>
                  <p className="mt-2 whitespace-pre-line font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">{item.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="proyectos" className="scroll-mt-24 overflow-hidden border-y border-border bg-background/80 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <h2 className="font-gallery text-4xl font-bold leading-[1.2] sm:text-6xl">NEW PROJECTS</h2>
          <div className="gold-rule mx-auto mt-7 h-px w-28" />
        </Reveal>
        <Reveal className="mx-auto mt-12 max-w-xl sm:mt-16">
          <img
            src="/images/projects-intro.webp"
            alt="Imagen de presentación de nuevos proyectos"
            width={558}
            height={736}
            loading="lazy"
            className="mx-auto h-auto w-full object-contain"
          />
        </Reveal>
        <Reveal className="mx-auto mt-12 max-w-3xl text-center font-serif text-lg leading-relaxed text-foreground/85 sm:mt-16 sm:text-2xl">
          <p>El principal objetivo para este creativo, por encima de mucho, es lograr dotar de emoción a su producción artística, apelando al Mundo de los Sentidos y huyendo de aspectos comerciales de cualquier mercado.</p>
          <p className="mt-8">Imprimiendo a sus obras, carácter y personalidad.</p>
          <p className="mt-8">Todo un bien mayor en su búsqueda...</p>
        </Reveal>
      </div>
      <div className="mx-auto mt-16 max-w-6xl space-y-9 sm:mt-20 sm:space-y-14" aria-label="Proyectos en curso">
        <ProjectRow row={projects.slice(0, 3)} />
        <ProjectRow row={projects.slice(3, 6)} />
      </div>
    </section>
  );
}