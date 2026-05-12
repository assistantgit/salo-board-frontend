import { HistoryTournamentFilters, HistoryTournamentList } from '@widgets/history-list';
import type React from 'react';
import styles from './HistoryTournamentBoard.module.css';

/**
 * HistoryTournamentBoard Widget.
 * Independent widget for viewing tournament participation history.
 */
export const HistoryTournamentBoard: React.FC = () => {
  return (
    <div className={styles.board}>
      <section className={styles.searchSection}>
        <HistoryTournamentFilters />
      </section>

      <main className={styles.mainContent}>
        <HistoryTournamentList />
      </main>
    </div>
  );
};
