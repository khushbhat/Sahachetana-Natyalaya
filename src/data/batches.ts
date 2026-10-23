/**
 * Class schedule and teaching venues.
 *
 * Days, times and levels are exactly as supplied by the academy — do not
 * change them without the academy's confirmation. Venue details marked
 * `status: 'unverified'` or `'partial'` were researched online but could not
 * be matched with certainty; they are shown with a "to be confirmed" note and
 * NO map link. Set `mapUrl` only to a pin the academy has confirmed.
 *
 * Add a class by appending to `schedule`; add a venue to `venues`. The
 * Classes page timetable, venue list, anklet markers and the contact form's
 * location menu are all generated from this file.
 */

export type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export const WEEK: { id: Day; label: string }[] = [
  { id: 'Mon', label: 'Monday' },
  { id: 'Tue', label: 'Tuesday' },
  { id: 'Wed', label: 'Wednesday' },
  { id: 'Thu', label: 'Thursday' },
  { id: 'Fri', label: 'Friday' },
  { id: 'Sat', label: 'Saturday' },
  { id: 'Sun', label: 'Sunday' },
];

export type VenueStatus = 'verified' | 'partial' | 'unverified';

export type Venue = {
  id: string;
  /** Name exactly as supplied by the academy */
  name: string;
  /** Short label for the anklet markers and timetable */
  short: string;
  /** Locality as supplied */
  locality: string;
  /** Address line to display. Only confirmed text belongs here. */
  address: string;
  status: VenueStatus;
  /** Public note shown under the address while unconfirmed */
  note?: string;
  /** Internal research trail (not displayed) */
  research: string;
  /** Google Maps link — only for a pin confirmed by the academy */
  mapUrl?: string;
};

export type ClassEntry = {
  id: string;
  venueId: string;
  days: Day[];
  /** 24-hour 'HH:MM' */
  start: string;
  end: string;
  level: string;
};

export const venues: Venue[] = [
  {
    id: 'vasavi',
    short: 'Vasavi',
    name: 'Vasavi Public School',
    locality: 'Kote Road, K.R. Puram, Shivamogga',
    address: 'Vasavi Public School, Kote Road, K.R. Puram, Shivamogga, Karnataka',
    status: 'partial',
    note: 'PIN code and map pin to be confirmed.',
    research:
      'CBSE SARAS (affiliation 830502) lists "Vasavi Vidyalaya", Kote Road, Shimoga 577201 — probably the same campus, but the name differs from the supplied "Vasavi Public School". Confirm name, PIN 577201 and the entrance used for class.',
  },
  {
    id: 'open-minds',
    short: 'Open Minds',
    name: 'Open Minds School',
    locality: 'Shivamogga',
    address: 'Open Minds School, Shivamogga',
    status: 'unverified',
    note: 'Exact address and map location to be confirmed.',
    research:
      'Closest public record: "Open Minds World School", NH 13, Holehonnur Road, Javalli, Shivamogga 577227 (CBSE SARAS affiliation 831090; openmindsworld.org). Not confirmed to be the class venue.',
  },
  {
    id: 'kalabharati',
    short: 'Kalabharati',
    name: 'Kalabharati, Bharatiya Vidya Bhavan',
    locality: 'Shivamogga',
    address: 'Kalabharati, Bharatiya Vidya Bhavan, Shivamogga',
    status: 'unverified',
    note: 'Precise venue and map location to be confirmed.',
    research:
      'Bharatiya Vidya Bhavan runs a school in Vidyanagara, Shimoga (CBSE SARAS 830362; PIN given as both 577203 and 577201). No public listing found for "Kalabharati" in Shivamogga.',
  },
  {
    id: 'madhavanele',
    short: 'Madhavanele',
    name: 'Madhavanele',
    locality: 'Kalhalli',
    address: 'Madhavanele, Kalhalli',
    status: 'unverified',
    note: 'Location, locality and map pin to be confirmed.',
    research: 'No public listing found for "Madhavanele" or "Kalhalli" in Shivamogga (searched October 2026).',
  },
  {
    id: 'gundappa-shed',
    short: 'Gundappa Shed',
    name: 'Gundappa Shed',
    locality: 'Shivamogga',
    address: 'Gundappa Shed, Shivamogga',
    status: 'unverified',
    note: 'Precise venue and entrance to be confirmed.',
    research: 'No public listing found (searched October 2026).',
  },
];

export const schedule: ClassEntry[] = [
  { id: 'vasavi-mon-tue', venueId: 'vasavi', days: ['Mon', 'Tue'], start: '18:00', end: '19:00', level: 'Senior / Vidwat' },
  { id: 'vasavi-wed-thu', venueId: 'vasavi', days: ['Wed', 'Thu'], start: '18:00', end: '19:00', level: 'Junior / Senior' },
  { id: 'open-minds-mon-tue', venueId: 'open-minds', days: ['Mon', 'Tue'], start: '14:00', end: '15:00', level: 'Junior / Senior' },
  { id: 'kalabharati-wed-thu', venueId: 'kalabharati', days: ['Wed', 'Thu'], start: '15:30', end: '16:30', level: 'Junior / Senior' },
  { id: 'madhavanele-fri-sat', venueId: 'madhavanele', days: ['Fri', 'Sat'], start: '18:00', end: '19:00', level: 'Junior / Senior' },
  { id: 'gundappa-sat-sun', venueId: 'gundappa-shed', days: ['Sat', 'Sun'], start: '17:00', end: '18:00', level: 'Junior / Senior' },
];

/* ---------------- helpers ---------------- */

export const venueById = (id: string) => venues.find((v) => v.id === id)!;
export const classesAtVenue = (venueId: string) => schedule.filter((c) => c.venueId === venueId);

/** '18:00' → '6:00 PM' */
export function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}
export const formatRange = (c: ClassEntry) => `${formatTime(c.start)}–${formatTime(c.end)}`;
export const formatDays = (c: ClassEntry) => c.days.map((d) => WEEK.find((w) => w.id === d)!.label).join(' & ');

/** Labels used by the contact form's "preferred location" menu */
export const LOCATION_OPTIONS = venues.map((v) => v.name);
