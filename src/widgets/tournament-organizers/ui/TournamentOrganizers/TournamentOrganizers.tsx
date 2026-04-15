import React from 'react';
import styles from './TournamentOrganizers.module.css';
import { OrganizerCard } from '../OrganizerCard/OrganizerCard';
import { useCurrentTournament } from '@entities/tournament';

import type { OrganizerData } from '../../model/types';

export const TournamentOrganizers: React.FC = () => {
  const { tournament } = useCurrentTournament();

  if (!tournament) return null;

  // Mocking the specific data from the user screenshot until backend supplies jury
  const participants: OrganizerData[] = [
    {
      id: 1,
      fullName: tournament.organizerName || tournament.organizer || "SaloBoard Team",
      role: "Організатор",
      subRole: "Адміністратор"
    }
  ];

  if (participants.length === 0) return null;

  return (
    <div className={styles.layout}>
      {participants.map(p => (
        <OrganizerCard key={p.id} {...p} />
      ))}
    </div>
  );
};
