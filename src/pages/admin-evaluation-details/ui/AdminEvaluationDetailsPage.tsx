import { AdminEvaluationDetailsWidget } from '@widgets/admin-evaluation-details';
import type React from 'react';
import { useParams } from 'react-router-dom';

export const AdminEvaluationDetailsPage: React.FC = () => {
  const { tournamentId, roundId, evaluationId } = useParams<{
    tournamentId: string;
    roundId: string;
    evaluationId: string;
  }>();

  return (
    <AdminEvaluationDetailsWidget
      tournamentId={Number(tournamentId)}
      roundId={Number(roundId)}
      evaluationId={Number(evaluationId)}
    />
  );
};
