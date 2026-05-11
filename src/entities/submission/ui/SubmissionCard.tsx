import { TournamentCardHeader, type TournamentStatus } from '@entities/tournament';
import { BaseCard, DefaultButton } from '@shared/ui';

import type React from 'react';
import { SUBMISSION_STATUS_LABELS, type Submission, type SubmissionStatus } from '../model/types';
import styles from './SubmissionCard.module.css';

interface SubmissionCardProps {
  submission: Submission;
  onAction?: (id: number) => void;
  actionLabel?: string;
}

const STATUS_MAP: Record<SubmissionStatus, TournamentStatus> = {
  DRAFT: 'RG', // Green
  UNRATED: 'FN', // Blue
  RATED: 'RN', // Red
};

const BUTTON_TEXT: Record<SubmissionStatus, string> = {
  DRAFT: 'Продовжити оцінювання',
  UNRATED: 'Оцінити',
  RATED: 'Переглянути оцінки',
};

/**
 * Premium Submission Card.
 * Redone from 0 to ensure high quality and FSD compliance.
 */
export const SubmissionCard: React.FC<SubmissionCardProps> = ({
  submission,
  onAction,
  actionLabel,
}) => {
  const { id, tournamentTitle, roundTitle, teamName, status } = submission;

  const handleAction = () => onAction?.(id);

  const buttonText = actionLabel || BUTTON_TEXT[status];

  return (
    <BaseCard
      className={styles.card}
      header={
        <TournamentCardHeader
          title={tournamentTitle}
          status={STATUS_MAP[status]}
          statusLabel={SUBMISSION_STATUS_LABELS[status]}
          withBackground={true}
        />
      }
      footer={
        <DefaultButton className={styles.actionButton} onClick={handleAction}>
          {buttonText}
        </DefaultButton>
      }
    >
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Раунд</span>
          <span className={styles.statValue}>{roundTitle}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Команда</span>
          <span className={styles.statValue}>{teamName}</span>
        </div>
      </div>
    </BaseCard>
  );
};
