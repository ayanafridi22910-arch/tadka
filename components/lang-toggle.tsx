"use client";

import { useLang } from "./language-provider";

/** हिं / EN segmented toggle — navbar mein har page pe. */
export default function LangToggle() {
  const { lang, setLang } = useLang();

  const base =
    "flex h-10 items-center rounded-full px-3 text-xs font-semibold transition";
  const active = "bg-primary text-white";
  const inactive = "text-muted hover:text-ink";

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-line bg-white p-0.5"
      role="group"
      aria-label="Language / भाषा"
    >
      <button
        type="button"
        onClick={() => setLang("hi")}
        className={`${base} ${lang === "hi" ? active : inactive}`}
        aria-pressed={lang === "hi"}
      >
        हिं
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`${base} ${lang === "en" ? active : inactive}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
