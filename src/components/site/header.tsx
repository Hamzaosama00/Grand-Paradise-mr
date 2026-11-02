"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS, SITE, waLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" fill="none" className={className} aria-hidden="true">
      <rect
        x="22"
        y="2.5"
        width="27.5"
        height="27.5"
        rx="3"
        transform="rotate(45 22 2.5)"
        stroke="#c9a24b"
        strokeWidth="1.4"
      />
      <rect
        x="22"
        y="8.5"
        width="19"
        height="19"
        rx="2"
        transform="rotate(45 22 8.5)"
        stroke="#c9a24b"
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      <text
        x="22"
        y="27.5"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="14"
        fontWeight="600"
        fill="#e8cf8f"
      >
        PG
      </text>
    </svg>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Quick contact strip */}
      <div
        className={cn(
          "overflow-hidden bg-[#0c110e]/95 border-b border-border transition-all duration-300",
          scrolled ? "max-h-0 opacity-0 border-b-0" : "max-h-12 opacity-100"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between gap-3 h-9 text-xs sm:text-[0.8rem]">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors"
            aria-label={`Call ${SITE.name} at ${SITE.phone}`}
          >
            <Phone className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="font-medium">{SITE.phone}</span>
          </a>
          <p className="hidden md:block text-muted-foreground truncate">
            {SITE.addressShort}, {SITE.city}
          </p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors"
            aria-label="Chat with us on WhatsApp"
          >
            <MessageCircle className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="font-medium">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main navigation bar */}
      <div
        className={cn(
          "transition-all duration-300 border-b",
          scrolled
            ? "bg-[#090d0b]/90 backdrop-blur-md border-border shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-black/70 to-transparent border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 sm:h-[4.5rem] items-center justify-between gap-4">
            <Link href="#top" className="flex items-center gap-2.5 sm:gap-3 group" aria-label="Paradise Grand Marquee — back to top">
              <Monogram className="h-9 w-9 sm:h-11 sm:w-11 shrink-0" />
              <span className="leading-tight">
                <span className="block font-display text-base sm:text-lg font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors">
                  Paradise Grand
                </span>
                <span className="block text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.42em] text-primary">
                  Marquee
                </span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={SITE.phoneHref}
                className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary hover:border-primary hover:bg-primary/10 transition-all"
                aria-label={`Call us at ${SITE.phone}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
              </a>
              <Button
                asChild
                className="gold-gradient-bg text-primary-foreground font-semibold tracking-wide hover:opacity-90 hover:scale-[1.02] transition-all rounded-sm px-4 sm:px-6 h-10"
              >
                <a href="#booking">Check Date</a>
              </Button>

              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden rounded-sm border-border text-foreground hover:text-primary hover:border-primary h-10 w-10"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-[#0c110e] border-border w-[84vw] max-w-xs p-0"
                >
                  <SheetHeader className="p-5 border-b border-border text-left">
                    <SheetTitle className="font-display text-lg text-foreground flex items-center gap-2.5">
                      <Monogram className="h-8 w-8" />
                      Paradise Grand Marquee
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col px-5 py-4" aria-label="Mobile navigation">
                    {NAV_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="py-3.5 text-base font-medium text-foreground/85 border-b border-border/60 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                  <div className="px-5 pb-8 mt-auto flex flex-col gap-3">
                    <Button
                      asChild
                      className="gold-gradient-bg text-primary-foreground font-semibold rounded-sm"
                    >
                      <a href="#booking" onClick={() => setOpen(false)}>
                        Check Date Availability
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-primary/50 text-primary hover:bg-primary/10 rounded-sm"
                    >
                      <a
                        href={waLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                        Chat on WhatsApp
                      </a>
                    </Button>
                    <a
                      href={SITE.phoneHref}
                      className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {SITE.phone}
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
