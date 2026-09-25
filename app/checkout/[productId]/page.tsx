"use client";

/**
 * Fake checkout — /checkout/:productId (ui-doc 6.4 + demo prompt #8).
 * Steps: order summary + name/email form (validation) → "Pay" →
 * simulated UPI screen (fake QR + 30-sec timer + Approve button) →
 * order localStorage mein save → /success/:orderId redirect.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useLang } from "@/components/language-provider";
import LangToggle from "@/components/lang-toggle";
import { useDemoDB, showToast } from "@/lib/store";
import { pageStrings } from "@/lib/i18n-pages";
import { formatINR, makeId, dropStatus } from "@/lib/utils";

type Step = "form" | "upi";

export default function CheckoutPage() {
  const { lang } = useLang();
  const t = pageStrings[lang];
  const router = useRouter();
  const params = useParams<{ productId: string }>();
  const { db, mutate, ready } = useDemoDB();

  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [paying, setPaying] = useState(false);
  const [secs, setSecs] = useState(30);

  const product = useMemo(
    () => db?.products.find((p) => p.id === params.productId),
    [db, params.productId]
  );
  const creator = useMemo(
    () => db?.creators.find((c) => c.id === product?.creatorId),
    [db, product]
  );

  // UPI screen ka 30-sec countdown
  useEffect(() => {
    if (step !== "upi") return;
    setSecs(30);
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [step]);

  // Sold-out product checkout mein nahi aana chahiye — product page pe bhejo
  const soldOut = ready && !!product && dropStatus(product) === "ended";
  useEffect(() => {
    if (soldOut && product && creator) {
      router.replace(`/demo/${creator.username}/${product.id}`);
    }
  }, [soldOut, product, creator, router]);

  if (!ready || !db) {
    return <div className="flex min-h-screen items-center justify-center text-muted">…</div>;
  }

  if (!product || !creator) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
        <h1 className="text-xl font-bold">{t.checkout.notFound}</h1>
        <Link href="/" className="font-semibold text-primary hover:underline">{t.store.notFoundCta}</Link>
      </main>
    );
  }

  const soldOutRedirect = soldOut;
  if (soldOutRedirect) {
    return <div className="flex min-h-screen items-center justify-center text-muted">…</div>;
  }

  const submitForm = () => {
    const errs: { name?: string; email?: string } = {};
    if (name.trim().length < 2) errs.name = t.checkout.nameErr;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = t.checkout.emailErr;
    setErrors(errs);
    if (Object.keys(errs).length) {
      showToast("error", Object.values(errs)[0]!);
      return;
    }
    setStep("upi");
  };

  const approve = () => {
    setPaying(true);
    setTimeout(() => {
      const orderId = makeId("ORD");
      mutate((draft) => {
        draft.orders.push({
          id: orderId,
          productId: product.id,
          creatorId: creator.id,
          buyerName: name.trim(),
          buyerEmail: email.trim(),
          amount: product.price,
          status: "paid",
          createdAt: new Date().toISOString(),
          referralCode: null,
        });
        const p = draft.products.find((x) => x.id === product.id);
        if (p) {
          p.soldQty += 1;
          p.views += 1;
        }
        const c = draft.creators.find((x) => x.id === creator.id);
        if (c) {
          c.earnings += product.price;
          c.orders += 1;
        }
        return draft;
      });
      router.push(`/success/${orderId}`);
    }, 900);
  };

  const inputCls = (err?: string) =>
    `h-12 w-full rounded-btn border bg-white px-4 text-[15px] outline-none transition focus:border-primary ${
      err ? "border-error" : "border-line"
    }`;

  return (
    <main className="min-h-screen bg-surface pb-16">
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4 sm:px-6">
          <Link href={`/demo/${creator.username}/${product.id}`} className="text-[15px] font-semibold text-muted transition hover:text-ink">
            {t.common.back}
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-bold text-accent sm:inline">
              {t.common.demoMode}
            </span>
            <LangToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 pt-8 sm:px-6">
        <h1 className="text-[20px] font-bold md:text-[24px]">{t.checkout.heading}</h1>

        {/* ---------- Order summary ---------- */}
        <div className="mt-5 rounded-card border border-line bg-white p-5 shadow-soft">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-muted">{t.checkout.summary}</h2>
          <div className="mt-3 flex items-center gap-3">
            <div className={`flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-btn bg-gradient-to-br from-primary/20 to-accent/10 ${product.coverUrl ? "" : "text-2xl"}`}>
              {product.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.coverUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span aria-hidden>📦</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{product.title}</p>
              <p className="text-[13px] text-muted">{creator.displayName}</p>
            </div>
            <span className="text-[22px] font-bold">{formatINR(product.price)}</span>
          </div>
        </div>

        {step === "form" ? (
          /* ---------- Step 1: details form ---------- */
          <div className="mt-4 rounded-card border border-line bg-white p-5 shadow-soft sm:p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="c-name" className="text-sm font-semibold">{t.checkout.name} *</label>
                <input
                  id="c-name" type="text" value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.checkout.namePh}
                  className={`${inputCls(errors.name)} mt-1.5`}
                />
                {errors.name && <p className="mt-1 text-[13px] font-semibold text-error">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="c-email" className="text-sm font-semibold">{t.checkout.email} *</label>
                <input
                  id="c-email" type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.checkout.emailPh}
                  className={`${inputCls(errors.email)} mt-1.5`}
                />
                {errors.email && <p className="mt-1 text-[13px] font-semibold text-error">{errors.email}</p>}
              </div>

              <button
                type="button"
                onClick={submitForm}
                className="h-14 w-full rounded-btn bg-primary text-[16px] font-bold text-white shadow-btn transition hover:bg-primary-dark active:scale-[0.98]"
              >
                {t.checkout.pay} — {formatINR(product.price)}
              </button>

              <p className="text-center text-[13px] text-muted">{t.checkout.trust}</p>
            </div>
          </div>
        ) : (
          /* ---------- Step 2: simulated UPI screen ---------- */
          <div className="mt-4 rounded-card border border-line bg-white p-5 text-center shadow-soft sm:p-8">
            <h2 className="text-lg font-bold">{t.upi.heading}</h2>
            <p className="mt-1 text-[13px] text-muted">{t.upi.sub}</p>

            {/* Fake QR — deterministic pattern from order amount+title */}
            <div className="mx-auto mt-5 w-fit rounded-card border border-line bg-surface p-4">
              <FakeQR seed={product.id + product.price} />
              <p className="mt-2 text-[12px] font-semibold text-muted">{t.upi.scan}</p>
            </div>

            <p className="mt-4 text-[15px]">
              {t.upi.payingTo} <span className="font-bold">{creator.displayName}</span> ·{" "}
              <span className="font-bold">{formatINR(product.price)}</span>
            </p>

            {/* 30-sec timer */}
            <p className="mt-2 text-[13px] text-muted">
              {t.upi.timer}: <span className="font-mono font-bold text-error">00:{String(secs).padStart(2, "0")}</span>
            </p>
            <div className="mx-auto mt-2 h-1.5 w-48 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-accent transition-all duration-1000" style={{ width: `${(secs / 30) * 100}%` }} />
            </div>

            <button
              type="button"
              onClick={approve}
              disabled={paying}
              className="mt-5 h-14 w-full rounded-btn bg-success text-[16px] font-bold text-white shadow-btn transition hover:bg-success/90 active:scale-[0.98] disabled:opacity-70"
            >
              {paying ? t.upi.approving : t.upi.approve}
            </button>
            <p className="mt-3 text-[12px] leading-relaxed text-muted">{t.upi.note}</p>
          </div>
        )}
      </div>
    </main>
  );
}

/** Fake QR visual — seed se deterministic 21x21 grid (renderer-safe). */
function FakeQR({ seed }: { seed: string }) {
  const cells = useMemo(() => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    return Array.from({ length: 441 }, (_, i) => {
      h = (h * 1103515245 + 12345 + i) >>> 0;
      return (h >>> 16) % 100 < 45;
    });
  }, [seed]);

  return (
    <div className="grid grid-cols-21 gap-px bg-white p-2" style={{ gridTemplateColumns: "repeat(21, 8px)" }} aria-hidden>
      {cells.map((on, i) => (
        <div key={i} className={on ? "h-2 w-2 bg-ink" : "h-2 w-2 bg-white"} />
      ))}
    </div>
  );
}
