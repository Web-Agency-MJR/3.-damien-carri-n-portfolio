import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Projects } from "@/components/site/Projects";

const title = "Proyectos — Damien Carrión";
const description =
  "Nuevos proyectos de Damien Carrión: manifiestos, exposiciones y series en curso.";

export const Route = createFileRoute("/proyectos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="brick-wall min-h-screen">
      <Link
        to="/"
        className="fixed right-6 top-6 z-50 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/80 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.18em] backdrop-blur-md transition-colors hover:bg-foreground hover:text-background"
      >
        <ArrowLeft className="size-3.5" strokeWidth={1.5} />
        Volver
      </Link>
      <main className="pt-16">
        <Projects />
      </main>
    </div>
  );
}
