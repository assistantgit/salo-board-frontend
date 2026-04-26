import styles from './Timeline.module.css';

/** Visual state for a timeline node. */
export type TimelineNodeStatus = 'draft' | 'active' | 'done';

interface TimelineNodeProps {
  status?: TimelineNodeStatus;
  label?: string;
  subLabel?: string;
  className?: string;
}

export const TimelineNode = ({
  status = 'draft',
  label,
  subLabel,
  className = '',
}: TimelineNodeProps) => {
  return (
    <div className={`${styles.nodeWrapper} ${styles[status]} ${className}`}>
      <div className={styles.node} />
      {(label || subLabel) && (
        <div className={styles.content}>
          {label    && <div className={styles.label}>{label}</div>}
          {subLabel && <div className={styles.subLabel}>{subLabel}</div>}
        </div>
      )}
    </div>
  );
};
