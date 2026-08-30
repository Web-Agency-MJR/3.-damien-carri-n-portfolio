import { useEffect, useRef } from "react";

type Point = { x: number; y: number; t: number };

const LIFE = 5000; // ms until a stroke fully fades out
const INK = { r: 0, g: 0, b: 0, a: 0.6 } as const;
const WIDTH = 1.5;

/**
 * Full-screen canvas that paints a fine ink trail following the pointer.
 * Strokes are smoothed with quadratic bézier curves through point midpoints
 * (never raw lineTo between raw coordinates, which looks dotted/jagged),
 * and every segment fades smoothly to opacity 0 exactly 5s after being drawn.
 * Disabled on touch/coarse pointers and when reduced motion is requested.
 */
export function PaintTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    document.documentElement.classList.add("brush-cursor");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();

    let points: Point[] = [];
    let last: Point | null = null;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const p: Point = { x: e.clientX, y: e.clientY, t: now };
      // Pen-up break when the pointer resumes after a pause.
      if (last && now - last.t > 220) points.push({ ...p, t: -1 });
      points.push(p);
      last = p;
      if (points.length > 900) points = points.slice(-900);
    };

    const alphaFor = (t: number, now: number) => {
      const life = 1 - (now - t) / LIFE;
      return life <= 0 ? 0 : life * life * INK.a;
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const now = performance.now();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (points.length && now - points[points.length - 1]!.t > LIFE) {
        points = [];
        return;
      }

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = WIDTH;
      // Crisp fine-ink line: no shadows, no glow, no secondary bleed.

      // Draw the polyline as bézier segments through the midpoints of
      // consecutive points: each curve runs from mid(prev,a) to mid(a,b)
      // with `a` as control point, giving one continuous organic stroke.
      let alive = 0;
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1]!;
        const b = points[i]!;
        if (a.t < 0 || b.t < 0) continue;
        const alpha = alphaFor(b.t, now);
        if (alpha <= 0) continue;
        alive++;

        const midAx = i > 1 && points[i - 2]!.t >= 0 ? (points[i - 2]!.x + a.x) / 2 : a.x;
        const midAy = i > 1 && points[i - 2]!.t >= 0 ? (points[i - 2]!.y + a.y) / 2 : a.y;
        const midBx = (a.x + b.x) / 2;
        const midBy = (a.y + b.y) / 2;

        ctx.strokeStyle = `rgba(${INK.r}, ${INK.g}, ${INK.b}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(midAx, midAy);
        ctx.quadraticCurveTo(a.x, a.y, midBx, midBy);
        ctx.stroke();
      }
      if (alive + 8 < points.length) points = points.slice(-(alive + 8));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.documentElement.classList.remove("brush-cursor");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  );
}
