"use client";

import Link from "next/link";
import { useLang } from "@/components/language-provider";
import LangToggle from "@/components/lang-toggle";
import { buttonClasses } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/* Landing page — ui-design-doc 6.1 structure + visual polish:         */
/* dotted-grid hero, gradient heading, floating phone mockup,          */
/* marquee proof strip, dark drop showcase, hover-lift cards.          */
/* Colors follow doc rule: purple = action, orange = urgency,          */
/* green = paisa/success. Mobile-first, 1100px desktop.                */
/* ------------------------------------------------------------------ */

const marqueeItems = [
  "Priya · Presets", "Rahul · Ebooks", "Ananya · Notion packs", "Vikram · Mini-course",
  "Sana · LUTs", "Arjun · Templates", "Meera · Wallpapers", "Kabir · Guides",
];

export default function LandingPage() {
  const { t } = useLang();

  return (
    <main className="min-h-screen overflow-x-clip">
      {/* ============ NAVBAR (ui-doc 5.8) ============ */}
      <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-btn bg-gradient-to-br from-primary to-primary-dark text-base shadow-btn" aria-hidden>
              🌶️
            </span>
            <span className="text-xl font-bold tracking-tight">Tadka</span>
          </Link>

          <nav className="hidden items-center gap-7 text-[15px] text-muted md:flex">
            <a href="#how" className="transition hover:text-ink">{t.nav.how}</a>
            <a href="#features" className="transition hover:text-ink">{t.nav.features}</a>
            <a href="#pricing" className="transition hover:text-ink">{t.nav.pricing}</a>
          </nav>

          <div className="flex items-center gap-2">
            <LangToggle />
            <Link href="/login" className="hidden h-10 items-center px-3 text-[15px] font-semibold text-ink transition hover:text-primary sm:flex">
              {t.nav.login}
            </Link>
            <Link
              href="/signup"
              className="hidden h-12 items-center rounded-btn bg-primary px-5 text-[15px] font-semibold text-white shadow-btn transition-all hover:bg-primary-dark active:scale-[0.98] sm:inline-flex"
            >
              {t.nav.cta}
            </Link>
            {/* Mobile hamburger (ui-doc section 7) */}
            <button type="button" aria-label="Menu" className="flex h-12 w-12 items-center justify-center rounded-btn text-ink md:hidden">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ============ HERO (ui-doc 6.1 #2) ============ */}
      <section className="bg-grid relative">
        {/* Decorative glow blobs */}
        <div className="blob absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 bg-primary/20 md:h-96 md:w-96" aria-hidden />
        <div className="blob absolute right-[8%] top-40 h-48 w-48 bg-accent/15" aria-hidden />

        <div className="relative mx-auto grid max-w-site gap-12 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-2 md:items-center md:gap-10 md:pb-24 md:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[13px] font-semibold text-primary">
              🇮🇳 Bharat ke creators ke liye
            </span>

            {/* Hero heading: 28px mobile / 40px desktop, bold */}
            <h1 className="mt-5 text-[28px] font-bold leading-[1.15] md:text-[40px]">
              {t.hero.titlePre}
              <span className="text-gradient">{t.hero.titleBold}</span>
              {t.hero.titlePost}
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted md:text-base">
              {t.hero.sub}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className={`${buttonClasses("primary")} shadow-btn`}>
                {t.hero.cta} <span aria-hidden>→</span>
              </Link>
              <a href="#how" className={buttonClasses("secondary")}>
                {t.nav.how}
              </a>
            </div>

            {/* Trust + rating lines */}
            <div className="mt-6 space-y-1.5">
              <p className="flex items-center gap-2 text-[13px] text-muted">
                <span className="text-success" aria-hidden>✓</span> {t.hero.trust}
              </p>
              <p className="flex items-center gap-2 text-[13px] text-muted">
                <span className="text-warning" aria-hidden>★</span> {t.social.rating}
              </p>
            </div>
          </div>

          {/* Phone mockup — floating, purple glow behind */}
          <div className="relative mx-auto w-full max-w-[300px]">
            <div className="blob absolute inset-6 bg-primary/30" aria-hidden />
            <div className="relative animate-float rounded-[2.4rem] border-8 border-ink bg-white shadow-card">
              <div className="rounded-[1.7rem] bg-surface p-4">
                {/* Profile */}
                <div className="flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 text-xl">
                    🧑‍🎨
                  </div>
                  <p className="mt-2 text-sm font-semibold">{t.mockup.name}</p>
                  <p className="text-[13px] text-muted">{t.mockup.bio}</p>
                </div>

                {/* Earnings badge (ui-doc 5.7) */}
                <div className="mt-3 rounded-card border border-warning/30 bg-warning/10 py-1.5 text-center text-[13px] font-semibold">
                  {t.mockup.earnings}
                </div>

                {/* Product card with DROP ribbon (ui-doc 5.2, 5.3, 5.4) */}
                <div className="relative mt-3 overflow-hidden rounded-card border border-line bg-white shadow-soft">
                  <span className="absolute right-0 top-0 z-10 rounded-bl-lg bg-accent px-2 py-1 text-[11px] font-bold text-white">
                    {t.mockup.ribbon}
                  </span>
                  <div className="h-20 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10" />
                  <div className="p-3">
                    <p className="animate-pulse-soft text-center font-mono text-lg font-bold tracking-widest text-accent">
                      {t.mockup.timer}
                    </p>
                    <p className="text-center text-[13px] text-muted">{t.mockup.timerLabel}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[22px] font-bold leading-none">₹299</span>
                      <span className="inline-flex h-9 items-center rounded-btn bg-primary px-3 text-[13px] font-semibold text-white shadow-btn">
                        {t.mockup.buyNow}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px]">
                      {t.mockup.stockPre}
                      <span className="font-bold text-accent">{t.mockup.stockNum}</span>
                      {t.mockup.stockPost}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-center text-[11px] text-muted">{t.mockup.poweredBy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social proof marquee strip */}
        <div className="relative border-y border-line/70 bg-white/70 py-3 backdrop-blur">
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-[13px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
                {item} <span className="font-semibold text-ink">₹50k+</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3 STEPS (ui-doc 6.1 #3) ============ */}
      <section id="how" className="py-16 md:py-24">
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="mx-auto max-w-xl text-center">
            {/* Section heading: 20px mobile / 24px desktop */}
            <h2 className="text-[20px] font-bold md:text-[24px]">{t.steps.heading}</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.steps.items.map((s, i) => (
              <div
                key={s.title}
                className="group rounded-card border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-bold text-white shadow-btn">
                    {i + 1}
                  </span>
                  <span className="text-3xl transition-transform group-hover:scale-110" aria-hidden>{s.emoji}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DROP SHOWCASE — dark purple feature moment ============ */}
      <section className="relative overflow-hidden bg-ink py-16 md:py-24">
        <div className="blob absolute -left-20 top-10 h-64 w-64 bg-primary/40" aria-hidden />
        <div className="blob absolute -right-16 bottom-0 h-72 w-72 bg-accent/20" aria-hidden />

        <div className="relative mx-auto grid max-w-site items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div className="text-white">
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-accent">
              🔥 {t.dropShow.kicker}
            </span>
            <h2 className="mt-3 text-[24px] font-bold leading-snug md:text-[28px]">
              {t.dropShow.heading}
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/70">
              {t.dropShow.sub}
            </p>

            {/* Live-feel countdown demo */}
            <div className="mt-7 flex gap-2.5 font-mono" aria-hidden>
              {["02", "14", "33", "10"].map((unit, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="flex h-16 w-14 items-center justify-center rounded-btn bg-white/10 text-2xl font-bold text-white ring-1 ring-white/15 md:h-[72px] md:w-16">
                    {unit}
                  </span>
                  <span className="mt-1.5 text-[11px] uppercase tracking-wider text-white/50">
                    {["din", "ghnte", "min", "sec"][i]}
                  </span>
                </div>
              ))}
            </div>

            {/* Stock progress bar */}
            <div className="mt-6 max-w-xs">
              <div className="flex justify-between text-[13px] text-white/60">
                <span>🔥 Sirf <span className="font-bold text-accent">7</span> bache hain!</span>
                <span>43/50</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-accent to-warning" />
              </div>
            </div>
          </div>

          {/* Sold-out vs live cards */}
          <div className="space-y-4">
            <div className="animate-float rounded-card border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Midnight Preset Pack</p>
                  <p className="mt-1 font-mono text-sm font-bold tracking-widest text-accent">01 : 22 : 47 : 09</p>
                </div>
                <span className="rounded-btn bg-accent px-3 py-2 text-sm font-bold text-white">₹199</span>
              </div>
            </div>
            <div className="rounded-card border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white/60 line-through">Notion Creator OS</p>
                  <p className="mt-1 text-sm font-bold text-error">SOLD OUT</p>
                </div>
                <span className="rounded-btn bg-white/10 px-3 py-2 text-sm font-bold text-white/40">₹499</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES STRIP (ui-doc 6.1 #4) ============ */}
      <section id="features" className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <h2 className="text-center text-[20px] font-bold md:text-[24px]">{t.features.heading}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.features.items.map((f) => (
              <div
                key={f.title}
                className="group rounded-card border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-card bg-primary/10 text-2xl transition-transform group-hover:scale-110" aria-hidden>
                  {f.emoji}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING (ui-doc 6.1 #5) ============ */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="mx-auto max-w-site px-4 sm:px-6">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-[20px] font-bold md:text-[24px]">{t.pricing.heading}</h2>
            <p className="mt-2 text-[15px] text-muted">{t.pricing.sub}</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {/* Free plan */}
            <div className="rounded-card border border-line bg-white p-6 shadow-soft md:p-8">
              <h3 className="text-lg font-semibold">{t.pricing.free.name}</h3>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="text-[22px] font-bold">{t.pricing.free.price}</span>
                <span className="text-[13px] text-muted">{t.pricing.perMonth}</span>
              </p>
              <p className="mt-1 text-[13px] text-muted">{t.pricing.free.tag}</p>
              <ul className="mt-5 space-y-2.5 text-[15px]">
                {t.pricing.free.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-[11px] text-success">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className={`${buttonClasses("secondary")} mt-7`}>
                {t.pricing.free.cta}
              </Link>
            </div>

            {/* Pro plan — highlighted */}
            <div className="relative rounded-card border-2 border-primary bg-white p-6 shadow-card md:p-8">
              <span className="absolute -top-3.5 left-6 rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-white shadow-soft">
                {t.pricing.popular}
              </span>
              <h3 className="text-lg font-semibold">{t.pricing.pro.name}</h3>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="text-[22px] font-bold">{t.pricing.pro.price}</span>
                <span className="text-[13px] text-muted">{t.pricing.perMonth}</span>
              </p>
              <p className="mt-1 text-[13px] text-muted">{t.pricing.pro.tag}</p>
              <ul className="mt-5 space-y-2.5 text-[15px]">
                {t.pricing.pro.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-[11px] text-success">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className={`${buttonClasses("primary")} mt-7`}>
                {t.pricing.pro.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="px-4 pb-16 sm:px-6 md:pb-24">
        <div className="relative mx-auto max-w-site overflow-hidden rounded-card bg-gradient-to-br from-primary via-primary-dark to-ink px-6 py-14 text-center text-white sm:px-12">
          <div className="blob absolute -right-10 -top-10 h-48 w-48 bg-white/10" aria-hidden />
          <h2 className="relative text-[24px] font-bold md:text-[28px]">
            {t.hero.cta} 🍛
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-[15px] text-white/75">
            {t.social.proof}
          </p>
          <p className="relative mt-2 text-[13px] text-white/60">{t.social.verified}</p>
          <Link
            href="/signup"
            className="relative mt-8 inline-flex h-12 items-center rounded-btn bg-white px-8 text-[15px] font-semibold text-primary shadow-soft transition-all hover:bg-white/90 active:scale-[0.98]"
          >
            {t.hero.cta} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ============ FOOTER (ui-doc 6.1 #6) ============ */}
      <footer className="border-t border-line py-10">
        <div className="mx-auto flex max-w-site flex-col items-center gap-4 px-4 text-[13px] text-muted sm:flex-row sm:justify-between sm:px-6">
          <span className="flex items-center gap-1.5 font-semibold text-ink">
            Tadka <span aria-hidden>🌶️</span> · {t.footer.madeIn}
          </span>
          <nav className="flex flex-wrap justify-center gap-5">
            {t.footer.links.map((l) => (
              <a key={l} href="#" className="transition hover:text-ink">{l}</a>
            ))}
          </nav>
          <span>{t.footer.rights.replace("{year}", String(new Date().getFullYear()))}</span>
        </div>
      </footer>
    </main>
  );
}
