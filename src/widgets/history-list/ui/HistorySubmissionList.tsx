import { HistorySubmissionCard, useUserSubmissions } from '@entities/user';
import { useHistoryFilterStore } from '@features/history-filter';
import { EmptyState, SearchIcon } from '@shared/ui';
import { useEffect, useMemo } from 'react';
import styles from './HistoryList.module.css';

export const HistorySubmissionList = () => {
  const { submissions, isLoading, error } = useUserSubmissions();

  const search = useHistoryFilterStore((s) => s.search);
  const status = useHistoryFilterStore((s) => s.status);
  const setCount = useHistoryFilterStore((s) => s.setCount);

  const filtered = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesSearch =
        sub.tournamentTitle?.toLowerCase().includes(search.toLowerCase()) ||
        sub.teamName?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === 'ALL' || sub.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [submissions, search, status]);

  useEffect(() => {
    if (!isLoading) {
      setCount(filtered.length);
    } else {
      setCount(-1);
    }
  }, [isLoading, filtered.length, setCount]);

  if (error) return <div className={styles.error}>{error}</div>;

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader} />
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={<SearchIcon size='xl' style={{ opacity: 0.2 }} />}
        title='Сабмітів не знайдено'
        subtitle='Спробуйте змінити фільтри або пошуковий запит'
        className={styles.empty}
      />
    );
  }

  return (
    <div className={styles.grid}>
      {filtered.map((sub) => (
        <HistorySubmissionCard
          key={sub.id}
          submission={sub}
          onView={(id) => console.log('View submission', id)}
        />
      ))}
    </div>
  );
};
