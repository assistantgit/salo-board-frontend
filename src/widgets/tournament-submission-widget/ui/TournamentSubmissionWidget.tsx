import type { SubmissionStatus } from '@entities/team/model/team.types';
import {
  RequirementsContentBlock,
  RoundDescriptionBlock,
  SubmitStatusBadge,
} from '@entities/tournament';
import { NavigateBackButton } from '@features/navigate';
import { SubmitWorkForm } from '@features/tournament-submission';
import { DefaultButton, FormSubmitButton } from '@shared/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTournamentSubmission } from '../lib/useTournamentSubmission';
import { SubmissionInfoCards } from './SubmissionInfoCards';
import styles from './TournamentSubmissionWidget.module.css';

export const TournamentSubmissionWidget: React.FC = () => {
  const navigate = useNavigate();
  const { ids, data, status, actions } = useTournamentSubmission();
  const [formActions, setFormActions] = useState<{
    setTargetStatus: (status: SubmissionStatus) => void;
    onUnsubmit: () => Promise<void>;
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
            <>
              <DefaultButton
                className={styles.unsubmitBtn}
                onClick={() => formActions?.onUnsubmit()}
                disabled={status.isSubmitting}
              >
                Скасувати надсилання
              </DefaultButton>
              <FormSubmitButton
                form='submit-work-form'
                isLoading={status.isSubmitting}
                className={styles.draftBtn}
                onClick={() => formActions?.setTargetStatus('DR')}
              >
                Зберегти чернетку
              </FormSubmitButton>
            </>
          ) : (
            <>
              <FormSubmitButton
                form='submit-work-form'
                isLoading={status.isSubmitting}
                className={styles.topSubmitBtn}
                onClick={() => formActions?.setTargetStatus('SB')}
              >
                Надіслати роботу
              </FormSubmitButton>
              <FormSubmitButton
                form='submit-work-form'
                isLoading={status.isSubmitting}
                className={styles.draftBtn}
                onClick={() => formActions?.setTargetStatus('DR')}
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
    </div>
  );
};
