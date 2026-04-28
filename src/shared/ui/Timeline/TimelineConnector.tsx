import styles from './Timeline.module.css';
import type { TimelineNodeStatus } from './TimelineNode';

interface TimelineConnectorProps {
  /** Colour matches the status of the preceding node. */
  status?: TimelineNodeStatus;
  className?: string;
}

export const TimelineConnector = ({ status = 'draft', className = '' }: TimelineConnectorProps) => {
  return (
    <div
      className={[styles.connector, status !== 'draft' ? styles[status] : '', className]
        .filter(Boolean)
        .join(' ')}
    />
  );
};
