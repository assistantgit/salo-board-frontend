import { useQuery } from '@tanstack/react-query';
import type { LeaderboardItemDto } from '../model/tournament.types';
import { tournamentApi } from './tournament.api';

export function useLeaderboard(tournamentId: number | null) {
  const { data, isLoading, error } = useQuery<LeaderboardItemDto[], Error>({
    queryKey: ['leaderboard', tournamentId],
    queryFn: async () => {
      const data = await tournamentApi.getLeaderboard(tournamentId!);
      return data;
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
