import { useInfiniteQuery } from '@tanstack/react-query';

import { specialistRepository } from '@/data/specialists';
import { SPECIALIST_PAGE_SIZE } from '../constants';

export const specialistsInfiniteQueryKey = [
  'specialists',
  'infinite',
  SPECIALIST_PAGE_SIZE,
] as const;

type Options = {
  enabled?: boolean;
};

export function useSpecialistsInfinite(options: Options = {}) {
  return useInfiniteQuery({
    queryKey: specialistsInfiniteQueryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      specialistRepository.getPage(pageParam, SPECIALIST_PAGE_SIZE),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    enabled: options.enabled ?? true,
  });
}
