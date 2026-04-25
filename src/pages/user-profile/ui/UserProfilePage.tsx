import { useEffect } from 'react';
import { useAuthStore } from '@entities/user';
import { userApi } from '@entities/user';
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
  const { user, userName, setUser } = useAuthStore();

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



  if (!userName && !user) return null;

  return (
    <div className={styles.page}>
      <Header />

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
