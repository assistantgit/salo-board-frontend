import { SubmissionCard } from '@entities/submission';
import { EmptyState, ListView, Pagination, SearchIcon, Skeleton } from '@shared/ui';
import type React from 'react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useJurySubmissions } from '../lib/useJurySubmissions';
import { SubmissionFilters } from './SubmissionFilters';
import styles from './SubmissionList.module.css';

/**
 * Cleanly managed Submission List.
 * REDO from 0: focuses on data flow and using the new filter system.
 */
export const SubmissionList: React.FC = () => {
  const { submissions, isLoading, tournaments, rounds, tournamentId } = useJurySubmissions();
  const navigate = useNavigate();

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
          {[1, 2, 3, 4].map((id) => (
            <Skeleton.Rect key={`skeleton-${id}`} height={180} />
          ))}
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
          subtitle='Будь ласка, оберіть турнір для перегляду робіт на оцінювання'
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
                onAction={(id) => {
                  navigate(
                    `/jury/submissions/${submission.tournamentId}/${submission.roundId}/${id}`,
                  );
                }}
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
