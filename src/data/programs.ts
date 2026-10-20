/**
 * Seed data for Programs. At runtime the list is served by the program
 * repository (src/lib/programStore.ts), which the admin prototype edits.
 */
export type ProgramStatus = 'draft' | 'published';
export type ProgramListing = 'upcoming' | 'past';

export type Program = {
  id: string;
  title: string;
  /** ISO date-time string, or '' when not yet announced */
  dateTime: string;
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
  updatedAt: string;
};

export const PROGRAM_CATEGORIES = ['Performance', 'Festival', 'Workshop', 'Rangapravesha', 'Outreach', 'Lecture-demonstration', 'Cultural programme'];

const now = '2026-01-01T00:00:00.000Z';

export const seedPrograms: Program[] = [
  {
    id: 'seed-upcoming-1',
    title: 'Upcoming Program 01',
    dateTime: '',
    venue: 'Venue to be announced',
    category: 'Performance',
    description: 'Placeholder entry — the title, date, venue and description of this program will be announced by the institution.',
    details: 'Additional details such as performers, repertoire and entry information can be listed here.',
    image: '',
    registrationUrl: '',
    listing: 'upcoming',
    status: 'published',
    isPlaceholder: true,
    updatedAt: now,
  },
  {
    id: 'seed-upcoming-2',
    title: 'Upcoming Program 02',
    dateTime: '',
    venue: 'Venue to be announced',
    category: 'Workshop',
    description: 'Placeholder entry — a workshop or lecture-demonstration to be announced.',
    details: '',
    image: '',
    registrationUrl: '',
    listing: 'upcoming',
    status: 'published',
    isPlaceholder: true,
    updatedAt: now,
  },
  {
    id: 'seed-past-1',
    title: 'Past Program 01',
    dateTime: '',
    venue: 'Venue to be added',
    category: 'Festival',
    description: 'Placeholder entry — a record of a past program, with photographs, will be added here.',
    details: '',
    image: '',
    listing: 'past',
    status: 'published',
    isPlaceholder: true,
    updatedAt: now,
  },
  {
    id: 'seed-past-2',
    title: 'Past Program 02',
    dateTime: '',
    venue: 'Venue to be added',
    category: 'Performance',
    description: 'Placeholder entry — a record of a past performance will be added here.',
    details: '',
    image: '',
    listing: 'past',
    status: 'published',
    isPlaceholder: true,
    updatedAt: now,
  },
];
