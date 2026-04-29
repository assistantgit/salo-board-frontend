import { useTournamentFilterStore } from '@features/tournament-filter';
import type { BGConfig } from '@shared/model';
import { BGLayout } from '@widgets/bg-layout';
import { Header } from '@widgets/header';
import { TournamentList } from '@widgets/tournament-list';
import { useEffect } from 'react';
import './ArchivedTournamentsPage.css';
import { ArchivedTournamentFilters } from '@widgets/archived-tournament-filters';

/**
 * ArchivedTournamentsPage.
 * Composition Layer (FSD Page Layer).
 * Specializes in showing finished and archived tournaments.
 */
const ARCHIVE_BG_CONFIG: BGConfig = {
  circles: [
    {
      id: 'a1',
      xPercent: 10,
      yPercent: 20,
      ellipses: [
        {
          id: 'ae1a',
          layer: 0,
          zIndex: 0,
          width: 380,
          height: 380,
          offsetX: 0,
          offsetY: 0,
          rotation: 10,
          borderRadius: '50%',
          borderWidth: 1.2,
        },
        {
          id: 'ae1b',
          layer: 1,
          zIndex: 1,
          width: 240,
          height: 240,
          offsetX: 0,
          offsetY: 0,
          rotation: -10,
          borderRadius: '50%',
          borderWidth: 0.8,
        },
      ],
    },
    {
      id: 'a2',
      xPercent: 90,
      yPercent: 80,
      ellipses: [
        {
          id: 'ae2a',
          layer: 0,
          zIndex: 0,
          width: 450,
          height: 450,
          offsetX: 0,
          offsetY: 0,
          rotation: -5,
          borderRadius: '50%',
          borderWidth: 1.2,
        },
        {
          id: 'ae2b',
          layer: 1,
          zIndex: 1,
          width: 280,
          height: 280,
          offsetX: 0,
          offsetY: 0,
          rotation: 15,
          borderRadius: '50%',
          borderWidth: 0.8,
        },
      ],
    },
  ],
};

export const ArchivedTournamentsPage = () => {
  const reset = useTournamentFilterStore((s) => s.reset);

  useEffect(() => {
    // Reset filters on mount to ensure a clean state in the archive
    reset();

    return () => {
      // Clear filters on unmount to prevent archive state leaking back to dashboard
      reset();
    };
  }, [reset]);

  return (
    <div className='archive-page-root'>
      <Header />
      <BGLayout bgConfig={ARCHIVE_BG_CONFIG} className='archive-page'>
        <section className='archive-hero'>
          <div className='archive-hero-left'>
            <h1 className='archive-title'>Архів турнірів</h1>
          </div>
        </section>

        <section className='archive-search-section'>
          <ArchivedTournamentFilters />
        </section>

        <main className='archive-main-content'>
          <TournamentList isArchive />
        </main>
      </BGLayout>
    </div>
  );
};
