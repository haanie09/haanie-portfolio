"use client";

import { useEffect, useState } from "react";

// Localhost-only palette switcher. Remove once a palette is chosen.
const THEMES = [
  { id: "dusk", name: "Dusk (original)", swatch: ["#f6efe4", "#e4572e", "#1f4e9c"] },
  { id: "alpenglow", name: "Alpenglow", swatch: ["#f2ecee", "#e0708a", "#3a3875"] },
  { id: "redrocks", name: "Red Rocks", swatch: ["#eceadf", "#cd5b36", "#3f5b4c"] },
  { id: "aspen", name: "Aspen", swatch: ["#eef1ee", "#e8a91c", "#1f4a43"] },
  { id: "bluehour", name: "Blue hour", swatch: ["#e9eef3", "#f07f3c", "#25336b"] },
];
const KEY = "palette-trial";

function apply(id: string) {
  if (id === "dusk") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.dataset.theme = id;
}

export function ThemePicker() {
  const [theme, setTheme] = useState("dusk");

  useEffect(() => {
    let saved: string | null = new URLSearchParams(location.search).get("theme");
    if (!saved) {
      try {
        saved = localStorage.getItem(KEY);
      } catch {}
    }
    if (saved && THEMES.some((t) => t.id === saved)) {
      setTheme(saved);
      apply(saved);
    }
  }, []);

  const choose = (id: string) => {
    setTheme(id);
    apply(id);
    try {
      localStorage.setItem(KEY, id);
    } catch {}
  };

  return (
    <div className="picker" role="radiogroup" aria-label="Palette">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="radio"
          aria-checked={theme === t.id}
          className="picker__opt"
          onClick={() => choose(t.id)}
        >
          <span className="picker__sw" aria-hidden="true">
            {t.swatch.map((c) => (
              <i key={c} style={{ background: c }} />
            ))}
          </span>
          {t.name}
        </button>
      ))}
    </div>
  );
}
