import { useMyTeamInTournament } from '@entities/team';
import { useRoundCriteria, useRoundDetails, useTeamLeaderboard } from '@entities/tournament';
import { CriteriaCard, Skeleton } from '@shared/ui';
import type React from 'react';
import styles from './RoundCriteriaResults.module.css';

interface RoundCriteriaResultsProps {
  tournamentId: number;
  roundId: number;
}

export const RoundCriteriaResults: React.FC<RoundCriteriaResultsProps> = ({
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

  if (isCriteriaLoading || isLeadLoading) return <Skeleton className={styles.skeleton} />;
  if (!criteria || criteria.length === 0) return null;

  const roundScores = leaderboardDetails.find((d) => d.roundId === roundId);

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Критерії оцінювання</h3>
      <div className={styles.grid}>
        {criteria.map((c) => {
          const teamScore = roundScores?.criterions.find((tc) => tc.criterion === c.id)?.score;

          return (
            <CriteriaCard
              key={c.id}
              category={c.category}
              title={c.title}
              weight={c.weight}
              maxPoints={c.maxScore}
              score={teamScore}
              isEvaluated={round?.status === 'EV' || teamScore !== undefined}
              orderIndex={c.orderIndex}
              className={styles.card}
            />
          );
        })}
      </div>
    </section>
  );
};
