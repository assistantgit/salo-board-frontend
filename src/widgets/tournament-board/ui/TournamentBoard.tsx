import React from 'react';
import { TournamentFilters } from '@widgets/tournament-filters';
import { TournamentList } from '@widgets/tournament-list';
import styles from './TournamentBoard.module.css';

/**
 * TournamentBoard Widget.
 * Orchestrates the tournament discovery experience by combining 
 * filters and the main tournament list.
 */
export const TournamentBoard: React.FC = () => {
  return (
    <div className={styles.board}>
      <section className={styles.searchSection}>
        <TournamentFilters />
      </section>
      
      <main className={styles.mainContent}>
        <TournamentList />
      </main>
    </div>
  );
};
