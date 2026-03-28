import React from 'react';
import styles from './Header.module.css';
import { AuthHeader } from './AuthHeader';
import { GuestHeader } from './GuestHeader';

interface HeaderProps {
    isAuth: boolean;
    userFullName?: string;
    onAvatarClick: () => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAuth, userFullName = '', onAvatarClick, onLogout }) => {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                {isAuth
                    ? <AuthHeader userFullName={userFullName} onAvatarClick={onAvatarClick} onLogout={onLogout} />
                    : <GuestHeader />
                }
            </div>
        </header>
    );
};