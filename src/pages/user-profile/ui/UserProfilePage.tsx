import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { ProfileHistory } from '@widgets/profile-history';
import { ProfileSubmissions } from '@widgets/profile-submissions';
import { UserDetails } from '@widgets/user-details';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import styles from './UserProfilePage.module.css';

export function UserProfilePage() {
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
            <UserDetails />
            <div className={styles.historySection}>
              <ProfileHistory />
              <ProfileSubmissions />
            </div>
          </div>
        </main>
      </BGLayout>
    </div>
  );
}
