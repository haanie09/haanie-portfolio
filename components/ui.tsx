import type { ReactNode } from "react";
import Image from "next/image";
import type { Words } from "@/content/site";

/** Your words if written, otherwise a dashed prompt box. */
export function Slot({ w, dark = false, big = false, className = "" }: { w: Words; dark?: boolean; big?: boolean; className?: string }) {
  if (w.text) {
    return big ? <p className={`quote ${className}`}>{w.text}</p> : <p className={`words ${className}`}>{w.text}</p>;
  }
  return (
    <div className={`slot ${dark ? "slot--dark" : ""} ${big ? "slot--big" : ""} ${className}`}>
      <span className="slot__label">Your words, {w.q}</span>
      <span className="slot__prompt">{w.prompt}</span>
    </div>
  );
}

/** A photo, or a labelled placeholder until you add one. Served resized for each screen by next/image. */
export function Photo({
  src,
  alt,
  label,
  className = "",
  width,
  height,
  sizes = "100vw",
  eager = false,
  children,
}: {
  src: string | null;
  alt: string;
  label: string;
  className?: string;
  width: number;
  height: number;
  /** How wide the photo renders, so phones don't download the desktop file. */
  sizes?: string;
  eager?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={`photo ${src ? "photo--filled" : ""} ${className}`}>
      {src ? (
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} preload={eager} />
      ) : (
        <div className="photo__empty">
          <span>Photo: {label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

/** A link that leaves the site: opens a new tab and says so to screen readers. */
export function Out({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Play() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 1.5v9l8-4.5z" fill="currentColor" />
    </svg>
  );
}

/** The arrow on an exit sign: this row leads somewhere further down the page. */
export function Exit() {
  return (
    <svg className="exit" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v15M5.5 12.5 12 19l6.5-6.5" />
    </svg>
  );
}
