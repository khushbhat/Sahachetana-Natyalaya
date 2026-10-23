# Content update guide and verification register

All text that changes lives in `src/data/` and `src/config/site.ts`. Editing those files never
requires touching page components.

| To change… | Edit |
|---|---|
| Phone, email, WhatsApp, social links, tagline | `src/config/site.ts` |
| Class days, times, levels; venues, addresses, map links | `src/data/batches.ts` (`schedule`, `venues`) |
| Founders' profiles | `src/data/founders.ts` |
| Natyaaradhana editions (add a new edition object — the archive, strand and home feature follow) | `src/data/events.ts` → `natyaaradhana.editions` |
| Shivamogga Vaibhava, initiatives | `src/data/events.ts` |
| Programs (or use the admin prototype) | `src/data/programs.ts` |
| Awards, press clippings | `src/data/awards.ts` (`awards`, `press`) |
| Gallery | `src/data/gallery.ts` |
| Which photo appears where | `src/data/images.ts` (see ASSETS.md) |

`verify: true` on any fact shows a "To be verified" badge. Turn all badges off with
`SHOW_VERIFICATION_NOTES = false` in `site.ts` once the academy has confirmed the content.

**Past vs upcoming is automatic.** A program or festival edition with a date moves to "Past" the day
after its last day (`effectiveListing` in `src/lib/programStore.ts`; `isPastEdition` in `events.ts`).

**Wording rule.** The only free initiative is *Bharatanatyam training for underprivileged children*.
Rangapravesha and the academy's programmes in general are not described as free anywhere on the site.

## Verification register

### ⚠ Discrepancy to resolve first — Natyaaradhana 15 dates

| Source | Dates | Venue |
|---|---|---|
| Brief supplied for this redesign | 4, 5 and 6 **October** 2026 | — |
| Stage backdrop in DSC08195 (Kannada, legible) | 2026 **September** 03, 04, 05 | Kuvempu Rangamandira, Shivamogga; *sahakara*: Department of Kannada and Culture, Shivamogga |
| Camera dates of the 52 festival photographs | 3 and 4 September 2026 | — |

The site currently shows **3, 4 & 5 September 2026** (with a "Dates to be confirmed" badge),
because two independent pieces of evidence agree. Either way the edition is in the past.
If October is correct, change `start`, `end` and `datesLabel` in `events.ts` and the matching
program in `programs.ts`.

### Teaching venues (researched October 2026)

| Venue as supplied | Finding | Status |
|---|---|---|
| Vasavi Public School, Kote Road, KR Puram | CBSE SARAS 830502 lists **"Vasavi Vidyalaya", Kote Road, Shimoga 577201** — probably the same campus, name differs | Partial — confirm name, PIN, entrance |
| Open Minds School | Closest record: **Open Minds World School**, NH 13, Holehonnur Road, Javalli, Shivamogga 577227 (CBSE 831090) | Unverified — may not be the class venue |
| Kalabharati, Bharatiya Vidya Bhavan | BVB school, Vidyanagara, Shimoga (CBSE 830362; PIN listed as both 577203 and 577201). No "Kalabharati" listing found | Unverified |
| Madhavanele, Kalhalli | No public listing found | Unverified |
| Gundappa Shed | No public listing found | Unverified |

No map links are published. Add `mapUrl` to a venue only for a pin the academy confirms.
Days, times and levels are exactly as supplied. No fees are published.

### Natyaaradhana 15 programme

- Day structure, Kathak by Priyanka, and the inclusion of Prathibimba: **supplied by the academy**.
- "Presented by international artists" (Day 3) is shown as "visiting artists from outside India".
- **Prathibimba — verified externally:** a multi-medium work (Bharatanatyam, spoken word, animation)
  by Prathibha Ramaswamy and Janani Murali on the life and poetry of Da. Ra. Bendre; premiered
  8 Feb 2025 (prathibharamaswamy.com/works; padmalayadancefoundation.com/productions); staged at
  Bangalore International Centre on 1 Nov 2025 and in Mysuru on 6 June 2026 (Star of Mysore).
  Not externally confirmed: the subtitle "The Bendre Project" (not used on either artist's site),
  and its performance at Natyaaradhana 15. Spelling: the artist's own site uses *Prathibha*;
  Star of Mysore uses *Pratibha* and *Pratibimba*.
- Priyanka's full name is not supplied.

### Shivamogga Vaibhava

Nothing found online. Shown as a record of past Dasara presentations ("6:00 PM each day at Freedom
Park", as supplied), with year, dates and the exact Freedom Park venue marked to be confirmed. It is
not shown as a current schedule.

### Founders

- Sahana Chethan: qualifications, honours (2013, 2018, 2023, 2026), stages — from the English profile.
  Award-giving organisations are still unknown ("To be confirmed" on the Awards page).
- Biography narrative is a translation of the Kannada profile from an earlier build; the Kannada
  PDF was not in the repository, so items from it remain marked for verification.
- **Attribution to check:** the Kannada profile credits Sahana with ~150 newspaper columns (2018);
  the newer brief associates newspaper articles with Chetan S. Both are flagged.
- Chetan S.: no profile document was supplied. The page lists only the areas of work named in the
  brief, each marked "To be verified", and no portrait is shown. Supply a biography and photograph.
- `sahanaPerformance` identification — see ASSETS.md.

### Initiatives

- *Bharatiyam* is spelled as in the brief (Kannada ಭಾರತೀಯಂ). Earlier versions of the site used
  *Bharatheeyam* — confirm the preferred spelling. The "13th edition" reading comes from a blurred banner.
- Patyadarshini, Ajita Shri Puraskara, Kavi Kanda Yugadi: as in earlier versions, marked where unconfirmed.

## Remaining placeholders

High-resolution or SVG logo (current file is a 500 px preview) · contact email, phones, WhatsApp, social links · Chetan S. portrait and biography ·
award organisations, citations and certificate photographs · press clippings · photographs for
Patyadarshini, Ajita Shri Puraskara and cultural programmes · deployed domain for `sitemap.xml`,
`robots.txt` and `SITE.url` · EmailJS credentials (`.env`).

## Known limitations

- The admin prototype has **no real authentication** (demo login in the browser bundle) and stores
  programs only in the current browser. Its storage key moved to `sn-programs-v2`, so browsers that
  had the old placeholder programs now start from the real records.
- The contact form sends nothing until EmailJS credentials are added; it says so plainly.
- Client-rendered SPA: per-page titles are set at runtime. Add prerendering for per-page social cards.
- No JSON-LD structured data — it needs a verified address and contact details.
