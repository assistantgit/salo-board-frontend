import { TournamentCount } from '@entities/tournament';
import { TeamStatusTabs, useTeamFilterStore } from '@features/team-filter';
import { FilterLayout, GridIcon } from '@shared/ui';
import { DropdownSelect } from '@shared/ui/dropdown-select';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './AdminTeamFilters.module.css';

const DEBOUNCE_MS = 300;

interface AdminTeamFiltersProps {
  tournaments: { id: string; title: string }[];
}

export const AdminTeamFilters: React.FC<AdminTeamFiltersProps> = ({ tournaments }) => {
  const search = useTeamFilterStore((s) => s.search);
  const setSearch = useTeamFilterStore((s) => s.setSearch);
  const status = useTeamFilterStore((s) => s.status);
  const tournamentId = useTeamFilterStore((s) => s.tournamentId);
  const setTournamentId = useTeamFilterStore((s) => s.setTournamentId);
  const count = useTeamFilterStore((s) => s.count);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tParam = searchParams.get('tournamentId');
    if (tParam && tParam !== tournamentId) {
      setTournamentId(tParam);
    }
  }, [searchParams, setTournamentId, tournamentId]);

  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(localSearch), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  const activeFiltersCount = useMemo(() => {
    let activeCount = 0;
    if (status !== 'ALL') activeCount++;
    if (tournamentId !== 'ALL') activeCount++;
    return activeCount;
  }, [status, tournamentId]);

  const tournamentOptions = useMemo(() => {
    const options = tournaments.map((t) => ({
      value: t.id,
      label: t.title,
      icon: <GridIcon size='sm' />,
    }));
    return [{ value: 'ALL', label: 'Всі турніри', icon: <GridIcon size='sm' /> }, ...options];
  }, [tournaments]);

  const dropdowns = (
    <div className={styles.filters}>
      <div className={styles.filterItem}>
        <span className={styles.mobileLabel}>Оберіть турнір</span>
        <DropdownSelect
          options={tournamentOptions}
          value={tournamentId}
          onChange={setTournamentId}
          placeholder='Всі турніри'
          className={styles.dropdown}
        />
      </div>
    </div>
  );

  return (
    <FilterLayout
      search={localSearch}
      onSearchChange={setLocalSearch}
      searchPlaceholder='Пошук команд'
      searchId='team-search'
      activeFiltersCount={activeFiltersCount}
      extraContent={dropdowns}
      statusTabs={<TeamStatusTabs />}
      countBadge={<TournamentCount count={count} label='Команди' />}
    >
      {dropdowns}
    </FilterLayout>
  );
};
