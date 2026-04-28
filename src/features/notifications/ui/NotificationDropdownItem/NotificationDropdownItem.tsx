import type { NotificationDto } from '@entities/notification';
import { formatRelativeTime } from '@shared/lib/date';
import { DefaultButton } from '@shared/ui';
import type React from 'react';
import { useNotificationStore } from '../../model/store';
import { NotificationAvatar } from '../NotificationAvatar/NotificationAvatar';
import styles from './NotificationDropdownItem.module.css';

interface NotificationDropdownItemProps {
  notification: NotificationDto;
  index?: number;
}

export const NotificationDropdownItem: React.FC<NotificationDropdownItemProps> = ({
  notification,
  index = 0,
}) => {
  const { performAction } = useNotificationStore();

  const handleRead = () => {
    if (notification.status === 'UR') {
      performAction(notification.id, 'read');
    }
  };

  const handleAccept = (e: React.MouseEvent) => {
    e.stopPropagation();
    performAction(notification.id, 'accept');
  };

  const handleReject = (e: React.MouseEvent) => {
    e.stopPropagation();
    performAction(notification.id, 'reject');
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
      <div className={styles.avatarWrapper}>
        {notification.status === 'UR' && <span className={styles.unreadDot} />}
        <div className={styles.avatarScale}>
          <NotificationAvatar type={notification.type} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.title}>{notification.title}</p>
          {formattedDate && <span className={styles.date}>{formattedDate}</span>}
        </div>
        {notification.message && <p className={styles.message}>{notification.message}</p>}
        {renderActions()}
      </div>
    </div>
  );
};
