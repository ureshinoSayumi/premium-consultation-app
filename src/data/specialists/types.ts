export type Specialist = {
  id: string;
  nameEn: string;
  nameZh: string;
  titleEn: string;
  titleZh: string;
  photoUrl: string;
};

export type SpecialistPage = {
  items: Specialist[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
};

/**
 * Swap HardcodedSpecialistRepository for a CMS-backed implementation in Q2
 * without changing UI / query hooks.
 */
export interface SpecialistRepository {
  getAll(): Promise<Specialist[]>;
  getPage(page: number, pageSize: number): Promise<SpecialistPage>;
}
