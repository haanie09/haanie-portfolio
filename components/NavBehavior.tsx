"use client";
import { useEffect } from "react";

/** Sections without their own nav link count as the one above them. */
const PARENT: Record<string, string> = { deleted: "problems", why: "beyond" };

/**
 * The nav's two jobs that need JS: close the phone menu once it has done its work
 * (link tap, Esc, a tap outside), and mark which section you're reading.
 */
export default function NavBehavior() {
  useEffect(() => {
    const menu = document.querySelector<HTMLDetailsElement>(".nav__menu");
    const close = () => {
      if (menu?.open) menu.open = false;
    };
    const onClick = (e: MouseEvent) => {
      if (!menu?.open) return;
      const t = e.target as Element;
      if (!menu.contains(t) || t.closest(".nav__sheet a")) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !menu?.open) return;
      close();
      menu.querySelector("summary")?.focus();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);

    const links = [...document.querySelectorAll<HTMLAnchorElement>(".nav a[href^='#']")];
    const mark = (id: string | null) => {
      for (const a of links) {
        if (id && a.hash === `#${id}`) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      }
    };
    // A section is "current" while it crosses a thin band a third of the way down the screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          mark(id === "top" ? null : (PARENT[id] ?? id));
        }
      },
      { rootMargin: "-33% 0px -66% 0px" },
    );
    document.querySelectorAll("main section[id], footer[id]").forEach((el) => io.observe(el));

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      io.disconnect();
    };
  }, []);
  return null;
}
