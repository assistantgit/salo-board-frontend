import { useQuery } from '@tanstack/react-query';
import { roundApi } from '../../api/roundApi';
import type { RoundDto } from '../../model/tournament.types';
import { useUserRoles } from '../useUserRoles';

export function useRounds(tournamentId: number | string | undefined) {
  const tId = tournamentId ? Number(tournamentId) : undefined;
  const { activeRoles, isLoading: isLoadingRoles } = useUserRoles();
  const isAdmin = activeRoles.includes('admin');

  const { data, isLoading, error } = useQuery<RoundDto[], Error>({
    queryKey: ['rounds', tId, isAdmin],
    queryFn: () => {
      if (!tId) throw new Error('Tournament ID is required');
      return isAdmin ? roundApi.getAdminRounds(tId) : roundApi.getRounds(tId);
    },
    enabled: !!tId && !isLoadingRoles,
    staleTime: 60_000,
  });

  return {
    rounds: data ?? [],
    isLoading,
    error: error ? 'Помилка завантаження раундів' : null,
  };
}
