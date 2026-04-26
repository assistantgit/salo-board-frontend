import { useMemo } from 'react';
import { useTournament, useRounds } from '@entities/tournament';
import { useMyTeamInTournament, useTeamSubmissions } from '@entities/team';
import { useActiveRoundSubmission } from '@entities/team/lib/useActiveRoundSubmission';
import type { RoundDto, TournamentDomain } from '@entities/tournament';
import type { SubmissionDto } from '@entities/team/model/team.types';

interface TournamentOverviewHeaderState {
  tournament: TournamentDomain | null;
  activeRound: RoundDto | undefined;
  activeRoundSubmission: SubmissionDto | null;
  canSubmit: boolean;
  isLoading: boolean;
}

/**
 * Encapsulates ALL business logic for TournamentDetailsHeader:
 *  - which round is active
 *  - whether the current user can submit
 *  - whether they already have a submission for this round
 *
 * The UI component becomes a pure render function.
 */
export function useTournamentOverviewHeader(
  tournamentId: number | undefined,
): TournamentOverviewHeaderState {
  const { tournament, isLoading: isTournamentLoading } = useTournament(tournamentId ?? null);
  const { rounds, isLoading: isRoundsLoading } = useRounds(tournamentId);
  const { data: myTeam, isLoading: isTeamLoading } = useMyTeamInTournament(tournamentId);
  const { data: submissions, isLoading: isSubmissionsLoading } = useTeamSubmissions(myTeam?.id);

  const activeRound = useMemo(
    () => rounds.find((r) => r.status === 'AC'),
    [rounds],
  );

  const canSubmit = useMemo(() => {
    if (!tournament || !activeRound) return false;
    if (tournament.status !== 'RN') return false;
    return new Date(activeRound.deadline) > new Date();
  }, [tournament, activeRound]);

  const activeRoundSubmission = useActiveRoundSubmission(activeRound, submissions);

  return {
    tournament,
    activeRound,
    activeRoundSubmission,
    canSubmit,
    isLoading: isTournamentLoading || isRoundsLoading || isTeamLoading || isSubmissionsLoading,
  };
}
