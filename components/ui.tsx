import type { ReactNode } from "react";
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

/** A photo, or a labelled placeholder until you add one. */
export function Photo({
  src,
  alt,
  label,
  className = "",
  width,
  height,
  eager = false,
  children,
}: {
  src: string | null;
  alt: string;
  label: string;
  className?: string;
  width?: number;
  height?: number;
  eager?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={`photo ${src ? "photo--filled" : ""} ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} width={width} height={height} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} decoding="async" />
      ) : (
        <div className="photo__empty">
          <span>Photo: {label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

export function Play() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 1.5v9l8-4.5z" fill="currentColor" />
    </svg>
  );
}
