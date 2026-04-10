import { useEffect } from 'react';
import { getTournamentMeta, TournamentCard, TournamentCardSkeleton, useTournaments } from '@entities/tournament';
import { useTournamentFilterStore } from '@features/tournament-filter';
import { TournamentCtaButton } from '@features/tournament-navigation';
import { Skeleton } from '@shared/ui';
import styles from './TournamentList.module.css';

/**
 * Self-contained tournament list widget.
 * Reads filter state (search, status) from useTournamentFilterStore.
 * Writes resolved tournament count back to the store so TournamentCount
 * can display it without making a second API request (ISP + SRP).
 */
export const TournamentList = () => {
  // ISP: granular selectors — re-renders only when the consumed slice changes
  const search    = useTournamentFilterStore((s) => s.search);
  const status    = useTournamentFilterStore((s) => s.status);
  const setCount  = useTournamentFilterStore((s) => s.setCount);

  const { tournaments, isLoading, error } = useTournaments({
    name: search || undefined,
    status: status !== 'ALL' ? status : undefined,
  });

  // Sync resolved count into the store so TournamentCount reads it without
  // a separate fetch. Reset to -1 while loading to signal "unknown".
  useEffect(() => {
    if (!isLoading && !error) {
      setCount(tournaments.length);
    }
    if (isLoading) {
      setCount(-1);
    }
  }, [tournaments.length, isLoading, error, setCount]);

  if (isLoading) {
    return (
      <div className={styles.grid}>
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
      <div className={styles.statusMessage}>
        <span className={styles.error}>{error}</span>
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className={styles.statusMessage}>
        <span>Турнірів не знайдено.</span>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
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
            ctaSlot={
              <TournamentCtaButton id={tournament.id} status={tournament.status} />
            }
          />
        );
      })}
    </div>
  );
};

