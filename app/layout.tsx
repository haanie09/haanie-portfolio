import type { Metadata, Viewport } from "next";
import "@fontsource-variable/overpass/wght.css";
import "@fontsource-variable/overpass/wght-italic.css";
import "./globals.css";
import { isHidden, site } from "@/content/site";
import Motion from "@/components/Motion";

const fullName = `${site.name.first} ${site.name.last}`;
const description = `${fullName} is a senior at ${site.school} in ${site.place}. He built Safar, the software his family’s wholesale business runs on, and directs Steel City Codes in Denver.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${fullName} | Founder of Safar, ${site.school}`,
  description,
  alternates: { canonical: "/" },
  authors: [{ name: fullName, url: site.url }],
  openGraph: {
    title: fullName,
    description,
    url: "/",
    siteName: fullName,
    type: "profile",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${fullName} on a green highway sign, with Safar, Steel City Codes and Grandview FBLA` }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullName,
    description,
    images: ["/og.png"],
  },
  robots: isHidden() ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#E6E8E3",
};

/** Tells search engines who this page is about, so a search for the name finds it. */
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: fullName,
  url: site.url,
  image: `${site.url}/photos/fall-pumpkin.jpg`,
  email: `mailto:${site.email}`,
  description,
  jobTitle: "Founder and developer",
  worksFor: { "@type": "Organization", name: "Safar", url: site.links.demo },
  affiliation: [
    { "@type": "HighSchool", name: site.school, address: { "@type": "PostalAddress", addressLocality: "Aurora", addressRegion: "CO", addressCountry: "US" } },
    { "@type": "Organization", name: "Steel City Codes", description: "Regional Director, Denver" },
    { "@type": "Organization", name: "Grandview FBLA", description: "Data Officer" },
  ],
  address: { "@type": "PostalAddress", addressLocality: "Aurora", addressRegion: "CO", addressCountry: "US" },
  award: [
    "FBLA Colorado State Champion, Website Design (2025)",
    "FBLA Colorado State Champion, Website Coding & Development (2026)",
    "DECA Colorado State, 2nd place, Integrated Marketing Campaign–Product (2026)",
  ],
  sameAs: [site.links.github, site.links.linkedin, site.links.x].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Motion />
        {isHidden() ? null : <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />}
      </body>
    </html>
  );
}
