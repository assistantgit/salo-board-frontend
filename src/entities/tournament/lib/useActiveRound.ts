import { useQuery } from '@tanstack/react-query';
import { tournamentApi } from '../api/tournament.api';
import type { RoundDto } from '../model/tournament.types';

export const useActiveRound = (tournamentId: number | undefined) => {
  return useQuery({
    queryKey: ['tournament-rounds', tournamentId],
    queryFn: () => {
      if (!tournamentId) throw new Error('Tournament ID is required');
      return tournamentApi.getRounds(tournamentId);
    },
    enabled: !!tournamentId,
    select: (rounds: RoundDto[]) => rounds.find((r) => r.status === 'AC'),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
