# Paradise Grand Marquee — Venue Website

A mobile-first, conversion-focused marketing & lead-capture website for **Paradise Grand
Marquee**, a wedding and corporate event venue on East Canal Road, Faisalabad, Pakistan.

- **Hero** with rating badge (4.3★ · 946+ Google reviews) and dual CTA
- **Banquet halls** showcase (Grand / Royal / Garden — up to 1,000 guests)
- **Event types**: Weddings & Barat, Walima, Mehndi & Sangeet, Corporate events
- **Transparent package comparison** (Standard / Premium / Royal)
- **Date-availability enquiry form** with validation + WhatsApp handoff
- **Gallery, Google-style reviews, location map, sticky WhatsApp button**

## Tech Stack

| Layer     | Choice                                      |
| --------- | ------------------------------------------- |
| Framework | Next.js 16 (App Router) + TypeScript 5      |
| Styling   | Tailwind CSS 4 + shadcn/ui + Lucide icons   |
| Motion    | Framer Motion (scroll reveals)              |
| Database  | Prisma ORM + SQLite (optional — see below)  |

## Run Locally

```bash
# 1. Install dependencies (also generates the Prisma client)
npm install        # or: bun install

# 2. Create your env file
cp .env.example .env

# 3. Create the SQLite database
npx prisma db push   # or: bun run db:push

# 4. Start the dev server
npm run dev          # or: bun run dev  → http://localhost:3000
```

## How Enquiries Work (important for hosting)

The enquiry form posts to `/api/enquiries`, which tries these channels **in order**:

1. **Database (Prisma + SQLite)** — used when `DATABASE_URL` is set and writable
   (local dev, VPS, Docker, Railway, Fly.io…).
2. **Outbound webhook** — if `ENQUIRY_WEBHOOK_URL` is set, every enquiry is POSTed
   there as JSON. Point it at Zapier / Make / n8n to push leads into
   **Google Sheets, a CRM, email or Telegram** — no server needed.
3. **WhatsApp fallback** — if storage isn't available (e.g. serverless hosts where
   the filesystem is ephemeral), the API returns a pre-filled WhatsApp deep link and
   the visitor sees a *"Send request on WhatsApp"* screen — the lead still reaches
   the venue, nothing is lost.

> **On Vercel:** leave `DATABASE_URL` unset. Configure `ENQUIRY_WEBHOOK_URL`
> (recommended) and every enquiry also reaches you via WhatsApp automatically.

## Deploy to Vercel

### Option A — Deploy via Git (recommended)

1. Create a new repository on GitHub and push this project:
   ```bash
   git init
   git add .
   git commit -m "Paradise Grand Marquee website"
   git branch -M main
   git remote add origin https://github.com/<you>/paradise-grand-marquee.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), import the repo and click **Deploy**.
   Vercel auto-detects Next.js — no build settings needed.
3. After the first deploy, add environment variables
   (**Project → Settings → Environment Variables**) and redeploy:
   | Variable               | Value                                            | Required          |
   | ---------------------- | ------------------------------------------------ | ----------------- |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` (or custom)     | Recommended (SEO) |
   | `ENQUIRY_WEBHOOK_URL`  | your Zapier / Make / n8n webhook URL             | Optional          |
   | `DATABASE_URL`         | leave **unset** on Vercel                        | —                 |

### Option B — Deploy via Vercel CLI

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

### Custom domain

After deploying: **Project → Settings → Domains → Add**, then point your DNS
(`A` record → `76.76.21.21`, or `CNAME` → `cname.vercel-dns.com`) and set
`NEXT_PUBLIC_SITE_URL` to the final domain.

## Database on Production (optional upgrade)

SQLite is perfect for local dev but doesn't persist on serverless platforms. If you
want enquiries stored in a real database on Vercel, switch the Prisma datasource:

1. Create a free database (e.g. [Neon](https://neon.tech) or
   [Turso](https://turso.tech) for SQLite-compatible hosting).
2. In `prisma/schema.prisma` change the provider (`"postgresql"` for Neon) and set
   `DATABASE_URL` to the hosted connection string.
3. Run `npx prisma db push` locally against the hosted URL, then redeploy.

The enquiry API already works with either setup — no code changes needed beyond the
schema provider.

## Scripts

| Command          | Description                            |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Start the development server           |
| `npm run build`  | Generate Prisma client + production build |
| `npm run start`  | Serve the production build             |
| `npm run lint`   | ESLint                                 |
| `npm run db:push`| Push Prisma schema to the database     |

## Contact Info Used Across the Site

- **Phone / WhatsApp:** +92 301 5584444
- **Address:** East Canal Road, near FCCI / Zia Colony, Faisalabad, Punjab, Pakistan
- **Instagram:** [@paradisegrandmarquee](https://www.instagram.com/paradisegrandmarquee/)
- **Facebook:** [paradisegrandmarquee](https://www.facebook.com/paradisegrandmarquee/)

All of this lives in one place — `src/lib/site-config.ts` — so it's easy to update.
