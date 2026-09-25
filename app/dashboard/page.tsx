"use client";

/**
 * Creator dashboard — ui-doc 6.6.
 * 4 stat cards, 7-din ka bar chart (pure CSS), product list with
 * Edit/Delete, earnings-wall toggle, delete confirm dialog.
 * Demo: non-creator bhi sab dekh sakta hai (no auth guard — demo rule).
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "@/components/language-provider";
import LangToggle from "@/components/lang-toggle";
import { useDemoDB, showToast, useSession, logoutDemo } from "@/lib/store";
import { pageStrings } from "@/lib/i18n-pages";
import { formatINR, formatDateLabel, dropStatus } from "@/lib/utils";
import type { Product } from "@/lib/mock";
import ConfirmDialog from "@/components/confirm-dialog";

const dayNamesHi = ["Son", "Som", "Mang", "Budh", "Guru", "Shuk", "Shani"];
const dayNamesEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DashboardPage() {
  const { lang } = useLang();
  const t = pageStrings[lang];
  const router = useRouter();
  const { db, mutate, ready } = useDemoDB();
  const { creator } = useSession();

  const [confirmProduct, setConfirmProduct] = useState<Product | null>(null);
  const today = useMemo(() => new Date().toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { weekday: "long", day: "numeric", month: "long" }), [lang]);

  if (!ready || !db) {
    return <div className="flex min-h-screen items-center justify-center text-muted">…</div>;
  }

  const creatorId = creator?.id ?? "c-ayan";
  const me = db.creators.find((c) => c.id === creatorId) ?? db.creators[0];
  const myProducts = db.products.filter((p) => p.creatorId === me.id);

  /* ---- Stats ---- */
  const totalOrders = db.orders.filter((o) => o.creatorId === me.id).length + me.orders;
  const views = myProducts.reduce((s, p) => s + p.views, 0);
  const conversion = views > 0 ? ((totalOrders / views) * 100).toFixed(1) : "0";

  /* ---- 7-day chart data ---- */
  const chart = useMemo(() => {
    const buckets = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      return { date: d, count: 0 };
    });
    for (const o of db.orders) {
      const od = new Date(o.createdAt);
      od.setHours(0, 0, 0, 0);
      const idx = buckets.findIndex((b) => b.date.getTime() === od.getTime());
      if (idx >= 0) buckets[idx].count++;
    }
    return buckets;
  }, [db.orders]);
  const maxCount = Math.max(...chart.map((c) => c.count), 1);

  const toggleEarnings = () => {
    mutate((draft) => {
      const c = draft.creators.find((c) => c.id === me.id);
      if (c) c.earningsPublic = !c.earningsPublic;
      return draft;
    });
    showToast("success", me.earningsPublic ? t.dash.earningsOffToast : t.dash.earningsOnToast);
  };

  const doDelete = () => {
    if (!confirmProduct) return;
    const victim = confirmProduct;
    setConfirmProduct(null);
    mutate((draft) => {
      draft.products = draft.products.filter((p) => p.id !== victim.id);
      return draft;
    });
    showToast("success", t.dash.deletedToast);
  };

  return (
    <main className="min-h-screen bg-surface pb-20">
      {/* ---------- Topbar ---------- */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-btn bg-gradient-to-br from-primary to-primary-dark text-base shadow-btn" aria-hidden>
              🌶️
            </span>
            <span className="text-xl font-bold tracking-tight">Tadka</span>
            <span className="ml-1 hidden rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-bold text-accent sm:inline">
              {t.common.demoMode}
            </span>
            <span className="ml-1 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-bold text-accent sm:hidden">DEMO</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-site px-4 pt-8 sm:px-6">
        {/* ---------- Greeting row ---------- */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-[20px] font-bold md:text-[24px]">{t.dash.greeting}</h1>
            <p className="mt-0.5 text-[13px] text-muted">{today} · {t.dash.today}</p>
          </div>
          <div className="flex items-center gap-2">
            <LangToggle />
            <Link href="/demo/ayan" className="h-10 rounded-btn border border-primary px-3 text-[13px] font-semibold leading-[38px] text-primary transition hover:bg-primary/5">
              {t.dash.viewStore}
            </Link>
            <button
              type="button"
              onClick={() => {
                logoutDemo();
                router.push("/");
              }}
              className="h-10 rounded-btn px-3 text-[13px] font-semibold text-muted transition hover:text-ink"
            >
              {t.common.logout}
            </button>
          </div>
        </div>

        {/* ---------- 4 stat cards (ui-doc: ek row desktop, 2x2 mobile) ---------- */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <div className="rounded-card border border-line bg-white p-4 shadow-soft md:p-5">
            <p className="text-[13px] font-semibold text-muted">{t.dash.stats.revenue}</p>
            <p className="mt-1.5 text-[22px] font-bold leading-none text-success md:text-[26px]">{formatINR(me.earnings)}</p>
            <p className="mt-1.5 text-[12px] text-success">▲ 12.4% {t.dash.vsYesterday}</p>
          </div>
          <div className="rounded-card border border-line bg-white p-4 shadow-soft md:p-5">
            <p className="text-[13px] font-semibold text-muted">{t.dash.stats.orders}</p>
            <p className="mt-1.5 text-[22px] font-bold leading-none md:text-[26px]">{totalOrders}</p>
            <p className="mt-1.5 text-[12px] text-success">▲ 8.2% {t.dash.vsYesterday}</p>
          </div>
          <div className="rounded-card border border-line bg-white p-4 shadow-soft md:p-5">
            <p className="text-[13px] font-semibold text-muted">{t.dash.stats.views}</p>
            <p className="mt-1.5 text-[22px] font-bold leading-none md:text-[26px]">{views.toLocaleString("en-IN")}</p>
            <p className="mt-1.5 text-[12px] text-success">▲ 5.1% {t.dash.vsYesterday}</p>
          </div>
          <div className="rounded-card border border-line bg-white p-4 shadow-soft md:p-5">
            <p className="text-[13px] font-semibold text-muted">{t.dash.stats.conversion}</p>
            <p className="mt-1.5 text-[22px] font-bold leading-none md:text-[26px]">{conversion}%</p>
            <p className="mt-1.5 text-[12px] text-success">▲ 0.8% {t.dash.vsYesterday}</p>
          </div>
        </div>

        {/* ---------- Chart + settings ---------- */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {/* Chart — pure CSS bars */}
          <div className="rounded-card border border-line bg-white p-5 shadow-soft lg:col-span-2">
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="text-lg font-semibold">{t.dash.chartTitle}</h2>
                <p className="text-[13px] text-muted">{t.dash.chartSub}</p>
              </div>
              <span className="rounded-full bg-success/10 px-2.5 py-1 text-[12px] font-bold text-success">
                {chart.reduce((s, c) => s + c.count, 0)} orders / 7d
              </span>
            </div>
            <div className="mt-6 flex h-40 items-end gap-2 sm:gap-4">
              {chart.map((c, i) => {
                const h = Math.round((c.count / maxCount) * 100);
                const isToday = i === 6;
                const dayName = (lang === "hi" ? dayNamesHi : dayNamesEn)[c.date.getDay()];
                return (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-[12px] font-bold text-ink">{c.count}</span>
                    <div
                      className={`w-full rounded-t-btn ${isToday ? "bg-primary shadow-btn" : "bg-primary/25"} transition-all`}
                      style={{ height: `${Math.max(h, 6)}%` }}
                    />
                    <span className="text-[11px] text-muted">{dayName}</span>
                    <span className="hidden text-[10px] text-muted sm:block">{c.date.getDate()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Settings — earnings wall toggle */}
          <div className="rounded-card border border-line bg-white p-5 shadow-soft">
            <h2 className="text-lg font-semibold">{t.dash.settingsTitle}</h2>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-[15px] font-semibold">{t.dash.earningsToggle}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{t.dash.earningsHint}</p>
              </div>
              {/* Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={me.earningsPublic}
                onClick={toggleEarnings}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${me.earningsPublic ? "bg-success" : "bg-line"}`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${me.earningsPublic ? "left-6" : "left-1"}`}
                />
              </button>
            </div>
            <div className="mt-5 rounded-card bg-surface p-4 text-[13px] leading-relaxed text-muted">
              💡 <span className="font-semibold text-ink">Tip:</span>{" "}
              {lang === "hi"
                ? "Earnings wall ON karne se buyers ka trust badhta hai — build-in-public creators ke liye best."
                : "Turning on the earnings wall builds buyer trust — great for build-in-public creators."}
            </div>
          </div>
        </div>

        {/* ---------- Products list ---------- */}
        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t.dash.productsTitle} <span className="text-muted">({myProducts.length})</span></h2>
          <Link href="/dashboard/product/new" className="h-12 rounded-btn bg-primary px-4 text-[15px] font-semibold leading-[46px] text-white shadow-btn transition hover:bg-primary-dark">
            {t.dash.newProduct}
          </Link>
        </div>

        {myProducts.length === 0 ? (
          <div className="mt-4 rounded-card border border-dashed border-line bg-white p-10 text-center">
            <p className="text-3xl" aria-hidden>📦</p>
            <p className="mt-2 text-[15px] text-muted">{t.dash.empty}</p>
            <Link href="/dashboard/product/new" className="mt-4 inline-flex h-12 items-center rounded-btn bg-primary px-5 text-[15px] font-semibold text-white shadow-btn transition hover:bg-primary-dark">
              {t.dash.emptyCta}
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {myProducts.map((p) => {
              const status = dropStatus(p);
              return (
                <div key={p.id} className="flex flex-col gap-3 rounded-card border border-line bg-white p-4 shadow-soft sm:flex-row sm:items-center">
                  {/* Thumb */}
                  <div className={`flex h-16 w-full shrink-0 items-center justify-center rounded-btn bg-gradient-to-br from-primary/20 to-accent/10 text-2xl sm:w-24 ${p.status === "draft" ? "opacity-60" : ""}`}>
                    {p.coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.coverUrl} alt="" className="h-full w-full rounded-btn object-cover" />
                    ) : (
                      <span aria-hidden>{p.title.match(/[\u{1F300}-\u{1FAFF}]/u)?.[0] ?? "📦"}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{p.title}</h3>
                      {p.status === "draft" ? (
                        <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[11px] font-bold text-muted">{t.dash.draft}</span>
                      ) : status === "active" ? (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-white">{t.dash.dropLive}</span>
                      ) : status === "ended" ? (
                        <span className="rounded-full bg-error/10 px-2 py-0.5 text-[11px] font-bold text-error">{t.dash.soldOut}</span>
                      ) : (
                        <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success">{t.dash.published}</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[13px] text-muted">
                      {formatINR(p.price)} · {p.views.toLocaleString("en-IN")} {t.dash.viewsShort} · {p.soldQty} {t.dash.soldShort}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/demo/${me.username}/${p.id}`} className="flex h-10 items-center rounded-btn border border-line px-3 text-[13px] font-semibold text-ink transition hover:bg-surface">
                      👁 {t.dash.view}
                    </Link>
                    <Link href={`/dashboard/product/${p.id}`} className="flex h-10 items-center rounded-btn border border-primary px-3 text-[13px] font-semibold text-primary transition hover:bg-primary/5">
                      {t.dash.edit}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setConfirmProduct(p)}
                      className="flex h-10 items-center rounded-btn border border-error/40 px-3 text-[13px] font-semibold text-error transition hover:bg-error/5"
                    >
                      🗑 {t.dash.del}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ---------- Recent orders ---------- */}
        <div className="mt-4 rounded-card border border-line bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold">{t.dash.recentOrders}</h2>
          <div className="mt-3 divide-y divide-line">
            {[...db.orders]
              .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
              .slice(0, 5)
              .map((o) => {
                const prod = db.products.find((p) => p.id === o.productId);
                return (
                  <div key={o.id} className="flex items-center justify-between gap-3 py-2.5 text-[14px]">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{prod?.title ?? "—"}</p>
                      <p className="text-[12px] text-muted">{o.buyerName} · {formatDateLabel(o.createdAt)}</p>
                    </div>
                    <span className="shrink-0 font-bold text-success">+{formatINR(o.amount)}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmProduct !== null}
        title={t.dash.confirmTitle}
        message={(t.dash.confirmMsg ?? "").replace("{title}", confirmProduct?.title ?? "")}
        confirmLabel={t.dash.confirmYes}
        cancelLabel={t.common.cancel}
        onConfirm={doDelete}
        onCancel={() => setConfirmProduct(null)}
      />
    </main>
  );
}
