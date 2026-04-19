import { Skeleton } from '@shared/ui';
import styles from './NavigationSkeleton.module.css';

export const NavigationSkeleton = () => (
  <Skeleton.Provider>
    <div className={styles.container}>
      <Skeleton.Text
        lines={1}
        lineHeight={14}
        lastLineWidth="50%"
        style={{ marginBottom: 6 }}
      />
      <Skeleton.Text
        lines={1}
        lineHeight={20}
        lastLineWidth="80%"
        style={{ marginBottom: 16 }}
      />

      {/* Row skeletons */}
      {[1, 2, 3].map((i) => (
        <div key={i} className={styles.row}>
          <Skeleton.Rect width={48} height={48} borderRadius={12} />
          <div className={styles.rowContent}>
            <Skeleton.Text lines={1} lineHeight={13} lastLineWidth="60%" />
            <Skeleton.Text lines={1} lineHeight={16} lastLineWidth="80%" />
          </div>
        </div>
      ))}
    </div>
  </Skeleton.Provider>
);
