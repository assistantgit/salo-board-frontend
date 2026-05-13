import { useInfiniteQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';
import type { TournamentFilters } from '../api/types';

/**
 * Hook for fetching and managing tournament list with pagination (infinite scroll).
 * Uses React Query for caching, de-duplication and automatic re-fetching.
 */
export function useTournaments(filters: TournamentFilters = {}) {
  const { name, status, role, isArchive } = filters;

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['tournaments', { name, status, role, isArchive }],
      queryFn: ({ pageParam = 1 }) => {
        const params = { ...filters, page: pageParam as number };
        if (isArchive) {
          return tournamentApi.getArchivedTournaments(params);
        }
        if (role === 'admin') {
          return tournamentApi.getAdminTournaments(params);
        }
        return tournamentApi.getTournaments(params);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.next ? allPages.length + 1 : undefined;
      },
      retry: 1,
    });

  const tournaments = data?.pages.flatMap((page) => page.results) ?? [];

  return {
    tournaments,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: error ? 'Помилка при завантаженні турнірів. Спробуйте пізніше.' : null,
  };
}
