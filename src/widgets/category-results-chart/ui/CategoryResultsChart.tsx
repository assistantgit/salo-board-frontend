import { useMyTeamInTournament } from '@entities/team';
import { useRoundCriteria, useRoundDetails, useTeamLeaderboard } from '@entities/tournament';
import { Skeleton } from '@shared/ui';
import type React from 'react';
import { useMemo } from 'react';
import styles from './CategoryResultsChart.module.css';

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
    if (!criteria || !leaderboardDetails || !round || round.status !== 'EV') return null;

    const roundScores = leaderboardDetails.find((d) => d.roundId === roundId);
    if (!roundScores) return null;

    return criteria.map((c) => {
      const teamCriterion = roundScores.criterions.find((tc) => tc.criterion === c.id);
      return {
        id: c.id,
        label: c.title,
        score: teamCriterion?.score ?? 0,
        maxScore: c.maxScore,
      };
    });
  }, [criteria, leaderboardDetails, round, roundId]);

  if (isLeadLoading || isCriteriaLoading) return <Skeleton className={styles.skeleton} />;
  if (!chartData) return null;

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Результати за категоріями</h3>
      <div className={styles.chart}>
        {chartData.map((data) => {
          const pct = (data.score / data.maxScore) * 100;
          return (
            <div key={data.id} className={styles.barGroup}>
              <div className={styles.barHeader}>
                <span className={styles.label}>{data.label}</span>
                <span className={styles.value}>
                  {data.score} / {data.maxScore}
                </span>
              </div>
              <div className={styles.track}>
                <div className={styles.fill} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
