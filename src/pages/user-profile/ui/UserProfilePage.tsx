import { useAuthStore } from '@entities/user';
import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { ProfileHistory } from '@widgets/profile-history';
import { ProfileSettingsForm } from '@widgets/profile-settings';
import { ProfileSubmissions } from '@widgets/profile-submissions';
import { UserDetails } from '@widgets/user-details';
import { UserTeamsWidget } from '@widgets/user-teams';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';

import styles from './UserProfilePage.module.css';

export function UserProfilePage() {
  const { fetchUser } = useAuthStore();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'general';

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className={styles.page}>
      <Header />

      <BGLayout bgConfig={BG_LAYOUT_CONFIG} className={styles.layout}>
        <main className={styles.main}>
          <div className={styles.heading}>
            <h1 className={styles.title}>Профіль</h1>
            <p className={styles.subtitle}>Особиста інформація та активність</p>
          </div>

          <div className={styles.content}>
            {activeTab === 'general' ? (
              <div className={styles.profileSection}>
                <UserDetails />
                <div className={styles.historySection}>
                  <UserTeamsWidget />
                  <ProfileHistory />
                  <ProfileSubmissions />
                </div>
              </div>
            ) : (
              <div className={styles.settingsSection}>
                <ProfileSettingsForm />
              </div>
            )}
          </div>
        </main>
      </BGLayout>
    </div>
  );
}
