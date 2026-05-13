import { useParams } from 'react-router-dom';

export function useEvaluationParams() {
  const params = useParams<{
    tournamentId: string;
    roundId: string;
    submissionId: string;
  }>();

  const tournamentId = Number(params.tournamentId);
  const roundId = Number(params.roundId);
  const submissionId = Number(params.submissionId);

  return {
    tournamentId,
    roundId,
    submissionId,
    isValid: !Number.isNaN(tournamentId) && !Number.isNaN(roundId) && !Number.isNaN(submissionId),
  };
}
