import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { HistoryParticipationBoard } from '@widgets/history-participation-board';
import type React from 'react';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import './ArchivedTeamsPage.css';

export const ArchivedTeamsPage: React.FC = () => {
  return (
    <div className='archive-teams-page-root'>
      <Header />
      <BGLayout bgConfig={BG_LAYOUT_CONFIG} className='archive-teams-page'>
        <section className='archive-teams-hero'>
          <h1 className='archive-teams-title'>Архів команд</h1>
          <p className='archive-teams-subtitle'>
            Переглядайте свої попередні команди та їх результати
          </p>
        </section>

        <main className='archive-teams-main'>
          <HistoryParticipationBoard />
        </main>
      </BGLayout>
    </div>
  );
};
