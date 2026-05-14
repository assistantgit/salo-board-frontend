import type { PaginatedResponse } from '@shared/api/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';
import type { TournamentFilters } from '../api/types';
import type { TournamentDomain } from '../model/tournament.types';

export function useTournaments(filters: TournamentFilters = {}) {
  const { name, status, role, isArchive } = filters;

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, error } =
    useInfiniteQuery<PaginatedResponse<TournamentDomain>, Error>({
      queryKey: ['tournaments', { name, status, role, isArchive }],
      queryFn: async ({ pageParam = 1 }) => {
        const apiFilters = { ...filters, page: pageParam as number };

        if (isArchive) {
          return tournamentApi.getArchivedTournaments(apiFilters);
        }

        // If it's an admin view, we try the admin-specific endpoint first,
        // but fall back to the general one if it fails (e.g., due to permissions or missing endpoint)
        if (role === 'admin') {
          try {
            return await tournamentApi.getAdminTournaments(apiFilters);
          } catch (e) {
            console.warn('Admin tournaments endpoint failed, falling back to general endpoint', e);
          }
        }

        return tournamentApi.getTournaments(apiFilters);
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage.next) return undefined;
        try {
          const url = new URL(lastPage.next, window.location.origin);
          const page = url.searchParams.get('page');
          return page ? Number(page) : undefined;
        } catch {
          return undefined;
        }
      },
      initialPageParam: 1,
      retry: 1,
    });

  return {
    tournaments: data?.pages.flatMap((page) => page.results) ?? [],
    totalCount: data?.pages[0]?.count ?? 0,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: error ? 'Помилка при завантаженні турнірів. Спробуйте пізніше.' : null,
  };
}
