import { Download } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";
import cvAsset from "@/assets/cv.pdf.asset.json";

type Group = { id: string; title: string; entries: string[] };

const groups: Group[] = [
  {
    id: "formacion",
    title: "Formación Académica (Education)",
    entries: [
      "Grado en Historia del Arte, US (cursando).",
      "Técnico Superior en Artes Aplicadas de la Escultura. 2008.",
      "Técnico Superior en Artes Aplicadas de la Piedra. 2007.",
      "Técnico en Artes Aplicadas del Dorado y Policromía Artística. 2004.",
      "Plan 63. 1998.",
    ],
  },
  {
    id: "experiencia",
    title: "Experiencia Docente (Experience / Colaborations)",
    entries: [
      "Colaboración como Props Painter para “Fast&Furious 9” (#ff9), en Warner Bros Studio (Leavesden). London, 2019.",
      "Miembro adscrito. Asociación de Artesanos Multidisciplinares de Granada “La Fortaleza”, 2014.",
      "Proyecto artístico. Proyecto de investigación escultórico “Los Adoquines del Pensamiento: Un Paradigma Actual”® 2012.",
      "Exposición Colectiva de Escultura. Colectivo “ContemplArte”, IV ENCUENTRO de la Red Internacional de Escritores por la Tierra (RIET). Centro Cultural “El Brocense”, Cáceres. 2010.",
      "Co-fundador. Colectivo Artístico Contemporáneo “CONTEMPLARTE”. Sevilla, 2009.",
      "Monitor. Academia de Arte “ARTCREA” BUHAIRA. S.L. (Disciplina del Modelado, Escultura; y Moldeado y Reproducciones). Sevilla, 2008/10.",
      "Arte sacro. Taller “J. BABÍO”. Corral de Artesanos-Castellar (Sevilla), 2008.",
      "Taller de escenografía “TEIÓN”. Tomares (Sevilla), 2007.",
      "Trabajos de limpieza/restauración pictórica. Colecc. Particular Familia Barbky. Obras de L. Rivers (1850-1905). Inglaterra/Málaga, 2006.",
      "Patrimonio nacional. Primeros trabajos de limpieza desde 1942, en los Portavoces de los Púlpitos del Altar Mayor de la Catedral de Málaga, 2004.",
      "Realización de murales. Área Infantil del Hospital Materno (1000x200 cm.). Málaga, 2003/04.",
      "Arte sacro. Taller “R. R. LIÉBANA”. Limpieza y Restauración del trono de la Cofradía de “Jesús, El Rico”. Málaga, 2003.",
      "Andalucía Directo (RTVA). “Arte en la Calle”. Taller conjunto de Cerámica/Dorado de la E.AA.PP.D, (Conmemorativo a Picasso). Málaga, 2002.",
      "Fundador del sello artístico © Punto-Art, 2002.",
    ],
  },
  {
    id: "exposiciones",
    title: "Exposiciones (Exhibitions & Grants)",
    entries: [
      "Exposición de Pintura “Colectiva Arte Contemporáneo”. Galería & Atelier ABARTIUM. Barcelona, 2022.",
      "Seleccionado, LXIX Exposición Internacional de Otoño de la Real Academia de Sta. Isabel de Hungría (Secc. Escultura). Sevilla, 2020.",
      "Exposición Individual “Momentos”. De Pintura y una sola Escultura. Sala “la Revuelta”. Sevilla, 2018.",
      "Seleccionado, LIX Exposición Internacional de Otoño de la Real Academia de Sta. Isabel de Hungría (Secc. Escultura). Sevilla, 2016.",
      "Exposición Colectiva de Pintura “Miradas…”. Biblioteca Municipal “Rafael Alberti”, Camas (Sevilla). 2015.",
      "Exposición Colectiva “Día de la Solidaridad de Ciudades Patrimonio Mundial. Albaycín, artesanía de Granada”. Casa de Zafra (Granada), 2015.",
      "Exposición Colectiva de Pintura “Miradas…”, Casa de la Provincia (Sevilla). 2015.",
      "Exposición Colectiva “Día de la Solidaridad de Ciudades Patrimonio Mundial. El Albaycín: Patrimonio Abierto”. Centro de artesanía Asoc. de Artesanos “el Gallo” (Granada), 2014.",
      "Exposición Individual Virtual de Pintura/Escultura “Feelings on Space”, 2013-2020.",
      "Exposición Colectiva de Pintura. III éme Edition Festival International Tanger des Arts Plastiques. Rencontre des Arts Plastiques “Nord-Sud” (Marruecos), 2013.",
      "Seleccionado, Premio Internacional de Artes Plásticas Caja de Extremadura “OA2012” Obra Abierta (Secc. Escultura). Plasencia (Cáceres), 2012.",
      "Seleccionado, XLVIII Certamen-Exposición Nacional de Pintura y Escultura (Secc. Pintura/Escultura). Círculo de Bellas Artes de Pozoblanco (Córdoba), 2012.",
      "Seleccionado, 5º Premio UNIA de Pintura (Universidad Internacional de Andalucía). Sevilla, 2012.",
      "Seleccionado, XVII Muestra de Artes Plásticas “Al Aire Libre” (Secc. Escultura). Ciudad de Dos Hermanas (Sevilla), 2012.",
      "Premiado, LX Exposición Internacional de Otoño de la Real Academia de Sta. Isabel de Hungría (Secc. Pintura). Sevilla, 2011.",
      "Seleccionado, LIX Exposición Internacional de Otoño de la Real Academia de Sta. Isabel de Hungría (Secc. Escultura). Sevilla, 2010.",
      "Seleccionado, IX Exposición Nacional de Pintura Taurina “Ciudad del Vino”. Valdepeñas (Ciudad Real), 2010.",
      "Seleccionado, XV Muestra de Artes Plásticas “Al Aire Libre” (Secc. Escultura). Ciudad de Dos Hermanas (Sevilla), 2010.",
      "Seleccionado, XLV Certamen-Exposición Nacional de Pintura y Escultura (Secc. Escultura). Círculo de Bellas Artes de Pozoblanco (Córdoba), 2009.",
      "Seleccionado, LVII Exposición Internacional de Otoño de la Real Academia de Sta. Isabel de Hungría (Secc. Escultura). Sevilla, 2008.",
      "Seleccionado, I Certamen de Escultura. Ciudad de Atarfe (Granada), 2007.",
      "Seleccionado, IV Muestra de Escultura. Centro Cívico de las Sirenas (Sevilla), 2007.",
      "Exposición Colectiva de Pintura. Sala “La Plaza”. Fuengirola (Málaga), 2005/06.",
      "Exposición Individual de Pintura. Sala “La Plaza”. Fuengirola (Málaga), 2005.",
      "Exposición Individual y Permanente de Pintura. Sala “Mabstab”. Hamburgo (Alemania), 2004/06.",
      "Exposición Individual de Pintura, Museo Etnológico “Casa-Museo”. Mijas (Málaga), 2003.",
      "Exposición, IV CERTAMEN Internacional de Pintura “ROYAL PREMIER HOTELES”. Torremolinos (Málaga), 2003.",
      "Exposición Individual de Pintura. Sala “LA PLAZA”, Fuengirola (Málaga), 2001.",
      "II Concurso de Pintura y I de Fotografía Parque Natural “Cabo de Gata”. Níjar (Almería), 1998.",
      "Exposición Colectiva de Pintura. Artistas Noveles Galería de Arte “CARRIÓN”. Almería, 1983.",
    ],
  },
  {
    id: "colecciones",
    title: "Colecciones Particulares",
    entries: [
      "Colección privada. Sres. Kalisiak (Polonia). 2020.",
      "Colección privada. Sres. Marqueses de Méritos (Sevilla). 2011.",
      "Colección privada. Sres. Helms, Hamburgo (Alemania). 2005/6.",
      "Colección municipal. Museo Etnológico Mijas, Málaga (nº 275). 2003.",
    ],
  },
  {
    id: "ilustracion",
    title: "Ilustración / Publicidad / Trofeos",
    entries: [
      "Ilustraciones. (Gómez Barrutia, J. Reflejos. D.L.: CO-897-2012).",
      "Decorados/cartel. “LUNA ROJA ACCIÓN TEATRAL”. Casa de la Cultura, Cala del Moral (Málaga). 2005.",
      "Firmas, comercios y negocios varios…",
      "Logotipo Corporativo para la empresa “OLIVENOEL und DELIKATESSEN” (Suiza). 2016.",
      "Trofeo Conmemorativo para “ACOPROBER” (Asociación de Comerciantes y Profesionales del barrio de los Bermejales), Sevilla. 2012.",
      "Logotipo. Imagen Corporativa para la firma artística “PUNTO-ART”. 2002.",
      "Proyecto Decoración para “PLÁTANO AZUL”, San José (Almería). 1999/2000.",
      "Mural para Restaurante “BOGAVANTE” (500x100 cm.), Aguadulce (Almería). 1998.",
      "Mural para Local de Copas (500x700 cm.), Almerimar (Almería). 1998.",
      "Cartas del Menú para Restaurante “LA CUEVA”, Aguadulce (Almería). 1995.",
      "Logotipo Corporativo para “MIGUEL BERVEL” (tienda de ropa de caballero). Almería, 1993.",
    ],
  },
  {
    id: "publicaciones",
    title: "Publicaciones (Publications)",
    entries: [
      "Ponencia como artista invitado. Casa de la Provincia (Sevilla). 2013.",
      "Manual de Texto para la Academia Privada de Arte “ARTCREA” Buhaira. S.L (Sevilla). 2008/09.",
      "“Técnicas Básicas del Modelado”. (nº Expediente: SE-758-09); (nº Registro: 200999900596954); 29/06/2009.",
    ],
  },
];

