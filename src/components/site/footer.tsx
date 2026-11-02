import { Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { NAV_LINKS, SITE, waLink } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#070a09] border-t border-border" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-semibold text-foreground">
              Paradise Grand <span className="gold-text">Marquee</span>
            </p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.42em] text-primary">
              East Canal Road · Faisalabad
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Faisalabad's premier venue for grand weddings, vibrant mehndis and polished
              corporate events — hosting up to 1,000 guests with world-class hospitality.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Paradise Grand Marquee on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 hover:text-primary hover:border-primary transition-colors"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Paradise Grand Marquee on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 hover:text-primary hover:border-primary transition-colors"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Paradise Grand Marquee on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 hover:text-primary hover:border-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#booking"
                  className="text-sm font-medium text-primary hover:text-[#e8cf8f] transition-colors"
                >
                  Check Date Availability
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-start gap-2.5 hover:text-primary transition-colors"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-primary transition-colors"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  WhatsApp {SITE.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{SITE.address}</span>
              </li>
            </ul>
          </div>

          {/* Hours + CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              Reservations
            </h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Open daily · 10:00 AM – 10:00 PM
              <br />
              Site visits welcome — come see the halls before you book.
            </p>
            <a
              href="#booking"
              className="mt-5 inline-flex items-center justify-center rounded-sm gold-gradient-bg px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Check Date Availability
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/80">
          <p>© {new Date().getFullYear()} Paradise Grand Marquee. All rights reserved.</p>
          <p>
            Wedding &amp; event venue · {SITE.addressShort}, {SITE.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
