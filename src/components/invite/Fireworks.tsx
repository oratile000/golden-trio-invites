import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
};

const GOLDS = ["#f4d46d", "#e8c547", "#d4af37", "#b8860b", "#ffe9a8"];

export function Fireworks({ active, duration = 3200 }: { active: boolean; duration?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const stopAtRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    stopAtRef.current = performance.now() + duration;
    let lastBurst = 0;

    const burst = (x: number, y: number) => {
      const count = 60 + Math.floor(Math.random() * 40);
      const baseColor = GOLDS[Math.floor(Math.random() * GOLDS.length)];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
        const speed = 2 + Math.random() * 4.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 60 + Math.random() * 40,
          color: Math.random() < 0.7 ? baseColor : GOLDS[Math.floor(Math.random() * GOLDS.length)],
          size: 1.5 + Math.random() * 2,
        });
      }
    };

    // Initial burst near center
    burst(window.innerWidth / 2, window.innerHeight / 2);

    const tick = (now: number) => {
      ctx.fillStyle = "rgba(10,10,10,0.18)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      if (now < stopAtRef.current && now - lastBurst > 380) {
        lastBurst = now;
        const x = window.innerWidth * (0.15 + Math.random() * 0.7);
        const y = window.innerHeight * (0.15 + Math.random() * 0.4);
        burst(x, y);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.vy += 0.045; // gravity
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        if (p.life >= p.maxLife) particles.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (particles.length > 0 || now < stopAtRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, [active, duration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
