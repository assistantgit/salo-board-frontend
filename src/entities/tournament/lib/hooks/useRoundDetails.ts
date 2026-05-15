import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { roundApi } from '../../api/roundApi';

export function useRoundDetails(
  tournamentId: number | string | undefined,
  roundId: number | string | undefined,
  isAdmin: boolean = false,
) {
  const tId = tournamentId ? Number(tournamentId) : undefined;
  const rId = roundId ? Number(roundId) : undefined;

  return useQuery({
    queryKey: ['round-details', tId, rId, isAdmin],
    queryFn: () => {
      if (!tId || !rId) throw new Error('Tournament ID and Round ID are required');
      return isAdmin ? roundApi.getAdminRoundDetails(tId, rId) : roundApi.getRoundDetails(tId, rId);
    },
    enabled: !!tId && !!rId,
    placeholderData: keepPreviousData,
  });
}
