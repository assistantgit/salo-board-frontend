import { useTournamentFilterStore } from '@features/tournament-filter';
import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { TournamentFilters } from '@widgets/tournament-filters';
import { ArchiveTournamentList } from '@widgets/tournament-list';
import { useEffect } from 'react';
import { BG_LAYOUT_CONFIG } from '../config/BGLayout';
import './ArchivedTournamentsPage.css';

export const ArchivedTournamentsPage = () => {
  const reset = useTournamentFilterStore((s) => s.reset);

  useEffect(() => {
    reset();
    return () => reset();
  }, [reset]);

  return (
    <div className='archive-page-root'>
      <Header />
      <BGLayout bgConfig={BG_LAYOUT_CONFIG} className='archive-page'>
        <section className='archive-hero'>
          <div className='archive-hero-left'>
            <h1 className='archive-title'>Архів турнірів</h1>
          </div>
        </section>

        <section className='archive-search-section'>
          <TournamentFilters variant='archive' />
        </section>

        <main className='archive-main-content'>
          <ArchiveTournamentList />
        </main>
      </BGLayout>
    </div>
  );
};
