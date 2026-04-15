// import { useQuery } from '@tanstack/react-query';
// import { tournamentApi } from '../api/tournament.api';
// import type { TournamentDomain } from '../model/tournament.types';

import { MOCK_TOURNAMENT } from '@shared/lib/mock/mockData';

/**
 * Hook for fetching and managing a single tournament details.
 * Uses React Query for caching and state management.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useTournament(id: number | null) {
  // Тимчасова заглушка для роботи без серверу
  return {
    tournament: MOCK_TOURNAMENT,
    isLoading: false,
    error: null
  };

  /*
  const { data, isLoading, error } = useQuery<TournamentDomain, Error>({
    queryKey: ['tournament', id],
    queryFn: () => tournamentApi.getTournamentById(id!),
    enabled: !!id,
    retry: 1,
  });

  return { 
    tournament: data ?? null, 
    isLoading, 
    error: error ? 'Помилка при завантаженні турніру. Спробуйте пізніше.' : null 
  };
  */
}
