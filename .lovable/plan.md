
# The Matric Dance Journey — Luxury Black & Gold Invitation

A single-page TanStack Start site for the triplets' Matric Dance (Sep 23, 2026). Pure black & gold, editorial typography, cinematic motion.

## Photo order (locked from your messages)

| # | Phase | Year tag | Source |
|---|---|---|---|
| 1 | Early | 2008 — Born | `9.28.35_AM.jpeg` (red Team Player jackets) |
| 2 | Early | 2012 — First Steps | `9.31.30_AM.jpeg` (graduation caps/gowns) |
| 3 | Early | 2014 — Little Explorers | `9.28.34_AM.jpeg` (balloons, parking lot) |
| 4 | Early | 2016 — Side by Side | `9.28.37_AM.jpeg` (rhino sculpture) |
| 5 | Early | 2018 — Adventures | `9.28.35_AM_1.jpeg` (theme park) |
| 6 | Middle | 2019 — Growing Up | `9.28.36_AM.jpeg` (Feb 4 2019 birthday) |
| 7 | Middle | 2020 — Three of a Kind | `9.28.38_AM_1.jpeg` (sepia portrait) |
| 8 | Middle | 2022 — Bonded | `9.28.38_AM.jpeg` (Kappa tracksuits) |
| 9 | Present | 2024 — High School | `9.28.39_AM.jpeg` (maroon school uniform) |
| 10 | Present | 2025 — Style & Grace | `9.28.36_AM_1.jpeg` (black suits + white dress) |
| 11 | Present | 2026 — Tonight Awaits | `9.28.39_AM_1.jpeg` (sage outfits, present day) |
| 12 | Closing | Where it began | `last_picture_md.jpeg` (B&W birthday cake) |

I'll register all 12 via `lovable-assets` from `/mnt/user-uploads/` (no binaries in the repo).

## Sections

1. **Loading screen (3s)** — "Every story has a beginning… A journey of eighteen years" with drifting gold particles, fade out.
2. **Luxury envelope** — black envelope, gold border, ribbon bow; hover lift/glow; click triggers 3D open, reveals Section 3.
3. **Invitation welcome** — "The Matric Dance Journey" + gradient gold divider + names (Oratile / Onthatile / Omphile) + subtitle. Top-right close button returns to envelope.
4. **Journey timeline (Part A)** — vertical alternating timeline using photos 1–11 with year + caption, scroll fade-ins.
5. **Event timeline (Part B)** — three event cards (Pre-drinks 1:30PM Delectus Manor; Photos 3:00PM La Perna; Dance 5:00PM La Perna) with gold icons and Google Maps links; live countdown to Sep 23 2026 17:00 SAST.
6. **Gallery** — responsive 4/3/2-col grid of all 12 photos; lightbox with prev/next/ESC.
7. **Closing** — photo 12 (B&W) full-width with "Thank you for being part of our journey…" + gradient gold divider.

## Design system

- Tokens added to `src/styles.css`: blacks `#0a0a0a` / `#1a1a1a` / `#0d0d0d`; golds `#d4af37`, `#e8c547`, `#f4d46d`, `#b8860b`, `#a08860`; cream `#f5f5f5`; gold-glow shadows; ornament gradients.
- Fonts loaded via `<link>` in `__root.tsx` head (Bodoni Moda, Cormorant SC, Playfair Display) and registered as `@theme` `--font-display` / `--font-serif` / `--font-body`.
- Fluid type via `clamp()`. Easings: smooth `cubic-bezier(0.25,0.46,0.45,0.94)`, bouncy `cubic-bezier(0.34,1.56,0.64,1)`.
- Reusable decorative atoms: `GoldDivider`, `CornerFlourish`, `GoldParticles`.

## Interaction & motion

- `motion/react` for envelope 3D open, staggered text reveals, `whileInView` scroll fade-ups, lightbox transitions, countdown digit pulse.
- Honors `prefers-reduced-motion`. Touch detection disables hover-only flourishes.

## File plan

```
src/styles.css                       # tokens + font theme
src/routes/__root.tsx                # font <link>, meta/OG
src/routes/index.tsx                 # composes all sections
src/components/invite/
  LoadingScreen.tsx
  Envelope.tsx
  Welcome.tsx
  JourneyTimeline.tsx
  EventTimeline.tsx
  Countdown.tsx
  Gallery.tsx
  Lightbox.tsx
  Closing.tsx
  GoldParticles.tsx
  GoldDivider.tsx
  CornerFlourish.tsx
src/lib/photos.ts                    # 12-photo metadata array
src/assets/photo-01.jpeg.asset.json  # …through photo-12, via lovable-assets
```

## Technical notes (devs)

- Single route at `src/routes/index.tsx`; root layout unchanged structurally beyond fonts/meta.
- `bun add motion` for animations.
- Countdown: `setInterval(1000)` against `new Date('2026-09-23T17:00:00+02:00')`.
- Lightbox: fixed overlay with focus trap + ESC/←/→.
- All `<img>` get `loading="lazy"`, `decoding="async"`, fixed aspect-ratio wrappers to avoid CLS.
- SEO via route `head()`: title, description, og:title/description/image (photo 11), twitter:card summary_large_image.
- A11y: semantic landmarks, gold focus rings, `aria-label` on envelope, keyboard activation throughout.
