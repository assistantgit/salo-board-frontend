import type { RoundRequirementDto } from '@entities/tournament';
import { ChevronDownIcon } from '@shared/ui/icons';
import { useState } from 'react';
import type { RequirementEvaluation } from '../../model/types';
import { RequirementEvaluationItem } from '../RequirementEvaluationItem/RequirementEvaluationItem';
import styles from './RequirementEvaluationList.module.css';

interface RequirementEvaluationListProps {
  requirements: RoundRequirementDto[];
  evaluations: RequirementEvaluation[];
  onStatusChange: (reqEvalId: number, checked: boolean) => void;
  disabled?: boolean;
  title?: string;
  initialOpen?: boolean;
}

export const RequirementEvaluationList = ({
  requirements,
  evaluations,
  onStatusChange,
  disabled,
  title = 'Вимоги раунду',
  initialOpen = true,
}: RequirementEvaluationListProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  if (requirements.length === 0) return null;

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
          {requirements.map((req) => (
            <RequirementEvaluationItem
              key={req.id}
              requirement={req}
              evaluation={evaluations.find((e) => e.requirement === req.id)}
              onStatusChange={onStatusChange}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
