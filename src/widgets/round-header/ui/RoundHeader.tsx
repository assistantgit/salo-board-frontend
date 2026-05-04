import { RoundDates, RoundStatusBadge } from '@entities/tournament';
import { Skeleton } from '@shared/ui';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoundHeader } from '../lib/useRoundHeader';
import styles from './RoundHeader.module.css';

interface RoundHeaderProps {
  tournamentId: number;
  roundId: number;
}

export const RoundHeader: React.FC<RoundHeaderProps> = ({ tournamentId, roundId }) => {
  const { round, buttonState, isDisqualified, isLoading } = useRoundHeader(tournamentId, roundId);
  const navigate = useNavigate();

  if (isLoading) return <Skeleton className={styles.skeleton} />;
  if (!round) return null;

  const handleActionClick = () => {
    if (buttonState.type === 'submit' || buttonState.type === 'edit') {
      navigate(`/tournaments/${tournamentId}/tournamentDetails/${roundId}/submit`);
    } else if (buttonState.type === 'view') {
      navigate(`/tournaments/${tournamentId}/tournamentDetails/${roundId}/submit`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>{round.title}</h1>
          <div className={styles.statusWrapper}>
            <RoundStatusBadge status={round.status} variant='solid' />
            <RoundDates startAt={round.startAt} deadline={round.deadline} variant='solid' />
          </div>
        </div>

        <div className={styles.actions}>
          {isDisqualified ? (
            <div className={styles.dqBanner}>Команду дискваліфіковано</div>
          ) : (
            buttonState.type !== 'none' && (
              <button
                className={buttonState.type === 'submit' ? styles.submitButton : styles.editButton}
                onClick={handleActionClick}
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
