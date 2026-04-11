import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@shared/ui';
import { NotificationButton } from '@features/notifications';
import { LogoutButton } from '@features/logout';
import { CurrentUserAvatar } from '@features/user-avatar';
import { BurgerButton, MobileMenu } from '@features/burger-menu';
import { useAuthStore } from '@entities/user/model/store';
import styles from './Header.module.css';

/**
 * AuthHeader component for authenticated users.
 * Autonomous: manages its own state and navigation.
 */
export const AuthHeader: React.FC = () => {
    const navigate = useNavigate();
    const { user, userName } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);

    const targetUser = user || userName;
    const userFullName = targetUser ? `${targetUser.firstName} ${targetUser.lastName}`.trim() : '';

    const openMenu = useCallback(() => setMenuOpen(true), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const handleAvatarClick = useCallback(() => {
        closeMenu();
        navigate('/profile');
    }, [closeMenu, navigate]);

    return (
        <>
            <div className={styles.logoSection}>
                <Logo />
            </div>

            <nav className={styles.authActions}>
                <NotificationButton />
                <CurrentUserAvatar
                    size="md"
                    fullName={userFullName}
                    onNavigate={handleAvatarClick}
                />
                <LogoutButton onLogout={closeMenu} />
                <BurgerButton
                    isOpen={menuOpen}
                    onClick={openMenu}
                />
            </nav>

            <MobileMenu
                isOpen={menuOpen}
                onClose={closeMenu}
                userFullName={userFullName}
                onAvatarClick={handleAvatarClick}
                footer={
                    <LogoutButton onLogout={closeMenu} />
                }
            />
        </>
    );
};