import { TournamentFilters } from '@widgets/tournament-filters';
import { RegularTournamentList } from '@widgets/tournament-list';
import type React from 'react';
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
        <TournamentFilters variant='default' />
      </section>

      <main className={styles.mainContent}>
        <RegularTournamentList />
      </main>
    </div>
  );
};
