import type { FC } from 'react';
import { type SubmissionFilterStatus, useSubmissionFilterStore } from '../model/store';
import styles from './SubmissionStatusTabs.module.css';

interface TabConfig {
  id: SubmissionFilterStatus;
  label: string;
  dotColor?: string;
}

const STATUS_TABS: TabConfig[] = [
  { id: 'ALL', label: 'Всі' },
  { id: 'UNRATED', label: 'Неоцінені', dotColor: '#be3638' },
  { id: 'DRAFT', label: 'Чернетка', dotColor: '#469650' },
  { id: 'RATED', label: 'Оцінені', dotColor: '#2c23d5' },
];

export const SubmissionStatusTabs: FC = () => {
  const status = useSubmissionFilterStore((s) => s.status);
  const setStatus = useSubmissionFilterStore((s) => s.setStatus);

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
              />
            )}
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
