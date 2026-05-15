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
    onMutate: async ({ critEvalId, patch }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousEvaluations = queryClient.getQueryData<CriterionEvaluation[]>(queryKey);

      if (previousEvaluations) {
        queryClient.setQueryData<CriterionEvaluation[]>(
          queryKey,
          previousEvaluations.map((item) =>
            item.id === critEvalId ? { ...item, ...patch } : item,
          ),
        );
      }

      return { previousEvaluations };
    },
    onSuccess: (updatedCrit) => {
      queryClient.setQueryData(queryKey, (oldData: CriterionEvaluation[] | undefined) => {
        if (!oldData) return [updatedCrit];
        return oldData.map((item: CriterionEvaluation) =>
          item.id === updatedCrit.id ? updatedCrit : item,
        );
      });
      // Invalidate the main evaluation to refresh total score
      queryClient.invalidateQueries({
        queryKey: ['evaluation', tournamentId, roundId, submissionId],
      });
    },
    onError: (err, variables, context) => {
      if (context?.previousEvaluations) {
        queryClient.setQueryData(queryKey, context.previousEvaluations);
      }
    },
  });

  return {
    criterionEvaluations: query.data || [],
    isLoading: query.isLoading,
    updateCriterionEvaluation: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
