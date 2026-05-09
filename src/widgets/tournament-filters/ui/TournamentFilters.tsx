import { TournamentCount, type TournamentVariant } from '@entities/tournament';
import { TournamentArchiveButton, TournamentDashboardButton } from '@features/navigate';
import { RoleSwitcher } from '@features/role-switcher';
import { TournamentStatusTabs, useTournamentFilterStore } from '@features/tournament-filter';
import { FilterLayout } from '@shared/ui/filter-layout/FilterLayout';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import styles from './TournamentFilters.module.css';

const DEBOUNCE_MS = 300;

interface TournamentFiltersProps {
  variant?: TournamentVariant;
  children?: React.ReactNode;
}

/**
 * Standardized Tournament Filters.
 * Cleaned up to use the generic FilterLayout slots.
 */
export const TournamentFilters: React.FC<TournamentFiltersProps> = ({
  variant = 'default',
  children,
}) => {
  const search = useTournamentFilterStore((s) => s.search);
  const setSearch = useTournamentFilterStore((s) => s.setSearch);
  const status = useTournamentFilterStore((s) => s.status);
  const count = useTournamentFilterStore((s) => s.count);

  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(localSearch), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (status !== 'ALL') count++;
    return count;
  }, [status]);

  const actions = (
    <>
      {variant === 'default' && <RoleSwitcher className={styles.roleSwitcher} />}
      {variant === 'default' && <TournamentArchiveButton className={styles.archiveButton} />}
      {variant === 'archive' && <TournamentDashboardButton className={styles.backButton} />}
    </>
  );

  return (
    <FilterLayout
      search={localSearch}
      onSearchChange={setLocalSearch}
      searchPlaceholder={variant === 'archive' ? 'Пошук в архіві...' : 'Пошук турнірів'}
      searchId='tournament-search'
      activeFiltersCount={activeFiltersCount}
      extraContent={children}
      actions={actions}
      statusTabs={variant !== 'archive' && <TournamentStatusTabs variant={variant} />}
      countBadge={<TournamentCount count={count} />}
    >
      <div className={styles.drawerContent}>
        <div className={styles.drawerSection}>
          <span className={styles.sectionLabel}>Навігація</span>
          <div className={styles.actionsList}>{actions}</div>
        </div>
        {children}
      </div>
    </FilterLayout>
  );
};
