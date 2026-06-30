import { motion } from "motion/react";
import { closingPhoto } from "@/lib/photos";
import { GoldDivider } from "./GoldDivider";

export function Closing() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mx-auto"
          style={{
            maxWidth: 460,
            aspectRatio: "3 / 4",
            border: "1.5px solid rgba(212,175,55,0.5)",
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.9)",
          }}
        >
          <img
            src={closingPhoto.src}
            alt="Where it began — a black and white memory"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(1) contrast(1.05)" }}
          />
        </motion.div>

        <GoldDivider className="mt-14" width={140} />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display italic text-cream mt-10"
          style={{
            fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)",
            lineHeight: 1.7,
            letterSpacing: "0.02em",
          }}
        >
          Thank you for being part of our journey.
          <br />
          We look forward to celebrating with you.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-label uppercase text-gold-deep mt-10"
          style={{ fontSize: "0.72rem", letterSpacing: "0.5em" }}
        >
          Oratile · Onthatile · Omphile
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-label uppercase text-gold-deep mt-2"
          style={{ fontSize: "0.7rem", letterSpacing: "0.45em" }}
        >
          MMXXVI
        </motion.p>
      </div>
    </section>
  );
}
