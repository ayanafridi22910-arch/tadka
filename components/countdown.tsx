"use client";

/**
 * Drop countdown — ui-doc 5.3 + 5.4.
 * Live tick har second, monospace orange digits din:ghnte:min:sec,
 * last hour pulse, zero pe auto SOLD OUT. Stock counter "Sirf X bache hain!"
 * sirf jab stock < 10 ho (urgency fake na lage).
 */

import { useEffect, useMemo, useState } from "react";
import { dropStatus } from "@/lib/utils";
import type { Product } from "@/lib/mock";

function calc(endsAt: string) {
  const diff = Math.max(0, new Date(endsAt).getTime() - Date.now());
  return {
    diff,
    days: Math.floor(diff / 86400_000),
    hours: Math.floor((diff % 86400_000) / 3600_000),
    mins: Math.floor((diff % 3600_000) / 60_000),
    secs: Math.floor((diff % 60_000) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({ product, labels }: { product: Product; labels?: { endedTitle?: string; endedSub?: string; endsIn?: string; startsIn?: string; stockPre?: string; stockPost?: string } }) {
  const [now, setNow] = useState(() => Date.now());
  const status = useMemo(
    () => dropStatus(product),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product.id, product.dropEndsAt, product.maxQty, product.soldQty]
  );

  useEffect(() => {
    if (status !== "active" && status !== "upcoming") return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [status]);

  // Drop start hone se pehle (upcoming) — start countdown dikhao
  const target =
    status === "active" ? product.dropEndsAt! : status === "upcoming" ? product.dropStartsAt! : null;

  if (!target) {
    return (
      <div className="rounded-card border border-error/30 bg-error/10 p-4 text-center">
        <span className="text-lg font-bold tracking-widest text-error">
          {labels?.endedTitle ?? "SOLD OUT"}
        </span>
        <p className="mt-1 text-[13px] text-muted">{labels?.endedSub ?? "Ye drop khatam ho gaya."}</p>
      </div>
    );
  }

  const { diff, days, hours, mins, secs } = calc(target);
  const lastHour = status === "active" && diff < 3600_000;
  const left = typeof product.maxQty === "number" ? product.maxQty - product.soldQty : null;
  const showStock = status === "active" && left !== null && left > 0 && left < 10;

  const units: { v: string; label: string }[] = [
    { v: pad(days), label: "din" },
    { v: pad(hours), label: "ghnte" },
    { v: pad(mins), label: "min" },
    { v: pad(secs), label: "sec" },
  ];

  return (
    <div className="rounded-card border border-accent/40 bg-accent/10 p-4 text-center">
      <p className="text-[13px] font-semibold uppercase tracking-wider text-muted">
        {status === "upcoming" ? labels?.startsIn ?? "Drop shuru hone mein" : labels?.endsIn ?? "Drop khatm hone mein"}
      </p>
      <div
        className={`mt-2 flex justify-center gap-2 font-mono text-2xl font-bold text-accent md:text-3xl ${
          lastHour ? "animate-pulse-soft" : ""
        }`}
        aria-label={`${days} din ${hours} ghante ${mins} min ${secs} sec`}
      >
        {units.map((u, i) => (
          <span key={i} className="flex h-14 w-14 items-center justify-center rounded-btn bg-white shadow-soft">
            {u.v}
          </span>
        ))}
      </div>
      {showStock && (
        <p className="mt-3 text-[15px]">
          🔥 {labels?.stockPre ?? "Sirf"} <span className="font-bold text-accent">{left}</span>{" "}
          {labels?.stockPost ?? "bache hain!"}
        </p>
      )}
    </div>
  );
}
