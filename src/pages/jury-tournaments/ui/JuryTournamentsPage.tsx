import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { JuryStats } from '@widgets/jury-stats';
import { JuryTournamentList, useJuryTournaments } from '@widgets/jury-tournament-list';
import type React from 'react';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import styles from './JuryTournamentsPage.module.css';

export const JuryTournamentsPage: React.FC = () => {
  const { juryTournaments } = useJuryTournaments();

  return (
    <div className={styles.page}>
      <Header />
      <BGLayout bgConfig={BG_LAYOUT_CONFIG}>
        <main className={styles.main}>
          <div className={styles.heading}>
            <h1 className={styles.title}>Мої турніри</h1>
            <p className={styles.subtitle}>Список турнірів в яких ви журі</p>
          </div>

          <JuryStats
            activeTournamentsCount={juryTournaments.length}
            pendingEvaluationsCount={0}
            completedEvaluationsCount={0}
          />

          <JuryTournamentList />
        </main>
      </BGLayout>
    </div>
  );
};
