import p01 from "@/assets/journey/photo-01.jpeg.asset.json";
import p02 from "@/assets/journey/photo-02.jpeg.asset.json";
import p03 from "@/assets/journey/photo-03.jpeg.asset.json";
import p04 from "@/assets/journey/photo-04.jpeg.asset.json";
import p05 from "@/assets/journey/photo-05.jpeg.asset.json";
import p06 from "@/assets/journey/photo-06.jpeg.asset.json";
import p07 from "@/assets/journey/photo-07.jpeg.asset.json";
import p08 from "@/assets/journey/photo-08.jpeg.asset.json";
import p09 from "@/assets/journey/photo-09.jpeg.asset.json";
import p10 from "@/assets/journey/photo-10.jpeg.asset.json";
import p11 from "@/assets/journey/photo-11.jpeg.asset.json";
import p12 from "@/assets/journey/photo-12.jpeg.asset.json";

export type Photo = {
  src: string;
  year: string;
  title: string;
  caption: string;
  phase: "early" | "middle" | "present" | "closing";
};

export const photos: Photo[] = [
  { src: p01.url, year: "2008", title: "Born", caption: "Three tiny miracles entered our family.", phase: "early" },
  { src: p02.url, year: "2012", title: "First Steps", caption: "Tiny gowns. Big dreams already taking shape.", phase: "early" },
  { src: p03.url, year: "2014", title: "Little Explorers", caption: "Balloons in hand, the world ahead of us.", phase: "early" },
  { src: p04.url, year: "2016", title: "Side by Side", caption: "Wherever one of us went, the other two followed.", phase: "early" },
  { src: p05.url, year: "2018", title: "Pure Joy", caption: "Theme parks, fairs, and the simple thrill of being together.", phase: "early" },
  { src: p06.url, year: "2019", title: "Growing Up", caption: "Every milestone shared. Every birthday celebrated as three.", phase: "middle" },
  { src: p07.url, year: "2020", title: "Three of a Kind", caption: "Quiet portraits of a bond that needs no words.", phase: "middle" },
  { src: p08.url, year: "2022", title: "Bonded", caption: "Same look, same energy — always in sync.", phase: "middle" },
  { src: p09.url, year: "2024", title: "High School", caption: "The maroon and grey of our final chapter.", phase: "present" },
  { src: p10.url, year: "2025", title: "Style & Grace", caption: "Stepping into the world with poise and pride.", phase: "present" },
  { src: p11.url, year: "2026", title: "Tonight Awaits", caption: "Eighteen years of memories, leading to one unforgettable evening.", phase: "present" },
  { src: p12.url, year: "Always", title: "Where It Began", caption: "Three little smiles. One unbroken thread.", phase: "closing" },
];

export const closingPhoto = photos[11];
