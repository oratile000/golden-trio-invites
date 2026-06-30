import { AnimatePresence, motion } from "motion/react";
import { GoldParticles } from "./GoldParticles";

export function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-noir-radial"
        >
          <GoldParticles count={14} />
          <div className="relative text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display text-gradient-gold italic"
              style={{
                fontSize: "clamp(1.6rem, 4.5vw, 2.8rem)",
                letterSpacing: "0.02em",
                lineHeight: 1.2,
              }}
            >
              Every story has a beginning…
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="font-label uppercase mt-6 text-gold-deep"
              style={{
                fontSize: "clamp(0.75rem, 1.6vw, 0.95rem)",
                letterSpacing: "0.4em",
              }}
            >
              A journey of eighteen years
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
