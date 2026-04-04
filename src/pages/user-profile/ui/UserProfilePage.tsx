import { useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@entities/user/model/store';
import { userApi } from '@entities/user';
import { authApi } from '@features/auth';
import { Header } from '@widgets/header';
import { BGLayout } from '@widgets/bg-layout';
import { UserDetails } from '@widgets/user-details';
import type { BGConfig } from '@shared/model';
import styles from './UserProfilePage.module.css';

const PROFILE_BG_CONFIG: BGConfig = {
  circles: [
  ],
};

export function UserProfilePage() {
  const navigate = useNavigate();
  const { user, userName, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    if (!user) {
      userApi
        .getProfile()
        .then((profile) => {
          setUser(profile);
        })
        .catch((err) => {
          console.error('Failed to load profile:', err);
        });
    }
  }, [user, setUser]);

  const userFullName = useMemo(
    () => (userName ? `${userName.firstName} ${userName.lastName}`.trim() : ''),
    [userName],
  );

  const handleLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleAvatarClick = useCallback(() => {
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearUser();
      navigate('/login');
    }
  }, [clearUser, navigate]);

  if (!userName && !user) return null;

  return (
    <div className={styles.page}>
      <Header
        userFullName={userFullName}
        onAvatarClick={handleAvatarClick}
        onLogout={handleLogout}
        onLogin={handleLogin}
      />

      <BGLayout bgConfig={PROFILE_BG_CONFIG} className={styles.layout}>
        <main className={styles.main}>
          <div className={styles.heading}>
            <h1 className={styles.title}>Профіль</h1>
            <p className={styles.subtitle}>Особиста інформація та активність</p>
          </div>

          <div className={styles.content}>
            <UserDetails />
          </div>
        </main>
      </BGLayout>
    </div>
  );
}
