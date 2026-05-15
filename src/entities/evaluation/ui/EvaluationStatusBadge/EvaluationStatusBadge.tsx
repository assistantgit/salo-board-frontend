import type { EvaluationStatus } from '../../model/types';
import styles from './EvaluationStatusBadge.module.css';

interface EvaluationStatusBadgeProps {
  status: EvaluationStatus;
  className?: string;
}

const STATUS_LABELS: Record<EvaluationStatus, string> = {
  DR: 'Чернетка',
  SB: 'Надіслано',
};

export const EvaluationStatusBadge = ({ status, className = '' }: EvaluationStatusBadgeProps) => {
  const isSubmitted = status === 'SB';
  const statusClass = isSubmitted ? styles.submitted : styles.draft;

  return (
    <div className={`${styles.badge} ${statusClass} ${className}`}>{STATUS_LABELS[status]}</div>
  );
};
