import { JURY_SUBMISSION_TABS } from '@entities/submission';
import type { FC } from 'react';
import type { SubmissionFilterStatus } from '../model/store';
import { useSubmissionFilterStore } from '../model/store';
import styles from './SubmissionStatusTabs.module.css';

export const SubmissionStatusTabs: FC = () => {
  const status = useSubmissionFilterStore((s) => s.status);
  const setStatus = useSubmissionFilterStore((s) => s.setStatus);

  return (
    <div className={styles.tabsWrapper}>
      {JURY_SUBMISSION_TABS.map((tab) => {
        const isActive = status === tab.id;
        return (
          <button
            key={tab.id}
            className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
            onClick={() => setStatus(tab.id as SubmissionFilterStatus)}
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
