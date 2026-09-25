/**
 * Demo seed data — pehli baar app khulne pe localStorage mein load hota hai.
 * 3 creators, 10 products (2 active drops), 7-din ka fake order history.
 * (demo-build-prompt.md — "MOCK DATA" section)
 */

export type Product = {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  price: number;
  coverUrl: string | null; // dataURL (base64) ya null
  fileName: string | null;
  isDrop: boolean;
  dropStartsAt: string | null; // ISO
  dropEndsAt: string | null; // ISO
  maxQty: number | null;
  soldQty: number;
  views: number;
  status: "published" | "draft";
  createdAt: string;
};

export type Creator = {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string; // emoji for demo (base64 photos localStorage bhaari ho jate)
  upiId: string;
  earningsPublic: boolean;
  earnings: number;
  orders: number;
  links: { label: string; url: string }[];
};

export type Order = {
  id: string;
  productId: string;
  creatorId: string;
  buyerName: string;
  buyerEmail: string;
  amount: number;
  status: "paid";
  createdAt: string; // ISO
  referralCode: string | null;
};

export type TadkaDB = {
  creators: Creator[];
  products: Product[];
  orders: Order[];
  seededAt: string;
};

/** hours abhi se aage/piche ka ISO string */
function fromNow(hours: number): string {
  return new Date(Date.now() + hours * 3600_000).toISOString();
}

function daysAgo(days: number, hour = 12): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, Math.floor(Math.random() * 50), 0, 0);
  return d.toISOString();
}

export const DEMO_CREATOR_ID = "c-ayan";

