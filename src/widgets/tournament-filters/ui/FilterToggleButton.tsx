import { FilterIcon } from '@shared/ui/icons';
import type React from 'react';
import styles from './FilterToggleButton.module.css';

interface FilterToggleButtonProps {
  onClick: () => void;
  isActive?: boolean;
  className?: string;
  count?: number;
}

/**
 * Modern circular toggle button to trigger the mobile filter drawer.
 * Displays an optional count badge if some filters are active.
 */
export const FilterToggleButton: React.FC<FilterToggleButtonProps> = ({
  onClick,
  isActive,
  className = '',
  count,
}) => {
  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ''} ${className}`}
      onClick={onClick}
      type='button'
      aria-label='Налаштування фільтрів'
    >
      <FilterIcon size={28} />
      {count !== undefined && count > 0 && <span className={styles.badge}>{count}</span>}
    </button>
  );
};
