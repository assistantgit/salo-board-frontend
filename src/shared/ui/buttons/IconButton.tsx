import type { ReactNode } from 'react';
import type { DefaultButtonProps } from './DefaultButton';
import { DefaultButton } from './DefaultButton';
import styles from './IconButton.module.css';

export interface IconButtonProps extends DefaultButtonProps {
  icon: ReactNode;
  iconPosition?: 'left' | 'right';
}

export const IconButton = ({
  children,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: IconButtonProps) => {
  return (
    <DefaultButton className={`${styles.iconButton} ${className}`} {...props}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </DefaultButton>
  );
};
