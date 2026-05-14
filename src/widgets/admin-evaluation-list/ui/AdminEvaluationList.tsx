import { EvaluationCard } from '@entities/evaluation';
import { EmptyState, ListView, Pagination, SearchIcon, Skeleton } from '@shared/ui';
import type React from 'react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminEvaluations } from '../lib/useAdminEvaluations';
import styles from './AdminEvaluationList.module.css';
import { EvaluationFilters } from './EvaluationFilters';

export const AdminEvaluationList: React.FC = () => {
  const navigate = useNavigate();
  const { evaluations, isLoading, tournaments, rounds, tournamentId, roundId } =
    useAdminEvaluations();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(evaluations.length / itemsPerPage);

  const paginatedEvaluations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return evaluations.slice(start, start + itemsPerPage);
  }, [evaluations, currentPage]);

  const handleAction = (evaluationId: number) => {
    navigate(`/admin/evaluation/${tournamentId}/${roundId}/${evaluationId}`);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <EvaluationFilters tournaments={tournaments} rounds={rounds} />
        <div className={styles.grid}>
          <Skeleton.Provider>
            {[1, 2, 3, 4].map((id) => (
              <Skeleton.Rect key={`skeleton-${id}`} height={200} />
            ))}
          </Skeleton.Provider>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <EvaluationFilters tournaments={tournaments} rounds={rounds} />

      {tournamentId === 'ALL' || roundId === 'ALL' ? (
        <EmptyState
          icon={<SearchIcon size='xl' style={{ opacity: 0.2 }} />}
          title='Оберіть турнір та раунд'
          subtitle='Будь ласка, оберіть турнір та конкретний раунд для перегляду оцінок'
        />
      ) : (
        <>
          <ListView
            data={paginatedEvaluations}
            isLoading={isLoading}
            className={styles.grid}
            renderItem={(evaluation) => (
              <EvaluationCard
                key={evaluation.id}
                evaluation={evaluation}
                onAction={handleAction}
                tournamentTitle={tournaments.find((t) => t.id === tournamentId)?.title}
                roundTitle={rounds.find((r) => r.id === roundId)?.title}
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

          {evaluations.length > itemsPerPage && (
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
