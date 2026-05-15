import { EmptyState, ListView, Pagination, SearchIcon, Skeleton } from '@shared/ui';
import { AdminTeamWidget } from '@widgets/admin-team-widget';
import type React from 'react';
import { useMemo, useState } from 'react';
import { useAdminTeams } from '../lib/useAdminTeams';
import { AdminTeamFilters } from './AdminTeamFilters';
import styles from './AdminTeamList.module.css';

export const AdminTeamList: React.FC = () => {
  const { teams, isLoading, tournaments, tournamentId, disqualifyTeam, isDisqualifying } =
    useAdminTeams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(teams.length / itemsPerPage);

  const paginatedTeams = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return teams.slice(start, start + itemsPerPage);
  }, [teams, currentPage]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <AdminTeamFilters tournaments={tournaments} />
        <div className={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <Skeleton.Rect key={`skeleton-${id}`} height={300} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <AdminTeamFilters tournaments={tournaments} />

      {tournamentId === 'ALL' ? (
        <EmptyState
          icon={<SearchIcon size='xl' style={{ opacity: 0.2 }} />}
          title='Оберіть турнір'
          subtitle='Будь ласка, оберіть турнір для перегляду команд'
        />
      ) : (
        <>
          <ListView
            data={paginatedTeams}
            isLoading={isLoading}
            className={styles.grid}
            renderItem={(team) => (
              <AdminTeamWidget
                key={team.id}
                team={team}
                onDisqualify={disqualifyTeam}
                isDisqualifying={isDisqualifying}
              />
            )}
            emptyState={
              <EmptyState
                icon={<SearchIcon size='xl' style={{ opacity: 0.2 }} />}
                title='Команд не знайдено'
                subtitle='Спробуйте змінити параметри пошуку або фільтрації'
              />
            }
          />

          {teams.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className={styles.pagination}
            />
          )}
        </>
      )}
    </div>
  );
};
