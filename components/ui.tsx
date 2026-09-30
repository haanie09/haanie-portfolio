import type { ReactNode } from "react";
import type { Words } from "@/content/site";

/** Your words if written, otherwise a dashed prompt box. */
export function Slot({ w, dark = false, big = false, className = "" }: { w: Words; dark?: boolean; big?: boolean; className?: string }) {
  if (w.text) {
    return big ? <p className={`quote ${className}`}>{w.text}</p> : <p className={`words ${className}`}>{w.text}</p>;
  }
  return (
    <div className={`slot ${dark ? "slot--dark" : ""} ${big ? "slot--big" : ""} ${className}`}>
      <span className="slot__label">Your words · {w.q}</span>
      <span className="slot__prompt">{w.prompt}</span>
    </div>
  );
}

const Camera = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M3 8h3l2-3h8l2 3h3v11H3z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

/** A photo, or a labelled placeholder until you add one. */
export function Photo({ src, alt, label, className = "", children }: { src: string | null; alt: string; label: string; className?: string; children?: ReactNode }) {
  return (
    <div className={`photo ${src ? "photo--filled" : ""} ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="photo__empty">
          <Camera />
          <span className="mono">Photo · {label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

export function Kicker({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "sun" | "muted" | "ink" }) {
  return <span className={`mono kicker kicker--${tone}`}>{children}</span>;
}

export function Play() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 1.5v9l8-4.5z" fill="var(--sun)" />
    </svg>
  );
}
