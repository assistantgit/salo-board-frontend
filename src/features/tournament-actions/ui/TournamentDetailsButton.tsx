import { DefaultButton } from '@shared/ui';
import { ArrowForwardIcon } from '@shared/ui/icons';
import type { ComponentPropsWithoutRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TournamentDetailsButton.module.css';

interface TournamentDetailsButtonProps extends ComponentPropsWithoutRef<'button'> {
  tournamentId?: number | string;
  to?: string;
}

export const TournamentDetailsButton = ({
  tournamentId,
  to,
  className,
  children,
  onClick,
  ...props
}: TournamentDetailsButtonProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      navigate(to);
    } else if (tournamentId) {
      navigate(`/tournaments/${tournamentId}/tournamentDetails/overview`);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <DefaultButton
      className={`${styles.detailsBtn} ${className ?? ''}`}
      onClick={handleClick}
      {...props}
    >
      {children ?? 'Деталі турніру'}
      <span className={styles.iconWrap}>
        <ArrowForwardIcon />
      </span>
    </DefaultButton>
  );
};
