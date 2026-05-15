import { Tabs } from '@shared/ui';
import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { HistoryParticipationBoard } from '@widgets/history-participation-board';
import { HistorySubmissionBoard } from '@widgets/history-submission-board';
import { HistoryTournamentBoard } from '@widgets/history-tournament-board';
import type React from 'react';
import { useSearchParams } from 'react-router-dom';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import styles from './UserHistoryPage.module.css';

const TABS = [
  { id: 'submissions', label: 'Мої сабміти' },
  { id: 'tournaments', label: 'Участь у турнірах' },
  { id: 'teams', label: 'Архів команд' },
];

export const UserHistoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'submissions';

  const handleTabChange = (id: string) => {
    setSearchParams({ tab: id });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'submissions':
        return <HistorySubmissionBoard />;
      case 'tournaments':
        return <HistoryTournamentBoard />;
      case 'teams':
        return <HistoryParticipationBoard />;
      default:
        return <HistorySubmissionBoard />;
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <BGLayout bgConfig={BG_LAYOUT_CONFIG} className={styles.bgLayout}>
        <main className={styles.main}>
          <div className={styles.heading}>
            <h1 className={styles.title}>Моя історія</h1>
            <p className={styles.subtitle}>Сабміти та турніри в яких ви брали участь</p>
          </div>

          <Tabs
            items={TABS}
            activeId={activeTab}
            onChange={handleTabChange}
            className={styles.tabs}
          />

          <div className={styles.boardContainer}>{renderContent()}</div>
        </main>
      </BGLayout>
    </div>
  );
};
