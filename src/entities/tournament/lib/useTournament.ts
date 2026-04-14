import { useQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';
import type { TournamentDomain } from '../model/tournament.types';

/**
 * Hook for fetching and managing a single tournament details.
 * Uses React Query for caching and state management.
 */
export function useTournament(id: number | null) {
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
}
