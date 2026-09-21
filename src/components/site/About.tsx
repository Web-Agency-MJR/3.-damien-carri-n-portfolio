const portrait = "/images/artist-portrait.jpg";
import { Reveal } from "./Reveal";
import { Socials } from "./Socials";

export function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-7xl scroll-mt-32 px-6 py-16 sm:py-28">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <figure>
              <div className="relative mx-auto aspect-[1024/1280] w-full max-w-3xl overflow-hidden shadow-[0_24px_60px_-28px_color-mix(in_oklab,var(--foreground)_70%,transparent)]">
                <img
                  src={portrait}
                  alt="Damien Carrión trabajando en su atelier"
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="size-full object-cover"
                />
              </div>
            </figure>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">Sobre mí</p>
            <h2 className="font-gallery mt-4 text-5xl leading-[1.2] font-semibold tracking-[-0.02em] sm:text-7xl">
              Comprometido con la Forma de los Sentimientos en el Espacio…
            </h2>
            <div className="gold-rule mt-8 h-px w-24" />
            <div className="font-serif mt-8 space-y-6 text-lg leading-relaxed text-foreground/80 sm:text-xl">
              <p>
                “Comprometido con la Forma de los Sentimientos en el Espacio...”. Esta es la idea.
              </p>

              <p>
                Nacido en el casco antiguo de Burdeos (Francia, 1967) y de ascendencia andaluza, se
                nos presenta a caballo entre estas dos tierras. Su primera formación vendría del
                propio atelier de Pintura de su padre, pintor artístico de profesión. Más tarde,
                pasaría por las Escuelas de Arte y Oficios de Almería, Málaga y Sevilla.
              </p>
              <p>
                En Pintura (2D) como en Escultura (3D), trabaja sobre una manufactura de Obras con
                carácter eminentemente único y original, alejado de corrientes y aires efímeros
                propios de corrientes temporales. En esta última disciplina, en la Escultura, es
                donde más simbólica se ve su obra a la par que desarrolla su Proyecto artístico
                personal “los Adoquines del Pensamiento”.
              </p>
              <p>Ayer, Hoy y Mañana, veraz, sigue buscando...</p>
            </div>

            <div className="mt-10 border-t border-border pt-8">
              <p className="font-display text-xl">Damien Carrión</p>
              <p className="mt-1 text-sm text-muted-foreground">Andalucía, España</p>
              <a
                href="mailto:damiencarrion13@gmail.com"
                className="mt-1 inline-block text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                damiencarrion13@gmail.com
              </a>
              <Socials className="mt-6" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
