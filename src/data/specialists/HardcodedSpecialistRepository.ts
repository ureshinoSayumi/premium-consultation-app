import { simulateNetwork } from './fetchSimulation';
import { INFINITE_SPECIALISTS, PLAIN_SPECIALISTS } from './hardcodedSpecialists';
import type { Specialist, SpecialistPage, SpecialistRepository } from './types';

/**
 * Current data source. Replace with CmsSpecialistRepository later:
 * same interface, different transport (HTTP / GraphQL / SDK).
 */
export class HardcodedSpecialistRepository implements SpecialistRepository {
  async getAll(): Promise<Specialist[]> {
    return simulateNetwork([...PLAIN_SPECIALISTS]);
  }

  async getPage(page: number, pageSize: number): Promise<SpecialistPage> {
    const safePage = Math.max(1, page);
    const safeSize = Math.max(1, pageSize);
    const start = (safePage - 1) * safeSize;
    const items = INFINITE_SPECIALISTS.slice(start, start + safeSize);
    const total = INFINITE_SPECIALISTS.length;

    return simulateNetwork({
      items,
      page: safePage,
      pageSize: safeSize,
      total,
      hasMore: start + items.length < total,
    });
  }
}
