import type React from 'react';
import type { ReactNode } from 'react';
import styles from './StatusInfoCard.module.css';

export type StatusInfoCardVariant = 'primary' | 'success' | 'warning';

interface StatusInfoCardProps {
  /** Title of the card (e.g., "Останнє оновлення") */
  title: string;
  /** Main value to display (e.g., date and time) */
  value: string;
  /** Icon component to render */
  icon: ReactNode;
  /** Visual variant affecting icon colors */
  variant?: StatusInfoCardVariant;
  /** Optional extra class name */
  className?: string;
}

/**
 * StatusInfoCard - A base component for displaying status information
 * with an icon, title, and value.
 */
export const StatusInfoCard: React.FC<StatusInfoCardProps> = ({
  title,
  value,
  icon,
  variant = 'primary',
  className = '',
}) => {
  const containerClasses = [styles.statusCard, styles[`statusCard--${variant}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
};
