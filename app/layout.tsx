import type { Metadata, Viewport } from "next";
import "@fontsource-variable/overpass/wght.css";
import "@fontsource-variable/overpass/wght-italic.css";
import "./globals.css";
import { isHidden, site } from "@/content/site";
import Motion from "@/components/Motion";

const fullName = `${site.name.first} ${site.name.last}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://haanie.com"),
  title: fullName,
  description: `${fullName} builds Safar, the software his family's wholesale business runs on, and directs Steel City Codes in Denver.`,
  openGraph: {
    title: fullName,
    description: "Safar, Steel City Codes, and what I'm building next.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${fullName} on a green highway sign, with Safar, Steel City Codes and Grandview FBLA` }],
  },
  twitter: {
    card: "summary_large_image",
    title: fullName,
    description: "Safar, Steel City Codes, and what I'm building next.",
    images: ["/og.png"],
  },
  robots: isHidden() ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#E6E8E3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Motion />
      </body>
    </html>
  );
}
