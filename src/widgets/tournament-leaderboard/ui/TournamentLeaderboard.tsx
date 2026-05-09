import { useMyTeamInTournament } from '@entities/team';
import {
  LeaderboardPodium,
  LeaderboardRow,
  LeaderboardRowDetails,
  useLeaderboard,
  useTournament,
} from '@entities/tournament';
import { NavigateBackButton } from '@features/navigate';
import { Divider } from '@shared/ui';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './TournamentLeaderboard.module.css';

interface TournamentLeaderboardProps {
  tournamentId: number;
}

export const TournamentLeaderboard: React.FC<TournamentLeaderboardProps> = ({ tournamentId }) => {
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
      <div className={styles.rootContainer}>
        <LeaderboardTitle tournamentId={tournamentId} title={tournament?.title} />
        <div className={styles.tableContainer}>
          <LeaderboardHeader />
          <div className={styles.skeletonWrap}>
            {[0, 1, 2, 3, 4, 5].map((id) => (
              <div key={id} className={styles.skeletonRow} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || leaderboard.length === 0) {
    return (
      <div className={styles.rootContainer}>
        <LeaderboardTitle tournamentId={tournamentId} title={tournament?.title} />
        <div className={styles.tableContainer}>
          <LeaderboardHeader />
          <p className={styles.empty}>
            {error ?? 'Турнір ще не має результатів. Очікуйте завершення раундів.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.rootContainer}>
      <LeaderboardTitle tournamentId={tournamentId} title={tournament?.title} />
      <LeaderboardPodium topTeams={leaderboard.slice(0, 3)} />
      <div className={styles.tableContainer}>
        <LeaderboardHeader />
        <div className={styles.list}>
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
                {idx < leaderboard.length - 1 && <Divider margin='0' />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface LeaderboardTitleProps {
  tournamentId: number;
  title?: string;
}

const LeaderboardTitle: React.FC<LeaderboardTitleProps> = ({ tournamentId, title }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.headerSection}>
      <div className={styles.backButton}>
        <NavigateBackButton
          label='Назад до турніру'
          className={styles.backButtonBtn}
          onBack={() => navigate(`/tournaments/${tournamentId}`)}
        />
      </div>
      <div className={styles.titleGroup}>
        <h1 className={styles.title}>Таблиця лідерів</h1>
        {title && <p className={styles.subtitle}>{title}&nbsp;— Підсумки</p>}
      </div>
    </div>
  );
};

const LeaderboardHeader: React.FC = () => (
  <header className={styles.header}>
    <span className={styles.headerCell}>Місце</span>
    <span className={styles.headerCell}>Команди</span>
    <span className={`${styles.headerCell} ${styles.headerCenter}`}>Останній раунд</span>
    <span className={`${styles.headerCell} ${styles.headerCenter}`}>Усього балів</span>
  </header>
);
