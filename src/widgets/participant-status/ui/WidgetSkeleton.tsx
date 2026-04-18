import { Skeleton } from '@shared/ui';
import styles from './ParticipantStatusWidget.module.css';

export const WidgetSkeleton = () => {
  return (
    <Skeleton.Provider>
      <div className={styles.skeletonContainer}>
        {/* Header Skeleton */}
        <Skeleton.Text lines={1} lineHeight={14} lastLineWidth="50%" style={{ marginBottom: 6 }} />
        <Skeleton.Text lines={1} lineHeight={20} lastLineWidth="80%" style={{ marginBottom: 16 }} />

        {/* Rows Skeletons */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 12,
              padding: '8px 0',
              borderBottom: '2px solid var(--widget-border, #f0f0f0)',
            }}
          >
            <Skeleton.Rect width={48} height={48} borderRadius={12} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
              <Skeleton.Text lines={1} lineHeight={13} lastLineWidth="60%" />
              <Skeleton.Text lines={1} lineHeight={16} lastLineWidth="80%" />
            </div>
          </div>
        ))}
      </div>
    </Skeleton.Provider>
  );
};
