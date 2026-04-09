import { getTournamentMeta, TournamentCard, TournamentCardSkeleton, useTournaments } from '@entities/tournament';
import { TournamentCtaButton } from '@features/tournament-navigation';
import { Skeleton } from '@shared/ui';
import styles from './TournamentList.module.css';


interface TournamentListProps {
  searchQuery?: string;
}

export const TournamentList = ({ searchQuery = '' }: TournamentListProps) => {
  const { tournaments, isLoading, error } = useTournaments({
    name: searchQuery || undefined,
  });

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

