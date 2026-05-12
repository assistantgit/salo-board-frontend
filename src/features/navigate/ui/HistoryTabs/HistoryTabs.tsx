import { useHistoryFilterStore } from '@features/history-filter';
import { Tabs } from '@shared/ui';
import type React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './HistoryTabs.module.css';

const HISTORY_TABS = [
  { id: 'submissions', label: 'Мої сабміти' },
  { id: 'tournaments', label: 'Участь у турнірах' },
];

interface HistoryTabsProps {
  variant?: 'header' | 'mobile';
}

export const HistoryTabs: React.FC<HistoryTabsProps> = ({ variant = 'header' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'submissions';

  const handleTabChange = (id: string) => {
    setSearchParams({ tab: id });
    useHistoryFilterStore.getState().reset();
  };

  if (variant === 'mobile') {
    return (
      <div className={styles.mobileContainer}>
        {HISTORY_TABS.map((tab) => (
          <NavLink
            key={tab.id}
            to={`/profile/history?tab=${tab.id}`}
            className={() =>
              `${styles.mobileLink} ${activeTab === tab.id ? styles.mobileLinkActive : ''}`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Tabs
        items={HISTORY_TABS}
        activeId={activeTab}
        onChange={handleTabChange}
        className={styles.tabs}
      />
    </div>
  );
};
