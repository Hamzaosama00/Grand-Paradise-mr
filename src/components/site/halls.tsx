import Image from "next/image";
import { BadgeCheck, Users } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const HALLS = [
  {
    name: "The Grand Hall",
    capacity: "Up to 1,000 Guests",
    image: "/images/hall-grand.png",
    alt: "The Grand Hall at Paradise Grand Marquee — palatial banquet hall with royal stage and rows of round tables",
    idealFor: "Weddings · Walimas · Grand Receptions",
    description:
      "Our signature hall — a palatial column-free floor with a majestic royal stage, crystal chandeliers and room for grand seating plans of up to 1,000 guests.",
    amenities: ["Royal stage & LED wall", "Dedicated bridal room", "VIP family entrance", "Grand lobby & photo corner"],
  },
  {
    name: "The Royal Hall",
    capacity: "Up to 600 Guests",
    image: "/images/hall-royal.png",
    alt: "The Royal Hall — elegant emerald and gold banquet hall with chandeliers and ornate stage",
    idealFor: "Barat · Walima · Corporate Dinners",
    description:
      "Emerald-and-gold elegance with an ornate carved stage and warm ambient lighting — perfect for signature weddings and premium corporate evenings.",
    amenities: ["Crystal chandeliers", "Premium sound system", "Valet parking", "Climate controlled"],
  },
  {
    name: "The Garden & Family Hall",
    capacity: "Up to 300 Guests",
    image: "/images/hall-garden.png",
    alt: "The Garden and Family Hall — outdoor lawn with string lights, lanterns and elegant table settings",
    idealFor: "Mehndi · Birthdays · Family Events",
    description:
      "A versatile indoor hall paired with an open-air lawn, fairy-lit for intimate mehndis, engagements, birthdays and family gatherings.",
    amenities: ["Open-air lawn & indoor option", "Mehndi stage & dance floor", "Kids-friendly layout", "Flexible seating plans"],
  },
];

const UNIVERSAL = [
  "Full climate control",
  "24/7 generator backup",
  "Valet parking",
  "In-house catering",
  "Professional security",
  "Dedicated event manager",
];

export function Halls() {
  return (
    <section id="halls" className="py-20 sm:py-28" aria-labelledby="halls-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Venue"
          title="Three Halls, One Unforgettable Address"
          description="Three distinct event spaces on East Canal Road — from palatial 1,000-guest weddings to intimate family mehndis — all backed by world-class hospitality."
        />

        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          {HALLS.map((hall, i) => (
            <Reveal key={hall.name} delay={i * 0.12} className="h-full">
              <article className="card-luxury card-luxury-hover rounded-lg overflow-hidden h-full flex flex-col group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={hall.image}
                    alt={hall.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/65 backdrop-blur-sm border border-primary/40 px-3 py-1.5 text-xs font-semibold text-[#e8cf8f]">
                    <Users className="h-3.5 w-3.5" aria-hidden="true" />
                    {hall.capacity}
                  </span>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                    {hall.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary/90">
                    {hall.idealFor}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {hall.description}
                  </p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {hall.amenities.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-foreground/85">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#booking"
                    className="mt-6 inline-flex items-center justify-center rounded-sm border border-primary/40 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Enquire for this hall
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Every booking includes:{" "}
            <span className="text-foreground/90 font-medium">{UNIVERSAL.join("  ·  ")}</span>
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground/70">
            Hall capacities are indicative — your event manager will confirm the ideal seating plan for your guest count.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
