import { TeamAvatar } from '@entities/team';
import { Divider } from '@shared/ui';
import type React from 'react';
import styles from './LeaderboardRow.module.css';

interface LeaderboardRowProps {
  rank: number;
  teamName: string;
  lastRoundScore: number;
  totalScore: number;
  isCurrentUserTeam?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  rank,
  teamName,
  lastRoundScore,
  totalScore,
  isCurrentUserTeam = false,
  isExpanded = false,
  onToggle,
  children,
}) => {
  const rankClass =
    rank === 1 ? styles.rank1 : rank === 2 ? styles.rank2 : rank === 3 ? styles.rank3 : '';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onToggle && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        type='button'
        className={`${styles.row} ${isCurrentUserTeam && isExpanded ? styles.rowHighlight : ''} ${isExpanded ? styles.rowExpanded : ''}`}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
      >
        <div className={styles.rankCell}>
          <span className={`${styles.rankBadge} ${rankClass}`}>{rank}</span>
        </div>
        <div className={styles.teamCell}>
          <TeamAvatar teamName={teamName} />
          <span className={styles.teamName}>{teamName}</span>
          {isCurrentUserTeam && <span className={styles.youBadge}>Ви</span>}
        </div>
        <div className={styles.scoreCell}>
          <span className={styles.scoreLabel}>Останній:</span>
          <span className={styles.scoreValue}>{lastRoundScore} балів</span>
        </div>
        <div className={styles.scoreCell}>
          <span className={styles.scoreLabel}>Усього:</span>
          <span className={styles.scoreValue}>{totalScore} балів</span>
        </div>
      </button>
      <div
        className={`${styles.detailsWrapper} ${isExpanded ? styles.detailsWrapperExpanded : ''}`}
      >
        <div className={styles.detailsInner}>
          <Divider margin={0} />
          <div className={styles.expandedContent}>{children}</div>
        </div>
      </div>
    </div>
  );
};
