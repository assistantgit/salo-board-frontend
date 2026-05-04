import { useKeyDatesStore } from '@entities/tournament';
import { CheckIcon, HistoryIcon, StatusInfoCard } from '@shared/ui';
import type React from 'react';
import styles from './TournamentStatusBanner.module.css';

/**
 * TournamentStatusBanner Widget.
 * Displays key status indicators for the tournament.
 * Values are synced with the keyDatesStore for future updates.
 */
export const TournamentStatusBanner: React.FC = () => {
  const { lastUpdate, submissionDate } = useKeyDatesStore();

  return (
    <div className={styles.banner}>
      <StatusInfoCard
        title='Останнє оновлення'
        value={lastUpdate || 'Немає даних'}
        icon={<HistoryIcon />}
        variant='primary'
      />
      <StatusInfoCard
        title='Робота була відправленна'
        value={submissionDate || 'Немає даних'}
        icon={<CheckIcon />}
        variant='success'
      />
    </div>
  );
};
