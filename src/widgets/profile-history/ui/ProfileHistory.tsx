import { HistoryTeamCard, useUserTeamsArchive } from '@entities/team';
import { HistoryTournamentCard, useUserTournaments } from '@entities/user';
import { ChevronRightIcon, NavButton, Skeleton } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileHistory.module.css';

/**
 * ProfileHistory Widget.
 * Displays the last 3 tournaments and last 3 archived teams.
 */
export const ProfileHistory = () => {
  const { tournaments, isLoading: isTournamentsLoading } = useUserTournaments();
  const { data: teams, isLoading: isTeamsLoading } = useUserTeamsArchive();
  const navigate = useNavigate();

  const isLoading = isTournamentsLoading || isTeamsLoading;

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <section className={styles.container}>
          <div className={styles.header}>
            <div className={styles.titleSkeleton} />
          </div>
          <div className={styles.grid}>
            {['p1', 'p2', 'p3'].map((key) => (
              <Skeleton key={key} height={280} borderRadius={24} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  const hasTournaments = tournaments.length > 0;
  const hasTeams = teams && teams.length > 0;

  if (!hasTournaments && !hasTeams) return null;

  const lastThreeTournaments = tournaments.slice(0, 3);
  const lastThreeTeams = teams?.slice(0, 3) || [];

  return (
    <div className={styles.wrapper}>
      {hasTournaments && (
        <section className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Історія участі</h2>
            <NavButton
              onClick={() => navigate('/profile/history?tab=tournaments')}
              className={styles.viewAllButton}
              icon={<ChevronRightIcon />}
              iconPosition='right'
            >
              Всі
            </NavButton>
          </div>

          <div className={styles.grid}>
            {lastThreeTournaments.map((tournament) => (
              <HistoryTournamentCard
                key={tournament.id}
                tournament={tournament}
                onView={(id) => navigate(`/tournaments/${id}`)}
              />
            ))}
          </div>
        </section>
      )}

      {hasTeams && (
        <section className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Архів команд</h2>
            <NavButton
              onClick={() => navigate('/teams/archive')}
              className={styles.viewAllButton}
              icon={<ChevronRightIcon />}
              iconPosition='right'
            >
              Всі
            </NavButton>
          </div>

          <div className={styles.grid}>
            {lastThreeTeams.map((team) => (
              <HistoryTeamCard
                key={team.id}
                team={team}
                onView={() => navigate(`/tournaments/${team.tournamentId}`)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
