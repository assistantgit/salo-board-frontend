import React from 'react';
import styles from './TeamStatsCard.module.css';

interface TeamStatsCardProps {
  value?: string | number;
  label?: string;
  icon: React.ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
}

/**
 * TeamStatsCard widget.
 * Replaces the hardcoded statistics card with a flexible one.
 * 
 * @param value - The value to display (e.g., "16" or "3-5")
 * @param label - The label text (e.g., "Команд")
 * @param icon - The icon component to display
 * @param variant - Visual variant ('default' or 'primary')
 * @param className - Additional CSS class
 */
export const TeamStatsCard: React.FC<TeamStatsCardProps> = ({ 
  value = '--', 
  label = '',
  icon,
  variant = 'default',
  className 
}) => {
  const cardClasses = [
    styles.card,
    styles[`card--${variant}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
};
