# Asset inventory and replacement guide

## Photographs (real, supplied by the institution)

Originals live in `/images` (full resolution, not shipped). `npm run images` crops and
resizes them into `public/images/opt/` as WebP at 480/800/1200/1600 px plus a JPEG fallback.
Each is registered with alt text in `src/data/images.ts`.

| Registry key | Source file | Used on |
|---|---|---|
| `heroDancer` | `images/hero.JPG` (portrait crop) | Home hero, gallery |
| `stageWide` | `images/hero.JPG` (full frame) | Gallery |
| `gejjeDetail` | `images/hero.JPG` (feet/gejje detail) | Home intro inset, Classes header, gallery |
| `classTeam` | `images/class-team-photograph.JPG` | Home introduction, gallery |
| `classTeamCrop` | same, centre crop | available |
| `sahanaPortrait` | `images/portrait-guru-vidushi-sahana-chethan.JPG` | Founders, Home preview |
| `sahanaPortraitWide` | same, full frame | available |
| `public/og-image.jpg` | `images/hero.JPG` | Social sharing preview (1200×630) |

No stock, external or generated photographs are used. The performance photograph is
captioned neutrally ("Performance photograph · Sahachetana Natyalaya") and does not name
the dancer. Add a name to the alt text in `images.ts` once confirmed.

## Illustration

| File | Origin | Used for |
|---|---|---|
| `public/images/intro-anklets.jpg` | Gold-on-maroon line drawing already in the project | Source only |
| `public/images/illustrations/anklets-lineart.png` | Generated from the above by `optimize-images.py` (transparent mask) | Opening sketch (graphite + gold), hero background sketch, philosophy plate |

The PNG is used as a CSS mask, so it can be drawn in any colour (graphite in the opening,
gold on maroon in the philosophy section). To replace the drawing, swap `intro-anklets.jpg`
for a light-line-on-dark-background drawing and rerun `npm run images`, or put any
transparent PNG at the same path.

## Vector ornaments (hand-drawn SVG, `src/components/ornaments/`)

All take their colours from theme tokens (`--ornament`, `--bell-fill-1/2/3`), so they work in
both themes.

- `Ghungroo` — bell with suspension ring, beaded collar, granulated seam, slit mouth, highlight.
- `Pendant` — temple-jewellery pendant: lotus crown, kemp-red stone in a claw setting, pearl fringe.
- `Hoysala` — stepped plinth `Corner`/`CornerFrame`, lotus `Rosette`, 16-point `Stellate` plan,
  lathe-turned `Pillar`, kalasha `Finial`, `MudraMark` (Alapadma, Mukula, Pataka).
- `ArchFrame` — cusped multifoil arch (generated path, used as a clip and a double outline).
- `Divider` — rosette, gejje (hanging bells) and simple variants.
- `Wordmark` — **temporary** typographic wordmark with an arch-and-bell motif. It is not the
  official logo. To use the official logo, replace `WordmarkMotif` (and `public/favicon.svg`).
- CSS-only: carved frieze band (header/footer), braided cord pattern, paper/sandstone grain.

## Adding or replacing a photograph

1. Copy the original into `/images`.
2. Add a crop to `CROPS` in `scripts/optimize-images.py`
   (`"name": ("file.JPG", (left, top, right, bottom))` as fractions of the image).
3. Run `npm run images`.
4. Add an entry to `photos` in `src/data/images.ts` with the same `base` name, the crop's
   aspect ratio (printed by the script) and an accurate alt text.
5. Reference it from content data, e.g. `image: photos.myNewPhoto` in `batches.ts`,
   `events.ts`, `awards.ts` (`certificate`), `founders.ts` (`portrait`) or `gallery.ts`.

Any `image: null` renders a framed, labelled placeholder ("Photograph to be supplied"),
and a missing file falls back to the same placeholder rather than a broken image.

Only use real photographs for real people and events.
