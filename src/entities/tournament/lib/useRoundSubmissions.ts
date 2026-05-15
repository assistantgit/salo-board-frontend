import { useAuthStore } from '@entities/user';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';

export const useRoundSubmissions = (
  tournamentId: number | undefined,
  roundId: number | undefined,
) => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return useQuery({
    queryKey: ['round-submissions', tournamentId, roundId],
    queryFn: () => {
      if (!tournamentId || !roundId) throw new Error('Tournament ID and Round ID are required');
      return tournamentApi.getRoundSubmissions(tournamentId, roundId);
    },
    enabled: !!tournamentId && !!roundId && isAuth,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
