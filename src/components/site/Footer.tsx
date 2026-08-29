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
      "Información detallada sobre el uso de cookies y tecnologías similares en el sitio personal del artista Damien Carrión. Última actualización: enero de 2026.",
    body: [
      {
        title: "1. ¿Qué son las cookies?",
        text: "Las cookies son pequeños archivos de texto que un sitio web almacena en el navegador del visitante. Permiten recordar preferencias (idioma, consentimiento, filtros de galería), mantener la sesión de navegación y, en su caso, obtener estadísticas agregadas de uso. Junto a ellas se emplean tecnologías equivalentes como el almacenamiento local (localStorage), que este sitio utiliza para recordar tu decisión sobre cookies.",
      },
      {
        title: "2. Responsable del tratamiento",
        text: "Damien Carrión, artista plástico con actividad profesional en Andalucía, España. Correo de contacto para cualquier cuestión relativa a cookies o privacidad: damiencarrion13@gmail.com.",
      },
      {
        title: "3. Cookies estrictamente necesarias",
        text: "Son imprescindibles para que el sitio funcione y no requieren consentimiento. Incluyen la marca que guarda tu elección en el gestor de cookies, las preferencias de visualización de la galería y los mecanismos técnicos de seguridad y balanceo del proveedor de alojamiento. Caducidad habitual: de la sesión hasta 12 meses.",
      },
      {
        title: "4. Cookies de medición (opcionales)",
        text: "Si las autorizas, permiten conocer de forma agregada y anónima cuántas personas visitan el sitio, qué obras se consultan más y desde qué tipo de dispositivo. Nunca se utilizan para identificarte personalmente ni para elaborar perfiles comerciales. Puedes activarlas o desactivarlas en cualquier momento desde “Gestionar cookies”.",
      },
      {
        title: "5. Cookies de terceros y contenido embebido",
        text: "Al reproducir vídeos alojados en YouTube (Google Ireland Ltd.) o al abrir contenidos de Instagram (Meta Platforms Ireland Ltd.) y LinkedIn (LinkedIn Ireland Unlimited Company), estos proveedores pueden instalar sus propias cookies conforme a sus políticas, sobre las que el titular de este sitio no tiene control. Con tu consentimiento denegado, dicho contenido se sustituye por un enlace externo que solo se carga si decides pulsarlo.",
      },
      {
        title: "6. Base jurídica y conservación",
        text: "Las cookies necesarias se amparan en el interés legítimo del prestador (art. 22.2 LSSI). Las opcionales se instalan únicamente con tu consentimiento expreso, que se conserva durante un máximo de 24 meses, transcurridos los cuales se te volverá a solicitar.",
      },
      {
        title: "7. Cómo gestionar o revocar el consentimiento",
        text: "Puedes cambiar tu elección en cualquier momento desde el enlace “Gestionar cookies” del pie de página. Además, todos los navegadores permiten bloquear o eliminar cookies desde sus ajustes: Chrome (Configuración › Privacidad y seguridad), Firefox (Ajustes › Privacidad), Safari (Preferencias › Privacidad) y Edge (Configuración › Cookies). Desactivar las cookies necesarias puede impedir el correcto funcionamiento de algunas secciones.",
      },
      {
        title: "8. Transferencias internacionales",
        text: "Los proveedores de contenido embebido pueden tratar datos fuera del Espacio Económico Europeo amparándose en cláusulas contractuales tipo aprobadas por la Comisión Europea o en decisiones de adecuación vigentes.",
      },
    ],
  },
  {
    id: "privacidad",
    label: "Política de privacidad",
    intro:
      "Cómo se tratan los datos personales facilitados a través del formulario de contacto, del correo electrónico y de las redes sociales del artista. Última actualización: enero de 2026.",
    body: [
      {
        title: "1. Responsable",
        text: "Damien Carrión — artista plástico, Andalucía (España). Correo electrónico de contacto y para el ejercicio de derechos: damiencarrion13@gmail.com. No se ha designado Delegado de Protección de Datos por no resultar obligatorio.",
      },
      {
        title: "2. Datos que se recogen",
        text: "A través del formulario: nombre, dirección de correo electrónico, asunto y contenido del mensaje. De forma automática, el proveedor de alojamiento puede registrar la dirección IP y datos técnicos de conexión con fines de seguridad. No se solicitan categorías especiales de datos ni datos de menores de 14 años.",
      },
      {
        title: "3. Finalidades del tratamiento",
        text: "Atender consultas sobre obra disponible, encargos, restauración, dorado, colaboraciones, exposiciones o visitas al estudio; enviar presupuestos y documentación técnica de las piezas; y conservar el histórico de comunicaciones asociado a un eventual encargo.",
      },
      {
        title: "4. Base jurídica",
        text: "El consentimiento del interesado al enviar el formulario (art. 6.1.a RGPD) y, cuando la consulta deriva en un encargo, la ejecución de un contrato o de medidas precontractuales (art. 6.1.b RGPD). El cumplimiento de obligaciones fiscales y contables legitima la conservación posterior (art. 6.1.c RGPD).",
      },
      {
        title: "5. Plazos de conservación",
        text: "Los mensajes que no derivan en encargo se conservan un máximo de 12 meses desde la última comunicación. La documentación asociada a operaciones con relevancia fiscal se conserva durante los plazos legalmente exigibles (con carácter general, 6 años).",
      },
      {
        title: "6. Destinatarios y encargados",
        text: "No se ceden datos a terceros salvo obligación legal. Intervienen como encargados del tratamiento los proveedores necesarios para prestar el servicio: alojamiento web y entrega de correo electrónico, todos ellos con contrato de encargo conforme al art. 28 RGPD.",
      },
      {
        title: "7. Derechos de las personas interesadas",
        text: "Puedes solicitar el acceso a tus datos, su rectificación o supresión, la limitación u oposición al tratamiento y la portabilidad, así como retirar el consentimiento en cualquier momento, escribiendo a damiencarrion13@gmail.com e indicando el derecho que ejerces. Se responderá en el plazo máximo de un mes. Si consideras que el tratamiento no se ajusta a la normativa, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).",
      },
      {
        title: "8. Seguridad y redes sociales",
        text: "Se aplican medidas técnicas y organizativas razonables para evitar el acceso no autorizado, la pérdida o la alteración de los datos. Si interactúas con los perfiles del artista en Instagram, YouTube o LinkedIn, el tratamiento se regirá además por las políticas de dichas plataformas y por la configuración de privacidad de tu propia cuenta.",
      },
    ],
  },
  {
    id: "legal",
    label: "Aviso legal",
    intro:
      "Condiciones generales de uso, propiedad intelectual y responsabilidad relativas a este sitio web. Última actualización: enero de 2026.",
    body: [
      {
        title: "1. Datos identificativos",
        text: "Titular: Damien Carrión, artista plástico (pintura, escultura y dorado tradicional) con actividad en Andalucía, España. Correo electrónico de contacto: damiencarrion13@gmail.com. Este sitio se publica en cumplimiento del art. 10 de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).",
      },
      {
        title: "2. Objeto y ámbito",
        text: "El sitio tiene carácter informativo y divulgativo de la obra pictórica, escultórica y de dorado del artista, así como de su trayectoria y exposiciones. No constituye una tienda en línea: la disponibilidad, las dimensiones definitivas, el plazo de entrega y el precio de cada pieza se confirman siempre por correo electrónico antes de cualquier compromiso.",
      },
      {
        title: "3. Condiciones de uso",
        text: "El acceso al sitio es gratuito y atribuye la condición de usuario, que se compromete a utilizar los contenidos de forma lícita, sin dañar los sistemas, sin introducir código malicioso y sin realizar extracciones sistemáticas de imágenes o textos mediante procesos automatizados.",
      },
      {
        title: "4. Propiedad intelectual e industrial",
        text: "Todas las obras reproducidas, fotografías, textos, marcas, logotipos, el proyecto “Los Adoquines del Pensamiento”® y el sello © Punto-Art están protegidos por la legislación de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución, comunicación pública, transformación o uso en conjuntos de datos de entrenamiento, total o parcial, sin autorización expresa y por escrito del autor. Las citas con fines críticos o docentes deberán indicar autor y procedencia.",
      },
      {
        title: "5. Venta de obra y derechos del autor",
        text: "La adquisición de una obra transmite la propiedad del soporte físico, pero no los derechos de explotación, que permanecen en el autor conforme al Texto Refundido de la Ley de Propiedad Intelectual. Cada pieza se entrega con certificado de autenticidad firmado.",
      },
      {
        title: "6. Exención de responsabilidad",
        text: "El titular no se responsabiliza de las interrupciones del servicio, de los errores tipográficos u omisiones que puedan existir en los contenidos, ni del uso indebido que terceros hagan de ellos. Los colores y texturas mostrados en pantalla son orientativos y pueden variar respecto a la obra original.",
      },
      {
        title: "7. Enlaces externos",
        text: "El sitio incluye enlaces a plataformas de terceros (YouTube, Instagram, LinkedIn, instituciones y galerías). El titular no controla dichos sitios ni asume responsabilidad alguna por sus contenidos, políticas de privacidad o disponibilidad.",
      },
      {
        title: "8. Legislación aplicable y jurisdicción",
        text: "Las presentes condiciones se rigen por la legislación española y por la normativa europea aplicable en materia de protección de datos y servicios de la sociedad de la información. Para cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del titular, salvo que la normativa de consumo disponga otro fuero.",
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
