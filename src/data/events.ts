/**
 * Annual events and initiatives.
 *
 * Three kinds of fact live here (see CONTENT.md):
 *   1. supplied by the academy                 — no flag
 *   2. verified from a public source           — `source` URL given
 *   3. still to be confirmed                   — `verify: true` (shows a badge)
 *
 * WORDING RULE: the only free initiative is Bharatanatyam training for
 * underprivileged children. Do not describe Rangapravesha, or programmes in
 * general, as free.
 */
import { photos, type PhotoAsset } from './images';

export type Fact = { text: string; verify?: boolean; source?: string };

export type FestivalEdition = {
  edition: number;
  year: string;
  /** ISO dates used to decide past / upcoming */
  start?: string;
  end?: string;
  datesLabel?: string;
  datesVerify?: boolean;
  venue?: string;
  supportedBy?: string;
  summary?: string;
  days?: { label: string; text: string }[];
  highlights?: { title: string; text: string; verify?: boolean; source?: string }[];
  /** Key image first */
  photos?: { image: PhotoAsset; caption: string }[];
};

export const natyaaradhana = {
  name: 'Natyaaradhana',
  kannada: 'ನಾಟ್ಯಾರಾಧನಾ',
  /** Display form with a soft hyphen for large headings */
  displayName: 'Natya­aradhana',
  subtitle: 'National Dance Festival',
  kannadaSubtitle: 'ರಾಷ್ಟ್ರೀಯ ನೃತ್ಯ ಮಹೋತ್ಸವ',
  summary:
    'Founded by Guru Vidushi Sahana Chethan, Natyaaradhana is the academy’s national dance festival — three days on which senior students, their guru and visiting artists share one stage in Shivamogga.',
  history: [
    { text: 'Founded by Guru Vidushi Sahana Chethan as the academy’s flagship festival.' },
    { text: 'The professional profile records 15 national editions.' },
    { text: 'The Kannada profile records the festival’s editions from 2010.', verify: true },
  ] as Fact[],
  editionCount: 15,
  /** Add editions here as their records are supplied — the archive grows automatically */
  editions: [
    {
      edition: 15,
      year: '2026',
      start: '2026-09-03',
      end: '2026-09-05',
      datesLabel: '3, 4 & 5 September 2026',
      datesVerify: true,
      venue: 'Kuvempu Rangamandira, Shivamogga',
      supportedBy: 'Department of Kannada and Culture, Shivamogga',
      summary: 'A three-day national dance festival.',
      days: [
        { label: 'Day 1', text: 'Presented by the senior-batch students.' },
        { label: 'Day 2', text: 'Presided over by Guru Sahana Chethan, with the senior-batch students.' },
        { label: 'Day 3', text: 'Presented by visiting artists from outside India.' },
      ],
      highlights: [
        {
          title: 'Prathibimba',
          text: 'A multi-medium tribute to the Jnanpith laureate Da. Ra. Bendre — and Ambikatanayadatta, the inner poetic voice in whose name he wrote — by the Bharatanatyam artistes Vidu. Prathibha Ramaswamy and Vidu. Janani Murali, weaving dance, spoken word and animation.',
          source: 'https://www.prathibharamaswamy.com/works',
        },
        { title: 'Kathak', text: 'A Kathak presentation by Priyanka.' },
      ],
      photos: [
        { image: photos.n15Backdrop, caption: 'The festival stage, its backdrop lettered in Kannada.' },
        { image: photos.n15Finale, caption: 'The company in a closing tableau.' },
        { image: photos.n15ArmsRaised, caption: 'Arms lifted into an arch.' },
        { image: photos.n15AdavuFeet, caption: 'Feet, bells and the stage floor.' },
        { image: photos.n15Trio, caption: 'Three dancers, one line.' },
        { image: photos.n15BackstageHair, caption: 'Before the curtain.' },
        { image: photos.n15Spotlight, caption: 'A single beam through the haze.' },
        { image: photos.n15Wings, caption: 'Waiting in the wings.' },
      ],
    },
  ] as FestivalEdition[],
};

