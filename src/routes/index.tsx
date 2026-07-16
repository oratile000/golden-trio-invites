import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { LoadingScreen } from "@/components/invite/LoadingScreen";
import { Envelope } from "@/components/invite/Envelope";
import { Welcome } from "@/components/invite/Welcome";
import { JourneyTimeline } from "@/components/invite/JourneyTimeline";
import { EventTimeline } from "@/components/invite/EventTimeline";
import { Gallery } from "@/components/invite/Gallery";
import { Closing } from "@/components/invite/Closing";
import { Lightbox } from "@/components/invite/Lightbox";
import { GoldParticles } from "@/components/invite/GoldParticles";
import { Fireworks } from "@/components/invite/Fireworks";
import { RSVP } from "@/components/invite/RSVP";
import { photos } from "@/lib/photos";
import songAsset from "@/assets/viva-the-legend.mp3.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [fireworks, setFireworks] = useState(false);
  const [muted, setMuted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll the page after the card opens (gentle 1.25x cinematic pace).
  useEffect(() => {
    if (!opened) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;
    let stopped = false;
    // Base 18% of viewport height per second, played at 1.25x.
    // This keeps the luxury pacing consistent on mobile and desktop.
    const baseSpeedVhPerSecond = 0.18;
    const speedMultiplier = 1.25;
    const speed = window.innerHeight * baseSpeedVhPerSecond * speedMultiplier;

    const stop = () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("mousedown", stop);
    };

    const step = (ts: number) => {
      if (stopped) return;
      if (!last) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const next = Math.min(window.scrollY + speed * dt, maxY);
      window.scrollTo(0, next);
      if (next >= maxY - 1) return;
      raf = requestAnimationFrame(step);
    };

    // Small delay so the welcome animation lands before we start moving.
    const startId = window.setTimeout(() => {
      window.addEventListener("wheel", stop, { passive: true });
      window.addEventListener("touchstart", stop, { passive: true });
      window.addEventListener("keydown", stop);
      window.addEventListener("mousedown", stop);
      raf = requestAnimationFrame(step);
    }, 2200);

    return () => {
      window.clearTimeout(startId);
      stop();
    };
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    setFireworks(true);
    // Play song — user gesture satisfies autoplay policy
    const a = audioRef.current;
    if (a) {
      a.volume = 0.55;
      a.loop = true;
      a.play().catch(() => {
        /* ignore */
      });
    }
    // stop fireworks state after a bit so it can retrigger later
    window.setTimeout(() => setFireworks(false), 3500);
  };

  const handleClose = () => {
    setOpened(false);
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  };

  const openPhoto = (i: number) => setLightboxIndex(i);
  const closePhoto = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));

  return (
    <main className="relative min-h-screen bg-noir-radial text-cream overflow-hidden">
      <LoadingScreen visible={loading} />

      <audio ref={audioRef} src={songAsset.url} preload="auto" loop />

      <Fireworks active={fireworks} />

      {!loading && (
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.section
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.85, rotateX: -30, y: 60 }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative flex min-h-[100svh] items-center justify-center px-6 py-16"
              style={{ perspective: 1200 }}
            >
              <GoldParticles count={12} />
              <Envelope onOpen={handleOpen} />
            </motion.section>
          ) : (
            <motion.div
              key="invitation"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Welcome onClose={handleClose} />
              <JourneyTimeline onOpenPhoto={openPhoto} />
              <EventTimeline />
              <Gallery onOpenPhoto={openPhoto} />
              <RSVP />
              <Closing />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {opened && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute music" : "Mute music"}
          className="fixed bottom-6 right-6 z-[95] h-11 w-11 rounded-full border border-gold/60 bg-noir/70 backdrop-blur text-gold flex items-center justify-center transition-all duration-300 ease-luxury hover:bg-gold hover:text-noir hover:scale-110"
        >
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.5 8.5a5 5 0 010 7" />
              <path d="M18.5 5.5a9 9 0 010 13" />
            </svg>
          )}
        </button>
      )}

      <Lightbox
        photos={photos}
        index={lightboxIndex}
        onClose={closePhoto}
        onPrev={prev}
        onNext={next}
      />
    </main>
  );
}
