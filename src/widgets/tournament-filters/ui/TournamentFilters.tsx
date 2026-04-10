import React, { useEffect, useState, useMemo } from 'react';
import { SearchBar, Drawer } from '@shared/ui';
import { TournamentStatusTabs, useTournamentFilterStore } from '@features/tournament-filter';
import { RoleSwitcher } from '@features/role-switcher';
import { TournamentArchiveButton } from '@features/navigate';
import { TournamentCount } from '@entities/tournament';
import { FilterToggleButton } from './FilterToggleButton';
import styles from './TournamentFilters.module.css';

const DEBOUNCE_MS = 300;

/**
 * Self-contained tournament filter widget.
 * Orchestrates SearchBar, RoleSwitcher, TournamentStatusTabs, and ArchiveButton.
 * Features a mobile-friendly Drawer layout for small screens.
 */
export const TournamentFilters: React.FC = () => {
  const search     = useTournamentFilterStore((s) => s.search);
  const setSearch  = useTournamentFilterStore((s) => s.setSearch);
  const status     = useTournamentFilterStore((s) => s.status);
  const count      = useTournamentFilterStore((s) => s.count);
  
  const [localSearch, setLocalSearch] = useState(search);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Sync logic
  useEffect(() => {
    const timer = setTimeout(() => { setSearch(localSearch); }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  useEffect(() => { setLocalSearch(search); }, [search]);

  // Count active filters (excluding default ALL status and empty search)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (status !== 'ALL') count++;
    // We could add role-switcher state to count if it was in the store
    return count;
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className={styles.filtersWrapper}>
      {/* ── Search Row (Shared for Mobile/Desktop) ── */}
      <div className={styles.mainRow}>
        <SearchBar
          value={localSearch}
          onChange={handleChange}
          placeholder="Пошук турнірів"
          className={styles.searchBar}
          id="tournament-search"
        />
        
        {/* Desktop RoleSwitcher */}
        <RoleSwitcher className={`${styles.roleSwitcher} ${styles.desktopOnly}`} />
        
        {/* Mobile Filter Toggle */}
        <FilterToggleButton 
          onClick={toggleDrawer} 
          className={styles.mobileOnly}
          isActive={isDrawerOpen}
          count={activeFiltersCount}
        />
      </div>

      {/* ── Desktop Filter Row ── */}
      <div className={`${styles.row} ${styles.desktopOnly}`}>
        <TournamentStatusTabs />
        <TournamentArchiveButton className={styles.archiveButton} />
      </div>

      {/* ── Tournament Count Row ── */}
      <div className={styles.countRow}>
        <TournamentCount count={count} />
      </div>

      {/* ── Mobile Drawer (Bottom Sheet) ── */}
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} lazy>
        <div className={styles.drawerContent}>
          <h3 className={styles.drawerTitle}>Фільтри</h3>
          
          <div className={styles.drawerSection}>
            <span className={styles.sectionLabel}>Ваша роль</span>
            <RoleSwitcher className={styles.mobileRoleSwitcher} />
          </div>

          <div className={styles.drawerSection}>
            <span className={styles.sectionLabel}>Статус турніру</span>
            <TournamentStatusTabs />
          </div>

          <div className={styles.drawerSection}>
            <TournamentArchiveButton className={styles.mobileArchiveButton} />
          </div>
        </div>
      </Drawer>
    </div>
  );
};
