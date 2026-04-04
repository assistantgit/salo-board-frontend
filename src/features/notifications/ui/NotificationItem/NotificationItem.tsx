import React from 'react';
import styles from './NotificationItem.module.css';
import { NotificationBadge, DefaultButton } from '@shared/ui';
import { NotificationAvatar } from '../NotificationAvatar/NotificationAvatar';
import type { NotificationDto, NotificationType } from '@entities/notification';
import { useNotificationStore } from '../../model/store';

interface NotificationItemProps {
  notification: NotificationDto;
  index?: number;
}

const mapTypeToBadge = (type: NotificationType): 'tournament' | 'invitation' | 'none' => {
  switch (type) {
    case 'JI':
    case 'TI':
      return 'invitation';
    case 'TS':
    case 'SD':
    case 'EF':
      return 'tournament';
    default:
      return 'none';
  }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, index = 0 }) => {
  const { performAction } = useNotificationStore();

  const handleAccept = (e: React.MouseEvent) => {
    e.stopPropagation();
    performAction(notification.id, 'accept');
  };

  const handleReject = (e: React.MouseEvent) => {
    e.stopPropagation();
    performAction(notification.id, 'reject');
  };

  const handleRead = () => {
    if (notification.status === 'UR') {
      performAction(notification.id, 'read');
    }
  };

  const renderActions = () => {
    if (notification.actionType === 'YN') {
      return (
        <div className={styles.actions}>
          <DefaultButton
            className={styles.acceptButton}
            onClick={handleAccept}
          >
            Прийняти
          </DefaultButton>
          <DefaultButton
            className={styles.rejectButton}
            onClick={handleReject}
          >
            Відхилити
          </DefaultButton>
        </div>
      );
    }

    if (notification.actionUrl) {
      return (
        <div className={styles.actions}>
          <DefaultButton
            className={styles.acceptButton}
            onClick={() => window.open(notification.actionUrl, '_blank')}
          >
            Перейти
          </DefaultButton>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`${styles.item} ${notification.status === 'UR' ? styles.unread : ''}`}
      onClick={handleRead}
      style={{ '--index': index } as React.CSSProperties}
    >
      <div className={styles.header}>
        <NotificationAvatar initials="АС" />
        <div className={styles.content}>
          <div className={styles.topRow}>
            <NotificationBadge type={mapTypeToBadge(notification.type)} />
            <span className={styles.time}>{notification.howLongActive}</span>
          </div>
          <p className={styles.title}>{notification.title}</p>
          <p className={styles.message}>{notification.message}</p>
          {renderActions()}
        </div>
      </div>
    </div>
  );
};
