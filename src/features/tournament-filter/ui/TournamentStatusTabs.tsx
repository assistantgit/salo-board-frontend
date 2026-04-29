import type React from 'react';
import { STATUS_TABS } from '../config/constants';
import { useTournamentFilterStore } from '../model/store';
import styles from './TournamentStatusTabs.module.css';

/**
 * Status filter tabs for tournament list.
 * SRP: only responsible for rendering and toggling the status filter.
 * ISP: subscribes only to `status` and `setStatus` — granular selectors prevent
 *      unnecessary re-renders when `search` changes in the shared store.
 */
export const TournamentStatusTabs: React.FC = () => {
  // ISP: select only what this component needs — not the whole store object
  const status = useTournamentFilterStore((s) => s.status);
  const setStatus = useTournamentFilterStore((s) => s.setStatus);

  return (
    <div className={styles.tabsWrapper}>
      {STATUS_TABS.map((tab) => {
        const isActive = status === tab.id;
        return (
          <button
            key={tab.id}
            className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
            onClick={() => setStatus(tab.id)}
            type='button'
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
  );
};
