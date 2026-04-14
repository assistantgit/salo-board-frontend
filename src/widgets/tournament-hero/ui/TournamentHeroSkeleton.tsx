import React from 'react';
import styles from './TournamentHero.module.css';
import { Skeleton } from '@shared/ui';

/**
 * Skeleton for the TournamentHero widget.
 * Mirrors the structure of TournamentHero.tsx.
 */
export const TournamentHeroSkeleton = () => {
  return (
    <div className={styles.heroContainer}>
      <header className={styles.heroHeader}>
        {/* Status Badge Skeleton */}
        <Skeleton.Rect width={120} height={28} borderRadius={100} className={styles.statusBadge} />

        {/* Title Skeleton */}
        <Skeleton.Text lines={1} lineHeight={40} className={styles.title} style={{ width: '60%' }} />
      </header>

      <div className={styles.divider} />

      <div className={styles.statsRow}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.statItem}>
            <Skeleton.Text lines={1} lineHeight={14} style={{ width: 60, marginBottom: 8 }} />
            <Skeleton.Text lines={1} lineHeight={20} style={{ width: 100 }} />
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <Skeleton.Rect width={180} height={48} borderRadius={12} />
        <Skeleton.Rect width={220} height={48} borderRadius={12} />
      </div>
    </div>
  );
};
