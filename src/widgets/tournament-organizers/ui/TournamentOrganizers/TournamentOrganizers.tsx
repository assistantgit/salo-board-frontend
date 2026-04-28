import { useCurrentTournament } from '@entities/tournament';
import type React from 'react';
import type { OrganizerData } from '../../model/types';
import { OrganizerCard } from '../OrganizerCard/OrganizerCard';
import styles from './TournamentOrganizers.module.css';
import { TournamentOrganizersSkeleton } from './TournamentOrganizersSkeleton';

export const TournamentOrganizers: React.FC = () => {
  const { tournament, isLoading } = useCurrentTournament();

  if (isLoading) return <TournamentOrganizersSkeleton />;
  if (!tournament) return null;

  // Mocking the specific data from the user screenshot until backend supplies jury
  const participants: OrganizerData[] = [
    {
      id: 1,
      fullName: tournament.organizerName || tournament.organizer || 'SaloBoard Team',
      role: 'Організатор',
      subRole: 'Адміністратор',
    },
  ];

  if (participants.length === 0) return null;

  return (
    <div className={styles.layout}>
      {participants.map((p) => (
        <OrganizerCard key={p.id} {...p} />
      ))}
    </div>
  );
};
