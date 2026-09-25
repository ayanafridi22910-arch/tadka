# Tadka 🍛

> Apni link-in-bio ko **UPI wali dukaan** banao — 5 minute mein.
> India-first, Stan-style creator storefront SaaS.

**Ye DEMO build hai** — `demo-build-prompt.md` ke hisaab se: **no backend, no Supabase, no Razorpay**. Saara data browser ke **localStorage** mein rehta hai aur har button/link kaam karta hai.

## Quick start

```bash
cd tadka
npm install
npm run dev
```

Koi `.env` ki zaroorat **nahi** — demo mode mein koi external service nahi.

## Pages (sab URLs)

| Page | URL |
|---|---|
| Landing page | `http://localhost:3000/` |
| Demo login | `http://localhost:3000/login` |
| Creator dashboard | `http://localhost:3000/dashboard` |
| Add/Edit product | `http://localhost:3000/dashboard/product/new` |
| Public storefront | `http://localhost:3000/demo/ayan` |
| Product page (Drop live) | `http://localhost:3000/demo/ayan/p-1` |
| Checkout (fake UPI) | `ORD` create hone pe auto-redirect |
| Success + download | payment approve karte hi auto-redirect |

## Demo flows to try

1. **Landing → Login** → "Enter Demo →" dabao → dashboard.
2. **Dashboard** → 4 stat cards, 7-din ka chart, product list. **Delete** pe confirm dialog. Settings mein **Earnings wall toggle** → `/demo/ayan` pe badge on/off.
3. **Naya product** → title/price/cover image (preview ke saath) → Drop toggle → datetime + max qty → **Publish** → dashboard list + `/demo/ayan` pe live. Refresh maro — data bana rahega (localStorage).
4. **Buyer flow** → `/demo/ayan` → "Midnight Preset Pack" (Drop live, countdown ticking) → Buy Now → checkout form (validation) → fake UPI QR + 30-sec timer → **Approve payment** → success page → **Download** (sample PDF generate hota hai) → **Copy Link** (clipboard + toast).
5. **हिं/EN toggle** har page pe — saara text switch hota hai.

## Full-product roadmap (PRD section 10)

- [x] Landing page (ui-doc 6.1)
- [x] Demo mode: localStorage store + mock data (3 creators, 10 products, 2 live drops)
- [ ] Supabase auth + DB (production build — `supabase/schema.sql` ready hai)
- [ ] Razorpay checkout + webhook + delivery email (⚠️ KYC chahiye)
- [ ] Payouts + admin panel

## PRD edge cases (production build mein dhyan rakhna)

- Drop timer **server time** se — client time cheating-proof nahi
- Download links **signed + expiring** — kabhi public URL nahi
- UPI pending > 5 min → "pending" status + webhook se auto-reconcile
- Duplicate username → alternatives suggest karo
