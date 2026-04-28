import type { TournamentStatus } from '../model/tournament.types';
import styles from './TournamentProgressBar.module.css';

interface TournamentProgressBarProps {
  progress: number;
  status: TournamentStatus;
  showLabel?: boolean;
  className?: string;
}

export const TournamentProgressBar = ({
  progress,
  status,
  showLabel = true,
  className,
}: TournamentProgressBarProps) => (
  <div className={`${styles.wrap} ${className || ''}`}>
    {showLabel && <span className={styles.label}>Виконання турніру</span>}

    <div className={styles.track}>
      <div
        className={`${styles.fill} ${styles[status.toLowerCase() as Lowercase<TournamentStatus>]}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);
