import { useEffect } from "react";

/**
 * Flags interactive elements under the brush cursor with data-brush-hover
 * so existing hover transitions (lightbox arrows, close button, etc.) keep
 * working. The visible ring has been removed; only the attribute flag remains.
 * Only active on fine pointers (mouse / trackpad).
 */
const INTERACTIVE =
  'a[href], button:not(:disabled), [role="button"], [role="tab"], [role="link"], [role="menuitem"], [role="option"], summary, label[for], select, input:not([type="hidden"]), textarea, [tabindex]:not([tabindex="-1"])';

export function BrushCursorFeedback() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let current: Element | null = null;

    const setTarget = (el: Element | null) => {
      if (el === current) return;
      current?.removeAttribute("data-brush-hover");
      el?.setAttribute("data-brush-hover", "");
      current = el;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
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

  return null;
}
