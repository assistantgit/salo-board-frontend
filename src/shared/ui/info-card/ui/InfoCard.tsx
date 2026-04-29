import type React from 'react';
import styles from './InfoCard.module.css';

interface InfoCardProps {
  value?: string | number;
  label?: string;
  icon: React.ReactNode;
  variant?: 'default' | 'primary';
  subtitle?: string;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  value = '—',
  label = '',
  icon,
  variant = 'default',
  subtitle,
  className,
}) => {
  const cardClasses = [styles.card, styles[`card--${variant}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>
    </div>
  );
};
