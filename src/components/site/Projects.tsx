import { Reveal } from "./Reveal";

const projects = [
  {
    title: "Restauración del retablo mayor",
    scope: "Dorado y policromía",
    text: "Intervención completa sobre talla del siglo XVIII con pan de oro de 23,75 quilates y bruñido a la ágata.",
  },
  {
    title: "Encargo escultórico público",
    scope: "Bronce · 3,2 m",
    text: "Pieza monumental para plaza urbana, desde el boceto en barro hasta la fundición y el anclaje.",
  },
  {
    title: "Serie para colección privada",
    scope: "Pintura · 6 piezas",
    text: "Conjunto matérico concebido para un espacio concreto, con paleta de tierras y carbón.",
  },
  {
    title: "Taller de oficio",
    scope: "Formación",
    text: "Programa de iniciación al dorado al agua y al modelado, en grupos reducidos en el estudio.",
  },
];

export function Projects() {
  return (
    <section id="proyectos" className="mx-auto max-w-7xl scroll-mt-32 px-6 py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">Proyectos</p>
        <h2 className="font-display mt-4 max-w-2xl text-4xl sm:text-5xl">
          Encargos, restauración y colaboraciones
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.06}>
            <article className="group h-full bg-background p-8 transition-colors duration-300 hover:bg-accent sm:p-12">
              <p className="text-[0.68rem] tracking-[0.2em] uppercase text-gold">{project.scope}</p>
              <h3 className="font-display mt-4 text-2xl sm:text-3xl">{project.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{project.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
