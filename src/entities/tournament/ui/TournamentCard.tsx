import { TOURNAMENT_STATUS_LABELS } from '../config/statuses';
import type { TournamentStatus } from '../model/tournament.types';
import styles from './TournamentCard.module.css';
import { TournamentCardHeader } from './TournamentCardHeader';
import { TournamentCardStats } from './TournamentCardStats';
import { TournamentProgressBar } from './TournamentProgressBar';

const STATUS_LABEL = TOURNAMENT_STATUS_LABELS;

// ISP — only fields this card renders
export interface TournamentCardProps {
  id: number;
  title: string;
  organizer: string;
  status: TournamentStatus;
  dateLabel: string;
  dateValue: string;
  teamsCount: number | null;
  roundsCount: number;
  progress: number;
  ctaSlot: React.ReactNode;
}

export const TournamentCard = ({
  title,
  organizer,
  status,
  dateLabel,
  dateValue,
  teamsCount,
  roundsCount,
  progress,
  ctaSlot,
}: TournamentCardProps) => (
  <article className={styles.card}>
    <TournamentCardHeader
      title={title}
      organizer={organizer}
      status={status}
      statusLabel={STATUS_LABEL[status]}
    />
    <div className={styles.body}>
      <TournamentCardStats
        dateLabel={dateLabel}
        dateValue={dateValue}
        teamsCount={teamsCount}
        roundsCount={roundsCount}
      />
      <TournamentProgressBar progress={progress} status={status} />
      {ctaSlot}
    </div>
  </article>
);
