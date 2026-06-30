import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Photo } from "@/lib/photos";

type Props = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ photos, index, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, onClose, onPrev, onNext]);

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${photo.year} — ${photo.title}`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 text-gold transition-all duration-300 hover:bg-gold hover:text-noir hover:rotate-90"
          >
            <span className="text-xl">×</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous"
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 text-gold transition-all duration-300 hover:bg-gold hover:text-noir md:left-6"
          >
            <span className="text-xl">‹</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next"
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 text-gold transition-all duration-300 hover:bg-gold hover:text-noir md:right-6"
          >
            <span className="text-xl">›</span>
          </button>

          <motion.div
            key={photo.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo.src}
              alt={`${photo.year} — ${photo.title}`}
              className="max-h-[78vh] max-w-[90vw] object-contain"
              style={{ border: "1px solid rgba(212,175,55,0.5)" }}
            />
            <div className="mt-5 text-center">
              <p
                className="font-label uppercase text-gold"
                style={{ fontSize: "0.75rem", letterSpacing: "0.4em" }}
              >
                {photo.year}
              </p>
              <p
                className="font-display italic text-cream mt-1"
                style={{ fontSize: "1.2rem", letterSpacing: "0.02em" }}
              >
                {photo.title}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
