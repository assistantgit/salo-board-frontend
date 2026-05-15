import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { roundApi } from '../../api/roundApi';

export function useRoundRequirements(
  tournamentId: number | string | undefined,
  roundId: number | string | undefined,
) {
  const tId = tournamentId ? Number(tournamentId) : undefined;
  const rId = roundId ? Number(roundId) : undefined;

  return useQuery({
    queryKey: ['round-requirements', tId, rId],
    queryFn: () => {
      if (!tId || !rId) throw new Error('Tournament ID and Round ID are required');
      return roundApi.getRoundRequirements(tId, rId);
    },
    enabled: !!tId && !!rId,
    placeholderData: keepPreviousData,
  });
}
