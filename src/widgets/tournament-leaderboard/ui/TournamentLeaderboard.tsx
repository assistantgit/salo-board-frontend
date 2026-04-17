import React from 'react';
import styles from './TournamentLeaderboard.module.css';
import { useLeaderboard } from '@entities/tournament/lib/useLeaderboard';
import { LeaderboardRow } from '@entities/tournament/ui/LeaderboardRow/LeaderboardRow';

interface TournamentLeaderboardProps {
  tournamentId: number;
  currentTeamId?: number;
}

export const TournamentLeaderboard: React.FC<TournamentLeaderboardProps> = ({
  tournamentId,
  currentTeamId,
}) => {
  const { leaderboard, isLoading, error } = useLeaderboard(tournamentId);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LeaderboardHeader />
        <div className={styles.skeletonWrap}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skeletonRow} />
          ))}
        </div>
      </div>
    );
  }

  if (error || leaderboard.length === 0) {
    return (
      <div className={styles.container}>
        <LeaderboardHeader />
        <p className={styles.empty}>
          {error ?? 'Турнір ще не має результатів. Очікуйте завершення раундів.'}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <LeaderboardHeader />
      <div className={styles.list} role="grid">
        {leaderboard.map((item, idx) => {
          const lastRound = item.rounds[item.rounds.length - 1];
          const lastRoundScore = lastRound?.roundScore ?? 0;

          return (
            <LeaderboardRow
              key={item.teamId}
              rank={idx + 1}
              teamName={item.teamName}
              lastRoundScore={lastRoundScore}
              totalScore={item.totalScore}
              isCurrentUserTeam={item.teamId === currentTeamId}
            />
          );
        })}
      </div>
    </div>
  );
};

const LeaderboardHeader: React.FC = () => (
  <header className={styles.header} role="row">
    <span className={styles.headerCell}>Місце</span>
    <span className={styles.headerCell}>Команди</span>
    <span className={`${styles.headerCell} ${styles.headerCenter}`}>
      Останній раунд
    </span>
    <span className={`${styles.headerCell} ${styles.headerCenter}`}>
      Усього балів
    </span>
  </header>
);

