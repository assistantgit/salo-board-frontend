import { SubmissionCard } from '@entities/submission';
import { EmptyState, ListView, Pagination, SearchIcon, Skeleton } from '@shared/ui';
import type React from 'react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminSubmissions } from '../lib/useAdminSubmissions';
import styles from './AdminSubmissionList.module.css';
import { SubmissionFilters } from './SubmissionFilters';

/**
 * AdminSubmissionList — provides a similar experience to jury submissions
 * but for administrators to monitor/manage all submissions.
 */
export const AdminSubmissionList: React.FC = () => {
  const navigate = useNavigate();
  const { submissions, isLoading, tournaments, rounds, tournamentId } = useAdminSubmissions();

  const handleAction = (submissionId: number) => {
    const sub = submissions.find((s) => s.id === submissionId);
    if (sub) {
      navigate(`/admin/submissions/${sub.tournamentId}/${sub.roundId}/${sub.id}`);
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  const paginatedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return submissions.slice(start, start + itemsPerPage);
  }, [submissions, currentPage]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <SubmissionFilters tournaments={tournaments} rounds={rounds} />
        <div className={styles.grid}>
          <Skeleton.Provider>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton.Rect key={i} height={180} />
            ))}
          </Skeleton.Provider>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <SubmissionFilters tournaments={tournaments} rounds={rounds} />

      {tournamentId === 'ALL' ? (
        <EmptyState
          icon={<SearchIcon size='xl' style={{ opacity: 0.2 }} />}
          title='Оберіть турнір'
          subtitle='Будь ласка, оберіть турнір для перегляду робіт'
        />
      ) : (
        <>
          <ListView
            data={paginatedSubmissions}
            isLoading={isLoading}
            className={styles.grid}
            renderItem={(submission) => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                onAction={handleAction}
                actionLabel='Детальніше'
              />
            )}
            emptyState={
              <EmptyState
                icon={<SearchIcon size='xl' style={{ opacity: 0.2 }} />}
                title='Нічого не знайдено'
                subtitle='Спробуйте змінити параметри пошуку або фільтрації'
              />
            }
          />

          {submissions.length > itemsPerPage && (
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
