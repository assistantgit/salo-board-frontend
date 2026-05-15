import { useAuthStore } from '@entities/user';
import type { PaginatedResponse } from '@shared/api/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';
import type { TournamentDomain, UserTournamentRole } from '../model/tournament.types';

export function useMyTournamentsByRole(role: UserTournamentRole) {
  const isAuth = useAuthStore((state) => state.isAuth);

  const { data, isLoading, error } = useQuery<PaginatedResponse<TournamentDomain>, Error>({
    queryKey: ['tournaments', 'by-role', role],
    queryFn: () => tournamentApi.getTournamentsByRole(role),
    retry: 1,
    enabled: isAuth,
    placeholderData: keepPreviousData,
  });

  return {
    tournaments: data?.results ?? [],
    isLoading,
    error: error ? 'Помилка при завантаженні турнірів.' : null,
  };
}
