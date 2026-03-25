import type { ReactNode } from 'react';
import { DefaultButton } from './DefaultButton';
import type { DefaultButtonProps } from './DefaultButton';
import styles from './IconButton.module.css';

export interface IconButtonProps extends DefaultButtonProps {
    icon: ReactNode;
    iconPosition?: 'left' | 'right';
}

export const IconButton = ({ children, icon, iconPosition = 'left', className = "", ...props }: IconButtonProps) => {
    return (
        <DefaultButton className={`${styles.iconButton} ${className}`} {...props}>
            {iconPosition === 'left' && <span className={styles.iconWrapper}>{icon}</span>}
            {children && <span className={styles.content}>{children}</span>}
            {iconPosition === 'right' && <span className={styles.iconWrapper}>{icon}</span>}
        </DefaultButton>
    );
};
