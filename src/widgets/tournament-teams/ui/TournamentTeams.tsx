import { TeamRow, useTeamsByTournament } from '@entities/team';
import { TournamentProgressBar, useCurrentTournament } from '@entities/tournament';
import { Pagination } from '@shared/ui';
import { Divider } from '@shared/ui/divider/Divider';
import React, { useState } from 'react';
import styles from './TournamentTeams.module.css';
import { TournamentTeamsSkeleton } from './TournamentTeamsSkeleton';

const AVATAR_COLORS = ['#6d82eb', '#ff6c6c', '#95ea9a', '#facc15', '#a855f7'];
const ITEMS_PER_PAGE = 5;

export const TournamentTeams: React.FC = () => {
  const { tournament, isLoading: isTournamentLoading } = useCurrentTournament();
  const [currentPage, setCurrentPage] = useState(1);

  // Хук бере на себе управління життєвим циклом отримання даних
  const { teams, isLoading: isTeamsLoading } = useTeamsByTournament(
    tournament?.isTeamVisible ? tournament.id : null,
  );

  const isLoading = isTournamentLoading || isTeamsLoading;

  if (isLoading) return <TournamentTeamsSkeleton />;
  if (!tournament) return null;

  const maxTeams = tournament.maxTeam || tournament.maxTeamSize || 16;
  const currentCount = teams.length || tournament.teamsCount || 0;
  const progress = Math.min((currentCount / maxTeams) * 100, 100);

  const totalPages = Math.ceil(teams.length / ITEMS_PER_PAGE);
  const currentTeams = teams.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Команди</h2>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className={styles.paginationOverride}
        />
      </div>

      <Divider />

      <div className={styles.statsRow}>
        <span className={styles.stats}>
          {currentCount}/{maxTeams} команд
        </span>
      </div>

      <TournamentProgressBar
        progress={progress}
        status={tournament.status}
        showLabel={false}
        className={styles.progressBarOverride}
      />

      <div
        className={`${styles.teamList} ${!isLoading ? styles.teamListAnimate : ''}`}
        key={currentPage}
      >
        {isLoading ? (
          <div className={styles.empty}>Завантаження...</div>
        ) : currentTeams.length > 0 ? (
          currentTeams.map((team, index) => (
            <React.Fragment key={team.id}>
              <TeamRow
                team={team}
                color={
                  AVATAR_COLORS[((currentPage - 1) * ITEMS_PER_PAGE + index) % AVATAR_COLORS.length]
                }
              />
              {index < currentTeams.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <div className={styles.empty}>
            {tournament.isTeamVisible
              ? 'Команди ще не зареєстровані'
              : 'Список команд приховано організатором'}
          </div>
        )}
      </div>
    </div>
  );
};
