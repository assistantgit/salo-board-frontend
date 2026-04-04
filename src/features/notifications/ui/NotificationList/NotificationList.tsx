import React, { useEffect } from 'react';
import styles from './NotificationList.module.css';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { useNotificationStore } from '../../model/store';

export const NotificationList: React.FC = () => {
  const { notifications, isLoading, filter, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'invitations') return n.type === 'TI' || n.type === 'JI';
    if (filter === 'tournaments') return n.type === 'TS' || n.type === 'SD' || n.type === 'EF';
    return true;
  });

  if (isLoading && notifications.length === 0) {
    return <div className={styles.empty}>Завантаження...</div>;
  }

  if (filteredNotifications.length === 0) {
    return <div className={styles.empty}>Сповіщень немає</div>;
  }

  return (
    <div className={styles.list}>
      {filteredNotifications.map((notification, index) => (
        <NotificationItem 
          key={notification.id} 
          notification={notification} 
          index={index}
        />
      ))}
    </div>
  );
};
