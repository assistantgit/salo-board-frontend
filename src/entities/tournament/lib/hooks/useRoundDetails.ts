import { useQuery } from '@tanstack/react-query';
import { roundApi } from '../../api/roundApi';
import { useUserRoles } from '../useUserRoles';

export function useRoundDetails(
  tournamentId: number | string | undefined,
  roundId: number | string | undefined,
) {
  const tId = tournamentId ? Number(tournamentId) : undefined;
  const rId = roundId ? Number(roundId) : undefined;
  const { isStaff, isLoading: isLoadingRoles } = useUserRoles();

  return useQuery({
    queryKey: ['round-details', tId, rId, isStaff],
    queryFn: () => {
      if (!tId || !rId) throw new Error('Tournament ID and Round ID are required');
      return isStaff ? roundApi.getAdminRoundDetails(tId, rId) : roundApi.getRoundDetails(tId, rId);
    },
    enabled: !!tId && !!rId && !isLoadingRoles,
    staleTime: 60_000,
  });
}
