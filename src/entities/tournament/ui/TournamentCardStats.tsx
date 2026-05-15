import styles from './TournamentCardStats.module.css';

interface TournamentCardStatsProps {
  dateLabel: string;
  dateValue: string;
  regRange: string;
  durationRange: string;
}

export const TournamentCardStats = ({
  dateLabel,
  dateValue,
  regRange,
  durationRange,
}: TournamentCardStatsProps) => (
  <div className={styles.row}>
    <div className={styles.stat}>
      <span className={styles.label}>{dateLabel}</span>
      <span className={styles.value}>{dateValue}</span>
    </div>
    <div className={styles.stat}>
      <span className={styles.label}>Реєстрація</span>
      <span className={styles.value}>{regRange}</span>
    </div>
    <div className={styles.stat}>
      <span className={styles.label}>Тривалість</span>
      <span className={styles.value}>{durationRange}</span>
    </div>
  </div>
);
