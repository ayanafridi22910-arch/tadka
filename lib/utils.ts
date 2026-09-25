/**
 * Demo helpers — formatINR, ids, dates, sample file generation.
 * Sab kuch client-side; demo mode mein koi server nahi hai.
 */

/** ₹ formatting — en-IN locale, no decimals (demo prices hamesha whole ₹). */
export function formatINR(amount: number): string {
  return "₹" + new Intl.NumberFormat("en-IN").format(Math.round(amount));
}

/** 12-char readable id, jaise "TBK-7F3K9Q2M". */
export function makeId(prefix = "TBK"): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${out}`;
}

/** datetime-local input ke liye value (YYYY-MM-DDTHH:mm). */
export function toLocalInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Date → "25 Sep 2026, 4:30 PM" style short label. */
export function formatDateLabel(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Drop abhi active hai? (ends future + stock > 0 + starts past) */
export function dropStatus(p: { isDrop: boolean; dropStartsAt?: string | null; dropEndsAt?: string | null; maxQty?: number | null; soldQty?: number }): "active" | "upcoming" | "ended" | null {
  if (!p.isDrop) return null;
  const now = Date.now();
  const start = p.dropStartsAt ? new Date(p.dropStartsAt).getTime() : 0;
  const end = p.dropEndsAt ? new Date(p.dropEndsAt).getTime() : 0;
  const soldOut = typeof p.maxQty === "number" && (p.soldQty ?? 0) >= p.maxQty;
  if (soldOut) return "ended";
  if (end && now >= end) return "ended";
  if (start && now < start) return "upcoming";
  return "active";
}

/**
 * Sample "product file" generate karta hai — ek simple valid PDF (hello-world
 * text embedded), Blob URL return karta hai. Download button yahi use karega.
 */
export function generateSamplePdf(productTitle: string): string {
  const lines = [
    "Tadka Demo - Digital Product Delivery",
    "======================================",
    "",
    `Product: ${productTitle}`,
    "",
    "Ye ek DEMO file hai — Tadka demo mode mein har download",
    "yahi sample PDF deta hai. Real product mein yahan creator",
    "ka asli file (PDF/ZIP/MP4) signed link ke through aayega.",
    "",
    "Thanks for trying Tadka! 🍛",
  ].join("\n");

  // Minimal single-page PDF with Helvetica text lines
  const esc = lines.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  const content = `BT /F1 12 Tf 16 TL 50 780 Td (${esc.split("\n").join(") Tj T* (")}) Tj ET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((off) => {
    pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  const blob = new Blob([pdf], { type: "application/pdf" });
  return URL.createObjectURL(blob);
}

/** Blob URL ko a-click se download karwao aur URL revoke karo. */
export function downloadUrl(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/** UPI QR ke liye upi:// intent string (demo). */
export function upiIntentUrl(upiId: string, name: string, amount: number, note: string): string {
  const params = new URLSearchParams({ pa: upiId, pn: name, am: String(amount), cu: "INR", tn: note });
  return `upi://pay?${params.toString()}`;
}
