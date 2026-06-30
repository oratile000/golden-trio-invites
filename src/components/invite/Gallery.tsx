import { motion } from "motion/react";
import { photos } from "@/lib/photos";
import { GoldDivider } from "./GoldDivider";

export function Gallery({ onOpenPhoto }: { onOpenPhoto: (i: number) => void }) {
  return (
    <section id="gallery" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-label uppercase text-gold-deep"
          style={{ fontSize: "0.8rem", letterSpacing: "0.5em" }}
        >
          Chapter III
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display italic text-gradient-gold mt-4"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            letterSpacing: "0.02em",
            lineHeight: 1.15,
          }}
        >
          The gallery
        </motion.h2>
        <GoldDivider className="mt-8" width={100} />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {photos.map((p, i) => (
          <motion.button
            key={p.src}
            type="button"
            onClick={() => onOpenPhoto(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.06 }}
            className="group relative overflow-hidden"
            style={{
              aspectRatio: "1 / 1",
              border: "1px solid rgba(212,175,55,0.4)",
            }}
            aria-label={`${p.year} — ${p.title}`}
          >
            <img
              src={p.src}
              alt={`${p.year} — ${p.title}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-all duration-700 ease-luxury group-hover:scale-110"
            />
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)",
              }}
            />
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 translate-y-2 px-3 pb-3 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            >
              <span
                className="block font-label uppercase text-gold"
                style={{ fontSize: "0.65rem", letterSpacing: "0.35em" }}
              >
                {p.year}
              </span>
              <span
                className="block font-display italic text-cream mt-1"
                style={{ fontSize: "0.9rem" }}
              >
                {p.title}
              </span>
            </span>
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ boxShadow: "inset 0 0 0 1px #e8c547" }}
            />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
