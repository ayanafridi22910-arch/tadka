/**
 * Demo pages ki strings — login, dashboard, form, storefront, product,
 * checkout, UPI, success. Landing page wali strings `i18n.ts` mein hain.
 * (demo-build-prompt rule #10: translations object — har text hi/en dono mein.)
 */

import type { Lang } from "./i18n";

export type PageDict = {
  common: {
    back: string;
    cancel: string;
    save: string;
    demoMode: string;
    poweredBy: string;
    login: string;
    logout: string;
    dashboard: string;
    storefront: string;
  };
  login: {
    heading: string;
    sub: string;
    enter: string;
    note: string;
    userLabel: string;
    asUser: string;
    back: string;
    magicNote: string;
  };
  dash: {
    greeting: string;
    today: string;
    vsYesterday: string;
    stats: { revenue: string; orders: string; views: string; conversion: string };
    chartTitle: string;
    chartSub: string;
    productsTitle: string;
    newProduct: string;
    edit: string;
    del: string;
    view: string;
    viewsShort: string;
    soldShort: string;
    draft: string;
    published: string;
    soldOut: string;
    dropLive: string;
    empty: string;
    emptyCta: string;
    settingsTitle: string;
    earningsToggle: string;
    earningsHint: string;
    viewStore: string;
    confirmTitle: string;
    confirmMsg: string;
    confirmYes: string;
    deletedToast: string;
    publishedToast: string;
    draftToast: string;
    earningsOnToast: string;
    earningsOffToast: string;
    recentOrders: string;
    orderProduct: string;
    orderBuyer: string;
  };
  form: {
    newTitle: string;
    editTitle: string;
    title: string;
    titlePh: string;
    desc: string;
    descPh: string;
    price: string;
    pricePh: string;
    cover: string;
    coverHint: string;
    removeCover: string;
    file: string;
    fileHint: string;
    dropTitle: string;
    dropToggle: string;
    dropHint: string;
    dropStart: string;
    dropEnd: string;
    maxQty: string;
    maxQtyHint: string;
    saveDraft: string;
    publish: string;
    update: string;
    errTitle: string;
    errPrice: string;
    errDates: string;
    savedToast: string;
    updatedToast: string;
    draftSavedToast: string;
    priceNote: string;
  };
  store: {
    products: string;
    kamaye: string;
    verified: string;
    viewProfile: string;
    notFound: string;
    notFoundCta: string;
  };
  product: {
    by: string;
    buyNow: string;
    soldOut: string;
    upiNote: string;
    instant: string;
    share: string;
    backToStore: string;
    soldOutNote: string;
    fileIncluded: string;
    notFound: string;
    buyToast: string;
  };
  checkout: {
    heading: string;
    summary: string;
    name: string;
    namePh: string;
    email: string;
    emailPh: string;
    nameErr: string;
    emailErr: string;
    pay: string;
    processing: string;
    trust: string;
    notFound: string;
  };
  upi: {
    heading: string;
    sub: string;
    scan: string;
    timer: string;
    approve: string;
    approving: string;
    note: string;
    payingTo: string;
  };
  success: {
    heading: string;
    orderId: string;
    download: string;
    emailNote: string;
    referTitle: string;
    referDesc: string;
    copy: string;
    copiedToast: string;
    backStore: string;
    dashCta: string;
  };
};

