import type { TournamentStatus } from '@entities/tournament';
import { DefaultButton } from '@shared/ui';
import React from 'react';
import styles from './JoinTournamentButton.module.css';
import { TeamRegistrationModal } from './TeamRegistrationModal';

interface JoinTournamentButtonProps {
  tournamentId: number;
  status: TournamentStatus;
  className?: string;
}

export const JoinTournamentButton: React.FC<JoinTournamentButtonProps> = ({
  tournamentId,
  status,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (status !== 'RG') return null;

  return (
    <>
      <DefaultButton
        className={`${styles.joinButton} ${className || ''}`}
        onClick={() => setIsModalOpen(true)}
      >
        Зареєструватися
      </DefaultButton>

      <TeamRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tournamentId={tournamentId}
      />
    </>
  );
};
