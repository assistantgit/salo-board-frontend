import type { TournamentStatus } from '../model/tournament.types';
import styles from './TournamentStatusBadge.module.css';

interface TournamentStatusBadgeProps {
  status: TournamentStatus;
}

const STATUS_CONFIG: Record<TournamentStatus, { label: string; className: string }> = {
  DR: { label: 'Ще не почався', className: styles.dr },
  RG: { label: 'Реєстрація відкрита', className: styles.rg },
  RN: { label: 'У процесі', className: styles.rn },
  FN: { label: 'Закінчений', className: styles.fn },
  AR: { label: 'Архів', className: styles.ar },
};

export const TournamentStatusBadge = ({ status }: TournamentStatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <span className={`${styles.badge} ${config.className}`}>
      <span className={styles.dot} />
      {config.label}
    </span>
  );
};
