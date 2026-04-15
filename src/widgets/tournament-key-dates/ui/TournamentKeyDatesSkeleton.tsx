import styles from './TournamentKeyDates.module.css';
import { Skeleton } from '@shared/ui';

/**
 * Skeleton for the TournamentKeyDates widget.
 * Mirrors the structure of TournamentKeyDates.tsx.
 */
export const TournamentKeyDatesSkeleton = () => {
  return (
    <aside className={styles.card}>
      <div className={styles.header}>
        <Skeleton.Text lines={1} lineHeight={24} style={{ width: 140 }} />
      </div>
      <div className={styles.headerDivider} />

      <ul className={styles.list}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <li key={idx} className={styles.row}>
            {/* Dot skeleton */}
            <Skeleton.Circle size={12} style={{ marginRight: 8 }} />

            {/* Label skeleton */}
            <Skeleton.Text lines={1} lineHeight={16} style={{ width: 120 }} />

            {/* Date skeleton (spacer to push to right) */}
            <div style={{ flexGrow: 1 }} />
            <Skeleton.Text lines={1} lineHeight={16} style={{ width: 60 }} />
          </li>
        ))}
      </ul>
    </aside>
  );
};
