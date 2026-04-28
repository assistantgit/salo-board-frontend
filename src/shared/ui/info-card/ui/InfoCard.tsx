import type React from 'react';
import styles from './InfoCard.module.css';

interface InfoCardProps {
  value?: string | number;
  label?: string;
  icon: React.ReactNode;
  variant?: 'default' | 'primary';
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  value = '—',
  label = '',
  icon,
  variant = 'default',
  className,
}) => {
  const cardClasses = [styles.card, styles[`card--${variant}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
};
