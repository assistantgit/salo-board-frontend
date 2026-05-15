import { getRoundStatusLabel } from '../../lib/getRoundStatusLabel';
import type { RoundStatus } from '../../model/tournament.types';
import styles from './RoundStatusBadge.module.css';

interface RoundStatusBadgeProps {
  status: RoundStatus;
  className?: string;
}

export const RoundStatusBadge = ({ status, className }: RoundStatusBadgeProps) => {
  const statusLower = status.toLowerCase();

  return (
    <div className={`${styles.statusBadge} ${styles[statusLower] || ''} ${className || ''}`}>
      <span className={styles.statusDot} />
      {getRoundStatusLabel(status)}
    </div>
  );
};
