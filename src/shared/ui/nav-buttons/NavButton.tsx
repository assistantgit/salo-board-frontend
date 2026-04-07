import type { ReactNode } from 'react';
import { IconButton } from '../buttons/IconButton';
import styles from './NavButton.module.css';

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export const NavButton = ({
  children,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: NavButtonProps) => {
  return (
    <IconButton
      icon={icon}
      iconPosition={iconPosition}
      className={`${styles['nav-btn']} ${className}`}
      {...props}
    >
      {children}
    </IconButton>
  );
};
