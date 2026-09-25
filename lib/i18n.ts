/**
 * i18n strings — ui-design-doc section 8:
 * "English-only text mat likhna — har important cheez Hindi mein bhi."
 * Har page ka text yahan se aayega (hi/en toggle).
 */

export type Lang = "hi" | "en";

type Plan = {
  name: string;
  price: string;
  tag: string;
  features: string[];
  cta: string;
};

export type Dict = {
  nav: { how: string; features: string; pricing: string; login: string; cta: string };
  hero: { titlePre: string; titleBold: string; titlePost: string; sub: string; cta: string; trust: string };
  steps: { heading: string; items: { emoji: string; title: string; desc: string }[] };
  features: { heading: string; items: { emoji: string; title: string; desc: string }[] };
  pricing: { heading: string; sub: string; perMonth: string; popular: string; free: Plan; pro: Plan };
  mockup: {
    ribbon: string;
    timerLabel: string;
    timer: string;
    stockPre: string;
    stockNum: string;
    stockPost: string;
    buyNow: string;
    earnings: string;
    poweredBy: string;
    name: string;
    bio: string;
  };
  dropShow: {
    kicker: string;
    heading: string;
    sub: string;
    live?: string;
    cta1?: string;
    cta2?: string;
  };
  social: { proof: string; rating: string; verified: string };
  footer: { madeIn: string; rights: string; links: string[] };
};

