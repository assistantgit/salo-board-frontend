import type { TournamentStatus } from '@entities/tournament';
import { TournamentStatusBadge } from '@entities/tournament';
import type React from 'react';
import styles from './HeroHeader.module.css';

interface HeroHeaderProps {
  status: TournamentStatus;
  title: string;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ status, title }) => {
  return (
    <header className={styles.heroHeader}>
      <TournamentStatusBadge status={status} />
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};
