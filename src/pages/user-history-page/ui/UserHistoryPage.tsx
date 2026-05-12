import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { HistorySubmissionBoard } from '@widgets/history-submission-board';
import { HistoryTournamentBoard } from '@widgets/history-tournament-board';
import type React from 'react';
import { useSearchParams } from 'react-router-dom';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import styles from './UserHistoryPage.module.css';

export const UserHistoryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'submissions';

  return (
    <div className={styles.page}>
      <Header />
      <BGLayout bgConfig={BG_LAYOUT_CONFIG} className={styles.bgLayout}>
        <main className={styles.main}>
          <div className={styles.heading}>
            <h1 className={styles.title}>Моя історія</h1>
            <p className={styles.subtitle}>Сабміти та турніри в яких ви брали участь</p>
          </div>

          <div className={styles.boardContainer}>
            {activeTab === 'submissions' ? <HistorySubmissionBoard /> : <HistoryTournamentBoard />}
          </div>
        </main>
      </BGLayout>
    </div>
  );
};
