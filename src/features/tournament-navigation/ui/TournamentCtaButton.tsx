import { Link } from 'react-router-dom';
import type { TournamentStatus } from '../../../entities/tournament/model/tournament.types';
import { getCtaConfig } from '../lib/getCtaConfig';
import styles from './TournamentCtaButton.module.css';

interface TournamentCtaButtonProps {
  id: number;
  status: TournamentStatus;
}

export const TournamentCtaButton = ({ id, status }: TournamentCtaButtonProps) => {
  const { label, href } = getCtaConfig(status);

  return (
    <Link
      to={href(id)}
      className={`${styles.btn} ${styles[status.toLowerCase() as Lowercase<TournamentStatus>]}`}
    >
      {label}
    </Link>
  );
};
