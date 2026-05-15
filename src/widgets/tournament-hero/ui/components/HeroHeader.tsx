import {
  TOURNAMENT_STATUS_COLORS,
  type TournamentStatus,
  TournamentStatusBadge,
} from '@entities/tournament';
import type React from 'react';
import styles from './HeroHeader.module.css';

interface HeroHeaderProps {
  status: TournamentStatus;
  title: string;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ status, title }) => {
  const color = TOURNAMENT_STATUS_COLORS[status];

  return (
    <header
      className={styles.heroHeader}
      style={{ '--status-color': color } as React.CSSProperties}
    >
      <TournamentStatusBadge status={status} />
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};
