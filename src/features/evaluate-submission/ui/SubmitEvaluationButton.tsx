import { type PatchedEvaluation, useEvaluation } from '@entities/evaluation';
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
  const { evaluation, updateEvaluationAsync, isUpdating } = useEvaluation(
    tournamentId,
    roundId,
    submissionId,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSubmitted = evaluation?.status === 'SB';
  const disabled = isSubmitted || disabledProp || !isFullyEvaluated;

  const handleSubmitClick = () => {
    setIsModalOpen(true);
    setError(null);
  };

  const handleConfirmSubmit = async () => {
    try {
      setError(null);
      // Construct patch object carefully
      const patch: PatchedEvaluation = { status: 'SB' };
      if (evaluation?.comment !== undefined) {
        patch.comment = evaluation.comment;
      }

      await updateEvaluationAsync(patch);
      setIsModalOpen(false);
    } catch (err: unknown) {
      const errorData = err as { response?: { data?: unknown } };
      console.error('Submission failed details:', errorData.response?.data || err);

      const backendError = errorData.response?.data;
      let message = 'Помилка при відправці оцінки. Спробуйте ще раз.';

      if (backendError) {
        if (typeof backendError === 'string') {
          if (backendError.includes('<!DOCTYPE html>') || backendError.includes('<html')) {
            message =
              'Внутрішня помилка сервера (Backend Error). Будь ласка, повідомте адміністратора.';
          } else {
            message = backendError;
          }
        } else if (backendError && typeof backendError === 'object' && 'detail' in backendError) {
          message = (backendError as { detail: string }).detail;
        } else if (backendError && typeof backendError === 'object' && 'error' in backendError) {
          message = (backendError as { error: string }).error;
        } else if (typeof backendError === 'object') {
          // Format validation errors like { field: ["error"] }
          message = Object.entries(backendError as Record<string, unknown>)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
            .join('; ');
        }
      }

      setError(message);
    }
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
          {error && <div className={styles.errorText}>{error}</div>}
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
