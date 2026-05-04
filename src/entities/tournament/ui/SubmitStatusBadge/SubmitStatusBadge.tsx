import type { SubmissionStatus } from '@entities/team';
import styles from './SubmitStatusBadge.module.css';

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  DR: 'Чернетка',
  SB: 'Відправлено',
  LK: 'Заблоковано',
};

interface SubmitStatusBadgeProps {
  status: SubmissionStatus;
  className?: string;
}

export const SubmitStatusBadge = ({ status, className }: SubmitStatusBadgeProps) => {
  const statusLower = status.toLowerCase();

  return (
    <div className={`${styles.statusBadge} ${styles[statusLower] || ''} ${className || ''}`}>
      <span className={styles.statusDot} />
      {STATUS_LABELS[status]}
    </div>
  );
};
