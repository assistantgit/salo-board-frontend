import {
  useActiveRoundSubmission,
  useMyTeamInTournament,
  useTeamSubmissions,
} from '@entities/team';
import { useRoundDetails } from '@entities/tournament';
import { useMemo } from 'react';

export function useRoundHeader(tournamentId: number, roundId: number) {
  const { data: round, isLoading: isRoundLoading } = useRoundDetails(tournamentId, roundId);
  const { data: myTeam, isLoading: isTeamLoading } = useMyTeamInTournament(tournamentId);
  const { data: submissions, isLoading: isSubmissionsLoading } = useTeamSubmissions(myTeam?.id);

  const submission = useActiveRoundSubmission(round, submissions);
  const isDisqualified = myTeam?.status === 'DQ';

  const buttonState = useMemo(() => {
    if (!round) return { type: 'none' };

    const isDeadlinePassed = new Date(round.deadline) < new Date();
    const isActive = round.status === 'AC';

    if (isActive && !isDeadlinePassed) {
      if (!submission) {
        return { type: 'submit', label: 'Відправити роботу' };
      }
      if (submission.status === 'DR') {
        return { type: 'edit', label: 'Редагувати / Відправити' };
      }
    }

    if (submission) {
      return { type: 'view', label: 'Переглянути сабміт' };
    }

    return { type: 'none' };
  }, [round, submission]);

  return {
    round,
    buttonState,
    isDisqualified,
    isLoading: isRoundLoading || isTeamLoading || isSubmissionsLoading,
  };
}
