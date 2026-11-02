import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://paradise-grand-marquee.vercel.app"
  ),
  title: "Paradise Grand Marquee | Wedding & Event Venue in Faisalabad",
  description:
    "Paradise Grand Marquee — Faisalabad's premier wedding & corporate event venue on East Canal Road. Halls for up to 1,000 guests, luxury decor, in-house catering. Rated 4.3★ by 946+ Google reviewers. Check date availability online.",
  keywords: [
    "Paradise Grand Marquee",
    "wedding marquee Faisalabad",
    "event venue Faisalabad",
    "marquee East Canal Road",
    "wedding hall Faisalabad",
    "corporate event venue Faisalabad",
    "mehndi venue Faisalabad",
    "booking marquee Faisalabad",
  ],
  authors: [{ name: "Paradise Grand Marquee" }],
  openGraph: {
    title: "Paradise Grand Marquee — Grand Weddings & Corporate Events in Faisalabad",
    description:
      "Host unforgettable moments for up to 1,000 guests at Faisalabad's premier venue on East Canal Road. Rated 4.3/5 across 946+ Google reviews.",
    type: "website",
    locale: "en_PK",
    siteName: "Paradise Grand Marquee",
    images: [{ url: "/images/hero.png", width: 1440, height: 704, alt: "Paradise Grand Marquee banquet hall" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paradise Grand Marquee | Wedding & Event Venue in Faisalabad",
    description:
      "Grand weddings, mehndi and corporate events for up to 1,000 guests. East Canal Road, Faisalabad. Rated 4.3★ by 946+ reviewers.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090d0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
