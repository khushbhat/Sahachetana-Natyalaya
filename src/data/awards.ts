/**
 * Recognition archive. Add an award by appending an entry.
 * `organisation` and `description` stay empty until confirmed — the page
 * shows them as "to be confirmed" rather than guessing.
 */
import type { PhotoAsset } from './images';

export type RecipientType = 'founder' | 'institution' | 'teacher' | 'student';

export type Award = {
  id: string;
  title: string;
  year: string;
  organisation: string;
  recipient: string;
  recipientType: RecipientType;
  description: string;
  certificate: PhotoAsset | null;
  /** Internal note on where the fact comes from (not displayed) */
  source: string;
};

export const awards: Award[] = [
  {
    id: 'mahila-ratna-2026',
    title: 'Mahila Ratna Award',
    year: '2026',
    organisation: '',
    recipient: 'Guru Vidushi Sahana Chethan',
    recipientType: 'founder',
    description: '',
    certificate: null,
    source: 'English professional profile',
  },
  {
    id: 'kannada-siri-2023',
    title: 'Kannada Siri Award',
    year: '2023',
    organisation: '',
    recipient: 'Guru Vidushi Sahana Chethan',
    recipientType: 'founder',
    description: '',
    certificate: null,
    source: 'English professional profile',
  },
  {
    id: 'rotary-2018',
    title: 'Rotary Vocational Excellence Award',
    year: '2018',
    organisation: '',
    recipient: 'Guru Vidushi Sahana Chethan',
    recipientType: 'founder',
    description: '',
    certificate: null,
    source: 'English professional profile',
  },
  {
    id: 'chaya-chetana-2013',
    title: 'Chaya Chetana Award',
    year: '2013',
    organisation: '',
    recipient: 'Guru Vidushi Sahana Chethan',
    recipientType: 'founder',
    description: '',
    certificate: null,
    source: 'English professional profile',
  },
];

export const RECIPIENT_GROUPS: { type: RecipientType; label: string; empty: string }[] = [
  { type: 'founder', label: 'Founder & Artistic Director', empty: '' },
  { type: 'institution', label: 'The institution', empty: 'Recognitions received by Sahachetana Natyalaya (R.) will be listed here.' },
  { type: 'teacher', label: 'Teachers', empty: 'Honours received by the institution’s teachers will be listed here.' },
  { type: 'student', label: 'Students', empty: 'Achievements of Sahachetana students will be listed here.' },
];
