import { useQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';
import type { TournamentFilters } from '../api/types';
import type { TournamentDomain } from '../model/tournament.types';

/**
 * Hook for fetching and managing tournament list.
 * Uses React Query for caching, de-duplication and automatic re-fetching.
 */
export function useTournaments(filters: TournamentFilters = {}) {
  const { name, status, role, isArchive } = filters;

  const { data, isLoading, error } = useQuery<TournamentDomain[], Error>({
    queryKey: ['tournaments', { name, status, role, isArchive }],
    queryFn: () =>
      isArchive
        ? tournamentApi.getArchivedTournaments({ name, role })
        : tournamentApi.getTournaments({ name, status, role }),
    retry: 1,
  });

  return {
    tournaments: data ?? [],
    isLoading,
    error: error ? 'Помилка при завантаженні турнірів. Спробуйте пізніше.' : null,
  };
}
