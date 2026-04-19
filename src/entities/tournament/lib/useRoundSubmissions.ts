import { useQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';

export const useRoundSubmissions = (tournamentId: number | undefined, roundId: number | undefined) => {
  return useQuery({
    queryKey: ['round-submissions', tournamentId, roundId],
    queryFn: () => tournamentApi.getRoundSubmissions(tournamentId!, roundId!),
    enabled: !!tournamentId && !!roundId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
};
