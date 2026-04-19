import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@entities/user';
import { tournamentApi } from '../api/tournament.api';
import type { UserTournamentRole, TournamentDomain } from '../model/tournament.types';

export function useMyTournamentsByRole(role: UserTournamentRole) {
  const isAuth = useAuthStore((state) => state.isAuth);

  const { data, isLoading, error } = useQuery<TournamentDomain[], Error>({
    queryKey: ['tournaments', 'by-role', role],
    queryFn: () => tournamentApi.getTournamentsByRole(role),
    staleTime: 30_000,
    retry: 1,
    enabled: isAuth,
  });

  return {
    tournaments: data ?? [],
    isLoading,
    error: error ? 'Помилка при завантаженні турнірів.' : null,
  };
}
