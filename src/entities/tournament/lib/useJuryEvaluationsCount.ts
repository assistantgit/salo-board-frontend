import { tournamentApi } from '../api/tournament.api';
import { useAuthStore } from '@entities/user';

export const useJuryEvaluationsCount = (tournamentId: number, status?: 'DR' | 'SB') => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return useQuery({
    queryKey: ['tournament', tournamentId, 'jury-evaluations-count', status],
    queryFn: () => tournamentApi.getJuryEvaluationsCount(tournamentId, status),
    enabled: !!tournamentId && isAuth,
  });
};

