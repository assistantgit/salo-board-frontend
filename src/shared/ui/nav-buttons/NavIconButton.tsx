import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { NavButton } from './NavButton';
import styles from './NavButton.module.css';

interface NavIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: ReactNode;
  className?: string;
}

/**
 * Спеціалізація NavButton для круглих кнопок, що містять лише іконку.
 * Використовує композицію для усунення дублювання логіки.
 */
export const NavIconButton = ({ className = '', ...props }: NavIconButtonProps) => {
  return <NavButton className={`${styles['nav-icon-btn']} ${className}`} {...props} />;
};
