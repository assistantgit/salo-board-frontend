import React from 'react';
import styles from './LeaderboardPodium.module.css';
import { TeamAvatar } from '@entities/team';
import type { LeaderboardItemDto } from '@entities/tournament';

interface LeaderboardPodiumProps {
  topTeams: LeaderboardItemDto[];
}

export const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({ topTeams }) => {
  // If we don't have enough teams, we don't render the podium
  // Requirement says "hide on small screens", but we also shouldn't show 
  // an empty/incomplete podium if data is missing.
  if (topTeams.length < 3) return null;

  const [first, second, third] = topTeams;

  return (
    <section className={styles.container} aria-label="Leaderboard Podium">
      {/* 2nd Place */}
      <div className={`${styles.placeColumn} ${styles.secondPlace}`} id="podium-rank-2">
        <div className={styles.teamInfo}>
          <div className={styles.avatarWrap}>
            <TeamAvatar
              teamName={second.teamName}
              size="clamp(80px, 8vw, 120px)"
              fontSize="clamp(1.5rem, 2vw, 2.5rem)"
              className={styles.avatar}
            />
          </div>
          <h3 className={styles.teamName}>{second.teamName}</h3>
          <p className={styles.score}>{second.totalScore} балів</p>
        </div>
        <div className={`${styles.pedestal} ${styles.secondPedestal}`}>
          <span className={styles.rankNumber}>II</span>
        </div>
      </div>

      {/* 1st Place */}
      <div className={`${styles.placeColumn} ${styles.firstPlace}`} id="podium-rank-1">
        <div className={styles.teamInfo}>
          <div className={styles.avatarWrap}>
            <TeamAvatar
              teamName={first.teamName}
              size="clamp(100px, 10vw, 150px)"
              fontSize="clamp(2rem, 3vw, 4rem)"
              className={styles.avatar}
            />
          </div>
          <h3 className={styles.teamName}>{first.teamName}</h3>
          <p className={styles.score}>{first.totalScore} балів</p>
        </div>
        <div className={`${styles.pedestal} ${styles.firstPedestal}`}>
          <span className={styles.rankNumber}>I</span>
        </div>
      </div>

      {/* 3rd Place */}
      <div className={`${styles.placeColumn} ${styles.thirdPlace}`} id="podium-rank-3">
        <div className={styles.teamInfo}>
          <div className={styles.avatarWrap}>
            <TeamAvatar
              teamName={third.teamName}
              size="clamp(70px, 7vw, 100px)"
              fontSize="clamp(1.25rem, 1.5vw, 2rem)"
              className={styles.avatar}
            />
          </div>
          <h3 className={styles.teamName}>{third.teamName}</h3>
          <p className={styles.score}>{third.totalScore} балів</p>
        </div>
        <div className={`${styles.pedestal} ${styles.thirdPedestal}`}>
          <span className={styles.rankNumber}>III</span>
        </div>
      </div>
    </section>
  );
};
