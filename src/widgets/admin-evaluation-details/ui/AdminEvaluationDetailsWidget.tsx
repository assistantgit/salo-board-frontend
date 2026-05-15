import { useAdminEvaluation } from '@entities/evaluation/lib/hooks/useAdminEvaluation';
import { useAdminSubmission } from '@entities/submission';
import { useRoundDetails } from '@entities/tournament';
import { formatFullName } from '@entities/user/lib/formatFullName';
import { ActionInput, CalendarIcon, DocumentIcon, TimerIcon, UserIcon } from '@shared/ui';
import { AdminPageLayout } from '@widgets/admin-page-layout';
import type React from 'react';
import styles from './AdminEvaluationDetailsWidget.module.css';

interface AdminEvaluationDetailsWidgetProps {
  tournamentId: number;
  roundId: number;
  evaluationId: number;
}

const EVALUATION_STATUS_LABELS: Record<string, string> = {
  DR: 'Чернетка',
  SB: 'Оцінено',
};

export const AdminEvaluationDetailsWidget: React.FC<AdminEvaluationDetailsWidgetProps> = ({
  tournamentId,
  roundId,
  evaluationId,
}) => {
  const { data: evaluation, isLoading: isEvaluationLoading } = useAdminEvaluation(
    tournamentId,
    roundId,
    evaluationId,
  );

  const { data: round, isLoading: isRoundLoading } = useRoundDetails(tournamentId, roundId, true);

  const { data: submission, isLoading: isSubmissionLoading } = useAdminSubmission(
    tournamentId,
    roundId,
    evaluation?.submission || 0,
  );

  const isLoading = isEvaluationLoading || isRoundLoading || (evaluation && isSubmissionLoading);

  if (isLoading) {
    return (
      <AdminPageLayout title='Завантаження...' subtitle='Зачекайте, будь ласка' withBackButton>
        <div className={styles.loading}>Завантаження даних оцінки...</div>
      </AdminPageLayout>
    );
  }

  const formatDate = (date?: string | null) => {
    if (!date) return '—';
    return new Date(date).toLocaleString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatOnlyDate = (date?: string | null) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('uk-UA');
  };

  return (
    <AdminPageLayout
      title='Перегляд оцінки'
      subtitle={`Команда: ${submission?.teamName || '—'} | Раунд: ${round?.title || '—'}`}
      withBackButton
    >
      <div className={styles.form}>
        <header className={styles.headerTitle}>
          <h2 className={styles.title}>Деталі оцінки</h2>
        </header>

        <div className={styles.mainGrid}>
          {/* Left Column: Evaluation Content */}
          <div className={styles.column}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <DocumentIcon size='sm' /> Інформація
              </h3>
              <ActionInput
                label='Суддя'
                Icon={UserIcon}
                props={{
                  value: formatFullName(evaluation?.juryFirstName, evaluation?.juryLastName) || '—',
                  disabled: true,
                }}
                placeholder={''}
              />
              <ActionInput
                label='Команда (Робота)'
                props={{
                  value: submission?.teamName || `ID роботи: ${evaluation?.submission}`,
                  disabled: true,
                }}
                placeholder={''}
              />
              <ActionInput
                label='Раунд'
                props={{ value: round?.title || '—', disabled: true }}
                placeholder={''}
              />
              <ActionInput
                label='Коментар судді'
                isTextArea
                props={{ value: evaluation?.comment || '—', disabled: true }}
                placeholder={''}
              />
              <ActionInput
                label='Оцінено'
                Icon={CalendarIcon}
                props={{
                  value: formatOnlyDate(evaluation?.submittedAt || evaluation?.createdAt),
                  disabled: true,
                }}
                placeholder={''}
              />
            </section>
          </div>

          {/* Right Column: System Info */}
          <div className={styles.column}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <TimerIcon size='sm' /> Системна інформація
              </h3>
              <div className={styles.section}>
                <ActionInput
                  label='Дата створення'
                  props={{ value: formatDate(evaluation?.createdAt), disabled: true }}
                  placeholder={''}
                />
                <ActionInput
                  label='Дата подання'
                  props={{ value: formatDate(evaluation?.submittedAt), disabled: true }}
                  placeholder={''}
                />
                <ActionInput
                  label='Останнє оновлення'
                  props={{
                    value: formatDate(evaluation?.updatedAt || evaluation?.createdAt),
                    disabled: true,
                  }}
                  placeholder={''}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <ActionInput
                    label='ID Оцінки'
                    props={{ value: `#${evaluation?.id}`, disabled: true }}
                    placeholder={''}
                  />
                  <ActionInput
                    label='Статус'
                    props={{
                      value: evaluation?.status
                        ? EVALUATION_STATUS_LABELS[evaluation.status] || evaluation.status
                        : '—',
                      disabled: true,
                    }}
                    placeholder={''}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
};
