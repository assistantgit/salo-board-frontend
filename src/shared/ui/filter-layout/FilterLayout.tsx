import { FilterToggleButton } from '@shared/ui/buttons';
import { Drawer } from '@shared/ui/drawer/Drawer';
import { SearchBar } from '@shared/ui/search-bar';
import type React from 'react';
import { useState } from 'react';
import styles from './FilterLayout.module.css';

interface FilterLayoutProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  searchId?: string;
  activeFiltersCount?: number;
  /** Slots for the layout */
  extraContent?: React.ReactNode;
  statusTabs?: React.ReactNode;
  countBadge?: React.ReactNode;
  actions?: React.ReactNode;
  /** Mobile drawer title */
  drawerTitle?: string;
  /** Children are rendered inside the mobile drawer */
  children?: React.ReactNode;
}

/**
 * Universal Filter Layout component.
 * Uses a composition-first approach with slots.
 * Reuses SearchBar for consistent premium feel.
 */
export const FilterLayout: React.FC<FilterLayoutProps> = ({
  search,
  onSearchChange,
  searchPlaceholder = 'Пошук...',
  searchId,
  activeFiltersCount = 0,
  extraContent,
  statusTabs,
  countBadge,
  actions,
  drawerTitle = 'Фільтри',
  children,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      {/* ROW 1: Search, Extra Content and Actions */}
      <div className={styles.row}>
        {/* Left: Search Bar */}
        <div className={styles.searchWrapper}>
          <SearchBar
            id={searchId}
            value={search}
            onChange={handleSearchChange}
            placeholder={searchPlaceholder}
          />
        </div>

        {/* Center: Filters/Dropdowns */}
        {extraContent && <div className={styles.centerSlot}>{extraContent}</div>}

        {/* Right: Actions (Role Switcher, Archive, etc.) */}
        {actions && <div className={styles.rightSlot}>{actions}</div>}

        {/* Mobile Toggle */}
        <div className={styles.mobileOnly}>
          <FilterToggleButton count={activeFiltersCount} onClick={() => setIsDrawerOpen(true)} />
        </div>
      </div>

      {/* ROW 2: Status Tabs (Desktop Only) */}
      {statusTabs && <div className={`${styles.row} ${styles.desktopOnly}`}>{statusTabs}</div>}

      {/* ROW 3: Counter (Always visible) */}
      {countBadge && <div className={styles.row}>{countBadge}</div>}

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title={drawerTitle}>
        <div className={styles.drawerContent}>
          {children}
          {/* On mobile, we show tabs inside the drawer if provided */}
          {statusTabs && (
            <div className={styles.drawerSection}>
              <span className={styles.sectionLabel}>Статус</span>
              {statusTabs}
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};
