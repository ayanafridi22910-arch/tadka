"use client";

/**
 * Payment success — /success/:orderId (ui-doc 6.5).
 * Green tick animation, order ID, Download button (sample PDF generate
 * hota hai — lib/utils.ts), email note, referral box + Copy Link.
 */

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLang } from "@/components/language-provider";
import LangToggle from "@/components/lang-toggle";
import { useDemoDB, showToast, copyText } from "@/lib/store";
import { pageStrings } from "@/lib/i18n-pages";
import { formatINR, generateSamplePdf, downloadUrl } from "@/lib/utils";

export default function SuccessPage() {
  const { lang } = useLang();
  const t = pageStrings[lang];
  const params = useParams<{ orderId: string }>();
  const { db, ready } = useDemoDB();

  const order = useMemo(() => db?.orders.find((o) => o.id === params.orderId), [db, params.orderId]);
  const product = useMemo(
    () => db?.products.find((p) => p.id === order?.productId),
    [db, order]
  );
  const creator = useMemo(
    () => db?.creators.find((c) => c.id === order?.creatorId),
    [db, order]
  );

  if (!ready || !db) {
    return <div className="flex min-h-screen items-center justify-center text-muted">…</div>;
  }

  if (!order || !product || !creator) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-3xl" aria-hidden>🧐</p>
        <h1 className="text-xl font-bold">{t.product.notFound}</h1>
        <Link href="/" className="font-semibold text-primary hover:underline">{t.store.notFoundCta}</Link>
      </main>
    );
  }

  const refLink = `${window.location.origin}/demo/${creator.username}/${product.id}?ref=${order.id}`;

  const onDownload = () => {
    const url = generateSamplePdf(product.title);
    downloadUrl(url, product.fileName?.replace(/\.[^.]+$/, "") + "-tadka-demo.pdf" || "tadka-demo.pdf");
    showToast("success", lang === "hi" ? "Download shuru!" : "Download started!");
  };

  return (
    <main className="min-h-screen bg-surface pb-16">
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4 sm:px-6">
          <Link href={`/demo/${creator.username}`} className="text-[15px] font-semibold text-muted transition hover:text-ink">
            {t.success.backStore}
          </Link>
          <LangToggle />
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6">
        <div className="rounded-card border border-line bg-white p-6 text-center shadow-card sm:p-8">
          {/* Green tick animation */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10" style={{ animation: "tickPop 0.5s ease-out" }}>
            <svg viewBox="0 0 52 52" width="52" height="52" aria-hidden>
              <circle cx="26" cy="26" r="24" fill="none" stroke="#16A34A" strokeWidth="2" />
              <path d="M15 27l8 8 14-16" fill="none" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="mt-4 text-[24px] font-bold">{t.success.heading}</h1>
          <p className="mt-1 text-[15px] text-muted">
            {t.success.orderId}: <span className="font-mono font-bold text-ink">{order.id}</span>
          </p>

          {/* Download */}
          <button
            type="button"
            onClick={onDownload}
            className="mt-6 h-14 w-full rounded-btn bg-primary text-[16px] font-bold text-white shadow-btn transition hover:bg-primary-dark active:scale-[0.98]"
          >
            📥 {t.success.download}
          </button>
          <p className="mt-2 text-[13px] text-muted">{t.success.emailNote}</p>

          {/* Order summary chhoti si */}
          <div className="mt-6 rounded-card bg-surface p-4 text-left text-[14px]">
            <div className="flex items-center justify-between">
              <span className="text-muted">{product.title}</span>
              <span className="font-bold">{formatINR(order.amount)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[13px] text-muted">
              <span>{order.buyerName} · {order.buyerEmail}</span>
              <span>✓ paid</span>
            </div>
          </div>

          {/* Referral box */}
          <div className="mt-4 rounded-card border border-primary/25 bg-primary/5 p-4 text-left">
            <h2 className="text-[15px] font-bold">{t.success.referTitle}</h2>
            <p className="mt-1 text-[13px] text-muted">{t.success.referDesc}</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                readOnly
                value={refLink}
                onFocus={(e) => e.currentTarget.select()}
                className="h-11 flex-1 rounded-btn border border-line bg-white px-3 text-[13px] text-muted outline-none"
              />
              <button
                type="button"
                onClick={() => copyText(refLink, t.success.copiedToast)}
                className="h-11 shrink-0 rounded-btn bg-primary px-5 text-[14px] font-semibold text-white shadow-btn transition hover:bg-primary-dark active:scale-[0.98]"
              >
                🔗 {t.success.copy}
              </button>
            </div>
          </div>

          {/* Next actions */}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link href={`/demo/${creator.username}`} className="flex h-12 flex-1 items-center justify-center rounded-btn border border-primary bg-white text-[15px] font-semibold text-primary transition hover:bg-primary/5">
              {t.success.backStore}
            </Link>
            <Link href="/dashboard" className="flex h-12 flex-1 items-center justify-center rounded-btn bg-primary text-[15px] font-semibold text-white shadow-btn transition hover:bg-primary-dark">
              {t.success.dashCta}
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-[13px] text-muted">{t.common.poweredBy} 🌶️</p>
      </div>
    </main>
  );
}
