import { Skeleton } from '@shared/ui/skeleton/Skeleton';
import styles from './TournamentCount.module.css';

export interface TournamentCountProps {
  count: number;
}

/**
 * Presentational counter for the tournament list.
 * SRP: only renders count — no data fetching.
 *
 * ISP: subscribes only to `count` via props.
 */
export const TournamentCount = ({ count }: TournamentCountProps) => {
  const isLoading = count === -1;

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Турніри&nbsp;</span>
      {isLoading ? (
        <Skeleton width={30} height={30} borderRadius={6} />
      ) : (
        <span className={styles.badge}>{count}</span>
      )}
    </div>
  );
};
