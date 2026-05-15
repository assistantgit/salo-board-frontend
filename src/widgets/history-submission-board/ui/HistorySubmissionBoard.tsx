import { HistorySubmissionFilters, HistorySubmissionList } from '@widgets/history-list';
import type React from 'react';
import styles from './HistorySubmissionBoard.module.css';

/**
 * HistorySubmissionBoard Widget.
 * Independent widget for viewing submission history.
 */
export const HistorySubmissionBoard: React.FC = () => {
  return (
    <div className={styles.board}>
      <section className={styles.searchSection}>
        <HistorySubmissionFilters />
      </section>

      <main className={styles.mainContent}>
        <HistorySubmissionList />
      </main>
    </div>
  );
};
