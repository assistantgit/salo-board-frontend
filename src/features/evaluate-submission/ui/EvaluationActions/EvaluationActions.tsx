import { SaveDraftButton } from '../SaveDraftButton';
import { SubmitEvaluationButton } from '../SubmitEvaluationButton';
import styles from './EvaluationActions.module.css';

interface EvaluationActionsProps {
  tournamentId: number;
  roundId: number;
  submissionId: number;
  disabled?: boolean;
  isFullyEvaluated?: boolean;
}

export const EvaluationActions = ({
  tournamentId,
  roundId,
  submissionId,
  disabled,
  isFullyEvaluated,
}: EvaluationActionsProps) => {
  return (
    <div className={styles.actions}>
      <SaveDraftButton
        tournamentId={tournamentId}
        roundId={roundId}
        submissionId={submissionId}
        disabled={disabled}
      />
      <SubmitEvaluationButton
        tournamentId={tournamentId}
        roundId={roundId}
        submissionId={submissionId}
        disabled={disabled}
        isFullyEvaluated={isFullyEvaluated}
      />
    </div>
  );
};
