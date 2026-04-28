import type { HTMLAttributes, ReactNode } from 'react';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'yellow' | 'green' | 'default';
  children: ReactNode;
}

export const StatusBadge = ({
  variant = 'default',
  children,
  className,
  ...props
}: StatusBadgeProps) => {
  return (
    <div className={`${styles.badge} ${styles[variant]} ${className ?? ''}`} {...props}>
      {children}
    </div>
  );
};
