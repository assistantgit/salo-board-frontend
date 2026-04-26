import type { ReactNode } from 'react';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'neutral';
  className?: string;
}

export const StatusBadge = ({ children, variant = 'neutral', className }: StatusBadgeProps) => {
  return (
    <div className={`${styles.badge} ${styles[variant]} ${className}`}>
      {children}
    </div>
  );
};
