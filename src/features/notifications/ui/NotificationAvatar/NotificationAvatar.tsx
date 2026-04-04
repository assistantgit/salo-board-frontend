import React from 'react';
import styles from './NotificationAvatar.module.css';

interface NotificationAvatarProps {
  initials?: string;
  avatarUrl?: string;
}

export const NotificationAvatar: React.FC<NotificationAvatarProps> = ({ initials, avatarUrl }) => {
  return (
    <div className={styles.avatar}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="User avatar" className={styles.image} />
      ) : (
        <span className={styles.initials}>{initials || 'AC'}</span>
      )}
    </div>
  );
};
