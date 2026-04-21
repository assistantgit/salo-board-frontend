import { tournamentApi } from './tournament.api';
import { useAuthStore } from '@entities/user';
import type { TeamLeaderboardRoundDto } from '../model/tournament.types';
import { useQuery } from '@tanstack/react-query';

export function useTeamLeaderboard(tournamentId: number | null, teamId: number | null) {
  const isAuth = useAuthStore((state) => state.isAuth);

  const { data, isLoading, error } = useQuery<TeamLeaderboardRoundDto[], Error>({
    queryKey: ['team-leaderboard-details', tournamentId, teamId],
    queryFn: async () => {
      return await tournamentApi.getTeamLeaderboardDetails(tournamentId!, teamId!);
    },
    enabled: !!tournamentId && !!teamId && isAuth,
    staleTime: 60_000,
  });

  return {
    details: data ?? [],
    isLoading,
    error: error ? 'Помилка при завантаженні деталей команди.' : null,
  };
}