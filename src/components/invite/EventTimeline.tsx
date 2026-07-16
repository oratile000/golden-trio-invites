import { motion } from "motion/react";
import { Countdown } from "./Countdown";
import { GoldDivider } from "./GoldDivider";

type Event = {
  time: string;
  title: string;
  venue: string;
  address: string;
  mapsQuery: string;
  icon: "glass" | "camera" | "dance";
  note?: string;
};

const events: Event[] = [
  {
    time: "1:30 PM",
    title: "Pre-Drinks & Refreshments",
    venue: "Delectus Manor Guesthouse",
    address: "Van der Merwe Road, Montana, Pretoria, 0084",
    mapsQuery: "Delectus Manor Guesthouse, Van der Merwe Road, Montana, Pretoria",
    icon: "glass",
  },
  {
    time: "3:00 PM",
    title: "Photography Session",
    venue: "La Perna Guesthouse & Venue",
    address: "780 Breed Street, Pretoria, 0182",
    mapsQuery: "La Perna Guesthouse, 780 Breed Street, Pretoria",
    icon: "camera",
  },
  {
    time: "5:00 PM",
    title: "The Matric Dance",
    venue: "Colosseum Reale",
    address: "Pretoria",
    mapsQuery: "Colosseum Reale, Pretoria",
    icon: "dance",
  },
];

function Icon({ kind }: { kind: Event["icon"] }) {
  const common = { fill: "none", stroke: "#d4af37", strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "glass") {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" {...common} aria-hidden>
        <path d="M8 4h12l-1 8a5 5 0 0 1-10 0Z" />
        <path d="M14 17v6" />
        <path d="M10 23h8" />
        <path d="M9 7h10" opacity="0.5" />
      </svg>
    );
  }
  if (kind === "camera") {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" {...common} aria-hidden>
        <path d="M3 8h4l2-3h10l2 3h4v14H3z" />
        <circle cx="14" cy="15" r="4.5" />
        <circle cx="14" cy="15" r="1.5" fill="#d4af37" stroke="none" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" {...common} aria-hidden>
      <circle cx="10" cy="6" r="2.2" />
      <path d="M10 8 L9 14 L6 22 M10 14 L14 13 L18 18" />
      <circle cx="20" cy="5" r="1.5" />
      <path d="M19 7 L21 12 L24 17" opacity="0.7" />
    </svg>
  );
}

export function EventTimeline() {
  return (
    <section id="evening" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-label uppercase text-gold-deep"
          style={{ fontSize: "0.8rem", letterSpacing: "0.5em" }}
        >
          Chapter II
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
          The evening awaits
        </motion.h2>
        <p
          className="font-label uppercase text-gold-deep mt-6"
          style={{ fontSize: "0.78rem", letterSpacing: "0.4em" }}
        >
          Wednesday · 23 September 2026 · Pretoria
        </p>
        <GoldDivider className="mt-8" width={100} />
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:gap-8">
        {events.map((e, i) => (
          <motion.a
            key={`${e.title}-${i}`}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.mapsQuery)}`}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
            className="group relative grid grid-cols-[auto_1fr] gap-5 sm:gap-8 items-start border border-gold/30 bg-noir-2/40 p-6 sm:p-8 transition-all duration-500 ease-luxury hover:border-gold/80 hover:bg-noir-2/70"
            style={{ boxShadow: "0 10px 40px -20px rgba(0,0,0,0.8)" }}
          >
            <div className="flex flex-col items-center gap-3">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50"
                style={{ background: "rgba(212,175,55,0.06)" }}
              >
                <Icon kind={e.icon} />
              </span>
              <span
                className="font-display text-gradient-gold whitespace-nowrap"
                style={{
                  fontSize: "clamp(1.1rem, 2.4vw, 1.5rem)",
                  letterSpacing: "0.04em",
                }}
              >
                {e.time}
              </span>
            </div>
            <div>
              <p
                className="font-label uppercase text-gold-deep"
                style={{ fontSize: "0.72rem", letterSpacing: "0.4em" }}
              >
                Event {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className="font-display italic text-cream mt-2"
                style={{
                  fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.2,
                }}
              >
                {e.title}
              </h3>
              <p
                className="font-serif text-cream/90 mt-3"
                style={{ fontSize: "1rem", letterSpacing: "0.04em" }}
              >
                {e.venue}
              </p>
              <p
                className="font-serif text-gold-deep mt-1"
                style={{ fontSize: "0.92rem", lineHeight: 1.6 }}
              >
                {e.address}
              </p>
              {e.note && (
                <p
                  className="font-label uppercase text-gold mt-4 inline-block border-t border-gold/30 pt-3"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.4em" }}
                >
                  {e.note}
                </p>
              )}
              <p
                className="font-label uppercase text-gold/60 mt-4 transition-colors duration-300 group-hover:text-gold"
                style={{ fontSize: "0.7rem", letterSpacing: "0.4em" }}
              >
                Open in maps →
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-4xl mt-24 relative overflow-hidden"
        style={{
          border: "1.5px solid rgba(212,175,55,0.55)",
          background:
            "linear-gradient(160deg, rgba(212,175,55,0.10) 0%, rgba(10,10,10,0.6) 60%, rgba(212,175,55,0.08) 100%)",
          boxShadow:
            "0 30px 80px -30px rgba(0,0,0,0.9), inset 0 0 60px rgba(212,175,55,0.06)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-3 pointer-events-none"
          style={{ border: "1px solid rgba(212,175,55,0.25)" }}
        />
        <div className="relative px-6 py-14 md:py-20 md:px-16 text-center">
          <p
            className="font-label uppercase text-gold-deep"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 0.9rem)", letterSpacing: "0.55em" }}
          >
            The Evening Requires
          </p>
          <h3
            className="font-display italic text-gradient-gold mt-5"
            style={{
              fontSize: "clamp(2.4rem, 7vw, 4.5rem)",
              letterSpacing: "0.03em",
              lineHeight: 1.05,
            }}
          >
            Dress Code
          </h3>
          <GoldDivider className="my-8 mx-auto" width={100} />
          <p
            className="font-display text-cream"
            style={{
              fontSize: "clamp(1.5rem, 4.2vw, 2.4rem)",
              letterSpacing: "0.3em",
              lineHeight: 1.2,
            }}
          >
            BLACK — FORMAL OR CASUAL
          </p>
          <p
            className="font-serif italic text-gold-deep mt-6 mx-auto max-w-lg"
            style={{ fontSize: "clamp(1rem, 1.7vw, 1.15rem)", lineHeight: 1.7 }}
          >
            Wear black — dress it up formal, or keep it smart casual.
            Gold accents are welcomed, in honour of the evening.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-3xl mt-24 border-t border-gold/20 pt-16"
      >
        <Countdown />
      </motion.div>
    </section>
  );
}
