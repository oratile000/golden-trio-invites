import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const openPhoto = (i: number) => setLightboxIndex(i);
  const closePhoto = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));

  return (
    <main className="relative min-h-screen bg-noir-radial text-cream overflow-hidden">
      <LoadingScreen visible={loading} />

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
              <Envelope onOpen={() => setOpened(true)} />
            </motion.section>
          ) : (
            <motion.div
              key="invitation"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Welcome onClose={() => setOpened(false)} />
              <JourneyTimeline onOpenPhoto={openPhoto} />
              <EventTimeline />
              <Gallery onOpenPhoto={openPhoto} />
              <Closing />
            </motion.div>
          )}
        </AnimatePresence>
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
