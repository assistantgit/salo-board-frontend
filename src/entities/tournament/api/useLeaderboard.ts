import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { LeaderboardItemDto } from '../model/tournament.types';
import { tournamentApi } from './tournament.api';

export function useLeaderboard(tournamentId: number | null) {
  const { data, isLoading, error } = useQuery<LeaderboardItemDto[], Error>({
    queryKey: ['leaderboard', tournamentId],
    queryFn: async () => {
      if (!tournamentId) throw new Error('Tournament ID is required');
      return await tournamentApi.getLeaderboard(tournamentId);
    },
    enabled: !!tournamentId,
    placeholderData: keepPreviousData,
  });

  return {
    leaderboard: data ?? [],
    isLoading,
    error: error ? 'Помилка при завантаженні лідерборду.' : null,
  };
}
