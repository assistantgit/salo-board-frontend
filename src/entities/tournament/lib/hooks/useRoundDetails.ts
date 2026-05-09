import { useQuery } from '@tanstack/react-query';
import { roundApi } from '../../api/roundApi';
import { useUserRoles } from '../useUserRoles';

export function useRoundDetails(
  tournamentId: number | string | undefined,
  roundId: number | string | undefined,
) {
  const tId = tournamentId ? Number(tournamentId) : undefined;
  const rId = roundId ? Number(roundId) : undefined;
  const { activeRoles } = useUserRoles();
  const isAdmin = activeRoles.includes('admin');

  return useQuery({
    queryKey: ['round-details', tId, rId],
    queryFn: () => {
      if (!tId || !rId) throw new Error('Tournament ID and Round ID are required');
      return roundApi.getRoundDetails(tId, rId);
    },
    enabled: !!tId && !!rId,
    staleTime: 60_000,
  });
}
