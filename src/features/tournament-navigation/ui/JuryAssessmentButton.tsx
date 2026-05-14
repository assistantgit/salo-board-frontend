import { useMyTournamentsByRole } from '@entities/tournament';
import { useSubmissionFilterStore } from '@features/submission-filter';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './JuryAssessmentButton.module.css';

interface JuryAssessmentButtonProps {
  tournamentId: number;
  className?: string;
}

export const JuryAssessmentButton: React.FC<JuryAssessmentButtonProps> = ({
  tournamentId,
  className,
}) => {
  const { tournaments, isLoading } = useMyTournamentsByRole('jury');
  const setTournamentId = useSubmissionFilterStore((s) => s.setTournamentId);
  const navigate = useNavigate();

  const isJury = tournaments.some((t) => t.id === tournamentId);

  if (isLoading || !isJury) return null;

  const handleClick = () => {
    setTournamentId(tournamentId.toString());
    navigate('/jury/submissions');
  };

  return (
    <button onClick={handleClick} className={`${styles.assessmentButton} ${className || ''}`}>
      Оцінювання
    </button>
  );
};
