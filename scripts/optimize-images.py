"""
Builds web-ready images from the full-resolution originals in /images.

  python scripts/optimize-images.py

Outputs responsive WebP files (+ one JPEG fallback) to public/images/opt/,
the transparent anklet line-art mask to public/images/illustrations/, and the
logo, browser icons and social-share card to public/images/brand/ and public/.
Edit CROPS to add a photograph or change a crop (box = left, top, right,
bottom as fractions of the original image).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images"
OUT = ROOT / "public" / "images" / "opt"
ILL = ROOT / "public" / "images" / "illustrations"
BRAND = ROOT / "public" / "images" / "brand"

# Official logo: gold dancer figure with the Kannada name in white beneath it.
LOGO = SRC / "images" / "logo" / "1000417897-removebg-preview.png"
LOGO_MARK_BOTTOM = 419  # last row of the figure and its ellipse base; the white lettering starts below
MAROON = (72, 28, 38)
IVORY = (245, 235, 221)
WIDTHS = [480, 800, 1200, 1600]

CROPS = {
    # name: (source file, crop box as fractions)
    "hero-dancer": ("hero.JPG", (0.18, 0.0, 0.745, 1.0)),
    "gejje-detail": ("hero.JPG", (0.285, 0.58, 0.60, 1.0)),
    "stage-wide": ("hero.JPG", (0.0, 0.0, 1.0, 1.0)),
    "class-team": ("class-team-photograph.JPG", (0.0, 0.0, 1.0, 1.0)),
    "class-team-crop": ("class-team-photograph.JPG", (0.22, 0.38, 0.78, 1.0)),
    "sahana-portrait": ("portrait-guru-vidushi-sahana-chethan.JPG", (0.285, 0.0, 0.82, 1.0)),
    "sahana-portrait-wide": ("portrait-guru-vidushi-sahana-chethan.JPG", (0.0, 0.0, 1.0, 1.0)),
    # --- Natyaaradhana 15, evening of 3 Sept 2026 (images/images/aesthetics, camera EXIF date)
    "n15-backdrop": ("images/aesthetics/DSC08195.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-stage-lights": ("images/aesthetics/DSC08203.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-arms-raised": ("images/aesthetics/DSC08352.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-trio": ("images/aesthetics/DSC08315.JPG", (0.0, 0.08, 1.0, 1.0)),
    "n15-ensemble-line": ("images/aesthetics/DSC08236.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-adavu-feet": ("images/aesthetics/DSC08241.JPG", (0.04, 0.22, 0.86, 1.0)),
    "n15-floor": ("images/aesthetics/DSC08275.JPG", (0.0, 0.18, 1.0, 1.0)),
    "n15-finale": ("images/aesthetics/DSC08398.JPG", (0.0, 0.24, 1.0, 0.88)),
    "n15-soloist": ("images/aesthetics/DSC08225.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-smile": ("images/aesthetics/DSC08227.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-pair": ("images/aesthetics/DSC08351.JPG", (0.0, 0.1, 1.0, 1.0)),
    "n15-pleats": ("images/aesthetics/DSC08325.JPG", (0.0, 0.1, 1.0, 1.0)),
    "n15-young-pose": ("images/aesthetics/DSC08367.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-young-ensemble": ("images/aesthetics/DSC08366.JPG", (0.0, 0.1, 1.0, 1.0)),
    "n15-spotlight": ("images/aesthetics/DSC08280.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-wings": ("images/aesthetics/DSC08414.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-backstage-hair": ("images/aesthetics/DSC07991.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-jasmine": ("images/aesthetics/DSC08148.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-ornament": ("images/aesthetics/DSC08149.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-arrival": ("images/aesthetics/DSC08153.JPG", (0.0, 0.0, 1.0, 1.0)),
    "n15-greenroom": ("images/aesthetics/DSC08119.JPG", (0.0, 0.0, 1.0, 1.0)),
    # --- Other programmes (images/images/events, performances)
    "community-group": ("images/events/FB_IMG_1787166454546.jpg", (0.0, 0.0, 1.0, 1.0)),
    "community-audience": ("images/events/FB_IMG_1786871239248.jpg", (0.0, 0.0, 1.0, 1.0)),
    "bharatiyam-group": ("images/events/IMG-20260817-WA0115.jpg", (0.0, 0.0, 1.0, 1.0)),
    "sahana-performance": ("images/performances/0Z6A9394.JPG", (0.22, 0.06, 0.78, 1.0)),
}


def build_photos():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (file, (l, t, r, b)) in CROPS.items():
        im = ImageOps.exif_transpose(Image.open(SRC / file)).convert("RGB")
        w, h = im.size
        im = im.crop((int(l * w), int(t * h), int(r * w), int(b * h)))
        for tw in WIDTHS:
            if tw > im.width:
                continue
            th = round(im.height * tw / im.width)
            im.resize((tw, th), Image.LANCZOS).save(OUT / f"{name}-{tw}.webp", quality=80, method=6)
        if im.width < WIDTHS[0]:
            im.save(OUT / f"{name}-{im.width}.webp", quality=82, method=6)
        fw = min(1200, im.width)
        im.resize((fw, round(im.height * fw / im.width)), Image.LANCZOS).save(
            OUT / f"{name}.jpg", quality=82, optimize=True, progressive=True)
        print(name, im.size, "aspect", round(im.width / im.height, 4), "widths", [w for w in WIDTHS if w <= im.width])


def build_lineart():
    """Turns the gold-on-maroon anklet drawing into a white-on-transparent mask."""
    ILL.mkdir(parents=True, exist_ok=True)
    im = Image.open(ROOT / "public" / "images" / "intro-anklets.jpg").convert("RGB")
    bg = (75, 14, 20)
    px = im.load()
    a = Image.new("L", im.size)
    ap = a.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b = px[x, y]
            d = ((r - bg[0]) * 0.5 + (g - bg[1]) * 1.0 + (b - bg[2]) * 0.6) / 1.6
            ap[x, y] = max(0, min(255, int((d - 14) * 2.1)))
    a = a.filter(ImageFilter.GaussianBlur(0.35))
    out = Image.new("LA", im.size, 255)
    out.putalpha(a)
    out.save(ILL / "anklets-lineart.png", optimize=True)


def _fit(im, box_w, box_h):
    """Scale an RGBA image to fit a box, keeping its proportions."""
    s = min(box_w / im.width, box_h / im.height)
    return im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)


def _icon(mark, size, pad=0.14):
    """The gold mark centred on a maroon square — legible on light and dark browser tabs."""
    bg = Image.new("RGBA", (size, size), MAROON + (255,))
    m = _fit(mark, size * (1 - 2 * pad), size * (1 - 2 * pad))
    bg.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return bg


def _font(names, size):
    for n in names:
        try:
            return ImageFont.truetype(n, size)
        except OSError:
            continue
    return None


def build_brand():
    """Logo files, browser icons and the social-share card, all from the official logo."""
    if not LOGO.exists():
        print("logo not found, skipping brand assets:", LOGO)
        return
    BRAND.mkdir(parents=True, exist_ok=True)
    logo = Image.open(LOGO).convert("RGBA")
    full = logo.crop(logo.getbbox())  # figure + white Kannada lettering — for dark backgrounds
    mark = logo.crop((0, 0, logo.width, LOGO_MARK_BOTTOM))
    mark = mark.crop(mark.getbbox())  # figure only — for light backgrounds
    full.save(BRAND / "logo-full.png", optimize=True)
    mark.save(BRAND / "logo-mark.png", optimize=True)
    mark.save(BRAND / "logo-mark.webp", quality=90, method=6)
    print("logo-mark", mark.size, "aspect", round(mark.width / mark.height, 4), "| logo-full", full.size)

    pub = ROOT / "public"
    _icon(mark, 512).save(pub / "icon-512.png", optimize=True)
    _icon(mark, 192).save(pub / "icon-192.png", optimize=True)
    _icon(mark, 180, pad=0.12).convert("RGB").save(pub / "apple-touch-icon.png", optimize=True)
    _icon(mark, 32, pad=0.06).save(pub / "favicon-32.png", optimize=True)
    _icon(mark, 64, pad=0.06).save(pub / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])

    # Social-share card (1200x630): the logo and name on maroon beside the hero photograph
    card = Image.new("RGBA", (1200, 630), MAROON + (255,))
    hero = ImageOps.exif_transpose(Image.open(SRC / "hero.JPG")).convert("RGB")
    w, h = hero.size
    ph_w = 560
    box_w = round(h * ph_w / 630)
    left = max(0, min(w - box_w, round(0.47 * w - box_w / 2)))
    photo = hero.crop((left, 0, left + box_w, h)).resize((ph_w, 630), Image.LANCZOS)
    card.paste(photo, (1200 - ph_w, 0))
    d = ImageDraw.Draw(card)
    d.line([(1200 - ph_w - 1, 0), (1200 - ph_w - 1, 630)], fill=(181, 138, 69), width=2)
    panel_w = 1200 - ph_w
    lg = _fit(full, panel_w * 0.5, 300)
    card.alpha_composite(lg, ((panel_w - lg.width) // 2, 48))
    fonts = ["GARA.TTF", "C:/Windows/Fonts/GARA.TTF", "Cormorant-Regular.ttf", "georgia.ttf", "DejaVuSerif.ttf"]
    serif, sub, small = _font(fonts, 50), _font(fonts, 36), _font(fonts, 24)
    if serif and sub and small:
        for text, font, y, fill in [
            ("SAHACHETANA", serif, 392, IVORY),
            ("NATYALAYA (R.)", sub, 452, IVORY),
            ("Bharatanatyam · Shivamogga", small, 530, (215, 183, 122)),
        ]:
            tw = d.textlength(text, font=font)
            d.text(((panel_w - tw) / 2, y), text, font=font, fill=fill)
    card.convert("RGB").save(pub / "og-image.jpg", quality=86, optimize=True)


if __name__ == "__main__":
    build_photos()
    build_lineart()
    build_brand()
