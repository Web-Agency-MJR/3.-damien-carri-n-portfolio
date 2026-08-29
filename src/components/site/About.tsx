import portrait from "@/assets/artist-portrait.jpg";
import { Reveal } from "./Reveal";

const milestones = [
  { year: "1998", text: "Primeros años de formación en talla de madera y policromía en un taller de imaginería." },
  { year: "2004", text: "Licenciatura en Bellas Artes. Se especializa en escultura y técnicas de fundición." },
  { year: "2009", text: "Aprende el dorado al agua tradicional con bol armenio junto a maestros doradores." },
  { year: "2014", text: "Abre estudio propio: pintura, escultura y taller de dorado bajo un mismo techo." },
  { year: "2019", text: "Primera gran individual dedicada íntegramente a la serie de obra dorada." },
  { year: "2024", text: "Obra en colecciones privadas de España, Francia y México." },
];

export function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-7xl scroll-mt-32 px-6 py-20 sm:py-28">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <figure className="overflow-hidden rounded-sm bg-muted">
              <img
                src={portrait}
                alt="Damien Carrión trabajando en su estudio"
                loading="lazy"
                width={1024}
                height={1280}
                className="w-full object-cover"
              />
              <figcaption className="pt-4 text-xs tracking-[0.16em] uppercase text-muted-foreground">
                Damien Carrión en su estudio
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">Manifiesto</p>
            <h2 className="font-display mt-4 text-4xl leading-[1.1] sm:text-6xl">
              Manipulador de material artístico
            </h2>
            <div className="gold-rule mt-8 h-px w-24" />
            <div className="font-serif mt-8 space-y-6 text-lg leading-relaxed text-foreground/80 sm:text-xl">
              <p>
                “Manipulador de material artístico... un paseo por las calles de mis adentros.” No
                busco representar el mundo: busco que la materia recuerde lo que yo he sentido al
                tocarla.
              </p>
              <p>
                Trabajo la pintura como si fuera relieve, la escultura como si fuera dibujo y el oro
                como si fuera luz detenida. El barro se agrieta, el bronce se enfría, el pan de oro se
                rompe: cada material impone su carácter y mi oficio consiste en escucharlo antes de
                imponerle una forma.
              </p>
              <p>
                Lo que queda al final no es un objeto, es una emoción compartida entre quien la hizo y
                quien la mira.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-16">
            <p className="eyebrow">Trayectoria</p>
            <ol className="mt-8 border-l border-border">
              {milestones.map((m) => (
                <li key={m.year} className="relative pb-9 pl-8 last:pb-0">
                  <span className="absolute top-1.5 -left-[4.5px] size-2 rounded-full bg-gold" />
                  <p className="font-display text-xl">{m.year}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
