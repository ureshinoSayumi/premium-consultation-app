import type { Specialist } from './types';

/**
 * Hardcoded ES specialists (order adjustable for CMS-style sorting).
 * Names align with Figma placeholders; photos are placeholders until CMS assets land.
 */
const SEED: Array<Omit<Specialist, 'id' | 'photoUrl'>> = [
  {
    nameEn: 'Kan Chung',
    nameZh: 'Kan Chung',
    titleEn: 'ES Specialist',
    titleZh: 'ES 專員',
  },
  {
    nameEn: 'Alisa Mak',
    nameZh: 'Alisa Mak',
    titleEn: 'ES Specialist',
    titleZh: 'ES 專員',
  },
  {
    nameEn: 'Justin Liu',
    nameZh: 'Justin Liu',
    titleEn: 'ES Specialist',
    titleZh: 'ES 專員',
  },
  {
    nameEn: 'Amy Chan',
    nameZh: '陳雅雯',
    titleEn: 'ES Specialist',
    titleZh: 'ES 專員',
  },
  {
    nameEn: 'Brian Wong',
    nameZh: '黃柏然',
    titleEn: 'ES Specialist',
    titleZh: 'ES 專員',
  },
  {
    nameEn: 'Chloe Lam',
    nameZh: '林卓琳',
    titleEn: 'Senior ES Specialist',
    titleZh: '高級 ES 專員',
  },
  {
    nameEn: 'David Ho',
    nameZh: '何子達',
    titleEn: 'ES Specialist',
    titleZh: 'ES 專員',
  },
  {
    nameEn: 'Emily Ng',
    nameZh: '吳詠心',
    titleEn: 'ES Specialist',
    titleZh: 'ES 專員',
  },
];

/** Plain list: curated set matching Figma-first order. */
export const PLAIN_SPECIALISTS: Specialist[] = SEED.slice(0, 3).map((item, index) => ({
  ...item,
  id: `plain-${index + 1}`,
  // Empty → UI shows gray square placeholder (Figma).
  photoUrl: '',
}));

/**
 * Infinite-scroll dataset: 100+ specialists generated from the seed.
 */
export const INFINITE_SPECIALISTS: Specialist[] = Array.from(
  { length: 108 },
  (_, index) => {
    const seed = SEED[index % SEED.length]!;
    const batch = Math.floor(index / SEED.length) + 1;
    return {
      id: `inf-${index + 1}`,
      nameEn: batch === 1 ? seed.nameEn : `${seed.nameEn} ${batch}`,
      nameZh: batch === 1 ? seed.nameZh : `${seed.nameZh} ${batch}`,
      titleEn: seed.titleEn,
      titleZh: seed.titleZh,
      photoUrl: '',
    };
  },
);
