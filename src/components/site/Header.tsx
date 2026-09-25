import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type NavTarget = {
  label: string;
  section: string;
  tab?: string;
  href?: string;
};

export const navItems: NavTarget[] = [
  { label: "Home", section: "inicio" },
  { label: "Sobre mí", section: "sobre-mi" },
  { label: "Proyectos", section: "proyectos", href: "/proyectos" },
  { label: "Gallery (2D)", section: "obra", tab: "2D" },
  { label: "Gallery V (GOLD)", section: "obra", tab: "GOLD" },
  { label: "Gallery (3D)", section: "obra", tab: "3D" },
  { label: "Vídeos", section: "obra", href: "/video" },
  { label: "CV", section: "curriculum" },
];

export function Header({ onNavigate }: { onNavigate: (item: NavTarget) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (item: NavTarget) => {
    setOpen(false);
    onNavigate(item);
  };

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 px-4"
    >
      <nav
        className={cn(
          "glass-bar mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-2.5 pl-6 pr-2.5 whitespace-nowrap transition-shadow duration-500",
          scrolled && "shadow-[0_14px_40px_-24px_oklch(0_0_0/0.6)]",
        )}
      >
        <button
          onClick={() => go({ label: "Home", section: "inicio" })}
          className="font-display shrink-0 text-sm tracking-[0.28em] whitespace-nowrap uppercase transition-opacity hover:opacity-60"
        >
          Damien Carrión
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block shrink-0 rounded-full px-2.5 py-2 text-[0.76rem] whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  onClick={() => go(item)}
                  className="relative shrink-0 rounded-full px-2.5 py-2 text-[0.76rem] whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go({ label: "Contacto", section: "contacto" })}
            className="hidden rounded-full bg-primary px-5 py-2.5 text-[0.75rem] tracking-[0.14em] uppercase text-primary-foreground transition-opacity hover:opacity-85 sm:block"
          >
            Contacto
          </button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Abrir menú"
              className="flex size-10 items-center justify-center rounded-full border border-border transition-colors duration-300 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-ring lg:hidden"
            >
              <Menu className="size-4" strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100vw,430px)] overflow-y-auto border-l border-background/15 bg-foreground/95 p-0 text-background shadow-2xl backdrop-blur-2xl sm:max-w-[430px] [&>button]:z-20 [&>button]:right-7 [&>button]:top-7 [&>button]:text-background [&>button]:transition-transform [&>button]:duration-300 [&>button]:hover:rotate-90"
            >
              <SheetTitle className="sr-only">Navegación</SheetTitle>
              <div className="relative z-10 flex min-h-full flex-col justify-center px-8 py-20 sm:px-12">
                <p className="mb-8 border-b border-background/20 pb-5 font-gallery text-xs font-semibold uppercase text-background/50">Damien Carrión · Menú</p>
                {navItems.map((item, i) => (
                  item.href ? (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 border-b border-background/10 py-3 text-left font-display text-2xl text-background/80 transition-all duration-300 hover:translate-x-1 hover:text-background sm:text-3xl"
                    >
                      <span className="font-gallery text-xs text-background/40">{String(i + 1).padStart(2, "0")}</span>{item.label}
                    </motion.a>
                  ) : (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => go(item)}
                      className="flex items-baseline gap-5 border-b border-background/10 py-3 text-left font-display text-2xl text-background/80 transition-all duration-300 hover:translate-x-1 hover:text-background sm:text-3xl"
                    >
                      <span className="font-gallery text-xs text-background/40">{String(i + 1).padStart(2, "0")}</span>{item.label}
                    </motion.button>
                  )
                ))}
                <motion.button
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go({ label: "Contacto", section: "contacto" })}
                  className="mt-9 w-fit rounded-full bg-background px-8 py-3 text-xs uppercase text-foreground transition-all duration-300 hover:scale-[1.03] hover:bg-background/90"
                >
                  Contacto
                </motion.button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
