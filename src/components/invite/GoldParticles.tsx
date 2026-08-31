import { useMemo } from "react";

type Props = { count?: number; className?: string };

// Deterministic pseudo-random so SSR and client render identical markup.
function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function GoldParticles({ count = 18, className = "" }: Props) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const rand = seeded(i * 7919 + 13);
        return {
          id: i,
          left: rand() * 100,
          size: 1 + rand() * 2.5,
          duration: 10 + rand() * 12,
          delay: rand() * 10,
          opacity: 0.3 + rand() * 0.5,
        };
      }),
    [count],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "9999px",
            background: "radial-gradient(circle, #f4d46d 0%, #d4af37 60%, transparent 100%)",
            boxShadow: "0 0 6px rgba(244, 212, 109, 0.6)",
            opacity: p.opacity,
            animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
