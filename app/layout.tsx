import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { isHidden, site } from "@/content/site";

const fullName = `${site.name.first} ${site.name.last}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://haanie.com"),
  title: fullName,
  description: `${fullName}: builder of VectisOS, Regional Director at Steel City Codes Denver. ${site.place}.`,
  openGraph: {
    title: fullName,
    description: "VectisOS, Steel City Codes, and what I'm building next.",
    type: "website",
  },
  robots: isHidden() ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#E9EEF3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
