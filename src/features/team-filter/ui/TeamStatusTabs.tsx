import type { FC } from 'react';
import { TEAM_STATUS_TABS } from '../config/tabs';
import type { TeamFilterStatus } from '../model/store';
import { useTeamFilterStore } from '../model/store';
import styles from './TeamStatusTabs.module.css';

export const TeamStatusTabs: FC = () => {
  const status = useTeamFilterStore((s) => s.status);
  const setStatus = useTeamFilterStore((s) => s.setStatus);

  return (
    <div className={styles.tabsWrapper}>
      {TEAM_STATUS_TABS.map((tab) => {
        const isActive = status === tab.id;
        return (
          <button
            key={tab.id}
            className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
            onClick={() => setStatus(tab.id as TeamFilterStatus)}
            type='button'
            aria-pressed={isActive}
          >
            {tab.dotColor && (
              <span
                className={`${styles.dot} ${isActive ? styles.dotHidden : ''}`}
                style={{ backgroundColor: tab.dotColor }}
              />
            )}
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
