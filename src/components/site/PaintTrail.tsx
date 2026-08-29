import { useEffect, useRef } from "react";

type Point = { x: number; y: number; t: number; w: number };

const LIFE = 5000; // ms until a stroke fully fades out

/**
 * Full-screen canvas that paints a delicate brush trail following the pointer.
 * Every segment fades smoothly to opacity 0 exactly 5s after being drawn.
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
      const dx = last ? e.clientX - last.x : 0;
      const dy = last ? e.clientY - last.y : 0;
      const speed = Math.hypot(dx, dy);
      const w = Math.max(1.2, Math.min(5.5, 5.5 - speed * 0.09));
      const p: Point = { x: e.clientX, y: e.clientY, t: now, w };
      if (last && now - last.t > 220) points.push({ ...p, t: -1 }); // pen-up break
      points.push(p);
      last = p;
      if (points.length > 900) points = points.slice(-900);
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

      let alive: Point[] = [];
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1]!;
        const b = points[i]!;
        if (b.t < 0 || a.t < 0) continue;
        const age = now - b.t;
        if (age > LIFE) continue;
        alive.push(b);

        const life = 1 - age / LIFE;
        const alpha = life * life * 0.55;
        ctx.strokeStyle = `rgba(28, 26, 24, ${alpha})`;
        ctx.lineWidth = b.w * (0.4 + life * 0.6);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        ctx.quadraticCurveTo(a.x, a.y, mx, my);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        // faint gilded bleed for a painted feel
        ctx.strokeStyle = `rgba(186, 148, 74, ${alpha * 0.45})`;
        ctx.lineWidth = b.w * (1.6 + life);
        ctx.stroke();
      }
      if (alive.length + 4 < points.length) points = points.slice(-(alive.length + 4));
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
