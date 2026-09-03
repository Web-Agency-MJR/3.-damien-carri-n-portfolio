import { useEffect, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";

import { cn } from "@/lib/utils";

type Errors = Partial<Record<"nombre" | "email" | "asunto" | "mensaje", string>>;

const fieldClass =
  "peer w-full border-0 border-b border-border bg-transparent py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold";

const quickSubjects = [
  "Obra disponible",
  "Encargo personalizado",
  "Restauración y dorado",
  "Visita al estudio",
];

export function Contact({ subject, onSubjectChange }: { subject: string; onSubjectChange: (v: string) => void }) {
  const [values, setValues] = useState({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (!subject) return;
    setHighlight(true);
    const t = setTimeout(() => setHighlight(false), 2200);
    return () => clearTimeout(t);
  }, [subject]);

  const validate = () => {
    const next: Errors = {};
    if (values.nombre.trim().length < 2) next.nombre = "Indica tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) next.email = "Introduce un email válido.";
    if (subject.trim().length < 3) next.asunto = "Indica un asunto.";
    if (values.mensaje.trim().length < 10) next.mensaje = "Escribe al menos 10 caracteres.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setValues({ nombre: "", email: "", mensaje: "" });
      onSubjectChange("");
      toast.success("Mensaje enviado", {
        description: "Gracias por escribir. Damien responderá personalmente.",
      });
    }, 900);
  };

  return (
    <section id="contacto" className="relative overflow-hidden border-t border-border scroll-mt-32">

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[0.9fr_1fr] lg:gap-24 sm:py-28">
        <Reveal>
          <p className="eyebrow">Contacto</p>
          <h2 className="mt-4 font-sans text-4xl leading-[1.1] font-light tracking-[0.04em] sm:text-6xl">
            ¿Hablamos de una pieza?
          </h2>
          <p className="font-serif mt-6 max-w-md text-lg text-muted-foreground">
            Consultas sobre obra disponible, encargos, restauración o visitas al estudio con cita
            previa.
          </p>

          <div className="mt-10 space-y-3">
            <a
              href="mailto:damiencarrion13@gmail.com"
              className="group flex items-center gap-4 rounded-sm border border-border bg-card/70 px-5 py-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_18px_40px_-28px_oklch(0_0_0/0.7)]"
            >
              <Mail className="size-4 text-gold" strokeWidth={1.5} />
              <span className="font-serif text-lg">damiencarrion13@gmail.com</span>
            </a>
            <div className="flex items-center gap-4 rounded-sm border border-border bg-card/70 px-5 py-4 backdrop-blur">
              <MapPin className="size-4 text-gold" strokeWidth={1.5} />
              <span className="font-serif text-lg">Andalucía, España</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            noValidate
            className="rounded-sm border border-border bg-card/80 p-7 backdrop-blur sm:p-10"
          >
            <div className="flex flex-wrap gap-2">
              {quickSubjects.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => onSubjectChange(q)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-[0.7rem] tracking-[0.14em] uppercase transition-all hover:-translate-y-0.5",
                    subject === q
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-gold hover:text-foreground",
                  )}
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="nombre" className="eyebrow">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    value={values.nombre}
                    onChange={(e) => setValues((v) => ({ ...v, nombre: e.target.value }))}
                    placeholder="Tu nombre"
                    className={fieldClass}
                  />
                  {errors.nombre && <p className="mt-2 text-xs text-destructive">{errors.nombre}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="eyebrow">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    placeholder="tu@email.com"
                    className={fieldClass}
                  />
                  {errors.email && <p className="mt-2 text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="asunto" className="eyebrow">
                  Asunto
                </label>
                <input
                  id="asunto"
                  value={subject}
                  onChange={(e) => onSubjectChange(e.target.value)}
                  placeholder="Motivo de tu consulta"
                  className={cn(fieldClass, highlight && "border-gold")}
                />
                {errors.asunto && <p className="mt-2 text-xs text-destructive">{errors.asunto}</p>}
              </div>

              <div>
                <label htmlFor="mensaje" className="eyebrow">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  rows={4}
                  value={values.mensaje}
                  onChange={(e) => setValues((v) => ({ ...v, mensaje: e.target.value }))}
                  placeholder="Cuéntame en qué puedo ayudarte"
                  className={cn(fieldClass, "resize-none")}
                />
                {errors.mensaje && <p className="mt-2 text-xs text-destructive">{errors.mensaje}</p>}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-[0.72rem] tracking-[0.2em] uppercase text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50"
            >
              {sending ? "Enviando..." : "Enviar mensaje"}
              <Send className="size-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </motion.button>
          </form>
        </Reveal>
      </div>

      <p className="relative mx-auto max-w-7xl px-6 pb-14 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} · Estudio de pintura, escultura y dorado
      </p>
    </section>
  );
}