export const pageStrings: Record<Lang, PageDict> = {
  hi: {
    common: {
      back: "← Wapas",
      cancel: "Cancel",
      save: "Save karo",
      demoMode: "DEMO MODE — koi real payment nahi",
      poweredBy: "Powered by Tadka",
      login: "Login",
      logout: "Logout",
      dashboard: "Dashboard",
      storefront: "Dukaan dekho",
    },
    login: {
      heading: "Apni dukaan kholo",
      sub: "Demo login — koi email/password nahi, ek click mein dashboard.",
      enter: "Enter Demo →",
      note: "Ye public demo hai. Saara data aapke browser mein hi rahega.",
      userLabel: "Demo user:",
      asUser: "Ayan Creates (@ayan)",
      back: "← Landing page pe wapas",
      magicNote: "Real product mein yahan magic-link login hoga (email pe link).",
    },
    dash: {
      greeting: "Namaste, Ayan 👋",
      today: "Aaj ka din",
      vsYesterday: "kal se",
      stats: { revenue: "Total kamai", orders: "Orders", views: "Page views", conversion: "Conversion" },
      chartTitle: "Pichle 7 din ki sales",
      chartSub: "Orders per din",
      productsTitle: "Aapke products",
      newProduct: "+ Naya product",
      edit: "Edit",
      del: "Delete",
      view: "Dekho",
      viewsShort: "views",
      soldShort: "bik gaye",
      draft: "Draft",
      published: "Live",
      soldOut: "SOLD OUT",
      dropLive: "🔥 DROP live",
      empty: "Abhi koi product nahi — pehla product add karo!",
      emptyCta: "+ Pehla product banao",
      settingsTitle: "Settings",
      earningsToggle: "Earnings wall (public)",
      earningsHint: "ON karne pe aapki dukaan pe golden badge dikhega: “₹45,200 kamaye (verified)”.",
      viewStore: "Dukaan kholo ↗",
      confirmTitle: "Pakka delete karna hai?",
      confirmMsg: "“{title}” hamesha ke liye hat jayega — dukaan se bhi aur dashboard se bhi.",
      confirmYes: "Haan, delete",
      deletedToast: "Product delete ho gaya",
      publishedToast: "🚀 Product publish ho gaya!",
      draftToast: "Draft save ho gaya",
      earningsOnToast: "Earnings wall ON — dukaan pe dikh raha hai",
      earningsOffToast: "Earnings wall OFF",
      recentOrders: "Recent orders",
      orderProduct: "Product",
      orderBuyer: "Buyer",
    },
    form: {
      newTitle: "Naya product",
      editTitle: "Product edit karo",
      title: "Title",
      titlePh: "jaise: Midnight Preset Pack",
      desc: "Description",
      descPh: "Product kya hai, kya milega, kiske liye hai…",
      price: "Price (₹)",
      pricePh: "299",
      cover: "Cover image",
      coverHint: "Image choose karo — preview yahin dikhega (localStorage mein save hoti hai)",
      removeCover: "Cover hatao",
      file: "Product file",
      fileHint: "PDF / ZIP / MP4 — buyer yahi file download karega (demo mein sample PDF jayegi)",
      dropTitle: "🔥 Drop settings",
      dropToggle: "Isko Drop banao",
      dropHint: "Countdown + limited stock = FOMO. Timer khatam ya stock zero → auto Sold Out.",
      dropStart: "Start kab",
      dropEnd: "Khatam kab",
      maxQty: "Max quantity",
      maxQtyHint: "Kitne log khareed sakte hain",
      saveDraft: "Draft save karo",
      publish: "Publish karo 🚀",
      update: "Update karo",
      errTitle: "Title likho (kam se kam 3 letters)",
      errPrice: "Sahi price daalo (₹1 se zyada)",
      errDates: "Drop ka end time start ke baad ka hona chahiye",
      savedToast: "🚀 Publish ho gaya! Dukaan pe dikh raha hai.",
      updatedToast: "Product update ho gaya",
      draftSavedToast: "Draft save ho gaya",
      priceNote: "Demo mein koi commission nahi — poora ₹ tumhara.",
    },
    store: {
      products: "Products",
      kamaye: "kamaye",
      verified: "verified",
      viewProfile: "",
      notFound: "Ye creator nahi mila.",
      notFoundCta: "← Wapas chalo",
    },
    product: {
      by: "—",
      buyNow: "Buy Now",
      soldOut: "SOLD OUT",
      upiNote: "UPI se turant payment",
      instant: "Instant delivery",
      share: "Dost ko bhejo",
      backToStore: "← Poori dukaan dekho",
      soldOutNote: "Ye drop khatam ho gaya — dobara nahi aayega.",
      fileIncluded: "File included:",
      notFound: "Product nahi mila.",
      buyToast: "Chalo checkout karte hain!",
    },
    checkout: {
      heading: "Checkout",
      summary: "Order summary",
      name: "Naam",
      namePh: "Rohit Kumar",
      email: "Email",
      emailPh: "rohit@example.com",
      nameErr: "Naam likho (kam se kam 2 letters)",
      emailErr: "Email sahi likho",
      pay: "Pay karo",
      processing: "Payment ho rahi hai…",
      trust: "🔒 Secure UPI payment via Razorpay • Instant delivery",
      notFound: "Product nahi mila.",
    },
    upi: {
      heading: "UPI se pay karo",
      sub: "QR scan karo ya kisi bhi UPI app se pay karo",
      scan: "Scan karo (demo QR)",
      timer: "Ye screen band ho jayegi",
      approve: "✓ Approve payment (demo)",
      approving: "Payment approve ho rahi hai…",
      note: "DEMO: real paisa nahi kat raha. Button dabao, payment ho gayi maan lo.",
      payingTo: "Paying",
    },
    success: {
      heading: "Payment ho gaya!",
      orderId: "Order ID",
      download: "Download karo",
      emailNote: "📥 Download link tumhare email pe bhi bheja hai (7 din valid).",
      referTitle: "🤝 Dost ko bhejo, 10% kamao",
      referDesc: "Is link se dost kharidega to tumhe ₹ milenge.",
      copy: "Copy Link",
      copiedToast: "Link copy ho gaya!",
      backStore: "← Dukaan pe wapas",
      dashCta: "Creator dashboard dekho",
    },
  },
  en: {
    common: {
      back: "← Back",
      cancel: "Cancel",
      save: "Save",
      demoMode: "DEMO MODE — no real payments",
      poweredBy: "Powered by Tadka",
      login: "Login",
      logout: "Logout",
      dashboard: "Dashboard",
      storefront: "View store",
    },
    login: {
      heading: "Open your store",
      sub: "Demo login — no email/password, one click to the dashboard.",
      enter: "Enter Demo →",
      note: "This is a public demo. All data stays in your browser.",
      userLabel: "Demo user:",
      asUser: "Ayan Creates (@ayan)",
      back: "← Back to landing page",
      magicNote: "In the real product this is a magic-link login (link via email).",
    },
    dash: {
      greeting: "Namaste, Ayan 👋",
      today: "Today",
      vsYesterday: "vs yesterday",
      stats: { revenue: "Total revenue", orders: "Orders", views: "Page views", conversion: "Conversion" },
      chartTitle: "Last 7 days sales",
      chartSub: "Orders per day",
      productsTitle: "Your products",
      newProduct: "+ New product",
      edit: "Edit",
      del: "Delete",
      view: "View",
      viewsShort: "views",
      soldShort: "sold",
      draft: "Draft",
      published: "Live",
      soldOut: "SOLD OUT",
      dropLive: "🔥 DROP live",
      empty: "No products yet — add your first one!",
      emptyCta: "+ Create first product",
      settingsTitle: "Settings",
      earningsToggle: "Earnings wall (public)",
      earningsHint: "When ON, your store shows a golden badge: “₹45,200 earned (verified)”.",
      viewStore: "Open store ↗",
      confirmTitle: "Really delete this?",
      confirmMsg: "“{title}” will be gone forever — from the store and the dashboard.",
      confirmYes: "Yes, delete",
      deletedToast: "Product deleted",
      publishedToast: "🚀 Product published!",
      draftToast: "Draft saved",
      earningsOnToast: "Earnings wall ON — live on your store",
      earningsOffToast: "Earnings wall OFF",
      recentOrders: "Recent orders",
      orderProduct: "Product",
      orderBuyer: "Buyer",
    },
    form: {
      newTitle: "New product",
      editTitle: "Edit product",
      title: "Title",
      titlePh: "e.g. Midnight Preset Pack",
      desc: "Description",
      descPh: "What is it, what's included, who is it for…",
      price: "Price (₹)",
      pricePh: "299",
      cover: "Cover image",
      coverHint: "Pick an image — preview shows here (saved to localStorage)",
      removeCover: "Remove cover",
      file: "Product file",
      fileHint: "PDF / ZIP / MP4 — buyers download this (demo delivers a sample PDF)",
      dropTitle: "🔥 Drop settings",
      dropToggle: "Make it a Drop",
      dropHint: "Countdown + limited stock = FOMO. Timer ends or stock hits zero → auto Sold Out.",
      dropStart: "Starts at",
      dropEnd: "Ends at",
      maxQty: "Max quantity",
      maxQtyHint: "How many people can buy",
      saveDraft: "Save as draft",
      publish: "Publish 🚀",
      update: "Update",
      errTitle: "Add a title (min 3 characters)",
      errPrice: "Enter a valid price (above ₹1)",
      errDates: "Drop end time must be after start time",
      savedToast: "🚀 Published! It's live on your store.",
      updatedToast: "Product updated",
      draftSavedToast: "Draft saved",
      priceNote: "Demo: zero commission — the whole ₹ is yours.",
    },
    store: {
      products: "Products",
      kamaye: "earned",
      verified: "verified",
      viewProfile: "",
      notFound: "Creator not found.",
      notFoundCta: "← Go back",
    },
    product: {
      by: "—",
      buyNow: "Buy Now",
      soldOut: "SOLD OUT",
      upiNote: "Instant UPI payment",
      instant: "Instant delivery",
      share: "Send to a friend",
      backToStore: "← See full store",
      soldOutNote: "This drop has ended — it won't return.",
      fileIncluded: "File included:",
      notFound: "Product not found.",
      buyToast: "Let's checkout!",
    },
    checkout: {
      heading: "Checkout",
      summary: "Order summary",
      name: "Name",
      namePh: "Rohit Kumar",
      email: "Email",
      emailPh: "rohit@example.com",
      nameErr: "Enter your name (min 2 characters)",
      emailErr: "Enter a valid email",
      pay: "Pay",
      processing: "Processing payment…",
      trust: "🔒 Secure UPI payment via Razorpay • Instant delivery",
      notFound: "Product not found.",
    },
    upi: {
      heading: "Pay via UPI",
      sub: "Scan the QR or pay from any UPI app",
      scan: "Scan (demo QR)",
      timer: "This screen closes in",
      approve: "✓ Approve payment (demo)",
      approving: "Approving payment…",
      note: "DEMO: no real money moves. Tap the button to simulate approval.",
      payingTo: "Paying",
    },
    success: {
      heading: "Payment done!",
      orderId: "Order ID",
      download: "Download",
      emailNote: "📥 We've also emailed you the download link (valid 7 days).",
      referTitle: "🤝 Share with friends, earn 10%",
      referDesc: "When a friend buys via this link, you earn ₹.",
      copy: "Copy Link",
      copiedToast: "Link copied!",
      backStore: "← Back to store",
      dashCta: "Open creator dashboard",
    },
  },
};
