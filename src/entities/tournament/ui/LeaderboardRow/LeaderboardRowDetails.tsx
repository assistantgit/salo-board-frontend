import type { ReactNode } from 'react';
import styles from './LeaderboardRow.module.css';
import type { LeaderboardRoundDto } from '@entities/tournament';

interface LeaderboardRowDetailsProps {
  teamId: number;
  teamName?: string;
  basicRounds?: LeaderboardRoundDto[];
  isCurrentUserTeam?: boolean;
  renderOverviewButton?: (className: string) => ReactNode;
  renderRoundCardWrapper?: (roundId: number, content: ReactNode, className: string) => ReactNode;
}

export const LeaderboardRowDetails: React.FC<LeaderboardRowDetailsProps> = ({
  basicRounds = [],
  isCurrentUserTeam = false,
  renderOverviewButton,
  renderRoundCardWrapper,
}) => {
  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsHeaderRow}>
        <h3 className={styles.detailsHeader}>Оцінка раундів</h3>
        {isCurrentUserTeam && renderOverviewButton?.(styles.detailsButton)}
      </div>

      <div className={styles.tabsScrollArea}>
        <div className={styles.tabsContainer}>
          {basicRounds.map((round) => {
            const score = round.teamRoundScore || 0;
            const maxScore = round.roundMaxScore || 100;
            const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

            const cardContent = (
              <>
                <h4 className={styles.roundCardTitle}>
                  {round.roundTitle}
                </h4>

                <div className={styles.progressSection}>
                  <div className={styles.roundCardScore}>
                    {score}/{maxScore}
                  </div>

                  <div className={styles.progressWrap}>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.progressPercent}>{percentage}%</div>
              </>
            );

            if (isCurrentUserTeam && renderRoundCardWrapper) {
              return renderRoundCardWrapper(round.roundId, cardContent, styles.roundCard);
            }

            return (
              <div key={round.roundId} className={`${styles.roundCard} ${styles.roundCardStatic}`}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};