import { useEvaluation } from '@entities/evaluation';
import { DefaultButton } from '@shared/ui';
import type React from 'react';
import styles from './SaveDraftButton.module.css';

interface SaveDraftButtonProps {
  tournamentId: number;
  roundId: number;
  submissionId: number;
  disabled?: boolean;
}

export const SaveDraftButton: React.FC<SaveDraftButtonProps> = ({
  tournamentId,
  roundId,
  submissionId,
  disabled,
}) => {
  const { evaluation, updateEvaluation, isUpdating } = useEvaluation(
    tournamentId,
    roundId,
    submissionId,
  );

  const isSubmitted = evaluation?.status === 'SB';

  if (isSubmitted) return null;

  return (
    <div className={styles.wrapper}>
      <DefaultButton
        className={styles.draftBtn}
        onClick={() => updateEvaluation({ status: 'DR' })}
        disabled={disabled || isUpdating}
      >
        Зберегти як чорнетку
      </DefaultButton>
      {isUpdating && (
        <div className={styles.savingIndicator}>
          <div className={styles.savingDot} />
          <span>Збереження...</span>
        </div>
      )}
    </div>
  );
};
