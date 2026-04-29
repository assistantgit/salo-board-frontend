import type { RoundDto } from '@entities/tournament';
import type React from 'react';
import { Link } from 'react-router-dom';
import styles from './RoundSidebarCard.module.css';

interface RoundSidebarCardProps {
  round: RoundDto;
  tournamentId: string;
  score?: {
    teamRoundScore: number;
    roundMaxScore: number;
  };
  active: boolean;
  index: number;
}

export const RoundSidebarCard: React.FC<RoundSidebarCardProps> = ({
  round,
  tournamentId,
  score,
  active,
  index,
}) => {
  const isDraft = round.status === 'DR';
  const isEvaluated = round.status === 'EV';

  // Only show stats for evaluated rounds
  const showStats = isEvaluated;

  const current = score?.teamRoundScore ?? 0;
  const max = score?.roundMaxScore ?? 0;
  const pct = max > 0 ? (current / max) * 100 : 0;
  const scoreLabel = max > 0 ? `${current}/${max}` : null;

  const content = (
    <>
      <div className={styles.roundTop}>
        <div className={styles.roundTitleInfo}>
          <span className={styles.roundNumber}>РАУНД {round.orderIndex}</span>
        </div>
        {showStats && <span className={styles.roundPercentage}>{Math.round(pct)}%</span>}
      </div>

      {showStats ? (
        <div className={styles.roundBottom}>
          <div
            className={styles.progressTrack}
            role='progressbar'
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          {scoreLabel && <span className={styles.roundScore}>{scoreLabel}</span>}
        </div>
      ) : (
        <div className={styles.roundTitle}>{round.title}</div>
      )}
    </>
  );

  if (isDraft) {
    return (
      <div
        className={`${styles.roundLink} ${styles.roundLinkDisabled}`}
        style={{ '--index': index } as React.CSSProperties}
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      to={`/tournaments/${tournamentId}/tournamentDetails/${round.id}`}
      className={`${styles.roundLink} ${active ? styles.roundLinkActive : ''}`}
      aria-current={active ? 'page' : undefined}
      style={{ '--index': index } as React.CSSProperties}
    >
      {content}
    </Link>
  );
};
