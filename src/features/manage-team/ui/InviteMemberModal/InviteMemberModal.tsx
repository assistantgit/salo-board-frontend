import { teamApi } from '@entities/team';
import { ActionInput, FormSubmitButton, Modal } from '@shared/ui';
import type React from 'react';
import { useState } from 'react';
import styles from './InviteMemberModal.module.css';

interface InviteMemberModalProps {
  teamId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({
  teamId,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      await teamApi.addMember(teamId, inviteCode.trim());
      setInviteCode('');
      onSuccess?.();
      onClose();
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } } };
      setError(e.response?.data?.error || 'Не вдалося надіслати запрошення');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Запросити учасника'>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.description}>
          Введіть інвайт-код користувача, щоб надіслати йому запрошення до вашої команди.
        </p>

        <div className={styles.inputGroup}>
          <ActionInput
            placeholder='Інвайт-код (напр. ABC123)'
            error={error || undefined}
            props={{
              value: inviteCode,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setInviteCode(e.target.value.toUpperCase()),
              disabled: isLoading,
              autoFocus: true,
            }}
          />
        </div>

        <div className={styles.actions}>
          <button type='button' className={styles.cancelBtn} onClick={onClose} disabled={isLoading}>
            Скасувати
          </button>
          <FormSubmitButton
            className={styles.submitBtn}
            isLoading={isLoading}
            disabled={!inviteCode.trim()}
          >
            Надіслати запит
          </FormSubmitButton>
        </div>
      </form>
    </Modal>
  );
};
