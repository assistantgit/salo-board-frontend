import { TournamentCardHeader, type TournamentStatus } from '@entities/tournament';
import { DefaultButton } from '@shared/ui';
import type React from 'react';
import { SUBMISSION_STATUS_LABELS, type Submission, type SubmissionStatus } from '../model/types';
import styles from './SubmissionCard.module.css';

interface SubmissionCardProps {
  submission: Submission;
  onAction?: (id: number) => void;
}

const STATUS_MAP: Record<SubmissionStatus, TournamentStatus> = {
  DRAFT: 'RG', // Green
  UNRATED: 'FN', // Blue
  RATED: 'RN', // Red
};

/**
 * Premium Submission Card.
 * Redone from 0 to ensure high quality and FSD compliance.
 */
export const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission, onAction }) => {
  const { id, tournamentTitle, roundTitle, teamName, status } = submission;

  const handleAction = () => onAction?.(id);

  const buttonText = {
    DRAFT: 'Продовжити',
    UNRATED: 'Оцінити',
    RATED: 'Переглянути',
  }[status];

  return (
    <article className={styles.card}>
      <TournamentCardHeader
        title={teamName}
        organizer={tournamentTitle}
        status={STATUS_MAP[status]}
        statusLabel={SUBMISSION_STATUS_LABELS[status]}
      />

      <div className={styles.body}>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Раунд</span>
            <span className={styles.statValue}>{roundTitle}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Турнір</span>
            <span className={styles.statValue}>{tournamentTitle}</span>
          </div>
        </div>

        <DefaultButton className={styles.actionButton} onClick={handleAction}>
          {buttonText}
        </DefaultButton>
      </div>
    </article>
  );
};
