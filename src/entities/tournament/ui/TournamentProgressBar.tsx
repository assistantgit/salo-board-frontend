import type { TournamentStatus } from '../model/tournament.types';
import styles from './TournamentProgressBar.module.css';

interface TournamentProgressBarProps {
  progress: number;
  status: TournamentStatus;
}

export const TournamentProgressBar = ({ progress, status }: TournamentProgressBarProps) => (
  <div className={styles.wrap}>
    <span className={styles.label}>Виконання турніру</span>


    <div className={styles.track}>
      <div
        className={`${styles.fill} ${styles[status.toLowerCase() as Lowercase<TournamentStatus>]}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);
