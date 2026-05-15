import { BaseCard } from '@shared/ui';
import { TOURNAMENT_STATUS_LABELS } from '../config/statuses';
import type { TournamentStatus } from '../model/tournament.types';
import styles from './TournamentCard.module.css';
import { TournamentCardHeader } from './TournamentCardHeader';
import { TournamentCardStats } from './TournamentCardStats';
import { TournamentProgressBar } from './TournamentProgressBar';

const STATUS_LABEL = TOURNAMENT_STATUS_LABELS;

export interface TournamentCardProps {
  id: number;
  title: string;
  organizer: string;
  status: TournamentStatus;
  dateLabel: string;
  dateValue: string;
  regRange: string;
  durationRange: string;
  progress: number;
  role?: string;
  ctaSlot: React.ReactNode;
}

/**
 * Standardized Tournament Card.
 * Uses BaseCard for consistent premium feel.
 */
export const TournamentCard = ({
  title,
  organizer,
  status,
  dateLabel,
  dateValue,
  regRange,
  durationRange,
  progress,
  role,
  ctaSlot,
}: TournamentCardProps) => (
  <BaseCard
    className={styles.card}
    header={
      <TournamentCardHeader
        title={title}
        organizer={organizer}
        status={status}
        statusLabel={STATUS_LABEL[status]}
        role={role}
        withBackground={true}
      />
    }
    footer={ctaSlot}
  >
    <TournamentCardStats
      dateLabel={dateLabel}
      dateValue={dateValue}
      regRange={regRange}
      durationRange={durationRange}
    />
    <TournamentProgressBar progress={progress} status={status} />
  </BaseCard>
);
