import { getRoundStatusLabel } from '@entities/tournament';
import { Skeleton } from '@shared/ui';
import type React from 'react';
import { useRoundHeader } from '../lib/useRoundHeader';
import styles from './RoundHeader.module.css';

interface RoundHeaderProps {
  tournamentId: number;
  roundId: number;
}

export const RoundHeader: React.FC<RoundHeaderProps> = ({ tournamentId, roundId }) => {
  const { round, buttonState, isDisqualified, isLoading } = useRoundHeader(tournamentId, roundId);

  if (isLoading) return <Skeleton className={styles.skeleton} />;
  if (!round) return null;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>{round.title}</h1>
          <div className={styles.statusWrapper}>
            <div className={`${styles.statusBadge} ${styles[round.status.toLowerCase()]}`}>
              <span className={styles.statusDot} />
              {getRoundStatusLabel(round.status)}
            </div>
            {(round.startAt || round.deadline) && (
              <div className={styles.datesBadge}>
                {round.startAt
                  ? new Date(round.startAt).toLocaleDateString('uk-UA', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : ''}
                {round.startAt && round.deadline ? ' — ' : ''}
                {round.deadline
                  ? new Date(round.deadline).toLocaleDateString('uk-UA', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : ''}
              </div>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          {isDisqualified ? (
            <div className={styles.dqBanner}>Команду дискваліфіковано</div>
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
    </div>
  );
};
