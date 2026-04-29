import { Divider, Skeleton } from '@shared/ui';
import React from 'react';
import styles from './TournamentTeams.module.css';

const SKELETON_ITEMS = [1, 2, 3, 4, 5];

/**
 * Skeleton for TournamentTeams widget
 */
export const TournamentTeamsSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Команди</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Skeleton.Circle size={32} />
          <Skeleton.Circle size={32} />
        </div>
      </div>

      <Divider />

      <div className={styles.statsRow}>
        <Skeleton width={80} height={14} borderRadius={4} />
      </div>

      <Skeleton.Rect height={20} borderRadius={10} className={styles.progressBarOverride} />

      <div className={styles.teamList}>
        {SKELETON_ITEMS.map((item, i) => (
          <React.Fragment key={item}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0' }}>
              <Skeleton.Circle size={34} />
              <Skeleton
                width={`${Math.floor(Math.random() * (60 - 40) + 40)}%`}
                height={20}
                borderRadius={4}
              />
            </div>
            {i < SKELETON_ITEMS.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
