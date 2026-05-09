import { baseApi } from '@shared/api/baseApi';
import type {
  CriterionEvaluation,
  Evaluation,
  PatchedCriterionEvaluation,
  PatchedEvaluation,
} from '../model/types';

export const evaluationApi = {
  /**
   * Get evaluation for a submission.
   * If it doesn't exist, it might be created on the backend.
   */
  getEvaluation: async (
    tournamentId: number,
    roundId: number,
    submissionId: number,
  ): Promise<Evaluation> => {
    const { data } = await baseApi.get<Evaluation>(
      `/tournaments/${tournamentId}/rounds/${roundId}/submissions/${submissionId}/evaluation`,
    );
    return data;
  },

  /**
   * Update evaluation (status, comment).
   */
  updateEvaluation: async (
    tournamentId: number,
    roundId: number,
    submissionId: number,
    patch: PatchedEvaluation,
  ): Promise<Evaluation> => {
    const { data } = await baseApi.patch<Evaluation>(
      `/tournaments/${tournamentId}/rounds/${roundId}/submissions/${submissionId}/evaluation`,
      patch,
    );
    return data;
  },

  /**
   * List criterion evaluations (scores).
   */
  getCriterionEvaluations: async (
    tournamentId: number,
    roundId: number,
    submissionId: number,
  ): Promise<CriterionEvaluation[]> => {
    const { data } = await baseApi.get<CriterionEvaluation[]>(
      `/tournaments/${tournamentId}/rounds/${roundId}/submissions/${submissionId}/evaluation/criterion-evaluation`,
    );
    return data;
  },

  /**
   * Update a specific criterion score.
   */
  updateCriterionEvaluation: async (
    tournamentId: number,
    roundId: number,
    submissionId: number,
    critEvalId: number,
    patch: PatchedCriterionEvaluation,
  ): Promise<CriterionEvaluation> => {
    const { data } = await baseApi.patch<CriterionEvaluation>(
      `/tournaments/${tournamentId}/rounds/${roundId}/submissions/${submissionId}/evaluation/criterion-evaluation/${critEvalId}`,
      patch,
    );
    return data;
  },
};
