import React from 'react';
import styles from './TournamentOrganizers.module.css';
import { OrganizerCard } from '../OrganizerCard/OrganizerCard';
import { ContentBlock } from '@shared/ui';
import { useCurrentTournament } from '@entities/tournament';

export interface OrganizerData {
  id: string | number;
  fullName: string;
  role: string;
  subRole?: string;
}

export const TournamentOrganizers: React.FC = () => {
  const { tournament } = useCurrentTournament();

  if (!tournament) return null;

  // We map the organizer from the tournament domain to an array for compatibility with the layout
  const organizers: OrganizerData[] = [
    { id: 1, fullName: tournament.organizer || "SaloBoard Team", role: "Організатор" }
  ];

  // Jury list left empty for now, could be fetched or mapped from tournament in the future
  const jury: OrganizerData[] = [];

  if (organizers.length === 0 && jury.length === 0) return null;

  return (
    <ContentBlock title="Організатори та журі">
      <div className={styles.layout}>
        {organizers.map(org => (
          <OrganizerCard key={org.id} fullName={org.fullName} role={org.role} subRole={org.subRole} />
        ))}
        {jury.map(member => (
          <OrganizerCard key={member.id} fullName={member.fullName} role={member.role} subRole={member.subRole} />
        ))}
      </div>
    </ContentBlock>
  );
};
