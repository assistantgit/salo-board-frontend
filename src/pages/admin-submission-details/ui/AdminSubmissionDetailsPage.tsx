import { AdminSubmissionDetailsWidget } from '@widgets/admin-submission-details';
import type React from 'react';
import { useParams } from 'react-router-dom';

export const AdminSubmissionDetailsPage: React.FC = () => {
  const { tournamentId, roundId, submissionId } = useParams<{
    tournamentId: string;
    roundId: string;
    submissionId: string;
  }>();

  return (
    <AdminSubmissionDetailsWidget
      tournamentId={Number(tournamentId)}
      roundId={Number(roundId)}
      submissionId={Number(submissionId)}
    />
  );
};
