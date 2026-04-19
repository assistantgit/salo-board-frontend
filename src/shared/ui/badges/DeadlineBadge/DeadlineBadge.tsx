import type { FC } from 'react';
import { formatDeadline } from '@shared/lib/date/formatDeadline';
import styles from './DeadlineBadge.module.css';

interface DeadlineBadgeProps {
  deadline: string | Date | undefined;
  className?: string;
}

export const DeadlineBadge: FC<DeadlineBadgeProps> = ({ deadline, className }) => {
  const text = formatDeadline(deadline);

  return (
    <span className={`${styles.badge} ${className ?? ''}`}>
      {text}
    </span>
  );
};
