import type { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './NavButton.module.css';

interface NavIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  className?: string;
}

/**
 * Shared UI component for circular navigation icon buttons.
 */
export const NavIconButton = ({
  icon,
  className = '',
  ...props
}: NavIconButtonProps) => {
  return (
    <button
      className={`${styles['nav-btn']} ${styles['nav-icon-btn']} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};
