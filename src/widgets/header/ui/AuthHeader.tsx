import React from 'react';
import { Logo } from '@shared/ui';
import { NotificationButton } from '@features/notifications';
import { LogoutButton } from '@features/logout';
import styles from './Header.module.css';

interface AuthHeaderProps {
    onLogout: () => void;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ onLogout }) => {
    return (
        <>
            <div className={styles.logoSection}>
                <Logo />
            </div>

            <nav className={styles.authActions}>
                <NotificationButton />
                <LogoutButton onLogout={onLogout} />
            </nav>
        </>
    );
};