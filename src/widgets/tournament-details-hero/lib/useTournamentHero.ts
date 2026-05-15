import {
  useActiveRoundSubmission,
  useMyTeamInTournament,
  useTeamSubmissions,
} from '@entities/team';
import { useRounds, useTournament } from '@entities/tournament';
import { useMemo } from 'react';

export function useTournamentHero(tournamentId: number) {
  const { tournament, isLoading: isTournamentLoading } = useTournament(tournamentId);
  const { rounds, isLoading: isRoundsLoading } = useRounds(tournamentId);
  const { data: myTeam, isLoading: isTeamLoading } = useMyTeamInTournament(tournamentId);
  const { data: submissions, isLoading: isSubmissionsLoading } = useTeamSubmissions(myTeam?.id);

  const activeRound = useMemo(() => rounds.find((r) => r.status === 'AC'), [rounds]);

  const activeRoundSubmission = useActiveRoundSubmission(activeRound, submissions);

  const isDisqualified = myTeam?.status === 'DQ';

  const buttonState = useMemo(() => {
    if (!tournament || !activeRound) return { type: 'none' };
    if (tournament.status !== 'RN') return { type: 'none' };

    const isDeadlinePassed = new Date(activeRound.deadline) < new Date();
    if (isDeadlinePassed) return { type: 'none' };

    if (!activeRoundSubmission) {
      return { type: 'submit', label: 'Відправити роботу' };
    }

    if (activeRoundSubmission.status === 'DR') {
      return { type: 'edit', label: 'Редагувати / Відправити' };
    }

    return { type: 'view', label: 'Переглянути сабміт' };
  }, [tournament, activeRound, activeRoundSubmission]);

  return {
    tournament,
    buttonState,
    isDisqualified,
    isLoading: isTournamentLoading || isRoundsLoading || isTeamLoading || isSubmissionsLoading,
  };
}
