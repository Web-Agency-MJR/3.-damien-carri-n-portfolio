import { useEffect, useRef } from "react";

/**
 * Feedback for the single native brush cursor (defined in styles.css).
 * Shows a small, subtle ring at the bristle tip whenever the tip is over
 * something clickable, and flags that element with data-brush-hover.
 * Only active on fine pointers (mouse / trackpad).
 */
const INTERACTIVE =
  'a[href], button:not(:disabled), [role="button"], [role="tab"], [role="link"], [role="menuitem"], [role="option"], summary, label[for], select, input:not([type="hidden"]), textarea, [tabindex]:not([tabindex="-1"])';

export function BrushCursorFeedback() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const ring = ringRef.current;
    if (!ring) return;
    let current: Element | null = null;

    const setTarget = (el: Element | null) => {
      if (el === current) return;
      current?.removeAttribute("data-brush-hover");
      el?.setAttribute("data-brush-hover", "");
      current = el;
      ring.setAttribute("data-active", el ? "true" : "false");
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      ring.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      const target = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      setTarget(target);
    };
    const onLeave = () => setTarget(null);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      setTarget(null);
    };
  }, []);

  return <div ref={ringRef} className="brush-cursor-ring" data-active="false" aria-hidden="true" />;
}
