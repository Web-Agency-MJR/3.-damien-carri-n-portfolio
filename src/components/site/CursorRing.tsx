import { useEffect, useRef } from "react";

const INTERACTIVE =
  'a, button, [role="button"], [role="tab"], summary, label, select, input, textarea, [data-interactive]';

/** Small circle around the brush tip shown only over clickable elements.
 * Desktop (fine pointer) only; the brush itself is the native CSS cursor. */
export function CursorRing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    let x = 0, y = 0, raf = 0, active = false;

    const render = () => {
      raf = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${active ? 1 : 0.4})`;
      el.style.opacity = active ? "1" : "0";
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      x = e.clientX;
      y = e.clientY;
      const t = e.target as Element | null;
      active = !!t?.closest?.(INTERACTIVE) && !t.closest("[disabled]");
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onLeave = () => {
      active = false;
      if (!raf) raf = requestAnimationFrame(render);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] size-7 rounded-full border border-foreground/60 opacity-0 transition-[opacity,scale] duration-200 ease-out"
      style={{ transition: "opacity 180ms ease-out" }}
    />
  );
}
