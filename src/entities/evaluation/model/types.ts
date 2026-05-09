import type { EvaluationCriterionDto } from '@entities/tournament';

export type EvaluationStatus = 'DR' | 'SB';

export interface Evaluation {
  id: number;
  submission: number;
  jury: number;
  status: EvaluationStatus;
  comment: string;
  totalScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface CriterionEvaluation {
  id: number;
  evaluation: number;
  criterion: number;
  score: number;
  comment: string;
}

export interface PatchedEvaluation {
  status?: EvaluationStatus;
  comment?: string;
}

export interface PatchedCriterionEvaluation {
  score?: number;
  comment?: string;
}
