/**
 * Teaching batches. Replace the placeholder values with confirmed details.
 * Add a batch by appending an object — the Classes page and its anklet
 * thread are generated from this list.
 */
import type { PhotoAsset } from './images';

export type Batch = {
  id: string;
  name: string;
  location: string;
  address: string;
  landmark: string;
  days: string;
  timings: string;
  level: string;
  ageGroup?: string;
  teacher: string;
  image: PhotoAsset | null;
  description: string;
  isPlaceholder: boolean;
};

const TBC = 'To be confirmed';

export const batches: Batch[] = Array.from({ length: 7 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    id: `batch-${n}`,
    name: `Batch ${n}`,
    location: `Teaching location ${n}`,
    address: 'Address to be added',
    landmark: 'Landmark to be added',
    days: TBC,
    timings: TBC,
    level: TBC,
    ageGroup: TBC,
    teacher: TBC,
    image: null,
    description:
      'A short description of this batch — its focus, the stage of training it serves and what students can expect — will be added by the institution.',
    isPlaceholder: true,
  };
});
