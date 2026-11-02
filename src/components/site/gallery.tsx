"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, Instagram } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SITE } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const PHOTOS = [
  { src: "/images/gallery-1.png", alt: "Elegant wedding dining table with gold charger plates and rose centerpiece" },
  { src: "/images/gallery-2.png", alt: "Grand crystal chandelier glowing in the banquet hall" },
  { src: "/images/gallery-3.png", alt: "Luxurious wedding stage with floral arch in ivory and gold" },
  { src: "/images/gallery-4.png", alt: "Luxury buffet station with gourmet Pakistani cuisine" },
  { src: "/images/gallery-5.png", alt: "Illuminated grand marquee entrance at night" },
  { src: "/images/gallery-6.png", alt: "Dance floor with spectacular celebration lighting" },
  { src: "/images/gallery-7.png", alt: "Walima reception setup with tiered cake and candlelight" },
  { src: "/images/gallery-8.png", alt: "Wide view of the fully decorated marquee ready for a grand wedding" },
];

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const prev = useCallback(() => {
    setSelected((s) => (s === null ? null : (s - 1 + PHOTOS.length) % PHOTOS.length));
  }, []);
  const next = useCallback(() => {
    setSelected((s) => (s === null ? null : (s + 1) % PHOTOS.length));
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, prev, next]);

  return (
    <section id="gallery" className="py-20 sm:py-28" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments Crafted at Paradise"
          description="A glimpse of recent setups, decor and lighting — styled shot by shot for your feed and your memories."
        />

        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {PHOTOS.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setSelected(i)}
                className="group relative aspect-[3/4] overflow-hidden rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Open photo: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Expand className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 text-center">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-primary/40 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              See more on Instagram — {SITE.instagramHandle}
            </a>
          </div>
        </Reveal>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-4xl w-[92vw] bg-[#0c110e] border-border p-3 sm:p-4 gap-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Gallery photo viewer</DialogTitle>
          </DialogHeader>
          {selected !== null && (
            <div
              className="relative"
              role="region"
              aria-label={`Photo ${selected + 1} of ${PHOTOS.length}`}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") prev();
                if (e.key === "ArrowRight") next();
              }}
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-md">
                <Image
                  src={PHOTOS[selected].src}
                  alt={PHOTOS[selected].alt}
                  fill
                  sizes="92vw"
                  className="object-contain"
                  priority={selected !== null}
                />
              </div>
              <p className="mt-3 text-center text-sm text-muted-foreground px-8">
                {PHOTOS[selected].alt}
              </p>

              <button
                type="button"
                onClick={prev}
                className="absolute left-1 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 border border-border text-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-1 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 border border-border text-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>

              <span className="absolute top-2 right-2 rounded-full bg-black/70 border border-border px-3 py-1 text-xs text-foreground/85">
                {selected + 1} / {PHOTOS.length}
              </span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
