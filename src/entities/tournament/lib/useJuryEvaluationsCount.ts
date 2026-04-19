import { useQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';

export const useJuryEvaluationsCount = (tournamentId: number, status?: 'DR' | 'SB') => {
  return useQuery({
    queryKey: ['tournament', tournamentId, 'jury-evaluations-count', status],
    queryFn: () => tournamentApi.getJuryEvaluationsCount(tournamentId, status),
    enabled: !!tournamentId,
  });
};
