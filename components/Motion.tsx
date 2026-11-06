"use client";
import { useEffect } from "react";

/** Plays the page's few motions once, when they scroll into view. Does nothing for reduced motion. */
export default function Motion() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("motion");
    const count = (el: HTMLElement) => {
      // Keeps any prefix/suffix ("~120", "280+") and animates only the number.
      const m = /^(\D*)(\d+)(\D*)$/.exec(el.dataset.count ?? "");
      if (!m) return;
      const [, pre, num, post] = m;
      const end = Number(num);
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1100);
        el.textContent = pre + String(Math.round(end * (1 - Math.pow(1 - p, 3)))) + post;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (el.dataset.count) count(el);
          el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal], [data-count]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
