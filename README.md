# Sahachetana Natyalaya (R.) — website

Frontend for Sahachetana Natyalaya (R.), led by Guru Vidushi Sahana Chethan.
React 18 + TypeScript + Vite, with React Router, Lucide icons and (optional) EmailJS.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run images     # regenerate optimised photos (needs Python 3 + Pillow: pip install Pillow)
```

Useful URL flags while reviewing: `?intro` replays the opening sequence, `?theme=dark` / `?theme=light` forces a theme.

## Structure

```
src/
  app/            App (routes) and Layout (header, anklet rail, panels, footer, intro)
  components/
    navigation/   Header, AnkletThread (left rail), NavPanel (anklet panel + mobile drawer)
    ornaments/    Ghungroo, Pendant, Hoysala (corners, rosette, stellate, pillars, mudras),
                  ArchFrame, Divider, Wordmark — all hand-drawn SVG
    intro/        OpeningSketch — the pencil-drawing opening
    layout/       Media (responsive image + placeholder), Editorial blocks, Footer
    classes/ programs/ events/ profiles/ gallery/ contact/ admin/
  pages/          One folder per route
  data/           ALL editable content (founders, class schedule & venues, programs, events, awards, gallery, photo registry)
  config/site.ts  Contact details, WhatsApp, EmailJS, verification-badge switch
  lib/            hooks (theme, dialogs, scroll spy, reveal) and programStore (event repository)
  styles/         tokens.css, themes.css, global.css, components.css, pages.css
scripts/optimize-images.py
```

Routes: `/`, `/founders`, `/classes`, `/programs`, `/annual-events`, `/awards`, `/contact`, `/gallery`, `/admin`.

## Configuration

- **Contact details / WhatsApp / social links** — `src/config/site.ts`. Empty values show as
  clearly marked placeholders. WhatsApp uses `https://wa.me/<digits>?text=…` once a number is set.
- **EmailJS** — copy `.env.example` to `.env` and fill in the service ID, template ID and public key.
  Without them the contact form runs in demo mode and says plainly that nothing was sent.
  The template receives `from_name`, `reply_to`, `phone`, `category`, `message`.
  For production, enable EmailJS's reCAPTCHA and domain allow-list (the form already has a
  honeypot field and a minimum fill time).
- **Verification badges** — set `SHOW_VERIFICATION_NOTES = false` in `site.ts` once the
  institution has confirmed the source-derived facts.

## Deploy

`npm run build` produces a static site in `dist/`. It is a single-page app, so the host must
serve `index.html` for unknown paths:

- **Netlify** — `public/_redirects` is included.
- **Vercel** — `vercel.json` is included.
- **Other static hosts** — configure a fallback to `/index.html`.

Before going live: replace `YOUR-DOMAIN` in `public/sitemap.xml` and `public/robots.txt`,
and set `SITE.url` in `src/config/site.ts`.

## Admin prototype

`/admin` (linked as "Admin Login" at the foot of every page) is **frontend-only**. Demo
credentials are `demo` / `natya`; they are in the browser bundle and provide no security.
Events are stored in this browser's `localStorage` only. Adding, editing, publishing,
drafting and deleting events updates the public Programs page and the homepage "Coming up"
strip immediately.

To connect a backend later, implement the `ProgramRepository` interface in
`src/lib/programStore.ts` against your API and swap `repository` — the public components
don't change. Replace the demo login with real server-side authentication at the same time.

See also **DESIGN.md** (visual direction and references), **ASSETS.md** (photo manifest, consent, logo) and
**CONTENT.md** (updating content, the verification register, placeholders and known limitations).
