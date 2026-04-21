import { tournamentApi } from '../api/tournament.api';
import { useAuthStore } from '@entities/user';

export const useRoundSubmissions = (tournamentId: number | undefined, roundId: number | undefined) => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return useQuery({
    queryKey: ['round-submissions', tournamentId, roundId],
    queryFn: () => tournamentApi.getRoundSubmissions(tournamentId!, roundId!),
    enabled: !!tournamentId && !!roundId && isAuth,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
};
