/**
 * Founder profiles.
 *
 * Sources:
 *  - EN: the supplied English professional profile (qualifications, honours, stages).
 *  - KN: the supplied Kannada profile, translated into English for the
 *        biography narrative. Items marked `verify: true` should be checked
 *        against the original documents before publication.
 */
import { photos, type PhotoAsset } from './images';

export type SourcedItem = { text: string; verify?: boolean; note?: string };
export type TimelineEntry = { year: string; title: string; text?: string; verify?: boolean; source: 'EN' | 'KN' };
export type ProfileSection = { id: string; title: string; items: SourcedItem[] };

export type Founder = {
  id: string;
  name: string;
  honorific?: string;
  designation: string;
  organisation: string;
  portrait: PhotoAsset | null;
  /** A second photograph — on stage, in class — shown within the profile */
  secondary?: { image: PhotoAsset; caption: string; verify?: boolean };
  intro: string;
  quote?: { text: string; source: string };
  /** Long-form biography, paragraph by paragraph */
  biography: { heading: string; paragraphs: string[] }[];
  sections: ProfileSection[];
  stages: string[];
  honours: { year: string; title: string }[];
  timeline: TimelineEntry[];
  isPlaceholder?: boolean;
};

export const sahana: Founder = {
  id: 'sahana-chethan',
  name: 'Sahana Chethan',
  honorific: 'Guru Vidushi',
  designation: 'Founder & Artistic Director',
  organisation: 'Sahachetana Natyalaya (R.)',
  portrait: photos.sahanaPortrait,
  secondary: {
    image: photos.sahanaPerformance,
    caption: 'On stage at a programme of Bharatagama Pratishtana, Bengaluru, July 2026.',
    verify: true,
  },
  intro:
    'A Bharatanatyam exponent, choreographer, cultural curator and teacher, Vidushi Sahana Chethan has spent more than two decades building a stage on which young dancers — whatever their circumstances — can learn, perform and belong.',
  quote: {
    text: 'Let no artistic dream be crushed for want of money.',
    source: 'Her guiding resolve, as recorded in the Kannada profile',
  },
  biography: [
    {
      heading: 'A dream born in Shivamogga',
      paragraphs: [
        'Born into a modest family in Shivamogga, Sahana grew up drawn to every form of expression — dance, theatre and the visual arts. Watching dance on television filled her with images of unfamiliar worlds. In the fourth standard, a friend’s remark about a dance programme at Kuvempu Rangamandira awakened a lasting dream: to dance on that stage herself.',
        'She took her first steps in Bharatanatyam before Vidwan Keshavakumar, and her dancing soon carried her as far as the national stage in Delhi.',
      ],
    },
    {
      heading: 'Resolve in the face of hardship',
      paragraphs: [
        'Life was not easy. Financial hardship made even a monthly fee of ₹25–₹50 a burden, and an early humiliation over unpaid fees left a wound that hardened into resolve. A move from Kannada-medium to English-medium schooling unsettled her studies, and for a time dance was nearly given up.',
        'Returning to training under Guru Geeta Dathar, she found her stage again — and with it the conviction that no child’s artistic dream should end for want of money.',
      ],
    },
    {
      heading: 'From disciple to guru',
      paragraphs: [
        'When her guru passed away in 2003, Sahana lovingly took on the responsibility of the students left behind. A teacher was born.',
        'On 17 September 2005 — Ananta Chaturdashi — she opened Sahachetana, her “dance school of dreams”, first at Ravishankar Vidyamandira and later at Vasavi school. She has taught for more than two decades and, for twenty-one years, has trained children from underprivileged backgrounds.',
      ],
    },
    {
      heading: 'Dance as a public good',
      paragraphs: [
        'Her Patyadarshini project turns the poems and prose of school textbooks into dance for government-school children, presented on the stage of Kuvempu Rangamandira for fifteen years. Each Ugadi she releases the poetry anthology “Kavi Kanda Yugadi”. She founded the Natyaaradhana National Dance Festival, which the professional profile records across fifteen national editions.',
        'Behind every stage stands her husband, Chetan S. — described in the Kannada profile as the true “Chetana” of Sahachetana.',
      ],
    },
  ],
  sections: [
    {
      id: 'qualifications',
      title: 'Qualifications & training',
      items: [
        { text: 'MPA (Master of Performing Arts) in Bharatanatyam' },
        { text: 'Vidwat qualification in Bharatanatyam' },
        { text: 'Training in the Madhuri Margam under Dr. Tulasi Ramachandra' },
        { text: 'Early training under Vidwan Keshavakumar and Guru Geeta Dathar', verify: true, note: 'KN profile' },
        { text: 'Doordarshan B-High Grade Artiste' },
      ],
    },
    {
      id: 'artistic',
      title: 'Performance & choreography',
      items: [
        { text: 'Bharatanatyam soloist and teacher with more than two decades of artistic work' },
        { text: 'Participated in the Republic Day Parade, New Delhi, as an NSS candidate' },
        { text: 'Theatre choreography, including Rangayana’s “Karunege Jai”', verify: true, note: 'Confirm production title and year' },
        { text: 'Choreographer of group productions presented by the institution' },
      ],
    },
    {
      id: 'curation',
      title: 'Cultural curation',
      items: [
        { text: 'Founder of the Natyaaradhana National Dance Festival — 15 national editions, according to the professional profile' },
        { text: 'Curator of cultural programmes that connect dance, theatre and literature' },
        { text: 'Ajita Shri Puraskara initiatives', verify: true, note: 'Details to be supplied' },
      ],
    },
    {
      id: 'social',
      title: 'Social contribution',
      items: [
        { text: 'Free Bharatanatyam training for underprivileged children, over twenty-one years', verify: true, note: 'KN profile' },
        { text: 'Patyadarshini — textbook poems and prose presented as dance by government-school children' },
        { text: 'Dance and music education for government-school children' },
      ],
    },
    {
      id: 'writing',
      title: 'Authorship & publications',
      items: [
        { text: '“Kavi Kanda Yugadi” — a poetry anthology released each Ugadi', verify: true, note: 'Confirm editor/author credit' },
        { text: 'Around 150 newspaper columns on dance (2018)', verify: true, note: 'Confirm count, year, publication — and author: other source notes associate newspaper articles with Chetan S.' },
      ],
    },
  ],
  stages: [
    'Mysore Dasara',
    'Hampi Utsava',
    'Kittur Utsava',
    'Vishwa Kannada Sammelana',
    'Sahyadri Utsava',
    'Delhi Karnataka Sangha',
    'Sripuram Golden Temple, Vellore',
    'Doordarshan Chandana',
  ],
  honours: [
    { year: '2026', title: 'Mahila Ratna Award' },
    { year: '2023', title: 'Kannada Siri Award' },
    { year: '2018', title: 'Rotary Vocational Excellence Award' },
    { year: '2013', title: 'Chaya Chetana Award' },
  ],
  timeline: [
    { year: 'Childhood', title: 'A dream of Kuvempu Rangamandira', text: 'First training under Vidwan Keshavakumar in Shivamogga.', source: 'KN' },
    { year: '2003', title: 'Guru to the students of her guru', text: 'After the passing of Guru Geeta Dathar, she takes responsibility for the students left behind.', source: 'KN', verify: true },
    { year: '2005', title: 'Sahachetana is founded', text: '17 September 2005, Ananta Chaturdashi — first classes at Ravishankar Vidyamandira, later at Vasavi school.', source: 'KN', verify: true },
    { year: '2010', title: 'Natyaaradhana begins', text: 'The Kannada profile records the festival’s editions from 2010.', source: 'KN', verify: true },
    { year: '2013', title: 'Chaya Chetana Award', source: 'EN' },
    { year: '2018', title: 'Rotary Vocational Excellence Award', text: 'The same year as her series of newspaper writings on dance.', source: 'EN' },
    { year: '2023', title: 'Kannada Siri Award', source: 'EN' },
    { year: '2026', title: 'Mahila Ratna Award', source: 'EN' },
  ],
};

