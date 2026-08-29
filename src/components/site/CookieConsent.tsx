import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const KEY = "dc-cookie-consent";
export const OPEN_COOKIE_PREFS = "dc:open-cookie-prefs";

type Prefs = { necessary: true; analytics: boolean; embeds: boolean };

const DEFAULTS: Prefs = { necessary: true, analytics: false, embeds: false };

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setPrefs({ ...DEFAULTS, ...JSON.parse(raw) });
      else setVisible(true);
    } catch {
      setVisible(true);
    }
    const openPrefs = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_PREFS, openPrefs);
    return () => window.removeEventListener(OPEN_COOKIE_PREFS, openPrefs);
  }, []);

  const save = (next: Prefs) => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* almacenamiento no disponible */
    }
    setPrefs(next);
    setVisible(false);
    setOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Consentimiento de cookies"
            className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md"
          >
            <div className="glass-bar rounded-sm p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <Cookie className="size-4 text-gold" strokeWidth={1.5} />
                <p className="eyebrow">Cookies</p>
              </div>
              <p className="font-serif mt-3 text-base leading-relaxed text-foreground/80">
                Este estudio utiliza cookies técnicas necesarias para la navegación y, con tu
                permiso, cookies de medición y de contenido embebido (YouTube, Instagram).
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => save({ necessary: true, analytics: true, embeds: true })}
                >
                  Aceptar todas
                </Button>
                <Button size="sm" variant="outline" onClick={() => save(DEFAULTS)}>
                  Solo necesarias
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
                  Preferencias
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Preferencias de cookies</DialogTitle>
            <DialogDescription>
              Elige qué categorías quieres permitir. Puedes cambiarlo cuando quieras desde el pie de
              página.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <Row
              title="Necesarias"
              text="Imprescindibles para la navegación, el idioma y la seguridad del sitio. Siempre activas."
              checked
              disabled
            />
            <Row
              title="Medición"
              text="Estadísticas anónimas de uso que ayudan a entender qué obras interesan más."
              checked={prefs.analytics}
              onChange={(v) => setPrefs({ ...prefs, analytics: v })}
            />
            <Row
              title="Contenido embebido"
              text="Permite cargar vídeos de YouTube y publicaciones de redes sociales dentro del sitio."
              checked={prefs.embeds}
              onChange={(v) => setPrefs({ ...prefs, embeds: v })}
            />
          </div>

          <DialogFooter className="gap-2 sm:justify-between">
            <Button variant="outline" onClick={() => save(DEFAULTS)}>
              Rechazar opcionales
            </Button>
            <Button onClick={() => save(prefs)}>Guardar preferencias</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Row({
  title,
  text,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  text: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-border pb-4 last:border-0">
      <div>
        <p className="text-sm tracking-[0.12em] uppercase">{title}</p>
        <p className="font-serif mt-1 text-base leading-relaxed text-muted-foreground">{text}</p>
      </div>
      <Switch checked={checked} disabled={disabled} onCheckedChange={onChange} />
    </div>
  );
}
