import { Skeleton } from '@shared/ui';
import statsStyles from './components/HeroStats.module.css';
import styles from './TournamentHero.module.css';

/**
 * Skeleton for the TournamentHero widget.
 * Mirrors the structure of TournamentHero.tsx and HeroStats.tsx.
 */
export const TournamentHeroSkeleton = () => {
  return (
    <div className={styles.heroContainer}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Status Badge Skeleton */}
        <Skeleton.Rect width={120} height={28} borderRadius={100} />

        {/* Title Skeleton */}
        <Skeleton.Text lines={1} lineHeight={40} style={{ width: '60%' }} />
      </header>

      <div className={styles.divider} />

      <div className={statsStyles.statsRow}>
        {/* ПОЧАТОК */}
        <div className={statsStyles.statItem}>
          <Skeleton width={60} height={16} borderRadius={4} />
          <Skeleton width={90} height={20} borderRadius={4} />
        </div>

        {/* РЕЄСТРАЦІЯ ДО */}
        <div className={statsStyles.statItem}>
          <Skeleton width={120} height={16} borderRadius={4} />
          <Skeleton width={90} height={20} borderRadius={4} />
        </div>

        {/* КОМАНДИ */}
        <div className={statsStyles.statItem}>
          <Skeleton width={75} height={16} borderRadius={4} />
          <Skeleton width={110} height={20} borderRadius={4} />
        </div>

        {/* МАКС. КОМАНД */}
        <div className={statsStyles.statItem}>
          <Skeleton width={110} height={16} borderRadius={4} />
          <Skeleton width={30} height={20} borderRadius={4} />
        </div>
      </div>

      <div className={styles.actions}>
        <Skeleton.Rect width={180} height={48} borderRadius={12} />
        <Skeleton.Rect width={220} height={48} borderRadius={12} />
      </div>
    </div>
  );
};
