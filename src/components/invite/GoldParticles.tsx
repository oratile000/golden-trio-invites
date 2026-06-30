import { useMemo } from "react";

type Props = { count?: number; className?: string };

export function GoldParticles({ count = 18, className = "" }: Props) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 10 + Math.random() * 12,
        delay: Math.random() * 10,
        opacity: 0.3 + Math.random() * 0.5,
      })),
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
