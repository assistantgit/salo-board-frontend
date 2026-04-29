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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'DR':
        return 'Очікується';
      case 'AC':
        return 'Активний';
      case 'SC':
        return 'Оцінюється';
      case 'EV':
        return 'Оцінений';
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <div className={`${styles.statusBadge} ${styles[round.status.toLowerCase()]}`}>
            <span className={styles.statusDot} />
            {getStatusLabel(round.status)}
          </div>
          <h1 className={styles.title}>{round.title}</h1>
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
