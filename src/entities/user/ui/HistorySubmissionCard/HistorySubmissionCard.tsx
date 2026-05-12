import { TournamentCardHeader, type TournamentStatus } from '@entities/tournament';
import type React from 'react';
import type { UserSubmissionDto } from '../../model/types';
import styles from './HistorySubmissionCard.module.css';

interface HistorySubmissionCardProps {
  submission: UserSubmissionDto;
  onView?: (id: number) => void;
}

const STATUS_MAP: Record<string, TournamentStatus> = {
  SB: 'FN', // Blue (Submitted)
  DR: 'RG', // Green (Draft)
  LK: 'RN', // Red (Locked/Rated)
};

const STATUS_LABELS: Record<string, string> = {
  SB: 'Надіслано',
  DR: 'Чернетка',
  LK: 'Заблоковано',
};

export const HistorySubmissionCard: React.FC<HistorySubmissionCardProps> = ({
  submission,
  onView,
}) => {
  const { id, tournamentTitle, roundTitle, teamName, status } = submission;

  return (
    <article className={styles.card}>
      <TournamentCardHeader
        title={tournamentTitle ?? 'Турнір'}
        status={STATUS_MAP[status] || 'RN'}
        statusLabel={STATUS_LABELS[status] || status}
        withBackground={true}
      />

      <div className={styles.body}>
        <div className={styles.infoGrid}>
          <div className={styles.stat}>
            <span className={styles.label}>Раунд</span>
            <span className={styles.value}>{roundTitle || submission.round}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Команда</span>
            <span className={styles.value}>{teamName}</span>
          </div>
        </div>

        <button className={styles.viewButton} onClick={() => onView?.(id)}>
          Переглянути
        </button>
      </div>
    </article>
  );
};
