"use client";

/**
 * Demo login — /login.
 * Koi real auth nahi: single "Enter Demo →" button, demo creator session
 * sessionStorage mein set hota hai aur dashboard khul jata hai.
 */

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "@/components/language-provider";
import LangToggle from "@/components/lang-toggle";
import { buttonClasses } from "@/components/ui/button";
import { loginDemo } from "@/lib/store";
import { pageStrings } from "@/lib/i18n-pages";

export default function LoginPage() {
  const { lang } = useLang();
  const t = pageStrings[lang];
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const enter = () => {
    setBusy(true);
    setTimeout(() => {
      loginDemo();
      router.push("/dashboard");
    }, 350);
  };

  return (
    <main className="bg-grid flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-btn bg-gradient-to-br from-primary to-primary-dark text-base shadow-btn" aria-hidden>
            🌶️
          </span>
          <span className="text-xl font-bold tracking-tight">Tadka</span>
        </Link>
        <LangToggle />
      </header>

      <div className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-8">
            {/* Logo upar (ui-doc 6.8) */}
            <div className="flex h-14 w-14 items-center justify-center rounded-btn bg-gradient-to-br from-primary to-primary-dark text-2xl shadow-btn" aria-hidden>
              🌶️
            </div>
            <h1 className="mt-4 text-[24px] font-bold leading-snug">{t.login.heading}</h1>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.login.sub}</p>

            <div className="mt-6 rounded-card border border-primary/20 bg-primary/5 p-4 text-[13px]">
              <p className="text-muted">
                {t.login.userLabel} <span className="font-semibold text-ink">{t.login.asUser}</span>
              </p>
              <p className="mt-1 text-muted">{t.login.note}</p>
            </div>

            <button type="button" onClick={enter} disabled={busy} className={`${buttonClasses("primary")} mt-6 w-full`}>
              {busy ? "…" : t.login.enter}
            </button>

            <p className="mt-4 text-center text-[13px] text-muted">{t.login.magicNote}</p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-[15px] font-semibold text-primary transition hover:text-primary-dark">
              {t.login.back}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
