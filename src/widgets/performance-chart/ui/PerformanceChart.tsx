import { useRounds } from '@entities/tournament';
import { CHART_COLORS } from '@shared/config';
import { ChartBase } from '@shared/ui';
import type React from 'react';
import { useMemo } from 'react';
import { useMyTournamentScores } from '../../tournament-sidebar/lib/useMyTournamentScores';

interface PerformanceChartProps {
  tournamentId: number | string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ tournamentId }) => {
  const { rounds, isLoading: isRoundsLoading } = useRounds(tournamentId);
  const { roundScoresMap, isLoading: isScoresLoading } = useMyTournamentScores(tournamentId);

  const isLoading = isRoundsLoading || isScoresLoading;

  const chartData = useMemo(() => {
    if (!rounds.length) return [];
    // Only show evaluated rounds
    const evaluatedRounds = rounds.filter((r) => r.status === 'EV');
    const sortedRounds = [...evaluatedRounds].sort((a, b) => a.orderIndex - b.orderIndex);

    return sortedRounds.map((round, index) => {
      const scoreData = roundScoresMap[round.id];
      return {
        id: round.id,
        label: round.title,
        shortLabel: `P${round.orderIndex}`,
        value: scoreData?.teamRoundScore ?? 0,
        max: scoreData?.roundMaxScore ?? 0,
        color: CHART_COLORS[index % CHART_COLORS.length],
      };
    });
  }, [rounds, roundScoresMap]);

  return (
    <ChartBase title='Ваші бали (Порівняння з топом)' data={chartData} isLoading={isLoading} />
  );
};
