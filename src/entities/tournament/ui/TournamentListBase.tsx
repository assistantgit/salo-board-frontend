import { Skeleton } from '@shared/ui';
import type React from 'react';
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
  emptyMessage = 'Турнірів не знайдено.',
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className={`${styles.grid} ${className}`}>
        <Skeleton.Provider>
          {[1, 2, 3, 4].map((i) => (
            <TournamentCardSkeleton key={i} />
          ))}
        </Skeleton.Provider>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.statusMessage} ${className}`}>
        <span className={styles.error}>{error}</span>
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className={`${styles.statusMessage} ${className}`}>
        <span>{emptyMessage}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${className}`}>
      {tournaments.map((tournament) => {
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
      })}
    </div>
  );
};
