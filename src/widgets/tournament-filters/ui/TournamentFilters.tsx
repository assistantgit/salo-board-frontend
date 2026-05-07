import { TournamentCount, type TournamentVariant } from '@entities/tournament';
import { TournamentArchiveButton, TournamentDashboardButton } from '@features/navigate';
import { RoleSwitcher } from '@features/role-switcher';
import { TournamentStatusTabs, useTournamentFilterStore } from '@features/tournament-filter';
import { Drawer, SearchBar } from '@shared/ui';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { FilterToggleButton } from './FilterToggleButton';
import styles from './TournamentFilters.module.css';

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    let count = 0;
    if (status !== 'ALL') count++;
    return count;
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  const showStatusTabs = variant !== 'archive';
  const showArchiveButton = variant === 'default';
  const showDashboardButton = variant === 'archive';
  const showRoleSwitcher = variant === 'default';

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.mainRow}>
        <SearchBar
          value={localSearch}
          onChange={handleChange}
          placeholder={variant === 'archive' ? 'Пошук в архіві...' : 'Пошук турнірів'}
          className={styles.searchBar}
          id='tournament-search'
        />

        {showRoleSwitcher && (
          <RoleSwitcher className={`${styles.roleSwitcher} ${styles.desktopOnly}`} />
        )}

        {children && (
          <div className={`${styles.extraContent} ${styles.desktopOnly}`}>{children}</div>
        )}

        {showDashboardButton && (
          <TournamentDashboardButton className={`${styles.backButton} ${styles.desktopOnly}`} />
        )}

        <FilterToggleButton
          onClick={toggleDrawer}
          className={styles.mobileOnly}
          isActive={isDrawerOpen}
          count={activeFiltersCount}
        />
      </div>

      <div className={`${styles.row} ${styles.desktopOnly}`}>
        {showStatusTabs && <TournamentStatusTabs variant={variant} />}
        {showArchiveButton && (
          <TournamentArchiveButton className={`${styles.archiveButton} ${styles.desktopOnly}`} />
        )}
      </div>

      <div className={styles.countRow}>
        <TournamentCount count={count} />
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} lazy>
        <div className={styles.drawerContent}>
          <h3 className={styles.drawerTitle}>Фільтри</h3>

          {showRoleSwitcher && (
            <div className={styles.drawerSection}>
              <span className={styles.sectionLabel}>Ваша роль</span>
              <RoleSwitcher className={styles.mobileRoleSwitcher} />
            </div>
          )}

          {children && <div className={styles.drawerSection}>{children}</div>}

          {showStatusTabs && (
            <div className={styles.drawerSection}>
              <span className={styles.sectionLabel}>Статус турніру</span>
              <TournamentStatusTabs variant={variant} />
            </div>
          )}

          {showArchiveButton && (
            <div className={styles.drawerSection}>
              <TournamentArchiveButton className={styles.mobileArchiveButton} />
            </div>
          )}

          {showDashboardButton && (
            <div className={styles.drawerSection}>
              <TournamentDashboardButton className={styles.mobileBackButton} />
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};
