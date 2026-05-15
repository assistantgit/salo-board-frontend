import {
  useCriterionEvaluations,
  useEvaluation,
  useRequirementEvaluations,
} from '@entities/evaluation';
import { useRoundCriteria, useRoundRequirements } from '@entities/tournament';

/**
 * Aggregates all data fetching hooks for the evaluate submission page.
 * Provides a unified loading state and data access to prevent waterfall rendering
 * and keep the widgets purely presentational where possible.
 */
export function useEvaluateSubmissionData(
  tournamentId: number,
  roundId: number,
  submissionId: number,
) {
  const { data: criteria, isLoading: isCriteriaLoading } = useRoundCriteria(tournamentId, roundId);
  const { data: requirements, isLoading: isRequirementsLoading } = useRoundRequirements(
    tournamentId,
    roundId,
  );
  const { evaluation, isLoading: isEvalLoading } = useEvaluation(
    tournamentId,
    roundId,
    submissionId,
  );
  const { criterionEvaluations, updateCriterionEvaluation } = useCriterionEvaluations(
    tournamentId,
    roundId,
    submissionId,
  );
  const { requirementEvaluations, updateRequirementStatus } = useRequirementEvaluations(
    tournamentId,
    roundId,
    submissionId,
  );

  const isLoading = isCriteriaLoading || isRequirementsLoading || isEvalLoading;

  // Validation: check if all criteria have corresponding evaluations with score > 0
  // Or at least if all criteria exist in the evaluations list.
  const isFullyEvaluated =
    criteria &&
    criteria.length > 0 &&
    criterionEvaluations &&
    criteria.every((c) => {
      const evalItem = criterionEvaluations.find((ce) => ce.criterion === c.id);
      return evalItem !== undefined && evalItem.score !== null;
    });

  return {
    criteria,
    requirements,
    evaluation,
    criterionEvaluations,
    requirementEvaluations,
    isLoading,
    isFullyEvaluated: !!isFullyEvaluated,
    updateCriterionEvaluation,
    updateRequirementStatus,
  };
}
