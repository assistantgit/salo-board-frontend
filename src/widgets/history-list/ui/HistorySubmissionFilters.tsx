import { TournamentCount } from '@entities/tournament';
import { HistoryStatusTabs, useHistoryFilterStore } from '@features/history-filter';
import { FilterLayout } from '@shared/ui';
import type React from 'react';
import { useEffect, useState } from 'react';

const DEBOUNCE_MS = 300;

export const HistorySubmissionFilters: React.FC = () => {
  const search = useHistoryFilterStore((s) => s.search);
  const setSearch = useHistoryFilterStore((s) => s.setSearch);
  const status = useHistoryFilterStore((s) => s.status);
  const count = useHistoryFilterStore((s) => s.count);

  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(localSearch), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  const activeFiltersCount = status !== 'ALL' ? 1 : 0;

  return (
    <FilterLayout
      search={localSearch}
      onSearchChange={setLocalSearch}
      searchPlaceholder='Пошук робіт...'
      searchId='history-submission-search'
      activeFiltersCount={activeFiltersCount}
      statusTabs={<HistoryStatusTabs />}
      countBadge={<TournamentCount count={count} label='Здані роботи' />}
    />
  );
};
