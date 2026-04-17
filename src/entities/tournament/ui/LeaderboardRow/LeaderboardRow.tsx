import React from 'react';
import { TeamAvatar } from '@entities/team';
import styles from './LeaderboardRow.module.css';

interface LeaderboardRowProps {
  rank: number;
  teamName: string;
  lastRoundScore: number;
  totalScore: number;
  isCurrentUserTeam?: boolean;
}


export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  rank,
  teamName,
  lastRoundScore,
  totalScore,
  isCurrentUserTeam = false,
}) => {
  const rankClass =
    rank === 1 ? styles.rank1 :
      rank === 2 ? styles.rank2 :
        rank === 3 ? styles.rank3 : '';

  return (
    <div
      className={`${styles.row} ${isCurrentUserTeam ? styles.rowHighlight : ''}`}
      role="row"
    >
      <div className={styles.rankCell} role="gridcell">
        <span className={`${styles.rankBadge} ${rankClass}`}>
          {rank}
        </span>
      </div>
      <div className={styles.teamCell} role="gridcell">
        <TeamAvatar teamName={teamName} />
        <span className={styles.teamName}>{teamName}</span>
        {isCurrentUserTeam && (
          <span className={styles.youBadge}>Ви</span>
        )}
      </div>
      <div className={styles.scoreCell} role="gridcell">
        <span className={styles.scoreLabel}>Останній:</span>
        <span className={styles.scoreValue}>{lastRoundScore} балів</span>
      </div>
      <div className={styles.scoreCell} role="gridcell">
        <span className={styles.scoreLabel}>Усього:</span>
        <span className={styles.scoreValue}>{totalScore} балів</span>
      </div>
    </div>
  );
};

