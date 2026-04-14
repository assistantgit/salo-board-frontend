import React from 'react';
import styles from './TournamentHero.module.css';
import { DefaultButton } from '@shared/ui/buttons';

// Use type from existing entities layer
import type { TournamentStatus } from '@entities/tournament/model/tournament.types';

export interface TournamentHeroProps {
  status: TournamentStatus;
  title: string;
  startDate: string; 
  regCloseAt: string; 
  minTeamSize: number;
  maxTeamSize: number;
  maxTeam: number;
}

const getStatusConfig = (status: TournamentStatus) => {
    switch (status) {
        case 'DR': return { label: 'Чернетка', colorClass: styles.statusDraft };
        case 'RG': return { label: 'Реєстрація', colorClass: styles.statusRegistration };
        case 'RN': return { label: 'Триває', colorClass: styles.statusActive };
        case 'FN': return { label: 'Завершено', colorClass: styles.statusFinished };
        case 'AR': return { label: 'Архів', colorClass: styles.statusArchive };
        default: return { label: 'Невідомо', colorClass: styles.statusDraft };
    }
}

export const TournamentHero: React.FC<TournamentHeroProps> = ({
  status,
  title,
  startDate,
  regCloseAt,
  minTeamSize,
  maxTeamSize,
  maxTeam,
}) => {
  const statusConfig = getStatusConfig(status);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      // Format to "10 квіт. 2026"
      return d.toLocaleDateString('uk-UA', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }).replace(' р.', '');
    } catch (e) {
      return dateStr;
    }
  }

  return (
    <div className={styles.heroContainer}>
      <header className={styles.heroHeader}>
        <div className={`${styles.statusBadge} ${statusConfig.colorClass}`}>
          <div className={styles.statusDot} />
          {statusConfig.label}
        </div>
        
        <h1 className={styles.title}>{title}</h1>
      </header>
      
      <div className={styles.divider} />
      
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
      
      <div className={styles.actions}>
        <DefaultButton className={styles.primaryButton}>Зареєструватися</DefaultButton>
        <DefaultButton className={styles.outlineButton}>Переглянути правила</DefaultButton>
      </div>
    </div>
  )
}
