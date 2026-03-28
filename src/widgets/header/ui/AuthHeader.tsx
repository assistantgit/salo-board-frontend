import React, { useState, useCallback } from 'react';
import { Logo } from '@shared/ui';
import { NotificationButton } from '@features/notifications';
import { LogoutButton } from '@features/logout';
import { CurrentUserAvatar } from '@features/user-avatar';
import { BurgerButton, MobileMenu } from '@features/burger-menu';
import styles from './Header.module.css';

interface AuthHeaderProps {
    userFullName: string;
    onAvatarClick: () => void;
    onLogout: () => void;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ userFullName, onAvatarClick, onLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = useCallback(() => setMenuOpen(true), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const handleLogout = useCallback(() => {
        closeMenu();
        onLogout();
    }, [closeMenu, onLogout]);

    const handleAvatarClick = useCallback(() => {
        closeMenu();
        onAvatarClick();
    }, [closeMenu, onAvatarClick]);

    return (
        <>
            <div className={styles.logoSection}>
                <Logo />
            </div>

            <div style={{ flex: 1, minWidth: '12px' }} />

            <nav className={styles.authActions}>
                <NotificationButton />
                <CurrentUserAvatar
                    size="md"
                    fullName={userFullName}
                    onNavigate={onAvatarClick}
                />
                <LogoutButton onLogout={onLogout} />
                <BurgerButton
                    isOpen={menuOpen}
                    onClick={openMenu}
                    className={styles.burgerWrapper}
                />
            </nav>

            <MobileMenu
                isOpen={menuOpen}
                onClose={closeMenu}
                userFullName={userFullName}
                onAvatarClick={handleAvatarClick}
                footer={
                    <LogoutButton onLogout={handleLogout} />
                }
            >
                {/* NotificationButton removed per previous USER_REQUEST */}
            </MobileMenu>
        </>
    );
};