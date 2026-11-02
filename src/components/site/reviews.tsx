import { Quote, Star } from "lucide-react";
import { SITE } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { Stars } from "./stars";
import { Reveal } from "./reveal";

const REVIEWS = [
  {
    name: "Ahmad Hassan",
    when: "2 months ago",
    rating: 5,
    text: "Booked the Grand Hall for my sister's barat. The stage decor and food were outstanding — staff was cooperative and the event manager kept everything perfectly on time. Highly recommended.",
  },
  {
    name: "Fatima Zahra",
    when: "3 months ago",
    rating: 5,
    text: "We hosted our walima here and the hall looked even better than the pictures. Valet parking made arrivals effortless for guests. Great value for the Premium package.",
  },
  {
    name: "Muhammad Bilal",
    when: "1 month ago",
    rating: 4,
    text: "Attended a corporate dinner — sound, lighting and service were all professional. Parking gets busy at peak time, so arrive early. Overall an excellent venue on Canal Road.",
  },
  {
    name: "Ayesha Khan",
    when: "2 weeks ago",
    rating: 5,
    text: "The mehndi setup was beyond beautiful — marigold decor, dance-floor lighting, everything perfect. The team handled our late-night celebration smoothly.",
  },
  {
    name: "Usman Tariq",
    when: "5 months ago",
    rating: 4,
    text: "Good food and elegant halls. Booking over WhatsApp was quick and transparent. Weekends fill up fast — book your date early.",
  },
  {
    name: "Sana Javed",
    when: "4 months ago",
    rating: 5,
    text: "From decor to catering, everything was top class for our engagement. The Royal Hall chandeliers look stunning in photographs. Thank you, team Paradise!",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-secondary/40" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Guest Reviews"
          title="Rated 4.3★ by 946+ Guests"
          description="Real feedback from families and companies who celebrated with us on East Canal Road."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_2.1fr] items-start">
          {/* Summary card */}
          <Reveal>
            <aside className="card-luxury rounded-lg p-6 sm:p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-[#1a73e8] shadow-md" aria-hidden="true">
                G
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Google Reviews
              </p>
              <p className="mt-3 font-display text-6xl font-semibold text-foreground">
                {SITE.rating}
              </p>
              <div className="mt-3 flex justify-center">
                <Stars rating={SITE.rating} starClass="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Based on <strong className="text-foreground">{SITE.reviewCount}+ reviews</strong>{" "}
                on Google Maps
              </p>
              <a
                href={SITE.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-sm border border-primary/40 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Star className="mr-2 h-4 w-4" aria-hidden="true" />
                Read reviews on Google
              </a>
              <p className="mt-4 text-[0.7rem] text-muted-foreground/70 leading-relaxed">
                Highlights curated from our public Google Business Profile.
              </p>
            </aside>
          </Reveal>

          {/* Review cards */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {REVIEWS.map((review, i) => (
              <Reveal key={review.name} delay={i * 0.06} className="h-full">
                <figure className="card-luxury card-luxury-hover rounded-lg p-5 sm:p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full gold-gradient-bg font-display text-base font-bold text-primary-foreground"
                        aria-hidden="true"
                      >
                        {review.name.charAt(0)}
                      </span>
                      <div>
                        <figcaption className="text-sm font-semibold text-foreground">
                          {review.name}
                        </figcaption>
                        <p className="text-xs text-muted-foreground">{review.when}</p>
                      </div>
                    </div>
                    <Quote className="h-5 w-5 text-primary/30" aria-hidden="true" />
                  </div>
                  <div className="mt-3">
                    <Stars rating={review.rating} starClass="h-3.5 w-3.5" />
                  </div>
                  <blockquote className="mt-3 text-sm text-foreground/85 leading-relaxed flex-1">
                    “{review.text}”
                  </blockquote>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
