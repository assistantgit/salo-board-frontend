import { TournamentCount } from '@entities/tournament';
import { TournamentDashboardButton } from '@features/navigate';
import { RoleSwitcher } from '@features/role-switcher';
import { useTournamentFilterStore } from '@features/tournament-filter';
import { SearchBar } from '@shared/ui';
import type React from 'react';
import { useEffect, useState } from 'react';
import styles from './ArchivedTournamentFilters.module.css';

const DEBOUNCE_MS = 300;

export const ArchivedTournamentFilters: React.FC = () => {
  const search = useTournamentFilterStore((s) => s.search);
  const setSearch = useTournamentFilterStore((s) => s.setSearch);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.mainRow}>
        <SearchBar
          value={localSearch}
          onChange={handleChange}
          placeholder='Пошук в архіві...'
          className={styles.searchBar}
          id='archive-search'
        />
        <RoleSwitcher className={styles.roleSwitcher} />
        <TournamentDashboardButton className={styles.backButton} />
      </div>

      <div className={styles.countRow}>
        <TournamentCount count={count} />
      </div>
    </div>
  );
};
