import { BellIcon, DefaultButton } from '@shared/ui';
import { useEffect, useRef, useState } from 'react';
import { useNotificationStore } from '../model/store';
import styles from './NotificationButton.module.css';
import { NotificationDropdown } from './NotificationDropdown/NotificationDropdown';

export const NotificationButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getUnreadCount, fetchNotifications } = useNotificationStore();
  const unreadCount = getUnreadCount();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <DefaultButton
        className={`${styles.bellButton} ${isOpen ? styles.active : ''}`}
        onClick={toggleOpen}
        aria-label='Notifications'
      >
        <BellIcon size='lg' className={styles.icon} />
        {unreadCount > 0 && <div className={styles.badge}>{unreadCount}</div>}
      </DefaultButton>
      {isOpen && <NotificationDropdown onClose={() => setIsOpen(false)} />}
    </div>
  );
};
