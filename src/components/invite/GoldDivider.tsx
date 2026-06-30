import { motion } from "motion/react";

type Props = { width?: number; delay?: number; className?: string };

export function GoldDivider({ width = 120, delay = 0, className = "" }: Props) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        animate={{ width, opacity: 1 }}
        transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent 0%, #d4af37 50%, transparent 100%)",
        }}
      />
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.5 }}
        aria-hidden
        className="text-gold text-xs"
        style={{ transform: "rotate(45deg)" }}
      >
        ◆
      </motion.span>
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        animate={{ width, opacity: 1 }}
        transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent 0%, #d4af37 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
