import { SUBMISSION_HISTORY_TABS } from '@entities/submission';
import { TOURNAMENT_HISTORY_TABS } from '@entities/tournament';
import type { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { HistoryFilterStatus } from '../model/store';
import { useHistoryFilterStore } from '../model/store';
import styles from './HistoryStatusTabs.module.css';

export const HistoryStatusTabs: FC = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'submissions';
  const status = useHistoryFilterStore((s) => s.status);
  const setStatus = useHistoryFilterStore((s) => s.setStatus);

  const tabs = activeTab === 'submissions' ? SUBMISSION_HISTORY_TABS : TOURNAMENT_HISTORY_TABS;

  return (
    <div className={styles.tabsWrapper}>
      {tabs.map((tab) => {
        const isActive = status === tab.id;
        return (
          <button
            key={tab.id}
            className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
            onClick={() => setStatus(tab.id as HistoryFilterStatus)}
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
