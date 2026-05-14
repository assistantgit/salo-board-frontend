import { teamApi } from '@entities/team';
import type { TeamMember } from '@entities/team-member';
import { Modal } from '@shared/ui/modal/Modal';
import type React from 'react';
import { useState } from 'react';
import styles from './LeaveTeamButton.module.css';

interface LeaveTeamButtonProps {
  teamId: number;
  isLead: boolean;
  members?: TeamMember[];
  onSuccess?: () => void;
}

/**
 * LeaveTeamButton — lets any member leave the team.
 * If the captain (isLead) leaves, the team is disbanded.
 */
export const LeaveTeamButton: React.FC<LeaveTeamButtonProps> = ({
  teamId,
  isLead,
  members = [],
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCaptainId, setNewCaptainId] = useState<string>('');

  const otherMembers = members.filter((m) => !m.isCurrentUser && !m.isPending);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      if (isLead && otherMembers.length > 0) {
        if (!newCaptainId) return; // Wait for selection
        await teamApi.leaveTeam(teamId, newCaptainId);
      } else if (isLead && otherMembers.length === 0) {
        await teamApi.disbandTeam(teamId);
      } else {
        await teamApi.leaveTeam(teamId);
      }
      onSuccess?.();
      setIsModalOpen(false);
    } catch {
      // errors are silently swallowed; toast system could be wired here
    } finally {
      setIsLoading(false);
    }
  };

  const needsNewCaptain = isLead && otherMembers.length > 0;
  const isConfirmDisabled = isLoading || (needsNewCaptain && !newCaptainId);

  return (
    <>
      <button
        type='button'
        className={styles.leaveBtn}
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
        aria-label={
          isLead && otherMembers.length === 0 ? 'Розформувати команду' : 'Вийти з команди'
        }
      >
        {isLead && otherMembers.length === 0 ? 'Розформувати' : 'Вийти з команди'}
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lazy>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
            {isLead && otherMembers.length === 0 ? 'Розформувати команду?' : 'Вийти з команди?'}
          </p>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
            {needsNewCaptain
              ? 'Оскільки ви є лідером команди, перед виходом вам необхідно обрати нового капітана.'
              : isLead
                ? 'Ви єдиний учасник. Якщо ви вийдете — команда буде розформована. Цю дію неможливо відмінити.'
                : 'Ви більше не зможете подавати роботи від імені цієї команди.'}
          </p>

          {needsNewCaptain && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              <label htmlFor='new-captain-select' style={{ fontSize: '14px', fontWeight: '500' }}>
                Новий капітан
              </label>
              <select
                id='new-captain-select'
                value={newCaptainId}
                onChange={(e) => setNewCaptainId(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #c1c1c1',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                }}
              >
                <option value='' disabled>
                  Оберіть нового капітана
                </option>
                {otherMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.fullName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}
          >
            <button
              type='button'
              onClick={() => setIsModalOpen(false)}
              disabled={isLoading}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #c1c1c1',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              Скасувати
            </button>
            <button
              type='button'
              onClick={handleConfirm}
              disabled={isConfirmDisabled}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                background: isConfirmDisabled ? '#ccc' : '#e03a3a',
                color: 'white',
                cursor: isConfirmDisabled ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
              }}
            >
              {isLoading ? '...' : isLead && otherMembers.length === 0 ? 'Розформувати' : 'Вийти'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
