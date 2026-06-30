import { useEffect, useState } from "react";

const target = new Date("2026-09-23T17:00:00+02:00").getTime();

function calc() {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const [t, setT] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: { label: string; value: number }[] = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="text-center">
      <p
        className="font-label uppercase text-gold-deep"
        style={{ fontSize: "0.8rem", letterSpacing: "0.5em" }}
      >
        Until the dance
      </p>
      <div className="mt-6 flex items-center justify-center gap-3 sm:gap-8">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-3 sm:gap-8">
            <div className="flex flex-col items-center min-w-[64px] sm:min-w-[90px]">
              <span
                key={u.value}
                className="font-display text-gradient-gold tabular-nums"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.4rem)",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                {pad(u.value)}
              </span>
              <span
                className="font-label uppercase text-gold-deep mt-3"
                style={{ fontSize: "0.7rem", letterSpacing: "0.35em" }}
              >
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span
                aria-hidden
                className="font-display text-gold/40"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", lineHeight: 1 }}
              >
                ·
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
