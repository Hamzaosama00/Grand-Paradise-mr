"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const EVENTS = [
  {
    value: "weddings",
    label: "Weddings & Receptions",
    tab: "Weddings",
    image: "/images/event-wedding.png",
    alt: "Luxurious wedding stage with golden carved backdrop and fresh roses at Paradise Grand Marquee",
    heading: "Royal stage setups & elegant dining",
    description:
      "From the barat's grand entrance to the walima's golden farewell, our event stylists craft stages, floral arches and royal dining layouts your guests will remember for years.",
    points: [
      "Custom royal stage, floral arch & entrance decor",
      "Royal dining layouts for up to 1,000 guests",
      "Curated in-house wedding menus & live counters",
      "Dedicated bridal room and family VIP lounge",
    ],
  },
  {
    value: "mehndi",
    label: "Mehndi & Sangeet",
    tab: "Mehndi",
    image: "/images/event-mehndi.png",
    alt: "Vibrant mehndi celebration with marigold garlands, colorful lanterns and festive dance floor",
    heading: "Vibrant nights & spacious dance floors",
    description:
      "Marigold-draped stages, colorful lighting and a spacious dance floor — we set the perfect canvas for dholkis, sangeet nights and yellow-day celebrations.",
    points: [
      "Marigold & floral theme decoration packages",
      "Spacious dance floor with dynamic lighting",
      "Traditional dholki & stage seating arrangements",
      "Live food counters and mocktail bars",
    ],
  },
  {
    value: "corporate",
    label: "Corporate & Conferences",
    tab: "Corporate",
    image: "/images/event-corporate.png",
    alt: "Professional corporate conference setup with stage, podium and LED screen in a luxury hall",
    heading: "Professional setups, seamless execution",
    description:
      "Seminars, annual dinners, product launches and conferences — executed with professional staging, AV support and business-grade hospitality.",
    points: [
      "Stage, podium & large LED screen configurations",
      "Conference seating, seminar & theater layouts",
      "Corporate lunch & dinner catering packages",
      "On-site technical and event support crew",
    ],
  },
];

export function Events() {
  return (
    <section id="events" className="py-20 sm:py-28 bg-secondary/40" aria-labelledby="events-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Celebrations We Host"
          title="Every Occasion, Perfected"
          description="Weddings, mehndis and corporate gatherings — each hosted with its own style, stage and signature hospitality."
        />

        <Reveal>
          <Tabs defaultValue="weddings" className="w-full">
            <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3 h-auto p-1.5 rounded-sm bg-[#101613] border border-border" aria-label="Event categories">
              {EVENTS.map((e) => (
                <TabsTrigger
                  key={e.value}
                  value={e.value}
                  className="rounded-sm px-2 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-wide data-[state=active]:gold-gradient-bg data-[state=active]:text-primary-foreground text-muted-foreground data-[state=active]:shadow-md transition-all"
                >
                  {e.tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {EVENTS.map((e) => (
              <TabsContent key={e.value} value={e.value} className="mt-8 sm:mt-10">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border order-1">
                    <Image
                      src={e.image}
                      alt={e.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
                  </div>
                  <div className="order-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                      {e.heading}
                    </h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{e.description}</p>
                    <ul className="mt-6 space-y-3">
                      {e.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 border border-primary/40">
                            <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#booking"
                      className="mt-7 inline-flex items-center justify-center rounded-sm gold-gradient-bg px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 hover:scale-[1.02] transition-all"
                    >
                      Plan your {e.tab.toLowerCase()} with us
                    </a>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
