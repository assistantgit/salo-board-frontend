import {
  TOURNAMENT_STATUS_LABELS,
  TournamentCardHeader,
  type TournamentStatus,
} from '@entities/tournament';
import { DefaultButton } from '@shared/ui';
import type React from 'react';
import styles from './JuryTournamentCard.module.css';

export interface JuryTournamentCardProps {
  id: number;
  title: string;
  status: TournamentStatus;
  organizer?: string;
  roundTitle?: string;
  endDate?: string;
  onView?: (id: number) => void;
}

export const JuryTournamentCard: React.FC<JuryTournamentCardProps> = ({
  id,
  title,
  status,
  organizer = 'Salo Board',
  roundTitle = '—',
  endDate = '—',
  onView,
}) => {
  const handleView = () => onView?.(id);

  return (
    <article className={styles.card}>
      <TournamentCardHeader
        title={title}
        organizer={organizer}
        status={status}
        statusLabel={TOURNAMENT_STATUS_LABELS[status]}
      />

      <div className={styles.body}>
        <div className={styles.infoGrid}>
          <div className={styles.stat}>
            <span className={styles.label}>Поточний раунд</span>
            <span className={styles.value}>{roundTitle}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Дедлайн раунду</span>
            <span className={styles.value}>{endDate}</span>
          </div>
        </div>

        <DefaultButton className={styles.viewButton} onClick={handleView}>
          Оцінити
        </DefaultButton>
      </div>
    </article>
  );
};
