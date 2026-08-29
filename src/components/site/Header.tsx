import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type NavTarget = {
  label: string;
  section: string;
  tab?: string;
};

export const navItems: NavTarget[] = [
  { label: "Home", section: "inicio" },
  { label: "Sobre mí", section: "sobre-mi" },
  { label: "Gallery (2D)", section: "obra", tab: "2D" },
  { label: "Gallery V (GOLD)", section: "obra", tab: "GOLD" },
  { label: "Gallery (3D)", section: "obra", tab: "3D" },
  { label: "Vídeos", section: "obra", tab: "Videos" },
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
              <button
                onClick={() => go(item)}
                className="relative shrink-0 rounded-full px-2.5 py-2 text-[0.76rem] whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </button>
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
              className="flex size-10 items-center justify-center rounded-full border border-border lg:hidden"
            >
              <Menu className="size-4" strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-none bg-transparent p-0 backdrop-blur-xl sm:max-w-full [&>button]:z-20 [&>button]:text-background"
            >
              <div className="absolute inset-0 bg-foreground/40" />
              <SheetTitle className="sr-only">Navegación</SheetTitle>
              <div className="relative z-10 flex h-full flex-col justify-center gap-2 px-10">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    onClick={() => go(item)}
                    className="font-display text-left text-3xl text-background/90 transition-colors hover:text-background"
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  onClick={() => go({ label: "Contacto", section: "contacto" })}
                  className="mt-8 w-fit rounded-full bg-background px-8 py-3 text-xs tracking-[0.2em] uppercase text-foreground"
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
