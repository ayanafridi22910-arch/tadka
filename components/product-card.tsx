"use client";

/**
 * Product card — ui-doc 5.2: cover (16:9), title, ek-line desc, price,
 * DROP ribbon upar. Card click → product page. Gradient placeholder
 * cover ki jagah (demo mein base64 photos localStorage bhaari karte).
 */

import Link from "next/link";
import type { Product } from "@/lib/mock";
import { formatINR } from "@/lib/utils";
import { dropStatus } from "@/lib/utils";

const GRADIENTS = [
  "from-primary/25 via-primary/10 to-accent/10",
  "from-accent/20 via-warning/10 to-primary/10",
  "from-primary/15 via-accent/15 to-warning/10",
  "from-success/15 via-primary/10 to-primary/20",
];

export default function ProductCard({
  product,
  href,
  dropLabel = "DROP",
  dropSuffix = "",
  soldOutLabel = "SOLD OUT",
}: {
  product: Product;
  href: string;
  dropLabel?: string;
  dropSuffix?: string;
  soldOutLabel?: string;
}) {
  const status = dropStatus(product);
  const gradient = GRADIENTS[product.id.charCodeAt(product.id.length - 1) % GRADIENTS.length];

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-card border border-line bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
    >
      {/* Cover — 16:9 */}
      <div className={`relative aspect-video bg-gradient-to-br ${gradient}`}>
        {product.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.coverUrl} alt={product.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl opacity-60" aria-hidden>
            {product.title.match(/[\u{1F300}-\u{1FAFF}]/u)?.[0] ?? "📦"}
          </div>
        )}
        {status === "active" && (
          <span className="absolute left-0 top-0 rounded-br-lg bg-accent px-2.5 py-1.5 text-[11px] font-bold text-white">
            🔥 {dropLabel}
            {dropSuffix ? ` — ${dropSuffix}` : ""}
          </span>
        )}
        {status === "ended" && (
          <span className="absolute left-0 top-0 rounded-br-lg bg-error px-2.5 py-1.5 text-[11px] font-bold text-white">
            {soldOutLabel}
          </span>
        )}
        {product.status === "draft" && (
          <span className="absolute right-0 top-0 rounded-bl-lg bg-ink/70 px-2.5 py-1.5 text-[11px] font-bold text-white">
            Draft
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold leading-snug">{product.title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[22px] font-bold leading-none">{formatINR(product.price)}</span>
          <span className="inline-flex h-10 items-center rounded-btn bg-primary px-4 text-[13px] font-semibold text-white shadow-btn transition group-hover:bg-primary-dark">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
