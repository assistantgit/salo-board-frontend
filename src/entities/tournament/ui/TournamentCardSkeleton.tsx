import { Skeleton } from '@shared/ui';
import styles from './TournamentCard.module.css';
import headerStyles from './TournamentCardHeader.module.css';
import statsStyles from './TournamentCardStats.module.css';

/**
 * Premium Skeleton for Tournament Card.
 * Restored to original version as requested.
 */
export const TournamentCardSkeleton = () => (
  <article
    className={styles.card}
    style={{ pointerEvents: 'none' }}
    data-testid='tournament-card-skeleton'
  >
    {/* Header Skeleton */}
    <div className={headerStyles.head} style={{ background: 'var(--skeleton-bg, #f5f5f7)' }}>
      <div className={headerStyles.topRow}>
        <div className={headerStyles.titleArea}>
          <Skeleton.Text lines={1} lineHeight={24} lastLineWidth='60%' />
          <Skeleton.Text lines={1} lineHeight={16} lastLineWidth='40%' style={{ marginTop: 6 }} />
        </div>
        <Skeleton.Rect width={100} height={32} borderRadius={20} />
      </div>
    </div>

    {/* Body Skeleton */}
    <div className={styles.body}>
      <div className={statsStyles.stats}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={statsStyles.statItem}>
            <Skeleton.Text lines={1} lineHeight={14} lastLineWidth='50%' />
            <Skeleton.Text lines={1} lineHeight={18} lastLineWidth='80%' style={{ marginTop: 4 }} />
          </div>
        ))}
      </div>

      {/* Progress Bar Skeleton */}
      <div style={{ marginTop: 20 }}>
        <Skeleton.Rect height={10} borderRadius={10} />
      </div>

      {/* CTA Button Skeleton */}
      <div style={{ marginTop: 24 }}>
        <Skeleton.Rect height={52} borderRadius={12} />
      </div>
    </div>
  </article>
);
