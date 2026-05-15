import { useMyTeamInTournament } from '@entities/team';
import { useRoundCriteria, useRoundDetails, useTeamLeaderboard } from '@entities/tournament';
import { ChartBase } from '@shared/ui';
import type React from 'react';
import { useMemo } from 'react';

interface CategoryResultsChartProps {
  tournamentId: number;
  roundId: number;
}

export const CategoryResultsChart: React.FC<CategoryResultsChartProps> = ({
  tournamentId,
  roundId,
}) => {
  const { data: round } = useRoundDetails(tournamentId, roundId);
  const { data: myTeam } = useMyTeamInTournament(tournamentId);
  const { details: leaderboardDetails, isLoading: isLeadLoading } = useTeamLeaderboard(
    tournamentId,
    myTeam?.id ?? null,
  );
  const { data: criteria, isLoading: isCriteriaLoading } = useRoundCriteria(tournamentId, roundId);

  const chartData = useMemo(() => {
    if (!criteria || !leaderboardDetails || !round || round.status !== 'EV') return [];

    const roundScores = leaderboardDetails.find((d) => d.roundId === roundId);
    if (!roundScores) return [];

    return criteria.map((c) => {
      const teamCriterion = roundScores.criterions.find((tc) => tc.criterion === c.id);
      return {
        id: c.id,
        label: c.title,
        value: teamCriterion?.score ?? 0,
        max: c.maxScore,
      };
    });
  }, [criteria, leaderboardDetails, round, roundId]);

  const isLoading = isLeadLoading || isCriteriaLoading;

  if (!isLoading && chartData.length === 0) return null;

  return <ChartBase title='Результати за категоріями' data={chartData} isLoading={isLoading} />;
};
