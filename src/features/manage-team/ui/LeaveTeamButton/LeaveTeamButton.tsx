import { teamApi } from '@entities/team';
import { ConfirmModal } from '@shared/ui/modal/ConfirmModal';
import type React from 'react';
import { useState } from 'react';
import styles from './LeaveTeamButton.module.css';

interface LeaveTeamButtonProps {
  teamId: number;
  isLead: boolean;
  onSuccess?: () => void;
}

/**
 * LeaveTeamButton — lets any member leave the team.
 * If the captain (isLead) leaves, the team is disbanded.
 */
export const LeaveTeamButton: React.FC<LeaveTeamButtonProps> = ({ teamId, isLead, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      if (isLead) {
        await teamApi.disbandTeam(teamId);
      } else {
        await teamApi.leaveTeam(teamId);
      }
      onSuccess?.();
    } catch {
      // errors are silently swallowed; toast system could be wired here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type='button'
        className={styles.leaveBtn}
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
        aria-label={isLead ? 'Розформувати команду' : 'Вийти з команди'}
      >
        {isLead ? 'Розформувати' : 'Вийти з команди'}
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        message={isLead ? 'Розформувати команду?' : 'Вийти з команди?'}
        subMessage={
          isLead
            ? 'Ви капітан. Якщо ви вийдете — команда буде розформована. Цю дію неможливо відмінити.'
            : 'Ви більше не зможете подавати роботи від імені цієї команди.'
        }
        confirmLabel={isLead ? 'Розформувати' : 'Вийти'}
        icon={isLead ? '⚠️' : '🚪'}
        isLoading={isLoading}
      />
    </>
  );
};
