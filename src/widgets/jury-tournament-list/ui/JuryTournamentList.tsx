import { getTournamentMeta } from '@entities/tournament';
import { Skeleton } from '@shared/ui';
import { TournamentFilters } from '@widgets/tournament-filters';
import type React from 'react';
import { useJuryTournaments } from '../lib/useJuryTournaments';
import { JuryTournamentCard } from './JuryTournamentCard';
import { JuryTournamentFilters } from './JuryTournamentFilters';
import styles from './JuryTournamentList.module.css';

export const JuryTournamentList: React.FC = () => {
  const {
    tournaments,
    juryTournaments,
    rounds,
    selectedTournamentId,
    setSelectedTournamentId,
    selectedRoundId,
    setSelectedRoundId,
    isLoading,
    error,
    useMocks,
  } = useJuryTournaments();

  const handleView = (id: number) => {
    console.log('Navigate to tournament', id, 'round', selectedRoundId);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeletonFilters} />
        <div className={styles.grid}>
          <Skeleton.Provider>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonCard} />
            ))}
          </Skeleton.Provider>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.filterSection}>
        <TournamentFilters variant='jury'>
          <JuryTournamentFilters
            tournaments={juryTournaments}
            rounds={rounds}
            selectedTournamentId={selectedTournamentId}
            onTournamentChange={setSelectedTournamentId}
            selectedRoundId={selectedRoundId}
            onRoundChange={setSelectedRoundId}
          />
        </TournamentFilters>
      </section>

      {error && !useMocks && <div className={styles.error}>{error}</div>}

      {tournaments.length === 0 ? (
        <div className={styles.empty}>Нічого не знайдено за вашим запитом.</div>
      ) : (
        <div className={styles.grid}>
          {tournaments.map((t) => {
            const meta = getTournamentMeta(t);
            const selectedRound = rounds.find((r) => r.id.toString() === selectedRoundId);

            return (
              <JuryTournamentCard
                key={t.id}
                id={t.id}
                title={t.title}
                status={t.status}
                organizer={t.organizer}
                roundTitle={selectedRound ? selectedRound.title : 'Всі раунди'}
                endDate={
                  selectedRound
                    ? new Date(selectedRound.deadline).toLocaleDateString('uk-UA')
                    : meta.dateValue
                }
                onView={handleView}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
