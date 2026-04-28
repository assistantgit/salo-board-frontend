import { useRounds } from '@entities/tournament';
import type React from 'react';
import { useMemo } from 'react';
import { useMyTournamentScores } from '../../tournament-sidebar/lib/useMyTournamentScores';
import styles from './PerformanceChart.module.css';

interface PerformanceChartProps {
  tournamentId: number | string;
}

const BAR_COLORS = [
  '#5e9d6d', // Green
  '#2437b0', // Blue
  '#8b26a6', // Purple
  '#a61d1d', // Red/Brown
  '#f59e0b', // Amber
];

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ tournamentId }) => {
  const { rounds, isLoading: isRoundsLoading } = useRounds(tournamentId);
  const { roundScoresMap, isLoading: isScoresLoading } = useMyTournamentScores(tournamentId);

  const isLoading = isRoundsLoading || isScoresLoading;

  const chartData = useMemo(() => {
    if (!rounds.length) return [];
    const sortedRounds = [...rounds].sort((a, b) => a.orderIndex - b.orderIndex);

    return sortedRounds.map((round, index) => {
      const scoreData = roundScoresMap[round.id];
      return {
        id: round.id,
        title: round.title,
        shortTitle: `P${index + 1}`,
        score: scoreData?.teamRoundScore ?? 0,
        maxScore: scoreData?.roundMaxScore ?? 0,
        color: BAR_COLORS[index % BAR_COLORS.length],
      };
    });
  }, [rounds, roundScoresMap]);

  const maxVal = useMemo(() => {
    if (chartData.length === 0) return 100;
    const highest = Math.max(...chartData.map((d) => d.score), ...chartData.map((d) => d.maxScore));
    return highest > 0 ? highest : 100;
  }, [chartData]);

  if (isLoading) return <div className={styles.skeleton} />;
  if (chartData.length === 0) return null;

  const gridSteps = [1, 0.75, 0.5, 0.25, 0];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Ваші бали (Порівняння з топом)</h3>

      <div className={styles.chartWrapper}>
        <div className={styles.graphPart}>
          <div className={styles.gridLayer}>
            {gridSteps.map((step) => {
              const val = Math.round(maxVal * step);
              return (
                <div key={step} className={styles.gridRow}>
                  <span className={styles.yLabel}>{val}</span>
                  <div className={styles.gridLine} />
                </div>
              );
            })}
          </div>

          <div className={styles.barsLayer}>
            {chartData.map((data) => (
              <div key={data.id} className={styles.barGroup}>
                <div
                  className={styles.bar}
                  style={{
                    height: `${(data.score / maxVal) * 100}%`,
                    backgroundColor: data.color,
                  }}
                >
                  <span className={styles.barValue}>{data.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.labelsPart}>
          <div className={styles.yPlaceholder} /> {/* Alignment offset */}
          <div className={styles.xLabels}>
            {chartData.map((data) => (
              <div key={data.id} className={styles.combinedLabel}>
                <span className={styles.pLabel}>{data.shortTitle}:</span>
                <span className={styles.scoreLabel}>
                  {data.score}/{data.maxScore}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
