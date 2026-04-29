import type { ReactNode } from 'react';
import styles from './InfoRow.module.css';

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
}

export const InfoRow = ({ icon, label, value, className }: InfoRowProps) => {
  return (
    <div className={`${styles.row} ${className ?? ''}`}>
      <span className={styles.icon} aria-hidden='true'>
        {icon}
      </span>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value || '—'}</span>
    </div>
  );
};
