import type React from 'react';
import { useEffect } from 'react';
import { useNotificationStore } from '../../model/store';
import { NotificationDropdownItem } from '../NotificationDropdownItem/NotificationDropdownItem';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import styles from './NotificationList.module.css';

interface NotificationListProps {
  variant?: 'feed' | 'dropdown';
}

export const NotificationList: React.FC<NotificationListProps> = ({ variant = 'dropdown' }) => {
  const { notifications, isLoading, filter, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'invitations') return n.type === 'TI' || n.type === 'JI';
    if (filter === 'tournaments') return n.type === 'TS' || n.type === 'SD' || n.type === 'EF';
    if (filter === 'events') return n.type === 'EF' || n.type === 'KT';
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
      {filteredNotifications.map((notification, index) => {
        if (variant === 'feed') {
          return (
            <NotificationItem key={notification.id} notification={notification} index={index} />
          );
        }
        return (
          <NotificationDropdownItem
            key={notification.id}
            notification={notification}
            index={index}
          />
        );
      })}
    </div>
  );
};
