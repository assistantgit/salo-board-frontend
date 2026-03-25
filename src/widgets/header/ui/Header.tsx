import React from 'react';
import styles from './Header.module.css';
import { AuthHeader } from './AuthHeader';
import { GuestHeader } from './GuestHeader';

interface HeaderProps {
    isAuth: boolean;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAuth, onLogout }) => {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                {isAuth
                    ? <AuthHeader onLogout={onLogout} />
                    : <GuestHeader />
                }
            </div>
        </header>
    );
};