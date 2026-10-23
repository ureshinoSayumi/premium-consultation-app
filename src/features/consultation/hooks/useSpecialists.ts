import { useQuery } from '@tanstack/react-query';

import { specialistRepository } from '@/data/specialists';

export const specialistsQueryKey = ['specialists', 'all'] as const;

type Options = {
  enabled?: boolean;
};

export function useSpecialists(options: Options = {}) {
  return useQuery({
    queryKey: specialistsQueryKey,
    queryFn: () => specialistRepository.getAll(),
    enabled: options.enabled ?? true,
  });
}
