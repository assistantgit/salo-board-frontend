import React from 'react';
import { useAuthStore } from '@entities/user/model/store';
import { AuthHeader } from './AuthHeader';
import { GuestHeader } from './GuestHeader';
import styles from './Header.module.css';

/**
 * Header Widget.
 * Autonomous self-contained UI block.
 * Composes AuthHeader or GuestHeader based on authentication state from the store.
 */
export const Header: React.FC = () => {
    const { isAuth, isAuthInProgress } = useAuthStore();

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                {!isAuthInProgress && (
                    isAuth ? <AuthHeader /> : <GuestHeader />
                )}
            </div>
        </header>
    );
};