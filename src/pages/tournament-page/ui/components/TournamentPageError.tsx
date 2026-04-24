
import styles from './TournamentPageError.module.css';

interface TournamentPageErrorProps {
  message: string;
}

/**
 * TournamentPageError — Error display for the tournament page.
 */
export function TournamentPageError({ message }: TournamentPageErrorProps) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.error}>{message}</div>
    </div>
  );
}
