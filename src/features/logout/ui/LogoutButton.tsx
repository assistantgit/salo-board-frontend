import type React from 'react';
import { IconButton, LogoutIcon } from '@shared/ui';
import styles from './LogoutButton.module.css';

interface LogoutButtonProps {
    onLogout?: () => void;
    className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout, className = '' }) => {
    return (
        <IconButton
            className={`${styles.logoutButton} ${className}`}
            onClick={onLogout}
            aria-label="Вийти"
            iconPosition="left"
            icon={<LogoutIcon className={styles.icon} />}
        >
            Вийти
        </IconButton>
    );
};
