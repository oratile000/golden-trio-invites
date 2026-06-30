import { motion } from "motion/react";
import { GoldDivider } from "./GoldDivider";

const names = ["Oratile", "Onthatile", "Omphile"];

export function Welcome({ onClose }: { onClose: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close invitation"
        className="group absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 text-gold transition-all duration-300 ease-luxury hover:bg-gold hover:text-noir hover:scale-110 hover:rotate-90 md:right-10 md:top-10 md:h-14 md:w-14"
      >
        <span className="text-xl font-light">×</span>
      </button>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="font-label uppercase text-gold-deep mb-6"
        style={{ fontSize: "clamp(0.7rem, 1.4vw, 0.85rem)", letterSpacing: "0.5em" }}
      >
        You are cordially invited
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-display italic text-gradient-gold"
        style={{
          fontSize: "clamp(2.4rem, 7vw, 4.5rem)",
          letterSpacing: "0.02em",
          lineHeight: 1.1,
          textShadow: "0 0 40px rgba(212,175,55,0.25)",
        }}
      >
        The Matric Dance
        <br />
        <span style={{ fontStyle: "italic" }}>Journey</span>
      </motion.h1>

      <GoldDivider className="my-10" delay={0.9} width={140} />

      <div className="flex flex-col items-center gap-2">
        {names.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 1.1 + i * 0.18,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-display text-cream"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              letterSpacing: "0.08em",
              lineHeight: 1.4,
            }}
          >
            {name}
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="font-label uppercase text-gold-muted mt-10 max-w-xl mx-auto"
        style={{
          fontSize: "clamp(0.85rem, 1.7vw, 1.1rem)",
          letterSpacing: "0.32em",
          lineHeight: 1.9,
        }}
      >
        Three siblings. One journey.
        <br />
        One unforgettable evening.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          className="font-label uppercase text-gold-deep"
          style={{ fontSize: "0.7rem", letterSpacing: "0.45em" }}
        >
          Scroll to discover
        </span>
        <svg
          width="18"
          height="12"
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
      </motion.div>
    </motion.section>
  );
}
