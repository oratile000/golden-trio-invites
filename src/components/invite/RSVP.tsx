import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoldDivider } from "./GoldDivider";

type FormState = {
  name: string;
  guests: string;
  attending: "yes" | "no" | "";
  message: string;
};

export function RSVP() {
  const [form, setForm] = useState<FormState>({
    name: "",
    guests: "1",
    attending: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const canSubmit =
    form.name.trim().length > 1 && form.attending !== "" && !submitted;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const attending = form.attending === "yes" ? "Joyfully attending" : "Regretfully unable to attend";
    const lines = [
      "*Matric Dance 2026 · RSVP*",
      `Name: ${form.name.trim()}`,
      `Guests: ${form.guests}`,
      `Response: ${attending}`,
    ];
    if (form.message.trim()) lines.push(`Message: ${form.message.trim()}`);
    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/27660647265?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-transparent border-b border-gold/40 focus:border-gold outline-none px-1 py-3 text-cream font-serif text-base transition-colors placeholder:text-gold-deep/60";

  return (
    <section id="rsvp" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="font-label uppercase text-gold-deep"
          style={{ fontSize: "clamp(0.7rem, 1.4vw, 0.85rem)", letterSpacing: "0.5em" }}
        >
          Kindly Respond
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
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
          RSVP
        </motion.h2>

        <GoldDivider className="my-8 mx-auto" width={120} />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-6 space-y-8 text-left"
            >
              <div>
                <label className="font-label uppercase text-gold-deep block mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.35em" }}>
                  Full Name
                </label>
                <input
                  className={inputClass}
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value.slice(0, 80))}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="font-label uppercase text-gold-deep block mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.35em" }}>
                  Number of Guests
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => set("guests", e.target.value)}
                  className={inputClass + " appearance-none cursor-pointer"}
                  style={{ backgroundImage: "none" }}
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n} className="bg-noir text-cream">
                      {n} {n === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-label uppercase text-gold-deep block mb-3" style={{ fontSize: "0.7rem", letterSpacing: "0.35em" }}>
                  Will You Attend?
                </label>
                <div className="flex gap-3">
                  {(["yes", "no"] as const).map((opt) => {
                    const active = form.attending === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => set("attending", opt)}
                        className={
                          "flex-1 py-3 border font-label uppercase tracking-[0.35em] text-xs transition-all duration-300 ease-luxury " +
                          (active
                            ? "bg-gold text-noir border-gold shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                            : "border-gold/40 text-gold hover:border-gold hover:bg-gold/5")
                        }
                      >
                        {opt === "yes" ? "Joyfully Yes" : "Regretfully No"}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-label uppercase text-gold-deep block mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.35em" }}>
                  A Message (optional)
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => set("message", e.target.value.slice(0, 300))}
                  rows={3}
                  className={inputClass + " resize-none"}
                  placeholder="Share your wishes…"
                />
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="group relative px-10 py-4 border border-gold text-gold font-label uppercase tracking-[0.4em] text-xs transition-all duration-500 ease-luxury hover:bg-gold hover:text-noir hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gold"
                >
                  Send RSVP
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-8 py-14 px-6 border border-gold/40 relative"
              style={{ background: "linear-gradient(160deg, rgba(212,175,55,0.06), rgba(0,0,0,0))" }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold"
                style={{ boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12l5 5L20 6" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <p className="font-display italic text-gradient-gold" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", lineHeight: 1.3 }}>
                Thank you, {form.name.split(" ")[0]}.
              </p>
              <p className="font-serif text-cream/85 mt-4" style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)", lineHeight: 1.7 }}>
                {form.attending === "yes"
                  ? "Your response has been received. We cannot wait to celebrate this evening with you on the 23rd of September, 2026."
                  : "Your response has been received. You will be dearly missed — thank you for being part of our journey."}
              </p>
              <p className="font-label uppercase text-gold-deep mt-8" style={{ fontSize: "0.7rem", letterSpacing: "0.45em" }}>
                With love — O · O · O
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
