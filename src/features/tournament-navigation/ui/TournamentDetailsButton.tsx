import { useMyTeamInTournament } from '@entities/team';
import type React from 'react';
import { Link } from 'react-router-dom';
import styles from './TournamentDetailsButton.module.css';

interface TournamentDetailsButtonProps {
  tournamentId: number;
  className?: string;
}

export const TournamentDetailsButton: React.FC<TournamentDetailsButtonProps> = ({
  tournamentId,
  className,
}) => {
  const { data: myTeam, isLoading } = useMyTeamInTournament(tournamentId);

  if (isLoading || !myTeam) return null;

  return (
    <Link
      to={`/tournaments/${tournamentId}/tournamentDetails/overview`}
      className={`${styles.detailsButton} ${className || ''}`}
    >
      Деталі турніру
    </Link>
  );
};
