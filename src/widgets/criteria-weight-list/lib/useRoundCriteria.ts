import type { EvaluationCriterionDto } from '@entities/tournament';
import { roundApi } from '@entities/tournament/api';
import { useQuery } from '@tanstack/react-query';

/**
 * Fetches evaluation criteria for a single round.
 * Extracted from the component to keep UI layer free of query logic.
 */
export function useRoundCriteria(
  tournamentId: number | string,
  roundId: number,
): { criteria: EvaluationCriterionDto[]; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ['criteria', roundId],
    queryFn: () => roundApi.getRoundCriterions(Number(tournamentId), roundId),
    staleTime: 60_000,
  });

  return { criteria: data ?? [], isLoading };
}
