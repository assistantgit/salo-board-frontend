import { useAuthStore } from '@entities/user';
import { authApi } from '@features/auth';
import { IconButton, LogoutIcon } from '@shared/ui';
import type React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LogoutButton.module.css';

interface LogoutButtonProps {
  onLogout?: () => void;
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout, className = '' }) => {
  const navigate = useNavigate();
  const { clearUser } = useAuthStore();

  const handleLogout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearUser();
      onLogout?.();
      navigate('/login');
    }
  }, [onLogout, clearUser, navigate]);

  return (
    <IconButton
      className={`${styles.logoutButton} ${className}`}
      onClick={handleLogout}
      aria-label='Вийти'
      iconPosition='left'
      icon={<LogoutIcon className={styles.icon} />}
    >
      Вийти
    </IconButton>
  );
};
