import { motion } from "motion/react";
import { photos } from "@/lib/photos";
import { GoldDivider } from "./GoldDivider";

const items = photos.slice(0, 11);

export function JourneyTimeline({ onOpenPhoto }: { onOpenPhoto: (i: number) => void }) {
  return (
    <section id="journey" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl text-center mb-16 md:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="font-label uppercase text-gold-deep"
          style={{ fontSize: "0.8rem", letterSpacing: "0.5em" }}
        >
          Chapter I
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
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
          Eighteen years, in moments
        </motion.h2>
        <GoldDivider className="mt-8" width={100} />
      </div>

      <ol className="relative mx-auto max-w-5xl">
        {/* Center spine — desktop */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(212,175,55,0.45) 8%, rgba(212,175,55,0.45) 92%, transparent 100%)",
          }}
        />
        {/* Left spine — mobile */}
        <div
          aria-hidden
          className="absolute left-4 top-0 h-full w-px md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(212,175,55,0.45) 8%, rgba(212,175,55,0.45) 92%, transparent 100%)",
          }}
        />

        {items.map((p, i) => {
          const isRight = i % 2 === 1;
          return (
            <motion.li
              key={p.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className={`relative pl-12 pb-16 md:pl-0 md:pb-24 md:grid md:grid-cols-2 md:gap-12 md:items-center ${
                isRight ? "md:[&>div:first-child]:col-start-2" : ""
              }`}
            >
              {/* Photo */}
              <div className={`${isRight ? "md:col-start-2" : ""} md:px-6`}>
                <button
                  type="button"
                  onClick={() => onOpenPhoto(i)}
                  className="group relative block w-full overflow-hidden transition-all duration-500 ease-luxury hover:scale-[1.02]"
                  style={{
                    aspectRatio: "1 / 1",
                    maxWidth: 380,
                    margin: isRight ? "0 0 0 auto" : "0 auto 0 0",
                    border: "1.5px solid rgba(212,175,55,0.5)",
                    boxShadow: "0 20px 50px -15px rgba(0,0,0,0.8)",
                  }}
                >
                  <img
                    src={p.src}
                    alt={`${p.year} — ${p.title}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-all duration-700 ease-luxury group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px rgba(232,197,71,0.9), 0 0 40px rgba(212,175,55,0.35)",
                    }}
                  />
                </button>
              </div>

              {/* Dot */}
              <span
                aria-hidden
                className="absolute left-4 top-4 h-3 w-3 -translate-x-1/2 rounded-full md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                style={{
                  background: "#d4af37",
                  boxShadow:
                    "0 0 0 4px #0a0a0a, 0 0 0 5px #d4af37, 0 0 18px rgba(212,175,55,0.7)",
                }}
              />

              {/* Text */}
              <div
                className={`mt-6 md:mt-0 ${
                  isRight ? "md:col-start-1 md:row-start-1 md:text-right md:pr-12" : "md:pl-12"
                }`}
              >
                <p
                  className="font-label uppercase text-gold"
                  style={{ fontSize: "0.85rem", letterSpacing: "0.4em" }}
                >
                  {p.year}
                </p>
                <h3
                  className="font-display italic text-cream mt-2"
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    letterSpacing: "0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-serif text-gold-deep mt-3 max-w-md"
                  style={{
                    fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                    lineHeight: 1.7,
                    marginLeft: isRight ? "auto" : undefined,
                  }}
                >
                  {p.caption}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
