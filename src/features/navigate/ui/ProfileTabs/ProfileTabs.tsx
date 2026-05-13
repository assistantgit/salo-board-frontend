import { Tabs } from '@shared/ui';
import type React from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProfileTabs.module.css';

const PROFILE_TABS = [
  { id: 'general', label: 'Профіль' },
  { id: 'settings', label: 'Налаштування' },
];

interface ProfileTabsProps {
  variant?: 'header' | 'mobile';
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ variant = 'header' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'general';

  const handleTabChange = (id: string) => {
    setSearchParams({ tab: id });
  };

  if (variant === 'mobile') {
    return (
      <div className={styles.mobileContainer}>
        {PROFILE_TABS.map((tab) => (
          <button
            type='button'
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`${styles.mobileLink} ${activeTab === tab.id ? styles.mobileLinkActive : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Tabs
        items={PROFILE_TABS}
        activeId={activeTab}
        onChange={handleTabChange}
        className={styles.tabs}
      />
    </div>
  );
};
