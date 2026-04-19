import type { ComponentPropsWithoutRef } from 'react';
import { DefaultButton } from '@shared/ui';
import { ArrowForwardIcon } from '@shared/ui/icons';
import styles from './TournamentDetailsButton.module.css';

interface TournamentDetailsButtonProps extends ComponentPropsWithoutRef<'button'> {
  tournamentId?: number | string;
}

export const TournamentDetailsButton = ({ tournamentId, className, ...props }: TournamentDetailsButtonProps) => {
  // In the future: use router / navigate to details page using tournamentId
  return (
    <DefaultButton
      className={`${styles.detailsBtn} ${className ?? ''}`}
      {...props}
    >
      Деталі турніру
      <span className={styles.iconWrap}>
        <ArrowForwardIcon />
      </span>
    </DefaultButton>
  );
};
