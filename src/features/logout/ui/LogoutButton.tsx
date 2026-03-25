import type React from 'react';
import { IconButton, LogoutIcon } from '@shared/ui';
import styles from './LogoutButton.module.css';

interface LogoutButtonProps {
    onLogout?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
    return (
        <IconButton
            className={styles.logoutButton}
            onClick={onLogout}
            aria-label="Вийти"
            iconPosition="left"
            icon={<LogoutIcon className={styles.icon} />}
        >
            <span className={styles.text}>Вийти</span>
        </IconButton>
    );
};
