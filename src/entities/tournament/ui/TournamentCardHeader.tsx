import type { TournamentStatus } from '../model/tournament.types';
import styles from './TournamentCardHeader.module.css';

interface TournamentCardHeaderProps {
  title: string;
  organizer: string;
  status: TournamentStatus;
  statusLabel: string;
}

export const TournamentCardHeader = ({
  title,
  organizer,
  status,
  statusLabel,
}: TournamentCardHeaderProps) => (
  <div className={`${styles.head} ${styles[status.toLowerCase() as Lowercase<TournamentStatus>]}`}>
    <div className={styles.topRow}>
      <div className={styles.titleArea}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.organizer}>Організатор: {organizer}</p>
      </div>
      <div className={styles.badge}>
        <span className={styles.dot} />
        {statusLabel}
      </div>
    </div>
  </div>
);
