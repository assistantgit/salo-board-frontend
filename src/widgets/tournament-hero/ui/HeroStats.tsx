import type React from 'react';
import styles from './HeroStats.module.css';

interface HeroStatsProps {
  startDate: string;
  regCloseAt: string;
  minTeamSize: number;
  maxTeamSize: number;
  maxTeam: number;
}

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d
      .toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      .replace(' р.', '');
  } catch {
    return dateStr;
  }
};

export const HeroStats: React.FC<HeroStatsProps> = ({
  startDate,
  regCloseAt,
  minTeamSize,
  maxTeamSize,
  maxTeam,
}) => {
  return (
    <div className={styles.statsRow}>
      <div className={styles.statItem}>
        <span className={styles.statLabel}>ПОЧАТОК</span>
        <span className={styles.statValue}>{formatDate(startDate)}</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statLabel}>РЕЄСТРАЦІЯ ДО</span>
        <span className={styles.statValue}>{formatDate(regCloseAt)}</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statLabel}>КОМАНДИ</span>
        <span className={styles.statValue}>
          {minTeamSize === maxTeamSize ? maxTeamSize : `${minTeamSize}-${maxTeamSize}`} учасників
        </span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statLabel}>МАКС. КОМАНД</span>
        <span className={styles.statValue}>{maxTeam}</span>
      </div>
    </div>
  );
};
