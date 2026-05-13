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
      queryFn: ({ pageParam = 1 }) => {
        const apiFilters = { ...filters, page: pageParam as number };
        if (isArchive) {
          return tournamentApi.getArchivedTournaments(apiFilters);
        }
        if (role === 'admin') {
          return tournamentApi.getAdminTournaments(apiFilters);
        }
        return tournamentApi.getTournaments(apiFilters);
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage.next) return undefined;
        const url = new URL(lastPage.next);
        return Number(url.searchParams.get('page')) || undefined;
      },
      initialPageParam: 1,
      retry: 1,
    });

  return {
    tournaments: data?.pages.flatMap((page) => page.results) ?? [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: error ? 'Помилка при завантаженні турнірів. Спробуйте пізніше.' : null,
  };
}
