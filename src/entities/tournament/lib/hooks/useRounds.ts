import { useQuery } from '@tanstack/react-query';
import { roundApi } from '../../api/roundApi';
import type { RoundDto } from '../../model/tournament.types';

export function useRounds(tournamentId: number | string | undefined) {
  const tId = tournamentId ? Number(tournamentId) : undefined;

  const { data, isLoading, error } = useQuery<RoundDto[], Error>({
    queryKey: ['rounds', tId],
    queryFn: () => {
      if (!tId) throw new Error('Tournament ID is required');
      return roundApi.getRounds(tId);
    },
    enabled: !!tId,
    staleTime: 60_000,
  });

  return {
    rounds: data ?? [],
    isLoading,
    error: error ? 'Помилка завантаження раундів' : null,
  };
}
