import { baseApi } from '@shared/api/baseApi';
import type {
  CriterionEvaluationDto,
  EvaluationDto,
  PatchedCriterionEvaluation,
  PatchedEvaluation,
  PatchedRequirementEvaluation,
  RequirementEvaluationDto,
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
  ): Promise<EvaluationDto> => {
    const { data } = await baseApi.get<EvaluationDto>(
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
  ): Promise<EvaluationDto> => {
    const { data } = await baseApi.patch<EvaluationDto>(
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
  ): Promise<CriterionEvaluationDto[]> => {
    const { data } = await baseApi.get<CriterionEvaluationDto[]>(
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
  ): Promise<CriterionEvaluationDto> => {
    const { data } = await baseApi.patch<CriterionEvaluationDto>(
      `/tournaments/${tournamentId}/rounds/${roundId}/submissions/${submissionId}/evaluation/criterion-evaluation/${critEvalId}`,
      patch,
    );
    return data;
  },

  /**
   * List requirement evaluations (checkboxes).
   */
  getRequirementEvaluations: async (
    tournamentId: number,
    roundId: number,
    submissionId: number,
  ): Promise<RequirementEvaluationDto[]> => {
    const { data } = await baseApi.get<RequirementEvaluationDto[]>(
      `/tournaments/${tournamentId}/rounds/${roundId}/submissions/${submissionId}/evaluation/requirement-evaluation`,
    );
    return data;
  },

  /**
   * Update a specific requirement evaluation.
   */
  updateRequirementEvaluation: async (
    tournamentId: number,
    roundId: number,
    submissionId: number,
    reqEvalId: number,
    patch: PatchedRequirementEvaluation,
  ): Promise<RequirementEvaluationDto> => {
    const { data } = await baseApi.patch<RequirementEvaluationDto>(
      `/tournaments/${tournamentId}/rounds/${roundId}/submissions/${submissionId}/evaluation/requirement-evaluation/${reqEvalId}`,
      patch,
    );
    return data;
  },
};
