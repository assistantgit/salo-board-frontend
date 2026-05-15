import { useUserTournaments } from '@entities/user';
import { useSubmissionFilterStore } from '@features/submission-filter';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import type { TournamentStatus } from '../../../entities/tournament/model/tournament.types';
import styles from './JuryAssessmentButton.module.css';

interface JuryAssessmentButtonProps {
  tournamentId: number;
  status: TournamentStatus;
  className?: string;
}

export const JuryAssessmentButton: React.FC<JuryAssessmentButtonProps> = ({
  tournamentId,
  status,
  className,
}) => {
  const { tournaments, isLoading } = useUserTournaments();
  const setTournamentId = useSubmissionFilterStore((s) => s.setTournamentId);
  const navigate = useNavigate();

  const isJury = tournaments.some((t) => t.id === tournamentId && t.role === 'jury');

  // Don't show in Draft or Registration phases
  const showButton = status !== 'DR' && status !== 'RG';

  if (isLoading || !isJury || !showButton) return null;

  const handleClick = () => {
    setTournamentId(tournamentId.toString());
    navigate('/jury/submissions');
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className={`${styles.assessmentButton} ${className || ''}`}
    >
      Оцінювання
    </button>
  );
};
