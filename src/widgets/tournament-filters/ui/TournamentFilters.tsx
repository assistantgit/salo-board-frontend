import { TournamentCount, type TournamentVariant } from '@entities/tournament';
import { TournamentArchiveButton, TournamentDashboardButton } from '@features/navigate';
import { RoleSwitcher } from '@features/role-switcher';
import { TournamentStatusTabs, useTournamentFilterStore } from '@features/tournament-filter';
import { FilterLayout } from '@shared/ui';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';

const DEBOUNCE_MS = 300;

interface TournamentFiltersProps {
  variant?: TournamentVariant;
  children?: React.ReactNode;
}

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
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const activeFiltersCount = useMemo(() => {
    let activeCount = 0;
    if (status !== 'ALL') activeCount++;
    return activeCount;
  }, [status]);

  const showStatusTabs = variant !== 'archive';
  const showArchiveButton = variant === 'default';
  const showDashboardButton = variant === 'archive';
  const showRoleSwitcher = variant === 'default';

  return (
    <FilterLayout
      search={localSearch}
      onSearchChange={setLocalSearch}
      searchPlaceholder={variant === 'archive' ? 'Пошук в архіві...' : 'Пошук турнірів'}
      searchId='tournament-search'
      activeFiltersCount={activeFiltersCount}
      roleSwitcher={showRoleSwitcher ? <RoleSwitcher /> : undefined}
      extraContent={children}
      backButton={showDashboardButton ? <TournamentDashboardButton /> : undefined}
      statusTabs={showStatusTabs ? <TournamentStatusTabs variant={variant} /> : undefined}
      archiveButton={showArchiveButton ? <TournamentArchiveButton /> : undefined}
      countBadge={<TournamentCount count={count} />}
    >
      {children}
    </FilterLayout>
  );
};
