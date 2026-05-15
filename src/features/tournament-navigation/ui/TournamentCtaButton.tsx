import { Link } from 'react-router-dom';
import type { TournamentStatus } from '../../../entities/tournament/model/tournament.types';
import { getCtaConfig } from '../lib/getCtaConfig';
import styles from './TournamentCtaButton.module.css';

interface TournamentCtaButtonProps {
  id: number;
  status: TournamentStatus;
  role?: string;
  title?: string;
}

export const TournamentCtaButton = ({ id, status, role, title }: TournamentCtaButtonProps) => {
  const { label, href } = getCtaConfig(status);

  let targetHref = href(id);
  let targetLabel = label;

  if (role === 'admin') {
    targetHref = `/admin/tournaments?search=${encodeURIComponent(title || '')}`;
    targetLabel = 'Керувати';
  }

  return (
    <Link
      to={targetHref}
      className={`${styles.btn} ${styles[status.toLowerCase() as Lowercase<TournamentStatus>]}`}
    >
      {targetLabel}
    </Link>
  );
};
