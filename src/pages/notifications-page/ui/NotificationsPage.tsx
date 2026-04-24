import React from 'react';
import { Header } from '@widgets/header';
import { NotificationsFeed } from '@widgets/notifications-feed';
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
      <main className={styles.content}>
        <div className={styles.container}>
          <NotificationsFeed />
        </div>
      </main>
    </div>
  );
};
