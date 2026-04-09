import { useTournaments } from '../lib/useTournaments';
import { Skeleton } from '@shared/ui/skeleton/Skeleton';
import styles from './TournamentCount.module.css';

export const TournamentCount = () => {
  const { tournaments, isLoading } = useTournaments();

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Турніри</span>
      {isLoading ? (
        <Skeleton width={30} height={30} borderRadius={6} />
      ) : (
        <span className={styles.badge}>{tournaments.length}</span>
      )}
    </div>
  );
};



