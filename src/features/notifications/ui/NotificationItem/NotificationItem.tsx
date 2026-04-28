import type { NotificationDto, NotificationType } from '@entities/notification';
import { formatRelativeTime } from '@shared/lib/date';
import { DefaultButton, NotificationBadge } from '@shared/ui';
import type React from 'react';
import { useNotificationStore } from '../../model/store';
import { NotificationAvatar } from '../NotificationAvatar/NotificationAvatar';
import styles from './NotificationItem.module.css';

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

interface NotificationItemProps {
  notification: NotificationDto;
  index?: number;
}

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
          <DefaultButton className={styles.acceptButton} onClick={handleAccept}>
            Прийняти
          </DefaultButton>
          <DefaultButton className={styles.rejectButton} onClick={handleReject}>
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

  const formattedDate = formatRelativeTime(notification.createdAt);

  return (
    <div
      className={styles.item}
      data-status={notification.status}
      onClick={handleRead}
      style={{ '--index': index } as React.CSSProperties}
    >
      {notification.status === 'UR' && <span className={styles.unreadDot} />}
      <NotificationAvatar type={notification.type} />
      <div className={styles.content}>
        <div className={styles.topRow}>
          <div className={styles.topLeft}>
            <NotificationBadge type={mapTypeToBadge(notification.type)} />
          </div>
          {formattedDate && <span className={styles.date}>{formattedDate}</span>}
        </div>
        <p className={styles.title}>{notification.title}</p>
        {notification.message && <p className={styles.message}>{notification.message}</p>}
        {renderActions()}
      </div>
    </div>
  );
};
