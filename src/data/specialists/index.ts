import { HardcodedSpecialistRepository } from './HardcodedSpecialistRepository';
import type { SpecialistRepository } from './types';

export type { Specialist, SpecialistPage, SpecialistRepository } from './types';
export {
  getFetchSimulationMode,
  setFetchSimulationMode,
  type FetchSimulationMode,
} from './fetchSimulation';
export { HardcodedSpecialistRepository } from './HardcodedSpecialistRepository';

/** Composition root — swap implementation here for CMS. */
export const specialistRepository: SpecialistRepository =
  new HardcodedSpecialistRepository();
