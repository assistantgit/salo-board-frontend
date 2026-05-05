import { useMyTeamInTournament } from '@entities/team';
import { useLeaderboard, useRoundDetails, useRounds } from '@entities/tournament';
import { useMemo } from 'react';

export function useRoundInfoCards(tournamentId: number, roundId: number) {
  const { leaderboard, isLoading: isLeaderboardLoading } = useLeaderboard(tournamentId);
  const { data: myTeam, isLoading: isTeamLoading } = useMyTeamInTournament(tournamentId);
  const { data: round, isLoading: isRoundLoading } = useRoundDetails(tournamentId, roundId);
  const { rounds, isLoading: isRoundsLoading } = useRounds(tournamentId);

  const stats = useMemo(() => {
    if (!myTeam || !leaderboard.length || !round || !rounds.length) return null;

    // 1. Rank
    const teamRank = leaderboard.findIndex((item) => item.teamId === myTeam.id) + 1;

    // 2. Cumulative Score
    // For now, let's show the team's total score from the leaderboard if it's an EV round.
    const teamInLeaderboard = leaderboard.find((item) => item.teamId === myTeam.id);
    const score = teamInLeaderboard?.totalScore ?? 0;

    // 3. Time left
    let timeLeft = '';
    if (round.status === 'AC') {
      const diff = new Date(round.deadline).getTime() - Date.now();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        timeLeft = days > 0 ? `${days}д ${hours}г` : `${hours}г`;
      } else {
        timeLeft = 'Завершено';
      }
    }

    return {
      rank: teamRank || '—',
      score: score,
      status: myTeam.status === 'DQ' ? 'Дискваліфіковано' : 'Зареєстровано',
      timeLeft: timeLeft,
      deadlineDate: new Date(round.deadline).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      isEvaluated: round.status === 'EV',
      isActive: round.status === 'AC',
    };
  }, [myTeam, leaderboard, round, rounds]);

  return {
    stats,
    isLoading: isLeaderboardLoading || isTeamLoading || isRoundLoading || isRoundsLoading,
  };
}
