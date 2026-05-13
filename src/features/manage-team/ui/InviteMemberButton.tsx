import { AddIcon } from '@shared/ui';
import type React from 'react';
import { useState } from 'react';
import styles from './InviteMemberButton.module.css';
import { InviteMemberModal } from './InviteMemberModal/InviteMemberModal';

interface InviteMemberButtonProps {
  teamId: number;
  onSuccess?: () => void;
}

export const InviteMemberButton: React.FC<InviteMemberButtonProps> = ({ teamId, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button type='button' className={styles.btn} onClick={() => setIsModalOpen(true)}>
        <AddIcon size='lg' />
        Додати учасника
      </button>

      <InviteMemberModal
        teamId={teamId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
};
