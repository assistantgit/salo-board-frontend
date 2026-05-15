import { ClipboardCheckIcon, ClipboardIcon, GridIcon } from '@shared/ui/icons';
import { InfoCard } from '@shared/ui/info-card';
import type React from 'react';
import styles from './JuryStats.module.css';

interface JuryStatsProps {
  activeTournamentsCount?: number;
  pendingEvaluationsCount?: number;
  completedEvaluationsCount?: number;
}

/**
 * JuryStats widget displays key metrics for the jury dashboard.
 * Uses InfoCard shared component for consistent styling.
 */
export const JuryStats: React.FC<JuryStatsProps> = ({
  activeTournamentsCount = 0,
  pendingEvaluationsCount = 0,
  completedEvaluationsCount = 0,
}) => {
  return (
    <div className={styles.container}>
      <InfoCard
        icon={<GridIcon size={32} />}
        value={activeTournamentsCount}
        label='Активні турніри'
        className={styles.card}
      />
      <InfoCard
        icon={<ClipboardIcon size={32} />}
        value={pendingEvaluationsCount}
        label='Робіт для оцінки'
        className={styles.card}
      />
      <InfoCard
        icon={<ClipboardCheckIcon size={32} />}
        value={completedEvaluationsCount}
        label='Оцінених робіт'
        className={styles.card}
      />
    </div>
  );
};
