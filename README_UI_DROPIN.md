# TD Studios Agency – UI Drop‑In (Glassmorphism)

This bundle wires a black/white, glassmorphism landing into your existing **Next.js (App Router) + Tailwind** MVP scaffold.

## What’s included
- `components/AgencyLanding.tsx` – landing UI with frosted glass, shimmer, luxury vibe
- `app/page.tsx` – renders the landing
- `styles/globals.css` – Tailwind base + Inter font import
- `tailwind.config.ts` – brand tokens + Inter mapping

## Install (copy files)
Unzip into your **dashboard** app root (the same folder that has `app/`, `components/`, `tailwind.config.ts`). If prompted, merge/replace the files listed above.

```
/dashboard
  app/page.tsx
  components/AgencyLanding.tsx
  styles/globals.css
  tailwind.config.ts
```

> If you already have `globals.css` or `tailwind.config.ts`, compare and merge the Inter import and the color tokens.

## Tailwind build
Nothing special needed. Run your usual dev server:

```bash
pnpm dev
# or
npm run dev
```

## Notes
- The component uses only Tailwind classes (no external UI libraries), so it drops in cleanly.
- For best results, keep your page background black and allow `backdrop-blur` (ensure Tailwind is configured and you're not disabling backdrop filters in CSS resets).
- If you want to keep your prior homepage content, move this component to `app/(marketing)/page.tsx` and add a route accordingly.
