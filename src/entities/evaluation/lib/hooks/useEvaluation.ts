import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { evaluationApi } from '../../api/evaluationApi';
import type { PatchedEvaluation } from '../../model/types';

export function useEvaluation(tournamentId: number, roundId: number, submissionId: number) {
  const queryClient = useQueryClient();

  const queryKey = ['evaluation', tournamentId, roundId, submissionId];

  const query = useQuery({
    queryKey,
    queryFn: () => evaluationApi.getEvaluation(tournamentId, roundId, submissionId),
    enabled: !!tournamentId && !!roundId && !!submissionId,
  });

  const updateMutation = useMutation({
    mutationFn: (patch: PatchedEvaluation) =>
      evaluationApi.updateEvaluation(tournamentId, roundId, submissionId, patch),
    onMutate: async (patch) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousEvaluation = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      if (previousEvaluation) {
        queryClient.setQueryData(queryKey, {
          ...(previousEvaluation as object),
          ...patch,
        });
      }

      return { previousEvaluation };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
      // Invalidate related queries to refresh scores and requirements (let them fetch in background)
      queryClient.invalidateQueries({
        queryKey: ['criterion-evaluations', tournamentId, roundId, submissionId],
      });
      queryClient.invalidateQueries({
        queryKey: ['requirement-evaluations', tournamentId, roundId, submissionId],
      });
    },
    onError: (error, newEvaluation, context) => {
      console.error('Failed to update evaluation:', error);
      // Rollback to the previous value
      if (context?.previousEvaluation) {
        queryClient.setQueryData(queryKey, context.previousEvaluation);
      }

      // Invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({
        queryKey: ['criterion-evaluations', tournamentId, roundId, submissionId],
      });
      queryClient.invalidateQueries({
        queryKey: ['requirement-evaluations', tournamentId, roundId, submissionId],
      });
    },
  });

  return {
    evaluation: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    updateEvaluation: updateMutation.mutate,
    updateEvaluationAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
