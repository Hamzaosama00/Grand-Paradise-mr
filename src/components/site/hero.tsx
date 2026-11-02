import Image from "next/image";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, waLink } from "@/lib/site-config";
import { Stars } from "./stars";
import { Reveal } from "./reveal";

const STATS = [
  { value: "1,000+", label: "Guest Capacity" },
  { value: "3", label: "Event Halls & Lawn" },
  { value: "4.3★", label: "Google Rating" },
  { value: "946+", label: "Guest Reviews" },
];

export function Hero() {
  return (
    <section id="top" className="relative flex flex-col min-h-[100svh]" aria-label="Welcome">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero.png"
          alt="Paradise Grand Marquee banquet hall decorated for a grand wedding reception"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-[#090d0b]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(9,13,11,0.55)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex items-center pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="eyebrow mb-5 flex items-center justify-center gap-3">
                <span className="hidden sm:inline-block w-8 h-px bg-primary/50" aria-hidden="true" />
                East Canal Road · Faisalabad
                <span className="hidden sm:inline-block w-8 h-px bg-primary/50" aria-hidden="true" />
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[4rem] leading-[1.12] font-semibold text-white">
                Grand Weddings &amp; Corporate Events in{" "}
                <span className="gold-text italic">Faisalabad</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-base sm:text-lg lg:text-xl text-foreground/85 leading-relaxed max-w-2xl mx-auto">
                Host your unforgettable moments at Paradise Grand Marquee — capable of
                hosting up to <strong className="text-white font-semibold">1,000 guests</strong>{" "}
                with world-class hospitality.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="gold-gradient-bg text-primary-foreground font-semibold tracking-wide rounded-sm px-8 h-12 sm:h-[3.25rem] text-base hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_12px_40px_-10px_rgba(201,162,75,0.5)] w-full sm:w-auto"
                >
                  <a href="#booking">Check Date Availability</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-sm px-8 h-12 sm:h-[3.25rem] text-base border-foreground/40 text-foreground hover:bg-white/10 hover:text-white hover:border-white/60 transition-all w-full sm:w-auto"
                >
                  <a href={waLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5 text-[#b8e0a4]" aria-hidden="true" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <a
                href="#reviews"
                className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-black/40 backdrop-blur-sm px-4 py-2 hover:border-primary/50 transition-colors"
                aria-label={`Rated 4.3 out of 5 across 946 plus Google reviews — read reviews`}
              >
                <Stars rating={SITE.rating} starClass="h-4 w-4" />
                <span className="text-sm text-foreground/90">
                  <strong className="font-semibold text-white">4.3/5</strong> · 946+ Google
                  Reviews
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative pb-4 flex justify-center" aria-hidden="true">
        <a href="#halls" className="text-primary/70 hover:text-primary animate-bounce" aria-hidden="true" tabIndex={-1}>
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>

      {/* Stats band */}
      <div className="relative border-t border-border/70 bg-black/45 backdrop-blur-sm">
        <dl className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
          {STATS.map((s) => (
            <div key={s.label} className="py-5 sm:py-6 px-3 sm:px-6 text-center flex flex-col">
              <dd className="order-1 font-display text-2xl sm:text-3xl font-semibold gold-text">
                {s.value}
              </dd>
              <dt className="order-2 mt-1 text-[0.65rem] sm:text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
