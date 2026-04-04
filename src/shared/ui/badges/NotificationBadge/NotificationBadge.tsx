import React from 'react';
import styles from './NotificationBadge.module.css';

interface NotificationBadgeProps {
  type: 'tournament' | 'invitation' | 'none';
  children?: React.ReactNode;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ type, children }) => {
  if (type === 'none') return null;

  return (
    <div className={`${styles.badge} ${styles[type]}`}>
      {children || (type === 'tournament' ? 'Турнір' : 'Запрошення')}
    </div>
  );
};