export function seedData(): TadkaDB {
  const creators: Creator[] = [
    {
      id: DEMO_CREATOR_ID,
      username: "ayan",
      displayName: "Ayan Creates",
      bio: "Design presets aur Notion templates — 8 saal ka Photoshop experience, ab aapke liye.",
      avatar: "🧑‍🎨",
      upiId: "ayan@upi",
      earningsPublic: true,
      earnings: 45200,
      orders: 132,
      links: [
        { label: "YouTube", url: "https://youtube.com" },
        { label: "Instagram", url: "https://instagram.com" },
      ],
    },
    {
      id: "c-meera",
      username: "meera",
      displayName: "Meera Codes",
      bio: "Web dev mini-courses aur coding cheatsheets. Zero se full-stack.",
      avatar: "👩‍💻",
      upiId: "meera@upi",
      earningsPublic: false,
      earnings: 31800,
      orders: 96,
      links: [{ label: "YouTube", url: "https://youtube.com" }],
    },
    {
      id: "c-ravi",
      username: "ravi",
      displayName: "Ravi Shoots",
      bio: "Photography LUTs, Lightroom presets aur behind-the-scenes guides.",
      avatar: "📸",
      upiId: "ravi@upi",
      earningsPublic: true,
      earnings: 58900,
      orders: 210,
      links: [
        { label: "Instagram", url: "https://instagram.com" },
        { label: "Telegram", url: "https://telegram.org" },
      ],
    },
  ];

  const products: Product[] = [
    {
      id: "p-1",
      creatorId: DEMO_CREATOR_ID,
      title: "Midnight Preset Pack",
      description:
        "20 cinematic Lightroom presets — raat ki photos ko 1 click mein filmi banao. Works on mobile + desktop Lightroom. Installation guide PDF included.",
      price: 199,
      coverUrl: null,
      fileName: "midnight-presets.zip",
      isDrop: true,
      dropStartsAt: fromNow(-22),
      dropEndsAt: fromNow(2), // ACTIVE DROP #1 — 2 ghante bache
      maxQty: 50,
      soldQty: 43,
      views: 1240,
      status: "published",
      createdAt: daysAgo(9),
    },
    {
      id: "p-2",
      creatorId: DEMO_CREATOR_ID,
      title: "Notion Creator OS",
      description:
        "Content calendar, script tracker, sponsor CRM aur analytics — sab ek Notion template mein. Jo main khud 40k+ followers manage karne ke liye use karta hoon.",
      price: 499,
      coverUrl: null,
      fileName: "creator-os.zip",
      isDrop: true,
      dropStartsAt: fromNow(-6),
      dropEndsAt: fromNow(30),
      maxQty: 15,
      soldQty: 10, // ACTIVE DROP #2 — sirf 5 stock bache
      views: 890,
      status: "published",
      createdAt: daysAgo(4),
    },
    {
      id: "p-3",
      creatorId: DEMO_CREATOR_ID,
      title: "Instagram Reels Playbook",
      description:
        "47-page ebook: kaise 0 se 100k tak reels pe pahuncha — hooks, retention editing, posting schedule, aur mere 12 viral scripts breakdown.",
      price: 299,
      coverUrl: null,
      fileName: "reels-playbook.pdf",
      isDrop: false,
      dropStartsAt: null,
      dropEndsAt: null,
      maxQty: null,
      soldQty: 38,
      views: 2100,
      status: "published",
      createdAt: daysAgo(21),
    },
    {
      id: "p-4",
      creatorId: DEMO_CREATOR_ID,
      title: "Thumbnail Mega Bundle",
      description: "120+ editable thumbnail templates (Photoshop + Canva). YouTube, Reels, Shorts — har format ke liye.",
      price: 349,
      coverUrl: null,
      fileName: "thumbnails-bundle.zip",
      isDrop: false,
      dropStartsAt: null,
      dropEndsAt: null,
      maxQty: null,
      soldQty: 21,
      views: 640,
      status: "published",
      createdAt: daysAgo(12),
    },
    {
      id: "p-5",
      creatorId: DEMO_CREATOR_ID,
      title: "1:1 Creator Call (30 min)",
      description: "Aapke channel/insta ka personal audit — content strategy, monetization roadmap, live Q&A. Recording bhi milegi.",
      price: 999,
      coverUrl: null,
      fileName: "call-details.pdf",
      isDrop: false,
      dropStartsAt: null,
      dropEndsAt: null,
      maxQty: null,
      soldQty: 7,
      views: 410,
      status: "published",
      createdAt: daysAgo(15),
    },
    {
      id: "p-6",
      creatorId: "c-meera",
      title: "React Cheatsheet Vault",
      description: "80+ React/Next.js patterns ek page-par — interview prep aur daily coding ke liye.",
      price: 149,
      coverUrl: null,
      fileName: "react-vault.pdf",
      isDrop: false,
      dropStartsAt: null,
      dropEndsAt: null,
      maxQty: null,
      soldQty: 64,
      views: 3100,
      status: "published",
      createdAt: daysAgo(30),
    },
    {
      id: "p-7",
      creatorId: "c-meera",
      title: "Freelance Launch Kit",
      description: "Cold-email templates, pricing calculator, client contract drafts — pehla client 30 din mein pakka.",
      price: 599,
      coverUrl: null,
      fileName: "launch-kit.zip",
      isDrop: false,
      dropStartsAt: null,
      dropEndsAt: null,
      maxQty: null,
      soldQty: 18,
      views: 720,
      status: "published",
      createdAt: daysAgo(8),
    },
    {
      id: "p-8",
      creatorId: "c-ravi",
      title: "Teal & Orange LUT Pack",
      description: "15 cinema-grade LUTs for Sony/Canon/mobile footage. Before/after previews dekho — Insta pe viral wali tone.",
      price: 249,
      coverUrl: null,
      fileName: "teal-orange-luts.zip",
      isDrop: true,
      dropStartsAt: fromNow(-10),
      dropEndsAt: fromNow(-1), // ENDED drop — SOLD OUT dikhane ke liye
      maxQty: 40,
      soldQty: 40,
      views: 1800,
      status: "published",
      createdAt: daysAgo(11),
    },
    {
      id: "p-9",
      creatorId: "c-ravi",
      title: "Street Photography Guide",
      description: "Indian streets pe candid shots — camera settings, composition, logon se puchhna bina.",
      price: 129,
      coverUrl: null,
      fileName: "street-guide.pdf",
      isDrop: false,
      dropStartsAt: null,
      dropEndsAt: null,
      maxQty: null,
      soldQty: 55,
      views: 950,
      status: "published",
      createdAt: daysAgo(25),
    },
    {
      id: "p-10",
      creatorId: "c-ravi",
      title: "Wedding Shoot Contracts Pack",
      description: "Ready-to-use contracts, quotation formats, client checklists — 12 documents.",
      price: 399,
      coverUrl: null,
      fileName: "wedding-contracts.zip",
      isDrop: false,
      dropStartsAt: null,
      dropEndsAt: null,
      maxQty: null,
      soldQty: 0,
      views: 85,
      status: "draft", // ek draft bhi — dashboard mein dikhna chahiye
      createdAt: daysAgo(2),
    },
  ];

  // Fake order history — last 7 days, mostly Ayan ke products (dashboard chart ke liye)
  const ayanProductIds = ["p-1", "p-2", "p-3", "p-4", "p-5"];
  const buyerNames = ["Rohit", "Priya", "Amit", "Sneha", "Kabir", "Ananya", "Vikram", "Neha", "Arjun", "Divya", "Manish", "Pooja"];
  const orders: Order[] = [];
  let orderNum = 1;
  for (let day = 6; day >= 0; day--) {
    // har din 2-6 orders (aaj zyada — growth dikhe)
    const count = day === 0 ? 6 : 2 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const pid = ayanProductIds[Math.floor(Math.random() * ayanProductIds.length)];
      const product = products.find((p) => p.id === pid)!;
      orders.push({
        id: `ORD-${String(orderNum).padStart(4, "0")}`,
        productId: pid,
        creatorId: DEMO_CREATOR_ID,
        buyerName: buyerNames[Math.floor(Math.random() * buyerNames.length)],
        buyerEmail: "buyer" + orderNum + "@example.com",
        amount: product.price,
        status: "paid",
        createdAt: daysAgo(day, 9 + i * 2),
        referralCode: null,
      });
      orderNum++;
    }
  }

  return { creators, products, orders, seededAt: new Date().toISOString() };
}
