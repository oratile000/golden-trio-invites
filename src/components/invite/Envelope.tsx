import type { CSSProperties } from "react";
import { motion } from "motion/react";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.7 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center gap-10"
    >
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Open the invitation"
        whileHover={{ y: -6, scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group relative cursor-pointer outline-none"
        style={{
          width: "min(500px, 88vw)",
          aspectRatio: "500 / 340",
        }}
      >
        {/* Envelope body */}
        <div
          className="relative h-full w-full glow-gold transition-shadow duration-500 ease-luxury group-hover:glow-gold-strong"
          style={{
            background:
              "linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 50%, #141414 100%)",
            borderRadius: "4px",
          }}
        >
          {/* Envelope flap (triangle) */}
          <svg
            viewBox="0 0 500 340"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1f1f1f" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </linearGradient>
            </defs>
            <path
              d="M0 0 L500 0 L250 175 Z"
              fill="url(#flapGrad)"
              stroke="#d4af37"
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />
            {/* bottom seams */}
            <path
              d="M0 340 L250 175 L500 340"
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.8"
              strokeOpacity="0.35"
            />
          </svg>

          {/* Monogram on flap */}
          <div
            className="absolute left-1/2 top-[18%] -translate-x-1/2 text-center"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="font-label uppercase text-gold-deep"
              style={{ fontSize: "0.7rem", letterSpacing: "0.5em" }}
            >
              MMXXVI
            </div>
          </div>

          {/* Wax seal / ribbon bow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ pointerEvents: "none" }}
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #1a1a1a 0%, #050505 70%)",
                border: "1.5px solid #d4af37",
                boxShadow:
                  "0 0 30px rgba(212,175,55,0.35), inset 0 0 12px rgba(212,175,55,0.2)",
              }}
            >
              <span
                className="font-display italic text-gradient-gold"
                style={{ fontSize: "1.6rem", lineHeight: 1 }}
              >
                O³
              </span>
            </motion.div>
          </div>

          {/* Corner ornaments */}
          {([
            { key: "tl", style: { top: 10, left: 10, transform: "rotate(0deg)" } },
            { key: "tr", style: { top: 10, right: 10, transform: "rotate(90deg)" } },
            { key: "br", style: { bottom: 10, right: 10, transform: "rotate(180deg)" } },
            { key: "bl", style: { bottom: 10, left: 10, transform: "rotate(270deg)" } },
          ] as Array<{ key: string; style: React.CSSProperties }>).map(({ key, style }) => (
            <svg
              key={key}
              width="22"
              height="22"
              viewBox="0 0 22 22"
              className="absolute"
              style={style}
              aria-hidden
            >
              <path
                d="M1 9 L1 1 L9 1"
                stroke="#d4af37"
                strokeWidth="1"
                fill="none"
                opacity="0.8"
              />
            </svg>
          ))}
        </div>
      </motion.button>

      <div className="flex flex-col items-center gap-3">
        <span
          className="font-label uppercase text-gold animate-gold-pulse"
          style={{ fontSize: "0.85rem", letterSpacing: "0.45em" }}
        >
          Open the invitation
        </span>
        <svg
          width="22"
          height="14"
          viewBox="0 0 22 14"
          className="animate-scroll-bounce text-gold"
          aria-hidden
        >
          <path
            d="M1 1 L11 11 L21 1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </motion.div>
  );
}
