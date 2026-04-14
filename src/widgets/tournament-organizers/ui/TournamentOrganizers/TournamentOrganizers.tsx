import React from 'react';
import styles from './TournamentOrganizers.module.css';
import { OrganizerCard } from '../OrganizerCard/OrganizerCard';
import { ContentBlock } from '@shared/ui';

export interface OrganizerData {
  id: string | number;
  fullName: string;
  role: string;
  subRole?: string;
}

export interface TournamentOrganizersProps {
  organizers: OrganizerData[];
  jury?: OrganizerData[];
  className?: string;
}

export const TournamentOrganizers: React.FC<TournamentOrganizersProps> = ({ 
  organizers = [], 
  jury = [], 
  className 
}) => {
  if (organizers.length === 0 && jury.length === 0) return null;

  return (
    <ContentBlock title="Організатори та журі" className={className}>
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
