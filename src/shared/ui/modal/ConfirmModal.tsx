import type React from 'react';
import styles from './ConfirmModal.module.css';
import { Modal } from './Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  /** Main question text shown in bold */
  message: string;
  /** Optional smaller subtitle / warning */
  subMessage?: string;
  /** Label for the confirm (danger) button */
  confirmLabel?: string;
  /** Label for the cancel button */
  cancelLabel?: string;
  /** Whether the confirm action is in progress */
  isLoading?: boolean;
  /** Emoji or icon shown above the message */
  icon?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  subMessage,
  confirmLabel = 'Видалити',
  cancelLabel = 'Скасувати',
  isLoading = false,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} lazy>
      <div className={styles.body}>
        <p className={styles.message}>{message}</p>
        {subMessage && <p className={styles.sub}>{subMessage}</p>}
        <div className={styles.actions}>
          <button type='button' className={styles.cancelBtn} onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </button>
          <button
            type='button'
            className={styles.confirmBtn}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? '...' : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};
