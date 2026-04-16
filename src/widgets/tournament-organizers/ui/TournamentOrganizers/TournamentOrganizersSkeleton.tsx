import React from 'react';
import { OrganizerCardSkeleton } from '../OrganizerCard/OrganizerCardSkeleton';
import styles from './TournamentOrganizers.module.css';

/**
 * Skeleton for TournamentOrganizers widget
 */
export const TournamentOrganizersSkeleton: React.FC = () => {
  return (
    <div className={styles.layout}>
      <OrganizerCardSkeleton />
      <OrganizerCardSkeleton />
    </div>
  );
};
