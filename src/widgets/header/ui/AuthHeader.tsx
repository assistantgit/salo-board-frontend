import { useAuthStore } from '@entities/user';
import { formatFullName } from '@entities/user/lib/formatFullName';
import { BurgerButton, MobileMenu } from '@features/burger-menu';
import { LogoutButton } from '@features/logout';
import { AdminButton, HistoryTabs, JuryTabs, ProfileTabs } from '@features/navigate';
import { NotificationButton } from '@features/notifications';
import { CurrentUserAvatar } from '@features/user-avatar';
import { Logo } from '@shared/ui';
import type React from 'react';
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

/**
 * AuthHeader component for authenticated users.
 * Autonomous: manages its own state and navigation.
 */
interface AuthHeaderProps {
  mobileMenuExtension?: React.ReactNode;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ mobileMenuExtension }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, userName } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHomePage = pathname === '/';
  const isJuryPage = pathname.startsWith('/jury');
  const isHistoryPage = pathname.startsWith('/profile/history');
  const isProfilePage = pathname === '/profile';
  const targetUser = user || userName;
  const userFullName = targetUser ? formatFullName(targetUser.firstName, targetUser.lastName) : '';

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
        {isJuryPage && <JuryTabs />}
        {isHistoryPage && <HistoryTabs />}
        {isProfilePage && <ProfileTabs />}
        <NotificationButton />
        {isHomePage && <AdminButton className={styles.hideOnMobile} />}
        <CurrentUserAvatar size='md' fullName={userFullName} onNavigate={handleAvatarClick} />
        <LogoutButton className={styles.hideOnMobile} onLogout={closeMenu} />
        <BurgerButton isOpen={menuOpen} onClick={openMenu} />
      </nav>

      <MobileMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        userFullName={userFullName}
        onAvatarClick={handleAvatarClick}
        footer={<LogoutButton onLogout={closeMenu} />}
      >
        {isHomePage && <AdminButton className={styles.mobileAdminBtn} />}
        {isJuryPage && <JuryTabs variant='mobile' />}
        {isHistoryPage && <HistoryTabs variant='mobile' />}
        {isProfilePage && <ProfileTabs variant='mobile' />}
        {mobileMenuExtension}
      </MobileMenu>
    </>
  );
};
