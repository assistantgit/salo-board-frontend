import { TournamentStatusBadge } from '@entities/tournament';
import { Skeleton } from '@shared/ui';
import type React from 'react';
import { useTournamentHero } from '../lib/useTournamentHero';
import styles from './TournamentDetailsHero.module.css';

interface TournamentDetailsHeroProps {
  tournamentId: number;
}

export const TournamentDetailsHero: React.FC<TournamentDetailsHeroProps> = ({ tournamentId }) => {
  const { tournament, buttonState, isDisqualified, isLoading } = useTournamentHero(tournamentId);

  if (isLoading) return <Skeleton className={styles.skeleton} />;
  if (!tournament) return null;

  return (
    <div className={styles.heroContainer}>
      <header className={styles.heroHeader}>
        <TournamentStatusBadge status={tournament.status} />
        <h1 className={styles.title}>{tournament.title}</h1>
        {tournament.startDate && (
          <div className={styles.datesBadge}>
            {new Date(tournament.startDate).toLocaleDateString('uk-UA', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        )}
      </header>

      <div className={styles.divider} />

      <p className={styles.description}>{tournament.description}</p>

      <div className={styles.actions}>
        {isDisqualified ? (
          <div className={styles.dqBanner}>
            Вашу команду дискваліфіковано. Ви не можете надсилати роботи.
          </div>
        ) : (
          buttonState.type !== 'none' && (
            <button
              className={buttonState.type === 'submit' ? styles.submitButton : styles.editButton}
              onClick={() => console.log(`${buttonState.type} clicked`)}
            >
              {buttonState.label}
            </button>
          )
        )}
      </div>
    </div>
  );
};
