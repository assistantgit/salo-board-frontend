import { ChevronDownIcon } from '@shared/ui/icons';
import { ActionInput } from '@shared/ui/inputs';
import type React from 'react';
import { useCallback, useRef, useState } from 'react';
import { useEvaluation } from '../../lib/hooks/useEvaluation';
import styles from './EvaluationComment.module.css';

interface EvaluationCommentProps {
  tournamentId: number;
  roundId: number;
  submissionId: number;
  disabled?: boolean;
  initialOpen?: boolean;
}

export const EvaluationComment = ({
  tournamentId,
  roundId,
  submissionId,
  disabled,
  initialOpen = true,
}: EvaluationCommentProps) => {
  const { evaluation, updateEvaluation } = useEvaluation(tournamentId, roundId, submissionId);
  const [isOpen, setIsOpen] = useState(initialOpen);

  const commentRef = useRef<string>(evaluation?.comment ?? '');

  const handleCommentBlur = useCallback(() => {
    if (commentRef.current !== evaluation?.comment) {
      updateEvaluation({ comment: commentRef.current });
    }
  }, [updateEvaluation, evaluation?.comment]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const renderContent = () => {
    return disabled ? (
      <div className={styles.readonlyWrapper}>
        <div className={styles.readonlyContent}>{evaluation?.comment || 'Немає коментарів.'}</div>
      </div>
    ) : (
      <div className={styles.wrapper}>
        <ActionInput
          placeholder='Загальний коментар до оцінювання...'
          isTextArea
          props={{
            defaultValue: evaluation?.comment ?? '',
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
              commentRef.current = e.target.value;
            },
            onBlur: handleCommentBlur,
            disabled,
          }}
        />
      </div>
    );
  };

  return (
    <div className={styles.section}>
      <button
        className={styles.header}
        onClick={handleToggle}
        type='button'
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Згорнути' : 'Розгорнути'}
      >
        <span className={styles.label}>Загальний коментар</span>
        <div className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnActive : ''}`}>
          <ChevronDownIcon size='sm' />
        </div>
      </button>

      <div
        className={`${styles.contentWrapper} ${isOpen ? styles.contentVisible : styles.contentHidden}`}
      >
        <div className={styles.contentInner}>{renderContent()}</div>
      </div>
    </div>
  );
};
