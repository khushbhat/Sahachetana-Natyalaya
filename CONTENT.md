# Content update guide

All text that changes lives in `src/data/` and `src/config/site.ts`. Editing those files
never requires touching the page components.

| To change… | Edit |
|---|---|
| Phone, email, WhatsApp, social links | `src/config/site.ts` → `CONTACT` |
| Tagline, Kannada name | `src/config/site.ts` → `SITE` |
| Sahana Chethan's biography, sections, stages, honours, timeline | `src/data/founders.ts` → `sahana` |
| Chetan S.'s profile | `src/data/founders.ts` → `chetan` (set `isPlaceholder: false` when complete) |
| The seven batches (add more by appending) | `src/data/batches.ts` |
| Program seed data | `src/data/programs.ts` (or use the admin prototype) |
| Natyaaradhana description, editions, artists | `src/data/events.ts` → `natyaaradhana` |
| Bharatheeyam, Patyadarshini, Ajita Shri, Rangapravesha, others | `src/data/events.ts` → `initiatives` |
| Awards (founder, institution, teachers, students) | `src/data/awards.ts` |
| Gallery items and categories | `src/data/gallery.ts` |

Facts with `verify: true` show a "To be verified" badge. Remove the flag once confirmed, or
turn all badges off with `SHOW_VERIFICATION_NOTES = false`.

## Source notes

- **English professional profile** — qualifications, honours (2013, 2018, 2023, 2026), selected
  stages, the "15 national editions" and "more than two decades" statements.
- **Kannada profile** — the biography narrative was translated in an earlier version of this
  project and is preserved here. **The Kannada PDF was not present in this repository during
  this build**, so the translation could not be re-checked against it. Items from it are
  marked for verification, including: early teachers, the 2003 and 2005 dates, the founding
  venues, Natyaaradhana editions from 2010, Patyadarshini's fifteen years, the 21 years of
  free training, *Kavi Kanda Yugadi*, ~150 newspaper columns (2018), and the Rangayana
  "Karunege Jai" choreography.
- Award-giving organisations and citations are not in the supplied material and show as
  "To be confirmed".
- The Kannada name **ಸಹಚೇತನ ನಾಟ್ಯಾಲಯ (ರಿ.)** should be confirmed by the institution.
- Spellings used as supplied: *Patyadarshini*, *Natyaaradhana*, *Bharatheeyam*. Confirm before launch.

## Remaining placeholders

- Official logo (temporary wordmark in use), contact email, both phone numbers, WhatsApp
  number, social links, map/address.
- Hero tagline — proposed copy ("Where discipline becomes devotion…") awaiting approval.
- Chetan S.: portrait, biography, contributions, responsibilities, achievements.
- All seven batches: location, address, landmark, days, timings, level, age group, teacher, photo.
- Programs: two upcoming and two past sample entries (marked "Placeholder").
- Natyaaradhana: official description, edition years, participating artists, poster
  (a designed placeholder poster is shown), photo archive.
- Bharatheeyam and Ajita Shri Puraskara descriptions; photos for all initiatives.
- Award organisations, citations, certificate images; institution/teacher/student awards.
- Gallery: photographs for Natyaaradhana, classes, Rangapravesha, workshops, outreach,
  awards, behind the scenes, cultural events.
- Deployed domain for `sitemap.xml`, `robots.txt` and `SITE.url`.

## Known limitations

- The admin prototype has **no real authentication** and stores events only in the current
  browser. Other visitors will not see admin changes until a backend is connected.
- The contact form sends nothing until EmailJS credentials are added.
- It is a client-rendered SPA: page titles and descriptions are set at runtime. Search engines
  that run JavaScript will see them; for social-card previews per page, add prerendering
  (e.g. `vite-plugin-prerender`) or server rendering later.
- Structured data (JSON-LD for the organisation and events) is not included, because it needs
  a verified address and contact details. Add it to `index.html` once those are confirmed.
- Fonts load from Google Fonts. Self-host them if you need the site to work offline or
  without third-party requests.
