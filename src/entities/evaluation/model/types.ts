export type EvaluationStatus = 'DR' | 'SB';

/**
 * API Data Transfer Objects
 */

export interface EvaluationDto {
  id: number;
  submission: number;
  jury: number;
  status: EvaluationStatus;
  comment: string;
  totalScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface CriterionEvaluationDto {
  id: number;
  evaluation: number;
  criterion: number;
  score: number;
  comment: string;
}

export interface RequirementEvaluationDto {
  id: number;
  evaluation: number;
  requirement: number;
  isSatisfied: boolean;
  comment: string;
}

/**
 * Domain Models (for UI/Logic if different from DTOs)
 * Currently they match, but keeping them separate for FSD/SOLID future-proofing
 */

export type Evaluation = EvaluationDto;
export type CriterionEvaluation = CriterionEvaluationDto;
export type RequirementEvaluation = RequirementEvaluationDto;

/**
 * Patched Types for Mutations
 */

export interface PatchedEvaluation {
  status?: EvaluationStatus;
  comment?: string;
}

export interface PatchedCriterionEvaluation {
  score?: number;
  comment?: string;
}

export interface PatchedRequirementEvaluation {
  isSatisfied?: boolean;
  comment?: string;
}
