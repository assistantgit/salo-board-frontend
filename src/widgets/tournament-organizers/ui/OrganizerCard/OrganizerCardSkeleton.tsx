import { Skeleton } from '@shared/ui';
import type React from 'react';
import styles from './OrganizerCard.module.css';

export const OrganizerCardSkeleton: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={styles.categoryCol}>
        <Skeleton width={80} height={16} borderRadius={4} />
      </div>
      <div className={styles.userCol}>
        {/* UserAvatar lg is 48px base, but has 8px margin in its CSS for the glow effect */}
        <Skeleton.Circle size={48} style={{ margin: '8px' }} />
        <div className={styles.userInfo}>
          <Skeleton width={120} height={18} borderRadius={4} style={{ marginBottom: '4px' }} />
          <Skeleton width={80} height={14} borderRadius={4} />
        </div>
      </div>
    </div>
  );
};
