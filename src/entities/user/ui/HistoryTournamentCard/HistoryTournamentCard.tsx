import {
  TOURNAMENT_STATUS_LABELS,
  TournamentCardHeader,
  type TournamentStatus,
} from '@entities/tournament';
import type React from 'react';
import type { UserTournamentDto } from '../../model/types';
import styles from './HistoryTournamentCard.module.css';

interface HistoryTournamentCardProps {
  tournament: UserTournamentDto;
  onView?: (id: number) => void;
}

export const HistoryTournamentCard: React.FC<HistoryTournamentCardProps> = ({
  tournament,
  onView,
}) => {
  const { id, title, status, startDate, endedAt } = tournament;

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('uk-UA');

  return (
    <article className={styles.card}>
      <TournamentCardHeader
        title={title}
        status={status as TournamentStatus}
        statusLabel={TOURNAMENT_STATUS_LABELS[status as TournamentStatus] || status}
        withBackground={true}
      />

      <div className={styles.body}>
        <div className={styles.infoGrid}>
          <div className={styles.stat}>
            <span className={styles.label}>Початок</span>
            <span className={styles.value}>{formatDate(startDate)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Завершення</span>
            <span className={styles.value}>{formatDate(endedAt)}</span>
          </div>
        </div>

        <button className={styles.viewButton} onClick={() => onView?.(id)}>
          Детальніше
        </button>
      </div>
    </article>
  );
};
