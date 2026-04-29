import { useQuery } from '@tanstack/react-query';
import { roundApi } from '../../api/roundApi';

export function useRoundCriteria(
  tournamentId: number | string | undefined,
  roundId: number | string | undefined,
) {
  const tId = tournamentId ? Number(tournamentId) : undefined;
  const rId = roundId ? Number(roundId) : undefined;

  return useQuery({
    queryKey: ['round-criteria', tId, rId],
    queryFn: () => roundApi.getRoundCriterions(tId!, rId!),
    enabled: !!tId && !!rId,
    staleTime: 60_000,
  });
}
