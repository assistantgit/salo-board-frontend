import { useAuthStore } from '@entities/user';
import type React from 'react';
import { AuthHeader } from './AuthHeader';
import { GuestHeader } from './GuestHeader';
import styles from './Header.module.css';

/**
 * Header Widget.
 * Autonomous self-contained UI block.
 * Composes AuthHeader or GuestHeader based on authentication state from the store.
 */
export interface HeaderProps {
  mobileMenuExtension?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ mobileMenuExtension }) => {
  const { isAuth, isAuthInProgress } = useAuthStore();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {!isAuthInProgress &&
          (isAuth ? <AuthHeader mobileMenuExtension={mobileMenuExtension} /> : <GuestHeader />)}
      </div>
    </header>
  );
};
