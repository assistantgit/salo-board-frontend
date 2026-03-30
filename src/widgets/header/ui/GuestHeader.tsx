import React from 'react';
import { Logo } from '@shared/ui';
import { LoginButton } from '@features/login-button';
import styles from './Header.module.css';

interface GuestHeaderProps {
    onLogin: () => void;
}

export const GuestHeader: React.FC<GuestHeaderProps> = ({ onLogin }) => {
    return (
        <>
            <div className={styles.logoSection}>
                <Logo />
            </div>

            <nav className={styles.authActions}>
                <LoginButton onClick={onLogin} />
            </nav>
        </>
    );
};