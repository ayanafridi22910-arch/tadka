# Tadka 🍛

> Apni link-in-bio ko **UPI wali dukaan** banao — 5 minute mein.
> India-first, Stan-style creator storefront SaaS. PRD: see `../prd-creator-storefront-saas.md`.

**Stack:** Next.js 14 (App Router) · Supabase (Postgres + Auth) · Tailwind CSS · Razorpay (UPI) — sab free tiers pe.
**Design:** `../ui-design-doc.md` follow hota hai — purple `#6C3CE0` primary, Inter + Noto Sans Devanagari, 48px buttons, hi/en toggle har page pe.

## Quick start

```bash
cd tadka
npm install
cp .env.example .env.local   # values bharo
npm run dev                  # http://localhost:3000
```

## Setup steps

1. **Supabase** — [supabase.com/dashboard](https://supabase.com/dashboard) pe free project banao.
   - SQL Editor mein `supabase/schema.sql` paste karke run karo (tables + RLS ready).
   - Settings → API se URL + keys copy karke `.env.local` mein daalo.
2. **Razorpay** — ⚠️ **KYC chahiye (business documents). Ye early flag karo — approval mein time lagta hai.** Test keys se pehle develop karo, live keys baad mein.
3. **Dev server** chalao — landing page live hai, auth/dashboard agli build phase.

## Build order (PRD section 10)

- [x] 1. Scaffold + DB schema + Supabase clients
- [x] Landing page (marketing site) — ui-doc 6.1 ke hisaab se
- [ ] 2. Creator onboarding + public storefront page (`[username]` route)
- [ ] 3. Product CRUD + file upload (Supabase Storage)
- [ ] 4. Razorpay checkout + webhook + delivery email (Resend)
- [ ] 5. Sales dashboard
- [ ] 6. Drop system (server-time countdown + stock logic)
- [ ] 7. Earnings Wall toggle + public widget
- [ ] 8. Referral links + commission tracking
- [ ] 9. Payouts + admin panel
- [ ] 10. Hindi/English toggle + polish

## PRD edge cases (implementation mein dhyan rakhna)

- Payment webhook delayed → Razorpay order status poll karo "failed" dikhane se pehle
- Drop timer **server time** se — client time cheating-proof nahi hota
- Download links **signed + expiring** — kabhi public URL nahi
- UPI pending > 5 min → "pending" status + webhook se auto-reconcile
- Duplicate username → alternatives suggest karo
