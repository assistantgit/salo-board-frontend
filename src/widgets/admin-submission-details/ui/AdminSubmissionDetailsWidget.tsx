import { RAW_SUBMISSION_STATUS_LABELS, useAdminSubmission } from '@entities/submission';
import { useRoundDetails } from '@entities/tournament';
import { ActionInput, CalendarIcon, CodeIcon, DocumentIcon, LinkIcon, TimerIcon } from '@shared/ui';
import { AdminPageLayout } from '@widgets/admin-page-layout';
import type React from 'react';
import styles from './AdminSubmissionDetailsWidget.module.css';

interface AdminSubmissionDetailsWidgetProps {
  tournamentId: number;
  roundId: number;
  submissionId: number;
}

export const AdminSubmissionDetailsWidget: React.FC<AdminSubmissionDetailsWidgetProps> = ({
  tournamentId,
  roundId,
  submissionId,
}) => {
  const { data: submission, isLoading: isSubmissionLoading } = useAdminSubmission(
    tournamentId,
    roundId,
    submissionId,
  );

  const { data: round, isLoading: isRoundLoading } = useRoundDetails(tournamentId, roundId, true);

  if (isSubmissionLoading || isRoundLoading) {
    return (
      <AdminPageLayout title='Завантаження...' subtitle='Зачекайте, будь ласка' withBackButton>
        <div className={styles.loading}>Завантаження даних роботи...</div>
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
      title='Перегляд роботи'
      subtitle={`Команда: ${submission?.teamName} | Раунд: ${round?.title}`}
      withBackButton
    >
      <div className={styles.form}>
        <header className={styles.headerTitle}>
          <h2 className={styles.title}>Деталі роботи</h2>
        </header>

        <div className={styles.mainGrid}>
          {/* Left Column: Submission Content */}
          <div className={styles.column}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <DocumentIcon size='sm' /> Інформація
              </h3>
              <ActionInput
                label='Команда'
                props={{ value: submission?.teamName || '—', disabled: true }}
                placeholder={''}
              />
              <ActionInput
                label='Раунд'
                props={{ value: round?.title || '—', disabled: true }}
                placeholder={''}
              />
              <ActionInput
                label='Опис'
                isTextArea
                props={{ value: submission?.description || '—', disabled: true }}
                placeholder={''}
              />
              <ActionInput
                label='Відправлено'
                Icon={CalendarIcon}
                props={{
                  value: formatOnlyDate(submission?.submittedAt || submission?.createdAt),
                  disabled: true,
                }}
                placeholder={''}
              />
            </section>
          </div>

          {/* Right Column: Links & System Info */}
          <div className={styles.column}>
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <LinkIcon size='sm' /> Посилання
              </h3>
              <ActionInput
                label='GitHub'
                Icon={CodeIcon}
                props={{ value: submission?.githubUrl || '—', disabled: true }}
                placeholder={''}
              />
              <ActionInput
                label='Відео'
                Icon={LinkIcon}
                props={{ value: submission?.videoUrl || '—', disabled: true }}
                placeholder={''}
              />
              <ActionInput
                label='Демо'
                Icon={LinkIcon}
                props={{ value: submission?.demoUrl || '—', disabled: true }}
                placeholder={''}
              />
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <TimerIcon size='sm' /> Системна інформація
              </h3>
              <div className={styles.section}>
                <ActionInput
                  label='Дата створення'
                  props={{ value: formatDate(submission?.createdAt), disabled: true }}
                  placeholder={''}
                />
                <ActionInput
                  label='Дата подання'
                  props={{ value: formatDate(submission?.submittedAt), disabled: true }}
                  placeholder={''}
                />
                <ActionInput
                  label='Останнє оновлення'
                  props={{
                    value: formatDate(submission?.updatedAt || submission?.createdAt),
                    disabled: true,
                  }}
                  placeholder={''}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <ActionInput
                    label='ID Роботи'
                    props={{ value: `#${submission?.id}`, disabled: true }}
                    placeholder={''}
                  />
                  <ActionInput
                    label='Статус'
                    props={{
                      value: submission?.status
                        ? RAW_SUBMISSION_STATUS_LABELS[submission.status] || submission.status
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
