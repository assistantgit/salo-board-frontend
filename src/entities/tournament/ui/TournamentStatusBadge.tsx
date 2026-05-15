import { TOURNAMENT_STATUS_COLORS } from '../config/statuses';
import type { TournamentStatus } from '../model/tournament.types';
import styles from './TournamentStatusBadge.module.css';

interface TournamentStatusBadgeProps {
  status: TournamentStatus;
  className?: string;
}

const STATUS_CONFIG: Record<TournamentStatus, { label: string; className: string }> = {
  DR: { label: 'ЧЕРНЕТКА', className: styles.dr },
  RG: { label: 'РЕЄСТРАЦІЯ', className: styles.rg },
  RN: { label: 'ТРИВАЄ', className: styles.rn },
  FN: { label: 'ЗАВЕРШЕНО', className: styles.fn },
  AR: { label: 'АРХІВ', className: styles.ar },
};

export const TournamentStatusBadge = ({ status, className }: TournamentStatusBadgeProps) => {
  const config = STATUS_CONFIG[status];
  const colorConfig = TOURNAMENT_STATUS_COLORS[status];

  return (
    <span className={`${styles.badge} ${config.className} ${className || ''}`}>
      <span className={styles.dot} style={{ backgroundColor: colorConfig }} />
      {config.label}
    </span>
  );
};
