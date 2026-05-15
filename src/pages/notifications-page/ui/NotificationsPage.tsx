import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { NotificationsFeed } from '@widgets/notifications-feed';
import type React from 'react';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import styles from './NotificationsPage.module.css';

/**
 * NotificationsPage.
 * Composition Layer (FSD Page Layer).
 * Displays all notifications with search, filter tabs, and month grouping.
 */
export const NotificationsPage: React.FC = () => {
  return (
    <div className={styles.root}>
      <Header />
      <BGLayout bgConfig={BG_LAYOUT_CONFIG} className={styles.bgLayout}>
        <main className={styles.content}>
          <div className={styles.container}>
            <NotificationsFeed />
          </div>
        </main>
      </BGLayout>
    </div>
  );
};
