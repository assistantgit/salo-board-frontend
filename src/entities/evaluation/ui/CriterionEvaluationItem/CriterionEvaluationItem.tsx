import type { EvaluationCriterionDto } from '@entities/tournament';
import { ChevronDownIcon } from '@shared/ui/icons';
import { ActionInput } from '@shared/ui/inputs';
import type React from 'react';
import { useState } from 'react';
import type { CriterionEvaluation } from '../../model/types';
import styles from './CriterionEvaluationItem.module.css';

interface CriterionEvaluationItemProps {
  criterion: EvaluationCriterionDto;
  evaluation?: CriterionEvaluation;
  onScoreChange: (critEvalId: number, score: number) => void;
  onCommentChange: (critEvalId: number, comment: string) => void;
  disabled?: boolean;
  initialOpen?: boolean;
}

export const CriterionEvaluationItem = ({
  criterion,
  evaluation,
  onScoreChange,
  onCommentChange,
  disabled,
  initialOpen = true,
}: CriterionEvaluationItemProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.item}>
      <button
        className={styles.header}
        onClick={handleToggle}
        type='button'
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Згорнути' : 'Розгорнути'}
      >
        <div className={styles.headerTitleGroup}>
          <span className={styles.name}>{criterion.title}</span>
          <div className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnActive : ''}`}>
            <ChevronDownIcon size='xs' />
          </div>
        </div>
        <span className={styles.scoreDisplay}>
          <span className={styles.scoreValue}>{evaluation?.score ?? 0}</span>
          {' / '}
          {criterion.maxScore}
        </span>
      </button>

      <div
        className={`${styles.contentWrapper} ${isOpen ? styles.contentVisible : styles.contentHidden}`}
      >
        <div className={styles.contentBody}>
          {!disabled ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              <ActionInput
                type='number'
                min={0}
                max={criterion.maxScore}
                placeholder='0'
                suffix={`/ ${criterion.maxScore}`}
                props={{
                  defaultValue: evaluation?.score ?? 0,
                  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (['e', 'E', '+', '-'].includes(e.key)) {
                      e.preventDefault();
                    }
                  },
                  onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                    if (evaluation) {
                      let val = Math.round(Number(e.target.value));
                      if (Number.isNaN(val)) val = 0;
                      if (val < 0) val = 0;
                      if (val > criterion.maxScore) val = criterion.maxScore;

                      e.target.value = val.toString();
                      if (val !== evaluation.score) {
                        onScoreChange(evaluation.id, val);
                      }
                    }
                  },
                  disabled,
                }}
              />
              <ActionInput
                isTextArea={true}
                label='Коментар до критерію'
                labelClassName={styles.commentLabel}
                placeholder="Коментар до критерію (необов'язково)..."
                props={{
                  defaultValue: evaluation?.comment ?? '',
                  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => {
                    if (evaluation && e.target.value !== evaluation.comment) {
                      onCommentChange(evaluation.id, e.target.value);
                    }
                  },
                  disabled,
                }}
              />
            </div>
          ) : (
            evaluation?.comment && (
              <div className={styles.commentWrapper}>
                <span className={styles.commentLabel}>Коментар до критерію</span>
                <div className={styles.commentDisplay}>{evaluation.comment}</div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
