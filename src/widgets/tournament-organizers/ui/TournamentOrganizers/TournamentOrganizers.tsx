import { useCurrentTournament, useTournamentAdmins, useTournamentJury } from '@entities/tournament';
import { useAuthStore } from '@entities/user';
import { formatFullName } from '@entities/user/lib/formatFullName';
import type React from 'react';
import type { OrganizerData } from '../../model/types';
import { OrganizerCard } from '../OrganizerCard/OrganizerCard';
import styles from './TournamentOrganizers.module.css';
import { TournamentOrganizersSkeleton } from './TournamentOrganizersSkeleton';

export const TournamentOrganizers: React.FC = () => {
  const { tournament, isLoading: isTournamentLoading } = useCurrentTournament();
  const { data: admins = [], isLoading: isAdminsLoading } = useTournamentAdmins(tournament?.id);
  const { data: jury = [], isLoading: isJuryLoading } = useTournamentJury(tournament?.id);

  const isLoading = isTournamentLoading || isAdminsLoading || isJuryLoading;

  if (isLoading) return <TournamentOrganizersSkeleton />;
  if (!tournament) return null;

  const participants: OrganizerData[] = [];

  participants.push({
    id: `organizer-${tournament.id}`,
    fullName: tournament.organizerName || tournament.organizer || 'SaloBoard Team',
    role: 'Організатор',
  });

  admins.forEach((admin) => {
    participants.push({
      id: `admin-${admin.id}`,
      fullName: formatFullName(admin.firstName, admin.lastName) || 'Без імені',
      role: 'Адміністратор',
    });
  });

  jury.forEach((j) => {
    participants.push({
      id: `jury-${j.id}`,
      fullName: formatFullName(j.firstName, j.lastName) || 'Без імені',
      role: 'Журі',
    });
  });

  if (participants.length === 0) return null;

  return (
    <div className={styles.layout}>
      {participants.map((p) => (
        <OrganizerCard key={p.id} {...p} />
      ))}
    </div>
  );
};
