/**
 * Seed data for Programs. At runtime the list is served by the program
 * repository (src/lib/programStore.ts), which the admin prototype edits.
 */
export type ProgramStatus = 'draft' | 'published';
export type ProgramListing = 'upcoming' | 'past';

import { photoUrl, photos } from './images';

export type Program = {
  id: string;
  title: string;
  /** ISO date-time string, or '' when not yet announced */
  dateTime: string;
  /** Optional last day (YYYY-MM-DD) for multi-day programs; the program moves to Past after it */
  endDate?: string;
  /** Shown instead of the formatted date, e.g. '3, 4 & 5 September 2026' */
  dateLabel?: string;
  venue: string;
  category: string;
  description: string;
  details?: string;
  /** URL or data URL; '' shows the designed placeholder */
  image: string;
  registrationUrl?: string;
  listing: ProgramListing;
  status: ProgramStatus;
  isPlaceholder?: boolean;
  /** Some details still await confirmation by the academy */
  verify?: boolean;
  archiveUrl?: string;
  updatedAt: string;
};

export const PROGRAM_CATEGORIES = ['Performance', 'Festival', 'Workshop', 'Rangapravesha', 'Outreach', 'Lecture-demonstration', 'Cultural programme'];

const now = '2026-10-23T00:00:00.000Z';

/**
 * Real records only. Upcoming programs are added through the admin prototype
 * (or here) once the academy announces them — the page shows an honest empty
 * state until then. A dated program moves to Past automatically once it ends.
 */
export const seedPrograms: Program[] = [
  {
    id: 'natyaaradhana-15',
    title: 'Natyaaradhana 15 — National Dance Festival',
    dateTime: '2026-09-03',
    endDate: '2026-09-05',
    dateLabel: '3, 4 & 5 September 2026',
    venue: 'Kuvempu Rangamandira, Shivamogga',
    category: 'Festival',
    description:
      'The fifteenth edition of the academy’s national dance festival: a day presented by the senior batch, a day presided over by Guru Sahana Chethan, and a day of visiting artists — with a Kathak presentation by Priyanka and Prathibimba, a tribute to Da. Ra. Bendre.',
    details: 'Supported by the Department of Kannada and Culture, Shivamogga.',
    image: photoUrl(photos.n15Backdrop),
    listing: 'past',
    status: 'published',
    verify: true,
    archiveUrl: '/annual-events#natyaaradhana',
    updatedAt: now,
  },
  {
    id: 'shivamogga-vaibhava',
    title: 'Shivamogga Vaibhava',
    dateTime: '',
    dateLabel: 'Dasara · year to be confirmed',
    venue: 'Freedom Park',
    category: 'Cultural programme',
    description: 'A Dasara presentation of the history of Shivamogga, staged across various Dasara platforms at 6:00 PM each day.',
    image: '',
    listing: 'past',
    status: 'published',
    verify: true,
    archiveUrl: '/annual-events#shivamogga-vaibhava',
    updatedAt: now,
  },
];
