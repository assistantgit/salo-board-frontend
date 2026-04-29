import { useQuery } from '@tanstack/react-query';
import { roundApi } from '../../api/roundApi';

export function useRoundDetails(
  tournamentId: number | string | undefined,
  roundId: number | string | undefined,
) {
  const tId = tournamentId ? Number(tournamentId) : undefined;
  const rId = roundId ? Number(roundId) : undefined;

  return useQuery({
    queryKey: ['round-details', tId, rId],
    queryFn: () => roundApi.getRoundDetails(tId!, rId!),
    enabled: !!tId && !!rId,
    staleTime: 60_000,
  });
}