export const dictionaries: Record<Lang, Dict> = {
  hi: {
    nav: {
      how: "Kaise kaam karta hai",
      features: "Features",
      pricing: "Pricing",
      login: "Login",
      cta: "Free mein shuru karo",
    },
    hero: {
      titlePre: "Apni link-in-bio ko ",
      titleBold: "UPI wali dukaan",
      titlePost: " banao",
      sub: "Ebooks, presets, templates, mini-courses becho — bina website, bina coding. 5 minute mein live, UPI se payment, instant delivery.",
      cta: "Free mein shuru karo",
      trust: "₹0 setup · Secure UPI payment · Payout seedha bank mein",
    },
    steps: {
      heading: "Kaise kaam karta hai",
      items: [
        {
          emoji: "📤",
          title: "Product upload karo",
          desc: "PDF, ZIP, MP4 — 500MB tak. Price ₹ mein set karo.",
        },
        {
          emoji: "🔗",
          title: "Link bio mein daalo",
          desc: "username.tadka.in ko Instagram/YouTube bio mein paste karo.",
        },
        {
          emoji: "💸",
          title: "UPI se paise pao",
          desc: "Buyer UPI se pay karega — paisa seedha aapke account mein.",
        },
      ],
    },
    features: {
      heading: "Sirf dukaan nahi — growth machine",
      items: [
        {
          emoji: "🔥",
          title: "Drop system",
          desc: "Countdown + limited stock = FOMO. Timer khatam → auto Sold Out.",
        },
        {
          emoji: "📊",
          title: "Earnings wall",
          desc: "Verified kamai publicly dikhao — trust banao, zyada becho.",
        },
        {
          emoji: "🤝",
          title: "Referral",
          desc: "Buyer ko apna link milta hai — dost kharide toh 10% uska.",
        },
      ],
    },
    pricing: {
      heading: "Simple pricing",
      sub: "Shuruaat free mein. Jab scale karo, Pro le lo.",
      perMonth: "/month",
      popular: "Popular",
      free: {
        name: "Free",
        price: "₹0",
        tag: "Shuru karne ke liye",
        features: ["Unlimited products", "UPI checkout", "Tadka branding"],
        cta: "Free mein shuru karo",
      },
      pro: {
        name: "Pro",
        price: "₹299",
        tag: "Serious creators ke liye",
        features: ["Sab Free wale features", "Tadka branding hatao", "Priority support"],
        cta: "Pro lelo",
      },
    },
    mockup: {
      ribbon: "🔥 DROP — 2 din bache",
      timerLabel: "Drop khatm hone mein",
      timer: "02 : 14 : 33 : 10",
      stockPre: "🔥 Sirf ",
      stockNum: "7",
      stockPost: " bache hain!",
      buyNow: "Buy Now",
      earnings: "💰 ₹45,200 kamaye (verified)",
      poweredBy: "Powered by Tadka",
      name: "Ayan Creates",
      bio: "Design presets aur Notion templates",
    },
    dropShow: {
      kicker: "DROP SYSTEM",
      heading: "Jab stock chhota ho, sales tez hoti hain",
      sub: "Countdown timer + limited stock — khatam hote hi product apne aap Sold Out. Followers ko batao, moka na do."
    },
    social: {
      proof: "12,000+ creators ne apni dukaan khol di",
      rating: "★ 4.9 creator rating",
      verified: "✓ 100% secure UPI payments — Razorpay"
    },
    footer: {
      madeIn: "Made in India 🇮🇳",
      rights: "© {year} Tadka",
      links: ["Privacy", "Terms", "Support", "Instagram"]
    },
  },
  en: {
    nav: {
      how: "How it works",
      features: "Features",
      pricing: "Pricing",
      login: "Log in",
      cta: "Start for free",
    },
    hero: {
      titlePre: "Turn your link-in-bio into a ",
      titleBold: "UPI store",
      titlePost: "",
      sub: "Sell ebooks, presets, templates, mini-courses — no website, no code. Live in 5 minutes, UPI payments, instant delivery.",
      cta: "Start for free",
      trust: "₹0 setup · Secure UPI payments · Payouts straight to your bank",
    },
    steps: {
      heading: "How it works",
      items: [
        {
          emoji: "📤",
          title: "Upload a product",
          desc: "PDF, ZIP, MP4 — up to 500MB. Set your price in ₹.",
        },
        {
          emoji: "🔗",
          title: "Add the link to your bio",
          desc: "Paste username.tadka.in in your Instagram/YouTube bio.",
        },
        {
          emoji: "💸",
          title: "Get paid via UPI",
          desc: "Buyers pay by UPI — money lands straight in your account.",
        },
      ],
    },
    features: {
      heading: "Not just a store — a growth machine",
      items: [
        {
          emoji: "🔥",
          title: "Drop system",
          desc: "Countdown + limited stock = FOMO. Timer ends → auto Sold Out.",
        },
        {
          emoji: "📊",
          title: "Earnings wall",
          desc: "Show verified earnings publicly — build trust, sell more.",
        },
        {
          emoji: "🤝",
          title: "Referrals",
          desc: "Every buyer gets a link — friend buys, they earn 10%.",
        },
      ],
    },
    pricing: {
      heading: "Simple pricing",
      sub: "Start free. Go Pro when you scale.",
      perMonth: "/month",
      popular: "Popular",
      free: {
        name: "Free",
        price: "₹0",
        tag: "Perfect to start",
        features: ["Unlimited products", "UPI checkout", "Tadka branding"],
        cta: "Start free",
      },
      pro: {
        name: "Pro",
        price: "₹299",
        tag: "For serious creators",
        features: ["Everything in Free", "Remove Tadka branding", "Priority support"],
        cta: "Go Pro",
      },
    },
    mockup: {
      ribbon: "🔥 DROP — 2 days left",
      timerLabel: "Drop ends in",
      timer: "02 : 14 : 33 : 10",
      stockPre: "🔥 Only ",
      stockNum: "7",
      stockPost: " left!",
      buyNow: "Buy Now",
      earnings: "💰 ₹45,200 earned (verified)",
      poweredBy: "Powered by Tadka",
      name: "Ayan Creates",
      bio: "Design presets & Notion templates",
    },
    dropShow: {
      kicker: "DROP SYSTEM",
      heading: "Scarcity sells — literally",
      sub: "Countdown timer + limited stock — when it hits zero, the product auto-Sold-Outs. Create urgency, watch sales fly."
    },
    social: {
      proof: "12,000+ creators already opened their store",
      rating: "★ 4.9 creator rating",
      verified: "✓ 100% secure UPI payments — Razorpay"
    },
    footer: {
      madeIn: "Made in India 🇮🇳",
      rights: "© {year} Tadka",
      links: ["Privacy", "Terms", "Support", "Instagram"]
    },
  },
};
