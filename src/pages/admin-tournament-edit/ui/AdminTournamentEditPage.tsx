import { AdminTournamentEditWidget } from '@widgets/admin-tournament-edit';
import type React from 'react';
import { useParams } from 'react-router-dom';

export const AdminTournamentEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <AdminTournamentEditWidget id={id} />;
};