export const latestEdition = natyaaradhana.editions.reduce((a, b) => (b.edition > a.edition ? b : a));

/** True once the last festival day has ended (local time). */
export const isPastEdition = (e: FestivalEdition, now = new Date()) => (e.end ? new Date(`${e.end}T23:59:59`) < now : false);

/* ---------------- Shivamogga Vaibhava ---------------- */

export const shivamoggaVaibhava = {
  name: 'Shivamogga Vaibhava',
  context: 'Dasara cultural programme',
  summary: 'A presentation of the history of Shivamogga, staged across various Dasara platforms.',
  supplied: [
    { text: 'Presented at 6:00 PM each day at Freedom Park during Dasara, as supplied by the academy.' },
    { text: 'Year, dates and the exact Freedom Park venue to be confirmed.', verify: true },
  ] as Fact[],
  /** Set when an edition's dates are confirmed, e.g. { year: '2026', start: '2026-10-..', end: '...' } */
  editions: [] as { year: string; start: string; end: string; venue: string }[],
};

/* ---------------- Initiatives ---------------- */

export type Initiative = {
  id: string;
  name: string;
  kannada?: string;
  kind: string;
  summary: string;
  facts: Fact[];
  image: PhotoAsset | null;
  imageCaption?: string;
  imageLabel: string;
  descriptionPending: boolean;
};

export const initiatives: Initiative[] = [
  {
    id: 'free-training',
    name: 'Free Bharatanatyam training for underprivileged children',
    kind: 'Access',
    summary:
      'Classical Bharatanatyam taught free of cost to children from underprivileged families, so that a child’s talent — not the family’s means — decides whether she dances.',
    facts: [{ text: 'Sustained for over two decades, according to the Kannada profile.', verify: true }],
    image: photos.n15YoungEnsemble,
    imageCaption: 'Young dancers on the Natyaaradhana stage.',
    imageLabel: 'Free training',
    descriptionPending: false,
  },
  {
    id: 'bharatiyam',
    name: 'Bharatiyam',
    kannada: 'ಭಾರತೀಯಂ',
    kind: 'Outreach',
    summary: 'An outreach initiative of Sahachetana Natyalaya bringing classical arts education to children.',
    facts: [
      { text: 'The 13th edition banner appears in a group photograph supplied by the academy.', verify: true },
      { text: 'Programme description and dates to be supplied by the academy.' },
    ],
    image: photos.bharatiyamGroup,
    imageCaption: 'Group photograph at a Bharatiyam programme (edition to be confirmed).',
    imageLabel: 'Bharatiyam',
    descriptionPending: true,
  },
  {
    id: 'patyadarshini',
    name: 'Patyadarshini',
    kind: 'Government-school outreach',
    summary: 'Poems and prose from government-school textbooks reimagined as dance — learned and performed by the children themselves.',
    facts: [
      { text: 'Presented on the stage of Kuvempu Rangamandira, Shivamogga.', verify: true },
      { text: 'Held for fifteen years, according to the Kannada profile.', verify: true },
    ],
    image: null,
    imageLabel: 'Patyadarshini',
    descriptionPending: false,
  },
  {
    id: 'ajita-shri',
    name: 'Ajita Shri Puraskara',
    kind: 'Recognition',
    summary: 'An award (puraskara) initiative of Sahachetana Natyalaya.',
    facts: [{ text: 'Purpose, recipients and history to be supplied by the academy.' }],
    image: null,
    imageLabel: 'Ajita Shri Puraskara',
    descriptionPending: true,
  },
  {
    id: 'cultural-programmes',
    name: 'Dance, theatre & literature',
    kind: 'Cultural programmes',
    summary:
      'Programmes that bring dance, theatre and literature together — including the release, each Ugadi, of the poetry anthology “Kavi Kanda Yugadi”.',
    facts: [{ text: 'Kavi Kanda Yugadi details from the Kannada profile.', verify: true }],
    image: null,
    imageLabel: 'Cultural programme',
    descriptionPending: false,
  },
];
