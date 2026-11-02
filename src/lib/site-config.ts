export const SITE = {
  name: "Paradise Grand Marquee",
  shortName: "Paradise Grand",
  tagline: "Grand Weddings & Corporate Events in Faisalabad",
  phone: "+92 301 5584444",
  phoneHref: "tel:+923015584444",
  whatsappNumber: "923015584444",
  whatsappDisplay: "+92 301 5584444",
  address: "East Canal Road, near FCCI / Zia Colony, Faisalabad, Punjab, Pakistan",
  addressShort: "East Canal Road, near FCCI / Zia Colony",
  city: "Faisalabad",
  mapsLink: "https://maps.app.goo.gl/QtwaSvmxLDDSEMUU7",
  mapsEmbed:
    "https://www.google.com/maps?q=Paradise+Grand+Marquee,+East+Canal+Road,+near+FCCI,+Faisalabad&output=embed",
  facebook: "https://www.facebook.com/paradisegrandmarquee/",
  instagram: "https://www.instagram.com/paradisegrandmarquee/",
  instagramHandle: "@paradisegrandmarquee",
  rating: 4.3,
  reviewCount: 946,
  maxGuests: 1000,
} as const;

export function waLink(message?: string) {
  const text = encodeURIComponent(
    message ?? "Hi, I would like to check availability for an event at Paradise Grand Marquee."
  );
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}

export const NAV_LINKS = [
  { href: "#halls", label: "Halls" },
  { href: "#events", label: "Events" },
  { href: "#packages", label: "Packages" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
] as const;
