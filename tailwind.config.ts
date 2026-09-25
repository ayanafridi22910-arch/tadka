import type { Config } from "tailwindcss";

/**
 * Theme tokens — ui-design-doc.md section 2, 3, 4 se 1:1 mapped.
 * Rule: ek screen pe 3+ rang nahi. Purple = action, Orange = urgency,
 * Green = paisa/success.
 * Polish layer: soft shadows + float/marquee/pulse animations.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Section 2 — Colors table
        primary: { DEFAULT: "#6C3CE0", dark: "#5A2FC4" }, // brand/action
        accent: "#FF6B35", // Drop countdown, limited badges
        success: "#16A34A", // payment success, earnings
        error: "#DC2626", // form galti, Sold Out
        warning: "#F59E0B", // low-stock alert
        surface: "#F8F7FC", // card background
        ink: "#1A1A2E", // text main
        muted: "#6B7280", // text light
        line: "#E5E7EB", // borders
        disabled: "#D1D5DB",
      },
      fontFamily: {
        // Section 3 — Inter (EN) + Noto Sans Devanagari (HI)
        sans: ["var(--font-inter)", "var(--font-noto)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1100px", // Section 4 — desktop max width
      },
      borderRadius: {
        btn: "12px", // Section 4 — buttons
        card: "16px", // Section 4 — cards
      },
      boxShadow: {
        soft: "0 2px 16px -2px rgb(26 26 46 / 0.08)",
        card: "0 12px 32px -8px rgb(108 60 224 / 0.18)",
        btn: "0 8px 20px -6px rgb(108 60 224 / 0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        marquee: "marquee 26s linear infinite",
        "pulse-soft": "pulse-soft 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
