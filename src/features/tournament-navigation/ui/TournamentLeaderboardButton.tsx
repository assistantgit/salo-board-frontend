import type { TournamentStatus } from '@entities/tournament';
import type React from 'react';
import { Link } from 'react-router-dom';
import styles from './TournamentLeaderboardButton.module.css';

interface TournamentLeaderboardButtonProps {
  tournamentId: number;
  status: TournamentStatus;
  className?: string;
}

export const TournamentLeaderboardButton: React.FC<TournamentLeaderboardButtonProps> = ({
  tournamentId,
  status,
  className,
}) => {
  if (status === 'RG') return null;

  return (
    <Link
      to={`/tournaments/${tournamentId}/leaderboard`}
      className={`${styles.leaderboardButton} ${className || ''}`}
    >
      Лідерборд
    </Link>
  );
};
