/**
 * Photograph registry. Every real photograph on the site is listed here.
 *
 * To add or replace a photograph:
 *   1. Put the full-resolution original in /images.
 *   2. Add a crop to CROPS in scripts/optimize-images.py and run `npm run images`.
 *   3. Add an entry below with the same `base` name and an accurate alt text.
 * See ASSETS.md for the full guide.
 */
export type PhotoAsset = {
  base: string;
  /** width / height of the generated crop */
  aspect: number;
  widths: number[];
  alt: string;
  /** Origin of the image, for the asset inventory */
  source: string;
  /** Focal point for object-position, e.g. '50% 30%' */
  focus?: string;
};

const W = [480, 800, 1200, 1600];

export const photos = {
  heroDancer: {
    base: 'hero-dancer',
    aspect: 3110 / 4128,
    widths: W,
    alt: 'A Bharatanatyam dancer in a pink and green silk costume holds a balanced pose on a darkened stage, one foot raised.',
    source: 'Supplied by the institution (images/hero.JPG)',
    focus: '55% 40%',
  },
  stageWide: {
    base: 'stage-wide',
    aspect: 4 / 3,
    widths: W,
    alt: 'A Bharatanatyam dancer performs on a stage set with a carved arch backdrop bearing Kannada lettering.',
    source: 'Supplied by the institution (images/hero.JPG)',
    focus: '50% 50%',
  },
  gejjeDetail: {
    base: 'gejje-detail',
    aspect: 1,
    widths: W,
    alt: 'Detail of a dancer’s raised foot, ankle bells and pleated silk costume under stage light.',
    source: 'Detail crop of the performance photograph supplied by the institution (images/hero.JPG)',
    focus: '40% 40%',
  },
  classTeam: {
    base: 'class-team',
    aspect: 4 / 3,
    widths: W,
    alt: 'Seen from the back of the stage, the guru stands before a full auditorium with young dancers in flowered hair seated at the stage edge.',
    source: 'Supplied by the institution (images/class-team-photograph.JPG)',
    focus: '50% 60%',
  },
  classTeamCrop: {
    base: 'class-team-crop',
    aspect: 3083 / 2560,
    widths: W,
    alt: 'The guru, in a red shawl, faces the audience with her young dancers seated along the front of the stage.',
    source: 'Crop of the class and team photograph supplied by the institution',
    focus: '50% 50%',
  },
  sahanaPortrait: {
    base: 'sahana-portrait',
    aspect: 2928 / 3648,
    widths: W,
    alt: 'Guru Vidushi Sahana Chethan in classical dance jewellery and a gold and maroon silk sari, smiling over her shoulder outdoors.',
    source: 'Supplied by the institution (images/portrait-guru-vidushi-sahana-chethan.JPG)',
    focus: '50% 30%',
  },
  sahanaPortraitWide: {
    base: 'sahana-portrait-wide',
    aspect: 1.5,
    widths: W,
    alt: 'Guru Vidushi Sahana Chethan in classical dance jewellery against a garden backdrop.',
    source: 'Supplied by the institution (images/portrait-guru-vidushi-sahana-chethan.JPG)',
    focus: '60% 30%',
  },
} satisfies Record<string, PhotoAsset>;

export const LINE_ART_ANKLETS = '/images/illustrations/anklets-lineart.png';
