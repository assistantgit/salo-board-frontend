import { SearchBar } from '@shared/ui';
import type React from 'react';
import { useState } from 'react';
import styles from './HistoryParticipationBoard.module.css';
import { HistoryParticipationList } from './HistoryParticipationList';

/**
 * HistoryParticipationBoard Widget.
 * Independent widget for viewing archived teams history.
 */
export const HistoryParticipationBoard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.board}>
      <section className={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Пошук команд...'
        />
      </section>

      <main className={styles.mainContent}>
        <HistoryParticipationList searchQuery={searchQuery} />
      </main>
    </div>
  );
};
