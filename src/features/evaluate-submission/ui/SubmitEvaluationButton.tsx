import { useEvaluation } from '@entities/evaluation';
import { DefaultButton, Modal } from '@shared/ui';
import type React from 'react';
import { useState } from 'react';
import styles from './SubmitEvaluationButton.module.css';

interface SubmitEvaluationButtonProps {
  tournamentId: number;
  roundId: number;
  submissionId: number;
  disabled?: boolean;
  isFullyEvaluated?: boolean;
}

export const SubmitEvaluationButton: React.FC<SubmitEvaluationButtonProps> = ({
  tournamentId,
  roundId,
  submissionId,
  disabled: disabledProp,
  isFullyEvaluated = true,
}) => {
  const { evaluation, updateEvaluation, isUpdating } = useEvaluation(
    tournamentId,
    roundId,
    submissionId,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isSubmitted = evaluation?.status === 'SB';
  const disabled = isSubmitted || disabledProp || !isFullyEvaluated;

  const handleSubmitClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    updateEvaluation({ status: 'SB', comment: evaluation?.comment ?? '' });
    setIsModalOpen(false);
  };

  const handleCancelSubmit = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <DefaultButton
        className={styles.submitBtn}
        onClick={handleSubmitClick}
        disabled={disabled || isUpdating}
      >
        {isSubmitted ? 'Оцінку надіслано' : 'Надіслати оцінку'}
      </DefaultButton>
      {!isFullyEvaluated && !isSubmitted && !disabledProp && (
        <div className={styles.warningText}>Оцініть усі критерії перед відправкою</div>
      )}
      {isUpdating && !isSubmitted && (
        <div className={styles.savingIndicator}>
          <div className={styles.savingDot} />
          <span>Надсилання...</span>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCancelSubmit} lazy={true}>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>Підтвердження відправки</h3>
          <p className={styles.modalText}>
            Ви впевнені, що хочете надіслати оцінку? Після відправки змінити бали буде неможливо.
          </p>
          <div className={styles.modalActions}>
            <DefaultButton
              className={styles.cancelBtn}
              onClick={handleCancelSubmit}
              disabled={isUpdating}
            >
              Відмінити
            </DefaultButton>
            <DefaultButton
              className={styles.confirmBtn}
              onClick={handleConfirmSubmit}
              disabled={isUpdating}
            >
              Підтвердити
            </DefaultButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};
