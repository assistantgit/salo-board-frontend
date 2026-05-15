import { TOURNAMENT_MAIN_TABS, type TournamentVariant } from '@entities/tournament';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useTournamentFilterStore } from '../model/store';
import type { TournamentFilterStatus } from '../model/types';
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
    if (variant === 'admin') return TOURNAMENT_MAIN_TABS;

    if (variant === 'jury') {
      // Jury only needs All, In Progress (RN), and Finished (FN)
      return TOURNAMENT_MAIN_TABS.filter((tab) => ['ALL', 'RN', 'FN'].includes(tab.id));
    }

    // Default view shows All, Registration Open, In Progress, Finished, Not Started (exclude AR)
    return TOURNAMENT_MAIN_TABS.filter((tab) => tab.id !== 'AR');
  }, [variant]);

  return (
    <div className={styles.tabsWrapper}>
      {filteredTabs.map((tab) => {
        const isActive = status === tab.id;
        return (
          <button
            key={tab.id}
            className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
            onClick={() => setStatus(tab.id as TournamentFilterStatus)}
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
