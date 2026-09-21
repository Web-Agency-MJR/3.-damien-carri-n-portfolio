import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header, type NavTarget } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Gallery } from "@/components/site/Gallery";
import { About } from "@/components/site/About";
import { Cv } from "@/components/site/Cv";
import { Contact } from "@/components/site/Contact";
import { CookieConsent } from "@/components/site/CookieConsent";
import { galleries, type GalleryWork } from "@/data/galleries";

const title = "Damien Carrión — Pintor, Escultor y Maestro Dorador";
const description =
  "Obra de Damien Carrión: pintura matérica, escultura en bronce y mármol y dorado al pan de oro. Portfolio, exposiciones y consultas de obra disponible.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  const [filter, setFilter] = useState<string>("gallery-1");
  const [subject, setSubject] = useState("");

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleNavigate = useCallback(
    (item: NavTarget) => {
      if (item.tab) setFilter(galleries.some((g) => g.id === item.tab) ? item.tab : "gallery-1");
      scrollTo(item.section);
    },
    [scrollTo],
  );

  const handleInquire = useCallback(
    (work: GalleryWork) => {
      setSubject(`Consulta sobre: ${work.title}`);
      window.setTimeout(() => scrollTo("contacto"), 120);
    },
    [scrollTo],
  );

  return (
    <div className="brick-wall min-h-screen">
      <Header onNavigate={handleNavigate} />
      <main>
        <Hero onExplore={() => scrollTo("obra")} />
        <Marquee />
        <About />
        <Gallery filter={filter} onFilterChange={setFilter} onInquire={handleInquire} />
        <Cv />
        <Contact subject={subject} onSubjectChange={setSubject} />
      </main>
      <CookieConsent />
    </div>
  );
}
