import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { evaluationApi } from '../../api/evaluationApi';
import type { CriterionEvaluation, PatchedCriterionEvaluation } from '../../model/types';

export function useCriterionEvaluations(
  tournamentId: number,
  roundId: number,
  submissionId: number,
) {
  const queryClient = useQueryClient();

  const queryKey = ['criterion-evaluations', tournamentId, roundId, submissionId];

  const query = useQuery({
    queryKey,
    queryFn: () => evaluationApi.getCriterionEvaluations(tournamentId, roundId, submissionId),
    enabled: !!tournamentId && !!roundId && !!submissionId,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      critEvalId,
      patch,
    }: {
      critEvalId: number;
      patch: PatchedCriterionEvaluation;
    }) =>
      evaluationApi.updateCriterionEvaluation(
        tournamentId,
        roundId,
        submissionId,
        critEvalId,
        patch,
      ),
    onSuccess: (updatedCrit) => {
      queryClient.setQueryData(queryKey, (oldData: CriterionEvaluation[] | undefined) => {
        if (!oldData) return [updatedCrit];
        return oldData.map((item: CriterionEvaluation) =>
          item.id === updatedCrit.id ? updatedCrit : item,
        );
      });
    },
  });

  return {
    criterionEvaluations: query.data || [],
    isLoading: query.isLoading,
    updateCriterionEvaluation: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
