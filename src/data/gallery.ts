/**
 * Memory gallery. Real photographs reference the registry in images.ts;
 * entries with `image: null` render as designed placeholders until supplied.
 */
import { photos, type PhotoAsset } from './images';

export const GALLERY_CATEGORIES = [
  'Performances',
  'Natyaaradhana',
  'Rehearsals & classes',
  'Rangapravesha',
  'Workshops',
  'Outreach',
  'Cultural events',
  'Awards & recognition',
  'Behind the scenes',
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryItem = {
  id: string;
  image: PhotoAsset | null;
  category: GalleryCategory;
  caption: string;
  date?: string;
  venue?: string;
  /** Layout hint for the editorial grid */
  shape: 'tall' | 'wide' | 'square';
};

export const gallery: GalleryItem[] = [
  { id: 'g-performance', image: photos.heroDancer, category: 'Performances', caption: 'A moment of balance — Bharatanatyam on the Sahachetana stage.', shape: 'tall' },
  { id: 'g-class-team', image: photos.classTeam, category: 'Cultural events', caption: 'The guru and her young dancers before a full auditorium.', shape: 'wide' },
  { id: 'g-gejje', image: photos.gejjeDetail, category: 'Performances', caption: 'Gejje and silk — detail from a performance.', shape: 'square' },
  { id: 'g-natya', image: null, category: 'Natyaaradhana', caption: 'Natyaaradhana National Dance Festival', shape: 'wide' },
  { id: 'g-rehearsal', image: null, category: 'Rehearsals & classes', caption: 'Weekly class and rehearsal', shape: 'square' },
  { id: 'g-ranga', image: null, category: 'Rangapravesha', caption: 'A student’s Rangapravesha', shape: 'tall' },
  { id: 'g-stage-wide', image: photos.stageWide, category: 'Performances', caption: 'Solo performance before the carved arch backdrop.', shape: 'wide' },
  { id: 'g-workshop', image: null, category: 'Workshops', caption: 'Workshop with visiting artists', shape: 'square' },
  { id: 'g-outreach', image: null, category: 'Outreach', caption: 'Patyadarshini with government-school children', shape: 'wide' },
  { id: 'g-award', image: null, category: 'Awards & recognition', caption: 'Award ceremony', shape: 'square' },
  { id: 'g-bts', image: null, category: 'Behind the scenes', caption: 'Green room before the curtain', shape: 'tall' },
  { id: 'g-cultural', image: null, category: 'Cultural events', caption: 'Dance, theatre and literature evening', shape: 'square' },
];
