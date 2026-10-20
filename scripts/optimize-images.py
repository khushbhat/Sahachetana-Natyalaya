"""
Builds web-ready images from the full-resolution originals in /images.

  python scripts/optimize-images.py

Outputs responsive WebP files (+ one JPEG fallback) to public/images/opt/
and the transparent anklet line-art mask to public/images/illustrations/.
Edit CROPS to add a photograph or change a crop (box = left, top, right,
bottom as fractions of the original image).
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images"
OUT = ROOT / "public" / "images" / "opt"
ILL = ROOT / "public" / "images" / "illustrations"
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
        fw = min(1200, im.width)
        im.resize((fw, round(im.height * fw / im.width)), Image.LANCZOS).save(
            OUT / f"{name}.jpg", quality=82, optimize=True, progressive=True)
        print(name, im.size, "aspect", round(im.width / im.height, 4))


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
    # Open Graph image: performance photograph, 1200x630
    hero = ImageOps.exif_transpose(Image.open(SRC / "hero.JPG")).convert("RGB")
    w, h = hero.size
    og = hero.crop((int(0.05 * w), int(0.12 * h), int(0.95 * w), int(0.12 * h + 0.9 * w * 630 / 1200)))
    og.resize((1200, 630), Image.LANCZOS).save(ROOT / "public" / "og-image.jpg", quality=82, optimize=True)


if __name__ == "__main__":
    build_photos()
    build_lineart()
