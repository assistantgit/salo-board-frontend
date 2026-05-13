import type { EvaluationCriterionDto } from '@entities/tournament';
import { ChevronDownIcon } from '@shared/ui/icons';
import { useState } from 'react';
import type { CriterionEvaluation } from '../../model/types';
import { CriterionEvaluationItem } from '../CriterionEvaluationItem/CriterionEvaluationItem';
import styles from './CriterionEvaluationList.module.css';

interface CriterionEvaluationListProps {
  criteria: EvaluationCriterionDto[];
  evaluations: CriterionEvaluation[];
  onScoreChange: (critEvalId: number, score: number) => void;
  onCommentChange: (critEvalId: number, comment: string) => void;
  disabled?: boolean;
  title?: string;
  initialOpen?: boolean;
}

export const CriterionEvaluationList = ({
  criteria,
  evaluations,
  onScoreChange,
  onCommentChange,
  disabled,
  title = 'Оцінювання за критеріями',
  initialOpen = true,
}: CriterionEvaluationListProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  if (criteria.length === 0) return null;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
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
        <div className={styles.title}>{title}</div>
        <div className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnActive : ''}`}>
          <ChevronDownIcon size='sm' />
        </div>
      </button>

      <div
        className={`${styles.contentWrapper} ${isOpen ? styles.contentVisible : styles.contentHidden}`}
      >
        <div className={styles.list}>
          {criteria.map((crit) => (
            <CriterionEvaluationItem
              key={crit.id}
              criterion={crit}
              evaluation={evaluations.find((e) => e.criterion === crit.id)}
              onScoreChange={onScoreChange}
              onCommentChange={onCommentChange}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
