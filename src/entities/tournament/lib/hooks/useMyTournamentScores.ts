import { useMyTeamInTournament } from '@entities/team';
import { useLeaderboard } from '../../api/useLeaderboard';
import type { LeaderboardRoundDto } from '../../model/tournament.types';

/**
 * Returns a map of roundId → LeaderboardRoundDto for the current user's team.
 * Composes useMyTeamInTournament + useLeaderboard — both cached by React Query.
 */
export function useMyTournamentScores(tournamentId: number | string | undefined) {
  const tId = tournamentId ? Number(tournamentId) : undefined;

  const { data: myTeam, isLoading: isTeamLoading } = useMyTeamInTournament(tId);
  const { leaderboard, isLoading: isLeaderboardLoading } = useLeaderboard(tId ?? null);

  const isLoading = isTeamLoading || isLeaderboardLoading;

  const roundScoresMap: Record<number, LeaderboardRoundDto> = {};

  if (myTeam && leaderboard.length > 0) {
    const myEntry = leaderboard.find((entry) => entry.teamId === myTeam.id);
    myEntry?.rounds.forEach((round) => {
      roundScoresMap[round.roundId] = round;
    });
  }

  return { roundScoresMap, isLoading };
}
