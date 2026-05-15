import {
  RequirementsContentBlock,
  RoundDescriptionBlock,
  SubmitStatusBadge,
} from '@entities/tournament';
import { NavigateBackButton } from '@features/navigate';
import { SubmitWorkForm } from '@features/tournament-submission';
import { DefaultButton, FormSubmitButton, Modal } from '@shared/ui';
import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTournamentSubmission } from '../lib/useTournamentSubmission';
import { SubmissionInfoCards } from './SubmissionInfoCards';
import styles from './TournamentSubmissionWidget.module.css';

export const TournamentSubmissionWidget: React.FC = () => {
  const navigate = useNavigate();
  const { ids, data, status, actions } = useTournamentSubmission();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formActions, setFormActions] = useState<{
    saveDraft: () => void;
    submitWork: () => void;
    onUnsubmit: () => Promise<void>;
    isDirty: boolean;
  } | null>(null);

  if (status.isLoading) {
    return <div className={styles.loaderContainer}>Завантаження...</div>;
  }

  if (!data.myTeam) {
    return (
      <div className={styles.errorContainer}>Ви не є учасником жодної команди у цьому турнірі.</div>
    );
  }

  const currentStatus = data.activeSubmission?.status || 'DR';
  const isLocked = currentStatus === 'LK';
  const isSubmitted = currentStatus === 'SB';

  const handleSubmitClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!formActions) return;
    try {
      await formActions.submitWork();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <NavigateBackButton
          className={styles.backButtonBtn}
          label='Назад до раунду'
          onBack={() => navigate(-1)}
        />
      </div>

      <div className={styles.titleContainer}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>
            {data.tournament?.title || 'Назва турніру'} — {data.round?.title || 'Назва раунду'}
          </h1>
          {data.activeSubmission && (
            <div className={styles.statusWrapper}>
              <SubmitStatusBadge status={data.activeSubmission.status} />
            </div>
          )}
        </div>
        <div className={styles.titleActions}>
          {isLocked ? (
            <DefaultButton disabled className={styles.lockedLabel}>
              Робота на перевірці
            </DefaultButton>
          ) : isSubmitted ? (
            <DefaultButton
              className={styles.unsubmitBtn}
              onClick={() => formActions?.onUnsubmit()}
              disabled={status.isSubmitting}
            >
              Скасувати надсилання
            </DefaultButton>
          ) : (
            <>
              <DefaultButton
                disabled={status.isSubmitting}
                className={styles.submitBtn}
                onClick={handleSubmitClick}
              >
                {status.isSubmitting ? 'Завантаження...' : 'Надіслати роботу'}
              </DefaultButton>
              <FormSubmitButton
                form='submit-work-form'
                isLoading={status.isSubmitting}
                className={styles.draftBtn}
                onClick={() => formActions?.saveDraft()}
              >
                Зберегти чернетку
              </FormSubmitButton>
            </>
          )}
        </div>
      </div>

      {data.activeSubmission && <SubmissionInfoCards submission={data.activeSubmission} />}

      <div className={styles.contentContainer}>
        <RoundDescriptionBlock description={data.round?.description} />

        <RequirementsContentBlock requirements={data.requirements || []} />
      </div>

      <SubmitWorkForm
        tournamentId={ids.tournamentId}
        roundId={ids.roundId}
        teamId={data.myTeam.id}
        submission={data.activeSubmission}
        onLoadingChange={actions.setIsSubmitting}
        onActionsReady={setFormActions}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lazy>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>Підтвердження відправки</h3>
          <p className={styles.modalText}>
            Ви впевнені, що хочете надіслати роботу на перевірку? Після відправки ви зможете
            повернути її в чернетку, якщо прийом робіт ще відкритий.
          </p>
          <div className={styles.modalActions}>
            <DefaultButton
              className={styles.cancelBtn}
              onClick={() => setIsModalOpen(false)}
              disabled={status.isSubmitting}
            >
              Відмінити
            </DefaultButton>
            <DefaultButton
              className={styles.confirmBtn}
              onClick={handleConfirmSubmit}
              disabled={status.isSubmitting}
            >
              {status.isSubmitting ? 'Надсилання...' : 'Підтвердити'}
            </DefaultButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};
