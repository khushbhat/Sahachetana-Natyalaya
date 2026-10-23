/**
 * Memory gallery — real photographs only, each from the registry in images.ts.
 * Categories with no photographs are hidden automatically. Dates and venues
 * are given only where the photograph itself establishes them (backdrop text
 * plus camera date); otherwise they are left out.
 */
import { photos, type PhotoAsset } from './images';

export const GALLERY_CATEGORIES = ['Natyaaradhana 15', 'On stage', 'Before the curtain', 'Community programmes'] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryItem = {
  id: string;
  image: PhotoAsset | null;
  category: GalleryCategory;
  caption: string;
  date?: string;
  venue?: string;
  verify?: boolean;
  /** Layout hint for the editorial grid */
  shape: 'tall' | 'wide' | 'square' | 'panorama';
};

const N15 = { date: 'September 2026', venue: 'Kuvempu Rangamandira, Shivamogga' };

export const gallery: GalleryItem[] = [
  { id: 'g-n15-finale', image: photos.n15Finale, category: 'Natyaaradhana 15', caption: 'The company in a closing tableau beneath the festival backdrop.', ...N15, shape: 'panorama' },
  { id: 'g-n15-arms', image: photos.n15ArmsRaised, category: 'Natyaaradhana 15', caption: 'Arms lifted into an arch.', ...N15, shape: 'tall' },
  { id: 'g-n15-feet', image: photos.n15AdavuFeet, category: 'Natyaaradhana 15', caption: 'Feet, ankle bells and the stage floor, in unison.', ...N15, shape: 'wide' },
  { id: 'g-hair', image: photos.n15BackstageHair, category: 'Before the curtain', caption: 'Flowers pinned, braids set — minutes before the curtain.', ...N15, shape: 'square' },
  { id: 'g-performance', image: photos.heroDancer, category: 'On stage', caption: 'A moment of balance, one foot raised.', ...N15, shape: 'tall' },
  { id: 'g-n15-backdrop', image: photos.n15Backdrop, category: 'Natyaaradhana 15', caption: 'Nataraja, lamps and the festival backdrop.', ...N15, shape: 'tall' },
  { id: 'g-n15-line', image: photos.n15EnsembleLine, category: 'Natyaaradhana 15', caption: 'A line of dancers receding across the stage.', ...N15, shape: 'wide' },
  { id: 'g-jasmine', image: photos.n15Jasmine, category: 'Before the curtain', caption: 'Jasmine, temple jewellery and a ready smile.', ...N15, shape: 'wide' },
  { id: 'g-n15-trio', image: photos.n15Trio, category: 'Natyaaradhana 15', caption: 'Three dancers, one line.', ...N15, shape: 'tall' },
  { id: 'g-spotlight', image: photos.n15Spotlight, category: 'On stage', caption: 'A single beam through the haze.', ...N15, shape: 'wide' },
  { id: 'g-n15-pleats', image: photos.n15Pleats, category: 'Natyaaradhana 15', caption: 'Pleats opening like fans in a deep half-seat.', ...N15, shape: 'tall' },
  { id: 'g-arrival', image: photos.n15Arrival, category: 'Before the curtain', caption: 'Dancers in costume crossing the forecourt to the auditorium.', ...N15, shape: 'wide' },
  { id: 'g-n15-soloist', image: photos.n15Soloist, category: 'Natyaaradhana 15', caption: 'Before the Kannada lettering of the festival backdrop.', ...N15, shape: 'wide' },
  { id: 'g-n15-pair', image: photos.n15Pair, category: 'Natyaaradhana 15', caption: 'Balanced on one leg, arms curved overhead.', ...N15, shape: 'tall' },
  { id: 'g-ornament', image: photos.n15Ornament, category: 'Before the curtain', caption: 'Jewelled hair ornaments, jasmine and red flowers.', ...N15, shape: 'wide' },
  { id: 'g-n15-young', image: photos.n15YoungPose, category: 'Natyaaradhana 15', caption: 'A young dancer holds her pose.', ...N15, shape: 'tall' },
  { id: 'g-wings', image: photos.n15Wings, category: 'Before the curtain', caption: 'Waiting in the wings.', ...N15, shape: 'wide' },
  { id: 'g-n15-smile', image: photos.n15Smile, category: 'Natyaaradhana 15', caption: 'Mid-movement, mid-smile.', ...N15, shape: 'tall' },
  { id: 'g-greenroom', image: photos.n15Greenroom, category: 'Before the curtain', caption: 'A last look in the mirror, and laughter.', ...N15, shape: 'wide' },
  { id: 'g-n15-floor', image: photos.n15Floor, category: 'Natyaaradhana 15', caption: 'The full ensemble in a curved floor formation.', ...N15, shape: 'wide' },
  { id: 'g-class-team', image: photos.classTeam, category: 'On stage', caption: 'From the back of the stage: young dancers at the edge, a full auditorium beyond.', ...N15, shape: 'wide' },
  { id: 'g-n15-young-ensemble', image: photos.n15YoungEnsemble, category: 'Natyaaradhana 15', caption: 'Young dancers, eyes following their hands.', ...N15, shape: 'tall' },
  { id: 'g-stage-lights', image: photos.n15StageLights, category: 'Natyaaradhana 15', caption: 'The stage, set and waiting.', ...N15, shape: 'tall' },
  { id: 'g-sahana', image: photos.sahanaPerformance, category: 'On stage', caption: 'Guru Vidushi Sahana Chethan in performance.', date: 'July 2026', shape: 'tall', verify: true },
  { id: 'g-bharatiyam', image: photos.bharatiyamGroup, category: 'Community programmes', caption: 'Group photograph at a Bharatiyam programme.', shape: 'panorama', verify: true },
  { id: 'g-community-group', image: photos.communityGroup, category: 'Community programmes', caption: 'Students, teachers and guests after a programme.', shape: 'wide' },
  { id: 'g-community-audience', image: photos.communityAudience, category: 'Community programmes', caption: 'A full hall of families.', shape: 'wide' },
];

/** Categories that actually have photographs, in display order */
export const activeCategories = () => GALLERY_CATEGORIES.filter((c) => gallery.some((g) => g.category === c));