export function Cv() {
  return (
    <section id="curriculum" className="border-y border-border bg-secondary/40 scroll-mt-32">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">CV</p>
          <h2 className="font-gallery mt-4 text-5xl leading-[1.2] font-semibold tracking-[-0.02em] sm:text-7xl">
            Damien Carrión
          </h2>
          <p className="font-serif mt-4 text-lg text-muted-foreground">
            Nacido en Burdeos (Francia, 1967). Vive y trabaja en Andalucía, España.
          </p>
          <a
            href={cvAsset.url}
            download="Curriculum_Vitae_Damien_Carrion.pdf"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-[0.72rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
          >
            Descargar currículum
            <Download className="size-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={1.5} />
          </a>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <Accordion type="single" collapsible defaultValue="formacion" className="w-full">
            {groups.map((group) => (
              <AccordionItem key={group.id} value={group.id} className="border-border">
                <AccordionTrigger className="font-gallery py-5 text-left text-xl leading-[1.2] font-medium tracking-[-0.02em] hover:no-underline sm:py-7 sm:text-3xl">
                  {group.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="divide-y divide-border">
                    {group.entries.map((entry) => (
                      <li
                        key={entry}
                        className="font-serif grid gap-1 py-3 text-base leading-relaxed sm:grid-cols-[1.25rem_1fr] sm:gap-4 sm:py-4 sm:text-lg"
                      >
                        <span className="text-xs tracking-[0.16em] text-gold sm:pt-2">—</span>
                        <span>{entry}</span>
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
