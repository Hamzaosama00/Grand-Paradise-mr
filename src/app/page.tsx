import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Halls } from "@/components/site/halls";
import { Events } from "@/components/site/events";
import { Packages } from "@/components/site/packages";
import { Gallery } from "@/components/site/gallery";
import { Reviews } from "@/components/site/reviews";
import { Booking } from "@/components/site/booking";
import { Location } from "@/components/site/location";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { SITE } from "@/lib/site-config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: SITE.name,
  description:
    "Premier wedding, mehndi and corporate event venue in Faisalabad with halls for up to 1,000 guests, in-house catering, climate control, generator backup and valet parking.",
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "East Canal Road, near FCCI / Zia Colony",
    addressLocality: "Faisalabad",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  sameAs: [SITE.facebook, SITE.instagram],
  hasMap: SITE.mapsLink,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(SITE.rating),
    reviewCount: String(SITE.reviewCount),
    bestRating: "5",
  },
  amenityFeature: ["Climate control", "Generator backup", "Valet parking", "In-house catering"].map(
    (name) => ({ "@type": "LocationFeatureSpecification", name, value: true })
  ),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Halls />
        <Events />
        <Packages />
        <Gallery />
        <Reviews />
        <Booking />
        <Location />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
