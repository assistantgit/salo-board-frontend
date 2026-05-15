import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { roundApi } from '../../api/roundApi';

export function useRoundCriteria(
  tournamentId: number | string | undefined,
  roundId: number | string | undefined,
) {
  const tId = tournamentId ? Number(tournamentId) : undefined;
  const rId = roundId ? Number(roundId) : undefined;

  return useQuery({
    queryKey: ['round-criteria', tId, rId],
    queryFn: () => {
      if (!tId || !rId) throw new Error('Tournament ID and Round ID are required');
      return roundApi.getRoundCriterions(tId, rId);
    },
    enabled: !!tId && !!rId,
    placeholderData: keepPreviousData,
  });
}
