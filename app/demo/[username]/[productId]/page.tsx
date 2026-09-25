"use client";

/**
 * Product page — /demo/:username/:productId (ui-doc 6.3).
 * Cover, title, description, price + UPI note, Drop ho to countdown +
 * stock counter, mobile pe sticky bottom "Buy Now — ₹499", WhatsApp share.
 */

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLang } from "@/components/language-provider";
import LangToggle from "@/components/lang-toggle";
import { useDemoDB, showToast } from "@/lib/store";
import { pageStrings } from "@/lib/i18n-pages";
import { formatINR, dropStatus } from "@/lib/utils";
import Countdown from "@/components/countdown";

export default function ProductPage() {
  const { lang } = useLang();
  const t = pageStrings[lang];
  const params = useParams<{ username: string; productId: string }>();
  const { db, ready } = useDemoDB();

  if (!ready || !db) {
    return <div className="flex min-h-screen items-center justify-center text-muted">…</div>;
  }

  const creator = db.creators.find((c) => c.username.toLowerCase() === params.username.toLowerCase());
  const product = db.products.find((p) => p.id === params.productId && p.creatorId === creator?.id);

  if (!creator || !product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-3xl" aria-hidden>🤷</p>
        <h1 className="text-xl font-bold">{t.product.notFound}</h1>
        <Link href="/" className="font-semibold text-primary hover:underline">{t.store.notFoundCta}</Link>
      </main>
    );
  }

  const status = dropStatus(product);
  const soldOut = status === "ended";
  const dropLive = status === "active";

  const shareText = encodeURIComponent(
    `${product.title} — sirf ${formatINR(product.price)}! ${window.location.origin}/demo/${creator.username}/${product.id}`
  );

  return (
    <main className="min-h-screen bg-surface pb-28">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6">
          <Link href={`/demo/${creator.username}`} className="flex items-center gap-2 text-[15px] font-semibold text-muted transition hover:text-ink">
            ← {creator.displayName}
          </Link>
          <LangToggle />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
        {/* Cover — 16:9 */}
        <div className="relative aspect-video overflow-hidden rounded-card bg-gradient-to-br from-primary/25 via-primary/10 to-accent/10 shadow-soft">
          {product.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.coverUrl} alt={product.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-7xl opacity-60" aria-hidden>
              {product.title.match(/[\u{1F300}-\u{1FAFF}]/u)?.[0] ?? "📦"}
            </div>
          )}
          {dropLive && (
            <span className="absolute left-0 top-0 rounded-br-lg bg-accent px-3 py-1.5 text-[12px] font-bold text-white">
              🔥 DROP LIVE
            </span>
          )}
        </div>

        {/* Title + desc */}
        <div className="mt-5">
          <h1 className="text-[20px] font-bold leading-snug md:text-[24px]">{product.title}</h1>
          <p className="mt-1 text-[13px] text-muted">
            {creator.avatar} {creator.displayName} {t.product.fileIncluded ? `· ${product.fileName}` : ""}
          </p>
          <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-muted">{product.description}</p>
        </div>

        {/* Drop countdown */}
        {product.isDrop && (
          <div className="mt-5">
            <Countdown
              product={product}
              labels={
                lang === "en"
                  ? {
                      endedTitle: t.product.soldOut,
                      endedSub: t.product.soldOutNote,
                      endsIn: "Drop ends in",
                      startsIn: "Drop starts in",
                      stockPre: "Only",
                      stockPost: "left!",
                    }
                  : undefined
              }
            />
          </div>
        )}

        {/* Price + trust note (ui-doc 6.3 #3) */}
        <div className="mt-5 rounded-card border border-line bg-white p-5 shadow-soft">
          <div className="flex items-baseline justify-between">
            <span className="text-[28px] font-bold">{formatINR(product.price)}</span>
            {typeof product.maxQty === "number" && product.isDrop && (
              <span className="text-[13px] text-muted">
                {product.maxQty - product.soldQty} / {product.maxQty} left
              </span>
            )}
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-success">
            <span aria-hidden>✓</span> {t.product.upiNote} · {t.product.instant}
          </p>

          {/* Buy Now — desktop */}
          <button
            type="button"
            disabled={soldOut}
            onClick={() => {
              if (soldOut) return;
              showToast("info", t.product.buyToast);
              window.location.assign(`/checkout/${product.id}`);
            }}
            className={`mt-4 h-14 w-full rounded-btn text-[16px] font-bold transition-all active:scale-[0.98] ${
              soldOut
                ? "cursor-not-allowed bg-disabled text-white"
                : "bg-primary text-white shadow-btn hover:bg-primary-dark"
            }`}
          >
            {soldOut ? t.product.soldOut : `${t.product.buyNow} — ${formatINR(product.price)}`}
          </button>

          {/* WhatsApp share */}
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-btn border border-success bg-white text-[15px] font-semibold text-success transition hover:bg-success/5"
          >
            <span aria-hidden>💬</span> {t.product.share}
          </a>
        </div>

        <div className="mt-4 text-center">
          <Link href={`/demo/${creator.username}`} className="text-[15px] font-semibold text-primary hover:underline">
            {t.product.backToStore}
          </Link>
        </div>
      </div>

      {/* Sticky bottom Buy Now — mobile (ui-doc 6.3 #5) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <button
          type="button"
          disabled={soldOut}
          onClick={() => window.location.assign(`/checkout/${product.id}`)}
          className={`flex h-14 w-full items-center justify-center rounded-btn text-[16px] font-bold transition-all active:scale-[0.98] ${
            soldOut ? "cursor-not-allowed bg-disabled text-white" : "bg-primary text-white shadow-btn"
          }`}
        >
          {soldOut ? t.product.soldOut : `${t.product.buyNow} — ${formatINR(product.price)}`}
        </button>
      </div>
    </main>
  );
}
