import type { TournamentStatus } from '../model/tournament.types';
import { TournamentCardHeader } from './TournamentCardHeader';
import { TournamentCardStats } from './TournamentCardStats';
import { TournamentProgressBar } from './TournamentProgressBar';
import styles from './TournamentCard.module.css';

const STATUS_LABEL: Record<TournamentStatus, string> = {
  DR: 'Ще не почався',
  RG: 'Реєстрація відкрита',
  RN: 'У процесі',
  FN: 'Закінчений',
  AR: 'Архів',
};

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
