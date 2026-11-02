import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, waLink } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const DETAILS = [
  {
    icon: MapPin,
    title: "Address",
    lines: [SITE.address],
  },
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    lines: [SITE.phone, "Call or message anytime"],
  },
  {
    icon: Clock,
    title: "Visiting Hours",
    lines: ["Open daily · 10:00 AM – 10:00 PM", "Events hosted till late"],
  },
];

export function Location() {
  return (
    <section id="location" className="py-20 sm:py-28" aria-labelledby="location-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Find Us"
          title="On East Canal Road, Faisalabad"
          description="Minutes from the FCCI and Zia Colony — with ample on-site parking and easy access from across the city."
        />

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-5 items-stretch">
          <Reveal className="lg:col-span-2">
            <div className="card-luxury rounded-lg p-6 sm:p-8 h-full flex flex-col">
              <ul className="space-y-6 flex-1">
                {DETAILS.map((d) => (
                  <li key={d.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/10">
                      <d.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                        {d.title}
                      </h3>
                      {d.lines.map((line) => (
                        <p key={line} className="mt-1 text-sm sm:text-[0.95rem] text-foreground/85 leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                <Button
                  asChild
                  className="gold-gradient-bg text-primary-foreground font-semibold rounded-sm h-11 hover:opacity-90"
                >
                  <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer">
                    <Navigation className="mr-2 h-4 w-4" aria-hidden="true" />
                    Get Directions
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-sm border-primary/40 text-primary hover:bg-primary/10 h-11"
                >
                  <a href={waLink()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="relative rounded-lg overflow-hidden border border-border h-full min-h-[320px] lg:min-h-[460px]">
              <iframe
                title="Map — Paradise Grand Marquee, East Canal Road, Faisalabad"
                src={SITE.mapsEmbed}
                className="absolute inset-0 h-full w-full grayscale-[35%] contrast-[1.05]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={SITE.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 left-3 rounded-sm bg-black/75 backdrop-blur-sm border border-primary/40 px-4 py-2 text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Paradise Grand Marquee — open in Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
