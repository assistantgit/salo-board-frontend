import type { NotificationDto, NotificationType } from '@entities/notification';
import { NOTIFICATION_FILTER_TABS } from '@entities/notification';
import { useNotificationStore } from '@features/notifications/model/store';
import { NotificationItem } from '@features/notifications/ui/NotificationItem/NotificationItem';
import { SearchBar } from '@shared/ui';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import styles from './NotificationsFeed.module.css';

const groupByMonth = (
  items: NotificationDto[],
): Array<{ label: string; items: NotificationDto[] }> => {
  const groups: Record<string, NotificationDto[]> = {};
  items.forEach((n) => {
    let label = 'Без дати';
    if (n.createdAt) {
      try {
        const date = new Date(n.createdAt);
        label = date.toLocaleDateString('uk-UA', { month: 'long', year: 'numeric' }).toUpperCase();
      } catch {
        label = 'Без дати';
      }
    }
    if (!groups[label]) groups[label] = [];
    groups[label].push(n);
  });
  return Object.entries(groups).map(([label, items]) => ({ label, items }));
};

const FILTER_MAP: Record<string, NotificationType[]> = {
  invitations: ['TI', 'JI'],
  reminders: ['SD'],
  roster: ['KT'],
  events: ['EF', 'TS'],
};

const filterByType = (notifications: NotificationDto[], filter: string): NotificationDto[] => {
  const allowedTypes = FILTER_MAP[filter];
  if (!allowedTypes) return notifications;
  return notifications.filter((n) => allowedTypes.includes(n.type));
};

export const NotificationsFeed: React.FC = () => {
  const { notifications, isLoading, fetchNotifications } = useNotificationStore();
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const filtered = useMemo(() => {
    let result = filterByType(notifications, filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) => n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q),
      );
    }
    return result;
  }, [notifications, filter, search]);

  const groups = useMemo(() => groupByMonth(filtered), [filtered]);

  if (isLoading && notifications.length === 0) {
    return <div className={styles.empty}>Завантаження...</div>;
  }

  let globalIndex = 0;

  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <h1 className={styles.title}>Всі повідомлення</h1>
      </div>

      <SearchBar
        className={styles.search}
        placeholder='Пошук повідомлень'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Pill-style filter tabs — same visual language as homepage tournament filters */}
      <div className={styles.tabsWrapper}>
        {NOTIFICATION_FILTER_TABS.map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              type='button'
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              onClick={() => setFilter(tab.id)}
              aria-pressed={isActive}
            >
              {tab.dotColor && (
                <span
                  className={`${styles.dot} ${isActive ? styles.dotHidden : ''}`}
                  style={{ backgroundColor: tab.dotColor }}
                  aria-hidden={isActive}
                />
              )}
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {groups.length === 0 ? (
        <div className={styles.empty}>Сповіщень немає</div>
      ) : (
        <div className={styles.groups}>
          {groups.map((group) => (
            <section key={group.label} className={styles.group}>
              <div className={styles.groupHeader}>
                <span className={styles.groupLabel}>{group.label}</span>
                <hr className={styles.groupLine} />
              </div>
              <div className={styles.groupItems}>
                {group.items.map((notification) => {
                  const idx = globalIndex++;
                  return (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      index={idx}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};
