import { TournamentCardHeader, type TournamentStatus } from '@entities/tournament';
import type React from 'react';
import type { TeamDomain } from '../../model/team.types';
import styles from './HistoryTeamCard.module.css';

const STATUS_MAP: Record<string, TournamentStatus> = {
  RG: 'FN', // Blue/Green
  DQ: 'RN', // Red
  AR: 'FN', // Finished
};

const STATUS_LABELS: Record<string, string> = {
  RG: 'Зареєстрована',
  DQ: 'Дискваліфікована',
  AR: 'В архіві',
};

export interface HistoryTeamCardProps {
  team: TeamDomain;
  onView?: (id: number) => void;
}

/**
 * HistoryTeamCard component for archived teams list.
 * Styled to match HistorySubmissionCard.
 */
export const HistoryTeamCard: React.FC<HistoryTeamCardProps> = ({ team, onView }) => {
  const { id, name, tournamentTitle, status } = team;

  return (
    <article className={styles.card}>
      <TournamentCardHeader
        title={tournamentTitle || 'Архівний турнір'}
        status={STATUS_MAP[status] || 'RN'}
        statusLabel={STATUS_LABELS[status] || status}
        withBackground={true}
      />

      <div className={styles.body}>
        <div className={styles.infoGrid}>
          <div className={styles.stat}>
            <span className={styles.label}>Команда</span>
            <span className={styles.value}>{name}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Статус</span>
            <span className={styles.value}>{STATUS_LABELS[status] || status}</span>
          </div>
        </div>

        <button className={styles.viewButton} onClick={() => onView?.(id)} type='button'>
          Деталі
        </button>
      </div>
    </article>
  );
};
