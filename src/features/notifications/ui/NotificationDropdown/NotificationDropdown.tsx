import React from 'react';
import styles from './NotificationDropdown.module.css';
import { NotificationList } from '../NotificationList/NotificationList';
import { useNotificationStore, type FilterType } from '../../model/store';
import { DefaultButton, IconButton, Divider, Tabs } from '@shared/ui';
import { ArrowForwardIcon } from '@shared/ui/icons';

const FILTER_TABS = [
  { id: 'all', label: 'Всі' },
  { id: 'invitations', label: 'Запрошення' },
  { id: 'tournaments', label: 'Турніри' },
];

interface NotificationDropdownProps {
  onClose?: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const { filter, setFilter, markAllAsRead } = useNotificationStore();

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const handleMarkAllRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    markAllAsRead();
  };

  return (
    <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
      <div className={styles.header}>
        <h2 className={styles.title}>Сповіщення</h2>
        <DefaultButton
          className={styles.readAllButton}
          onClick={handleMarkAllRead}
        >
          Прочитати всі
        </DefaultButton>
      </div>

      <Tabs
        className={styles.tabs}
        items={FILTER_TABS}
        activeId={filter}
        onChange={(id) => handleFilterChange(id as FilterType)}
      />

      <Divider />

      <NotificationList />

      <div className={styles.footer}>
        <IconButton
          className={styles.viewAllButton}
          onClick={onClose}
          icon={<ArrowForwardIcon size="sm" className={styles.footerIcon} />}
          iconPosition="right"
        >
          Переглянути всі сповіщення
        </IconButton>
      </div>
    </div>
  );
};