export const chetan: Founder = {
  id: 'chetan-s',
  name: 'Chetan S.',
  designation: 'Artistic Director',
  organisation: 'Sahachetana Natyalaya (R.)',
  portrait: null,
  intro:
    'Artistic Director of Sahachetana Natyalaya (R.). The Kannada profile describes him as the unseen pillar behind every Sahachetana stage — the “Chetana” of Sahachetana.',
  biography: [
    {
      heading: 'Profile in preparation',
      paragraphs: [
        'A full biography of Chetan S. will be published once the academy has supplied and confirmed it. Until then, this page lists only the areas of work named in the source notes, each marked for confirmation.',
      ],
    },
  ],
  sections: [
    {
      id: 'areas',
      title: 'Areas of work named in the source notes',
      items: [
        { text: 'Cultural administration and the organisation of the academy’s programmes', verify: true },
        { text: 'Natyaaradhana National Dance Festival', verify: true },
        { text: 'Bharatiyam and Patyadarshini initiatives', verify: true },
        { text: 'Dance education and community engagement', verify: true },
        { text: 'Choreography and theatre work', verify: true },
        { text: 'Newspaper articles on the arts', verify: true, note: 'Confirm attribution — see Sahana Chethan’s publications' },
      ],
    },
  ],
  stages: [],
  honours: [],
  timeline: [],
  isPlaceholder: true,
};

export const founders = [sahana, chetan];
