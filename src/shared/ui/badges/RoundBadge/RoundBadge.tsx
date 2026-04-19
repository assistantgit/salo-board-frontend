import type { FC } from 'react';
import styles from './RoundBadge.module.css';

interface RoundBadgeProps {
  orderIndex: number;
  className?: string;
}

export const RoundBadge: FC<RoundBadgeProps> = ({ orderIndex, className }) => (
  <span className={`${styles.badge} ${className ?? ''}`}>
    #{orderIndex}
  </span>
);
