import React from 'react';
import styles from './Header.module.css';
import { AuthHeader } from './AuthHeader';
import { GuestHeader } from './GuestHeader';
import { useAuthStore } from '@entities/user/model/store';

interface HeaderProps {
    userFullName?: string;
    onAvatarClick: () => void;
    onLogout: () => void;
    onLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ userFullName = '', onAvatarClick, onLogout, onLogin }) => {
    const { isAuth, isAuthInProgress } = useAuthStore();

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                {/* Поки перевірка токену не завершена — нічого не рендеримо в nav-зоні,
                    щоб уникнути флікання між GuestHeader і AuthHeader */}
                {!isAuthInProgress && (
                    isAuth
                        ? <AuthHeader userFullName={userFullName} onAvatarClick={onAvatarClick} onLogout={onLogout} />
                        : <GuestHeader onLogin={onLogin} />
                )}
            </div>
        </header>
    );
};