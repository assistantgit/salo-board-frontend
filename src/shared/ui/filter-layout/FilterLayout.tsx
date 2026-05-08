import { Drawer, FilterToggleButton, SearchBar } from '@shared/ui';
import type React from 'react';
import { useState } from 'react';
import styles from './FilterLayout.module.css';

interface FilterLayoutProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  searchId?: string;
  activeFiltersCount?: number;
  countBadge?: React.ReactNode;
  statusTabs?: React.ReactNode;
  extraContent?: React.ReactNode; // For dropdowns etc in main row
  roleSwitcher?: React.ReactNode;
  archiveButton?: React.ReactNode;
  backButton?: React.ReactNode;
  children?: React.ReactNode; // For mobile drawer custom sections
}

/**
 * Shared layout for filter bars across the app.
 * Follows the "best practice" layout:
 * Row 1: Search + Extras + Toggle
 * Row 2: Status Tabs + Actions
 * Row 3: Counter Badge
 */
export const FilterLayout: React.FC<FilterLayoutProps> = ({
  search,
  onSearchChange,
  searchPlaceholder = 'Пошук...',
  searchId = 'search',
  activeFiltersCount = 0,
  countBadge,
  statusTabs,
  extraContent,
  roleSwitcher,
  archiveButton,
  backButton,
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainRow}>
        <SearchBar
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className={styles.searchBar}
          id={searchId}
        />

        {roleSwitcher && (
          <div className={`${styles.roleSwitcher} ${styles.desktopOnly}`}>{roleSwitcher}</div>
        )}

        {extraContent && (
          <div className={`${styles.extraContent} ${styles.desktopOnly}`}>{extraContent}</div>
        )}

        {backButton && (
          <div className={`${styles.backButton} ${styles.desktopOnly}`}>{backButton}</div>
        )}

        <FilterToggleButton
          onClick={toggleDrawer}
          className={styles.mobileOnly}
          isActive={isDrawerOpen}
          count={activeFiltersCount}
        />
      </div>

      <div className={`${styles.row} ${styles.desktopOnly}`}>
        {statusTabs}
        {archiveButton && <div className={styles.archiveButton}>{archiveButton}</div>}
      </div>

      {countBadge && <div className={styles.countRow}>{countBadge}</div>}

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} lazy>
        <div className={styles.drawerContent}>
          <h3 className={styles.drawerTitle}>Фільтри</h3>

          {roleSwitcher && (
            <div className={styles.drawerSection}>
              <span className={styles.sectionLabel}>Ваша роль</span>
              <div className={styles.mobileFullWidth}>{roleSwitcher}</div>
            </div>
          )}

          {children && <div className={styles.drawerSection}>{children}</div>}

          {statusTabs && (
            <div className={styles.drawerSection}>
              <span className={styles.sectionLabel}>Статус</span>
              {statusTabs}
            </div>
          )}

          {archiveButton && <div className={styles.drawerSection}>{archiveButton}</div>}
          {backButton && <div className={styles.drawerSection}>{backButton}</div>}
        </div>
      </Drawer>
    </div>
  );
};
