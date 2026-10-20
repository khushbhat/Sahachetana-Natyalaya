/**
 * Annual events and initiatives. Only details supported by the supplied
 * profiles are stated; everything else is marked for the institution to fill in.
 */
import type { PhotoAsset } from './images';

export type Initiative = {
  id: string;
  name: string;
  kannada?: string;
  kind: string;
  summary: string;
  facts: { text: string; verify?: boolean }[];
  image: PhotoAsset | null;
  imageLabel: string;
  descriptionPending: boolean;
};

export const natyaaradhana = {
  name: 'Natyaaradhana',
  /** Display form with a soft hyphen for large headings */
  displayName: 'Natya­aradhana',
  subtitle: 'National Dance Festival',
  editionsLabel: '15 national editions',
  editionsSource: 'According to the professional profile',
  summary:
    'Founded by Vidushi Sahana Chethan, Natyaaradhana brings classical dancers and audiences together on a national platform — encouraging emerging artists and keeping the classical stage open to all.',
  /** Replace with the official festival description when supplied */
  officialDescription: '',
  history: [
    { text: 'Founded by Vidushi Sahana Chethan as the institution’s flagship festival.' },
    { text: 'The Kannada profile records the festival’s editions from 2010.', verify: true },
    { text: 'The professional profile records 15 national editions.' },
  ],
  /** Edition timeline — add confirmed editions as { edition, year, note } */
  editions: [] as { edition: number; year: string; note?: string }[],
  editionCount: 15,
  artists: [] as string[],
};

export const initiatives: Initiative[] = [
  {
    id: 'bharatheeyam',
    name: 'Bharatheeyam',
    kind: 'Outreach',
    summary: 'An outreach initiative of Sahachetana Natyalaya bringing classical arts education to children.',
    facts: [{ text: 'Programme description, dates and photographs to be supplied by the institution.' }],
    image: null,
    imageLabel: 'Bharatheeyam',
    descriptionPending: true,
  },
  {
    id: 'patyadarshini',
    name: 'Patyadarshini',
    kind: 'Government-school outreach',
    summary:
      'Poems and prose from government-school textbooks reimagined as dance — learned and performed by the children themselves.',
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
    facts: [{ text: 'Purpose, recipients and history to be supplied by the institution.' }],
    image: null,
    imageLabel: 'Ajita Shri Puraskara',
    descriptionPending: true,
  },
  {
    id: 'rangapravesha',
    name: 'Free Rangapravesha Initiatives',
    kind: 'Young artists',
    summary:
      'Rangapravesha — a dancer’s formal debut — offered free of cost, so that a student’s first full solo recital does not depend on their family’s means.',
    facts: [{ text: 'Participants, dates and venues to be added.' }],
    image: null,
    imageLabel: 'Rangapravesha',
    descriptionPending: false,
  },
  {
    id: 'kavi-kanda-yugadi',
    name: 'Other Annual Cultural Programmes',
    kind: 'Dance · theatre · literature',
    summary:
      'Free cultural programmes that bring dance, theatre and literature together — including the release, each Ugadi, of the poetry anthology “Kavi Kanda Yugadi”.',
    facts: [{ text: 'Kavi Kanda Yugadi details from the Kannada profile.', verify: true }],
    image: null,
    imageLabel: 'Cultural programme',
    descriptionPending: false,
  },
];
