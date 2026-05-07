import { Header } from '@widgets/header';
import { JuryTournamentList } from '@widgets/jury-tournament-list';
import type React from 'react';
import styles from './JuryTournamentsPage.module.css';

export const JuryTournamentsPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Мої турніри</h1>
          <p className={styles.subtitle}>Список турнірів в яких ви журі</p>
        </div>

        <JuryTournamentList />
      </main>
    </div>
  );
};
