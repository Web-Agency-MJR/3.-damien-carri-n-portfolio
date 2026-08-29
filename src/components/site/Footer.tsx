import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Socials } from "./Socials";
import { OPEN_COOKIE_PREFS } from "./CookieConsent";

type Legal = { id: string; label: string; intro: string; body: { title: string; text: string }[] };

const legals: Legal[] = [
  {
    id: "cookies",
    label: "Política de cookies",
    intro:
      "Información sobre el uso de cookies en damiencarrion.com, sitio personal del artista Damien Carrión.",
    body: [
      {
        title: "¿Qué son las cookies?",
        text: "Son pequeños archivos de texto que el navegador almacena al visitar una web y que permiten recordar preferencias o medir el uso del sitio.",
      },
      {
        title: "Cookies utilizadas",
        text: "Este sitio emplea únicamente cookies técnicas necesarias para el correcto funcionamiento de la navegación y la visualización de la galería. No se utilizan cookies publicitarias ni de perfilado.",
      },
      {
        title: "Cookies de terceros",
        text: "Al reproducir contenido embebido de YouTube o al acceder a los perfiles de Instagram y LinkedIn, dichos servicios pueden instalar sus propias cookies conforme a sus políticas.",
      },
      {
        title: "Gestión y desactivación",
        text: "Puedes bloquear o eliminar las cookies desde la configuración de tu navegador. Desactivarlas puede afectar a algunas funciones del sitio.",
      },
    ],
  },
  {
    id: "privacidad",
    label: "Política de privacidad",
    intro: "Tratamiento de los datos personales facilitados a través del formulario de contacto.",
    body: [
      {
        title: "Responsable",
        text: "Damien Carrión — Andalucía, España. Contacto: damiencarrion13@gmail.com.",
      },
      {
        title: "Finalidad",
        text: "Los datos facilitados (nombre, email, asunto y mensaje) se utilizan exclusivamente para responder a consultas sobre obra, encargos, restauración o visitas al estudio.",
      },
      {
        title: "Legitimación y conservación",
        text: "La base legal es el consentimiento del interesado. Los datos se conservan el tiempo necesario para atender la consulta y las obligaciones legales derivadas.",
      },
      {
        title: "Cesiones",
        text: "No se ceden datos a terceros salvo obligación legal ni se realizan transferencias internacionales fuera de los proveedores técnicos necesarios para el envío del correo.",
      },
      {
        title: "Derechos",
        text: "Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a damiencarrion13@gmail.com, así como reclamar ante la AEPD.",
      },
    ],
  },
  {
    id: "legal",
    label: "Aviso legal",
    intro: "Condiciones generales de uso del sitio web.",
    body: [
      {
        title: "Titularidad",
        text: "Este sitio web es titularidad de Damien Carrión, artista plástico con actividad en Andalucía, España. Correo de contacto: damiencarrion13@gmail.com.",
      },
      {
        title: "Objeto",
        text: "El sitio tiene carácter informativo y divulgativo de la obra pictórica, escultórica y de dorado del artista. No constituye una tienda en línea; la disponibilidad y el precio de cada pieza se confirman por correo.",
      },
      {
        title: "Propiedad intelectual",
        text: "Todas las obras, imágenes, textos y elementos gráficos están protegidos por derechos de autor. Queda prohibida su reproducción, distribución o transformación total o parcial sin autorización expresa y por escrito del autor.",
      },
      {
        title: "Responsabilidad",
        text: "El titular no se responsabiliza del uso indebido de los contenidos ni del funcionamiento de sitios de terceros enlazados desde esta página.",
      },
      {
        title: "Legislación aplicable",
        text: "Las presentes condiciones se rigen por la legislación española y por la normativa europea aplicable en materia de protección de datos y servicios de la sociedad de la información.",
      },
    ],
  },
];

export function Footer() {
  const [open, setOpen] = useState<Legal | null>(null);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3 md:items-start">
        <div>
          <p className="font-display text-sm tracking-[0.28em] uppercase">Damien Carrión</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Estudio y portfolio del artista Damien Carrión (Burdeos, 1967): pintura matérica,
            escultura simbólica y dorado tradicional. Obra, currículum y consultas desde Andalucía,
            España.
          </p>
          <Socials className="mt-6" size="sm" />
        </div>

        <div className="md:text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Estudio de pintura, escultura y dorado
          </p>
        </div>

        <nav className="md:text-right">
          <p className="eyebrow">Legal</p>
          <ul className="mt-4 space-y-2">
            {legals.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => setOpen(l)}
                  className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-h-[80svh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{open?.label}</DialogTitle>
            <DialogDescription>{open?.intro}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {open?.body.map((b) => (
              <section key={b.title}>
                <h3 className="text-sm tracking-[0.14em] uppercase">{b.title}</h3>
                <p className="font-serif mt-2 text-base leading-relaxed text-muted-foreground">
                  {b.text}
                </p>
              </section>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
