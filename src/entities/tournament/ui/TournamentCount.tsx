import { Skeleton } from '@shared/ui/skeleton/Skeleton';
import styles from './TournamentCount.module.css';

export interface TournamentCountProps {
  count: number;
  label?: string;
}

/**
 * Presentational counter for a list.
 * SRP: only renders count — no data fetching.
 */
export const TournamentCount = ({ count, label = 'Турніри' }: TournamentCountProps) => {
  const isLoading = count === -1;

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>{label}&nbsp;</span>
      {isLoading ? (
        <Skeleton width={30} height={30} borderRadius={6} />
      ) : (
        <span className={styles.badge}>{count}</span>
      )}
    </div>
  );
};
