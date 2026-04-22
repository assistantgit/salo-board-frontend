import React from 'react';
import styles from './TournamentLeaderboard.module.css';
import { useLeaderboard, useTournament } from '@entities/tournament';
import { LeaderboardRow, LeaderboardRowDetails } from '@entities/tournament';
import { useMyTeamInTournament } from '@entities/team';
import { Divider } from '@shared/ui';
import { Link } from 'react-router-dom';

interface TournamentLeaderboardProps {
  tournamentId: number;
}

export const TournamentLeaderboard: React.FC<TournamentLeaderboardProps> = ({
  tournamentId,
}) => {
  const { leaderboard, isLoading, error } = useLeaderboard(tournamentId);
  const { tournament } = useTournament(tournamentId);
  const { data: myTeam } = useMyTeamInTournament(tournamentId);
  const currentTeamId = myTeam?.id;

  const [expandedTeamId, setExpandedTeamId] = React.useState<number | null>(null);

  const handleToggleExpand = (teamId: number) => {
    const isExpanding = expandedTeamId !== teamId;
    setExpandedTeamId(isExpanding ? teamId : null);
  };

  if (isLoading) {
    return (
      <div>
        <LeaderboardTitle title={tournament?.title} />
        <div className={styles.container}>
          <LeaderboardHeader />
          <div className={styles.skeletonWrap}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeletonRow} />
            ))}
          </div>
        </div>
      </div>

    );
  }

  if (error || leaderboard.length === 0) {
    return (
      <div>
        <LeaderboardTitle title={tournament?.title} />
        <div className={styles.container}>

          <LeaderboardHeader />
          <p className={styles.empty}>
            {error ?? 'Турнір ще не має результатів. Очікуйте завершення раундів.'}
          </p>
        </div>
      </div>

    );
  }

  return (
    <div>
      <LeaderboardTitle title={tournament?.title} />
      <div className={styles.container}>
        <LeaderboardHeader />
        <div className={styles.list} role="grid">
          {leaderboard.map((item, idx) => {
            const lastRound = item.rounds[item.rounds.length - 1];
            const lastRoundScore = lastRound?.teamRoundScore ?? 0;

            return (
              <React.Fragment key={item.teamId}>
                <LeaderboardRow
                  rank={idx + 1}
                  teamName={item.teamName}
                  lastRoundScore={lastRoundScore}
                  totalScore={item.totalScore}
                  isCurrentUserTeam={item.teamId === currentTeamId}
                  isExpanded={expandedTeamId === item.teamId}
                  onToggle={() => handleToggleExpand(item.teamId)}
                >
                  <LeaderboardRowDetails
                    teamId={item.teamId}
                    teamName={item.teamName}
                    basicRounds={item.rounds}
                    isCurrentUserTeam={item.teamId === currentTeamId}
                    renderOverviewButton={(cls) => (
                      <Link
                        to={`/tournaments/${tournamentId}/tournamentDetails/overview`}
                        className={cls}
                      >
                        Деталі
                      </Link>
                    )}
                    renderRoundCardWrapper={(roundId, content, cls) => (
                      <Link
                        key={roundId}
                        className={cls}
                        to={`/tournaments/${tournamentId}/tournamentDetails/${roundId}`}
                      >
                        {content}
                      </Link>
                    )}
                  />
                </LeaderboardRow>
                {idx < leaderboard.length - 1 && <Divider margin="0" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface LeaderboardTitleProps {
  title?: string;
}

const LeaderboardTitle: React.FC<LeaderboardTitleProps> = ({ title }) => (
  <div className={styles.titleBlock}>
    <h1 className={styles.title}>Таблиця лідерів</h1>
    {title && (
      <p className={styles.subtitle}>{title}&nbsp;— Підсумки</p>
    )}
  </div>
);

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