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
  /** Children are recognisable in the frame — publish only with guardian consent (see ASSETS.md) */
  includesMinors?: boolean;
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

  /* ---- Natyaaradhana 15 — photographed on the evening of 3 September 2026 (camera date) ---- */
  n15Backdrop: {
    base: 'n15-backdrop',
    aspect: 0.75,
    widths: W,
    alt: 'The Natyaaradhana 15 stage: a garlanded Nataraja idol and oil lamps before a maroon backdrop lettered in Kannada with the festival name, dates and venue.',
    source: 'images/images/aesthetics/DSC08195.JPG',
    focus: '50% 40%',
  },
  n15StageLights: {
    base: 'n15-stage-lights',
    aspect: 0.75,
    widths: W,
    alt: 'The empty festival stage washed in blue light and haze, the Natyaaradhana backdrop and Nataraja idol at its centre.',
    source: 'images/images/aesthetics/DSC08203.JPG',
    focus: '50% 55%',
  },
  n15ArmsRaised: {
    base: 'n15-arms-raised',
    aspect: 0.75,
    widths: W,
    alt: 'A dancer in green and pink silk raises both arms into an arch above her head, carved stage arches behind her.',
    source: 'images/images/aesthetics/DSC08352.JPG',
    focus: '55% 35%',
  },
  n15Trio: {
    base: 'n15-trio',
    aspect: 4128 / 5064,
    widths: W,
    alt: 'Three dancers in matching green and pink costumes hold a raised-arm pose in unison before a temple-pillar backdrop.',
    source: 'images/images/aesthetics/DSC08315.JPG',
    focus: '45% 40%',
  },
  n15EnsembleLine: {
    base: 'n15-ensemble-line',
    aspect: 4 / 3,
    widths: W,
    alt: 'A diagonal line of dancers in green and pink silk receding across the stage, hands joined in front of them.',
    source: 'images/images/aesthetics/DSC08236.JPG',
    focus: '60% 55%',
  },
  n15AdavuFeet: {
    base: 'n15-adavu-feet',
    aspect: 4513 / 3220,
    widths: W,
    alt: 'Dancers bend low in unison; their alta-reddened feet, ankle bells and pleated silk meet the stage floor.',
    source: 'Crop of images/images/aesthetics/DSC08241.JPG',
    focus: '40% 70%',
  },
  n15Floor: {
    base: 'n15-floor',
    aspect: 5504 / 3385,
    widths: W,
    alt: 'A full ensemble seated and kneeling in a curved formation across the stage under a row of coloured lights.',
    source: 'images/images/aesthetics/DSC08275.JPG',
    focus: '40% 60%',
    includesMinors: true,
  },
  n15Finale: {
    base: 'n15-finale',
    aspect: 5504 / 2642,
    widths: W,
    alt: 'The whole company arranged across the stage in a final tableau beneath the Natyaaradhana 15 backdrop.',
    source: 'Crop of images/images/aesthetics/DSC08398.JPG',
    focus: '50% 50%',
    includesMinors: true,
  },
  n15Soloist: {
    base: 'n15-soloist',
    aspect: 4 / 3,
    widths: W,
    alt: 'A dancer in the foreground holds a pose, smiling, with the Kannada lettering of the festival backdrop behind her.',
    source: 'images/images/aesthetics/DSC08225.JPG',
    focus: '50% 40%',
  },
  n15Smile: {
    base: 'n15-smile',
    aspect: 0.75,
    widths: W,
    alt: 'A dancer smiles mid-movement, hands extended, jasmine and red flowers in her hair.',
    source: 'images/images/aesthetics/DSC08227.JPG',
    focus: '55% 30%',
  },
  n15Pair: {
    base: 'n15-pair',
    aspect: 4128 / 4954,
    widths: W,
    alt: 'Two dancers balance on one leg, arms curved overhead, the fanned pleats of their costumes open.',
    source: 'images/images/aesthetics/DSC08351.JPG',
    focus: '55% 45%',
    includesMinors: true,
  },
  n15Pleats: {
    base: 'n15-pleats',
    aspect: 4128 / 4954,
    widths: W,
    alt: 'Three dancers in a deep half-seated stance, their pleated costumes opening like fans.',
    source: 'images/images/aesthetics/DSC08325.JPG',
    focus: '55% 55%',
  },
  n15YoungPose: {
    base: 'n15-young-pose',
    aspect: 0.75,
    widths: W,
    alt: 'A young dancer in green and red silk holds a pose before the carved festival backdrop.',
    source: 'images/images/aesthetics/DSC08367.JPG',
    focus: '50% 45%',
    includesMinors: true,
  },
  n15YoungEnsemble: {
    base: 'n15-young-ensemble',
    aspect: 4128 / 4954,
    widths: W,
    alt: 'Young dancers in red and gold perform expressive gestures, eyes turned towards their hands.',
    source: 'images/images/aesthetics/DSC08366.JPG',
    focus: '50% 40%',
    includesMinors: true,
  },
  n15Spotlight: {
    base: 'n15-spotlight',
    aspect: 4 / 3,
    widths: W,
    alt: 'A lone dancer at the edge of a dark stage, caught in a beam of light cutting through haze.',
    source: 'images/images/aesthetics/DSC08280.JPG',
    focus: '70% 50%',
  },
  n15Wings: {
    base: 'n15-wings',
    aspect: 4 / 3,
    widths: W,
    alt: 'From the wings: a teacher in a sari watches a line of young dancers in orange and red costumes waiting to go on.',
    source: 'images/images/aesthetics/DSC08414.JPG',
    focus: '60% 55%',
    includesMinors: true,
  },
  n15BackstageHair: {
    base: 'n15-backstage-hair',
    aspect: 4 / 3,
    widths: W,
    alt: 'Two dancers seen from behind before the performance, their braided hair crowned with red and white flowers.',
    source: 'images/images/aesthetics/DSC07991.JPG',
    focus: '40% 40%',
  },
  n15Jasmine: {
    base: 'n15-jasmine',
    aspect: 4 / 3,
    widths: W,
    alt: 'Close-up of a smiling dancer in full make-up, temple jewellery and a garland of jasmine in her hair.',
    source: 'images/images/aesthetics/DSC08148.JPG',
    focus: '35% 45%',
  },
  n15Ornament: {
    base: 'n15-ornament',
    aspect: 4 / 3,
    widths: W,
    alt: 'A dancer in profile, her hair bun dressed with jewelled ornaments, jasmine and red flowers.',
    source: 'images/images/aesthetics/DSC08149.JPG',
    focus: '45% 40%',
  },
  n15Arrival: {
    base: 'n15-arrival',
    aspect: 4 / 3,
    widths: W,
    alt: 'A group of dancers in costume walks across the forecourt towards the auditorium, trees behind them.',
    source: 'images/images/aesthetics/DSC08153.JPG',
    focus: '45% 60%',
  },
  n15Greenroom: {
    base: 'n15-greenroom',
    aspect: 4 / 3,
    widths: W,
    alt: 'Laughter before the show: a dancer in costume shares a moment with a woman holding a mirror.',
    source: 'images/images/aesthetics/DSC08119.JPG',
    focus: '60% 40%',
  },

  /* ---- Other programmes ---- */
  communityGroup: {
    base: 'community-group',
    aspect: 2048 / 1151,
    widths: W,
    alt: 'A group photograph on stage: students in front, with teachers and guests standing behind.',
    source: 'images/images/events/FB_IMG_1787166454546.jpg (event not identified)',
    focus: '50% 50%',
    includesMinors: true,
  },
  communityAudience: {
    base: 'community-audience',
    aspect: 2048 / 1365,
    widths: W,
    alt: 'A full hall with a high timbered roof: families and children seated for a programme.',
    source: 'images/images/events/FB_IMG_1786871239248.jpg (event not identified)',
    focus: '50% 50%',
    includesMinors: true,
  },
  bharatiyamGroup: {
    base: 'bharatiyam-group',
    aspect: 720 / 291,
    widths: [480],
    alt: 'Students, teachers and guests in a group photograph before a banner with the national tricolour.',
    source: 'images/images/events/IMG-20260817-WA0115.jpg (720 px WhatsApp copy — ask for the original)',
    focus: '50% 50%',
    includesMinors: true,
  },
  sahanaPerformance: {
    base: 'sahana-performance',
    aspect: 3065 / 3430,
    widths: W,
    alt: 'Guru Vidushi Sahana Chethan dancing in a maroon and gold costume, one arm raised, on a dark stage.',
    source: 'Crop of images/images/performances/0Z6A9394.JPG (Bharatagama Pratishtana banner visible; camera date 10 July 2026)',
    focus: '50% 30%',
  },
} satisfies Record<string, PhotoAsset>;

/** URL of a registry image at a given width, for places that take a plain URL (program posters). */
export const photoUrl = (p: PhotoAsset, w = 800) => `/images/opt/${p.base}-${p.widths.includes(w) ? w : p.widths[p.widths.length - 1]}.webp`;

export const LINE_ART_ANKLETS = '/images/illustrations/anklets-lineart.png';
