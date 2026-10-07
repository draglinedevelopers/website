# Dragline Developers website

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript. Built from the Dragline Figma design.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` checks and builds the production site.

## Editing content (no page code needed)

| What | Where |
| --- | --- |
| Work / case studies | `data/projects.ts` (instructions at the top of the file) |
| Services, prices, scopes | `data/services.ts` |
| FAQs (Home) | `data/faqs.ts` |
| Team (About) | `data/team.ts` |
| Email, phone, socials, WhatsApp | `lib/site.ts` |
| **Tally form (Contact)** | `lib/site.ts` → `tallyFormId` |

Text in `[square brackets]` is placeholder copy from the design. Replace it only with real, verified content.
Project images go in `public/work/<slug>/`, team photos in `public/team/`.

## Structure

- `app/` pages: Home, Work (+ `/work/[slug]` case studies), Services, About, Contact
- `components/` shared UI (nav, footer, sections, cards)
- `data/` editable content
- `public/figma/` icons and thread-motif assets exported from Figma
- Design tokens (colours, type sizes) live in `app/globals.css`

## Deploy

Vercel detects Next.js automatically; no environment variables are required.
