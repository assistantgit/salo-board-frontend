import {
  RequirementsContentBlock,
  RoundDescriptionBlock,
  SubmitStatusBadge,
} from '@entities/tournament';
import { NavigateBackButton } from '@features/navigate';
import { SubmitWorkForm } from '@features/tournament-submission';
import { FormSubmitButton } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import { useTournamentSubmission } from '../lib/useTournamentSubmission';
import styles from './TournamentSubmissionWidget.module.css';

export const TournamentSubmissionWidget: React.FC = () => {
  const navigate = useNavigate();
  const { ids, data, status, actions } = useTournamentSubmission();

  if (status.isLoading) {
    return <div className={styles.loaderContainer}>Завантаження...</div>;
  }

  if (!data.myTeam) {
    return (
      <div className={styles.errorContainer}>Ви не є учасником жодної команди у цьому турнірі.</div>
    );
  }

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
          <FormSubmitButton
            form='submit-work-form'
            isLoading={status.isSubmitting}
            className={styles.topSubmitBtn}
          >
            {data.activeSubmission ? 'Оновити роботу' : 'Відправити роботу'}
          </FormSubmitButton>
        </div>
      </div>

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
      />
    </div>
  );
};
