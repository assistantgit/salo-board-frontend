import { tournamentApi } from '@entities/tournament';
import { useQuery } from '@tanstack/react-query';

export const useAdminEvaluation = (tournamentId: number, roundId: number, evaluationId: number) => {
  return useQuery({
    queryKey: ['admin-evaluation', tournamentId, roundId, evaluationId],
    queryFn: () => tournamentApi.getAdminEvaluationDetails(tournamentId, roundId, evaluationId),
    enabled: !!tournamentId && !!roundId && !!evaluationId,
  });
};
