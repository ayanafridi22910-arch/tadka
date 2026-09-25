"use client";

/**
 * Public storefront — /demo/:username (ui-doc 6.2).
 * Purple gradient cover strip, gol avatar, naam + bio, earnings badge
 * (agar creator ne ON kiya), product cards, social links, "Powered by".
 */

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLang } from "@/components/language-provider";
import LangToggle from "@/components/lang-toggle";
import { useDemoDB } from "@/lib/store";
import { pageStrings } from "@/lib/i18n-pages";
import { formatINR, dropStatus } from "@/lib/utils";
import type { Creator, Product } from "@/lib/mock";
import ProductCard from "@/components/product-card";

export default function StorefrontPage() {
  const { lang } = useLang();
  const t = pageStrings[lang];
  const params = useParams<{ username: string }>();
  const { db, ready } = useDemoDB();

  const [localNotReady, setLocalNotReady] = useState(false);

  if (!ready || !db) {
    return <div className="flex min-h-screen items-center justify-center text-muted">…</div>;
  }

  const creator: Creator | undefined = db.creators.find(
    (c) => c.username.toLowerCase() === params.username.toLowerCase()
  );
  if (!creator) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-3xl" aria-hidden>🤷</p>
        <h1 className="text-xl font-bold">{t.store.notFound}</h1>
        <Link href="/" className="font-semibold text-primary hover:underline">{t.store.notFoundCta}</Link>
        {localNotReady && <p className="text-[13px] text-muted">…</p>}
      </main>
    );
  }

  const products: Product[] = db.products.filter(
    (p) => p.creatorId === creator.id && p.status === "published"
  );

  return (
    <main className="min-h-screen bg-surface pb-16">
      {/* ---------- Cover strip + profile (ui-doc 6.2 #1) ---------- */}
      <div className="relative bg-gradient-to-br from-primary via-primary-dark to-ink px-4 pb-20 pt-8 sm:px-6">
        <div className="mx-auto flex max-w-site items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold text-white/90 transition hover:text-white">
            <span aria-hidden>🌶️</span> Tadka
          </Link>
          <div className="flex items-center gap-2">
            <LangToggle />
            <Link href="/dashboard" className="flex h-10 items-center rounded-full bg-white/15 px-4 text-[13px] font-semibold text-white backdrop-blur transition hover:bg-white/25">
              {t.common.dashboard}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto -mt-16 max-w-site px-4 sm:px-6">
        {/* Profile card */}
        <div className="rounded-card border border-line bg-white p-5 text-center shadow-card sm:p-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary/30 to-accent/20 text-3xl shadow-soft -mt-14">
            <span aria-hidden>{creator.avatar}</span>
          </div>
          <h1 className="mt-3 text-[20px] font-bold">{creator.displayName}</h1>
          <p className="mx-auto mt-1 max-w-md text-[15px] leading-relaxed text-muted">{creator.bio}</p>

          {/* Earnings badge (ui-doc 5.7) — sirf jab creator ne ON kiya */}
          {creator.earningsPublic && (
            <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-warning/40 bg-gradient-to-r from-warning/15 to-accent/10 px-4 py-2 text-[15px] font-bold">
              <span aria-hidden>💰</span>
              <span>
                {formatINR(creator.earnings)} {t.store.kamaye}
              </span>
              <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-bold text-success">
                ✓ {t.store.verified}
              </span>
            </div>
          )}
        </div>

        {/* ---------- Products ---------- */}
        <h2 className="mt-8 text-[20px] font-bold md:text-[24px]">{t.store.products}</h2>
        {products.length === 0 ? (
          <div className="mt-4 rounded-card border border-dashed border-line bg-white p-10 text-center text-[15px] text-muted">
            {lang === "hi" ? "Abhi koi product nahi." : "No products yet."}
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                href={`/demo/${creator.username}/${p.id}`}
                dropLabel="DROP"
              />
            ))}
          </div>
        )}

        {/* ---------- Custom links ---------- */}
        {creator.links.length > 0 && (
          <div className="mt-8 space-y-2">
            {creator.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-btn border border-primary bg-white px-5 text-[15px] font-semibold text-primary shadow-soft transition hover:bg-primary/5"
              >
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        )}

        <p className="mt-10 text-center text-[13px] text-muted">{t.common.poweredBy} 🌶️</p>
      </div>
    </main>
  );
}
