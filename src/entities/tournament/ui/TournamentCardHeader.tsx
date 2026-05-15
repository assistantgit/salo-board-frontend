import { TOURNAMENT_STATUS_COLORS } from '../config/statuses';
import type { TournamentStatus } from '../model/tournament.types';
import styles from './TournamentCardHeader.module.css';

interface TournamentCardHeaderProps {
  title: string;
  organizer?: string;
  status: TournamentStatus;
  statusLabel: string;
  role?: string;
  withBackground?: boolean;
}

const ROLE_LABELS: Record<string, string> = {
  participant: 'Учасник',
  jury: 'Журі',
  admin: 'Адміністратор',
};

export const TournamentCardHeader = ({
  title,
  organizer,
  status,
  statusLabel,
  role,
  withBackground = false,
}: TournamentCardHeaderProps) => (
  <div
    className={`${styles.head} ${
      withBackground ? styles[status.toLowerCase() as Lowercase<TournamentStatus>] : ''
    }`}
  >
    <div className={styles.topRow}>
      <div className={styles.titleArea}>
        <h3 className={styles.title}>{title}</h3>
        {organizer && <p className={styles.organizer}>Організатор: {organizer}</p>}
        {role && <p className={styles.role}>Ваша роль: {ROLE_LABELS[role] || role}</p>}
      </div>

      <div className={styles.badge}>
        <span
          className={styles.dot}
          style={{ backgroundColor: TOURNAMENT_STATUS_COLORS[status] }}
        />
        {statusLabel}
      </div>
    </div>
  </div>
);
