import { SubmissionCard } from '@entities/submission';
import { EmptyState, ListView, SearchIcon, Skeleton } from '@shared/ui';
import type React from 'react';

import { useJurySubmissions } from '../lib/useJurySubmissions';
import { SubmissionFilters } from './SubmissionFilters';
import styles from './SubmissionList.module.css';

/**
 * Cleanly managed Submission List.
 * REDO from 0: focuses on data flow and using the new filter system.
 */
export const SubmissionList: React.FC = () => {
  const { submissions, isLoading, tournaments, rounds, tournamentId } = useJurySubmissions();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <SubmissionFilters tournaments={tournaments} rounds={rounds} />
        <div className={styles.grid}>
          <Skeleton.Provider>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  height: '180px',
                  backgroundColor: 'var(--surface)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-light)',
                  padding: '24px',
                }}
              />
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
          subtitle='Будь ласка, оберіть турнір для перегляду робіт на оцінювання'
        />
      ) : (
        <ListView
          data={submissions}
          isLoading={isLoading}
          className={styles.grid}
          renderItem={(submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          )}
          emptyState={
            <EmptyState
              icon={<SearchIcon size='xl' style={{ opacity: 0.2 }} />}
              title='Нічого не знайдено'
              subtitle='Спробуйте змінити параметри пошуку або фільтрації'
            />
          }
        />
      )}
    </div>
  );
};
