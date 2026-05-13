import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { evaluationApi } from '../../api/evaluationApi';
import type { PatchedRequirementEvaluation, RequirementEvaluation } from '../../model/types';

export function useRequirementEvaluations(
  tournamentId: number,
  roundId: number,
  submissionId: number,
) {
  const queryClient = useQueryClient();

  const queryKey = ['requirement-evaluations', tournamentId, roundId, submissionId];

  const query = useQuery({
    queryKey,
    queryFn: () => evaluationApi.getRequirementEvaluations(tournamentId, roundId, submissionId),
    enabled: !!tournamentId && !!roundId && !!submissionId,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      reqEvalId,
      patch,
    }: {
      reqEvalId: number;
      patch: PatchedRequirementEvaluation;
    }) =>
      evaluationApi.updateRequirementEvaluation(
        tournamentId,
        roundId,
        submissionId,
        reqEvalId,
        patch,
      ),
    onSuccess: (updatedReq) => {
      queryClient.setQueryData(queryKey, (oldData: RequirementEvaluation[] | undefined) => {
        if (!oldData) return [updatedReq];
        return oldData.map((item: RequirementEvaluation) =>
          item.id === updatedReq.id ? updatedReq : item,
        );
      });
    },
  });

  return {
    requirementEvaluations: query.data || [],
    isLoading: query.isLoading,
    updateRequirementStatus: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
