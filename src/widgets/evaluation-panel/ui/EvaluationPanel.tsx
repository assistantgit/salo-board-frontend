import {
  CriterionEvaluationList,
  EvaluationComment,
  EvaluationStatusBadge,
  RequirementEvaluationList,
  useEvaluationParams,
} from '@entities/evaluation';
import { EvaluationActions } from '@features/evaluate-submission';
import { Skeleton } from '@shared/ui';
import type React from 'react';
import { useEvaluateSubmissionData } from '../../../pages/evaluate-submission/lib/hooks/useEvaluateSubmissionData';

import styles from './EvaluationPanel.module.css';

interface EvaluationPanelProps {
  tournamentId?: number;
  roundId?: number;
  submissionId?: number;
}

/**
 * Right column of the Evaluation page.
 * Orchestrates evaluation state, criteria scores, requirements and actions.
 */
export const EvaluationPanel: React.FC<EvaluationPanelProps> = ({
  tournamentId: propTournamentId,
  roundId: propRoundId,
  submissionId: propSubmissionId,
}) => {
  const {
    tournamentId: paramTournamentId,
    roundId: paramRoundId,
    submissionId: paramSubmissionId,
  } = useEvaluationParams();

  const tId = propTournamentId ?? paramTournamentId;
  const rId = propRoundId ?? paramRoundId;
  const sId = propSubmissionId ?? paramSubmissionId;

  const {
    criteria,
    requirements,
    evaluation,
    criterionEvaluations,
    requirementEvaluations,
    isLoading,
    isFullyEvaluated,
    updateCriterionEvaluation,
    updateRequirementStatus,
  } = useEvaluateSubmissionData(tId, rId, sId);

  if (isLoading) {
    return (
      <div className={styles.card}>
        <div className={styles.content}>
          <Skeleton style={{ width: '120px', height: '24px', marginBottom: '20px' }} />
          <Skeleton
            style={{ width: '100%', height: '40px', marginBottom: '24px', borderRadius: '10px' }}
          />
          <Skeleton
            style={{ width: '100%', height: '100px', marginBottom: '24px', borderRadius: '12px' }}
          />
          <Skeleton
            style={{ width: '100%', height: '150px', marginBottom: '24px', borderRadius: '12px' }}
          />
          <Skeleton style={{ width: '100%', height: '120px', borderRadius: '18px' }} />
        </div>
      </div>
    );
  }

  const isSubmitted = evaluation?.status === 'SB';

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h2 className={styles.title}>Оцінка</h2>

        <EvaluationStatusBadge status={evaluation?.status ?? 'DR'} className={styles.statusBadge} />

        <EvaluationComment
          tournamentId={tId}
          roundId={rId}
          submissionId={sId}
          disabled={isSubmitted}
        />

        <CriterionEvaluationList
          criteria={criteria ?? []}
          evaluations={criterionEvaluations}
          onScoreChange={(critEvalId, score) =>
            updateCriterionEvaluation({ critEvalId, patch: { score } })
          }
          onCommentChange={(critEvalId, comment) =>
            updateCriterionEvaluation({ critEvalId, patch: { comment } })
          }
          disabled={isSubmitted}
        />

        <RequirementEvaluationList
          requirements={requirements ?? []}
          evaluations={requirementEvaluations}
          onStatusChange={(reqEvalId, checked) =>
            updateRequirementStatus({ reqEvalId, patch: { isSatisfied: checked } })
          }
          disabled={isSubmitted}
        />

        <EvaluationActions
          tournamentId={tId}
          roundId={rId}
          submissionId={sId}
          isFullyEvaluated={isFullyEvaluated}
        />
      </div>
    </div>
  );
};
