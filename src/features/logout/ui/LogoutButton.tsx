import type React from 'react';
import { useCallback } from 'react';
import { IconButton, LogoutIcon } from '@shared/ui';
import styles from './LogoutButton.module.css';
import { authApi } from '@features/auth';

interface LogoutButtonProps {
    onLogout?: () => void;
    className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout, className = '' }) => {
    const handleLogout = useCallback(async () => {
        try {
            await authApi.logout();
            onLogout?.();
        } catch (error) {
            onLogout?.();
        }
    }, [onLogout]);

    return (
        <IconButton
            className={`${styles.logoutButton} ${className}`}
            onClick={handleLogout}
            aria-label="Вийти"
            iconPosition="left"
            icon={<LogoutIcon className={styles.icon} />}
        >
            Вийти
        </IconButton>
    );
};
