import { useQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';
import type { LeaderboardItemDto } from '../api/types';

/**
 * Fetches the leaderboard for a tournament.
 */
export function useLeaderboard(tournamentId: number | null) {
  const { data, isLoading, error } = useQuery<LeaderboardItemDto[], Error>({
    queryKey: ['leaderboard', tournamentId],
    queryFn: async () => {
      return tournamentApi.getLeaderboard(tournamentId!);
    },
    enabled: !!tournamentId,
    staleTime: 30_000,
  });

  return {
    leaderboard: data ?? [],
    isLoading,
    error: error ? 'Помилка при завантаженні лідерборду.' : null,
  };
}
