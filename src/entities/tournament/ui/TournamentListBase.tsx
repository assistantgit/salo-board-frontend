import { EmptyState, ListView, Pagination, SearchIcon, Skeleton } from '@shared/ui';
import type React from 'react';
import { useMemo, useState } from 'react';
import { getTournamentMeta } from '../lib/getTournamentMeta';
import type { TournamentDomain } from '../model/tournament.types';
import { TournamentCard } from './TournamentCard';
import { TournamentCardSkeleton } from './TournamentCardSkeleton';
import styles from './TournamentListBase.module.css';

interface TournamentListBaseProps {
  tournaments: TournamentDomain[];
  isLoading: boolean;
  error: string | null;
  renderCta: (tournament: TournamentDomain) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

export const TournamentListBase: React.FC<TournamentListBaseProps> = ({
  tournaments,
  isLoading,
  error,
  renderCta,
  emptyMessage = 'Турнірів не знайдено',
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(tournaments.length / itemsPerPage);

  const paginatedTournaments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return tournaments.slice(start, start + itemsPerPage);
  }, [tournaments, currentPage]);

  if (error) {
    return (
      <div className={`${styles.statusMessage} ${className}`}>
        <span className={styles.error}>{error}</span>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ListView
        data={paginatedTournaments}
        isLoading={isLoading}
        className={`${styles.grid} ${className}`}
        skeleton={
          <Skeleton.Provider>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TournamentCardSkeleton key={i} />
            ))}
          </Skeleton.Provider>
        }
        emptyState={
          <EmptyState
            icon={<SearchIcon size='xl' style={{ opacity: 0.2 }} />}
            title={emptyMessage}
            subtitle='Спробуйте змінити фільтри або пошуковий запит'
            className={styles.empty}
          />
        }
        renderItem={(tournament) => {
          const meta = getTournamentMeta(tournament);
          return (
            <TournamentCard
              key={tournament.id}
              id={tournament.id}
              title={tournament.title}
              organizer={tournament.organizer}
              status={tournament.status}
              dateLabel={meta.dateLabel}
              dateValue={meta.dateValue}
              progress={meta.progress}
              teamsCount={tournament.teamsCount}
              roundsCount={tournament.roundsCount}
              ctaSlot={renderCta(tournament)}
            />
          );
        }}
      />

      {!isLoading && tournaments.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className={styles.pagination}
        />
      )}
    </div>
  );
};
