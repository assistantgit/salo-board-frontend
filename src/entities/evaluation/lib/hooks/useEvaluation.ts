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
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
  });

  return {
    evaluation: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    updateEvaluation: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
