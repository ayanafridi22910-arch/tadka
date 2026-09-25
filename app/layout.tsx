import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import { LanguageProvider } from "@/components/language-provider";
import { ToastProvider } from "@/lib/store";
import "./globals.css";

// ui-design-doc section 3 — Inter (EN) + Noto Sans Devanagari (HI)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const noto = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tadka — Apni link-in-bio ko UPI wali dukaan banao",
    template: "%s · Tadka",
  },
  description:
    "Tadka: Indian creators ke liye Stan-style storefront. Digital products becho UPI checkout ke saath — 5 minute mein live, ₹0 setup.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6C3CE0", // primary purple
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" className={`${inter.variable} ${noto.variable}`} suppressHydrationWarning>
      <body className="bg-white font-sans text-ink antialiased">
        {/* hi/en toggle har page pe (ui-doc section 8 DO) + demo toasts */}
        <LanguageProvider>
          <ToastProvider>{children}</ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
