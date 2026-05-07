import type { TournamentVariant } from '@entities/tournament';
import type { FC } from 'react';
import { useMemo } from 'react';
import { STATUS_TABS } from '../config/constants';
import { useTournamentFilterStore } from '../model/store';
import styles from './TournamentStatusTabs.module.css';

/**
 * Status filter tabs for tournament list.
 */
interface TournamentStatusTabsProps {
  variant?: TournamentVariant;
}

export const TournamentStatusTabs: FC<TournamentStatusTabsProps> = ({ variant = 'default' }) => {
  const status = useTournamentFilterStore((s) => s.status);
  const setStatus = useTournamentFilterStore((s) => s.setStatus);

  const filteredTabs = useMemo(() => {
    if (variant === 'admin') return STATUS_TABS;
    // Default view shows All, Registration Open, In Progress, Finished, Not Started (exclude AR)
    return STATUS_TABS.filter((tab) => tab.id !== 'AR');
  }, [variant]);

  return (
    <div className={styles.tabsWrapper}>
      {filteredTabs.map((tab) => {
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
