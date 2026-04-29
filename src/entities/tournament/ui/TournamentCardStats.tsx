import styles from './TournamentCardStats.module.css';

interface TournamentCardStatsProps {
  dateLabel: string;
  dateValue: string;
  teamsCount: number | null;
  roundsCount: number;
}

export const TournamentCardStats = ({
  dateLabel,
  dateValue,
  teamsCount,
  roundsCount,
}: TournamentCardStatsProps) => (
  <div className={styles.row}>
    <div className={styles.stat}>
      <span className={styles.label}>{dateLabel}</span>
      <span className={styles.value}>{dateValue}</span>
    </div>
    <div className={styles.stat}>
      <span className={styles.label}>Команди</span>
      <span className={styles.value}>{teamsCount !== null ? `${teamsCount} команд` : '—'}</span>
    </div>
    <div className={styles.stat}>
      <span className={styles.label}>Завдань</span>
      <span className={styles.value}>{roundsCount} Завдань</span>
    </div>
  </div>
);
