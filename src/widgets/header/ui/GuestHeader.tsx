import { LoginButton } from '@features/login-button';
import { Logo } from '@shared/ui';
import type React from 'react';
import styles from './Header.module.css';

/**
 * GuestHeader component for unauthenticated users.
 * Autonomous: handles its own navigation via LoginButton feature.
 */
export const GuestHeader: React.FC = () => {
  return (
    <>
      <div className={styles.logoSection}>
        <Logo />
      </div>

      <nav className={styles.authActions}>
        <LoginButton />
      </nav>
    </>
  );
};
