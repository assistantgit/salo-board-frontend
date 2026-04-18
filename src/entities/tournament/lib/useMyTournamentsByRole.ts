import { useQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';
import type { UserTournamentRole, TournamentDomain } from '../model/tournament.types';

export function useMyTournamentsByRole(role: UserTournamentRole) {
  const { data, isLoading, error } = useQuery<TournamentDomain[], Error>({
    queryKey: ['tournaments', 'by-role', role],
    queryFn: () => tournamentApi.getTournamentsByRole(role),
    staleTime: 30_000,
    retry: 1,
  });

  return {
    tournaments: data ?? [],
    isLoading,
    error: error ? 'Помилка при завантаженні турнірів.' : null,
  };
}
