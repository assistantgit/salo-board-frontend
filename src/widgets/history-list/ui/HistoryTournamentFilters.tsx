import { TournamentCount } from '@entities/tournament';
import { HistoryStatusTabs, useHistoryFilterStore } from '@features/history-filter';
import { RoleSwitcher } from '@features/role-switcher';
import { FilterLayout } from '@shared/ui';
import type React from 'react';
import { useEffect, useState } from 'react';
import styles from './HistoryFilters.module.css';

const DEBOUNCE_MS = 300;

export const HistoryTournamentFilters: React.FC = () => {
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

  const actions = <RoleSwitcher className={styles.roleSwitcher} />;

  return (
    <FilterLayout
      search={localSearch}
      onSearchChange={setLocalSearch}
      searchPlaceholder='Пошук турнірів...'
      searchId='history-tournament-search'
      activeFiltersCount={activeFiltersCount}
      statusTabs={<HistoryStatusTabs />}
      actions={actions}
      countBadge={<TournamentCount count={count} label='Турніри' />}
    >
      <div className={styles.drawerSection}>
        <span className={styles.sectionLabel}>Роль</span>
        {actions}
      </div>
    </FilterLayout>
  );
};
