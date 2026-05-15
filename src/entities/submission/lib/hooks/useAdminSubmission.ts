import { tournamentApi } from '@entities/tournament';
import { useQuery } from '@tanstack/react-query';

export function useAdminSubmission(tournamentId: number, roundId: number, submissionId: number) {
  return useQuery({
    queryKey: ['admin-submission', tournamentId, roundId, submissionId],
    queryFn: () => tournamentApi.getAdminSubmission(tournamentId, roundId, submissionId),
    enabled: !!tournamentId && !!roundId && !!submissionId,
  });
}
